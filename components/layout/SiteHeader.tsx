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
  Instagram,
  Mail,
} from 'lucide-react';
import { profileData } from '@/data/profile';
import { Magnetic } from '@/components/ui/MagneticButton';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
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
    id: 'instagram',
    label: 'Instagram',
    href: profileData.contact.instagramUrl,
    icon: Instagram,
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotionPref();
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
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F1FAEE]/92 backdrop-blur-md border-b border-[#A8DADC] shadow-[0_2px_20px_rgba(29,53,87,0.05)]'
          : 'bg-[#F1FAEE]/85 backdrop-blur-sm border-b border-[#A8DADC]/80'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4 sm:gap-8">
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
            className="group inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 bg-[#1D3557] text-[#F1FAEE] font-display text-xs font-extrabold tracking-tight group-hover:bg-[#E63946] transition-colors duration-150">
              DK
            </span>
            <span className="font-display text-sm sm:text-base font-bold tracking-tight text-[#1D3557] group-hover:text-[#E63946] transition-colors duration-150">
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
          className="hidden md:flex items-center justify-center gap-7 lg:gap-9"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.sectionId)}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946] ${
                  isActive
                    ? 'text-[#1D3557] font-semibold'
                    : 'text-[#457B9D] hover:text-[#1D3557]'
                }`}
              >
                <span>{item.label}</span>

                {/* Active Section Indicator */}
                {isActive && (
                  <motion.span
                    layoutId={
                      reducedMotion ? undefined : 'navbar-active-underline'
                    }
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#E63946]"
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
        </nav>

        {/* RIGHT — Optional Unboxed Icon Links (Wide Screens Only) + Prominent "LET'S TALK ↗" CTA */}
        <div className="flex items-center justify-end gap-3 lg:gap-4 shrink-0">
          {/* Compact borderless icon-only links on wide desktop where space allows */}
          <div
            aria-label="Social profiles"
            className="hidden lg:flex items-center gap-1 pr-2 border-r border-[#A8DADC]"
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
                  className="inline-flex items-center justify-center w-8 h-8 text-[#457B9D] hover:text-[#E63946] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>

          {/* Primary CTA: LET'S TALK ↗ */}
          <Magnetic strength={0.22}>
            <Link
              href="/#contact"
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className={`hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold tracking-wider uppercase transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946] ${
                activeSection === 'contact'
                  ? 'bg-[#1D3557] text-[#F1FAEE]'
                  : 'bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557]'
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
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#1D3557] border border-[#A8DADC] bg-white hover:border-[#E63946] hover:text-[#E63946] transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
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
            className="md:hidden bg-[#F1FAEE] border-b border-[#A8DADC] px-4 sm:px-6 pt-3 pb-6 shadow-[0_12px_32px_rgba(29,53,87,0.08)]"
          >
            <nav aria-label="Mobile navigation links" className="flex flex-col">
              <div className="divide-y divide-[#A8DADC]/70">
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
                          ? 'text-[#E63946]'
                          : 'text-[#1D3557] hover:text-[#E63946]'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs font-normal text-[#457B9D] tabular-nums">
                          0{idx + 1}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      {isActive && (
                        <span className="text-[11px] font-mono font-semibold text-[#E63946]">
                          ACTIVE
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Primary Mobile CTA */}
              <div className="pt-4 mt-2 border-t border-[#A8DADC]">
                <Link
                  href="/#contact"
                  onClick={(e) => handleAnchorClick(e, 'contact')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 text-xs font-mono font-semibold tracking-wider uppercase bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] transition-colors"
                >
                  <span>LET&apos;S TALK</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Clean Unboxed Social Row in Mobile Menu */}
              <div className="pt-4 mt-4 border-t border-[#A8DADC]/70 flex items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-[#457B9D]">
                  CONNECT
                </span>
                <div className="flex items-center gap-4">
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
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1D3557] hover:text-[#E63946] transition-colors"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    aria-label="Email Dirisham Kamesh"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1D3557] hover:text-[#E63946] transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
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
