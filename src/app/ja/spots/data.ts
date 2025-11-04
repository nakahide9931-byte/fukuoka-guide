// src/app/ja/spots/data.ts
export type SpotMeta = {
  title: string;
  image?: string;
};

// 日本語のスポット一覧（こちらも型付き Record）
export const SPOT_META_JA: Record<string, SpotMeta> = {
  "dazaifu-tenmangu": {
    title: "太宰府天満宮",
    image: "dazaifu-tenmangu.jpg",
  },
  "nakasu-night": {
    title: "中洲の夜景",
    image: "nakasu-night.jpg",
  },
  itoshima: {
    title: "糸島",
    image: "itoshima.jpg",
  },
};

// 既存の route/sitemap デバッグ用に使えるよう、別名でも出しておきます
export const spots = SPOT_META_JA;
