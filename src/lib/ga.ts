/* eslint-disable @typescript-eslint/no-explicit-any */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const isBrowser = typeof window !== "undefined";

function hasGA(): boolean {
  return isBrowser && typeof window.gtag === "function" && !!GA_ID;
}

export function gaEvent(name: string, params: Record<string, any> = {}) {
  if (!hasGA()) return;
  try {
    window.gtag("event", name, params);
  } catch {
    // no-op
  }
}

function safeHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

function pagePath(): string {
  return isBrowser ? location.pathname : "";
}

function lang(): string {
  return isBrowser ? (document.documentElement.lang || "") : "";
}

/**
 * 汎用：外部リンククリック
 */
export function trackOutbound(linkUrl: string, linkText?: string, meta: Record<string, any> = {}) {
  gaEvent("outbound_click", {
    link_url: linkUrl,
    link_domain: safeHostname(linkUrl),
    link_text: linkText,
    page_path: pagePath(),
    language: lang(),
    ...meta,
  });
}

/**
 * CTAクリック（自分用のカスタムイベント）
 * - outboud_click も合わせて送ります
 */
export function trackCta(linkUrl: string, ctaLabel: string, meta: Record<string, any> = {}) {
  trackOutbound(linkUrl, ctaLabel, { cta: ctaLabel, ...meta });
  gaEvent("cta_click", {
    link_url: linkUrl,
    cta: ctaLabel,
    page_path: pagePath(),
    language: lang(),
    ...meta,
  });
}
