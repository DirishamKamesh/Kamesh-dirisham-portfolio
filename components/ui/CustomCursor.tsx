'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { useFinePointer } from '@/hooks/useFinePointer';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

export function CustomCursor() {
  const hasFinePointer = useFinePointer();
  const reducedMotion = useReducedMotionPref();
  const [visible, setVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.35 });
  const cursorY = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (!hasFinePointer || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labeledEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labeledEl) {
        setHoverLabel(labeledEl.getAttribute('data-cursor-label'));
        setIsInteractive(true);
        return;
      }

      const clickable = target.closest('a, button, input, textarea, select');
      setHoverLabel(null);
      setIsInteractive(Boolean(clickable));
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasFinePointer, reducedMotion, cursorX, cursorY, visible]);

  if (!hasFinePointer || reducedMotion || !visible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`flex items-center justify-center transition-transform duration-150 ease-out ${
          hoverLabel
            ? 'px-2.5 py-1 bg-[#E63946] text-[#F1FAEE] text-[11px] font-mono font-semibold tracking-tight shadow-sm'
            : isInteractive
              ? 'w-7 h-7 rounded-full border-2 border-[#E63946] bg-[#A8DADC]/35 scale-110'
              : 'w-3.5 h-3.5 rounded-full border-2 border-[#1D3557]/80 bg-[#F1FAEE]/50'
        }`}
      >
        {hoverLabel ? <span>{hoverLabel}</span> : null}
      </div>
    </motion.div>
  );
}
