'use client';

import React, { useEffect, useState, useCallback } from 'react';
import type { User } from 'firebase/auth';
import {
  FileText,
  FolderOpen,
  PlusCircle,
  RefreshCw,
  ExternalLink,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FilePlus2,
  LogIn,
  Download,
  UploadCloud,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  initAuth,
  googleSignIn,
  getAccessToken,
  logout,
} from '@/lib/googleWorkspaceAuth';
import { profileData } from '@/data/profile';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { soundController } from '@/lib/sound';

interface DriveDocFile {
  id: string;
  name: string;
  modifiedTime?: string;
  webViewLink?: string;
}

interface LoadedDocDetail {
  documentId: string;
  title: string;
  revisionId?: string;
  plainText: string;
}

interface PendingMutation {
  type: 'create' | 'append' | 'uploadResumePdf';
  title: string;
  content: string;
  targetDocId?: string;
  targetDocName?: string;
}

const DOSSIER_TEMPLATES = {
  officialResume: {
    title: 'Dirisham Kamesh — Resume (Software Engineering Intern Candidate)',
    content: `DIRISHAM KAMESH
Computer Science Engineering Student | Software Engineering Intern Candidate
Visakhapatnam, Andhra Pradesh, India | kameshdirisham@gmail.com
github.com/DirishamKamesh | linkedin.com/in/dirishamkamesh | leetcode.com/u/Kamesh_1/ | codechef.com/users/kaamesh_1

PROFESSIONAL SUMMARY
Computer Science Engineering student at Vignan, Duvvada, with project experience developing web applications for codebase exploration, student collaboration, faculty workflows, healthcare management, and task tracking. Familiar with C, C++, Java, Python, JavaScript, HTML, CSS, React, and Node.js, with ongoing practice in Data Structures and Algorithms. Seeking a software engineering internship to apply programming skills, build practical solutions, and strengthen problem-solving through hands-on work.

TECHNICAL SKILLS
Programming: C, C++, Java, Python, JavaScript, TypeScript
Frontend: HTML5, CSS3, React.js, Vite
Backend: Node.js, Express.js
Computer Science & Tools: Data Structures and Algorithms (DSA), AST parsing, Git, GitHub

TECHNICAL PROJECTS
RepoRiddle - Interactive Codebase Riddles | TypeScript, Node.js, Express.js (https://github.com/DirishamKamesh/Repo-Riddlle-)
• Built a GitHub codebase ingestion workflow with SHA-based caching, vendor-file filtering, and AST-based import-graph parsing.
• Created interactive engineering challenges that guide users through codebase investigation and verify solutions using pinned code evidence.

HackMate - Hackathon Collaboration & Skill-Matching Platform | JavaScript, HTML5, CSS3, Vite (https://github.com/DirishamKamesh/HackMate)
• Developed a student networking platform with role-compatibility scoring to help match hackathon teammates by skills and roles.
• Created interfaces for browsing project ideas, participating in community discussions, and forming teams.

CareSync - Smart Hospital Management System | JavaScript, HTML5, CSS3 (https://github.com/DirishamKamesh/Caresync)
• Designed role-specific interfaces for administrators, doctors, and patients to manage appointments and digital records.
• Implemented client-side prescription PDF generation with embedded QR codes to support digital-document verification.

FacuLynk - Faculty Workflow Support Portal | JavaScript, HTML5, CSS3, Node.js (https://github.com/DirishamKamesh/FacuLynk)
• Built a centralized web portal to organize faculty workflows, departmental scheduling, and academic communication.
• Developed structured UI views and backend services to organize faculty tasks and support coordination.

Tasky - Real-Time Task Management System | React.js, JavaScript, Vite (https://github.com/DirishamKamesh/Tasky)
• Built a responsive task-management application with modular React components, interactive state management, and real-time task tracking.
• Designed workflow dashboards for organizing priorities, categorizing tasks, and tracking project milestones.

EDUCATION
Vignan - Duvvada, Andhra Pradesh, India
Computer Science Engineering Student (Expected Graduation: 2029)

CERTIFICATION
PGDCA (Post Graduate Diploma in Computer Applications)
Coursework: C, C++, Java, Python, and Microsoft Office

ACHIEVEMENTS
Participated in five hackathons, gaining experience in collaborative problem-solving and project development.`,
  },
  recruiter: {
    title: 'Dirisham Kamesh — Engineering Candidate Dossier (2026)',
    content: `CANDIDATE TECHNICAL DOSSIER
Name: ${profileData.fullName}
Academic Program: ${profileData.education.degree} in ${profileData.education.field} (${profileData.education.institution})
Expected Graduation: ${profileData.education.expectedGraduation}
Location: ${profileData.location.display}

CONTACT & VERIFIED PROFILES
- Email: ${profileData.contact.email}
- GitHub: ${profileData.contact.githubUrl}
- LinkedIn: ${profileData.contact.linkedinUrl}
- LeetCode: ${profileData.contact.leetcodeUrl}
- CodeChef: ${profileData.contact.codechefUrl}

TECHNICAL SKILLS SUMMARY
- Programming: C, C++, Java, Python, JavaScript, TypeScript
- Frontend: HTML5, CSS3, React.js, Next.js, Tailwind CSS, Vite
- Backend: Node.js, Express.js
- Computer Science & Tools: Data Structures & Algorithms (DSA), AST parsing, Git, GitHub

KEY TECHNICAL PROJECTS (FROM VERIFIED RESUME)
1. RepoRiddle — Interactive Codebase Riddles (TypeScript, Node.js, Express.js)
2. HackMate — Hackathon Collaboration & Skill-Matching Platform (JavaScript, HTML5, CSS3, Vite)
3. CareSync — Smart Hospital Management System (JavaScript, HTML5, CSS3, QR Prescription PDFs)
4. FacuLynk — Faculty Workflow Support Portal (JavaScript, HTML5, CSS3, Node.js)
5. Tasky — Real-Time Task Management System (React.js, JavaScript, Vite)

CERTIFICATION & ACHIEVEMENTS
- PGDCA (Post Graduate Diploma in Computer Applications) — C, C++, Java, Python, Microsoft Office
- Participated in five hackathons, gaining experience in collaborative problem-solving and project development.

RECRUITER EVALUATION NOTES
- [Add interview or technical evaluation notes below]`,
  },
  projectBrief: {
    title: 'Project Collaboration Brief — Dirisham Kamesh',
    content: `PROJECT INQUIRY & TECHNICAL SPECIFICATION BRIEF
Prepared with: ${profileData.fullName} (${profileData.contact.email})

1. PROJECT OVERVIEW & OBJECTIVES
- Project Name: 
- Core Problem / Goal: 
- Target Audience: 

2. TECHNICAL ARCHITECTURE & DELIVERABLES
- Preferred Stack: React / Next.js / TypeScript / Tailwind CSS
- Interactive UI or Visualization Requirements: 
- Backend / API Integration Needs: 

3. TIMELINE & MILESTONES
- Target Kickoff: 
- Key Review Checkpoints: `,
  },
};

