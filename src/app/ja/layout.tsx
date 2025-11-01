import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: { default: "Fukuoka Guide", template: "%s | Fukuoka Guide" },
  description: "食・文化・自然。九州の玄関口で見つける、あなたの旅。",
  alternates: {
    canonical: "/ja",
    languages: { ja: "/ja", en: "/en" },
  },
  openGraph: {
    type: "website",
    title: "Fukuoka Guide（日本語）",
    description: "食・文化・自然。九州の玄関口で見つける、あなたの旅。",
    url: "/ja",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fukuoka Guide",
    description: "食・文化・自然。九州の玄関口で見つける、あなたの旅。",
    images: ["/og.jpg"],
  },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
