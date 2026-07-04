"use client";

import { SectionCursor } from "@/components/interaction/SectionCursor";
import { TiltCard } from "@/components/interaction/TiltCard";
import { Button } from "@/components/ui/Button";
import { TrabalanceIcon } from "@/components/ui/TrabalanceIcon";
import { FullBleed } from "@/components/ui/FullBleed";
import { footer } from "@/lib/content/homepage";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <SectionCursor>
      <footer className="relative bg-ink text-white/70">
        <div className="relative isolate overflow-hidden">
          <div className="relative h-[min(48vh,440px)] w-full md:h-[min(52vh,520px)]">
            <Image
              src={footer.image.src}
              alt={footer.image.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-footer-image-fade" aria-hidden />
          </div>

          <FullBleed className="relative -mt-28 pb-24 md:-mt-36 md:pb-32 lg:-mt-44 lg:pb-40">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-md">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 font-display text-5xl font-medium tracking-tight text-white md:text-6xl"
                >
                  <TrabalanceIcon size={56} className="h-12 w-12 rounded-xl md:h-14 md:w-14" />
                  Trabalance
                </Link>
                <p className="mt-6 text-[17px] leading-relaxed text-white/60">
                  {footer.tagline}
                </p>
                <div className="mt-8 space-y-1 text-[15px]">
                  <a
                    href={`mailto:${footer.email}`}
                    className="text-primary-line hover:text-white"
                  >
                    {footer.email}
                  </a>
                </div>
              </div>

              <div className="w-full max-w-md">
                <p className="text-sm font-medium text-white">
                  {footer.newsletter.headline}
                </p>
                <form
                  className="mt-4 flex gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footer.newsletter.placeholder}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-primary"
                  />
                  <Button
                    as="button"
                    type="submit"
                    size="sm"
                    shape="rounded"
                    variant="primary"
                  >
                    {footer.newsletter.cta}
                  </Button>
                </form>
              </div>
            </div>

            <div className="mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-medium text-white">{column.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <TiltCard maxTilt={2}>
                          <Link
                            href={link.href}
                            className="group inline-block text-[15px] text-white/60 transition-colors hover:text-primary-line"
                          >
                            <span className="relative">
                              {link.label}
                              <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                            </span>
                          </Link>
                        </TiltCard>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-20 w-full overflow-hidden py-4 md:py-8">
              <p
                className="mx-auto max-w-full px-1 text-center font-display text-[clamp(0.8125rem,2.55vw,5.5rem)] font-medium leading-none tracking-[-0.04em] text-white/[0.08] md:tracking-[-0.05em]"
                aria-hidden
              >
                {footer.brandStrip.join(" · ")}
              </p>
            </div>

            <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/40">
                © 2026 {footer.company}. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {footer.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[15px] text-white/50 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                {footer.legal.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </FullBleed>
        </div>
      </footer>
    </SectionCursor>
  );
}