export function GoogleDocsWorkspaceSection() {
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [files, setFiles] = useState<DriveDocFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);

  const [selectedDoc, setSelectedDoc] = useState<LoadedDocDetail | null>(null);
  const [isLoadingDoc, setIsLoadingDoc] = useState<boolean>(false);

  const [docTitle, setDocTitle] = useState<string>(
    DOSSIER_TEMPLATES.officialResume.title
  );
  const [docContent, setDocContent] = useState<string>(
    DOSSIER_TEMPLATES.officialResume.content
  );
  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(true);

  const [pendingMutation, setPendingMutation] =
    useState<PendingMutation | null>(null);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    link?: string;
  } | null>(null);

  const fetchRecentDocs = useCallback(async (accessToken?: string | null) => {
    const tokenToUse = accessToken ?? (await getAccessToken());
    if (!tokenToUse) {
      setNeedsAuth(true);
      return;
    }

    setIsLoadingFiles(true);
    try {
      const res = await fetch('/api/docs', {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });

      if (res.status === 401) {
        setNeedsAuth(true);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not load Google Docs list');
      }

      setFiles(data.files ?? []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch documents';
      setStatusMessage({ type: 'error', text: message });
    } finally {
      setIsLoadingFiles(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, accessToken) => {
        setUser(authedUser);
        setNeedsAuth(false);
        fetchRecentDocs(accessToken);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, [fetchRecentDocs]);

  const handleLogin = async () => {
    soundController.playSubtleTick(580);
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        await fetchRecentDocs(result.accessToken);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Google Sign-In was cancelled or failed.';
      setStatusMessage({ type: 'error', text: message });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    soundController.playSubtleTick(420);
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setFiles([]);
    setSelectedDoc(null);
    setStatusMessage(null);
  };

  const handleInspectDocument = async (documentId: string) => {
    soundController.playSubtleTick(540);
    const token = await getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      return;
    }

    setIsLoadingDoc(true);
    setStatusMessage(null);
    try {
      const res = await fetch(
        `/api/docs?documentId=${encodeURIComponent(documentId)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 401) {
        setNeedsAuth(true);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to read Google Document');
      }

      setSelectedDoc(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to read Google Doc';
      setStatusMessage({ type: 'error', text: message });
    } finally {
      setIsLoadingDoc(false);
    }
  };

  const requestCreateDocument = () => {
    soundController.playSubtleTick(560);
    if (!docTitle.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please provide a document title before creating a Google Doc.',
      });
      return;
    }
    setPendingMutation({
      type: 'create',
      title: docTitle.trim(),
      content: docContent,
    });
  };

  const requestUploadResumePdf = () => {
    soundController.playSubtleTick(580);
    setPendingMutation({
      type: 'uploadResumePdf',
      title: 'Dirisham_Kamesh_Resume.pdf',
      content: DOSSIER_TEMPLATES.officialResume.content,
    });
  };

  const requestAppendToSelected = () => {
    soundController.playSubtleTick(560);
    if (!selectedDoc) return;
    if (!docContent.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter content to append to the selected Google Doc.',
      });
      return;
    }
    setPendingMutation({
      type: 'append',
      title: selectedDoc.title,
      content: docContent,
      targetDocId: selectedDoc.documentId,
      targetDocName: selectedDoc.title,
    });
  };

  const confirmAndExecuteMutation = async () => {
    if (!pendingMutation) return;
    const token = await getAccessToken();
    if (!token) {
      setPendingMutation(null);
      setNeedsAuth(true);
      return;
    }

    setIsMutating(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/docs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: pendingMutation.type,
          title: pendingMutation.title,
          content: pendingMutation.content,
          documentId: pendingMutation.targetDocId,
        }),
      });

      if (res.status === 401) {
        setNeedsAuth(true);
        setPendingMutation(null);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Google Docs operation failed');
      }

      if (pendingMutation.type === 'uploadResumePdf') {
        setStatusMessage({
          type: 'success',
          text: `Uploaded "${pendingMutation.title}" directly to your Google Drive.`,
          link: data.webViewLink,
        });
      } else if (pendingMutation.type === 'create') {
        setStatusMessage({
          type: 'success',
          text: `Created Google Doc "${pendingMutation.title}" in your Google Drive.`,
          link: data.webViewLink,
        });
        await fetchRecentDocs(token);
        if (data.documentId) {
          await handleInspectDocument(data.documentId);
        }
      } else {
        setStatusMessage({
          type: 'success',
          text: `Updated "${pendingMutation.targetDocName}" with your new notes.`,
          link: data.webViewLink,
        });
        if (pendingMutation.targetDocId) {
          await handleInspectDocument(pendingMutation.targetDocId);
        }
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to write to Google Docs API';
      setStatusMessage({ type: 'error', text: message });
    } finally {
      setIsMutating(false);
      setPendingMutation(null);
    }
  };

  return (
    <section
      id="google-docs-workspace"
      aria-labelledby="google-docs-heading"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] py-20 sm:py-24 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        {/* Section Heading */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#E63946] tracking-wide">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>GOOGLE WORKSPACE INTEGRATION // RESUME PDF, DOCS &amp; DRIVE</span>
            </div>
            <h2
              id="google-docs-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight text-balance"
            >
              Official Resume PDF &amp; Google Docs Studio
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              View or download Dirisham Kamesh&apos;s verified 1-page Resume PDF
              directly below, or connect your Google account to save the PDF to
              Google Drive and export an editable Google Doc version.
            </p>
          </div>

          {/* Connection Status / User Badge */}
          <div className="flex items-center gap-3 self-start lg:self-auto">
            {!needsAuth && user ? (
              <div className="flex items-center gap-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-4 py-2.5">
                <div className="text-xs font-mono">
                  <span className="text-[var(--text-secondary)] block">
                    CONNECTED AS
                  </span>
                  <span className="text-[var(--text-primary)] font-semibold">
                    {user.email || user.displayName || 'Google Workspace User'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[#E63946] border border-[var(--border-subtle)] hover:border-[#E63946] transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3.5 py-2">
                <ShieldCheck
                  className="w-4 h-4 text-[#A8DADC]"
                  aria-hidden="true"
                />
                <span>OAuth 2.0 Client-Side Token Flow</span>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Attached Official Resume PDF Showcase & Embedded Viewer */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-6 shadow-[0_8px_28px_rgba(6,13,22,0.2)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A8DADC] font-semibold">
                <FileText className="w-4 h-4 text-[#E63946]" aria-hidden="true" />
                <span>ATTACHED RESUME PDF · DIRISHAM_KAMESH_RESUME.PDF (1 PAGE)</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Dirisham Kamesh — Computer Science Engineering Student | Software Engineering Intern Candidate
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Includes Professional Summary, Technical Skills (C, C++, Java, Python, JS/TS, React, Node.js, DSA), 5 Technical Projects (RepoRiddle, HackMate, CareSync, FacuLynk, Tasky), PGDCA Certification, and 5 Hackathons.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundController.playSubtleTick(540);
                  setShowPdfPreview((prev) => !prev);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[#457B9D] hover:border-[#A8DADC] hover:text-[#A8DADC] transition-colors cursor-pointer"
              >
                {showPdfPreview ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Hide PDF Preview</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Preview PDF Inline</span>
                  </>
                )}
              </button>

              <a
                href="/Dirisham_Kamesh_Resume.pdf"
                download="Dirisham_Kamesh_Resume.pdf"
                onClick={() => soundController.playSubtleTick(600)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#d62f3c] transition-colors"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download PDF</span>
              </a>

              <a
                href="/Dirisham_Kamesh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundController.playSubtleTick(540)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-semibold bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[#A8DADC] hover:text-[#A8DADC] transition-colors"
              >
                <span>Open PDF in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {showPdfPreview && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Embedded Native PDF Frame */}
              <div className="lg:col-span-7 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                  <span>LIVE PDF VIEWER // /Dirisham_Kamesh_Resume.pdf</span>
                  <span className="text-[#A8DADC]">1 PAGE · VERIFIED</span>
                </div>
                <iframe
                  src="/Dirisham_Kamesh_Resume.pdf#view=FitH"
                  title="Dirisham Kamesh Official Resume PDF"
                  className="w-full h-[560px] bg-white"
                />
              </div>

              {/* Verbatim Structured Summary from Uploaded PDF */}
              <div className="lg:col-span-5 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-5 space-y-4 max-h-[602px] overflow-y-auto">
                <div className="border-b border-[var(--border-subtle)] pb-3">
                  <p className="text-xs font-mono text-[#E63946] font-semibold">
                    VERBATIM PDF TRANSCRIPT &amp; LINKS
                  </p>
                  <h4 className="font-display text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    DIRISHAM KAMESH
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Computer Science Engineering Student | Software Engineering Intern Candidate
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="font-mono font-semibold text-[#A8DADC]">
                    TECHNICAL SKILLS
                  </p>
                  <ul className="space-y-1 text-[var(--text-secondary)]">
                    <li>
                      <strong className="text-[var(--text-primary)]">Programming:</strong> C, C++, Java, Python, JavaScript, TypeScript
                    </li>
                    <li>
                      <strong className="text-[var(--text-primary)]">Frontend:</strong> HTML5, CSS3, React.js, Vite
                    </li>
                    <li>
                      <strong className="text-[var(--text-primary)]">Backend:</strong> Node.js, Express.js
                    </li>
                    <li>
                      <strong className="text-[var(--text-primary)]">CS &amp; Tools:</strong> Data Structures and Algorithms (DSA), AST parsing, Git, GitHub
                    </li>
                  </ul>
                </div>

                <div className="space-y-2.5 text-xs border-t border-[var(--border-subtle)] pt-3">
                  <p className="font-mono font-semibold text-[#A8DADC]">
                    TECHNICAL PROJECTS (5)
                  </p>
                  <div className="space-y-2 text-[var(--text-secondary)]">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-[var(--text-primary)]">
                          1. RepoRiddle — Interactive Codebase Riddles
                        </strong>
                        <a
                          href="https://github.com/DirishamKamesh/Repo-Riddlle-"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-[#A8DADC] hover:underline shrink-0"
                        >
                          Repository ↗
                        </a>
                      </div>
                      <p className="text-[11px] mt-0.5">
                        TypeScript, Node.js, Express.js · SHA-based caching, vendor-file filtering, AST import-graph parsing &amp; pinned code evidence challenges.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-[var(--text-primary)]">
                          2. HackMate — Hackathon Collaboration Platform
                        </strong>
                        <a
                          href="https://github.com/DirishamKamesh/HackMate"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-[#A8DADC] hover:underline shrink-0"
                        >
                          Repository ↗
                        </a>
                      </div>
                      <p className="text-[11px] mt-0.5">
                        JavaScript, HTML5, CSS3, Vite · Role-compatibility scoring to match hackathon teammates by skills and roles.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-[var(--text-primary)]">
                          3. CareSync — Smart Hospital Management System
                        </strong>
                        <a
                          href="https://github.com/DirishamKamesh/Caresync"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-[#A8DADC] hover:underline shrink-0"
                        >
                          Repository ↗
                        </a>
                      </div>
                      <p className="text-[11px] mt-0.5">
                        JavaScript, HTML5, CSS3 · Role-specific portals for admins, doctors, and patients with QR-embedded prescription PDF generation.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-[var(--text-primary)]">
                          4. FacuLynk — Faculty Workflow Support Portal
                        </strong>
                        <a
                          href="https://github.com/DirishamKamesh/FacuLynk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-[#A8DADC] hover:underline shrink-0"
                        >
                          Repository ↗
                        </a>
                      </div>
                      <p className="text-[11px] mt-0.5">
                        JavaScript, HTML5, CSS3, Node.js · Centralized web portal organizing faculty workflows, departmental scheduling, and academic communication.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-[var(--text-primary)]">
                          5. Tasky — Real-Time Task Management System
                        </strong>
                        <a
                          href="https://github.com/DirishamKamesh/Tasky"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-[#A8DADC] hover:underline shrink-0"
                        >
                          Repository ↗
                        </a>
                      </div>
                      <p className="text-[11px] mt-0.5">
                        React.js, JavaScript, Vite · Modular React components, interactive state management, and workflow dashboards for tracking milestones.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs border-t border-[var(--border-subtle)] pt-3">
                  <p className="font-mono font-semibold text-[#A8DADC]">
                    EDUCATION, CERTIFICATION &amp; ACHIEVEMENTS
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Vignan, Duvvada:</strong> Computer Science Engineering Student
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">PGDCA:</strong> Post Graduate Diploma in Computer Applications (C, C++, Java, Python, Microsoft Office)
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Hackathons:</strong> Participated in five hackathons, gaining experience in collaborative problem-solving and project development.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Notification Banner */}
        {statusMessage && (
          <div
            role="status"
            className={`p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              statusMessage.type === 'success'
                ? 'bg-[var(--bg-surface)] border-[#A8DADC] text-[var(--text-primary)]'
                : 'bg-[var(--bg-surface)] border-[#E63946] text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-sm">
              {statusMessage.type === 'success' ? (
                <CheckCircle2
                  className="w-4 h-4 text-[#A8DADC] shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <AlertTriangle
                  className="w-4 h-4 text-[#E63946] shrink-0"
                  aria-hidden="true"
                />
              )}
              <span>{statusMessage.text}</span>
            </div>
            {statusMessage.link && (
              <a
                href={statusMessage.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#A8DADC] hover:underline shrink-0"
              >
                <span>Open in Google Workspace</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}

        {/* Unauthenticated State */}
        {needsAuth ? (
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <p className="text-xs font-mono font-semibold text-[#A8DADC] uppercase tracking-wider">
                EXPORT RESUME PDF TO GOOGLE DRIVE &amp; GOOGLE DOCS
              </p>
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Sign in with Google to save this Resume PDF to your Drive or Docs
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                With your permission, you can upload{' '}
                <code className="text-[#A8DADC]">Dirisham_Kamesh_Resume.pdf</code>{' '}
                directly to your Google Drive, generate an editable Google Doc
                from the resume text, or inspect your recent Google Docs inside
                this workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="gsi-material-button inline-flex items-center gap-3 px-6 py-3.5 bg-[#F1FAEE] text-[#0D1929] hover:bg-[#A8DADC] font-medium text-sm transition-colors cursor-pointer disabled:opacity-60 shrink-0 shadow-[0_6px_20px_rgba(6,13,22,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
            >
              <LogIn className="w-4 h-4 text-[#1D3557]" aria-hidden="true" />
              <span className="gsi-material-button-contents font-semibold">
                {isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}
              </span>
            </button>
          </div>
        ) : (
          /* Authenticated Two-Column Studio */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Recent Google Docs Browser + Document Reader (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-2">
                    <FolderOpen
                      className="w-4 h-4 text-[#A8DADC]"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      Your Recent Google Docs
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => fetchRecentDocs()}
                    disabled={isLoadingFiles}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${
                        isLoadingFiles ? 'animate-spin' : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span>Refresh</span>
                  </button>
                </div>

                {isLoadingFiles ? (
                  <p className="text-xs font-mono text-[var(--text-secondary)] py-6">
                    Loading recent documents from Google Drive...
                  </p>
                ) : files.length === 0 ? (
                  <p className="text-xs text-[var(--text-secondary)] py-4">
                    No Google Docs found yet. Use the studio on the right to
                    export the Official Resume or create your first Dossier!
                  </p>
                ) : (
                  <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {files.map((file) => {
                      const isSelected = selectedDoc?.documentId === file.id;
                      return (
                        <li key={file.id}>
                          <div
                            className={`p-3 border transition-colors flex items-center justify-between gap-2 ${
                              isSelected
                                ? 'bg-[var(--bg-elevated)] border-[#A8DADC]'
                                : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:border-[#457B9D]'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleInspectDocument(file.id)}
                              className="text-left flex-1 min-w-0 cursor-pointer"
                            >
                              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                                {file.name}
                              </p>
                              {file.modifiedTime && (
                                <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                                  Updated{' '}
                                  {new Date(
                                    file.modifiedTime
                                  ).toLocaleDateString()}
                                </p>
                              )}
                            </button>
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${file.name} in Google Docs`}
                                className="p-1.5 text-[var(--text-secondary)] hover:text-[#A8DADC] shrink-0"
                              >
                                <ExternalLink
                                  className="w-3.5 h-3.5"
                                  aria-hidden="true"
                                />
                              </a>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Live Document Inspector */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <span className="text-xs font-mono font-semibold text-[#E63946]">
                    DOCUMENT CONTENT INSPECTOR
                  </span>
                  {selectedDoc && (
                    <a
                      href={`https://docs.google.com/document/d/${selectedDoc.documentId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#A8DADC] hover:underline"
                    >
                      <span>Open in Docs</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>

                {isLoadingDoc ? (
                  <p className="text-xs font-mono text-[var(--text-secondary)] py-6">
                    Reading document structure via Google Docs API...
                  </p>
                ) : selectedDoc ? (
                  <div className="space-y-3">
                    <h4 className="font-display text-base font-bold text-[var(--text-primary)]">
                      {selectedDoc.title}
                    </h4>
                    <pre className="text-xs font-mono text-[var(--text-secondary)] bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-4 max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                      {selectedDoc.plainText ||
                        '(This Google Document currently has no text content.)'}
                    </pre>
                  </div>
                ) : (
                  <p className="text-xs text-[var(--text-secondary)] py-4">
                    Select any document from the list above to read its text
                    content via the Google Docs API.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Resume PDF & Dossier Composer (7 cols) */}
            <div className="lg:col-span-7 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#E63946] block">
                    CREATE GOOGLE DOC OR UPLOAD PDF TO DRIVE
                  </span>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Export Resume PDF or Dossier to Google Workspace
                  </h3>
                </div>

                {/* Preset Switchers */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundController.playSubtleTick(520);
                      setDocTitle(DOSSIER_TEMPLATES.officialResume.title);
                      setDocContent(DOSSIER_TEMPLATES.officialResume.content);
                    }}
                    className="px-3 py-1.5 text-xs font-mono bg-[#E63946] text-[#F1FAEE] font-semibold cursor-pointer transition-colors"
                  >
                    Load Official Resume (PDF)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundController.playSubtleTick(520);
                      setDocTitle(DOSSIER_TEMPLATES.recruiter.title);
                      setDocContent(DOSSIER_TEMPLATES.recruiter.content);
                    }}
                    className="px-3 py-1.5 text-xs font-mono bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[#A8DADC] text-[var(--text-primary)] cursor-pointer transition-colors"
                  >
                    Load Recruiter Dossier
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundController.playSubtleTick(520);
                      setDocTitle(DOSSIER_TEMPLATES.projectBrief.title);
                      setDocContent(DOSSIER_TEMPLATES.projectBrief.content);
                    }}
                    className="px-3 py-1.5 text-xs font-mono bg-[var(--bg-canvas)] border border-[var(--border-subtle)] hover:border-[#A8DADC] text-[var(--text-primary)] cursor-pointer transition-colors"
                  >
                    Load Project Brief
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="gdoc-title-input"
                    className="block text-xs font-mono font-semibold text-[var(--text-secondary)]"
                  >
                    DOCUMENT TITLE
                  </label>
                  <input
                    id="gdoc-title-input"
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Enter Google Document title..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#A8DADC]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="gdoc-content-textarea"
                    className="block text-xs font-mono font-semibold text-[var(--text-secondary)]"
                  >
                    DOCUMENT BODY / RESUME CONTENT TO INSERT
                  </label>
                  <textarea
                    id="gdoc-content-textarea"
                    rows={12}
                    value={docContent}
                    onChange={(e) => setDocContent(e.target.value)}
                    placeholder="Write or customize the document body..."
                    className="w-full px-3.5 py-3 text-xs font-mono leading-relaxed bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[#A8DADC]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-[var(--text-secondary)]">
                  You will be asked to confirm before any file is uploaded or
                  created in your Google Drive.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={requestUploadResumePdf}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold border border-[#A8DADC] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:border-[#E63946] hover:text-[#A8DADC] transition-colors cursor-pointer"
                  >
                    <UploadCloud
                      className="w-4 h-4 text-[#A8DADC]"
                      aria-hidden="true"
                    />
                    <span>Upload Resume PDF to Drive</span>
                  </button>

                  {selectedDoc && (
                    <button
                      type="button"
                      onClick={requestAppendToSelected}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold border border-[#A8DADC] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
                    >
                      <FilePlus2
                        className="w-4 h-4 text-[#A8DADC]"
                        aria-hidden="true"
                      />
                      <span>
                        Append to &ldquo;{selectedDoc.title.slice(0, 18)}&rdquo;
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={requestCreateDocument}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#d62f3c] transition-colors cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Create Google Doc</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Explicit Confirmation Modal for Mutating Operations */}
      {pendingMutation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-docs-mutation-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          <div className="bg-[var(--bg-surface)] border border-[var(--border-strong)] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center gap-2.5 text-[#E63946] text-xs font-mono font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>CONFIRM GOOGLE WORKSPACE WRITE OPERATION</span>
            </div>

            <h3
              id="confirm-docs-mutation-title"
              className="font-display text-xl font-bold text-[var(--text-primary)]"
            >
              {pendingMutation.type === 'uploadResumePdf'
                ? `Upload "${pendingMutation.title}" to your Google Drive?`
                : pendingMutation.type === 'create'
                  ? `Create new Google Doc "${pendingMutation.title}"?`
                  : `Append text to "${pendingMutation.targetDocName}"?`}
            </h3>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {pendingMutation.type === 'uploadResumePdf'
                ? `This will upload the official 1-page PDF file (${pendingMutation.title}) directly to your Google Drive.`
                : pendingMutation.type === 'create'
                  ? `This will create a new Google Document titled "${pendingMutation.title}" in your Google Drive and populate it with ${pendingMutation.content.length} characters of text.`
                  : `This will append ${pendingMutation.content.length} characters to the end of your existing Google Document "${pendingMutation.targetDocName}".`}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
              <button
                type="button"
                disabled={isMutating}
                onClick={() => setPendingMutation(null)}
                className="px-4 py-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isMutating}
                onClick={confirmAndExecuteMutation}
                className="px-5 py-2 text-xs font-mono font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#d62f3c] cursor-pointer disabled:opacity-50"
              >
                {isMutating
                  ? 'Saving to Google Workspace...'
                  : pendingMutation.type === 'uploadResumePdf'
                    ? 'Confirm & Upload PDF'
                    : pendingMutation.type === 'create'
                      ? 'Confirm & Create Doc'
                      : 'Confirm & Update Doc'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
