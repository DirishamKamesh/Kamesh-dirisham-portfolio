'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  X,
  FolderGit2,
  Terminal,
} from 'lucide-react';
import {
  featuredProjects,
  secondaryRepositories,
  ProjectCaseStudy,
  ProjectFilterCategory,
} from '@/data/projects';
import {
  ProjectCard,
  ProjectCardLayoutVariant,
} from '@/components/projects/ProjectCard';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { soundController } from '@/lib/sound';

const FILTER_CATEGORIES: ProjectFilterCategory[] = [
  'All Work',
  'Developer Tooling',
  'Full-Stack & Systems',
  'Frontend & UI',
];

export function SelectedWorkSection() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilterCategory>('All Work');
  const [inspectedProject, setInspectedProject] =
    useState<ProjectCaseStudy | null>(null);

  const filteredProjects =
    activeFilter === 'All Work'
      ? featuredProjects
      : featuredProjects.filter(
          (project) => project.filterCategory === activeFilter
        );

  useEffect(() => {
    if (!inspectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectedProject]);

  const resolveCardVariant = (idx: number): ProjectCardLayoutVariant => {
    if (idx === 0 && activeFilter === 'All Work') return 'flagship';
    return idx % 2 === 1 ? 'alternating-right' : 'alternating-left';
  };

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="bg-[#F1FAEE] border-b border-[#A8DADC] py-20 sm:py-28 scroll-mt-20"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-14">
        {/* Section Header + Functional Category Filter */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#A8DADC]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono font-semibold text-[#E63946] tracking-wide">
              01. SELECTED WORK & CASE STUDIES
            </p>
            <h2
              id="selected-work-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[#1D3557] tracking-tight text-balance"
            >
              Software projects paired with interactive UI simulations.
            </h2>
            <p className="text-sm sm:text-base text-[#457B9D] leading-relaxed">
              Each card includes a client-side UI simulation to illustrate the
              project&apos;s workflow alongside direct links to its public GitHub
              repository, hosted web preview, or full engineering case study.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by technical category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-[#A8DADC] self-start lg:self-auto"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    soundController.playSubtleTick(540);
                    setActiveFilter(category);
                  }}
                  className={`px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946] ${
                    isActive
                      ? 'bg-[#E63946] text-[#F1FAEE] font-semibold'
                      : 'text-[#457B9D] hover:text-[#1D3557]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Flagship #01 + Alternating Asymmetric Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              layoutVariant={resolveCardVariant(idx)}
              onQuickInspect={(proj) => setInspectedProject(proj)}
            />
          ))}
        </div>

        {/* PART 2: Continuous Practice & Problem Solving Strip */}
        <ScrollReveal
          delay={0.08}
          className="pt-14 border-t border-[#A8DADC] space-y-8 scroll-mt-20"
        >
          <div
            id="practice-strip"
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono font-semibold text-[#E63946]">
                PART 2 · CONTINUOUS PRACTICE & ADDITIONAL REPOSITORIES
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1D3557]">
                Coursework logs, Java/C DSA repositories, and student prototypes
              </h3>
            </div>
            <a
              href="https://github.com/DirishamKamesh?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#E63946] hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
            >
              <span>View all repositories on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryRepositories.map((repo) => (
              <div
                key={repo.name}
                className="bg-white border border-[#A8DADC] p-6 flex flex-col justify-between gap-5 hover:border-[#457B9D] transition-colors shadow-[0_4px_20px_rgba(29,53,87,0.03)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#457B9D]">
                    <span>{repo.category}</span>
                    <span className="text-[#1D3557] font-semibold">
                      {repo.statusNote}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[#1D3557] flex items-center gap-2">
                    <FolderGit2
                      className="w-4 h-4 text-[#E63946] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{repo.title}</span>
                  </h4>

                  <p className="text-sm text-[#457B9D] leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#A8DADC]/80 text-xs font-mono">
                  <p className="text-[#1D3557] font-medium">
                    {repo.technologies.join(' · ')}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {repo.repoUrl ? (
                      <a
                        href={repo.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#1D3557] font-semibold hover:text-[#E63946] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                      >
                        <span>GitHub Repo</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <span className="text-[#457B9D]">
                        {repo.locationOrPath}
                      </span>
                    )}

                    {repo.liveDemoUrl && (
                      <a
                        href={repo.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#E63946] font-semibold hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                      >
                        <span>
                          {repo.liveDemoLabel || 'Hosted Prototype'}
                        </span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Modal Interactive UI Simulation Inspector */}
      {inspectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 bg-[#1D3557]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="bg-white border border-[#457B9D] max-w-4xl w-full overflow-hidden my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#A8DADC] bg-[#F1FAEE]">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#457B9D]">
                <span className="text-[#E63946] font-semibold">
                  {inspectedProject.index}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#1D3557] font-semibold">
                  INTERACTIVE UI SIMULATION
                </span>
                <span aria-hidden="true">·</span>
                <span>{inspectedProject.statusLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setInspectedProject(null)}
                aria-label="Close UI simulation modal"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-[#1D3557] bg-white border border-[#457B9D] hover:border-[#E63946] hover:text-[#E63946] transition-colors cursor-pointer"
              >
                <span>ESC</span>
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
              <div className="border border-[#A8DADC]">
                <ProjectVisual
                  variant={inspectedProject.visualVariant}
                  caption={inspectedProject.visualCaption}
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3
                    id="modal-project-title"
                    className="font-display text-2xl sm:text-3xl font-bold text-[#1D3557]"
                  >
                    {inspectedProject.title} — {inspectedProject.subtitle}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#457B9D] leading-relaxed">
                  {inspectedProject.purposeAndProblem.overview}
                </p>
                <p className="text-xs font-mono text-[#1D3557] bg-[#F1FAEE] p-3 border border-[#A8DADC]">
                  {inspectedProject.demoVerificationNote}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[#A8DADC] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/work/${inspectedProject.slug}`}
                  onClick={() => setInspectedProject(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Open Full Engineering Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  {inspectedProject.repoUrl ? (
                    <a
                      href={inspectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#1D3557] font-semibold hover:text-[#E63946] transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[#457B9D] font-semibold">
                      <Terminal
                        className="w-3.5 h-3.5 text-[#E63946]"
                        aria-hidden="true"
                      />
                      <span>Local Prototype</span>
                    </span>
                  )}

                  {inspectedProject.liveDemoUrl && (
                    <a
                      href={inspectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#E63946] font-semibold hover:underline underline-offset-4"
                    >
                      <span>
                        {inspectedProject.liveDemoLabel || 'Live Preview'}
                      </span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
