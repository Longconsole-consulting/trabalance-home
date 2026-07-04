"use client";

import { SectionCursor } from "@/components/interaction/SectionCursor";
import { FullBleed } from "@/components/ui/FullBleed";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import {
  IntelligenceLiveChat,
  type IntelligenceLiveChatHandle,
} from "@/components/widgets/intelligence/IntelligenceLiveChat";
import {
  IntelligenceQuestionBoard,
  IntelligenceQuestionBoardMobile,
} from "@/components/widgets/intelligence/IntelligenceQuestionBoard";
import { intelligence } from "@/lib/content/homepage";
import { useCallback, useRef, useState } from "react";

export function IntelligenceLayer() {
  const liveChatRef = useRef<IntelligenceLiveChatHandle>(null);
  const [previewComplete, setPreviewComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setPreviewComplete(true);
  }, []);

  const handleQuestionSelect = useCallback((question: string) => {
    window.requestAnimationFrame(() => {
      liveChatRef.current?.sendMessage(question);
    });
  }, []);

  return (
    <SectionCursor>
      <Section id="intelligence" background="surface" fullBleed>
        <FullBleed>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              {intelligence.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-5xl">
              {intelligence.headline}
            </h2>
            <p className="mt-5 text-[17px] text-ink-mid lg:text-lg">
              {intelligence.subhead}
            </p>
          </Reveal>

          <div className="relative mt-16 overflow-x-clip md:mt-20">
            <div className="flex flex-col items-center">
              <div className="relative mx-auto w-full max-w-5xl overflow-x-clip px-4">
                <IntelligenceQuestionBoard
                  visible={previewComplete}
                  onSelect={handleQuestionSelect}
                />

                <div className="relative mx-auto max-w-[420px]">
                  <IntelligenceLiveChat
                    ref={liveChatRef}
                    onIntroComplete={handleIntroComplete}
                  />
                </div>

                <IntelligenceQuestionBoardMobile
                  visible={previewComplete}
                  onSelect={handleQuestionSelect}
                />
              </div>

              <p className="mt-8 text-center text-sm text-ink-faint">
                {previewComplete
                  ? "Tap a question — or keep the conversation going below."
                  : "Watch the conversation build — then ask your own."}
              </p>
            </div>
          </div>

          <Reveal>
            <p className="mt-4 text-center text-[15px] text-ink-faint">
              {intelligence.disclaimer}
            </p>
          </Reveal>
        </FullBleed>
      </Section>
    </SectionCursor>
  );
}
