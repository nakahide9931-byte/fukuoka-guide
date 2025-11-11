'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_ID, pageview } from '@/lib/ga';

function GAInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) return;

    const q = searchParams?.toString();
    const url = q ? `${pathname}?${q}` : pathname;

    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

export default function GA() {
  // ページ側ではなく、GA 内部はそのまま
  return <GAInner />;
}
