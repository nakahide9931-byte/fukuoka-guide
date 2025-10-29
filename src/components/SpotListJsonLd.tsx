// src/components/SpotListJsonLd.tsx
import React from 'react';

type Item = {
  position: number;
  name: string;
  url: string;
  image?: string;
};

export default function SpotListJsonLd({ items }: { items: Item[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it) => ({
      '@type': 'ListItem',
      position: it.position,
      item: {
        '@type': 'Thing',
        name: it.name,
        url: it.url,
        ...(it.image ? { image: it.image } : {}),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON 文字列をそのまま埋め込む
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
