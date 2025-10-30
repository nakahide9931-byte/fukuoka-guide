// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // サイトの絶対URL（Vercel の環境変数を使用）
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://fukuoka-guide.vercel.app"),
  // （任意）全体のデフォルトOG
  openGraph: {
    type: "website",
    title: "Fukuoka Guide",
    url: "/",
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image" },
  // ルートにも hreflang を付けておく（下の ja/en レイアウトでも重ねがけ可）
  alternates: { languages: { ja: "/ja", en: "/en" } }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ルートでは lang は固定でOK（詳細は下の注釈）
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
