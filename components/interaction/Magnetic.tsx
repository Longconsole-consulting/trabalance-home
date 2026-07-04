"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useCursor } from "./CursorProvider";

interface MagneticProps {
  children: ReactNode;
  className?: string;
}

export function Magnetic({
  children,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setHoverVariant, enabled } = useCursor();
  const prefersReducedMotion = useReducedMotion();

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    setHoverVariant(null);
  };

  const handleEnter = () => {
    if (enabled) setHoverVariant("cta");
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
