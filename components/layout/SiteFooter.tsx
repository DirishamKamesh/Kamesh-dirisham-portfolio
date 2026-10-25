'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { profileData } from '@/data/profile';
import { DKMonogram } from '@/components/ui/DKMonogram';
import { soundController } from '@/lib/sound';

export function SiteFooter() {
  const [soundOn, setSoundOn] = useState(false);
  const currentYear = new Date().getFullYear();

  const toggleSound = () => {
    const nextState = soundController.setEnabled(!soundOn);
    setSoundOn(nextState);
  };

  const scrollToTop = () => {
    soundController.playSubtleTick(640);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <DKMonogram size="sm" />
              <div>
                <p className="font-display text-base font-bold text-[var(--text-primary)]">
                  {profileData.fullName}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {profileData.education.summary}
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
              {profileData.positioning} · Based in {profileData.location.display}.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono font-semibold text-[var(--text-primary)] tracking-wide uppercase">
              Index
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#work" className="hover:text-[#A8DADC] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/#capabilities" className="hover:text-[#A8DADC] transition-colors">
                  Capabilities & Services
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-[#A8DADC] transition-colors">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#A8DADC] transition-colors">
                  About & Process
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#A8DADC] transition-colors">
                  Contact Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Links Column */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono font-semibold text-[var(--text-primary)] tracking-wide uppercase">
              Verified Profiles
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#A8DADC] transition-colors break-all"
                >
                  <span>{profileData.contact.email}</span>
                </a>
              </li>
              {profileData.resume.available && profileData.resume.url && (
                <li>
                  <a
                    href={profileData.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#E63946] font-semibold hover:text-[#A8DADC] transition-colors"
                  >
                    <span>Resume / CV (PDF)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8DADC] transition-colors"
                >
                  <span>GitHub (@{profileData.contact.githubUsername})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8DADC] transition-colors"
                >
                  <span>LinkedIn ({profileData.contact.linkedinHandle})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8DADC] transition-colors"
                >
                  <span>LeetCode (@{profileData.contact.leetcodeHandle})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.codechefUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8DADC] transition-colors"
                >
                  <span>CodeChef (@{profileData.contact.codechefHandle})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={profileData.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#A8DADC] transition-colors"
                >
                  <span>Instagram (@{profileData.contact.instagramHandle})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <p className="tabular-nums text-[var(--text-secondary)]">
            © {currentYear} {profileData.fullName}. Built with Next.js, TypeScript, Tailwind CSS, and Motion.
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#A8DADC] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
            >
              {soundOn ? (
                <Volume2 className="w-3.5 h-3.5 text-[#A8DADC]" aria-hidden="true" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>UI Sound: {soundOn ? 'On' : 'Off'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] font-mono font-semibold hover:bg-[#E63946] hover:text-[#F1FAEE] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
