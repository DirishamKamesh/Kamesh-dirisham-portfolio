'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import { profileData } from '@/data/profile';
import { servicesData } from '@/data/services';
import {
  InquiryCategory,
  InquiryFormPayload,
  InquiryValidationErrors,
  validateInquiryForm,
  buildFormattedInquiryBody,
} from '@/lib/contact';
import { Magnetic } from '@/components/ui/MagneticButton';
import { soundController } from '@/lib/sound';

interface ContactSectionProps {
  preselectedService?: string;
}

const INQUIRY_TYPES: InquiryCategory[] = [
  'Freelance Project',
  'Internship Opportunity',
  'Technical Collaboration',
  'General Inquiry',
];

export function ContactSection({ preselectedService }: ContactSectionProps) {
  const [formState, setFormState] = useState<InquiryFormPayload>({
    name: '',
    email: '',
    inquiryType: 'Freelance Project',
    serviceInterest: preselectedService || '',
    organizationOrRole: '',
    message: '',
  });

  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [preparedMail, setPreparedMail] = useState<{
    subject: string;
    bodyText: string;
    mailtoHref: string;
  } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  const handleCopyEmail = async () => {
    soundController.playSubtleTick(600);
    try {
      await navigator.clipboard.writeText(profileData.contact.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyFormattedDraft = async () => {
    if (!preparedMail) return;
    soundController.playSubtleTick(620);
    try {
      await navigator.clipboard.writeText(
        `To: ${profileData.contact.email}\nSubject: ${preparedMail.subject}\n\n${preparedMail.bodyText}`
      );
      setMessageCopied(true);
      setTimeout(() => setMessageCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateInquiryForm(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      soundController.playSubtleTick(320);
      setPreparedMail(null);
      return;
    }

    soundController.playSubtleTick(680);
    const formatted = buildFormattedInquiryBody(formState);
    setPreparedMail(formatted);

    window.location.href = formatted.mailtoHref;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#F1FAEE] py-20 sm:py-28 scroll-mt-20"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-mono font-semibold text-[#E63946] tracking-wide">
                06. CONTACT & DIRECT INQUIRY
              </p>
              <h2
                id="contact-heading"
                className="font-display text-3xl sm:text-5xl font-bold text-[#1D3557] tracking-tight leading-[1.08] text-balance"
              >
                Have a problem worth building something for?
              </h2>
              <p className="text-sm sm:text-base text-[#457B9D] leading-relaxed">
                Whether you are an engineering recruiter evaluating internship candidates,
                a founder needing a responsive frontend, or a developer looking to collaborate—reach
                out directly via email or LinkedIn.
              </p>
            </div>

            {/* Verified Primary Email Card */}
            <div className="bg-white border border-[#A8DADC] p-6 space-y-4 shadow-[0_6px_24px_rgba(29,53,87,0.04)]">
              <p className="text-xs font-mono text-[#457B9D]">PRIMARY EMAIL ADDRESS</p>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="block font-mono text-base sm:text-lg font-bold text-[#E63946] hover:underline underline-offset-4 break-all"
              >
                {profileData.contact.email}
              </a>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`mailto:${profileData.contact.email}`}
                  onClick={() => soundController.playSubtleTick(580)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open Email App</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-[#F1FAEE] text-[#1D3557] border border-[#457B9D] hover:border-[#E63946] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {emailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#E63946]" aria-hidden="true" />
                      <span className="text-[#E63946] font-semibold">Copied Address</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Social Profiles */}
            <div className="bg-white border border-[#A8DADC] divide-y divide-[#A8DADC] shadow-[0_6px_24px_rgba(29,53,87,0.04)]">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 flex items-center justify-between hover:bg-[#F1FAEE] transition-colors group"
              >
                <div>
                  <p className="text-xs font-mono text-[#457B9D]">GITHUB REPOSITORIES</p>
                  <p className="text-sm font-semibold text-[#1D3557] group-hover:text-[#E63946] transition-colors mt-0.5">
                    github.com/DirishamKamesh
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#457B9D] group-hover:text-[#E63946]" aria-hidden="true" />
              </a>

              <a
                href={profileData.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 flex items-center justify-between hover:bg-[#F1FAEE] transition-colors group"
              >
                <div>
                  <p className="text-xs font-mono text-[#457B9D]">PROFESSIONAL NETWORK</p>
                  <p className="text-sm font-semibold text-[#1D3557] group-hover:text-[#E63946] transition-colors mt-0.5">
                    linkedin.com/in/dirishamkamesh
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#457B9D] group-hover:text-[#E63946]" aria-hidden="true" />
              </a>

              <a
                href={profileData.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 flex items-center justify-between hover:bg-[#F1FAEE] transition-colors group"
              >
                <div>
                  <p className="text-xs font-mono text-[#457B9D]">INSTAGRAM (@{profileData.contact.instagramHandle})</p>
                  <p className="text-sm font-semibold text-[#1D3557] group-hover:text-[#E63946] transition-colors mt-0.5">
                    instagram.com/{profileData.contact.instagramHandle}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#457B9D] group-hover:text-[#E63946]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Validated Inquiry Composer with Transparent Mailto Action */}
          <div className="lg:col-span-7 bg-white border border-[#A8DADC] p-6 sm:p-10 space-y-6 shadow-[0_8px_30px_rgba(29,53,87,0.05)]">
            <div className="border-b border-[#A8DADC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1D3557]">
                  Prepare a structured inquiry
                </h3>
                <p className="text-xs text-[#457B9D] mt-1">
                  Validates your details and prepares a formatted message directly for{' '}
                  <span className="font-mono font-semibold text-[#1D3557]">
                    {profileData.contact.email}
                  </span>
                  .
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-[#457B9D] shrink-0">
                DIRECT MAILTO COMPOSER
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Inquiry Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-[#1D3557]">
                  INQUIRY CATEGORY
                </label>
                <div
                  role="group"
                  aria-label="Select inquiry category"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  {INQUIRY_TYPES.map((type) => {
                    const active = formState.inquiryType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          soundController.playSubtleTick(520);
                          setFormState((prev) => ({ ...prev, inquiryType: type }));
                        }}
                        className={`py-2.5 px-3.5 text-left text-xs font-medium border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#E63946] text-[#F1FAEE] border-[#E63946] font-semibold'
                            : 'bg-[#F1FAEE] text-[#1D3557] border-[#A8DADC] hover:border-[#457B9D]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-mono font-semibold text-[#1D3557]"
                  >
                    YOUR NAME <span className="text-[#E63946]">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Priya Sharma"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F1FAEE] border border-[#457B9D] text-[#1D3557] placeholder:text-[#457B9D]/60 focus:border-[#E63946] focus:outline-none"
                  />
                  {errors.name && (
                    <p id="inquiry-name-error" role="alert" className="text-xs font-medium text-[#E63946]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-mono font-semibold text-[#1D3557]"
                  >
                    YOUR EMAIL <span className="text-[#E63946]">*</span>
                  </label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => {
                      setFormState((prev) => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="name@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F1FAEE] border border-[#457B9D] text-[#1D3557] placeholder:text-[#457B9D]/60 focus:border-[#E63946] focus:outline-none"
                  />
                  {errors.email && (
                    <p id="inquiry-email-error" role="alert" className="text-xs font-medium text-[#E63946]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Company / Role or Service Interest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-org"
                    className="block text-xs font-mono text-[#457B9D]"
                  >
                    COMPANY / TEAM (OPTIONAL)
                  </label>
                  <input
                    id="inquiry-org"
                    name="organizationOrRole"
                    type="text"
                    value={formState.organizationOrRole}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        organizationOrRole: e.target.value,
                      }))
                    }
                    placeholder="Organization or project name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F1FAEE] border border-[#457B9D] text-[#1D3557] placeholder:text-[#457B9D]/60 focus:border-[#E63946] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="inquiry-service"
                    className="block text-xs font-mono text-[#457B9D]"
                  >
                    CAPABILITY FOCUS (OPTIONAL)
                  </label>
                  <select
                    id="inquiry-service"
                    name="serviceInterest"
                    value={formState.serviceInterest}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        serviceInterest: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F1FAEE] border border-[#457B9D] text-[#1D3557] focus:border-[#E63946] focus:outline-none"
                  >
                    <option value="">General / Not specific</option>
                    {servicesData.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Body */}
              <div className="space-y-1.5">
                <label
                  htmlFor="inquiry-message"
                  className="block text-xs font-mono font-semibold text-[#1D3557]"
                >
                  PROJECT DETAILS OR ROLE SUMMARY <span className="text-[#E63946]">*</span>
                </label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => {
                    setFormState((prev) => ({ ...prev, message: e.target.value }));
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Share context on your project goals, internship role, or timeline..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F1FAEE] border border-[#457B9D] text-[#1D3557] placeholder:text-[#457B9D]/60 focus:border-[#E63946] focus:outline-none resize-y"
                />
                {errors.message && (
                  <p id="inquiry-message-error" role="alert" className="text-xs font-medium text-[#E63946]">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Magnetic strength={0.22}>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                  >
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Prepare & Open in Email App</span>
                  </button>
                </Magnetic>

                <p className="text-xs text-[#457B9D] leading-relaxed">
                  No backend database stores your message—this opens your email client with a
                  pre-addressed draft to{' '}
                  <span className="font-semibold text-[#1D3557]">kameshdirisham@gmail.com</span>.
                </p>
              </div>
            </form>

            {/* Transparent Confirmation & Clipboard Backup Panel */}
            {preparedMail && (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 p-5 bg-[#F1FAEE] border-2 border-[#E63946] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-mono font-semibold text-[#E63946]">
                    EMAIL DRAFT PREPARED · READY TO SEND IN YOUR MAIL CLIENT
                  </p>
                  <a
                    href={preparedMail.mailtoHref}
                    className="text-xs font-mono font-semibold text-[#1D3557] underline underline-offset-4 hover:text-[#E63946]"
                  >
                    Re-open mailto link
                  </a>
                </div>

                <p className="text-xs text-[#457B9D] leading-relaxed">
                  Your default email application was triggered. If your browser does not have a
                  configured mail handler, copy the formatted message below and send it to{' '}
                  <span className="font-mono font-semibold text-[#1D3557]">
                    {profileData.contact.email}
                  </span>
                  .
                </p>

                <pre className="p-3 bg-white border border-[#A8DADC] text-xs font-mono text-[#1D3557] overflow-x-auto whitespace-pre-wrap">
                  {`Subject: ${preparedMail.subject}\n\n${preparedMail.bodyText}`}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyFormattedDraft}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-white text-[#1D3557] border border-[#457B9D] hover:border-[#E63946] transition-colors cursor-pointer"
                  >
                    {messageCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#E63946]" aria-hidden="true" />
                        <span className="text-[#E63946] font-semibold">Copied Full Message</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Formatted Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
