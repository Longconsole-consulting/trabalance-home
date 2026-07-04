"use client";

import type { HeroDashboardTab } from "@/lib/content/homepage";
import { MiniSparkline } from "./ui/MiniSparkline";
import { PanelSection } from "./ui/PanelSection";

type PulseTab = Extract<HeroDashboardTab, { layout: "overview" }>;

interface PulseOverviewPanelProps {
  tab: PulseTab;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function PulseOverviewPanel({ tab, selectedId, onSelect }: PulseOverviewPanelProps) {
  return (
    <div className="min-h-0">
      <PanelSection>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
          {tab.kpis.map((kpi) => (
            <div key={kpi.label} className="border border-rule bg-surface-2 px-2.5 py-2 lg:px-3 lg:py-2.5">
              <p className="text-[9px] font-medium text-ink-faint lg:text-[10px]">{kpi.label}</p>
              <p className="mt-0.5 font-display text-sm font-medium text-ink lg:text-base">
                {kpi.value}
              </p>
              {kpi.change && (
                <p className="mt-0.5 text-[9px] text-emerald lg:text-[10px]">{kpi.change}</p>
              )}
            </div>
          ))}
        </div>
      </PanelSection>

      <PanelSection className="border-t border-rule">
        <MiniSparkline data={tab.sparkline} label={tab.sparklineLabel} />
      </PanelSection>

      <PanelSection title="Live activity" className="border-t border-rule">
        <ul className="space-y-0">
          {tab.feed.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={`flex w-full items-start justify-between gap-3 px-2 py-2 text-left transition-colors lg:px-2.5 lg:py-2.5 ${
                  index < tab.feed.length - 1 ? "border-b border-rule" : ""
                } ${selectedId === item.id ? "bg-primary-soft" : "hover:bg-surface-2"}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-ink lg:text-xs">{item.text}</p>
                  <p className="mt-0.5 text-[9px] text-ink-faint lg:text-[10px]">{item.time}</p>
                </div>
                {item.amount && (
                  <span className="shrink-0 text-[10px] font-medium text-ink-mid lg:text-xs">
                    {item.amount}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </PanelSection>
    </div>
  );
}
