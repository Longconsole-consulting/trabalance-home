"use client";

import { SectionCursor } from "@/components/interaction/SectionCursor";
import { ParallaxLayer } from "@/components/interaction/ParallaxLayer";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { StepScrubberWidget } from "@/components/widgets/StepScrubberWidget";
import { howItWorks } from "@/lib/content/homepage";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (prefersReducedMotion) return;
    const idx = Math.min(
      Math.floor(progress * howItWorks.steps.length),
      howItWorks.steps.length - 1
    );
    setActiveStep(Math.max(0, idx));
  });

  return (
    <SectionCursor variant="drag">
      <Section background="cream" mesh fullBleed>
        <FullBleed>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {howItWorks.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-4xl">
              {howItWorks.headline}
            </h2>
          </Reveal>
        </FullBleed>

        <div ref={containerRef} className="relative mt-20 h-[280vh]">
          <div className="sticky top-24 lg:top-32">
            <FullBleed>
              <ParallaxLayer speed={0.1}>
                <StepScrubberWidget
                  activeStep={activeStep}
                  onStepClick={setActiveStep}
                />
              </ParallaxLayer>
            </FullBleed>
          </div>
        </div>
      </Section>
    </SectionCursor>
  );
}
