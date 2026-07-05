"use client";

import { CursorZone } from "@/components/interaction/CursorZone";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { TiltCard } from "@/components/interaction/TiltCard";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { platform } from "@/lib/content/homepage";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const cardSpring = { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.8 };

const bentoLayout = [
  { colSpan: 6 as const, rowSpan: 2 as const, minHeight: "min-h-[300px] lg:min-h-[360px]" },
  { colSpan: 6 as const, rowSpan: 2 as const, minHeight: "min-h-[300px] lg:min-h-[360px]" },
  { colSpan: 4 as const, rowSpan: 1 as const, minHeight: "min-h-[240px]" },
  { colSpan: 4 as const, rowSpan: 1 as const, minHeight: "min-h-[240px]" },
  { colSpan: 4 as const, rowSpan: 1 as const, minHeight: "min-h-[240px]" },
];

type Module = (typeof platform.modules)[number];

function ModuleCard({ mod, index }: { mod: Module; index: number }) {
  const Icon = mod.icon;
  const moduleNumber = String(index + 1).padStart(2, "0");
  const isFeatured = index < 2;

  return (
    <CursorZone variant="explore" className="h-full">
      <TiltCard className="h-full" hoverShadow={false}>
        <Link
          href={mod.href}
          className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-surface p-6 sm:p-8 ${
            isFeatured ? "lg:p-10" : ""
          }`}
        >
          <span
            className={`pointer-events-none absolute right-5 bottom-5 font-display font-medium text-ink/4 ${
              isFeatured ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
            }`}
            aria-hidden
          >
            {moduleNumber}
          </span>

          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-rule bg-surface text-ink-mid transition-transform duration-300 group-hover:scale-105">
            <Icon size={22} strokeWidth={1.5} />
          </div>

          <h3
            className={`relative mt-5 font-display font-medium text-ink transition-colors duration-300 group-hover:text-ink-soft ${
              isFeatured ? "text-xl sm:text-2xl" : "text-xl"
            }`}
          >
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
  );
}

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
            className="mx-auto mt-16 max-w-7xl lg:mt-20"
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
          >
            <BentoGrid className="min-h-[640px]">
              {platform.modules.map((mod, index) => {
                const layout = bentoLayout[index];
                const offset = index % 2 === 0 ? -24 : 24;

                return (
                  <BentoTile
                    key={mod.name}
                    colSpan={layout.colSpan}
                    rowSpan={layout.rowSpan}
                    className={`h-full ${layout.minHeight}`}
                  >
                    <motion.div
                      className="h-full"
                      variants={
                        prefersReducedMotion
                          ? undefined
                          : {
                              hidden: {
                                opacity: 0,
                                x: offset,
                                y: 28,
                                scale: 0.96,
                              },
                              visible: {
                                opacity: 1,
                                x: 0,
                                y: 0,
                                scale: 1,
                                transition: cardSpring,
                              },
                            }
                      }
                    >
                      <ModuleCard mod={mod} index={index} />
                    </motion.div>
                  </BentoTile>
                );
              })}
            </BentoGrid>
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
