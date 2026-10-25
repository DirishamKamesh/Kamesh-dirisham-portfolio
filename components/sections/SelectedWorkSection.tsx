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
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] py-20 sm:py-28 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-14">
        {/* Section Header + Functional Category Filter */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono font-semibold text-[#E63946] tracking-wide">
              01. SELECTED WORK &amp; CASE STUDIES
            </p>
            <h2
              id="selected-work-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight text-balance"
            >
              Software projects paired with interactive UI simulations.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Each card includes a client-side UI simulation to illustrate the
              project&apos;s workflow alongside direct links to its public GitHub
              repository, hosted web preview, or full engineering case study.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by technical category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] self-start lg:self-auto"
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
                  className={`px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC] ${
                    isActive
                      ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
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
          className="pt-14 border-t border-[var(--border-subtle)] space-y-8 scroll-mt-20"
        >
          <div
            id="practice-strip"
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono font-semibold text-[#E63946]">
                PART 2 · CONTINUOUS PRACTICE &amp; ADDITIONAL REPOSITORIES
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Coursework logs, Java/C DSA repositories, and student prototypes
              </h3>
            </div>
            <a
              href="https://github.com/DirishamKamesh?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#A8DADC] hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
            >
              <span>View all repositories on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryRepositories.map((repo) => (
              <div
                key={repo.name}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between gap-5 hover:border-[#457B9D] transition-colors shadow-[0_6px_24px_rgba(6,13,22,0.2)]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--text-secondary)]">
                    <span>{repo.category}</span>
                    <span className="text-[#A8DADC] font-semibold">
                      {repo.statusNote}
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <FolderGit2
                      className="w-4 h-4 text-[#A8DADC] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{repo.title}</span>
                  </h4>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[var(--border-subtle)] text-xs font-mono">
                  <p className="text-[var(--text-primary)] font-medium">
                    {repo.technologies.join(' · ')}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {repo.repoUrl ? (
                      <a
                        href={repo.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#A8DADC] font-semibold hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                      >
                        <span>GitHub Repo</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <span className="text-[var(--text-secondary)]">
                        {repo.locationOrPath}
                      </span>
                    )}

                    {repo.liveDemoUrl && (
                      <a
                        href={repo.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#E63946] font-semibold hover:underline underline-offset-4 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
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
          className="fixed inset-0 z-50 bg-[#0D1929]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="bg-[var(--bg-surface)] border border-[#457B9D] max-w-4xl w-full overflow-hidden my-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <span className="text-[#E63946] font-semibold">
                  {inspectedProject.index}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--text-primary)] font-semibold">
                  INTERACTIVE UI SIMULATION
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A8DADC]">
                  {inspectedProject.statusLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectedProject(null)}
                aria-label="Close UI simulation modal"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[#457B9D] hover:border-[#A8DADC] hover:text-[#A8DADC] transition-colors cursor-pointer"
              >
                <span>ESC</span>
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
              <div className="border border-[var(--border-subtle)]">
                <ProjectVisual
                  variant={inspectedProject.visualVariant}
                  caption={inspectedProject.visualCaption}
                />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3
                    id="modal-project-title"
                    className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]"
                  >
                    {inspectedProject.title} — {inspectedProject.subtitle}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {inspectedProject.purposeAndProblem.overview}
                </p>
                <p className="text-xs font-mono text-[var(--text-primary)] bg-[var(--bg-canvas)] p-3 border border-[var(--border-subtle)]">
                  {inspectedProject.demoVerificationNote}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={`/work/${inspectedProject.slug}`}
                  onClick={() => setInspectedProject(null)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] hover:bg-[#F1FAEE] hover:text-[#0D1929] transition-colors whitespace-nowrap shrink-0"
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
                      className="inline-flex items-center gap-1 text-[#A8DADC] font-semibold hover:text-[var(--text-primary)] transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] font-semibold">
                      <Terminal
                        className="w-3.5 h-3.5 text-[#A8DADC]"
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
