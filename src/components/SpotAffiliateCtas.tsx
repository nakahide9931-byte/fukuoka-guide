'use client';

import type { MouseEvent } from 'react';
import AffiliateLink from '@/components/AffiliateLink';
import { click_affiliate } from '@/lib/ga';

/** 呼び出し側から受け取る Props */
type Props = {
  lang: 'en' | 'ja';
  slug: string;
  title: string;
};

/** スラッグ → 表示名のマップ（必要に応じて追記OK） */
const PLACE_LABEL: Record<
  string,
  { ja: string; en: string; cityJa?: string; cityEn?: string }
> = {
  'dazaifu-tenmangu': {
    ja: '太宰府天満宮',
    en: 'Dazaifu Tenmangu Shrine',
    cityJa: '福岡', // 先頭に付ける地域（省略可）
    cityEn: 'Fukuoka',
  },
  'nakasu-night': {
    ja: '中洲の夜景',
    en: 'Nakasu Night',
    cityJa: '福岡',
    cityEn: 'Fukuoka',
  },
  itoshima: {
    ja: '糸島',
    en: 'Itoshima',
    cityJa: '福岡',
    cityEn: 'Fukuoka',
  },
};

/** 検索語（例: “福岡 太宰府天満宮” / “Fukuoka Dazaifu Tenmangu Shrine”）を作る */
function buildQuery(lang: 'en' | 'ja', slug: string, title: string) {
  const meta = PLACE_LABEL[slug];
  const name = lang === 'ja' ? meta?.ja ?? title ?? slug : meta?.en ?? title ?? slug;
  const city = lang === 'ja' ? meta?.cityJa ?? '福岡' : meta?.cityEn ?? 'Fukuoka';
  return `${city} ${name}`.trim();
}

/** URL にクエリを安全に追加（相対URLでも動く） */
function ensureParam(base: string, key: string, value: string) {
  try {
    const u = new URL(base);
    if (!u.searchParams.has(key)) u.searchParams.set(key, value);
    return u.toString();
  } catch {
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${sep}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }
}

/** 宿泊のリンク（デフォは Booking。affiliate ベースURLがあればそれを使う） */
function buildHotelUrl(lang: 'en' | 'ja', query: string) {
  const raw =
    (lang === 'ja'
      ? process.env.NEXT_PUBLIC_AFF_HOTEL_JA
      : process.env.NEXT_PUBLIC_AFF_HOTEL_EN) ??
    // フォールバック（Booking の汎用検索）
    'https://www.booking.com/searchresults.html';
  // Booking は `ss` パラメータが目的地
  let url = ensureParam(raw, 'ss', query);
  // 言語パラメータが付いていない場合だけ付与（affiliate 側に既についていれば触らない）
  url = ensureParam(url, 'lang', lang === 'ja' ? 'ja' : 'en-us');
  return url;
}

/** 体験/ツアーのリンク（デフォは Klook 検索。affiliate があればそれを使う） */
function buildTourUrl(lang: 'en' | 'ja', query: string) {
  const raw =
    (lang === 'ja'
      ? process.env.NEXT_PUBLIC_AFF_TOUR_JA
      : process.env.NEXT_PUBLIC_AFF_TOUR_EN) ??
    // フォールバック（Klook の検索）
    'https://www.klook.com/search/';
  // Klook は `keyword` が検索語
  return ensureParam(raw, 'keyword', query);
}

export default function SpotAffiliateCtas({ lang, slug, title }: Props) {
  const query = buildQuery(lang, slug, title);
  const hotelHref = buildHotelUrl(lang, query);
  const tourHref = buildTourUrl(lang, query);

  const onClick = (kind: 'hotel' | 'tour') => (e: MouseEvent<HTMLAnchorElement>) => {
    // GA4 の計測（存在しない環境でも安全に）
    try {
      click_affiliate?.({ label: `${kind}:${slug}`, lang, value: 1 });
    } catch {}
  };

  return (
    <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
      <AffiliateLink href={hotelHref} onClick={onClick('hotel')}>
        {lang === 'ja' ? '周辺のホテル' : 'Nearby Hotels'}
      </AffiliateLink>
      <AffiliateLink href={tourHref} onClick={onClick('tour')}>
        {lang === 'ja' ? '周辺のツアー' : 'Tours around here'}
      </AffiliateLink>
    </div>
  );
}
