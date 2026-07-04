"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ElementType, useMemo } from "react";

interface JitterTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
}

function offsets(index: number, step: number) {
  const x = (((index * 17 + step * 3) % 7) - 3) * 3;
  const y = (((index * 11 + step * 5) % 5) - 2) * 4;
  return { x, y };
}

export function JitterText({
  text,
  className = "",
  as: Component = "span",
  delay = 0,
  stagger = 0.028,
}: JitterTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const chars = useMemo(
    () =>
      text.split("").map((char, index) => ({
        char: char === " " ? "\u00A0" : char,
        index,
      })),
    [text],
  );

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={className} aria-label={text}>
      {chars.map(({ char, index }) => {
        const o0 = offsets(index, 0);
        const o1 = offsets(index, 1);
        const o2 = offsets(index, 2);
        const o3 = offsets(index, 3);

        return (
          <motion.span
            key={`${char}-${index}`}
            className="inline-block"
            aria-hidden
            initial={{
              opacity: 0,
              x: o0.x,
              y: o0.y,
              filter: "blur(4px)",
            }}
            whileInView={{
              opacity: [0, 1, 0.7, 1, 1],
              x: [o0.x, o1.x, o2.x, o3.x, 0],
              y: [o0.y, o1.y, o2.y, o3.y, 0],
              filter: [
                "blur(4px)",
                "blur(2px)",
                "blur(1px)",
                "blur(0px)",
                "blur(0px)",
              ],
            }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: delay + index * stagger,
              times: [0, 0.2, 0.45, 0.7, 1],
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </Component>
  );
}
