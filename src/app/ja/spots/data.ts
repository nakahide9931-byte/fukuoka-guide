export type SpotJa = {
  slug: string;
  image?: string;
  name?: { ja?: string; en?: string } | string;
  summary?: { ja?: string; en?: string } | string;
};

export const spots: SpotJa[] = [
  {
    slug: "dazaifu-tenmangu",
    image: "dazaifu-tenmangu.jpg",
    name: { ja: "太宰府天満宮", en: "Dazaifu Tenmangu Shrine" },
    summary: { ja: "梅と学問の神様。写真映えスポット多数。", en: "Famous for plum blossoms." }
  },
  {
    slug: "nakasu-night",
    image: "nakasu-night.jpg",
    name: { ja: "中洲の夜景", en: "Nakasu Night" },
    summary: { ja: "屋台と川沿いの夜景が人気。", en: "Iconic night food stalls by the river." }
  },
  {
    slug: "itoshima",
    image: "itoshima.jpg",
    name: { ja: "糸島", en: "Itoshima" },
    summary: { ja: "海カフェと絶景ドライブで話題のエリア。", en: "Coastal cafes and scenic drives." }
  }
];
