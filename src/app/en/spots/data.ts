export type SpotEn = {
  slug: string;
  image?: string;
  name?: { ja?: string; en?: string } | string;
  summary?: { ja?: string; en?: string } | string;
};

export const spots: SpotEn[] = [
  {
    slug: "dazaifu-tenmangu",
    image: "dazaifu-tenmangu.jpg",
    name: { en: "Dazaifu Tenmangu Shrine", ja: "太宰府天満宮" },
    summary: { en: "Famous for plum blossoms.", ja: "梅と学問の神様。" }
  },
  {
    slug: "nakasu-night",
    image: "nakasu-night.jpg",
    name: { en: "Nakasu Night", ja: "中洲の夜景" },
    summary: { en: "Iconic night food stalls by the river.", ja: "屋台と川沿いの夜景が人気。" }
  },
  {
    slug: "itoshima",
    image: "itoshima.jpg",
    name: { en: "Itoshima", ja: "糸島" },
    summary: { en: "Coastal cafes and scenic drives.", ja: "海カフェと絶景ドライブ。" }
  }
];
