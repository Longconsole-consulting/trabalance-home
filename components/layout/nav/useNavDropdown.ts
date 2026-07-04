"use client";

import { type NavMenuId } from "@/lib/content/homepage";
import { useCallback, useEffect, useRef, useState } from "react";

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 200;

type SlidePairId = "solutions" | "developers";

const SLIDE_ORDER: Record<SlidePairId, number> = {
  solutions: 0,
  developers: 1,
};

function isSlidePairId(id: NavMenuId | null): id is SlidePairId {
  return id === "solutions" || id === "developers";
}

export function useNavDropdown() {
  const [openId, setOpenId] = useState<NavMenuId | null>(null);
  const [slideDirection, setSlideDirection] = useState(1);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Partial<Record<NavMenuId, HTMLButtonElement>>>({});
  const prevOpenIdRef = useRef<NavMenuId | null>(null);

  const setOpenWithDirection = useCallback((id: NavMenuId | null) => {
    const prev = prevOpenIdRef.current;

    if (
      id &&
      isSlidePairId(prev) &&
      isSlidePairId(id) &&
      prev !== id
    ) {
      setSlideDirection(SLIDE_ORDER[id] > SLIDE_ORDER[prev] ? 1 : -1);
    }

    prevOpenIdRef.current = id;
    setOpenId(id);
  }, []);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearTimers();
    setOpenWithDirection(null);
  }, [clearTimers, setOpenWithDirection]);

  const open = useCallback(
    (id: NavMenuId) => {
      clearTimers();
      setOpenWithDirection(id);
    },
    [clearTimers, setOpenWithDirection]
  );

  const scheduleOpen = useCallback(
    (id: NavMenuId) => {
      clearTimers();
      openTimerRef.current = setTimeout(() => open(id), OPEN_DELAY_MS);
    },
    [clearTimers, open]
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => close(), CLOSE_DELAY_MS);
  }, [clearTimers, close]);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const toggle = useCallback(
    (id: NavMenuId) => {
      clearTimers();
      setOpenId((current) => {
        const next = current === id ? null : id;
        const prev = prevOpenIdRef.current;
        if (next && isSlidePairId(prev) && isSlidePairId(next) && prev !== next) {
          setSlideDirection(SLIDE_ORDER[next] > SLIDE_ORDER[prev] ? 1 : -1);
        }
        prevOpenIdRef.current = next;
        return next;
      });
    },
    [clearTimers]
  );

  const registerTrigger = useCallback(
    (id: NavMenuId, node: HTMLButtonElement | null) => {
      if (node) {
        triggerRefs.current[id] = node;
      } else {
        delete triggerRefs.current[id];
      }
    },
    []
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openId) {
        const trigger = triggerRefs.current[openId];
        close();
        trigger?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openId, close]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    openId,
    slideDirection,
    isSlidePairOpen: isSlidePairId(openId),
    open,
    close,
    scheduleOpen,
    scheduleClose,
    cancelClose,
    toggle,
    registerTrigger,
    isOpen: (id: NavMenuId) => openId === id,
  };
}
