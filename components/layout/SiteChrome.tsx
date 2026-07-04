import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { Header } from "@/components/layout/Header";
import { SupportFab } from "@/components/layout/SupportFab";
import { isAnnouncementDismissed } from "@/app/actions/announcement";
import { type ReactNode } from "react";

export async function SiteChrome({ children }: { children: ReactNode }) {
  const dismissed = await isAnnouncementDismissed();

  return (
    <>
      {!dismissed && (
        <div className="fixed top-0 right-0 left-0 z-[60]">
          <AnnouncementBanner />
        </div>
      )}
      <Header />
      {children}
      <SupportFab />
    </>
  );
}
