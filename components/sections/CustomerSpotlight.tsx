import { SectionCursor } from "@/components/interaction/SectionCursor";
import { TiltCard } from "@/components/interaction/TiltCard";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { FullBleed } from "@/components/ui/FullBleed";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { customerSpotlight } from "@/lib/content/homepage";

export function CustomerSpotlight() {
  return (
    <SectionCursor>
      <Section background="surface" fullBleed>
        <FullBleed>
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              {customerSpotlight.eyebrow}
            </p>
          </Reveal>

          <BentoGrid className="mt-12 min-h-[560px]">
            <BentoTile colSpan={4} rowSpan={2} className="min-h-[320px]">
              <TiltCard className="h-full">
                <div className="flex h-full flex-col justify-center rounded-2xl border border-rule bg-surface p-8 md:p-12">
                  <p className="text-sm text-ink-faint">
                    {customerSpotlight.company} · {customerSpotlight.industry}
                  </p>
                  <blockquote className="mt-6 font-display text-2xl leading-snug font-medium text-ink md:text-3xl lg:text-4xl">
                    &ldquo;{customerSpotlight.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-8">
                    <p className="font-medium text-ink">{customerSpotlight.author}</p>
                    <p className="text-[15px] text-ink-faint">{customerSpotlight.role}</p>
                  </footer>
                </div>
              </TiltCard>
            </BentoTile>

            <BentoTile colSpan={8} className="relative min-h-[360px]">
              <MediaSlot
                src={customerSpotlight.video.src}
                poster={customerSpotlight.video.poster}
                label={customerSpotlight.video.label}
                aspectRatio="fill"
                interactive
                className="absolute inset-0"
              />
            </BentoTile>

            <BentoTile colSpan={8} className="min-h-[160px]">
              <div className="flex h-full items-center justify-between rounded-2xl bg-ink px-8 py-8 md:px-12">
                <div>
                  <p className="font-display text-3xl font-medium text-primary md:text-4xl">
                    {customerSpotlight.stat.value}
                  </p>
                  <p className="mt-2 text-[15px] text-white/60">
                    {customerSpotlight.stat.label}
                  </p>
                </div>
              </div>
            </BentoTile>
          </BentoGrid>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
