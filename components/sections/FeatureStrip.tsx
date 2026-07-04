import { CursorZone } from "@/components/interaction/CursorZone";
import { SectionCursor } from "@/components/interaction/SectionCursor";
import { TiltCard } from "@/components/interaction/TiltCard";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { globalTrust } from "@/lib/content/homepage";

export function FeatureStrip() {
  return (
    <SectionCursor>
      <Section
        id="developers"
        background="surface"
        fullBleed
        className="overflow-hidden !py-40 md:!py-56 lg:!py-64"
      >
        <div
          className="feature-strip-grid pointer-events-none absolute inset-x-0 -top-40 -bottom-40 md:-top-56 md:-bottom-56 lg:-top-64 lg:-bottom-64"
          aria-hidden
        />

        <FullBleed className="relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-xs font-medium tracking-wide text-primary uppercase">
              {globalTrust.eyebrow}
            </p>
            <h2 className="mt-3 font-sans text-2xl font-medium tracking-tight text-ink md:text-4xl">
              {globalTrust.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <RevealStagger className="mt-20 flex flex-wrap justify-center gap-6 md:mt-24 md:gap-10">
            {globalTrust.items.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem key={item.label} variant="scaleIn">
                  <CursorZone variant="explore">
                    <TiltCard maxTilt={3}>
                      <div className="flex items-center gap-2.5 rounded-xl border border-rule bg-surface px-3 py-2 shadow-soft">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                          <Icon size={15} strokeWidth={1.5} />
                        </div>
                        <span className="font-sans text-xs font-medium leading-tight tracking-tight text-ink md:text-sm">
                          {item.label}
                        </span>
                      </div>
                    </TiltCard>
                  </CursorZone>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
