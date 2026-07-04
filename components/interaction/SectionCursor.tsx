"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { useCursor, type CursorVariant } from "./CursorProvider";

interface SectionCursorProps {
  variant?: CursorVariant;
  children: ReactNode;
}

export function SectionCursor({
  variant = "default",
  children,
}: SectionCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { registerSection, unregisterSection, enabled } = useCursor();

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          registerSection(id, variant, entry.intersectionRatio);
        }
      },
      { threshold: thresholds, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      unregisterSection(id);
    };
  }, [id, variant, registerSection, unregisterSection, enabled]);

  return <div ref={ref}>{children}</div>;
}
