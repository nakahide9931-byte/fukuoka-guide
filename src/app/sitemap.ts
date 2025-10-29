// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import jaSpots from '@/app/ja/spots/data';
import enSpots from '@/app/en/spots/data';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // ① 固定ページ（/favorites は含めない）
  const statics: MetadataRoute.Sitemap = [
    `${BASE}/ja`,
    `${BASE}/en`,
    `${BASE}/ja/spots`,
    `${BASE}/en/spots`,
  ].map((url) => ({ url, lastModified: now }));

  // ② スポット詳細（英日）
  const spotPages: MetadataRoute.Sitemap = [
    ...jaSpots.map((s) => ({
      url: `${BASE}/ja/spots/${s.slug}`,
      lastModified: now,
    })),
    ...enSpots.map((s) => ({
      url: `${BASE}/en/spots/${s.slug}`,
      lastModified: now,
    })),
  ];

  return [...statics, ...spotPages];
}
