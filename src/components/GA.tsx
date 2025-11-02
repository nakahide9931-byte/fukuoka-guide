// src/components/GA.tsx
"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ページビュー（SPA遷移にも対応）
  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || !(window as any).gtag) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    (window as any).gtag("config", GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  // 外部リンク自動計測（同一ドメイン以外への <a> クリックを拾う）
  useEffect(() => {
    if (!GA_ID) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href) return;

      const isExternal =
        /^https?:\/\//i.test(href) && !href.includes(location.hostname);

      if (isExternal && (window as any).gtag) {
        (window as any).gtag("event", "click_outbound", {
          send_to: GA_ID,
          link_url: href,
          link_text: anchor.textContent?.trim()?.slice(0, 80) || undefined,
          location_path: location.pathname,
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
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
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
