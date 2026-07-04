"use client";

import { CursorZone } from "@/components/interaction/CursorZone";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PillarDetailModal } from "@/components/widgets/four-pillars/PillarDetailModal";
import { fourPillars } from "@/lib/content/homepage";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const cardSpring = { type: "spring" as const, stiffness: 280, damping: 26, mass: 0.85 };

export function FourPillars() {
  const [activePillar, setActivePillar] = useState<
    (typeof fourPillars.pillars)[number] | null
  >(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionCursor variant="explore">
      <Section background="surface" fullBleed>
        <FullBleed>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {fourPillars.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-4xl lg:text-[2.75rem]">
              {fourPillars.headline}
            </h2>
            <p className="mt-5 text-[15px] text-ink-mid lg:text-base">
              {fourPillars.subhead}
            </p>
          </Reveal>

          <motion.div
            className="mx-auto mt-12 max-w-7xl overflow-x-auto lg:mt-16 lg:overflow-hidden"
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.05 },
              },
            }}
          >
            <div className="flex min-w-max snap-x snap-mandatory gap-0 lg:grid lg:min-w-0 lg:grid-cols-4 lg:overflow-hidden lg:rounded-3xl">
            {fourPillars.pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="w-[220px] shrink-0 snap-start sm:w-[240px] lg:w-auto lg:min-w-0"
                variants={
                  prefersReducedMotion
                    ? undefined
                    : {
                        hidden: {
                          opacity: 0,
                          y: 48,
                          scale: 0.94,
                          filter: "blur(8px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                          transition: cardSpring,
                        },
                      }
                }
              >
                <CursorZone variant="click" className="h-full">
                  <button
                    type="button"
                    className={`group relative h-[480px] w-full overflow-hidden text-left sm:h-[520px] lg:h-[560px] ${
                      index === 0
                        ? "rounded-l-3xl lg:rounded-none"
                        : index === fourPillars.pillars.length - 1
                          ? "rounded-r-3xl lg:rounded-none"
                          : ""
                    } ${index > 0 ? "border-l border-white/15" : ""}`}
                    onClick={() => setActivePillar(pillar)}
                  >
                    <Image
                      src={pillar.media.src}
                      alt={pillar.media.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 240px, 25vw"
                    />

                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-ink/55 to-transparent"
                      aria-hidden
                    />

                    <div className="absolute inset-x-0 top-0 z-10 px-4 pt-5 pb-3 sm:px-5 sm:pt-6 lg:px-6">
                      <h3 className="font-display text-lg font-medium tracking-tight text-white drop-shadow-[0_1px_8px_rgb(10_14_39_/_0.45)] sm:text-xl lg:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-[12px] leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgb(10_14_39_/_0.4)] sm:text-[13px]">
                        {pillar.cardSummary}
                      </p>
                    </div>
                  </button>
                </CursorZone>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </FullBleed>
      </Section>

      <PillarDetailModal
        pillar={activePillar}
        onClose={() => setActivePillar(null)}
      />
    </SectionCursor>
  );
}
