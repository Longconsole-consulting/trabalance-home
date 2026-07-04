"use client";

import { useCursor } from "@/components/interaction/CursorProvider";
import { motion } from "framer-motion";
import { useState } from "react";

interface MediaSlotProps {
  src?: string;
  poster?: string;
  label: string;
  className?: string;
  aspectRatio?: "video" | "square" | "wide" | "fill";
  interactive?: boolean;
}

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  fill: "h-full w-full",
};

export function MediaSlot({
  src,
  poster,
  label,
  className = "",
  aspectRatio = "video",
  interactive = false,
}: MediaSlotProps) {
  const [videoError, setVideoError] = useState(false);
  const [muted, setMuted] = useState(true);
  const { setHoverVariant, enabled } = useCursor();
  const showVideo = src && !videoError;
  const fillsContainer = aspectRatio === "fill";
  const mediaClass = fillsContainer
    ? "absolute inset-0 h-full w-full object-cover"
    : "h-full w-full object-cover";

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl shadow-soft-lg ${aspectClasses[aspectRatio]} ${className}`}
      whileHover={interactive ? { scale: 1.03 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => interactive && enabled && setHoverVariant("play")}
      onMouseLeave={() => setHoverVariant(null)}
      onClick={() => interactive && setMuted((current) => !current)}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? (muted ? "Unmute video" : "Mute video") : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setMuted((current) => !current);
        }
      }}
    >
      {showVideo ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted={muted}
          loop
          playsInline
          onError={() => setVideoError(true)}
          className={mediaClass}
          aria-label={label}
        />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={label} className={mediaClass} />
      ) : (
        <PlaceholderPoster label={label} fillsContainer={fillsContainer} />
      )}
      {interactive && muted && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-soft transition-opacity group-hover:opacity-100">
            <svg width="16" height="18" viewBox="0 0 10 12" fill="var(--c-primary)">
              <path d="M0 0L10 6L0 12V0Z" />
            </svg>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-ink/5" />
    </motion.div>
  );
}

function PlaceholderPoster({
  label,
  fillsContainer,
}: {
  label: string;
  fillsContainer: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-surface-2 via-surface to-surface-3 p-8 ${
        fillsContainer ? "absolute inset-0 h-full w-full" : "h-full w-full"
      }`}
    >
      <div className="mb-4 h-3/5 w-4/5 rounded-lg bg-white/80 shadow-soft">
        <div className="flex h-8 items-center gap-2 border-b border-ink/5 px-3">
          <div className="h-2 w-2 rounded-full bg-primary/40" />
          <div className="h-2 w-2 rounded-full bg-primary/20" />
          <div className="h-2 w-2 rounded-full bg-primary/10" />
        </div>
        <div className="space-y-2 p-4">
          <div className="h-2 w-3/4 rounded bg-ink/10" />
          <div className="h-2 w-1/2 rounded bg-ink/5" />
          <div className="mt-4 h-16 rounded bg-primary/10" />
        </div>
      </div>
      <span className="text-xs font-medium tracking-wide text-ink-faint uppercase">
        {label}
      </span>
    </div>
  );
}
