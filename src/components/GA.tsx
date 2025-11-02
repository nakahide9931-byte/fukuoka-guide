'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GA() {
  // 環境変数が未設定なら何もしない
  if (!GA_ID) return null;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ① ルータ遷移時の page_view を確実に送信
  useEffect(() => {
    if (!window.gtag) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    window.gtag('config', GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  // ② 外部リンク/CTA のクリック計測（任意）
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const a = el.closest('a') as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute('href') || '';
      if (!href) return;

      // data-cta 属性が付いたリンクは CTA として送信（重複防止のため先に判定）
      if (a.dataset.cta) {
        window.gtag?.('event', 'cta_click', {
          link_text: a.innerText.trim(),
          link_url: a.href,
          cta: a.dataset.cta,
          transport_type: 'beacon',
        });
        return;
      }

      // 外部リンク（ドメインが異なる）なら outbound_click を送信
      try {
        const url = new URL(a.href, location.href);
        if (url.host !== location.host) {
          window.gtag?.('event', 'outbound_click', {
            link_text: a.innerText.trim(),
            link_url: url.href,
            link_domain: url.host,
            transport_type: 'beacon',
          });
        }
      } catch {
        /* 無効な URL は無視 */
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true } as any);
  }, []);

  return (
    <>
      {/* GA4 ライブラリ */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* 初期化 */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
