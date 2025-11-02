// src/lib/ga.ts

export const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GA_ID?.trim();

// ① GA4 が自動送信するイベント（手動送信しない）
export const AUTO_EVENTS = [
  'page_view',
  'session_start',
  'user_engagement',
] as const;
export type GAAutoEvent = typeof AUTO_EVENTS[number];

// ② このプロジェクトで使うカスタムイベント（ここに追加したものだけ送る）
export const CUSTOM_EVENTS = [
  'cta_click',        // 既存：CTA/リンククリック
  'outbound_click',   // 既存：外部遷移クリック
  'favorite_add',     // 追加：お気に入りに追加
  'favorite_remove',  // 追加：お気に入りを解除
  'language_switch',  // 追加：言語切り替え
] as const;
export type GACustomEvent = typeof CUSTOM_EVENTS[number];

export type GAEventName = GAAutoEvent | GACustomEvent;
type EventParams = Record<string, string | number | boolean | undefined>;

/** カスタムイベント送信用（AUTO_EVENTS は弾く） */
export function gaEvent(name: GAEventName, params: EventParams = {}) {
  if (typeof window === 'undefined') return;
  const gtag = (window as any).gtag as
    | ((cmd: string, name: string, params?: unknown) => void)
    | undefined;
  if (!gtag || !MEASUREMENT_ID) return;

  // 自動イベントは自分では送らない
  if ((AUTO_EVENTS as readonly string[]).includes(name)) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[ga] skip auto event:', name, params);
    }
    return;
  }

  // 許可したイベントのみ送る
  if (!(CUSTOM_EVENTS as readonly string[]).includes(name)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[ga] blocked unknown event:', name, params);
    }
    return;
  }

  gtag('event', name, params);
}

/** 任意：ルーター遷移時に明示で page_view を打ちたい場合に使う */
export function gaPageView(path: string) {
  if (typeof window === 'undefined') return;
  const gtag = (window as any).gtag as
    | ((cmd: string, name: string, params?: unknown) => void)
    | undefined;
  if (!gtag || !MEASUREMENT_ID) return;

  gtag('config', MEASUREMENT_ID, { page_path: path });
}
