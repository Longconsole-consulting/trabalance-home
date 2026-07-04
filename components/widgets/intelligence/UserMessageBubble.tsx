"use client";

import { type ReactNode } from "react";

interface UserMessageBubbleProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "large";
}

export function UserMessageBubble({
  children,
  className = "",
  size = "default",
}: UserMessageBubbleProps) {
  const bodyClass =
    size === "large"
      ? "px-6 py-4 text-[15px] font-medium leading-snug lg:px-7 lg:py-5 lg:text-[17px]"
      : "px-4 py-3 text-[15px] leading-relaxed";

  return (
    <span
      className={`group/bubble relative inline-block w-fit max-w-full ${className}`}
    >
      <span
        className={`relative z-[1] block rounded-[1.25rem] rounded-br-[0.35rem] bg-ink text-white shadow-soft-lg transition-colors group-hover/bubble:bg-ink-soft ${bodyClass}`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute bottom-[0.4rem] -right-[0.35rem] z-0 block h-3.5 w-3.5 rotate-45 bg-ink transition-colors group-hover/bubble:bg-ink-soft"
      />
    </span>
  );
}
