'use client';

import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { servicesData, collaborationSteps } from '@/data/services';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Magnetic } from '@/components/ui/MagneticButton';
import { soundController } from '@/lib/sound';

interface ServicesSectionProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForInquiry }: ServicesSectionProps) {
  const handleStartProject = (serviceTitle?: string) => {
    soundController.playSubtleTick(600);
    if (serviceTitle && onSelectServiceForInquiry) {
      onSelectServiceForInquiry(serviceTitle);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] py-20 sm:py-28 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
        {/* Section Heading */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono font-semibold text-[#E63946] tracking-wide">
              02. CAPABILITIES &amp; FREELANCE SERVICES
            </p>
            <h2
              id="capabilities-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight text-balance"
            >
              Frontend execution focused on clarity, responsiveness, and craft.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Available for selective freelance collaborations alongside my B.Tech studies.
              Instead of overpromising agency-scale retainers, I take on well-scoped frontend
              and React builds where I can deliver clean, working software.
            </p>
          </div>

          <Magnetic strength={0.24}>
            <button
              type="button"
              onClick={() => handleStartProject()}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[var(--accent-primary)] hover:text-[var(--accent-primary-fg)] transition-colors self-start lg:self-auto cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
            >
              <span>Start a project</span>
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Magnetic>
        </ScrollReveal>

        {/* Editorial Capabilities Ledger */}
        <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start hover:bg-[var(--bg-surface)] transition-colors px-2 sm:px-4"
            >
              {/* Index + Service Title */}
              <div className="lg:col-span-4 space-y-2">
                <span className="text-xs font-mono font-semibold text-[#E63946] tabular-nums">
                  {service.index}. Capability
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {service.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Ideal for: {service.idealFor}
                </p>
              </div>

              {/* Client Value & Detailed Description */}
              <div className="lg:col-span-5 space-y-3">
                <p className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                  {service.clientValue}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {service.description}
                </p>
                <p className="text-xs font-mono font-medium text-[#A8DADC] pt-1">
                  {service.deliverables.join(' · ')}
                </p>
              </div>

              {/* Direct Inquiry Trigger */}
              <div className="lg:col-span-3 flex lg:justify-end items-center pt-2 lg:pt-0">
                <button
                  type="button"
                  onClick={() => handleStartProject(service.title)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] hover:bg-[#F1FAEE] hover:text-[#0D1929] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                >
                  <span>Inquire about this</span>
                  <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Straightforward Collaboration Process */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-10 space-y-8 shadow-[0_8px_28px_rgba(6,13,22,0.22)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <div className="space-y-1.5">
              <p className="text-xs font-mono font-semibold text-[#E63946]">
                COLLABORATION WORKFLOW
              </p>
              <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                How freelance and collaborative projects work
              </h3>
            </div>
            <p className="text-xs font-mono text-[var(--text-secondary)]">
              Transparent communication · Working browser previews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborationSteps.map((item) => (
              <div key={item.phase} className="space-y-3">
                <p className="text-xs font-mono font-semibold text-[#E63946] tabular-nums">
                  {item.phase}
                </p>
                <h4 className="font-display text-lg font-bold text-[var(--text-primary)]">
                  {item.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
