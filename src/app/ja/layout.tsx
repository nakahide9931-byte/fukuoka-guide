// src/app/ja/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide"
  },
  openGraph: {
    type: "website",
    title: "Fukuoka Guide（日本語）",
    url: "/ja",
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image" },
  // ja ページでも相互の hreflang を出す
  alternates: { languages: { ja: "/ja", en: "/en" } }
};

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
