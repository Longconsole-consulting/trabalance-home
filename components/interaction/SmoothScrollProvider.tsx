"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";
import "lenis/dist/lenis.css";

function subscribeToPointer() {
  const mq1 = window.matchMedia("(pointer: coarse)");
  const mq2 = window.matchMedia("(hover: none)");
  const handler = () => {};
  mq1.addEventListener("change", handler);
  mq2.addEventListener("change", handler);
  return () => {
    mq1.removeEventListener("change", handler);
    mq2.removeEventListener("change", handler);
  };
}

function getIsTouchDevice() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(hover: none)").matches
  );
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useSyncExternalStore(
    subscribeToPointer,
    getIsTouchDevice,
    () => true,
  );

  if (prefersReducedMotion || isTouch) {
    return children;
  }

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
