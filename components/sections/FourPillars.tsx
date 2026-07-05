"use client";

import { SectionCursor } from "@/components/interaction/SectionCursor";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { PillarDetailModal } from "@/components/widgets/four-pillars/PillarDetailModal";
import { PillarRowCard } from "@/components/widgets/four-pillars/PillarRowCard";
import { fourPillars } from "@/lib/content/homepage";
import { motion, useReducedMotion } from "framer-motion";
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
            className="mx-auto mt-16 flex max-w-7xl flex-col gap-24 px-4 lg:mt-24 lg:gap-32 lg:px-0 xl:gap-40"
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
            {fourPillars.pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
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
                <PillarRowCard
                  pillar={pillar}
                  onExplore={() => setActivePillar(pillar)}
                />
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
