'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { useTheme } from '@/hooks/useTheme';

interface DKMonogramProps {
  size?: 'sm' | 'md' | 'hero';
  className?: string;
}

export function DKMonogram({ size = 'sm', className = '' }: DKMonogramProps) {
  const reducedMotion = useReducedMotionPref();
  const { isDark } = useTheme();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [activeLayer, setActiveLayer] = useState<'geometry' | 'grid' | 'vectors'>('geometry');

  if (size === 'sm' || size === 'md') {
    const dimensions = size === 'sm' ? 'w-8 h-8' : 'w-11 h-11';
    return (
      <span
        className={`inline-flex items-center justify-center bg-[var(--bg-canvas)] border border-[#457B9D] ${dimensions} shrink-0 select-none ${className}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1">
          <path
            d="M12 14H24C31.732 14 38 20.268 38 28V36C38 43.732 31.732 50 24 50H12V14Z"
            stroke={isDark ? '#A8DADC' : '#1D3557'}
            strokeWidth="4.5"
          />
          <path d="M38 14V50" stroke="#E63946" strokeWidth="4.5" />
          <path
            d="M52 14L39 32L52 50"
            stroke="#E63946"
            strokeWidth="4.5"
            strokeLinecap="square"
          />
        </svg>
      </span>
    );
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setPointerOffset({ x: normX, y: normY });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  const frameFill = isDark ? '#0D1929' : '#F1FAEE';
  const dStroke = isDark ? '#F1FAEE' : '#1D3557';
  const dFill = isDark ? '#457B9D' : '#A8DADC';

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-full min-h-[360px] lg:min-h-[460px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between p-6 sm:p-8 overflow-hidden select-none shadow-[0_12px_36px_rgba(6,13,22,0.28)] transition-colors duration-300 ${className}`}
    >
      {/* Subtle Cerulean / Frosted Blue architectural coordinate grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dk-hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke={isDark ? '#243E5C' : '#A8DADC'}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dk-hero-grid)" />
      </svg>

      {/* Top row: Monogram identity metadata */}
      <div className="relative z-10 flex items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-4">
        <span className="font-semibold text-[var(--text-primary)]">
          IDENTITY MONOGRAM · DK-29
        </span>
        <span className="tabular-nums text-[var(--text-secondary)]">17.6868° N · 83.2185° E</span>
      </div>

      {/* Center Interactive Architectural Monogram Sculpture */}
      <div className="relative z-10 my-auto py-6 flex items-center justify-center">
        <motion.div
          animate={
            reducedMotion
              ? { x: 0, y: 0 }
              : {
                  x: pointerOffset.x,
                  y: pointerOffset.y,
                }
          }
          transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.6 }}
          className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 280 280"
            className="w-full h-full overflow-visible"
            role="img"
            aria-label="Dirisham Kamesh architectural DK monogram blueprint artwork"
          >
            {/* Outer architectural blueprint frame */}
            <rect
              x="16"
              y="16"
              width="248"
              height="248"
              fill={frameFill}
              stroke="#457B9D"
              strokeWidth="2"
            />

            {/* Corner registration marks in Punch Red */}
            <path d="M8 28V8H28" stroke="#E63946" strokeWidth="2.5" fill="none" />
            <path d="M252 8H272V28" stroke="#E63946" strokeWidth="2.5" fill="none" />
            <path d="M8 252V272H28" stroke="#E63946" strokeWidth="2.5" fill="none" />
            <path d="M252 272H272V252" stroke="#E63946" strokeWidth="2.5" fill="none" />

            {/* Construction diagonal guides */}
            {(activeLayer === 'grid' || activeLayer === 'vectors') && (
              <g stroke="#457B9D" strokeDasharray="4 4" strokeWidth="1.25">
                <line x1="16" y1="16" x2="264" y2="264" />
                <line x1="264" y1="16" x2="16" y2="264" />
                <circle cx="140" cy="140" r="96" fill="none" />
              </g>
            )}

            {/* Sculptural D in Honeydew (Dark) / Oxford Navy (Light) */}
            <motion.path
              d="M58 66H108C143.346 66 172 94.6538 172 130V150C172 185.346 143.346 214 108 214H58V66Z"
              fill={activeLayer === 'geometry' ? dFill : 'none'}
              fillOpacity={activeLayer === 'geometry' ? 0.35 : 0}
              stroke={dStroke}
              strokeWidth="10"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Inner counter of D */}
            <rect
              x="80"
              y="92"
              width="34"
              height="96"
              rx="17"
              fill={frameFill}
              stroke="#A8DADC"
              strokeWidth="2"
            />

            {/* Kinetic K vertical spine in Punch Red */}
            <motion.path
              d="M172 60V220"
              stroke="#E63946"
              strokeWidth="10"
              initial={reducedMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Kinetic K upper and lower arms in Punch Red */}
            <motion.path
              d="M228 66L176 140L228 214"
              fill="none"
              stroke="#E63946"
              strokeWidth="10"
              strokeLinecap="square"
              strokeLinejoin="miter"
              initial={reducedMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Vertex anchor nodes when vectors layer is active */}
            {activeLayer === 'vectors' && (
              <g fill="#A8DADC" stroke="#0D1929" strokeWidth="1.5">
                <rect x="53" y="61" width="10" height="10" />
                <rect x="53" y="209" width="10" height="10" />
                <rect x="167" y="55" width="10" height="10" />
                <rect x="167" y="215" width="10" height="10" />
                <rect x="223" y="61" width="10" height="10" />
                <rect x="223" y="209" width="10" height="10" />
              </g>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Interactive Layer Switcher — functional controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
        <span className="text-xs font-mono text-[var(--text-secondary)]">
          VIEWPORT LAYER
        </span>
        <div
          className="inline-flex items-center bg-[var(--bg-canvas)] p-1 border border-[var(--border-subtle)]"
          role="group"
          aria-label="Switch monogram construction layer"
        >
          {(['geometry', 'grid', 'vectors'] as const).map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => setActiveLayer(layer)}
              className={`px-2.5 py-1 text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeLayer === layer
                  ? 'bg-[#E63946] text-[#F1FAEE] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {layer === 'geometry'
                ? 'Solid Form'
                : layer === 'grid'
                  ? 'Blueprint Grid'
                  : 'Vector Nodes'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
