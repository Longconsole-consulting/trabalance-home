"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { CustomCursor } from "./CustomCursor";

export type CursorVariant =
  | "default"
  | "explore"
  | "play"
  | "drag"
  | "view"
  | "cta"
  | "ask"
  | "click";

interface SectionEntry {
  id: string;
  variant: CursorVariant;
  ratio: number;
}

interface CursorContextValue {
  variant: CursorVariant;
  setHoverVariant: (v: CursorVariant | null) => void;
  registerSection: (id: string, variant: CursorVariant, ratio: number) => void;
  unregisterSection: (id: string) => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  enabled: boolean;
}

const CursorContext = createContext<CursorContextValue | null>(null);

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

function pickSectionVariant(sections: Map<string, SectionEntry>): CursorVariant {
  let best: SectionEntry | null = null;
  for (const entry of sections.values()) {
    if (entry.ratio > 0 && (!best || entry.ratio > best.ratio)) {
      best = entry;
    }
  }
  return best?.variant ?? "default";
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) {
    return {
      variant: "default" as CursorVariant,
      setHoverVariant: () => {},
      registerSection: () => {},
      unregisterSection: () => {},
      enabled: false,
    };
  }
  return {
    variant: ctx.variant,
    setHoverVariant: ctx.setHoverVariant,
    registerSection: ctx.registerSection,
    unregisterSection: ctx.unregisterSection,
    enabled: ctx.enabled,
  };
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useSyncExternalStore(
    subscribeToPointer,
    getIsTouchDevice,
    () => true
  );
  const enabled = !isTouch && !prefersReducedMotion;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sectionsRef = useRef<Map<string, SectionEntry>>(new Map());
  const [sectionVariant, setSectionVariant] = useState<CursorVariant>("default");
  const [hoverVariant, setHoverVariantState] = useState<CursorVariant | null>(
    null
  );

  const variant = hoverVariant ?? sectionVariant;

  const recalculateSection = useCallback(() => {
    setSectionVariant(pickSectionVariant(sectionsRef.current));
  }, []);

  const registerSection = useCallback(
    (id: string, v: CursorVariant, ratio: number) => {
      sectionsRef.current.set(id, { id, variant: v, ratio });
      recalculateSection();
    },
    [recalculateSection]
  );

  const unregisterSection = useCallback(
    (id: string) => {
      sectionsRef.current.delete(id);
      recalculateSection();
    },
    [recalculateSection]
  );

  const setHoverVariant = useCallback((v: CursorVariant | null) => {
    setHoverVariantState(v);
  }, []);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add("custom-cursor-active");
    } else {
      document.body.classList.remove("custom-cursor-active");
    }
    return () => document.body.classList.remove("custom-cursor-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, mouseX, mouseY]);

  return (
    <CursorContext.Provider
      value={{
        variant,
        setHoverVariant,
        registerSection,
        unregisterSection,
        mouseX,
        mouseY,
        enabled,
      }}
    >
      {children}
      {enabled && <CustomCursor />}
    </CursorContext.Provider>
  );
}

export function useCursorSpring() {
  const ctx = useContext(CursorContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 35, mass: 0.5 };
  const x = useSpring(ctx?.mouseX ?? fallbackX, springConfig);
  const y = useSpring(ctx?.mouseY ?? fallbackY, springConfig);

  return {
    x,
    y,
    variant: ctx?.variant ?? "default",
    enabled: ctx?.enabled ?? false,
  };
}
