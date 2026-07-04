import { SectionCursor } from "@/components/interaction/SectionCursor";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { whyTrabalance } from "@/lib/content/homepage";
import Image from "next/image";

const items = whyTrabalance.items;

function WhyCard({
  number,
  title,
  description,
  tall,
  tinted,
  image,
}: {
  number: string;
  title: string;
  description: string;
  tall: boolean;
  tinted: boolean;
  image?: { src: string; alt: string };
}) {
  if (image) {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-rule/60 bg-surface">
        <div className="relative min-h-[200px] flex-1">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </div>
        <div className="p-6 lg:p-8">
          <span className="font-display text-sm font-medium text-primary">{number}</span>
          <h3 className="mt-4 font-display text-xl font-medium leading-snug text-ink lg:text-2xl">
            {title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-mid">{description}</p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`flex h-full flex-col rounded-2xl border border-rule/60 p-6 lg:p-8 ${
        tinted ? "bg-primary-soft" : "bg-surface"
      }`}
    >
      <span className="font-display text-sm font-medium text-primary">{number}</span>
      <div className={tall ? "mt-auto" : "mt-4"}>
        <h3 className="font-display text-xl font-medium leading-snug text-ink lg:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-mid">{description}</p>
      </div>
    </article>
  );
}

export function WhyTrabalance() {
  return (
    <SectionCursor>
      <Section background="cream" mesh fullBleed>
        <FullBleed>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              {whyTrabalance.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
              {whyTrabalance.headline}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-mid lg:text-lg">
              {whyTrabalance.subhead}
            </p>
          </Reveal>

          <RevealStagger className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:grid-rows-2 md:gap-5 md:min-h-[520px] lg:max-w-4xl lg:gap-6">
            <RevealItem variant="fadeUp" className="min-h-[220px] md:col-start-1 md:row-start-1">
              <WhyCard {...items[0]} number="01" tall={false} tinted={false} />
            </RevealItem>

            <RevealItem variant="fadeUp" className="min-h-[220px] md:col-start-1 md:row-start-2">
              <WhyCard {...items[1]} number="02" tall={false} tinted={false} />
            </RevealItem>

            <RevealItem
              variant="fadeUp"
              className="min-h-[320px] md:col-start-2 md:row-span-2 md:row-start-1"
            >
              <WhyCard
                {...items[2]}
                number="03"
                tall={false}
                tinted={false}
                image={items[2].image}
              />
            </RevealItem>
          </RevealStagger>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
