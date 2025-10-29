// src/app/ja/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const titleBase = 'Find Your Fukuoka';
const description = '福岡の食・文化・自然を見つけよう。';
const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: titleBase,
  description,
  alternates: {
    canonical: '/ja',
    languages: { ja: '/ja', en: '/en', 'x-default': '/ja' },
  },
  openGraph: {
    type: 'website',
    url: '/ja',
    siteName: titleBase,
    title: titleBase,
    description,
    images: [{ url: '/hero.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: titleBase,
    description,
    images: ['/hero.jpg'],
  },
};

export default function JaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
