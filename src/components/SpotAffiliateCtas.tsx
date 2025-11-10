// src/components/SpotAffiliateCtas.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { affiliateHref } from '@/lib/affiliate';
import { trackAffiliateClick } from '@/lib/ga';

type Lang = 'ja' | 'en';

type Props = {
  /** 明示しない場合は URL から自動判定 */
  lang?: Lang;
  /** スラッグは必須（計測に使用） */
  slug: string;
  /** 検索語の追加に使う（任意） */
  title?: string;
  query?: string;
  className?: string;
};

const detectLang = (p: string): Lang => (p.startsWith('/en') ? 'en' : 'ja');

const makeQuery = (lang: Lang, props: Props): string => {
  const words = [props.query, props.title, props.slug, lang === 'ja' ? '福岡' : 'Fukuoka']
    .filter(Boolean) as string[];
  return words.join(' ').trim();
};

export default function SpotAffiliateCtas(props: Props) {
  const pathname = usePathname() || '/';
  const lang: Lang = props.lang ?? detectLang(pathname);
  const q = makeQuery(lang, props);

  const hotelUrl = affiliateHref('booking', lang, q);
  const tourUrl  = affiliateHref('klook',   lang, q);

  if (!hotelUrl && !tourUrl) return null;

  return (
    <div className={props.className} style={{ display: 'grid', gap: 12 }}>
      {hotelUrl && (
        <a
          href={hotelUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          onClick={() =>
            trackAffiliateClick('booking', {
              slug: props.slug,
              language: lang,
              page_path: pathname,
            })
          }
        >
          {lang === 'ja' ? '周辺のホテル（Booking）' : 'Find Hotels (Booking)'}
        </a>
      )}

      {tourUrl && (
        <a
          href={tourUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          onClick={() =>
            trackAffiliateClick('klook', {
              slug: props.slug,
              language: lang,
              page_path: pathname,
            })
          }
        >
          {lang === 'ja' ? '周辺のツアー（Klook）' : 'Find Activities (Klook)'}
        </a>
      )}
    </div>
  );
}
