// src/app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import GA from "@/components/GA";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Fukuoka Guide", template: "%s | Fukuoka Guide" },
  description: "Discover food, culture, and nature in Kyushu’s vibrant heart.",
  alternates: { canonical: "/", languages: { en: "/en", ja: "/ja" } },
  openGraph: { type: "website", title: "Fukuoka Guide", url: "/", images: ["/og.jpg"] },
  twitter: { card: "summary_large_image" },
  // ★Search Console 用（環境変数から出す）
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GA />
        {children}
      </body>
    </html>
  );
}
