// src/components/LanguageSwitch.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitch() {
  const pathname = usePathname() || '/';

  // /ja/xxx <-> /en/xxx を相互に切替
  const isEN = pathname.startsWith('/en');
  const isJA = pathname.startsWith('/ja');

  const target = isEN
    ? pathname.replace(/^\/en/, '/ja')
    : isJA
    ? pathname.replace(/^\/ja/, '/en')
    : '/ja';

  const label = isEN ? '日本語' : 'EN';

  return (
    <Link
      href={target}
      style={{ border: '1px solid #ddd', borderRadius: 8, padding: '4px 8px', fontSize: 12 }}
    >
      {label}
    </Link>
  );
}
