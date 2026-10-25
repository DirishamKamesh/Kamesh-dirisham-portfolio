'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowUpRight,
  Github,
  Linkedin,
  Code2,
  Terminal,
  Instagram,
  Mail,
  FileText,
} from 'lucide-react';
import { profileData } from '@/data/profile';
import { Magnetic } from '@/components/ui/MagneticButton';
import { ThemeTogglePill } from '@/components/ui/ThemeTogglePill';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { useTheme } from '@/hooks/useTheme';
import { soundController } from '@/lib/sound';

interface NavItem {
  id: string;
  label: string;
  href: string;
  sectionId: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work', href: '/#work', sectionId: 'work' },
  {
    id: 'services',
    label: 'Services',
    href: '/#capabilities',
    sectionId: 'capabilities',
  },
  { id: 'skills', label: 'Skills', href: '/#skills', sectionId: 'skills' },
  { id: 'about', label: 'About', href: '/#about', sectionId: 'about' },
];

const VERIFIED_SOCIALS = [
  {
    id: 'github',
    label: 'GitHub',
    href: profileData.contact.githubUrl,
    icon: Github,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: profileData.contact.linkedinUrl,
    icon: Linkedin,
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    href: profileData.contact.leetcodeUrl,
    icon: Code2,
  },
  {
    id: 'codechef',
    label: 'CodeChef',
    href: profileData.contact.codechefUrl,
    icon: Terminal,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: profileData.contact.instagramUrl,
    icon: Instagram,
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotionPref();
  const { theme, isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Track scroll state and active homepage section accurately
  useEffect(() => {
    const updateScrollAndSection = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (pathname !== '/') {
        if (pathname.startsWith('/work')) {
          setActiveSection('work');
        } else {
          setActiveSection('');
        }
        return;
      }

      if (scrollY < 180) {
        setActiveSection('');
        return;
      }

      const sectionIds = ['work', 'capabilities', 'skills', 'about', 'contact'];
      const viewportOffset = scrollY + 160;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportOffset >= top && viewportOffset < top + height) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    updateScrollAndSection();
    window.addEventListener('scroll', updateScrollAndSection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollAndSection);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth anchor navigation accounting for sticky header height & reduced motion
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      soundController.playSubtleTick(540);
      setMobileMenuOpen(false);

      if (pathname === '/') {
        const target = document.getElementById(sectionId);
        if (target) {
          e.preventDefault();
          const headerOffset = 72;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: reducedMotion ? 'auto' : 'smooth',
          });
          setActiveSection(sectionId);
          window.history.pushState(null, '', `/#${sectionId}`);
        }
      }
    },
    [pathname, reducedMotion]
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled
          ? 'bg-[var(--bg-header)] backdrop-blur-md border-b border-[var(--border-subtle)] shadow-[0_4px_24px_rgba(6,13,22,0.28)]'
          : 'bg-[var(--bg-surface)]/90 backdrop-blur-sm border-b border-[var(--border-subtle)]'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 sm:gap-6">
        {/* LEFT — Personal Brand */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            onClick={() => {
              soundController.playSubtleTick(580);
              setMobileMenuOpen(false);
              if (pathname === '/') {
                window.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? 'auto' : 'smooth',
                });
              }
            }}
            aria-label="Dirisham Kamesh — Home"
            className="group inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A8DADC]"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] font-display text-xs font-extrabold tracking-tight group-hover:bg-[#E63946] group-hover:text-[#F1FAEE] transition-colors duration-150">
              DK
            </span>
            <span className="font-display text-sm sm:text-base font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[#A8DADC] transition-colors duration-150">
              <span className="text-[#457B9D] font-normal mr-1.5 hidden sm:inline">
                —
              </span>
              Dirisham Kamesh
            </span>
          </Link>
        </div>

        {/* CENTER — Primary Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center justify-center gap-6 lg:gap-9"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.sectionId)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A8DADC] ${
                  isActive
                    ? 'text-[var(--accent-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>{item.label}</span>

                {/* Active Section Indicator */}
                {isActive && (
                  <motion.span
                    layoutId={
                      reducedMotion ? undefined : 'navbar-active-underline'
                    }
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[var(--accent-primary)]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}
              </Link>
            );
          })}
          {profileData.resume.available && profileData.resume.url && (
            <a
              href={profileData.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundController.playSubtleTick(540)}
              className="inline-flex items-center gap-1 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[#E63946] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A8DADC]"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </nav>

        {/* RIGHT — Immersive Dark/Light Toggle + Social Icons + Prominent "LET'S TALK ↗" CTA */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3.5 shrink-0">
          {/* Dribbble-Inspired 3D Tactile Theme Switcher (Midnight Blueprint / Daylight Blueprint) */}
          <ThemeTogglePill
            isDark={isDark}
            onToggle={toggleTheme}
            showLabel={true}
            size="md"
          />

          {/* Compact borderless icon-only links on wide desktop where space allows */}
          <div
            aria-label="Social profiles"
            className="hidden xl:flex items-center gap-1 pr-2 border-r border-[var(--border-subtle)]"
          >
            {VERIFIED_SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} profile`}
                  onClick={() => soundController.playSubtleTick(520)}
                  className="inline-flex items-center justify-center w-8 h-8 text-[var(--text-secondary)] hover:text-[#A8DADC] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>

          {/* Primary Contact CTA: LET'S TALK ↗ in Punch Red (#E63946) with Honeydew (#F1FAEE) text */}
          <Magnetic strength={0.22}>
            <Link
              href="/#contact"
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className={`hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A8DADC] ${
                activeSection === 'contact'
                  ? 'bg-[#A8DADC] text-[#0D1929]'
                  : 'bg-[#E63946] text-[#F1FAEE] hover:bg-[#A8DADC] hover:text-[#0D1929]'
              }`}
            >
              <span>LET&apos;S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </Magnetic>

          {/* Accessible Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              soundController.playSubtleTick(480);
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-[#A8DADC] hover:text-[#A8DADC] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A8DADC]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-panel"
            role="dialog"
            aria-label="Mobile navigation"
            initial={
              reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
            }
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 sm:px-6 pt-3 pb-6 shadow-[0_16px_40px_rgba(6,13,22,0.45)]"
          >
            <nav aria-label="Mobile navigation links" className="flex flex-col">
              <div className="divide-y divide-[var(--border-subtle)]">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.sectionId)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center justify-between py-3.5 px-2 text-base font-display font-bold transition-colors ${
                        isActive
                          ? 'text-[var(--accent-primary)]'
                          : 'text-[var(--text-primary)] hover:text-[#A8DADC]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs font-normal text-[#457B9D] tabular-nums">
                          0{idx + 1}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      {isActive && (
                        <span className="text-[11px] font-mono font-semibold text-[var(--accent-primary)]">
                          ACTIVE
                        </span>
                      )}
                    </Link>
                  );
                })}
                {profileData.resume.available && profileData.resume.url && (
                  <a
                    href={profileData.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 px-2 text-base font-display font-bold text-[#E63946] hover:text-[#A8DADC] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs font-normal text-[#457B9D] tabular-nums">
                        05
                      </span>
                      <span>Resume (PDF)</span>
                    </span>
                    <FileText className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>

              {/* Theme Switcher Row inside Mobile Menu */}
              <div className="pt-4 mt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4 px-2">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    COLOR APPEARANCE
                  </span>
                  <span className="text-xs font-display font-bold text-[var(--text-primary)] mt-0.5">
                    {theme === 'dark'
                      ? 'Midnight Blueprint (Dark)'
                      : 'Daylight Blueprint (Light)'}
                  </span>
                </div>
                <ThemeTogglePill
                  isDark={isDark}
                  onToggle={toggleTheme}
                  showLabel={false}
                  size="sm"
                />
              </div>

              {/* Primary Mobile CTA */}
              <div className="pt-4 mt-3 border-t border-[var(--border-subtle)]">
                <Link
                  href="/#contact"
                  onClick={(e) => handleAnchorClick(e, 'contact')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-mono font-semibold tracking-wider uppercase bg-[#E63946] text-[#F1FAEE] hover:bg-[#A8DADC] hover:text-[#0D1929] transition-colors"
                >
                  <span>LET&apos;S TALK</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Clean Unboxed Social Row in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex flex-col gap-2.5">
                <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                  CONNECT
                </span>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {VERIFIED_SOCIALS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        onClick={() => setMobileMenuOpen(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:text-[#A8DADC] transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    aria-label="Email Dirisham Kamesh"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:text-[#A8DADC] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
