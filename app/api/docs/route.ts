import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface DocsStructuralElement {
  paragraph?: {
    elements?: Array<{
      textRun?: {
        content?: string;
      };
    }>;
  };
}

function extractPlainTextFromDoc(docData: {
  body?: { content?: DocsStructuralElement[] };
}): string {
  const elements = docData?.body?.content ?? [];
  const chunks: string[] = [];

  for (const el of elements) {
    if (el.paragraph?.elements) {
      for (const run of el.paragraph.elements) {
        if (run.textRun?.content) {
          chunks.push(run.textRun.content);
        }
      }
    }
  }

  return chunks.join('').trim();
}

export async function GET(req: NextRequest) {
  const token = req.headers.get('Authorization');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const documentId = searchParams.get('documentId');

  try {
    if (documentId) {
      const docRes = await fetch(
        `https://docs.googleapis.com/v1/documents/${encodeURIComponent(documentId)}`,
        {
          headers: { Authorization: token },
        }
      );

      const docData = await docRes.json();
      if (!docRes.ok) {
        return NextResponse.json(
          { error: docData?.error?.message || 'Failed to read Google Doc' },
          { status: docRes.status }
        );
      }

      const plainText = extractPlainTextFromDoc(docData);
      return NextResponse.json({
        documentId: docData.documentId,
        title: docData.title,
        revisionId: docData.revisionId,
        plainText,
      });
    }

    // Otherwise list recent Google Docs from Drive
    const query = encodeURIComponent(
      "mimeType='application/vnd.google-apps.document' and trashed=false"
    );
    const fields = encodeURIComponent(
      'files(id,name,modifiedTime,webViewLink)'
    );
    const driveRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${query}&pageSize=10&orderBy=modifiedTime desc&fields=${fields}`,
      {
        headers: { Authorization: token },
      }
    );

    const driveData = await driveRes.json();
    if (!driveRes.ok) {
      return NextResponse.json(
        { error: driveData?.error?.message || 'Failed to list Google Docs' },
        { status: driveRes.status }
      );
    }

    return NextResponse.json({
      files: driveData.files ?? [],
    });
  } catch (err) {
    console.error('Google Docs GET API error:', err);
    return NextResponse.json(
      { error: 'Internal server error communicating with Google Docs API' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.headers.get('Authorization');
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, title, content, documentId } = body as {
      action: 'create' | 'append' | 'uploadResumePdf';
      title?: string;
      content?: string;
      documentId?: string;
    };

    if (action === 'uploadResumePdf') {
      const pdfPath = path.join(
        process.cwd(),
        'public',
        'Dirisham_Kamesh_Resume.pdf'
      );
      const pdfBuffer = await fs.readFile(pdfPath);
      const boundary = '-------314159265358979323846';
      const metadata = JSON.stringify({
        name: title || 'Dirisham_Kamesh_Resume.pdf',
        mimeType: 'application/pdf',
      });

      const multipartStart = Buffer.from(
        `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: application/pdf\r\n\r\n`,
        'utf-8'
      );
      const multipartEnd = Buffer.from(`\r\n--${boundary}--`, 'utf-8');
      const multipartBody = Buffer.concat([
        multipartStart,
        pdfBuffer,
        multipartEnd,
      ]);

      const uploadRes = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink',
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': `multipart/related; boundary=${boundary}`,
          },
          body: multipartBody,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        return NextResponse.json(
          {
            error:
              uploadData?.error?.message ||
              'Failed to upload Resume PDF to Google Drive',
          },
          { status: uploadRes.status }
        );
      }

      return NextResponse.json({
        success: true,
        fileId: uploadData.id,
        title: uploadData.name,
        webViewLink:
          uploadData.webViewLink ||
          `https://drive.google.com/file/d/${uploadData.id}/view`,
      });
    }

    if (action === 'append') {
      if (!documentId || !content) {
        return NextResponse.json(
          { error: 'documentId and content are required for append' },
          { status: 400 }
        );
      }

      const updateRes = await fetch(
        `https://docs.googleapis.com/v1/documents/${encodeURIComponent(documentId)}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                insertText: {
                  endOfSegmentLocation: { segmentId: '' },
                  text: `\n\n${content}`,
                },
              },
            ],
          }),
        }
      );

      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        return NextResponse.json(
          {
            error:
              updateData?.error?.message || 'Failed to update Google Document',
          },
          { status: updateRes.status }
        );
      }

      return NextResponse.json({
        success: true,
        documentId,
        webViewLink: `https://docs.google.com/document/d/${documentId}/edit`,
      });
    }

    // Default action: create a new Google Doc and populate its body
    const docTitle = (title || 'Dirisham Kamesh — Portfolio Dossier').trim();
    const createRes = await fetch('https://docs.googleapis.com/v1/documents', {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: docTitle }),
    });

    const createData = await createRes.json();
    if (!createRes.ok) {
      return NextResponse.json(
        {
          error:
            createData?.error?.message || 'Failed to create Google Document',
        },
        { status: createRes.status }
      );
    }

    const newDocId: string = createData.documentId;

    if (content && content.trim().length > 0) {
      const batchRes = await fetch(
        `https://docs.googleapis.com/v1/documents/${encodeURIComponent(newDocId)}:batchUpdate`,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                insertText: {
                  location: { index: 1 },
                  text: content,
                },
              },
            ],
          }),
        }
      );

      if (!batchRes.ok) {
        const batchErr = await batchRes.json();
        return NextResponse.json(
          {
            error:
              batchErr?.error?.message ||
              'Document created, but failed to write initial content',
          },
          { status: batchRes.status }
        );
      }
    }

    return NextResponse.json({
      success: true,
      documentId: newDocId,
      title: createData.title,
      webViewLink: `https://docs.google.com/document/d/${newDocId}/edit`,
    });
  } catch (err) {
    console.error('Google Docs POST API error:', err);
    return NextResponse.json(
      { error: 'Internal server error communicating with Google Docs API' },
      { status: 500 }
    );
  }
}
