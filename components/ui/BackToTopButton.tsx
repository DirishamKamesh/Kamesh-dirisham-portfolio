'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';
import { soundController } from '@/lib/sound';

export function BackToTopButton() {
  const reducedMotion = useReducedMotionPref();
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Determine hero section bottom threshold dynamically if present
      const heroEl =
        document.getElementById('hero-section') ||
        document.getElementById('hero-heading')?.closest('section');

      const threshold = heroEl
        ? Math.max(360, heroEl.offsetTop + heroEl.offsetHeight - 96)
        : 520;

      setVisible(scrollY > threshold);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(pct);
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, {
        passive: true,
      } as EventListenerOptions);
      window.removeEventListener('resize', handleScroll, {
        passive: true,
      } as EventListenerOptions);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    soundController.playSubtleTick(640);
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 18, scale: 0.94 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 14, scale: 0.94 }
          }
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            title="Back to top"
            className="group relative inline-flex items-center gap-2.5 min-h-[44px] pl-2 pr-3.5 py-2 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[#457B9D] hover:border-[#E63946] hover:bg-[var(--bg-elevated)] shadow-[0_10px_28px_rgba(6,13,22,0.45)] transition-colors duration-200 cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A8DADC]"
          >
            {/* Brand Accent Square Icon */}
            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#E63946] text-[#F1FAEE] group-hover:bg-[#A8DADC] group-hover:text-[#0D1929] transition-colors duration-200 shrink-0">
              <ArrowUp
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>

            {/* Monospace Technical Label */}
            <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)] group-hover:text-[#A8DADC] transition-colors duration-200 pr-0.5">
              TOP
            </span>

            {/* Bottom Scroll Progress Track */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1D3557]"
            >
              <span
                className="block h-full bg-[#E63946] group-hover:bg-[#A8DADC] transition-colors duration-200"
                style={{ width: `${scrollProgress}%` }}
              />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
