// src/app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

import HeaderNav from '@/components/HeaderNav';
import JsonLdBase from '@/components/JsonLdBase';

export const metadata: Metadata = {
  title: 'Find Your Fukuoka',
  description: 'Discover hidden gems, food, culture, and nature in Fukuoka.',
  alternates: {
    languages: {
      en: '/en',
      ja: '/ja',
      'x-default': '/',
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <HeaderNav />       {/* 全ページにヘッダー */}
        <JsonLdBase />      {/* ← サイト全体 JSON‑LD（WebSite/Organization） */}
        {children}

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
                gtag('config', '${GA_ID}', {
                  anonymize_ip: true,
                  debug_mode: true,
                  transport_type: 'beacon'
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
