'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

interface ThemeTogglePillProps {
  isDark: boolean;
  onToggle: () => void;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const SUN_RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Custom 8-Dot Radial Sun Icon matching the Dribbble reference shot
 */
function SunEightDotsIcon({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-[18px] h-[18px] overflow-visible"
      aria-hidden="true"
      animate={
        reducedMotion
          ? { scale: 1, rotate: 0 }
          : {
              scale: active ? 1 : 0.88,
              rotate: active ? 45 : 0,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 22,
      }}
    >
      {/* Central Sun Disc */}
      <circle
        cx="12"
        cy="12"
        r="4.2"
        fill="currentColor"
        style={{
          filter: active
            ? 'drop-shadow(0 0 6px rgba(241, 250, 238, 0.65))'
            : 'none',
        }}
      />

      {/* 8 Radial Circular Dots */}
      {SUN_RAY_ANGLES.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const radius = 7.6;
        const cx = Number((12 + radius * Math.cos(rad)).toFixed(3));
        const cy = Number((12 + radius * Math.sin(rad)).toFixed(3));
        return (
          <circle
            key={angle}
            cx={cx}
            cy={cy}
            r="1.15"
            fill="currentColor"
            opacity={active ? 0.95 : 0.75}
          />
        );
      })}
    </motion.svg>
  );
}

/**
 * Custom Crescent Moon + Dual Wavy Cloud Lines Icon matching the Dribbble reference shot
 */
function MoonWithWavesIcon({
  active,
  reducedMotion,
}: {
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-[18px] h-[18px] overflow-visible"
      aria-hidden="true"
      animate={
        reducedMotion
          ? { scale: 1 }
          : {
              scale: active ? 1 : 0.9,
              rotate: active ? 0 : -8,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 22,
      }}
      style={{
        filter: active
          ? 'drop-shadow(0 0 6px rgba(241, 250, 238, 0.55))'
          : 'none',
      }}
    >
      {/* Crescent Moon Upper Body */}
      <path
        d="M14.8 4.2C11.1 4.2 8.2 7.1 8.2 10.7C8.2 11.7 8.4 12.6 8.8 13.4C10.1 13.1 11.2 13.6 12.1 14.1C13.1 14.6 14.1 14.6 15.2 14.0C16.2 13.4 17.3 13.5 18.4 14.1C19.2 13.1 19.7 11.9 19.9 10.5C17.2 10.7 14.9 8.6 14.9 5.9C14.9 5.3 15.0 4.7 15.2 4.2C15.1 4.2 14.9 4.2 14.8 4.2Z"
        fill="currentColor"
      />

      {/* Upper Wavy Cloud / Tide Line */}
      <motion.path
        d="M5.2 15.6C6.4 14.7 7.7 14.7 8.9 15.6C10.1 16.5 11.4 16.5 12.6 15.6C13.8 14.7 15.1 14.7 16.3 15.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={
          reducedMotion || !active
            ? { x: 0 }
            : {
                x: [0, 0.9, -0.6, 0],
              }
        }
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Lower Wavy Cloud / Tide Line */}
      <motion.path
        d="M6.8 18.8C7.9 18.0 9.1 18.0 10.2 18.8C11.3 19.6 12.5 19.6 13.6 18.8C14.7 18.0 15.9 18.0 17.0 18.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={
          reducedMotion || !active
            ? { x: 0 }
            : {
                x: [0, -0.9, 0.6, 0],
              }
        }
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.svg>
  );
}

/**
 * Dribbble-inspired 3D Tactile Pill Theme Toggle adapted to the portfolio's
 * 5-color brand palette (#E63946, #F1FAEE, #A8DADC, #457B9D, #1D3557).
 */
