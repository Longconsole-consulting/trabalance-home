"use client";

import { motion, useReducedMotion } from "framer-motion";

interface MiniSparklineProps {
  data: number[];
  label: string;
  className?: string;
}

function buildPath(data: number[], width: number, height: number) {
  if (data.length < 2) return "";
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  return data
    .map((value, i) => {
      const x = i * step;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export function MiniSparkline({ data, label, className = "" }: MiniSparklineProps) {
  const prefersReducedMotion = useReducedMotion();
  const width = 200;
  const height = 40;
  const path = buildPath(data, width, height);

  return (
    <div className={className}>
      <p className="mb-2 text-[10px] font-medium text-ink-faint lg:text-xs">{label}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-10 w-full text-primary" aria-hidden>
        <motion.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.5"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
