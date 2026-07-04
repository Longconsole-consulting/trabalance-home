"use client";

import { SectionCursor } from "@/components/interaction/SectionCursor";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { testimonials, testimonialsSection } from "@/lib/content/homepage";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({ author, role, quote, avatar, brandIcon }: Testimonial) {
  return (
    <figure className="flex w-[min(88vw,22rem)] shrink-0 flex-col rounded-2xl border border-rule bg-surface p-6 sm:w-[20rem] lg:w-[22rem] lg:p-7">
      <figcaption className="mb-4 flex items-start gap-3">
        <Image
          src={avatar}
          alt={`${author} avatar`}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-ink">{author}</p>
          <p className="mt-0.5 text-sm text-ink-faint">{role}</p>
        </div>
        <Image
          src={brandIcon}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 rounded-lg object-cover"
          aria-hidden
        />
      </figcaption>
      <blockquote className="text-[15px] leading-relaxed text-ink-mid">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </figure>
  );
}

function MarqueeRow({
  order,
  direction,
}: {
  order: number[];
  direction: "left" | "right";
}) {
  const items = order.map((index) => testimonials[index]).filter(Boolean);
  const loop = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`flex w-max gap-5 py-1 ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        }`}
      >
        {loop.map((item, index) => (
          <TestimonialCard key={`${item.author}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionCursor>
      <Section background="surface" fullBleed className="overflow-hidden">
        <FullBleed>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {testimonialsSection.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:text-4xl">
              {testimonialsSection.headline}
            </h2>
          </Reveal>

          <div className="mt-16 space-y-5 md:mt-20 md:space-y-6">
            {prefersReducedMotion ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((item) => (
                  <TestimonialCard key={item.author} {...item} />
                ))}
              </div>
            ) : (
              testimonialsSection.rows.map((row, index) => (
                <div
                  key={`${row.direction}-${index}`}
                  className={index % 2 === 1 ? "md:-translate-x-6 lg:-translate-x-10" : ""}
                >
                  <MarqueeRow
                    order={[...row.order]}
                    direction={row.direction}
                  />
                </div>
              ))
            )}
          </div>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
