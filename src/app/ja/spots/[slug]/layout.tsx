// src/app/ja/spots/[slug]/layout.tsx
import type { Metadata } from 'next';
import React from 'react';
import { spots } from '../data';

// 未定義 slug を 404 にしたい場合は次行のコメントを外してください
// export const dynamicParams = false;

// 静的パスをここで生成（Client コンポーネントと同居しない）
export function generateStaticParams() {
  return (spots as any[]).map((s) => ({ slug: String((s as any).slug) }));
}

// 各 slug ごとにメタデータを生成（存在しないフィールドは安全に既定値で補完）
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const spot = (spots as any[]).find((s) => (s as any).slug === params.slug) as any;
  const base = '福岡ガイド';
  const title = spot ? `${spot?.name ?? spot?.title ?? params.slug} | ${base}` : base;
  const description = spot?.description ?? '福岡の観光スポット情報。';
  const ogImage = spot?.ogImage ?? spot?.image ?? '/og-default-ja.png';
  const twImage = spot?.twImage ?? ogImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: twImage ? [twImage] : [],
    },
    robots: { index: true, follow: true },
  };
}

// レイアウト本体（サーバーコンポーネントのまま）
type LayoutProps = Readonly<{ children: React.ReactNode }>;
export default function SpotSlugLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
