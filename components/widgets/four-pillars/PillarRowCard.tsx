"use client";

import { CursorZone } from "@/components/interaction/CursorZone";
import { fourPillars } from "@/lib/content/homepage";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

type Pillar = (typeof fourPillars.pillars)[number];

interface PillarRowCardProps {
  pillar: Pillar;
  onExplore: () => void;
}

export function PillarRowCard({ pillar, onExplore }: PillarRowCardProps) {
  return (
    <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14 xl:gap-20">
      <div className="flex flex-col justify-center py-4 lg:min-h-[min(72vh,640px)] lg:py-12 xl:py-16">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          {pillar.number} · {pillar.title}
        </p>
        <h3 className="mt-5 font-display text-2xl font-medium leading-[1.12] tracking-tight text-ink md:text-3xl lg:mt-6 lg:text-[2rem] xl:text-[2.25rem]">
          {pillar.cardTitle}
        </h3>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-mid lg:mt-8 lg:text-lg lg:leading-relaxed">
          {pillar.cardSummary}
        </p>

        <div className="mt-10 lg:mt-12">
          <CursorZone variant="explore">
            <button
              type="button"
              onClick={onExplore}
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-primary transition-colors hover:text-primary-deep"
            >
              Explore more
              <ChevronRight
                size={18}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </button>
          </CursorZone>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-surface-2 sm:aspect-[5/4] lg:aspect-auto lg:min-h-[min(72vh,640px)]">
        <Image
          src={pillar.media.src}
          alt={pillar.media.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={pillar.number === "01"}
        />
      </div>
    </article>
  );
}
