"use client";

import { dismissAnnouncement } from "@/app/actions/announcement";
import { announcement } from "@/lib/content/homepage";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function AnnouncementDismissButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleDismiss = () => {
    startTransition(async () => {
      try {
        localStorage.setItem(announcement.storageKey, "1");
      } catch {
        // localStorage unavailable
      }
      await dismissAnnouncement();
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleDismiss}
      disabled={pending}
      className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50 md:right-4"
      aria-label="Dismiss announcement"
    >
      <X size={16} strokeWidth={1.5} />
    </button>
  );
}
