'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

/** 現在のパスから相互言語の href と表示ラベルを作る */
function getAltPath(pathname: string): { href: string; label: 'English' | '日本語' } {
  // 例: /ja/spots/dazaifu-tenmangu -> /en/spots/dazaifu-tenmangu
  //     /en/favorites             -> /ja/favorites
  if (!pathname || pathname === '/') {
    return { href: '/en', label: 'English' };
  }
  if (pathname.startsWith('/ja')) {
    const rest = pathname.slice('/ja'.length) || '';
    return { href: `/en${rest}`, label: 'English' };
  }
  if (pathname.startsWith('/en')) {
    const rest = pathname.slice('/en'.length) || '';
    return { href: `/ja${rest}`, label: '日本語' };
  }
  // どちらの prefix でもない場合は EN に寄せる
  return { href: `/en${pathname}`, label: 'English' };
}

export default function LanguageSwitch() {
  const pathname = usePathname() || '/';
  const { href, label } = React.useMemo(() => getAltPath(pathname), [pathname]);

  return (
    <Link
      href={href}
      aria-label={`Switch language to ${label}`}
      prefetch
      style={{
        border: '1px solid #ddd',
        borderRadius: 6,
        padding: '6px 10px',
        fontSize: 14,
        textDecoration: 'none',
        display: 'inline-block',
      }}
    >
      {label}
    </Link>
  );
}
