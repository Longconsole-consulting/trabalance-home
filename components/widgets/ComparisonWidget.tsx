"use client";

import { Magnetic } from "@/components/interaction/Magnetic";
import { Button } from "@/components/ui/Button";
import { theShift } from "@/lib/content/homepage";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check, X } from "lucide-react";

interface ComparisonWidgetProps {
  className?: string;
  mode?: "old" | "new";
  onModeChange?: (mode: "old" | "new") => void;
}

export function ComparisonWidget({
  className = "",
  mode: controlledMode,
  onModeChange,
}: ComparisonWidgetProps) {
  const [internalMode, setInternalMode] = useState<"old" | "new">("old");
  const mode = controlledMode ?? internalMode;

  function setMode(next: "old" | "new") {
    if (controlledMode === undefined) {
      setInternalMode(next);
    }
    onModeChange?.(next);
  }

  return (
    <div className={`flex h-full flex-col ${className}`}>
      <div className="mb-8 inline-flex rounded-lg border border-rule bg-surface-2 p-1">
        <button
          type="button"
          onClick={() => setMode("old")}
          className={`rounded-md px-5 py-2.5 text-sm font-medium transition-colors ${
            mode === "old"
              ? "bg-surface text-ink shadow-soft"
              : "text-ink-faint hover:text-ink-mid"
          }`}
        >
          The old way
        </button>
        <button
          type="button"
          onClick={() => setMode("new")}
          className={`rounded-md px-5 py-2.5 text-sm font-medium transition-colors ${
            mode === "new"
              ? "bg-primary text-white shadow-soft"
              : "text-ink-faint hover:text-ink-mid"
          }`}
        >
          With Trabalance
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            className="flex flex-1 flex-col"
            initial={{ opacity: 0, x: mode === "old" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "old" ? 20 : -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide">
              {mode === "old" ? (
                <>
                  <X size={16} className="text-red-400" />
                  <span className="text-ink-faint">{theShift.problem.title}</span>
                </>
              ) : (
                <>
                  <Check size={16} className="text-primary" />
                  <span className="text-primary">{theShift.solution.title}</span>
                </>
              )}
            </h3>
            <ul className="mt-6 space-y-4">
              {(mode === "old"
                ? theShift.problem.points
                : theShift.solution.points
              ).map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[15px] leading-relaxed text-ink-mid md:text-[17px]"
                >
                  <span
                    className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      mode === "old" ? "bg-ink-fainter" : "bg-primary"
                    }`}
                  />
                  {point}
                </li>
              ))}
            </ul>

            {mode === "new" && (
              <div className="mt-auto pt-8">
                <Magnetic>
                  <Button href={theShift.solution.ctaHref} size="lg" showChevron>
                    {theShift.solution.cta}
                  </Button>
                </Magnetic>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
