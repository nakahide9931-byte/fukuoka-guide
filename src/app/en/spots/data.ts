// src/app/en/spots/data.ts
export type Spot = {
  slug: string;
  name: string;
  area: string;
  time: string;
  description?: string;
  image: string; // relative to /public/images/spots/
};

export const spots: Spot[] = [
  {
    slug: 'nakasu-night',
    name: 'Nakasu Nightscape',
    area: 'Hakata',
    time: '60 min',
    description: 'Vibrant nightlife by the river with beautiful reflections.',
    image: 'nakasu-night.jpg',
  },
  {
    slug: 'itoshima-fields',
    name: 'Itoshima Fields & Sea',
    area: 'Itoshima',
    time: 'Half day',
    description: 'Beaches and cafés west of Fukuoka.',
    image: 'itoshima.jpg',
  },
  {
    slug: 'dazaifu-tenmangu',
    name: 'Dazaifu Tenmangu',
    area: 'Dazaifu',
    time: '2.5 hours',
    description: 'Historic shrine and museum district.',
    image: 'dazaifu.jpg',
  },
];

export default spots;
