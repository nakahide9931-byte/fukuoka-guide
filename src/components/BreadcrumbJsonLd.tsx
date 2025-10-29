// src/components/BreadcrumbJsonLd.tsx
'use client';

type Props = {
  lang: 'en' | 'ja';
  spotName: string;
  slug: string;
};

export default function BreadcrumbJsonLd({ lang, spotName, slug }: Props) {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const t = (en: string, ja: string) => (lang === 'ja' ? ja : en);

  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('Home', 'ホーム'), item: `${BASE}/${lang}` },
      { '@type': 'ListItem', position: 2, name: t('Spots', 'スポット'), item: `${BASE}/${lang}/spots` },
      { '@type': 'ListItem', position: 3, name: spotName, item: `${BASE}/${lang}/spots/${slug}` },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
