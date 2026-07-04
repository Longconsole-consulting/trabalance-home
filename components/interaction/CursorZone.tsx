"use client";

import { type ReactNode } from "react";
import { useCursor, type CursorVariant } from "./CursorProvider";

interface CursorZoneProps {
  variant: CursorVariant;
  children: ReactNode;
  className?: string;
}

/** Applies a cursor variant only while the pointer is over this element. */
export function CursorZone({ variant, children, className = "" }: CursorZoneProps) {
  const { setHoverVariant, enabled } = useCursor();

  return (
    <div
      className={className}
      onMouseEnter={() => enabled && setHoverVariant(variant)}
      onMouseLeave={() => setHoverVariant(null)}
    >
      {children}
    </div>
  );
}
