"use client";

import { OldWayChaosMap } from "@/components/widgets/the-shift/OldWayChaosMap";
import { ProductMovementPanel } from "@/components/widgets/the-shift/ProductMovementPanel";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const panelEase = [0.16, 1, 0.3, 1] as const;
const oldWayBackground = "/home/images/scattered.jpg";

interface ShiftRightPanelProps {
  mode: "old" | "new";
  className?: string;
}

export function ShiftRightPanel({ mode, className = "" }: ShiftRightPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const isNew = mode === "new";

  return (
    <div
      className={`relative min-h-[400px] ${
        isNew
          ? "bg-transparent"
          : "overflow-hidden rounded-2xl border border-rule bg-surface-2"
      } ${className}`}
    >
      {!isNew && (
        <>
          <Image
            src={oldWayBackground}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
          <div className="absolute inset-0 bg-surface/25" aria-hidden />
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          className={`absolute inset-0 z-10 ${isNew ? "p-0" : "p-4 md:p-5 lg:p-6"}`}
          style={{ transformOrigin: "center center" }}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : isNew
                ? { opacity: 0, scale: 0.88 }
                : { opacity: 0, y: 16, scale: 0.985 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : isNew
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, y: 0, scale: 1 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : isNew
                ? { opacity: 0, scale: 0.94 }
                : { opacity: 0, y: -10, scale: 0.99 }
          }
          transition={{ duration: prefersReducedMotion ? 0.15 : 0.48, ease: panelEase }}
        >
          {isNew ? (
            <ProductMovementPanel animate={!prefersReducedMotion} />
          ) : (
            <OldWayChaosMap animate={!prefersReducedMotion} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
