'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Mail, FileText, Download } from 'lucide-react';
import { profileData } from '@/data/profile';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { soundController } from '@/lib/sound';

export function AboutAndProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = profileData.engineeringProcess[activeStepIndex];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] py-20 sm:py-28 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-24">
        {/* Part 1: About & Engineering Direction */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Academic & Identity Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono font-semibold text-[#E63946] tracking-wide">
                04. ABOUT &amp; ENGINEERING DIRECTION
              </p>
              <h2
                id="about-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight text-balance"
              >
                {profileData.aboutNarrative.lead}
              </h2>
            </div>

            {/* Structured Academic & Profile Coordinates */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-5 shadow-[0_8px_28px_rgba(6,13,22,0.2)]">
              <div className="space-y-1 pb-4 border-b border-[var(--border-subtle)]">
                <p className="text-xs font-mono text-[#457B9D]">
                  INSTITUTION &amp; DEGREE
                </p>
                <p className="text-base font-semibold text-[var(--text-primary)]">
                  {profileData.education.degree} in {profileData.education.field}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {profileData.education.institution} · {profileData.education.currentYear} (Graduating{' '}
                  <span className="tabular-nums">{profileData.education.expectedGraduation}</span>)
                </p>
              </div>

              <div className="space-y-1 pb-4 border-b border-[var(--border-subtle)]">
                <p className="text-xs font-mono text-[#457B9D]">
                  CERTIFICATION &amp; HACKATHON EXPERIENCE
                </p>
                {profileData.certifications.map((cert) => (
                  <div key={cert.title} className="space-y-0.5">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {cert.title}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Coursework: {cert.coursework}
                    </p>
                  </div>
                ))}
                {profileData.achievements.map((ach) => (
                  <p
                    key={ach}
                    className="text-xs text-[#A8DADC] pt-1 leading-relaxed"
                  >
                    · {ach}
                  </p>
                ))}
              </div>

              <div className="space-y-1 pb-4 border-b border-[var(--border-subtle)]">
                <p className="text-xs font-mono text-[#457B9D]">BASE OF OPERATIONS</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {profileData.location.display}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono text-[#457B9D]">
                  LONG-TERM TECHNICAL TRAJECTORY
                </p>
                <ul className="space-y-1.5 text-xs font-mono font-medium text-[var(--text-primary)]">
                  {profileData.aboutNarrative.longTermDirection.map((item, idx) => (
                    <li key={item} className="flex items-baseline gap-2">
                      <span className="text-[#E63946] font-semibold tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verified Resume Handling Card */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-3.5 shadow-[0_8px_28px_rgba(6,13,22,0.2)]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-[#E63946] flex items-center gap-2">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>CURRICULUM VITAE / RESUME</span>
                </span>
                <span className="text-xs font-mono text-[#A8DADC] font-semibold">
                  {profileData.resume.available ? 'PDF READY' : 'IN PREPARATION'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {profileData.resume.statusNote}
              </p>

              {profileData.resume.available && profileData.resume.url ? (
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={profileData.resume.url}
                    download={profileData.resume.fileName || 'Dirisham_Kamesh_Resume.pdf'}
                    onClick={() => soundController.playSubtleTick(600)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[var(--accent-primary)] hover:text-[var(--accent-primary-fg)] transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Download Resume (PDF)</span>
                  </a>
                  <a
                    href={profileData.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundController.playSubtleTick(540)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-semibold bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[#457B9D] hover:border-[#A8DADC] hover:text-[#A8DADC] transition-colors whitespace-nowrap"
                  >
                    <span>View PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              ) : (
                <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-mono">
                  <a
                    href={`mailto:${profileData.contact.email}?subject=${encodeURIComponent(
                      'Internship / Academic Summary Request — Dirisham Kamesh'
                    )}`}
                    className="inline-flex items-center gap-1.5 text-[#A8DADC] font-semibold hover:underline underline-offset-4"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Request Academic &amp; Project Overview via Email</span>
                  </a>
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--text-primary)] hover:text-[#A8DADC] transition-colors"
                  >
                    <span>GitHub Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Narrative Prose & Engineering Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 space-y-6 shadow-[0_8px_28px_rgba(6,13,22,0.2)]">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 text-xs font-mono text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  DEVELOPER PERSPECTIVE
                </span>
                <span className="text-[#A8DADC]">VIGNAN, DUVVADA · B.TECH &apos;29</span>
              </div>

              <div className="space-y-5 text-base sm:text-lg leading-relaxed">
                {profileData.aboutNarrative.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[var(--text-secondary)] first:text-[var(--text-primary)] first:font-medium"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs font-mono font-semibold text-[#A8DADC]">CRAFT</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                    Clean Component Hierarchy
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Separating typed data from UI presentation for maintainable builds.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                    DISCIPLINE
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                    Responsive &amp; Accessible
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Designing mobile-first with keyboard navigation and contrast awareness.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                    AMBITION
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                    Product-Minded Growth
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Expanding from frontend interfaces into full-stack systems and AI/ML.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Part 2: Interactive Engineering Process Inspector */}
        <ScrollReveal
          delay={0.08}
          className="pt-12 border-t border-[var(--border-subtle)] space-y-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono font-semibold text-[#E63946] tracking-wide">
                05. INTENDED WORKING METHOD &amp; ENGINEERING PROCESS
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight text-balance">
                Six-stage approach from problem definition to verified build.
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                This outlines my structured engineering workflow when building personal
                applications, hackathon prototypes, and freelance frontend deliverables.
              </p>
            </div>
            <p className="text-xs font-mono text-[var(--text-secondary)]">
              Select any stage below to inspect its focus
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step Selector List */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profileData.engineeringProcess.map((stepObj, idx) => {
                const isSelected = idx === activeStepIndex;
                return (
                  <button
                    key={stepObj.step}
                    type="button"
                    onClick={() => {
                      soundController.playSubtleTick(560);
                      setActiveStepIndex(idx);
                    }}
                    className={`p-5 text-left border transition-colors cursor-pointer flex flex-col justify-between gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC] ${
                      isSelected
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] border-[var(--accent-primary)]'
                        : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[#457B9D]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full text-xs font-mono">
                      <span
                        className={`tabular-nums font-semibold ${
                          isSelected ? 'text-[#0D1929]' : 'text-[#A8DADC]'
                        }`}
                      >
                        STAGE {stepObj.step}
                      </span>
                      <span
                        className={
                          isSelected
                            ? 'text-[#1D3557] font-medium'
                            : 'text-[var(--text-secondary)]'
                        }
                      >
                        {stepObj.deliverable.split('&')[0]}
                      </span>
                    </div>
                    <p
                      className={`font-display text-base font-bold ${
                        isSelected
                          ? 'text-[var(--accent-primary-fg)]'
                          : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {stepObj.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Blueprint Panel */}
            <div className="lg:col-span-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 flex flex-col justify-between space-y-6 shadow-[0_8px_28px_rgba(6,13,22,0.2)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-4">
                  <span className="text-[#A8DADC] font-semibold tabular-nums">
                    ACTIVE STAGE · {activeStep.step} / 06
                  </span>
                  <span>WORKFLOW SPECIFICATION</span>
                </div>

                <h4 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  {activeStep.title}
                </h4>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {activeStep.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono text-[#457B9D]">STAGE ARTIFACT</p>
                  <p className="text-sm font-mono font-semibold text-[#A8DADC] mt-0.5">
                    {activeStep.deliverable}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundController.playSubtleTick(480);
                      setActiveStepIndex((prev) =>
                        (prev - 1 + profileData.engineeringProcess.length) %
                        profileData.engineeringProcess.length
                      );
                    }}
                    className="px-3 py-1.5 text-xs font-mono bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[#457B9D] hover:border-[#A8DADC] hover:text-[#A8DADC] transition-colors cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundController.playSubtleTick(580);
                      setActiveStepIndex(
                        (prev) => (prev + 1) % profileData.engineeringProcess.length
                      );
                    }}
                    className="px-3 py-1.5 text-xs font-mono bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] font-semibold hover:bg-[#F1FAEE] hover:text-[#0D1929] transition-colors cursor-pointer"
                  >
                    Next Stage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
