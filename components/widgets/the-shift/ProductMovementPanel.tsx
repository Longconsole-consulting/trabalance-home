"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { theShift } from "@/lib/content/homepage";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const panelEase = [0.16, 1, 0.3, 1] as const;
const { productMovement: data } = theShift;

type TabId = (typeof data.tabs)[number];

function kpiStyles(accent: (typeof data.kpis)[number]["accent"]) {
  switch (accent) {
    case "violet":
      return {
        card: "border-violet/20 bg-violet/5 hover:border-violet/30",
        label: "text-violet",
        value: "text-violet",
      };
    case "primary":
      return {
        card: "border-primary/20 bg-primary-soft hover:border-primary/30",
        label: "text-primary",
        value: "text-primary",
      };
    default:
      return {
        card: "border-rule bg-surface hover:border-primary/30",
        label: "text-ink-faint",
        value: "text-ink",
      };
  }
}

interface ProductMovementPanelProps {
  animate?: boolean;
}

export function ProductMovementPanel({ animate = true }: ProductMovementPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>(data.defaultTab);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  return (
    <div className="flex h-full min-h-[400px] flex-col pt-2.5">
      <motion.div
        initial={animate ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: panelEase }}
      >
        <h3 className="font-display text-lg leading-snug font-medium tracking-tight text-ink md:text-xl">
          {data.product.name}
        </h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-faint">
          <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-mid">
            {data.product.sku}
          </span>
          <span>{data.product.category}</span>
        </div>
      </motion.div>

      <motion.div
        className="mt-4 flex gap-4 border-b border-rule"
        initial={animate ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: animate ? 0.04 : 0, ease: panelEase }}
      >
        {data.tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 text-xs font-medium transition-colors md:text-sm ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-ink-faint hover:text-ink-mid"
            }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="mt-4 grid grid-cols-3 gap-2"
        initial={animate ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: animate ? 0.08 : 0, ease: panelEase }}
      >
        {data.kpis.map((kpi) => {
          const styles = kpiStyles(kpi.accent);
          return (
            <div
              key={kpi.id}
              className={`rounded-lg border px-2.5 py-2.5 transition-colors md:px-3 md:py-3 ${styles.card}`}
            >
              <p
                className={`text-[9px] font-medium tracking-wide uppercase md:text-[10px] ${styles.label}`}
              >
                {kpi.label}
              </p>
              <p className={`mt-0.5 font-display text-base font-medium md:text-lg ${styles.value}`}>
                <AnimatedCounter
                  value={kpi.value}
                  display={kpi.display}
                  isText={!animate}
                  className={styles.value}
                />
              </p>
            </div>
          );
        })}
      </motion.div>

      <div className="mt-4 min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={animate ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={animate ? { opacity: 0, y: -6 } : undefined}
            transition={{ duration: 0.28, ease: panelEase }}
            className="h-full"
          >
            {activeTab === "Movement" && (
              <div className="overflow-hidden rounded-lg border border-rule">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-rule bg-surface-2">
                      {["Date", "Doc no", "Type", "In", "Out", "Balance"].map((col) => (
                        <th
                          key={col}
                          className={`px-2 py-2 text-[9px] font-medium tracking-wide text-ink-faint uppercase md:px-2.5 md:text-[10px] ${
                            ["In", "Out", "Balance"].includes(col) ? "text-right" : ""
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.movementRows.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={animate ? { opacity: 0, y: 6 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: animate ? 0.12 + index * 0.04 : 0,
                          ease: panelEase,
                        }}
                        className={`cursor-pointer border-b border-rule transition-colors last:border-b-0 ${
                          index % 2 === 1 ? "bg-surface-2/40" : "bg-surface"
                        } ${selectedRowId === row.id ? "bg-primary-soft" : "hover:bg-surface-2"}`}
                        onClick={() =>
                          setSelectedRowId((current) =>
                            current === row.id ? null : row.id
                          )
                        }
                      >
                        <td className="px-2 py-2 text-[10px] text-ink-mid md:px-2.5 md:text-[11px]">
                          {row.date}
                        </td>
                        <td className="px-2 py-2 md:px-2.5">
                          <span className="cursor-pointer font-mono text-[10px] text-primary hover:underline md:text-[11px]">
                            {row.docNo}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-[10px] text-ink-mid md:px-2.5 md:text-[11px]">
                          {row.type}
                        </td>
                        <td className="px-2 py-2 text-right text-[10px] font-medium text-emerald md:px-2.5 md:text-[11px]">
                          {row.in ?? "—"}
                        </td>
                        <td className="px-2 py-2 text-right text-[10px] font-medium text-red-500 md:px-2.5 md:text-[11px]">
                          {row.out ?? "—"}
                        </td>
                        <td className="px-2 py-2 text-right text-[10px] font-semibold text-ink md:px-2.5 md:text-[11px]">
                          {row.balance}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Overview" && (
              <ul className="space-y-3 rounded-lg border border-rule bg-surface-2/30 p-4">
                {data.overviewLines.map((line, index) => (
                  <motion.li
                    key={line}
                    initial={animate ? { opacity: 0, y: 6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: animate ? 0.12 + index * 0.04 : 0,
                      ease: panelEase,
                    }}
                    className="flex gap-2.5 text-[12px] leading-relaxed text-ink-mid md:text-[13px]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {line}
                  </motion.li>
                ))}
              </ul>
            )}

            {activeTab === "Adjustments" && (
              <div className="overflow-hidden rounded-lg border border-rule">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-rule bg-surface-2">
                      {["Date", "Reason", "Qty"].map((col) => (
                        <th
                          key={col}
                          className={`px-2.5 py-2 text-[9px] font-medium tracking-wide text-ink-faint uppercase md:text-[10px] ${
                            col === "Qty" ? "text-right" : ""
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.adjustmentRows.map((row, index) => (
                      <motion.tr
                        key={row.id}
                        initial={animate ? { opacity: 0, y: 6 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: animate ? 0.12 + index * 0.04 : 0,
                          ease: panelEase,
                        }}
                        className={`border-b border-rule transition-colors last:border-b-0 ${
                          index % 2 === 1 ? "bg-surface-2/40" : "bg-surface"
                        } hover:bg-surface-2`}
                      >
                        <td className="px-2.5 py-2.5 text-[10px] text-ink-mid md:text-[11px]">
                          {row.date}
                        </td>
                        <td className="px-2.5 py-2.5 text-[10px] text-ink-mid md:text-[11px]">
                          {row.reason}
                        </td>
                        <td
                          className={`px-2.5 py-2.5 text-right text-[10px] font-medium md:text-[11px] ${
                            row.qty.startsWith("+") ? "text-emerald" : "text-red-500"
                          }`}
                        >
                          {row.qty}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
