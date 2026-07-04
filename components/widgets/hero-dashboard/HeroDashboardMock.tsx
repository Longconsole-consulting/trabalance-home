"use client";

import { CursorZone } from "@/components/interaction/CursorZone";
import { DashboardPanelRouter } from "@/components/widgets/hero-dashboard/panels/DashboardPanelRouter";
import { WindowTitleBar } from "@/components/widgets/hero-dashboard/WindowTitleBar";
import {
  heroDashboard,
  type HeroDashboardTabId,
} from "@/lib/content/homepage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HelpCircle, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const TAB_ORDER = heroDashboard.tabs.map((tab) => tab.id);

function navIdForTab(tabId: HeroDashboardTabId) {
  return heroDashboard.sidebar.find((item) => item.tabId === tabId)?.id ?? "dashboard";
}

export function HeroDashboardMock({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<HeroDashboardTabId>("pulse");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const pauseUntilRef = useRef(0);

  const currentTab =
    heroDashboard.tabs.find((tab) => tab.id === activeTab) ?? heroDashboard.tabs[0];

  const pauseAutoAdvance = useCallback(() => {
    pauseUntilRef.current = Date.now() + heroDashboard.pauseAfterInteractionMs;
  }, []);

  const selectTab = useCallback(
    (tabId: HeroDashboardTabId, navId?: string) => {
      setActiveTab(tabId);
      setActiveNav(navId ?? navIdForTab(tabId));
      setSelectedId(null);
      pauseAutoAdvance();
    },
    [pauseAutoAdvance],
  );

  const handleNavSelect = (navId: string, tabId: HeroDashboardTabId) => {
    selectTab(tabId, navId);
  };

  const advanceToNextTab = useCallback(() => {
    setActiveTab((current) => {
      const index = TAB_ORDER.indexOf(current);
      const next = TAB_ORDER[(index + 1) % TAB_ORDER.length];
      setActiveNav(navIdForTab(next));
      setSelectedId(null);
      return next;
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      advanceToNextTab();
    }, heroDashboard.autoAdvanceMs);

    return () => clearInterval(interval);
  }, [advanceToNextTab, prefersReducedMotion]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    pauseAutoAdvance();
  };

  return (
    <CursorZone
      variant="explore"
      className={`flex h-full w-full flex-col overflow-hidden ${className}`}
    >
      <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-dot-grid p-3 lg:p-4">
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl bg-surface shadow-soft-lg">
          <WindowTitleBar title={heroDashboard.windowTitle} />

          <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="flex h-full w-11 shrink-0 flex-col overflow-hidden border-r border-rule bg-surface-2 py-2 lg:w-12">
            <div className="mb-2 flex justify-center px-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white lg:h-8 lg:w-8">
                T
              </div>
            </div>
            <nav className="flex flex-1 flex-col gap-0.5 px-1" aria-label="App navigation">
              {heroDashboard.sidebar.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavSelect(item.id, item.tabId)}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    title={item.label}
                    className={`flex h-9 w-full items-center justify-center transition-colors lg:h-10 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-ink-faint hover:bg-surface-3 hover:text-ink-mid"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {/* Top bar */}
            <div className="flex shrink-0 items-center gap-2 border-b border-rule px-3 py-2 lg:px-4">
              <label className="relative min-w-0 flex-1">
                <Search
                  size={14}
                  className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-ink-fainter"
                  aria-hidden
                />
                <input
                  type="search"
                  placeholder={heroDashboard.topBar.searchPlaceholder}
                  onFocus={() => {
                    setSearchFocused(true);
                    pauseAutoAdvance();
                  }}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full rounded-md border bg-surface-2 py-1.5 pr-3 pl-8 text-[11px] text-ink outline-none transition-colors lg:text-xs ${
                    searchFocused
                      ? "border-primary bg-surface"
                      : "border-rule hover:border-primary-line"
                  }`}
                />
              </label>
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={helpOpen}
                  aria-label={heroDashboard.topBar.helpLabel}
                  onClick={() => {
                    setHelpOpen((open) => !open);
                    pauseAutoAdvance();
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-rule bg-surface-2 text-ink-faint transition-colors hover:border-primary-line hover:text-primary"
                >
                  <HelpCircle size={15} strokeWidth={1.5} />
                </button>
                <AnimatePresence>
                  {helpOpen && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                      className="absolute top-full right-0 z-20 mt-1 w-44 rounded-md border border-rule bg-surface p-2.5 shadow-soft-lg"
                    >
                      <p className="text-[10px] leading-snug text-ink-mid lg:text-[11px]">
                        Click the sidebar to explore each module, or let the demo cycle through.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-rule px-3 py-2.5 lg:px-4 lg:py-3">
              <div>
                <p className="text-sm font-semibold text-ink lg:text-base">
                  {heroDashboard.user.greeting}, {heroDashboard.user.name}
                </p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  {currentTab.label} · {currentTab.subtitle}
                </p>
              </div>
              <span className="shrink-0 bg-emerald/10 px-2 py-0.5 text-[10px] font-medium text-emerald lg:text-xs">
                Live
              </span>
            </div>

            {/* Panel area — fixed slot; content scrolls inside */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 overflow-y-auto overflow-x-hidden"
                >
                  <DashboardPanelRouter
                    tab={currentTab}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Status bar */}
            <div className="shrink-0 border-t border-rule bg-primary-soft px-3 py-2 lg:px-4 lg:py-2.5">
              <p className="text-[10px] font-medium text-primary lg:text-xs">
                {currentTab.healthBanner.title} — {currentTab.healthBanner.subtitle}
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </CursorZone>
  );
}
