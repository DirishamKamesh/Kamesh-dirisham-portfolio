'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Atom,
  Layers,
  FileCode2,
  Palette,
  Sparkles,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
import { frontendToolkitItems, FrontendToolkitItem } from '@/data/skills';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { soundController } from '@/lib/sound';

const TOOLKIT_ICONS: Record<
  FrontendToolkitItem['id'],
  React.ComponentType<{ className?: string }>
> = {
  react: Atom,
  nextjs: Layers,
  typescript: FileCode2,
  tailwindcss: Palette,
  'framer-motion': Sparkles,
};

export function TechStackSection() {
  const prefersReducedMotion = useReducedMotionPref();
  const [activeId, setActiveId] = useState<FrontendToolkitItem['id']>('react');

  const activeItem =
    frontendToolkitItems.find((item) => item.id === activeId) ??
    frontendToolkitItems[0];

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] py-20 sm:py-24 scroll-mt-20 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Restrained blueprint background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 blueprint-grid opacity-30"
      />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#E63946] tracking-wide">
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>FRONTEND TOOLKIT // CORE ARCHITECTURE</span>
            </div>
            <h2
              id="tech-stack-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight text-balance"
            >
              Core Frontend Tech Stack
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              The primary five-technology toolkit powering my interactive web
              applications, spatial node-graph visualizers, and responsive
              editorial interfaces.
            </p>
          </div>

          {/* Active Toolkit Status Readout */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-4 py-3 flex items-center gap-3 self-start lg:self-auto">
            <span
              className="w-2 h-2 rounded-full bg-[#E63946] shrink-0"
              aria-hidden="true"
            />
            <div className="text-xs font-mono">
              <span className="text-[var(--text-secondary)]">SELECTED SPEC: </span>
              <span className="text-[var(--text-primary)] font-semibold">
                {activeItem.name}
              </span>
              <span className="text-[#457B9D] ml-2">[{activeItem.badge}]</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Grid-Based Icon Cards (5-Card Responsive Grid) */}
        <div
          role="list"
          aria-label="Core frontend technologies"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {frontendToolkitItems.map((item, idx) => {
            const IconComponent = TOOLKIT_ICONS[item.id];
            const isSelected = activeId === item.id;

            return (
              <motion.article
                key={item.id}
                role="listitem"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 18 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.4,
                  delay: prefersReducedMotion ? 0 : idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion ? undefined : { y: -4 }
                }
                onClick={() => {
                  soundController.playSubtleTick(560);
                  setActiveId(item.id);
                }}
                onMouseEnter={() => {
                  setActiveId(item.id);
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    soundController.playSubtleTick(560);
                    setActiveId(item.id);
                  }
                }}
                aria-label={`${item.name} — ${item.role}`}
                className={`group relative bg-[var(--bg-surface)] border transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC] ${
                  isSelected
                    ? 'border-[var(--border-strong)] shadow-[0_12px_32px_rgba(6,13,22,0.32)]'
                    : 'border-[var(--border-subtle)] hover:border-[var(--border-strong)] shadow-[0_6px_20px_rgba(6,13,22,0.16)]'
                }`}
              >
                {/* Top Accent Line */}
                <div
                  aria-hidden="true"
                  className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-200 ${
                    isSelected
                      ? 'opacity-100 bg-[#E63946]'
                      : 'opacity-0 group-hover:opacity-100 bg-[#457B9D]'
                  }`}
                />

                <div className="space-y-5">
                  {/* Top Index + Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-semibold text-[#E63946] tabular-nums">
                      {item.index}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-secondary)] px-2 py-0.5 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] truncate">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon Badge Box */}
                  <div className="relative w-14 h-14 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] group-hover:border-[#457B9D] flex items-center justify-center transition-colors">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 blueprint-grid opacity-40"
                    />
                    <IconComponent
                      className={`relative w-7 h-7 transition-transform duration-300 group-hover:scale-110 ${
                        item.accentColor === '#E63946'
                          ? 'text-[#E63946]'
                          : item.accentColor === '#457B9D'
                            ? 'text-[#457B9D]'
                            : 'text-[var(--text-primary)]'
                      }`}
                    />
                  </div>

                  {/* Title & Engineering Role */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] tracking-tight flex items-center justify-between gap-2">
                      <span>{item.name}</span>
                    </h3>
                    <p className="text-xs font-mono font-medium text-[#457B9D]">
                      {item.role}
                    </p>
                  </div>

                  {/* Concise Description */}
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Verified Project Usage Footer */}
                <div className="pt-5 mt-6 border-t border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)]">
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-[#E63946] shrink-0"
                      aria-hidden="true"
                    />
                    <span>Verified in builds:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.verifiedIn.map((project) => (
                      <span
                        key={project}
                        className="text-[11px] font-mono px-2 py-0.5 bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[var(--border-subtle)]"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
