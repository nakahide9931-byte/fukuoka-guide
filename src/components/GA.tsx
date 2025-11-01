'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ルーターでページ遷移した時に page_view を送る
  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined') return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    // gtag が読み込まれる前に呼ばれても安全にスキップ
    // @ts-ignore
    window.gtag?.('config', GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  // 計測 ID が無いときは何も出さない
  if (!GA_ID) return null;

  return (
    <>
      {/* gtag.js を読み込み */}
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      {/* 初期設定。自動 page_view はオフにして、上の useEffect で送る */}
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
