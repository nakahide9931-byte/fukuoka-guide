// 英語メタデータ（一覧生成・JSON-LD・OG/Twitterで再利用）
export type SpotMeta = {
  title: string;
  description: string;
  image?: string; // 一覧用サムネ
  hero?: string;  // 詳細ページのヒーロー画像(任意)
};

export const SPOT_META_EN: Record<string, SpotMeta> = {
  "dazaifu-tenmangu": {
    title: "Dazaifu Tenmangu Shrine",
    description: "Famous for plum blossoms.",
    image: "/images/spots/dazaifu-tenmangu.jpg",
  },
  "nakasu-night": {
    title: "Nakasu Night",
    description: "Iconic night food stalls by the river.",
    image: "/images/spots/nakasu-night.jpg",
  },
  itoshima: {
    title: "Itoshima",
    description: "Coastal cafes and scenic drives.",
    image: "/images/spots/itoshima.jpg",
  },
};
