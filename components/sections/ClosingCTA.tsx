import { Magnetic } from "@/components/interaction/Magnetic";
import { ParallaxLayer } from "@/components/interaction/ParallaxLayer";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { Button } from "@/components/ui/Button";
import { BentoGrid, BentoTile } from "@/components/ui/BentoGrid";
import { FullBleed } from "@/components/ui/FullBleed";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { closingCta } from "@/lib/content/homepage";

export function ClosingCTA() {
  const { ceoMessage } = closingCta;

  return (
    <SectionCursor>
      <Section id="demo" background="hero" mesh fullBleed>
        <FullBleed>
          <BentoGrid className="min-h-[480px]">
            <BentoTile colSpan={5} className="flex flex-col justify-center p-6 md:p-10">
              <Reveal variant="clipUp">
                <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl">
                  {closingCta.headline}
                </h2>
              </Reveal>
              <Reveal variant="fadeUp" delay={0.1}>
                <p className="mt-6 text-[17px] leading-relaxed text-white/70 lg:text-lg">
                  {closingCta.subhead}
                </p>
              </Reveal>
              <Reveal variant="fadeUp" delay={0.2}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <Button href={closingCta.primaryHref} size="lg" showChevron>
                      {closingCta.primaryCta}
                    </Button>
                  </Magnetic>
                  <Button
                    href={closingCta.secondaryHref}
                    size="lg"
                    variant="outline-light"
                  >
                    {closingCta.secondaryCta}
                  </Button>
                </div>
              </Reveal>
            </BentoTile>

            <BentoTile colSpan={7} className="min-h-[480px] p-4 md:p-5 lg:p-6">
              <div className="grid h-full min-h-[440px] grid-cols-1 gap-5 md:min-h-[480px] md:grid-cols-[minmax(0,11rem)_1fr] md:gap-6 lg:grid-cols-[minmax(0,13rem)_1fr]">
                <div className="flex flex-col justify-between gap-6 md:py-1">
                  <Reveal variant="fadeUp">
                    <p className="text-sm font-medium tracking-wide text-white/60 uppercase">
                      {ceoMessage.eyebrow}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {ceoMessage.themes.map((theme) => (
                        <li
                          key={theme}
                          className="flex gap-2 text-[13px] leading-snug text-white/55 md:text-sm"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal variant="fadeUp" delay={0.12}>
                    <div>
                      <p className="font-display text-base font-medium text-white md:text-lg">
                        {ceoMessage.speaker.name}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-white/60 md:text-sm">
                        {ceoMessage.speaker.title}
                      </p>
                    </div>
                  </Reveal>
                </div>

                <ParallaxLayer mouseParallax className="h-full min-h-[280px] md:min-h-0">
                  <MediaSlot
                    src={ceoMessage.video.src}
                    poster={ceoMessage.video.poster}
                    label={ceoMessage.video.label}
                    aspectRatio="fill"
                    interactive
                    className="h-full min-h-[280px] md:min-h-[480px]"
                  />
                </ParallaxLayer>
              </div>
            </BentoTile>
          </BentoGrid>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
