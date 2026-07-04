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
      <Section background="cream" mesh fullBleed>
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
            className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:max-w-5xl lg:gap-6"
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.05 },
              },
            }}
          >
            {fourPillars.pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="min-w-0"
                variants={
                  prefersReducedMotion
                    ? undefined
                    : {
                        hidden: {
                          opacity: 0,
                          y: 56,
                          scale: 0.88,
                          rotate: index % 2 === 0 ? -2 : 2,
                          filter: "blur(10px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotate: 0,
                          filter: "blur(0px)",
                          transition: cardSpring,
                        },
                      }
                }
              >
                <CursorZone variant="click" className="h-full">
                  <button
                    type="button"
                    className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl text-left"
                    onClick={() => setActivePillar(pillar)}
                  >
                    <Image
                      src={pillar.media.src}
                      alt={pillar.media.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 50vw, 480px"
                    />

                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-linear-to-b from-ink/55 to-transparent"
                      aria-hidden
                    />

                    <div className="absolute inset-x-0 top-0 z-10 px-5 pt-5 pb-3 sm:px-6 sm:pt-6">
                      <h3 className="font-display text-xl font-medium tracking-tight text-white drop-shadow-[0_1px_8px_rgb(10_14_39_/_0.45)] sm:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/90 drop-shadow-[0_1px_6px_rgb(10_14_39_/_0.4)] sm:text-sm">
                        {pillar.cardSummary}
                      </p>
                    </div>
                  </button>
                </CursorZone>
              </motion.div>
            ))}
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
