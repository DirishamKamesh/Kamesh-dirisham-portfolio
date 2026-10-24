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
        className={`group bg-white border transition-colors duration-200 flex flex-col justify-between h-full ${
          isFlagship
            ? 'border-[#1D3557] shadow-[0_12px_36px_rgba(29,53,87,0.07)]'
            : 'border-[#A8DADC] hover:border-[#457B9D] shadow-[0_4px_20px_rgba(29,53,87,0.04)]'
        }`}
      >
        {isFlagship && (
          <div className="px-6 py-2.5 bg-[#1D3557] text-[#F1FAEE] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="font-semibold tracking-wide">
              FLAGSHIP SHOWCASE #01 · DEVELOPER TOOLING &amp; CODE INTELLIGENCE
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
                ? 'lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#A8DADC]'
                : isVisualRight
                  ? 'lg:col-span-7 lg:order-2 border-b lg:border-b-0 lg:border-l border-[#A8DADC]'
                  : isFullRow
                    ? 'lg:col-span-7 lg:order-1 border-b lg:border-b-0 lg:border-r border-[#A8DADC]'
                    : 'border-b border-[#A8DADC]'
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
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#457B9D]">
                <span className="text-[#E63946] font-semibold tabular-nums">
                  {isFlagship ? `FLAGSHIP ${project.index}` : project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#1D3557] font-medium">
                  {project.statusLabel}
                </span>
              </div>

              {/* Project Title & Subtitle */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className={`font-display font-bold text-[#1D3557] tracking-tight group-hover:text-[#E63946] transition-colors ${
                      isFlagship
                        ? 'text-3xl sm:text-4xl'
                        : 'text-2xl sm:text-3xl'
                    }`}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      data-cursor-label="CASE STUDY"
                      onClick={() => soundController.playSubtleTick(580)}
                      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <span className="text-xs font-mono text-[#457B9D] tabular-nums shrink-0">
                    {project.year}
                  </span>
                </div>
                <p className="text-xs font-mono font-semibold text-[#E63946]">
                  {project.subtitle}
                </p>
              </div>

              {/* Concise Summary */}
              <p className="text-sm sm:text-base text-[#1D3557]/85 leading-relaxed max-w-[58ch]">
                {project.shortDescription}
              </p>

              {/* Explicit Credibility & Scope Disclosure */}
              <p className="text-xs text-[#457B9D] leading-relaxed">
                {project.authenticityNote}
              </p>

              {/* Unboxed Technology Stack List */}
              <div className="pt-1">
                <p className="text-[11px] font-mono text-[#457B9D] mb-1">
                  TECHNOLOGIES
                </p>
                <p className="text-xs font-mono font-medium text-[#1D3557] leading-relaxed">
                  {project.technologies.join(' · ')}
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-5 border-t border-[#A8DADC]/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Magnetic strength={0.2}>
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={() => soundController.playSubtleTick(620)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#F1FAEE] text-[#1D3557] border border-[#457B9D] hover:border-[#E63946] hover:text-[#E63946] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
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
                    className="inline-flex items-center gap-1 text-[#1D3557] font-semibold hover:text-[#E63946] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                  >
                    <span>GitHub Repo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[#457B9D] font-medium whitespace-nowrap shrink-0">
                    <Terminal
                      className="w-3.5 h-3.5 text-[#E63946]"
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
                    className="inline-flex items-center gap-1 text-[#E63946] font-semibold hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
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
