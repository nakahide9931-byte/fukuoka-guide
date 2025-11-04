// src/app/en/spots/data.ts
export type SpotMeta = {
  title: string;
  image?: string;
};

// 英語のスポット一覧（型付きの Record にするのがポイント）
export const SPOT_META_EN: Record<string, SpotMeta> = {
  "dazaifu-tenmangu": {
    title: "Dazaifu Tenmangu Shrine",
    image: "dazaifu-tenmangu.jpg",
  },
  "nakasu-night": {
    title: "Nakasu Night",
    image: "nakasu-night.jpg",
  },
  itoshima: {
    title: "Itoshima",
    image: "itoshima.jpg",
  },
};

// 既存の route/sitemap デバッグ用に使えるよう、別名でも出しておきます
export const spots = SPOT_META_EN;
