"use client";

import { motion } from "framer-motion";
import { useCursorSpring } from "./CursorProvider";

const variantConfig = {
  default: { size: 0, label: "", shape: "circle" as const, showDot: true },
  explore: { size: 56, label: "Explore", shape: "circle" as const, showDot: true },
  play: { size: 56, label: "Play", shape: "circle" as const, showDot: true },
  drag: { size: 64, label: "Scroll", shape: "pill" as const, showDot: true },
  view: { size: 48, label: "View", shape: "square" as const, showDot: true },
  ask: { size: 48, label: "Ask", shape: "circle" as const, showDot: true },
  click: { size: 52, label: "Click", shape: "circle" as const, showDot: true },
  cta: { size: 8, label: "", shape: "circle" as const, showDot: false },
};

export function CustomCursor() {
  const { x, y, variant } = useCursorSpring();
  const config = variantConfig[variant];
  const isDotOnly = variant === "default";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {!isDotOnly && (
        <motion.div
          className="absolute top-0 left-0"
          style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.div
            animate={{
              width: config.size,
              height: variant === "drag" ? 32 : config.size,
              borderRadius:
                config.shape === "circle"
                  ? "50%"
                  : config.shape === "pill"
                    ? "9999px"
                    : "8px",
              backgroundColor:
                variant === "cta" ? "var(--c-primary)" : "transparent",
              borderWidth: variant === "cta" ? 0 : 1.5,
              opacity: config.size > 0 ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="flex items-center justify-center border-primary/40"
          >
            {config.label && variant !== "cta" && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-medium tracking-wide text-primary uppercase"
              >
                {config.label}
              </motion.span>
            )}
            {variant === "play" && (
              <svg
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="var(--c-primary)"
                className="ml-0.5"
              >
                <path d="M0 0L10 6L0 12V0Z" />
              </svg>
            )}
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className={`absolute top-0 left-0 rounded-full bg-primary ${
          isDotOnly ? "h-2 w-2" : "h-1 w-1"
        }`}
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </div>
  );
}
