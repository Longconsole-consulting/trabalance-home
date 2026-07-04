import { Magnetic } from "@/components/interaction/Magnetic";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { Button } from "@/components/ui/Button";
import { FullBleed } from "@/components/ui/FullBleed";
import { JitterText } from "@/components/ui/JitterText";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { HeroDashboardMock } from "@/components/widgets/hero-dashboard/HeroDashboardMock";
import { hero } from "@/lib/content/homepage";
import { HeroStats } from "@/components/sections/HeroStats";

export function Hero() {
  const eyebrowLine = hero.eyebrow.join(" ");

  return (
    <SectionCursor>
      <Section
        background="surface"
        fullBleed
        className="!pb-8 !pt-[calc(7rem+var(--site-banner-height,0px))] md:!pb-10 md:!pt-[calc(9.5rem+var(--site-banner-height,0px))]"
      >
        <FullBleed className="flex flex-col gap-12 md:gap-16 lg:gap-20">
          <div className="mx-auto w-full max-w-3xl">
            <JitterText
              as="h1"
              text={hero.headline}
              className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-ink md:text-5xl lg:text-[2.75rem]"
            />
            <Reveal variant="fadeUp" delay={0.05}>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-mid lg:text-base">
                {hero.subhead}
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.1}>
              <p className="mt-4 text-sm text-ink-faint">{eyebrowLine}</p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button href={hero.ctaHref} size="lg" showChevron>
                    {hero.cta}
                  </Button>
                </Magnetic>
                <Button href={hero.secondaryHref} size="lg" variant="outline-light">
                  {hero.secondaryCta}
                </Button>
              </div>
            </Reveal>
          </div>

          <HeroDashboardMock className="mx-auto h-[440px] w-full max-w-5xl md:h-[540px] lg:h-[620px] lg:max-w-6xl" />

          <HeroStats />
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
