// src/components/LanguageSwitch.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';

type Props = {
  className?: string;
  style?: CSSProperties;
};

export default function LanguageSwitch({ className, style }: Props) {
  const pathname = usePathname() || '/';

  // /ja/... or /en/... を判定
  const parts = pathname.split('/').filter(Boolean);
  const current = parts[0] === 'ja' ? 'ja' : 'en';
  const other = current === 'ja' ? 'en' : 'ja';

  // 先頭セグメントを入れ替え
  parts[0] = other;
  const target = '/' + parts.join('/');

  return (
    <Link
      href={target}
      prefetch={false}
      className={className}
      style={style}
      data-testid="lang-switch"
      aria-label="Switch language"
    >
      {other === 'ja' ? '日本語' : 'English'}
    </Link>
  );
}
