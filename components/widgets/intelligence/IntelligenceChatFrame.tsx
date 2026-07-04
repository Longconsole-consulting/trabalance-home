"use client";

import { TrabalanceIcon } from "@/components/ui/TrabalanceIcon";
import { intelligence } from "@/lib/content/homepage";
import { type ReactNode } from "react";

interface IntelligenceChatFrameProps {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function IntelligenceChatFrame({
  children,
  footer,
  className = "",
}: IntelligenceChatFrameProps) {
  return (
    <div className={`mx-auto w-full max-w-[380px] sm:max-w-[400px] ${className}`}>
      <div className="rounded-[2.75rem] border border-ink/10 bg-ink/5 p-2 shadow-soft-lg">
        <div className="flex flex-col overflow-hidden rounded-[2.25rem] border border-rule bg-surface-2">
          <div className="relative shrink-0 bg-ink px-5 pb-4 pt-5">
            <div className="mb-3 flex items-center justify-center gap-1.5">
              <span className="h-1 w-8 rounded-full bg-white/15" />
            </div>
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <TrabalanceIcon size={36} className="h-full w-full" />
                <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-ink bg-emerald" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-white">{intelligence.chat.title}</p>
                <p className="mt-0.5 text-sm text-white/60">{intelligence.chat.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[420px] flex-1 flex-col bg-surface-2">{children}</div>

          {footer ? (
            <div className="shrink-0 border-t border-rule bg-surface px-4 py-3">{footer}</div>
          ) : (
            <div className="flex justify-center pb-2 pt-1">
              <span className="h-1 w-24 rounded-full bg-ink/15" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
