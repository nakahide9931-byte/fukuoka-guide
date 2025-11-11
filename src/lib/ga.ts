// src/lib/ga.ts
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

/** gtag が window にあるかもしれないので型だけ用意 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** ページビュー送信（GA4） */
export function pageview(url: string): void {
  if (!GA_ID) return; // GA未設定なら何もしない
  window.gtag?.('config', GA_ID, { page_path: url });
}

/** 汎用イベント送信（Favorite などで使う） */
type EventParams = Record<string, string | number | boolean | undefined>;

export function gaEvent(action: string, params: EventParams = {}): void {
  if (!GA_ID) return;
  window.gtag?.('event', action, params);
}

/** アフィリエイト用の補助（CTAで使う） */
export type AffiliateClickPayload = {
  slug: string;
  language: 'ja' | 'en';
  page_path: string;
};

export function trackAffiliateClick(
  provider: 'booking' | 'klook',
  payload: AffiliateClickPayload
): void {
  gaEvent('affiliate_click', { provider, ...payload });
}
