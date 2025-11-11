import React, { Suspense } from 'react';
import GA from '@/components/GA';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* GA は検索パラメータを読むので Suspense で包む */}
      <Suspense fallback={null}>
        <GA />
      </Suspense>

      {/* /ja 配下の各ページ（/ja/favorites を含む）も Suspense で包む */}
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
