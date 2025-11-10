// 例: src/app/en/layout.tsx （ja も同じ）
import React from 'react';
import Script from 'next/script';
import GA from '@/components/GA';
import { GA_ID } from '@/lib/ga';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* GA4 を使う時だけ読み込み */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
          <GA />
        </>
      )}
      {children}
    </>
  );
}
