"use client";

import { CursorZone } from "@/components/interaction/CursorZone";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { TiltCard } from "@/components/interaction/TiltCard";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { platform } from "@/lib/content/homepage";
import { motion, useReducedMotion } from "framer-motion";
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
      <Section id="platform" background="cream" mesh fullBleed className="!pt-24 md:!pt-32 lg:!pt-40">
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
                    <TiltCard className="h-full">
                      <Link
                        href={mod.href}
                        className="group flex h-full min-h-[220px] flex-col rounded-2xl border border-rule bg-surface p-6 shadow-soft transition-shadow hover:shadow-soft-lg sm:p-8"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                          <Icon size={22} strokeWidth={1.5} />
                        </div>
                        <h3 className="mt-5 font-display text-xl font-medium text-ink">
                          {mod.name}
                        </h3>
                        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-faint">
                          {mod.description}
                        </p>
                        <span className="mt-5 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Explore →
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
