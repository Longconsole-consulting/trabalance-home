import { announcement } from "@/lib/content/homepage";
import { AnnouncementDismissButton } from "@/components/layout/AnnouncementDismissButton";
import Link from "next/link";

export function AnnouncementBanner() {
  return (
    <div
      data-announcement-bar
      className="relative flex h-10 w-full items-center justify-center bg-ink px-12 text-center text-[13px] text-white/90 md:text-sm"
    >
      <p className="truncate md:whitespace-normal">
        {announcement.message}{" "}
        <Link
          href={announcement.href}
          className="font-medium text-white underline underline-offset-2 transition-colors hover:text-primary-line"
        >
          {announcement.cta}
        </Link>
      </p>

      <AnnouncementDismissButton />
    </div>
  );
}
