'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Terminal,
} from 'lucide-react';
import { ProjectCaseStudy } from '@/data/projects';
import { ProjectVisual } from './ProjectVisual';

interface ProjectDetailViewProps {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
}

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300"
    >
      {/* Case Study Hero Opening */}
      <section className="border-b border-[var(--border-subtle)] pt-10 sm:pt-14 pb-14 sm:pb-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
          {/* Breadcrumb & Back Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#A8DADC] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Selected Work</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
              <span className="text-[#E63946] font-semibold tabular-nums">
                CASE STUDY {project.index}
              </span>
              <span aria-hidden="true" className="text-[#457B9D]">
                ·
              </span>
              <span>{project.category}</span>
              <span aria-hidden="true" className="text-[#457B9D]">
                ·
              </span>
              <span className="text-[#A8DADC]">{project.statusLabel}</span>
            </div>
          </div>

          {/* Title & Primary Links */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                {project.subtitle}
              </p>
              <h1
                className="font-display font-bold text-[var(--text-primary)] tracking-tight leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
              >
                {project.title}
              </h1>
              <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] hover:bg-[#F1FAEE] hover:text-[#0D1929] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                >
                  <span>Inspect Source on GitHub</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-3 text-xs font-mono font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[#457B9D] whitespace-nowrap shrink-0">
                  <Terminal className="w-4 h-4 text-[#A8DADC]" aria-hidden="true" />
                  <span>Local Prototype · UI Simulation Below</span>
                </span>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[var(--bg-elevated)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                >
                  <span>{project.liveDemoLabel || 'Live Preview'}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Interactive Architectural Simulation */}
          <div className="pt-2 border border-[var(--border-subtle)]">
            <ProjectVisual
              variant={project.visualVariant}
              caption={project.visualCaption}
            />
          </div>

          {/* Metadata Ledger Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-[var(--border-subtle)]">
            <div className="space-y-1">
              <p className="text-xs font-mono text-[#457B9D]">SOURCE &amp; WORKSPACE</p>
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono font-semibold text-[#A8DADC] hover:text-[var(--text-primary)] underline underline-offset-4 break-all"
                >
                  DirishamKamesh/{project.repoName}
                </a>
              ) : (
                <p className="text-sm font-mono font-semibold text-[var(--text-primary)]">
                  Local Workspace Prototype
                </p>
              )}
              <p className="text-xs font-mono text-[var(--text-secondary)]">
                Path: {project.localWorkspacePath}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono text-[#457B9D]">PROJECT STATUS</p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {project.statusLabel}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {project.authenticityNote}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono text-[#457B9D]">
                VERIFICATION &amp; HOSTING
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {project.demoVerificationNote}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono text-[#457B9D]">CORE TECH STACK</p>
              <p className="text-xs font-mono font-semibold text-[var(--text-primary)] leading-relaxed">
                {project.technologies.join(' · ')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Deep-Dive Sections */}
      <section className="py-16 sm:py-24 border-b border-[var(--border-subtle)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
          {/* 1. Purpose, Problem & Personal Contribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                01. PURPOSE &amp; PROBLEM
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Why this system was engineered
              </h2>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-3">
                <p className="text-xs font-mono text-[#457B9D]">PROJECT OVERVIEW</p>
                <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
                  {project.purposeAndProblem.overview}
                </p>
              </div>

              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-3">
                <p className="text-xs font-mono text-[#457B9D]">PROBLEM ADDRESSED</p>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {project.purposeAndProblem.problemStatement}
                </p>
              </div>

              <div className="md:col-span-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-2">
                <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                  DOCUMENTED SCOPE &amp; CONTRIBUTION
                </p>
                <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
                  {project.contributionSummary}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Implemented Features vs Next Steps Roadmap */}
          <div className="pt-14 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                02. KEY CODEBASE FILES &amp; ROADMAP
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Implemented capabilities &amp; next deployment steps
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Separates verified capabilities present in the codebase from the upcoming
                deployment and documentation steps.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {/* Verified Implemented Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.implementedFeatures.map((feat) => (
                  <div
                    key={feat.title}
                    className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#A8DADC]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>IMPLEMENTED IN CODEBASE</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {feat.detail}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border-subtle)] text-xs font-mono font-medium text-[#A8DADC]">
                      Key files: {feat.sourceEvidence}
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Steps Roadmap */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-4">
                <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                  NEXT STEPS &amp; DEPLOYMENT CHECKLIST
                </p>
                <ul className="space-y-2.5 text-sm text-[var(--text-primary)]">
                  {project.plannedOrConceptualFeatures.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#A8DADC]">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Technical Implementation & Architecture Layers */}
          <div className="pt-14 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-2">
              <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                03. TECHNICAL IMPLEMENTATION
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                System layers and engineering decisions
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.technicalArchitecture.map((layerObj) => (
                  <div
                    key={layerObj.layer}
                    className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-3"
                  >
                    <p className="text-xs font-mono font-semibold text-[#A8DADC]">
                      {layerObj.layer}
                    </p>
                    <h3 className="font-display text-base font-bold text-[var(--text-primary)]">
                      {layerObj.stack}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {layerObj.details}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Engineering Decisions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.engineeringDecisions.map((item, idx) => (
                  <div
                    key={item.decision}
                    className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-2.5"
                  >
                    <p className="text-xs font-mono font-semibold text-[#A8DADC] tabular-nums">
                      DECISION 0{idx + 1}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
                      {item.decision}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.rationale}
                    </p>
                  </div>
                ))}
              </div>

              {/* Documented Constraints & Honest Notes */}
              <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)]">
                  <AlertCircle className="w-4 h-4 text-[#E63946]" aria-hidden="true" />
                  <span>DOCUMENTED CONSTRAINTS &amp; REPOSITORY NOTES</span>
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {project.limitationsAndNotes.map((note) => (
                    <li key={note} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#A8DADC]">·</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next / Previous Project Navigation */}
      <section
        aria-label="Navigate between projects"
        className="py-14 sm:py-20 bg-[var(--bg-canvas)]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
            <span>CONTINUE EXPLORING WORK</span>
            <Link
              href="/#contact"
              className="text-[#E63946] font-semibold hover:underline underline-offset-4"
            >
              Discuss a project like this
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href={`/work/${prevProject.slug}`}
              className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#457B9D] p-6 sm:p-8 flex flex-col justify-between gap-4 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5 group-hover:text-[#A8DADC]">
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>PREVIOUS CASE STUDY</span>
                </span>
                <span className="tabular-nums">{prevProject.index}</span>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[var(--text-primary)] group-hover:text-[#A8DADC] transition-colors">
                  {prevProject.title}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {prevProject.category}
                </p>
              </div>
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[#457B9D] p-6 sm:p-8 flex flex-col justify-between gap-4 transition-colors text-left md:text-right"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span className="tabular-nums">{nextProject.index}</span>
                <span className="inline-flex items-center gap-1.5 group-hover:text-[#A8DADC]">
                  <span>NEXT CASE STUDY</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[var(--text-primary)] group-hover:text-[#A8DADC] transition-colors">
                  {nextProject.title}
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {nextProject.category}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
