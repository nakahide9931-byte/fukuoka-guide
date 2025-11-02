// src/components/LanguageSwitch.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { gaEvent } from '@/lib/ga';

type Props = {
  /** 切り替え先の言語 */
  to: 'ja' | 'en';
  /** 切り替え先のURL（/ja/... または /en/...） */
  href: string;
  className?: string;
  children?: React.ReactNode; // ボタンラベル
};

export default function LanguageSwitch({ to, href, className, children }: Props) {
  const handleClick = React.useCallback(() => {
    const from =
      typeof document !== 'undefined' ? document.documentElement.lang || '' : '';
    gaEvent('language_switch', {
      from,
      to,
      page: typeof location !== 'undefined' ? location.pathname : '',
      href,
    });
  }, [to, href]);

  return (
    <Link
      href={href}
      hrefLang={to}
      className={className}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px',
        borderRadius: 8,
        border: '1px solid #ddd',
      }}
    >
      {children ?? (to === 'ja' ? '日本語' : 'English')}
    </Link>
  );
}
