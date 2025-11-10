// src/app/en/spots/[slug]/page.tsx
import Image from 'next/image';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';

import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import SpotJsonLd from '@/components/SpotJsonLd';
import SpotAffiliateCtas from '@/components/SpotAffiliateCtas';

// --- ページ固有メタ（必要に応じて追記・編集OK） ---
const SPOT_META_EN: Record<
  string,
  { title: string; description: string; hero?: string }
> = {
  'dazaifu-tenmangu': {
    title: 'Dazaifu Tenmangu Shrine',
    description: 'Famous for plum blossoms.',
    hero: '/images/spots/dazaifu-tenmangu.jpg',
  },
  'nakasu-night': {
    title: 'Nakasu Night',
    description: 'Iconic night food stalls by the river.',
    hero: '/images/spots/nakasu-night.jpg',
  },
  itoshima: {
    title: 'Itoshima',
    description: 'Coastal cafes and scenic drives.',
    hero: '/images/spots/itoshima.jpg',
  },
};

// --- Metadata ---
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const baseTitle = 'Fukuoka Guide (English)';
  const fallbackDescription =
    "Discover food, culture, and nature in Kyushu's vibrant heart.";
  const found = SPOT_META_EN[params.slug];

  const title = found ? `${found.title} | ${baseTitle}` : baseTitle;
  const description = found?.description ?? fallbackDescription;
  const slug = params.slug;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/spots/${slug}`,
      languages: { en: `/en/spots/${slug}`, ja: `/ja/spots/${slug}` },
    },
    openGraph: {
      type: 'article',
      url: `/en/spots/${slug}`,
      title,
      description,
      images: [`/en/spots/${slug}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/en/spots/${slug}/twitter-image`],
    },
  };
}

// CTA の型（any禁止）
type CtaProps = { lang: 'ja' | 'en'; slug: string; title: string };
const Cta = SpotAffiliateCtas as ComponentType<CtaProps>;

export default function Page({ params }: { params: { slug: string } }) {
  const m = SPOT_META_EN[params.slug];
  const title = m?.title ?? params.slug;
  const description = m?.description ?? '';
  const hero = m?.hero ?? '/images/spots/hero.jpg';

  // 構造化データ用の絶対URLベース
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fukuoka-guide.vercel.app';

  return (
    <main style={{ padding: 24 }}>
      {/* パンくず JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Fukuoka Guide', url: `${base}/en` },
          { name: 'Spots', url: `${base}/en/spots` },
          { name: title, url: `${base}/en/spots/${params.slug}` },
        ]}
      />

      {/* TouristAttraction（スポット詳細）JSON-LD */}
      <SpotJsonLd
        name={title}
        description={description}
        url={`${base}/en/spots/${params.slug}`}
        image={hero}
      />

      {/* 画面表示 */}
      <h1
        style={{
          fontSize: '2.25rem',
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {title}
      </h1>

      <div
        style={{
          border: '1px solid #eee',
          borderRadius: 8,
          overflow: 'hidden',
          maxWidth: 960,
        }}
      >
        <Image
          src={hero}
          alt={title}
          width={1280}
          height={720}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
      </div>

      {/* CTA（アフィリエイト） */}
      <div style={{ marginTop: 20 }}>
        <Cta lang="en" slug={params.slug} title={title} />
      </div>
    </main>
  );
}
