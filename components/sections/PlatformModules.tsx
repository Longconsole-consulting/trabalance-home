"use client";

import { CursorZone } from "@/components/interaction/CursorZone";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { TiltCard } from "@/components/interaction/TiltCard";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { platform } from "@/lib/content/homepage";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const cardSpring = { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.8 };

const entryOffsets = [
  { x: -44, y: 32 },
  { x: 0, y: 56 },
  { x: 44, y: 32 },
] as const;

export function PlatformModules() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionCursor>
      <Section id="platform" background="surface" fullBleed className="!pt-24 md:!pt-32 lg:!pt-40">
        <FullBleed>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {platform.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
              {platform.headline}
            </h2>
            <p className="mt-5 text-[15px] text-ink-mid lg:text-base">{platform.subhead}</p>
          </Reveal>

          <motion.div
            className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-3"
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.06 },
              },
            }}
          >
            {platform.modules.map((mod, index) => {
              const Icon = mod.icon;
              const offset = entryOffsets[index % 3];
              const moduleNumber = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={mod.name}
                  className="h-full min-w-0"
                  variants={
                    prefersReducedMotion
                      ? undefined
                      : {
                          hidden: {
                            opacity: 0,
                            x: offset.x,
                            y: offset.y,
                            scale: 0.92,
                            rotate: index % 2 === 0 ? -1.5 : 1.5,
                          },
                          visible: {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            transition: cardSpring,
                          },
                        }
                  }
                >
                  <CursorZone variant="explore" className="h-full">
                    <TiltCard className="h-full" hoverShadow={false}>
                      <Link
                        href={mod.href}
                        className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-rule bg-surface p-6 sm:p-8"
                      >
                        <span
                          className="pointer-events-none absolute right-5 bottom-5 font-display text-4xl font-medium text-ink/4 sm:text-5xl"
                          aria-hidden
                        >
                          {moduleNumber}
                        </span>

                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rule bg-surface text-ink-mid transition-transform duration-300 group-hover:scale-105">
                          <Icon size={22} strokeWidth={1.5} />
                        </div>

                        <h3 className="relative mt-5 font-display text-xl font-medium text-ink transition-colors duration-300 group-hover:text-ink-soft">
                          {mod.name}
                        </h3>
                        <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-ink-faint">
                          {mod.description}
                        </p>

                        <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mid transition-colors duration-300 group-hover:text-ink">
                          Explore module
                          <ArrowRight
                            size={15}
                            strokeWidth={2}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </Link>
                    </TiltCard>
                  </CursorZone>
                </motion.div>
              );
            })}
          </motion.div>

          <Reveal>
            <p className="mt-12 text-center text-[15px] text-ink-faint">
              {platform.footnote}
            </p>
          </Reveal>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
