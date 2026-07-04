"use client";

import { fourPillars } from "@/lib/content/homepage";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId } from "react";

type Pillar = (typeof fourPillars.pillars)[number];

interface PillarDetailModalProps {
  pillar: Pillar | null;
  onClose: () => void;
}

export function PillarDetailModal({ pillar, onClose }: PillarDetailModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!pillar) return;

    const scrollY = window.scrollY;
    const { style: bodyStyle } = document.body;
    const { style: htmlStyle } = document.documentElement;
    const previous = {
      bodyOverflow: bodyStyle.overflow,
      bodyPosition: bodyStyle.position,
      bodyTop: bodyStyle.top,
      bodyWidth: bodyStyle.width,
      htmlOverflow: htmlStyle.overflow,
    };

    bodyStyle.overflow = "hidden";
    htmlStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      bodyStyle.overflow = previous.bodyOverflow;
      bodyStyle.position = previous.bodyPosition;
      bodyStyle.top = previous.bodyTop;
      bodyStyle.width = previous.bodyWidth;
      htmlStyle.overflow = previous.htmlOverflow;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pillar, onClose]);

  return (
    <AnimatePresence>
      {pillar ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close dialog"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex w-full max-h-[min(90vh,880px)] max-w-3xl flex-col overflow-hidden border border-rule bg-surface lg:max-w-4xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center border border-rule bg-surface text-ink-faint transition-colors hover:text-ink"
              aria-label="Close"
            >
              <X size={16} strokeWidth={2} />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
              <div className="px-8 py-8 lg:px-10 lg:py-10">
                <p className="text-sm font-medium tracking-wide text-primary uppercase">
                  {pillar.number}
                </p>
                <h3
                  id={titleId}
                  className="mt-2 font-display text-3xl font-medium tracking-tight text-ink lg:text-4xl"
                >
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[15px] font-medium text-primary">
                  {pillar.tagline}
                </p>

                <p className="mt-5 text-[15px] leading-relaxed text-ink-mid">
                  {pillar.detail.intro}
                </p>

                <div className="mt-8 space-y-0">
                  {pillar.detail.sections.map((section) => (
                    <div
                      key={section.title}
                      className="border-t border-rule py-6 first:border-t-0 first:pt-0"
                    >
                      <h4 className="font-display text-lg font-medium text-ink">
                        {section.title}
                      </h4>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-mid">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>

                <figure className="mt-8 border-l-4 border-primary pl-6">
                  <blockquote className="font-display text-lg leading-snug font-medium text-ink md:text-xl">
                    &ldquo;{pillar.detail.quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4">
                    <p className="font-medium text-ink">
                      {pillar.detail.quote.author}
                    </p>
                    <p className="text-[15px] text-ink-faint">
                      {pillar.detail.quote.role}
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
