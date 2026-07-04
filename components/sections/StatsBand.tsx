import { CursorZone } from "@/components/interaction/CursorZone";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { MetricPulseWidget } from "@/components/widgets/MetricPulseWidget";
import { stats } from "@/lib/content/homepage";

export function StatsBand() {
  return (
    <SectionCursor>
      <Section background="surface" fullBleed>
        <FullBleed>
          <RevealStagger>
            <BentoGrid>
              {stats.map((stat, i) => (
                <RevealItem key={stat.label} variant="scaleIn">
                  <BentoTile colSpan={i === 0 ? 6 : 2} className="min-h-[200px]">
                    {i === 0 ? (
                      <CursorZone variant="explore" className="h-full">
                        <MetricPulseWidget
                          value={stats[0].display ?? String(stats[0].value)}
                          label={stats[0].label}
                          className="h-full rounded-2xl"
                        />
                      </CursorZone>
                    ) : (
                      <div className="flex h-full flex-col justify-center rounded-2xl border border-rule bg-surface p-8">
                        <div className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">
                          <AnimatedCounter
                            value={stat.value}
                            display={stat.display}
                            suffix={stat.suffix}
                            isText={"isText" in stat ? stat.isText : false}
                          />
                        </div>
                        <p className="mt-3 text-[15px] text-ink-faint">{stat.label}</p>
                      </div>
                    )}
                  </BentoTile>
                </RevealItem>
              ))}
            </BentoGrid>
          </RevealStagger>

        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
