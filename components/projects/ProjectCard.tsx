'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Eye, Terminal } from 'lucide-react';
import { ProjectCaseStudy } from '@/data/projects';
import { ProjectVisual } from './ProjectVisual';
import { TiltCard3D } from '@/components/ui/TiltCard3D';
import { Magnetic } from '@/components/ui/MagneticButton';
import { soundController } from '@/lib/sound';

export type ProjectCardLayoutVariant =
  | 'flagship'
  | 'alternating-right'
  | 'alternating-left'
  | 'grid';

interface ProjectCardProps {
  project: ProjectCaseStudy;
  layoutVariant?: ProjectCardLayoutVariant;
  onQuickInspect?: (project: ProjectCaseStudy) => void;
}

export function ProjectCard({
  project,
  layoutVariant = 'alternating-left',
  onQuickInspect,
}: ProjectCardProps) {
  const isFlagship = layoutVariant === 'flagship';
  const isVisualRight = layoutVariant === 'alternating-right';
  const isFullRow = layoutVariant !== 'grid';

  return (
    <TiltCard3D
      maxTilt={isFlagship ? 1.8 : 2.2}
      className={isFullRow ? 'lg:col-span-12' : 'lg:col-span-6'}
    >
      <article
        className={`group bg-[var(--bg-surface)] border transition-colors duration-200 flex flex-col justify-between h-full ${
          isFlagship
            ? 'border-[#457B9D] shadow-[0_14px_40px_rgba(6,13,22,0.35)]'
            : 'border-[var(--border-subtle)] hover:border-[#457B9D] shadow-[0_8px_28px_rgba(6,13,22,0.22)]'
        }`}
      >
        {isFlagship && (
          <div className="px-6 py-2.5 bg-[#1D3557] border-b border-[#457B9D] text-[#F1FAEE] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="font-semibold tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E63946]" aria-hidden="true" />
              <span>FLAGSHIP SHOWCASE #01 · DEVELOPER TOOLING &amp; CODE INTELLIGENCE</span>
            </span>
            <span className="text-[#A8DADC]">
              Interactive UI Simulation + Public GitHub Repository
            </span>
          </div>
        )}

        <div
          className={`grid grid-cols-1 ${
            isFullRow ? 'lg:grid-cols-12' : ''
          } h-full items-stretch`}
        >
          {/* Interactive UI Simulation Column */}
          <div
            className={`${
              isFlagship
                ? 'lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]'
                : isVisualRight
                  ? 'lg:col-span-7 lg:order-2 border-b lg:border-b-0 lg:border-l border-[var(--border-subtle)]'
                  : isFullRow
                    ? 'lg:col-span-7 lg:order-1 border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)]'
                    : 'border-b border-[var(--border-subtle)]'
            } flex flex-col`}
          >
            <ProjectVisual
              variant={project.visualVariant}
              caption={isFlagship ? project.visualCaption : undefined}
              className="h-full"
            />
          </div>

          {/* Concise Editorial Content Column */}
          <div
            className={`${
              isFlagship
                ? 'lg:col-span-5 p-6 sm:p-9 lg:p-11'
                : isVisualRight
                  ? 'lg:col-span-5 lg:order-1 p-6 sm:p-8 lg:p-9'
                  : isFullRow
                    ? 'lg:col-span-5 lg:order-2 p-6 sm:p-8 lg:p-9'
                    : 'p-6 sm:p-7'
            } flex flex-col justify-between gap-6`}
          >
            <div className="space-y-4">
              {/* Unboxed Metadata Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <span className="text-[#E63946] font-semibold tabular-nums">
                  {isFlagship ? `FLAGSHIP ${project.index}` : project.index}
                </span>
                <span aria-hidden="true" className="text-[#457B9D]">
                  ·
                </span>
                <span>{project.category}</span>
                <span aria-hidden="true" className="text-[#457B9D]">
                  ·
                </span>
                <span className="text-[#A8DADC] font-medium">
                  {project.statusLabel}
                </span>
              </div>

              {/* Project Title & Subtitle */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className={`font-display font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[#A8DADC] transition-colors ${
                      isFlagship
                        ? 'text-3xl sm:text-4xl'
                        : 'text-2xl sm:text-3xl'
                    }`}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor-label="CASE STUDY"
                      onClick={() => soundController.playSubtleTick(580)}
                      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A8DADC]"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <span className="text-xs font-mono text-[var(--text-secondary)] tabular-nums shrink-0">
                    {project.year}
                  </span>
                </div>
                <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                  {project.subtitle}
                </p>
              </div>

              {/* Concise Summary */}
              <p className="text-sm sm:text-base text-[var(--text-primary)]/90 leading-relaxed max-w-[58ch]">
                {project.shortDescription}
              </p>

              {/* Explicit Credibility & Scope Disclosure */}
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {project.authenticityNote}
              </p>

              {/* Unboxed Technology Stack List */}
              <div className="pt-1">
                <p className="text-[11px] font-mono text-[#457B9D] mb-1">
                  TECHNOLOGIES
                </p>
                <p className="text-xs font-mono font-medium text-[var(--text-primary)] leading-relaxed">
                  {project.technologies.join(' · ')}
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Primary Button: Frosted Blue (#A8DADC) with Dark Navy (#0D1929) text */}
                <Magnetic strength={0.2}>
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={() => soundController.playSubtleTick(620)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] hover:bg-[#F1FAEE] hover:text-[#0D1929] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </Magnetic>

                {onQuickInspect && (
                  <button
                    type="button"
                    onClick={() => {
                      soundController.playSubtleTick(540);
                      onQuickInspect(project);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[var(--bg-canvas)] text-[var(--text-primary)] border border-[#457B9D] hover:border-[#A8DADC] hover:text-[#A8DADC] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Interactive UI Simulation</span>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source repository on GitHub`}
                    className="inline-flex items-center gap-1 text-[#A8DADC] font-semibold hover:text-[#F1FAEE] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                  >
                    <span>GitHub Repo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] font-medium whitespace-nowrap shrink-0">
                    <Terminal
                      className="w-3.5 h-3.5 text-[#A8DADC]"
                      aria-hidden="true"
                    />
                    <span>Local Prototype</span>
                  </span>
                )}

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open verified ${project.liveDemoLabel || 'Live Preview'} for ${project.title}`}
                    className="inline-flex items-center gap-1 text-[#E63946] font-semibold hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                  >
                    <span>{project.liveDemoLabel || 'Live Preview'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </TiltCard3D>
  );
}
