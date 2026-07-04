"use client";

import { MessageCircle } from "lucide-react";

export function SupportFab() {
  return (
    <button
      type="button"
      aria-label="Support"
      className="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-rule bg-surface text-ink shadow-soft-lg transition-transform hover:scale-105 hover:bg-off-white active:scale-95"
      onClick={() => {}}
    >
      <MessageCircle size={24} strokeWidth={1.75} />
    </button>
  );
}