export function ThemeTogglePill({
  isDark,
  onToggle,
  showLabel = true,
  size = 'md',
  className = '',
}: ThemeTogglePillProps) {
  const reducedMotion = useReducedMotionPref();

  // Dimensions carefully tuned to fit navbar height while preserving the exact Dribbble proportions
  const isSmall = size === 'sm';
  const outerWidth = isSmall ? 78 : 88;
  const outerHeight = isSmall ? 38 : 42;
  const thumbWidth = isSmall ? 36 : 41;
  const thumbHeight = isSmall ? 26 : 30;
  const thumbTravel = isSmall ? 30 : 35;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={
        isDark
          ? 'Dark mode active — Switch to Daylight Blueprint light mode'
          : 'Light mode active — Switch to Midnight Blueprint dark mode'
      }
      title={
        isDark
          ? 'Midnight Blueprint (Dark) — Click for Light Mode'
          : 'Daylight Blueprint (Light) — Click for Dark Mode'
      }
      onClick={onToggle}
      className={`group relative inline-flex items-center gap-2.5 cursor-pointer select-none shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A8DADC] ${className}`}
    >
      {/* Dynamic Mode Label ("Dark" / "Light") on the left, matching the Dribbble composition */}
      {showLabel && (
        <span className="hidden xl:inline-flex items-center justify-end min-w-[42px] font-display text-xs font-bold tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? 'dark-label' : 'light-label'}
              initial={
                reducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }
              }
              transition={{ duration: 0.16, ease: 'easeOut' }}
            >
              {isDark ? 'Dark' : 'Light'}
            </motion.span>
          </AnimatePresence>
        </span>
      )}

      {/* Outer Beveled Pill Frame */}
      <motion.span
        whileTap={reducedMotion ? undefined : { scale: 0.96 }}
        style={{
          width: outerWidth,
          height: outerHeight,
          background: isDark
            ? 'linear-gradient(180deg, #1E375A 0%, #12233A 100%)'
            : 'linear-gradient(180deg, #FFFFFF 0%, #E2F1EE 100%)',
          boxShadow: isDark
            ? '0 6px 18px rgba(6, 13, 22, 0.55), inset 0 1px 1px rgba(168, 218, 220, 0.28), inset 0 -1px 1px rgba(6, 13, 22, 0.6)'
            : '0 6px 18px rgba(29, 53, 87, 0.14), inset 0 1.5px 1px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(69, 123, 157, 0.18)',
        }}
        className={`relative inline-flex items-center rounded-full p-[5px] transition-all duration-300 border ${
          isDark
            ? 'border-[#2B4C73] group-hover:border-[#A8DADC]/70'
            : 'border-[#C5E3E6] group-hover:border-[#457B9D]/60'
        }`}
      >
        {/* Recessed Inner Track Well */}
        <span
          style={{
            background: isDark
              ? 'linear-gradient(180deg, #091320 0%, #0D1929 100%)'
              : 'linear-gradient(180deg, #D5E8EC 0%, #E6F3F4 100%)',
            boxShadow: isDark
              ? 'inset 0 2px 5px rgba(3, 8, 15, 0.85), inset 0 -1px 1px rgba(168, 218, 220, 0.12)'
              : 'inset 0 2px 5px rgba(29, 53, 87, 0.14), inset 0 -1px 1px rgba(255, 255, 255, 0.8)',
          }}
          className="relative flex items-center justify-between w-full h-full rounded-full px-[3px] overflow-hidden transition-colors duration-300"
        >
          {/* 3D Glowing Capsule Thumb */}
          <motion.span
            layout
            initial={false}
            animate={{
              x: isDark ? thumbTravel : 0,
            }}
            whileTap={reducedMotion ? undefined : { scaleX: 1.08 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    type: 'spring',
                    stiffness: 440,
                    damping: 28,
                    mass: 0.85,
                  }
            }
            style={{
              width: thumbWidth,
              height: thumbHeight,
              background: isDark
                ? 'radial-gradient(115% 110% at 50% 18%, #1D3557 0%, #274C77 52%, #457B9D 84%, #A8DADC 100%)'
                : 'radial-gradient(115% 110% at 50% 18%, #1D3557 0%, #2A5683 48%, #457B9D 80%, #A8DADC 100%)',
              boxShadow: isDark
                ? '0 3px 10px rgba(6, 13, 22, 0.65), 0 0 12px rgba(168, 218, 220, 0.25), inset 0 1px 2px rgba(241, 250, 238, 0.35), inset 0 -2px 4px rgba(168, 218, 220, 0.55)'
                : '0 4px 10px rgba(29, 53, 87, 0.32), 0 0 10px rgba(69, 123, 157, 0.28), inset 0 1px 2px rgba(241, 250, 238, 0.4), inset 0 -2px 4px rgba(168, 218, 220, 0.65)',
            }}
            className="absolute left-[3px] top-1/2 -translate-y-1/2 rounded-full pointer-events-none z-10"
          >
            {/* Subtle Inner Specular Rim inside the 3D Capsule */}
            <span
              className="absolute inset-[1px] rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(168, 218, 220, 0.35)',
                background:
                  'linear-gradient(180deg, rgba(241,250,238,0.12) 0%, rgba(168,218,220,0) 60%, rgba(168,218,220,0.22) 100%)',
              }}
            />
          </motion.span>

          {/* Left Station — 8-Dot Sun (Active in Light Mode, Muted in Dark Mode) */}
          <span
            style={{ width: thumbWidth, height: thumbHeight }}
            className={`relative z-20 inline-flex items-center justify-center rounded-full transition-colors duration-300 ${
              !isDark
                ? 'text-[#F1FAEE]'
                : 'text-[#457B9D] group-hover:text-[#A8DADC]/80'
            }`}
          >
            <SunEightDotsIcon active={!isDark} reducedMotion={reducedMotion} />
          </span>

          {/* Right Station — Crescent Moon + Wavy Clouds (Active in Dark Mode, Muted in Light Mode) */}
          <span
            style={{ width: thumbWidth, height: thumbHeight }}
            className={`relative z-20 inline-flex items-center justify-center rounded-full transition-colors duration-300 ${
              isDark
                ? 'text-[#F1FAEE]'
                : 'text-[#457B9D] group-hover:text-[#1D3557]'
            }`}
          >
            <MoonWithWavesIcon active={isDark} reducedMotion={reducedMotion} />
          </span>
        </span>
      </motion.span>
    </button>
  );
}
