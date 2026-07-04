"use client";

import type { HeroDashboardTab } from "@/lib/content/homepage";
import { PanelSection } from "./ui/PanelSection";

type LedgerTab = Extract<HeroDashboardTab, { layout: "ledger" }>;

interface LedgerPanelProps {
  tab: LedgerTab;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LedgerPanel({ tab, selectedId, onSelect }: LedgerPanelProps) {
  return (
    <PanelSection title="Trial balance">
      <div className="overflow-hidden rounded-md border border-rule">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-rule bg-surface-2">
              <th className="px-2.5 py-2 text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                Code
              </th>
              <th className="px-2.5 py-2 text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                Account
              </th>
              <th className="px-2.5 py-2 text-right text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                Debit
              </th>
              <th className="px-2.5 py-2 text-right text-[9px] font-medium text-ink-faint lg:px-3 lg:text-[10px]">
                Credit
              </th>
            </tr>
          </thead>
          <tbody>
            {tab.accounts.map((account, index) => {
              const rowId = account.code;
              return (
                <tr
                  key={account.code}
                  className={`cursor-pointer transition-colors ${
                    index % 2 === 1 ? "bg-surface-2/50" : "bg-surface"
                  } ${selectedId === rowId ? "bg-primary-soft" : "hover:bg-surface-2"}`}
                  onClick={() => onSelect(rowId)}
                >
                  <td className="px-2.5 py-1.5 font-mono text-[9px] font-medium text-primary lg:px-3 lg:py-2 lg:text-[10px]">
                    {account.code}
                  </td>
                  <td className="px-2.5 py-1.5 text-[10px] text-ink lg:px-3 lg:py-2 lg:text-[11px]">
                    {account.name}
                  </td>
                  <td className="px-2.5 py-1.5 text-right font-mono text-[9px] text-ink-mid lg:px-3 lg:py-2 lg:text-[10px]">
                    {account.debit ?? "—"}
                  </td>
                  <td className="px-2.5 py-1.5 text-right font-mono text-[9px] text-ink-mid lg:px-3 lg:py-2 lg:text-[10px]">
                    {account.credit ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-md border border-emerald/20 bg-emerald/5 px-3 py-2">
        <span className="text-[10px] font-medium text-ink-mid lg:text-xs">{tab.footer.label}</span>
        <span className="text-[10px] font-semibold text-emerald lg:text-xs">
          Balanced · {tab.footer.difference}
        </span>
      </div>
    </PanelSection>
  );
}
