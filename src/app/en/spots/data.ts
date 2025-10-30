// src/app/en/spots/data.ts
export type EnSpot = {
  slug: string;
  title: string;
  description: string;
  image?: string;      // /public からの絶対パス
  ogImage?: string;
  twImage?: string;
};

export const spots: EnSpot[] = [
  {
    slug: 'dazaifu-tenmangu',
    title: 'Dazaifu Tenmangu',
    description: 'Historic shrine and museum district.',
    image: '/images/spots/dazaifu-tenmangu.jpg',
  },
  {
    slug: 'nakasu-night',
    title: 'Nakasu Night View',
    description: 'Beautiful night reflections and yatai food stalls.',
    image: '/images/spots/nakasu-night.jpg',
  },
  // ここにスポットを追加していってください
];
