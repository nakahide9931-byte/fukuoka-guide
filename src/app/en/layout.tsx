// src/app/en/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // 本番ドメイン（これで相対URLが絶対URLに展開される）
  metadataBase: new URL("https://fukuoka-guide.vercel.app"),

  // <title>（全ページ共通のテンプレ）
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide",
  },

  // <meta name="description">
  description: "Discover food, culture, and nature in Kyushu's vibrant heart.",

  // Open Graph（Facebook等）
  openGraph: {
    type: "website",
    url: "/en",
    title: "Fukuoka Guide (English)",
    description: "Discover food, culture, and nature in Kyushu's vibrant heart.",
    images: ["/og.jpg"],
  },

  // Twitterカード
  twitter: {
    card: "summary_large_image",
    title: "Fukuoka Guide",
    description: "Discover food, culture, and nature in Kyushu's vibrant heart.",
    images: ["/og.jpg"],
  },

  // canonical と hreflang
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      ja: "/ja",
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
