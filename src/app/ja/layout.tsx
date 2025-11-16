// src/app/ja/layout.tsx
import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import GA from '@/components/GA';

// ここで絶対URLの基点を指定（環境変数が無ければ Vercel のURLにフォールバック）
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fukuoka-guide.vercel.app'
  ),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* GA は検索パラメータを読むので Suspense で包む */}
      <Suspense fallback={null}>
        <GA />
      </Suspense>

      {/* ページ本体 */}
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
