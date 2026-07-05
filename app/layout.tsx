import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SmoothScrollProvider } from "@/components/interaction/SmoothScrollProvider";
import { isAnnouncementDismissed } from "@/app/actions/announcement";
import { announcement } from "@/lib/content/homepage";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trabalance — Your whole business. One set of books.",
  description:
    "Operations, accounting and intelligence on one platform. Run the counter, warehouse, shop floor and books together — every sale, build and job updates your ledger in real time.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dismissed = await isAnnouncementDismissed();

  return (
    <html
      lang="en"
      data-announcement={dismissed ? "dismissed" : "visible"}
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem(${JSON.stringify(announcement.storageKey)})==="1"){document.documentElement.dataset.announcement="dismissed";}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
