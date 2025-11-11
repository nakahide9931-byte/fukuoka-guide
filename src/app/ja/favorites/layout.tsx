'use client';

import React, { Suspense } from 'react';
import GA from '@/components/GA'; // ルートで入れているなら無くてもOK

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* GA が useSearchParams を使うならラップしておく */}
      <Suspense fallback={null}>
        <GA />
      </Suspense>

      {/* /favorites 配下のページ全体をラップ */}
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </>
  );
}
