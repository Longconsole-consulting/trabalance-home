"use client";

import type { HeroDashboardTab } from "@/lib/content/homepage";
import { PanelSection } from "./ui/PanelSection";

type RosterTab = Extract<HeroDashboardTab, { layout: "roster" }>;

interface RosterPanelProps {
  tab: RosterTab;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RosterPanel({ tab, selectedId, onSelect }: RosterPanelProps) {
  return (
    <div>
      <PanelSection>
        <div className="rounded-md border border-rule bg-primary-soft px-3 py-2.5 lg:px-4 lg:py-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-ink lg:text-sm">{tab.payrollCard.title}</p>
              <p className="mt-0.5 text-[10px] text-ink-mid lg:text-xs">{tab.payrollCard.detail}</p>
            </div>
            <span className="shrink-0 bg-emerald/10 px-2 py-0.5 text-[9px] font-medium text-emerald lg:text-[10px]">
              {tab.payrollCard.badge}
            </span>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Team roster" className="border-t border-rule">
        <div className="overflow-hidden rounded-md border border-rule">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-rule bg-surface-2">
                <th className="px-2.5 py-2 text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                  Name
                </th>
                <th className="px-2.5 py-2 text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                  Role
                </th>
                <th className="hidden px-2.5 py-2 text-right text-[9px] font-medium text-ink-faint sm:table-cell lg:px-3 lg:text-[10px]">
                  Rate
                </th>
                <th className="px-2.5 py-2 text-right text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                  Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {tab.rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer transition-colors ${
                    index % 2 === 1 ? "bg-surface-2/50" : "bg-surface"
                  } ${selectedId === row.id ? "bg-primary-soft" : "hover:bg-surface-2"}`}
                  onClick={() => onSelect(row.id)}
                >
                  <td className="px-2.5 py-2 lg:px-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-semibold text-primary">
                        {row.name.charAt(0)}
                      </div>
                      <span className="text-[10px] font-medium text-ink lg:text-[11px]">
                        {row.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2.5 py-2 text-[10px] text-ink-mid lg:px-3 lg:text-[11px]">
                    {row.role}
                  </td>
                  <td className="hidden px-2.5 py-2 text-right text-[10px] text-ink-faint sm:table-cell lg:px-3 lg:text-[11px]">
                    {row.rate}
                  </td>
                  <td className="px-2.5 py-2 text-right text-[10px] font-medium text-ink lg:px-3 lg:text-[11px]">
                    {row.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelSection>
    </div>
  );
}
