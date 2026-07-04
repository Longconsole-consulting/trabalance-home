"use client";

import { CursorZone } from "@/components/interaction/CursorZone";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ComparisonWidget } from "@/components/widgets/ComparisonWidget";
import { ShiftRightPanel } from "@/components/widgets/the-shift/ShiftRightPanel";
import { theShift } from "@/lib/content/homepage";
import { useState } from "react";

export function TheShift() {
  const [mode, setMode] = useState<"old" | "new">("old");

  return (
    <SectionCursor>
      <Section id="solutions" background="surface" fullBleed>
        <FullBleed>
          <Reveal className="mb-16 max-w-3xl">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {theShift.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-4xl">
              {theShift.headline}
            </h2>
          </Reveal>

          <BentoGrid className="min-h-[480px]">
            <BentoTile colSpan={7} className="min-h-[400px]">
              <div className="h-full rounded-2xl border border-rule bg-light-grey p-8 md:p-12 lg:p-16">
                <CursorZone variant="explore">
                  <ComparisonWidget mode={mode} onModeChange={setMode} />
                </CursorZone>
              </div>
            </BentoTile>

            <BentoTile
              colSpan={5}
              className={`min-h-[400px] ${mode === "new" ? "overflow-visible" : ""}`}
            >
              <ShiftRightPanel mode={mode} className="h-full" />
            </BentoTile>
          </BentoGrid>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
