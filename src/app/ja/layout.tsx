// src/app/ja/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // 本番ドメイン
  metadataBase: new URL("https://fukuoka-guide.vercel.app"),

  // <title>
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide",
  },

  // <meta name="description">
  description: "食・文化・自然。九州の玄関口で見つける、あなたの旅。",

  // Open Graph
  openGraph: {
    type: "website",
    url: "/ja",
    title: "Fukuoka Guide（日本語）",
    description: "食・文化・自然。九州の玄関口で見つける、あなたの旅。",
    images: ["/og.jpg"],
  },

  // Twitterカード
  twitter: {
    card: "summary_large_image",
    title: "Fukuoka Guide",
    description: "食・文化・自然。九州の玄関口で見つける、あなたの旅。",
    images: ["/og.jpg"],
  },

  // canonical と hreflang
  alternates: {
    canonical: "/ja",
    languages: {
      ja: "/ja",
      en: "/en",
    },
  },
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
