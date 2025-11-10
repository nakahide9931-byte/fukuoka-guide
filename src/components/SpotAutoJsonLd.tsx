'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  /** タイトルを手で渡したいとき（渡さなければ <h1> から拾う） */
  nameOverride?: string;
  image?: string;
  description?: string;
};

export default function SpotAutoJsonLd({ nameOverride, image, description }: Props) {
  const pathname = usePathname() ?? '/';
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fukuoka-guide.vercel.app';
  const [name, setName] = useState(nameOverride ?? '');

  useEffect(() => {
    if (!nameOverride) {
      const h1 = document.querySelector('h1');
      const txt = h1?.textContent?.trim();
      if (txt) setName(txt);
      else {
        // フォールバック：最後のパス要素を名前に
        const slug = pathname.split('/').filter(Boolean).pop() ?? '';
        setName(slug || 'Spot');
      }
    }
  }, [nameOverride, pathname]);

  const json = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name,
    url: `${base}${pathname}`,
    ...(image ? { image } : {}),
    ...(description ? { description } : {}),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
