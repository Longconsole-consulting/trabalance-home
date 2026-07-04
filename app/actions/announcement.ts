"use server";

import { announcement } from "@/lib/content/homepage";
import { cookies } from "next/headers";

export async function dismissAnnouncement() {
  const cookieStore = await cookies();
  cookieStore.set(announcement.storageKey, "1", {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}

export async function isAnnouncementDismissed() {
  const cookieStore = await cookies();
  return cookieStore.get(announcement.storageKey)?.value === "1";
}
