// 日本語メタデータ
export type SpotMeta = {
  title: string;
  description: string;
  image?: string;
  hero?: string;
};

export const SPOT_META_JA: Record<string, SpotMeta> = {
  "dazaifu-tenmangu": {
    title: "太宰府天満宮",
    description: "梅と学問の神様。写真映えスポット多数。",
    image: "/images/spots/dazaifu-tenmangu.jpg",
  },
  "nakasu-night": {
    title: "中洲の夜景",
    description: "屋台と川沿いの夜景が人気。",
    image: "/images/spots/nakasu-night.jpg",
  },
  itoshima: {
    title: "糸島",
    description: "海カフェと絶景ドライブで話題のエリア。",
    image: "/images/spots/itoshima.jpg",
  },
};
