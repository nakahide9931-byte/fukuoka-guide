// src/lib/ga.ts
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function gaEvent(name: string, params: Record<string, any> = {}) {
  if (!GA_ID) return;
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.gtag !== 'function') return;
  w.gtag('event', name, params);
}

export function trackAffiliateClick(
  partner: 'booking' | 'klook',
  meta: { slug?: string; language?: 'ja' | 'en'; page_path?: string } = {}
) {
  gaEvent('affiliate_click', { partner, ...meta, value: 1 });
}
export const click_affiliate = trackAffiliateClick; // 後方互換
