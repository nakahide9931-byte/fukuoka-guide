// src/app/layout.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import GA from "../components/GA";

export const metadata: Metadata = {
  // 絶対URL化（canonical / og 画像などに有効）
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app"
  ),
  // Search Console 検証（全ページに出す）
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Suspense fallback={null}>
          <GA />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
