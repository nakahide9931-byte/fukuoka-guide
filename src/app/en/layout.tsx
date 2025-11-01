// src/app/en/layout.tsx
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide",
  },
  description: "Discover food, culture, and nature in Kyushu’s vibrant heart.",
  alternates: {
    canonical: "/en",
    languages: { en: "/en", ja: "/ja" },
  },
  openGraph: {
    type: "website",
    title: "Fukuoka Guide (English)",
    url: "/en",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  // ★ Search Console 検証コードを meta に出す
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION as string,
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
