"use client";

import type { HeroDashboardTab } from "@/lib/content/homepage";
import { DocumentTablePanel } from "./DocumentTablePanel";
import { InventoryPanel } from "./InventoryPanel";
import { JobBoardPanel } from "./JobBoardPanel";
import { LedgerPanel } from "./LedgerPanel";
import { PulseOverviewPanel } from "./PulseOverviewPanel";
import { RosterPanel } from "./RosterPanel";

interface DashboardPanelRouterProps {
  tab: HeroDashboardTab;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function DashboardPanelRouter({ tab, selectedId, onSelect }: DashboardPanelRouterProps) {
  switch (tab.layout) {
    case "overview":
      return <PulseOverviewPanel tab={tab} selectedId={selectedId} onSelect={onSelect} />;
    case "documentTable":
      return <DocumentTablePanel tab={tab} selectedId={selectedId} onSelect={onSelect} />;
    case "inventory":
      return <InventoryPanel tab={tab} selectedId={selectedId} onSelect={onSelect} />;
    case "roster":
      return <RosterPanel tab={tab} selectedId={selectedId} onSelect={onSelect} />;
    case "ledger":
      return <LedgerPanel tab={tab} selectedId={selectedId} onSelect={onSelect} />;
    case "jobBoard":
      return <JobBoardPanel tab={tab} selectedId={selectedId} onSelect={onSelect} />;
    default:
      return null;
  }
}
