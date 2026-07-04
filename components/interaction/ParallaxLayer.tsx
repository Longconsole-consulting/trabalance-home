"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  mouseParallax?: boolean;
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.15,
  mouseParallax = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [speed * -80, speed * 80]
  );

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !mouseParallax || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--mouse-x", "0px");
    ref.current.style.setProperty("--mouse-y", "0px");
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: scrollY,
        translateX: mouseParallax ? "var(--mouse-x, 0px)" : undefined,
        translateY: mouseParallax
          ? "calc(var(--mouse-y, 0px) + var(--scroll-y, 0px))"
          : undefined,
      }}
      onMouseMove={mouseParallax ? handleMove : undefined}
      onMouseLeave={mouseParallax ? handleLeave : undefined}
    >
      {children}
    </motion.div>
  );
}
