// src/app/en/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const titleBase = 'Find Your Fukuoka';
const description = 'Discover hidden gems, food, culture, and nature in Fukuoka.';
const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: titleBase,
  description,
  alternates: {
    canonical: '/en',
    languages: { en: '/en', ja: '/ja', 'x-default': '/en' },
  },
  openGraph: {
    type: 'website',
    url: '/en',
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

export default function EnLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
