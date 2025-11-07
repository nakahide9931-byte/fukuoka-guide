// src/lib/ga.ts

type GAParams = Record<string, unknown>;
type Lang = 'en' | 'ja';

/** 汎用 GA4 イベント送信（SSRやgtag未ロードでも安全に無視） */
export function gaEvent(action: string, params: GAParams = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as any).gtag as ((...a: any[]) => void) | undefined;
  if (!gtag) return;
  gtag('event', action, params);
}

/** アフィリエイトCTA専用のヘルパー */
export function click_affiliate(params: {
  label: string;   // 例: "hotel:dazaifu-tenmangu" / "tour:nakasu-night"
  lang: Lang;      // 'en' | 'ja'
  value?: number;  // 任意
}): void {
  gaEvent('click_affiliate', params);
}
