// src/app/layout.tsx

import { Suspense } from "react";
import type { ReactNode } from "react";   // ← これを追加
import GA from "@/components/GA";         // すでにあるならこの行は重複しないように

export default function RootLayout({
  children,
}: {
  children: ReactNode;                    // ← ReactNode を使う
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
