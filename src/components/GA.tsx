'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ルート変更ごとに page_view を手動送信（初回表示も含む）
  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window === 'undefined' || !(window as any).gtag) return;

    const q = searchParams?.toString();
    const path = q ? `${pathname}?${q}` : pathname;

    (window as any).gtag('event', 'page_view', {
      page_title: document.title,
      page_location: `${window.location.origin}${path}`,
      page_path: path,
      send_to: GA_ID,
      // 開発時にデバッグビューを使いたければ有効化
      // debug_mode: process.env.NODE_ENV !== 'production',
    });
  }, [pathname, searchParams]);

  // （任意）外部リンクのクリックを記録
  useEffect(() => {
    if (!GA_ID) return;

    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
      if (!a?.href) return;
      const url = new URL(a.href, location.href);
      const isExternal = url.host !== location.host;
      if (!isExternal) return;

      (window as any).gtag?.('event', 'click', {
        event_category: 'outbound',
        event_label: url.href,
        transport_type: 'beacon',
        send_to: GA_ID,
      });
    };

    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <>
      {/* GA4 本体 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // SPAでは自動page_viewを切り、手動送信に統一
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
