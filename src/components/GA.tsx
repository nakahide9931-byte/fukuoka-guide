// src/components/GA.tsx
'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

function sendPageview(url: string) {
  if (!GA_ID || typeof window === 'undefined') return;
  window.gtag?.('config', GA_ID, { page_path: url });
}

function sendEvent(name: string, params: Record<string, any>) {
  if (!GA_ID || typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
}

/**
 * Google tag を注入し、SPA の page_view と「外部リンククリック(outbound)」を計測します。
 * ルートの <Suspense><GA/></Suspense> のままでOKです。
 */
export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ルーター遷移で page_view を送信
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    sendPageview(url);
  }, [pathname, searchParams]);

  // 外部リンクのクリックをキャプチャ（a要素に限らず Link/ボタン内のa でも拾います）
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!el) return;

      const dest = new URL(el.href, location.href);
      if (dest.origin === location.origin) return; // 同一ドメインは除外

      sendEvent('outbound_click', {
        link_url: dest.href,
        link_domain: dest.hostname,
        link_text: el.textContent?.trim().slice(0, 80) ?? '',
        page_path: location.pathname + location.search,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true } as any);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            ${process.env.NODE_ENV !== 'production' ? 'debug_mode: true,' : ''}
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}

// TypeScript: window.gtag の型
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}
