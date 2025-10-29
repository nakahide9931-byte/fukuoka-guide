// src/app/en/spots/layout.tsx
import type { ReactNode } from 'react';
import SpotListJsonLd from '@/components/SpotListJsonLd';
import spots, { type Spot } from './data';

export default function SpotsLayout({ children }: { children: ReactNode }) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const items = (spots as Spot[]).map((s, i) => ({
    position: i + 1,
    name: s.name,
    url: `${site}/en/spots/${s.slug}`,
    image: s.image ? `${site}/images/spots/${s.image}` : `${site}/hero.jpg`,
  }));

  return (
    <>
      {/* 一覧ページ用の ItemList 構造化データ */}
      <SpotListJsonLd items={items} />
      {children}
    </>
  );
}
