// src/app/en/layout.tsx
import type { Metadata } from "next";

const SITE_NAME_EN = "Fukuoka Guide (English)";
const SITE_DESC_EN =
  "Discover food, culture, and nature in Kyushu’s vibrant heart.";

export const metadata: Metadata = {
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide",
  },
  // ← これで <meta name="description" ...> が出ます
  description: SITE_DESC_EN,

  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ja: "/ja",
    },
  },

  openGraph: {
    type: "website",
    title: SITE_NAME_EN,
    description: SITE_DESC_EN,
    url: "/en",
    images: ["/og.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME_EN,
    description: SITE_DESC_EN,
    images: ["/og.jpg"],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
