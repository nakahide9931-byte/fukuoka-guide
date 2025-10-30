// src/app/ja/spots/data.ts
export type JaSpot = {
  slug: string;
  name: string;
  description: string;
  image?: string;      // /public からの絶対パス
  ogImage?: string;
  twImage?: string;
};

export const spots: JaSpot[] = [
  {
    slug: 'dazaifu-tenmangu',
    name: '太宰府天満宮',
    description: '歴史的な神社と博物館エリア。',
    image: '/images/spots/dazaifu-tenmangu.jpg',
  },
  {
    slug: 'nakasu-night',
    name: '中洲の夜景',
    description: '屋台と川面のリフレクションが美しい夜景スポット。',
    image: '/images/spots/nakasu-night.jpg',
  },
  // ここにスポットを追加していってください
];
