// src/app/en/favorites/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const url = `${site}/en/favorites`;
  const title = 'Favorites – Find Your Fukuoka';
  const description = 'Your saved spots in Fukuoka.';
  const image = `${site}/hero.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: url, ja: `${site}/ja/favorites`, 'x-default': url },
    },
    robots: { index: false, follow: true }, // ★ お気に入りは noindex
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
