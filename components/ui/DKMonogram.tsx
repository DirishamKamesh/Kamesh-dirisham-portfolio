'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

interface DKMonogramProps {
  size?: 'sm' | 'md' | 'hero';
  className?: string;
}

export function DKMonogram({ size = 'sm', className = '' }: DKMonogramProps) {
  const reducedMotion = useReducedMotionPref();
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const [activeLayer, setActiveLayer] = useState<'geometry' | 'grid' | 'vectors'>('geometry');

  if (size === 'sm' || size === 'md') {
    const dimensions = size === 'sm' ? 'w-8 h-8' : 'w-11 h-11';
    return (
      <span
        className={`inline-flex items-center justify-center bg-[#F1FAEE] border border-[#457B9D] ${dimensions} shrink-0 select-none ${className}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 64 64" fill="none" className="w-full h-full p-1">
          <path
            d="M12 14H24C31.732 14 38 20.268 38 28V36C38 43.732 31.732 50 24 50H12V14Z"
            stroke="#1D3557"
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

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-full min-h-[360px] lg:min-h-[460px] bg-white border border-[#A8DADC] flex flex-col justify-between p-6 sm:p-8 overflow-hidden select-none shadow-[0_8px_30px_rgba(29,53,87,0.06)] ${className}`}
    >
      {/* Subtle Frosted Blue architectural coordinate grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-65"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dk-hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#A8DADC" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dk-hero-grid)" />
      </svg>

      {/* Top row: Monogram identity metadata */}
      <div className="relative z-10 flex items-center justify-between gap-4 text-xs font-mono text-[#457B9D] border-b border-[#A8DADC] pb-4">
        <span className="font-semibold text-[#1D3557]">IDENTITY MONOGRAM · DK-29</span>
        <span className="tabular-nums">17.6868° N · 83.2185° E</span>
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
            {/* Outer architectural blueprint frame in Honeydew & Cerulean */}
            <rect
              x="16"
              y="16"
              width="248"
              height="248"
              fill="#F1FAEE"
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

            {/* Sculptural D in Oxford Navy */}
            <motion.path
              d="M58 66H108C143.346 66 172 94.6538 172 130V150C172 185.346 143.346 214 108 214H58V66Z"
              fill={activeLayer === 'geometry' ? '#A8DADC' : 'none'}
              fillOpacity={activeLayer === 'geometry' ? 0.35 : 0}
              stroke="#1D3557"
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
              fill="#F1FAEE"
              stroke="#457B9D"
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
              <g fill="#E63946" stroke="#1D3557" strokeWidth="1.5">
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
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#A8DADC]">
        <span className="text-xs font-mono text-[#457B9D]">
          VIEWPORT LAYER
        </span>
        <div
          className="inline-flex items-center bg-[#F1FAEE] p-1 border border-[#A8DADC]"
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
                  : 'text-[#457B9D] hover:text-[#1D3557]'
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
