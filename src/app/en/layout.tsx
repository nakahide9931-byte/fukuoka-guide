// src/app/en/layout.tsx
// src/app/en/layout.tsx
import type { Metadata } from "next";
import React, { Suspense } from "react";
import GA from ".././../components/GA";
import SiteJsonLd from "@/components/SiteJsonLd";

export const metadata: Metadata = {
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide",
  },
  description:
    "Discover food, culture, and nature in Kyushu's vibrant heart.",
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
  metadataBase:
    new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app"),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <GA />
        </Suspense>
        <SiteJsonLd lang="en" />
        {children}
      </body>
    </html>
  );
}
