"use client";

import type { HeroDashboardTab } from "@/lib/content/homepage";
import { PanelSection } from "./ui/PanelSection";
import { StatusChip } from "./ui/StatusChip";

type DocumentTableTab = Extract<HeroDashboardTab, { layout: "documentTable" }>;

interface DocumentTablePanelProps {
  tab: DocumentTableTab;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DocumentTablePanel({ tab, selectedId, onSelect }: DocumentTablePanelProps) {
  return (
    <PanelSection title={tab.tableTitle}>
      <div className="overflow-hidden rounded-md border border-rule">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-rule bg-surface-2">
              {tab.columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-2.5 py-2 text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px] ${
                    col.align === "right" ? "text-right" : ""
                  }`}
                >
                  {col.label}
                </th>
              ))}
              <th className="px-2.5 py-2 text-right text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                Status
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
                {tab.columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-2.5 py-2 text-[10px] text-ink lg:px-3 lg:text-[11px] ${
                      col.align === "right" ? "text-right font-medium" : ""
                    } ${col.key === "ref" ? "font-mono text-[9px] lg:text-[10px]" : ""}`}
                  >
                    {row.cells[col.key]}
                  </td>
                ))}
                <td className="px-2.5 py-2 text-right lg:px-3">
                  {row.status && <StatusChip variant={row.status} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelSection>
  );
}
