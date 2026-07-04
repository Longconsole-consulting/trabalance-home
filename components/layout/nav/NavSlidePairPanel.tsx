"use client";

import { navMenu, type NavMenuId } from "@/lib/content/homepage";
import { panelEase } from "@/components/layout/nav/NavMegaPanel";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

const solutionsMenu = navMenu.find((item) => item.id === "solutions");
const developersMenu = navMenu.find((item) => item.id === "developers");

const slideContentVariants = {
  enter: (direction: number) => ({
    x: direction * 40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction * -40,
    opacity: 0,
  }),
};

interface NavSlidePairPanelProps {
  openId: NavMenuId | null;
  slideDirection: number;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function NavSlidePairPanel({
  openId,
  slideDirection,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: NavSlidePairPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isOpen = openId === "solutions" || openId === "developers";

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (
        (target as HTMLElement).closest?.("#nav-trigger-solutions") ||
        (target as HTMLElement).closest?.("#nav-trigger-developers") ||
        (target as HTMLElement).closest?.("[data-nav-panel-root]")
      ) {
        return;
      }
      onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && openId ? (
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
            id={`nav-panel-${openId}`}
            role="menu"
            aria-labelledby={`nav-trigger-${openId}`}
            className="fixed right-0 left-0 z-40 overflow-hidden border-b border-rule bg-surface shadow-soft-lg"
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
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
              <div className="relative min-h-[120px] overflow-x-clip">
                <AnimatePresence
                  mode="popLayout"
                  custom={slideDirection}
                  initial={false}
                >
                  {openId === "solutions" &&
                    solutionsMenu?.type === "grouped" && (
                      <motion.div
                        key="solutions"
                        custom={slideDirection}
                        variants={
                          prefersReducedMotion
                            ? undefined
                            : slideContentVariants
                        }
                        initial={prefersReducedMotion ? false : "enter"}
                        animate="center"
                        exit={prefersReducedMotion ? undefined : "exit"}
                        transition={{ duration: 0.28, ease: panelEase }}
                      >
                        <SolutionsContent onClose={onClose} />
                      </motion.div>
                    )}

                  {openId === "developers" &&
                    developersMenu?.type === "mega" && (
                      <motion.div
                        key="developers"
                        custom={slideDirection}
                        variants={
                          prefersReducedMotion
                            ? undefined
                            : slideContentVariants
                        }
                        initial={prefersReducedMotion ? false : "enter"}
                        animate="center"
                        exit={prefersReducedMotion ? undefined : "exit"}
                        transition={{ duration: 0.28, ease: panelEase }}
                      >
                        <DevelopersContent onClose={onClose} />
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function SolutionsContent({ onClose }: { onClose: () => void }) {
  if (!solutionsMenu || solutionsMenu.type !== "grouped") return null;

  return (
    <div
      role="none"
      className="grid gap-10 sm:grid-cols-2 lg:max-w-2xl"
    >
      {solutionsMenu.groups.map((group) => (
        <div key={group.label}>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            {group.label}
          </p>
          <ul className="mt-4 space-y-1" role="group" aria-label={group.label}>
            {group.items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={onClose}
                  className="block py-2 text-[15px] text-ink-mid transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function DevelopersContent({ onClose }: { onClose: () => void }) {
  if (!developersMenu || developersMenu.type !== "mega") return null;

  return (
    <div role="none" className="flex max-w-xl flex-col gap-2">
      {developersMenu.items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          role="menuitem"
          onClick={onClose}
          className="group block py-2"
        >
          <p className="font-medium text-ink transition-colors group-hover:text-primary">
            {item.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink-faint transition-colors group-hover:text-ink-mid">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
