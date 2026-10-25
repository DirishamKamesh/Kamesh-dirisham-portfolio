'use client';

import React, { useState } from 'react';
import { skillCategoryGroups, SkillTier } from '@/data/skills';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { soundController } from '@/lib/sound';

type FilterTier = 'All Tiers' | SkillTier;

const TIER_FILTERS: FilterTier[] = [
  'All Tiers',
  'Used in projects',
  'Working knowledge',
  'Currently learning',
];

export function SkillsSection() {
  const [selectedTier, setSelectedTier] = useState<FilterTier>('All Tiers');

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] py-20 sm:py-28 scroll-mt-20 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 space-y-14">
        {/* Section Heading + Honest Evidence Tier Filter */}
        <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[var(--border-subtle)]">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-mono font-semibold text-[#E63946] tracking-wide">
              03. TECHNICAL SKILLS &amp; LEARNING MATRIX
            </p>
            <h2
              id="skills-heading"
              className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight text-balance"
            >
              Grouped by practical project evidence rather than arbitrary percentages.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              To help internship recruiters and engineering leads evaluate my current standing
              honestly, every technology is categorized by whether it is actively used in
              shipped repositories, part of my working knowledge, or an area of ongoing study.
            </p>
          </div>

          {/* Interactive Evidence Filter */}
          <div
            role="group"
            aria-label="Filter skills by experience evidence"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] self-start lg:self-auto"
          >
            {TIER_FILTERS.map((tier) => {
              const active = selectedTier === tier;
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => {
                    soundController.playSubtleTick(520);
                    setSelectedTier(tier);
                  }}
                  className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC] ${
                    active
                      ? 'bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tier}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 6 Skill Category Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategoryGroups.map((group) => {
            const visibleSkills =
              selectedTier === 'All Tiers'
                ? group.skills
                : group.skills.filter((s) => s.tier === selectedTier);

            if (visibleSkills.length === 0) return null;

            return (
              <div
                key={group.id}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-[0_8px_28px_rgba(6,13,22,0.2)]"
              >
                <div className="space-y-3 border-b border-[var(--border-subtle)] pb-5">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                    <span className="text-[#E63946] font-semibold tabular-nums">
                      {group.index}
                    </span>
                    <span className="tabular-nums">{visibleSkills.length} listed</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    {group.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {group.subtitle}
                  </p>
                </div>

                {/* Unboxed Skill Items with Evidence Context */}
                <ul className="space-y-4">
                  {visibleSkills.map((skill) => (
                    <li
                      key={skill.name}
                      className="space-y-1 pb-3 border-b border-[var(--border-subtle)] last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                          {skill.name}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-semibold whitespace-nowrap shrink-0 ${
                            skill.tier === 'Used in projects'
                              ? 'text-[#E63946]'
                              : skill.tier === 'Working knowledge'
                                ? 'text-[var(--text-primary)]'
                                : 'text-[#457B9D]'
                          }`}
                        >
                          {skill.tier}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {skill.context}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
