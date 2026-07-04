"use client";

import { TiltCard } from "@/components/interaction/TiltCard";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface MetricPulseWidgetProps {
  value: string;
  label: string;
  prefix?: string;
  className?: string;
}

export function MetricPulseWidget({
  value,
  label,
  prefix = "",
  className = "",
}: MetricPulseWidgetProps) {
  const prefersReducedMotion = useReducedMotion();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <TiltCard
      className={`flex h-full min-h-[200px] flex-col justify-between bg-surface p-8 shadow-soft ${className}`}
    >
      <div>
        <motion.p
          animate={pulse ? { scale: 1.02 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl"
        >
          {prefix}
          {value}
        </motion.p>
        <p className="mt-3 text-[15px] text-ink-faint">{label}</p>
      </div>

      <svg
        viewBox="0 0 200 40"
        className="mt-6 h-10 w-full text-primary"
        aria-hidden
      >
        <motion.path
          d="M0 30 Q 25 10, 50 25 T 100 15 T 150 20 T 200 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </TiltCard>
  );
}
