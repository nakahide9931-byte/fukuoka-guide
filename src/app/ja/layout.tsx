// src/app/ja/layout.tsx
import type { Metadata } from "next";

const SITE_NAME_JA = "Fukuoka Guide（日本語）";
const SITE_DESC_JA = "食・文化・自然。九州の玄関口で見つける、あなたの旅。";

export const metadata: Metadata = {
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide",
  },
  // ← これで <meta name="description" ...> が出ます
  description: SITE_DESC_JA,

  alternates: {
    canonical: "/ja",
    languages: {
      ja: "/ja",
      en: "/en",
    },
  },

  openGraph: {
    type: "website",
    title: SITE_NAME_JA,
    description: SITE_DESC_JA,
    url: "/ja",
    images: ["/og.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME_JA,
    description: SITE_DESC_JA,
    images: ["/og.jpg"],
  },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
