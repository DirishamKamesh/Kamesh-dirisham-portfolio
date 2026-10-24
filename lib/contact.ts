import { profileData } from '@/data/profile';

export type InquiryCategory =
  | 'Freelance Project'
  | 'Internship Opportunity'
  | 'Technical Collaboration'
  | 'General Inquiry';

export interface InquiryFormPayload {
  name: string;
  email: string;
  inquiryType: InquiryCategory;
  serviceInterest?: string;
  organizationOrRole?: string;
  message: string;
}

export interface InquiryValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiryForm(payload: InquiryFormPayload): InquiryValidationErrors {
  const errors: InquiryValidationErrors = {};

  const trimmedName = payload.name.trim();
  if (!trimmedName) {
    errors.name = 'Please enter your name so I know who is reaching out.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  const trimmedEmail = payload.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please provide a valid email address for replies.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email format (for example, name@company.com).';
  }

  const trimmedMessage = payload.message.trim();
  if (!trimmedMessage) {
    errors.message = 'Please include a short summary of your project, role, or question.';
  } else if (trimmedMessage.length < 15) {
    errors.message = 'Please share a bit more detail (at least 15 characters).';
  }

  return errors;
}

export function buildFormattedInquiryBody(payload: InquiryFormPayload): {
  subject: string;
  bodyText: string;
  mailtoHref: string;
} {
  const subjectPrefix =
    payload.inquiryType === 'Internship Opportunity'
      ? '[Internship Inquiry]'
      : payload.inquiryType === 'Freelance Project'
        ? '[Freelance Project]'
        : `[${payload.inquiryType}]`;

  const subject = `${subjectPrefix} ${payload.name.trim()}${
    payload.organizationOrRole?.trim() ? ` — ${payload.organizationOrRole.trim()}` : ''
  }`;

  const lines = [
    `Hello Dirisham,`,
    ``,
    payload.message.trim(),
    ``,
    `---`,
    `Sender Details:`,
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Inquiry Type: ${payload.inquiryType}`,
    ...(payload.organizationOrRole?.trim()
      ? [`Organization / Context: ${payload.organizationOrRole.trim()}`]
      : []),
    ...(payload.serviceInterest?.trim()
      ? [`Relevant Capability: ${payload.serviceInterest.trim()}`]
      : []),
  ];

  const bodyText = lines.join('\n');
  const mailtoHref = `mailto:${profileData.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyText)}`;

  return {
    subject,
    bodyText,
    mailtoHref,
  };
}
