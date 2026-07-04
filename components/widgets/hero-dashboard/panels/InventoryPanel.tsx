"use client";

import type { HeroDashboardTab } from "@/lib/content/homepage";
import { PanelSection } from "./ui/PanelSection";

type InventoryTab = Extract<HeroDashboardTab, { layout: "inventory" }>;

interface InventoryPanelProps {
  tab: InventoryTab;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function InventoryPanel({ tab, selectedId, onSelect }: InventoryPanelProps) {
  return (
    <PanelSection title="Stock on hand">
      <div className="overflow-hidden rounded-md border border-rule">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-rule bg-surface-2">
              <th className="px-2.5 py-2 text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                SKU
              </th>
              <th className="px-2.5 py-2 text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                Item
              </th>
              <th className="px-2.5 py-2 text-right text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                Qty
              </th>
              <th className="hidden px-2.5 py-2 text-right text-[9px] font-medium text-ink-faint sm:table-cell lg:px-3 lg:text-[10px]">
                Reorder
              </th>
              <th className="hidden px-2.5 py-2 text-[9px] font-medium text-ink-faint md:table-cell lg:px-3 lg:text-[10px]">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {tab.rows.map((row, index) => {
              const fillPct = Math.min((row.qty / (row.reorder * 3)) * 100, 100);
              return (
                <tr
                  key={row.id}
                  className={`cursor-pointer transition-colors ${
                    index % 2 === 1 ? "bg-surface-2/50" : "bg-surface"
                  } ${row.highlight ? "border-l-2 border-l-primary bg-primary-soft/40" : ""} ${
                    selectedId === row.id ? "bg-primary-soft" : "hover:bg-surface-2"
                  }`}
                  onClick={() => onSelect(row.id)}
                >
                  <td className="px-2.5 py-2 font-mono text-[9px] text-ink-mid lg:px-3 lg:text-[10px]">
                    {row.sku}
                  </td>
                  <td className="px-2.5 py-2 lg:px-3">
                    <p className="text-[10px] font-medium text-ink lg:text-[11px]">{row.name}</p>
                    <div className="mt-1.5 h-1 w-full max-w-[80px] bg-surface-3">
                      <div className="h-full bg-primary" style={{ width: `${fillPct}%` }} />
                    </div>
                  </td>
                  <td className="px-2.5 py-2 text-right text-[10px] font-medium text-ink lg:px-3 lg:text-[11px]">
                    {row.qty}
                  </td>
                  <td className="hidden px-2.5 py-2 text-right text-[10px] text-ink-faint sm:table-cell lg:px-3 lg:text-[11px]">
                    {row.reorder}
                  </td>
                  <td className="hidden px-2.5 py-2 text-[10px] text-ink-faint md:table-cell lg:px-3 lg:text-[11px]">
                    {row.location}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PanelSection>
  );
}
