// src/lib/affiliate.ts
type Lang = 'ja' | 'en';
type Provider = 'booking' | 'klook';

const MODE = (process.env.NEXT_PUBLIC_LINK_MODE || 'staging').toLowerCase(); // 'staging' | 'prod'

function env(key: string): string {
  return process.env[key] || '';
}

// ベース URL を環境変数から取得（言語・モード別）
function baseUrl(provider: Provider, lang: Lang): string {
  if (provider === 'klook') {
    return MODE === 'prod'
      ? (lang === 'ja' ? env('NEXT_PUBLIC_AFF_TOUR_JA_PROD') : env('NEXT_PUBLIC_AFF_TOUR_EN_PROD'))
      : (lang === 'ja' ? env('NEXT_PUBLIC_AFF_TOUR_JA')      : env('NEXT_PUBLIC_AFF_TOUR_EN'));
  }
  // booking
  return MODE === 'prod'
    ? (lang === 'ja' ? env('NEXT_PUBLIC_AFF_HOTEL_JA_PROD') : env('NEXT_PUBLIC_AFF_HOTEL_EN_PROD'))
    : (lang === 'ja' ? env('NEXT_PUBLIC_AFF_HOTEL_JA')      : env('NEXT_PUBLIC_AFF_HOTEL_EN'));
}

/**
 * アフィリエイト URL を生成
 * - Klook  : keyword= に検索語を詰める
 * - Booking: ss= に検索語を詰める
 */
export function affiliateHref(provider: Provider, lang: Lang, query: string): string {
  const base = baseUrl(provider, lang);
  if (!base) return '';

  try {
    const u = new URL(base);
    const q = query.trim();
    if (provider === 'klook') {
      // klook 検索用クエリ
      u.searchParams.set('keyword', q);
    } else {
      // booking 検索用クエリ
      u.searchParams.set('ss', q);
    }
    return u.toString();
  } catch {
    // base が完全な URL でないなどの場合はそのまま返す
    return base;
  }
}
