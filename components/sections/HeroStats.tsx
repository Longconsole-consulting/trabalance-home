"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { heroStats } from "@/lib/content/homepage";

export function HeroStats() {
  return (
    <RevealStagger className="relative z-10 border-t border-white/10 pt-8 md:pt-10">
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 md:gap-y-0">
        {heroStats.map((stat, index) => (
          <RevealItem key={stat.label} variant="fadeUp" className="h-full">
            <article
              className={
                index > 0
                  ? "md:border-l md:border-white/10 md:pl-8 lg:pl-10"
                  : "md:pr-4"
              }
            >
              <p className="font-display text-[1.75rem] leading-none font-medium tracking-tight text-white lg:text-4xl">
                <AnimatedCounter
                  value={stat.value}
                  display={"display" in stat ? stat.display : undefined}
                  suffix={stat.suffix}
                  isText={"isText" in stat ? stat.isText : true}
                />
              </p>
              <p className="mt-2 text-sm leading-snug text-white/50">{stat.label}</p>
            </article>
          </RevealItem>
        ))}
      </div>
    </RevealStagger>
  );
}
