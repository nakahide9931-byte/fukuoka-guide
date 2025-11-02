// src/app/ja/layout.tsx
import type { Metadata } from "next";
import React, { Suspense } from "react";
import GA from ".././../components/GA";
import SiteJsonLd from "@/components/SiteJsonLd";

export const metadata: Metadata = {
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide",
  },
  description: "食・文化・自然。九州の玄関口で見つける、あなたの旅。",
  alternates: {
    canonical: "/ja",
    languages: { ja: "/ja", en: "/en" },
  },
  openGraph: {
    type: "website",
    title: "Fukuoka Guide（日本語）",
    url: "/ja",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase:
    new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Suspense fallback={null}>
          <GA />
        </Suspense>
        <SiteJsonLd lang="ja" />
        {children}
      </body>
    </html>
  );
}
