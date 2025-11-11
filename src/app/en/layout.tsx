import React, { Suspense } from 'react';
import GA from '@/components/GA';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ← 重要：GA を Suspense で包む */}
      <Suspense fallback={null}>
        <GA />
      </Suspense>

      {children}
    </>
  );
}
