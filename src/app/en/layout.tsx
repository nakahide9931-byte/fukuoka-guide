// src/app/en/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Fukuoka Guide",
    template: "%s | Fukuoka Guide"
  },
  openGraph: {
    type: "website",
    title: "Fukuoka Guide (English)",
    url: "/en",
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image" },
  alternates: { languages: { ja: "/ja", en: "/en" } }
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
