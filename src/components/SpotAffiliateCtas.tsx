'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { affiliateHref } from '@/lib/affiliate';
import { trackAffiliateClick } from '@/lib/ga';

type Lang = 'ja' | 'en';
type Props = { lang?: Lang; slug?: string; query?: string; title?: string; className?: string; };

const detectLang = (p: string): Lang => (p?.startsWith('/en') ? 'en' : 'ja');
const makeQuery = (lang: Lang, { query, title, slug }: Props) =>
  (query?.trim() || [title, slug].filter(Boolean).join(' ').trim() || (lang === 'ja' ? '福岡' : 'Fukuoka'));

export default function SpotAffiliateCtas(props: Props) {
  const pathname = usePathname() ?? '';
  const lang: Lang = props.lang ?? detectLang(pathname);
  const q = makeQuery(lang, props);
  const hotelUrl = affiliateHref('booking', lang, q);
  const tourUrl  = affiliateHref('klook',   lang, q);

  return (
    <div className={props.className} style={{ display:'grid', gap:12 }}>
      <a href={hotelUrl} target="_blank" rel="nofollow sponsored noopener"
         onClick={() => trackAffiliateClick('booking', { slug: props.slug, language: lang, page_path: pathname })}>
        {lang === 'ja' ? '周辺のホテル（Booking）' : 'Find Hotels (Booking)'}
      </a>
      <a href={tourUrl} target="_blank" rel="nofollow sponsored noopener"
         onClick={() => trackAffiliateClick('klook', { slug: props.slug, language: lang, page_path: pathname })}>
        {lang === 'ja' ? '周辺のツアー（Klook）' : 'Find Activities (Klook)'}
      </a>
    </div>
  );
}
