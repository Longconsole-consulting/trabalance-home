"use client";

import { UserMessageBubble } from "@/components/widgets/intelligence/UserMessageBubble";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const popEase = [0.34, 1.56, 0.64, 1] as const;

export function ChatBubble({
  role,
  children,
  className = "",
  animate = true,
  delay = 0,
}: ChatBubbleProps) {
  const prefersReducedMotion = useReducedMotion();
  const isUser = role === "user";

  const bubble = isUser ? (
    <UserMessageBubble className={className}>{children}</UserMessageBubble>
  ) : (
    <div
      className={`max-w-[88%] rounded-2xl rounded-bl-md border border-rule bg-surface px-4 py-3 text-[15px] leading-relaxed text-ink shadow-soft ${className}`}
    >
      {children}
    </div>
  );

  if (!animate || prefersReducedMotion) {
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>{bubble}</div>
    );
  }

  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, scale: 0.72, y: 12 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.45,
        ease: popEase,
      }}
    >
      {bubble}
    </motion.div>
  );
}
