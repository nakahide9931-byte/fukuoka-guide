// src/app/ja/favorites/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const url = `${site}/ja/favorites`;
  const title = 'お気に入り – Find Your Fukuoka';
  const description = '保存した福岡のスポット一覧。';
  const image = `${site}/hero.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ja: url, en: `${site}/en/favorites`, 'x-default': url },
    },
    robots: { index: false, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Find Your Fukuoka',
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
