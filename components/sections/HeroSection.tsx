'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from 'lucide-react';
import { profileData } from '@/data/profile';
import { DKMonogram } from '@/components/ui/DKMonogram';
import { Magnetic } from '@/components/ui/MagneticButton';
import { TiltCard3D } from '@/components/ui/TiltCard3D';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { soundController } from '@/lib/sound';

const STATEMENT_SEGMENTS = [
  { text: 'Frontend', accent: false },
  { text: 'engineering', accent: false },
  { text: '&', accent: false },
  { text: 'interactive', accent: true },
  { text: 'interfaces', accent: true },
  { text: 'built', accent: false },
  { text: 'with', accent: false },
  { text: 'a', accent: false },
  { text: 'point of view.', accent: true },
];

export function HeroSection() {
  const reducedMotion = useReducedMotionPref();
  const [activeNameLine, setActiveNameLine] = useState<'first' | 'last' | null>(
    null
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-[#F1FAEE] border-b border-[#A8DADC] overflow-hidden"
    >
      {/* Restrained, Subtle Background Grid (Stronger grids live inside DKMonogram & ProjectVisual) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(to right, #A8DADC 1px, transparent 1px), linear-gradient(to bottom, #A8DADC 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-14 sm:pb-20">
        {/* Top Architectural Registration Axis */}
        <div className="mb-8 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#457B9D]">
            <span>PORTFOLIO · FRONTEND &amp; UI ENGINEERING</span>
            <span className="tabular-nums text-[#1D3557] font-semibold">
              VIGNAN, DUVVADA · B.TECH CSE &apos;29
            </span>
          </div>
          <div className="relative h-[1px] w-full bg-[#A8DADC] overflow-hidden">
            <motion.div
              initial={reducedMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-full w-full bg-[#1D3557]"
            />
          </div>
        </div>

        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Syne Typographic Introduction & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              {/* Quiet Unboxed Editorial Kicker */}
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 10,
                        filter: 'blur(4px)',
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#457B9D]"
              >
                <span className="text-[#E63946] font-semibold">
                  {profileData.roleTitle}
                </span>
                <span aria-hidden="true">·</span>
                <span>Visakhapatnam, India</span>
                <span aria-hidden="true">·</span>
                <span>Internships &amp; Select Freelance</span>
              </motion.div>

              {/* Signature Syne Display Introduction with Split Clip-Path Curtain + 3D Perspective Fold + Focus-Blur Resolve */}
              <div
                style={{ perspective: '1100px' }}
                className="space-y-3 select-none"
              >
                <h1 id="hero-heading" className="space-y-1">
                  {/* Line 1: DIRISHAM */}
                  <span
                    onMouseEnter={() => {
                      setActiveNameLine('first');
                      soundController.playSubtleTick(540);
                    }}
                    onMouseLeave={() => setActiveNameLine(null)}
                    className="block relative overflow-hidden py-0.5 cursor-default"
                  >
                    <motion.span
                      initial={
                        reducedMotion
                          ? false
                          : {
                              clipPath:
                                'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
                              rotateX: -32,
                              y: 22,
                              filter: 'blur(8px)',
                              opacity: 0,
                            }
                      }
                      animate={{
                        clipPath:
                          'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        rotateX: 0,
                        y: 0,
                        filter: 'blur(0px)',
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.72,
                        delay: 0.04,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        fontSize: 'clamp(2.35rem, 5.4vw, 4.75rem)',
                        transformOrigin: '50% 50%',
                      }}
                      className={`block font-display font-extrabold tracking-[-0.03em] leading-[0.98] transition-colors duration-200 ${
                        activeNameLine === 'first'
                          ? 'text-[#E63946]'
                          : 'text-[#1D3557]'
                      }`}
                    >
                      DIRISHAM
                    </motion.span>
                  </span>

                  {/* Line 2: KAMESH. */}
                  <span
                    onMouseEnter={() => {
                      setActiveNameLine('last');
                      soundController.playSubtleTick(620);
                    }}
                    onMouseLeave={() => setActiveNameLine(null)}
                    className="block overflow-hidden py-0.5 cursor-default"
                  >
                    <motion.span
                      initial={
                        reducedMotion
                          ? false
                          : {
                              clipPath:
                                'polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)',
                              rotateX: 32,
                              y: -20,
                              filter: 'blur(8px)',
                              opacity: 0,
                            }
                      }
                      animate={{
                        clipPath:
                          'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        rotateX: 0,
                        y: 0,
                        filter: 'blur(0px)',
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.76,
                        delay: 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        fontSize: 'clamp(2.35rem, 5.4vw, 4.75rem)',
                        transformOrigin: '50% 50%',
                      }}
                      className={`inline-block font-display font-extrabold tracking-[-0.03em] leading-[0.98] transition-colors duration-200 ${
                        activeNameLine === 'last'
                          ? 'text-[#1D3557]'
                          : 'text-[#E63946]'
                      }`}
                    >
                      KAMESH.
                    </motion.span>
                  </span>
                </h1>

                {/* Secondary Editorial Statement in Syne */}
                <p
                  className="font-display font-bold text-[#1D3557] tracking-tight leading-[1.22] pt-2 text-balance max-w-[34ch]"
                  style={{ fontSize: 'clamp(1.25rem, 2.1vw, 1.85rem)' }}
                >
                  {STATEMENT_SEGMENTS.map((seg, idx) => (
                    <span
                      key={seg.text + idx}
                      className="inline-block overflow-hidden mr-[0.26em] align-bottom"
                    >
                      <motion.span
                        initial={
                          reducedMotion
                            ? false
                            : {
                                y: '90%',
                                rotateX: -20,
                                filter: 'blur(5px)',
                                opacity: 0,
                              }
                        }
                        animate={{
                          y: '0%',
                          rotateX: 0,
                          filter: 'blur(0px)',
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.55,
                          delay: 0.2 + idx * 0.03,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`inline-block ${
                          seg.accent ? 'text-[#E63946]' : 'text-[#1D3557]'
                        }`}
                      >
                        {seg.text}
                      </motion.span>
                    </span>
                  ))}
                </p>
              </div>

              {/* Supporting Narrative */}
              <motion.p
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 14, filter: 'blur(4px)' }
                }
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.55,
                  delay: 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-base sm:text-lg text-[#1D3557]/85 leading-relaxed max-w-[62ch]"
              >
                {profileData.heroSupportingCopy}
              </motion.p>
            </div>

            {/* Primary & Secondary Magnetic Calls to Action + Verified Social Strip */}
            <motion.div
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 14, filter: 'blur(4px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.55,
                delay: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pt-2 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3.5">
                <Magnetic strength={0.22}>
                  <Link
                    href="#work"
                    onClick={() => soundController.playSubtleTick(620)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
                  >
                    <span>Explore selected work</span>
                    <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <Link
                    href="#contact"
                    onClick={() => soundController.playSubtleTick(540)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold bg-white text-[#1D3557] border border-[#457B9D] hover:border-[#E63946] hover:text-[#E63946] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E63946]"
                  >
                    <span>Discuss a project</span>
                  </Link>
                </Magnetic>
              </div>

              {/* Verified Social & Direct Contact Strip */}
              <div className="pt-4 border-t border-[#A8DADC] flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs font-mono">
                <span className="font-semibold text-[#1D3557]">
                  DIRECT PROFILES:
                </span>

                <a
                  href={profileData.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundController.playSubtleTick(520)}
                  className="inline-flex items-center gap-1.5 text-[#457B9D] hover:text-[#E63946] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                >
                  <Github className="w-3.5 h-3.5 text-[#1D3557]" aria-hidden="true" />
                  <span>@{profileData.contact.githubUsername}</span>
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>

                <span aria-hidden="true" className="text-[#A8DADC]">
                  /
                </span>

                <a
                  href={profileData.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundController.playSubtleTick(520)}
                  className="inline-flex items-center gap-1.5 text-[#457B9D] hover:text-[#E63946] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#1D3557]" aria-hidden="true" />
                  <span>{profileData.contact.linkedinHandle}</span>
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>

                <span aria-hidden="true" className="text-[#A8DADC]">
                  /
                </span>

                <a
                  href={profileData.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundController.playSubtleTick(520)}
                  className="inline-flex items-center gap-1.5 text-[#457B9D] hover:text-[#E63946] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E63946]" aria-hidden="true" />
                  <span>@{profileData.contact.instagramHandle}</span>
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>

                <span aria-hidden="true" className="text-[#A8DADC]">
                  /
                </span>

                <a
                  href={`mailto:${profileData.contact.email}`}
                  onClick={() => soundController.playSubtleTick(520)}
                  className="inline-flex items-center gap-1.5 text-[#457B9D] hover:text-[#E63946] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1D3557]" aria-hidden="true" />
                  <span>{profileData.contact.email}</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D-Tilting Interactive Architectural DK Monogram Sculpture */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.97,
                    filter: 'blur(6px)',
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }}
            transition={{
              duration: 0.7,
              delay: 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5 flex"
          >
            <TiltCard3D maxTilt={3.5} className="w-full flex">
              <DKMonogram size="hero" />
            </TiltCard3D>
          </motion.div>
        </div>

        {/* Full-Width Verified Coordinates Row Below the Hero Split */}
        <div className="mt-10 pt-8 border-t border-[#A8DADC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-xs font-mono text-[#457B9D]">01. EDUCATION</p>
            <p className="text-sm font-semibold text-[#1D3557] tabular-nums">
              B.Tech CSE · Vignan, Duvvada (&apos;29)
            </p>
            <p className="text-xs text-[#457B9D]">Second-year undergraduate</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono text-[#457B9D]">02. LOCATION</p>
            <p className="text-sm font-semibold text-[#1D3557]">
              Visakhapatnam (Vizag), India
            </p>
            <p className="text-xs text-[#457B9D]">
              Andhra Pradesh · Remote &amp; Hybrid
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono text-[#457B9D]">03. CORE STACK</p>
            <p className="text-sm font-semibold text-[#1D3557]">
              React 19 · TypeScript · Python/Flask
            </p>
            <p className="text-xs text-[#457B9D]">
              Tailwind CSS, @xyflow/react, Recharts
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono text-[#457B9D]">04. AVAILABILITY</p>
            <p className="text-sm font-semibold text-[#E63946]">
              Internships &amp; Select Freelance
            </p>
            <p className="text-xs text-[#457B9D]">
              Public GitHub repos &amp; UI simulations
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Editorial Ribbon Divider in Frosted Blue */}
      <div
        aria-hidden="true"
        className="relative border-t border-[#A8DADC] bg-[#A8DADC]/30 py-3 px-4 overflow-hidden"
      >
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#1D3557]">
          <span className="font-semibold">
            01 REPO-RIDDLE (FLAGSHIP) · 02 CARESYNC · 03 FACULYNK · 04 READY-MAP
          </span>
          <span className="hidden sm:inline text-[#457B9D]">
            PUBLIC REPOSITORIES · INTERACTIVE UI SIMULATIONS
          </span>
          <span className="text-[#E63946] font-semibold tabular-nums">
            SELECTED WORK
          </span>
        </div>
      </div>
    </section>
  );
}
