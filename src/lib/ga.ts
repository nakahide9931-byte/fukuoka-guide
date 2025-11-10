// src/lib/ga.ts
export const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID || '';

type Lang = 'ja' | 'en';
type Provider = 'booking' | 'klook';

export type AffiliateClickPayload = {
  slug: string;             // 例: "nakasu-night"
  language: Lang;           // 'ja' | 'en'
  page_path: string;        // 例: "/en/spots/nakasu-night"
};

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/** pageview を GA4 に送信 */
export function pageview(url: string): void {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('config', GA_ID, { page_path: url });
}

/** アフィリエイトクリック計測（イベント送信） */
export function trackAffiliateClick(
  provider: Provider,
  payload: AffiliateClickPayload
): void {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'affiliate_click', {
    event_category: 'affiliate',
    event_label: `${provider}:${payload.slug}`,
    provider,
    ...payload,
  });
}
