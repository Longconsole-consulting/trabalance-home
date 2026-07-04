"use client";

import type { HeroDashboardTab } from "@/lib/content/homepage";
import { motion, useReducedMotion } from "framer-motion";
import { PanelSection } from "./ui/PanelSection";

type JobBoardTab = Extract<HeroDashboardTab, { layout: "jobBoard" }>;

interface JobBoardPanelProps {
  tab: JobBoardTab;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function JobBoardPanel({ tab, selectedId, onSelect }: JobBoardPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PanelSection title="Active jobs">
      <div className="grid gap-2 sm:grid-cols-2">
        {tab.jobs.map((job) => (
          <button
            key={job.id}
            type="button"
            onClick={() => onSelect(job.id)}
            className={`rounded-md border border-rule p-2.5 text-left transition-colors lg:p-3 ${
              selectedId === job.id
                ? "border-primary bg-primary-soft"
                : "bg-surface-2 hover:border-primary-line hover:bg-surface"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-semibold text-ink lg:text-xs">{job.name}</p>
              <span className="shrink-0 bg-emerald/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald">
                {job.margin} margin
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-ink-faint lg:text-[11px]">{job.client}</p>
            <p className="mt-1.5 text-[10px] font-medium text-ink-mid lg:text-[11px]">
              Budget {job.budget}
            </p>
            <div className="mt-2 h-1.5 bg-surface-3">
              <motion.div
                className="h-full bg-primary"
                initial={prefersReducedMotion ? false : { width: 0 }}
                animate={{ width: `${job.progress}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="mt-1 text-[9px] text-ink-faint lg:text-[10px]">{job.progress}% complete</p>
          </button>
        ))}
      </div>
    </PanelSection>
  );
}
