// src/app/ja/spots/data.ts
export type Spot = {
  slug: string;
  name: string;
  area: string;
  time: string;
  description?: string;
  image: string; // /public/images/spots/ 以下
};

export const spots: Spot[] = [
  {
    slug: 'nakasu-night',
    name: '中洲の夜景',
    area: '博多',
    time: '60分',
    description: '屋台と川面のリフレクションが美しい夜景スポット。',
    image: 'nakasu-night.jpg',
  },
  {
    slug: 'itoshima-fields',
    name: '糸島の景色',
    area: '糸島',
    time: '120分',
    description: '広がる畑と空が気持ちいい撮影スポット。',
    image: 'itoshima.jpg',
  },
  {
    slug: 'dazaifu-tenmangu',
    name: '太宰府天満宮',
    area: '太宰府',
    time: '2.5時間',
    description: '歴史的な神社と博物館エリア。',
    image: 'dazaifu.jpg',
  },
];

export default spots;
