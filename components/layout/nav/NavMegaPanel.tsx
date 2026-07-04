"use client";

import { type NavMenuId } from "@/lib/content/homepage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

export const panelEase = [0.16, 1, 0.3, 1] as const;

interface NavMegaPanelProps {
  id: NavMenuId;
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: ReactNode;
}

export function NavMegaPanel({
  id,
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
  children,
}: NavMegaPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (
        (target as HTMLElement).closest?.(`#nav-trigger-${id}`) ||
        (target as HTMLElement).closest?.("[data-nav-panel-root]")
      ) {
        return;
      }
      onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen, id, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-ink/5"
            style={{ top: "calc(var(--site-banner-height, 0px) + 3.5rem)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            data-nav-panel-root
            id={`nav-panel-${id}`}
            role="menu"
            aria-labelledby={`nav-trigger-${id}`}
            className="fixed right-0 left-0 z-40 border-b border-rule bg-surface shadow-soft-lg"
            style={{
              top: "calc(var(--site-banner-height, 0px) + 3.5rem)",
            }}
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: -8, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.99 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.28,
              ease: panelEase,
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/30 to-transparent" />
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">{children}</div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export const navStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

export const navStaggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: panelEase },
  },
};
