'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useFinePointer } from '@/hooks/useFinePointer';
import { useReducedMotionPref } from '@/hooks/useReducedMotionPref';

interface TiltCard3DProps {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

export function TiltCard3D({
  children,
  maxTilt = 4.5,
  className = '',
}: TiltCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasFinePointer = useFinePointer();
  const reducedMotion = useReducedMotionPref();
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 24, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 24, mass: 0.5 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateX.set((0.5 - py) * maxTilt * 2);
    rotateY.set((px - 0.5) * maxTilt * 2);
    setSpotlight({ x: px * 100, y: py * 100, active: true });
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  if (!hasFinePointer || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: '1200px' }} className={className}>
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {/* Subtle cursor-tracked Frosted Blue & Cerulean blueprint spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
          style={{
            opacity: spotlight.active ? 1 : 0,
            background: `radial-gradient(520px circle at ${spotlight.x}% ${spotlight.y}%, rgba(168, 218, 220, 0.14), rgba(69, 123, 157, 0.08) 45%, transparent 70%)`,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}
