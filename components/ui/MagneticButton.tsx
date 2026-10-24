'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useFinePointer } from '@/hooks/useFinePointer';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.28,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFinePointer = useFinePointer();
  const reducedMotion = useReducedMotionPref();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!hasFinePointer || reducedMotion) {
    return <div className={`inline-flex ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
