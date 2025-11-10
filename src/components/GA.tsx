// src/components/GA.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_ID, pageview } from '@/lib/ga';

export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return; // GA 未設定なら何もしない
    const q = searchParams?.toString();
    const url = q ? `${pathname}?${q}` : (pathname || '/');
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
