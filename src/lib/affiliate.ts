// src/lib/affiliate.ts
export type Lang = 'ja' | 'en';
export type Partner = 'klook' | 'booking';

const MODE = (process.env.NEXT_PUBLIC_LINK_MODE ?? 'staging').toLowerCase() as 'staging' | 'prod';
const env = (k: string, d = ''): string => (process.env as any)[k] || d;

const DEFAULTS = {
  klook:   { ja: 'https://www.klook.com/ja/search/',            en: 'https://www.klook.com/en/search/' },
  booking: { ja: 'https://www.booking.com/searchresults.html',   en: 'https://www.booking.com/searchresults.html' },
} as const;

function baseOf(partner: Partner, lang: Lang): string {
  if (partner === 'klook') {
    const keys = MODE === 'prod'
      ? (lang === 'ja' ? ['NEXT_PUBLIC_AFF_TOUR_JA_PROD'] : ['NEXT_PUBLIC_AFF_TOUR_EN_PROD'])
      : (lang === 'ja' ? ['NEXT_PUBLIC_AFF_TOUR_JA']      : ['NEXT_PUBLIC_AFF_TOUR_EN']);
    for (const k of keys) { const v = env(k); if (v) return v; }
    return DEFAULTS.klook[lang];
  } else {
    const keys = MODE === 'prod'
      ? (lang === 'ja' ? ['NEXT_PUBLIC_AFF_HOTEL_JA_PROD'] : ['NEXT_PUBLIC_AFF_HOTEL_EN_PROD'])
      : (lang === 'ja' ? ['NEXT_PUBLIC_AFF_HOTEL_JA']      : ['NEXT_PUBLIC_AFF_HOTEL_EN']);
    for (const k of keys) { const v = env(k); if (v) return v; }
    return DEFAULTS.booking[lang];
  }
}

function addParam(base: string, k: string, v: string) {
  try { const u = new URL(base); if (!u.searchParams.has(k)) u.searchParams.set(k, v); return u.toString(); }
  catch { const sep = base.includes('?') ? '&' : '?'; return `${base}${sep}${encodeURIComponent(k)}=${encodeURIComponent(v)}`; }
}

export function affiliateHref(partner: Partner, lang: Lang, query: string): string {
  const base = baseOf(partner, lang);
  if (partner === 'klook') return addParam(base, 'keyword', query);
  const langCode = lang === 'ja' ? 'ja' : 'en-us';
  return addParam(addParam(base, 'ss', query), 'lang', langCode);
}
