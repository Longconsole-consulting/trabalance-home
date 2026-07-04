import { SectionCursor } from "@/components/interaction/SectionCursor";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { trustedBy } from "@/lib/content/homepage";

export function TrustedBy() {
  const doubled = [...trustedBy.logos, ...trustedBy.logos];

  return (
    <SectionCursor>
      <Section background="transparent" fullBleed className="!py-0">
        <div className="bg-dot-grid-white py-12 md:py-16 lg:py-20">
          <FullBleed>
            <Reveal className="text-center">
              <p className="text-sm font-medium tracking-wide text-ink-faint uppercase">
                {trustedBy.headline}
              </p>
            </Reveal>
          </FullBleed>
        </div>

        <div className="bg-surface-2 pb-12 pt-10 md:pb-16 md:pt-12">
          <FullBleed>
            <div className="relative overflow-hidden">
              <div className="flex w-max animate-marquee items-center gap-16 md:gap-24">
                {doubled.map((logo, i) => (
                  <div
                    key={`${logo.name}-${i}`}
                    className="flex h-14 w-[140px] shrink-0 items-center justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="h-auto max-h-10 w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FullBleed>
        </div>
      </Section>
    </SectionCursor>
  );
}
