import React, { Suspense } from 'react';
import GA from '@/components/GA';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <GA />
      </Suspense>
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
