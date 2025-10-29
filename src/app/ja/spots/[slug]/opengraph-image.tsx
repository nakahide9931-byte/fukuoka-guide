import { ImageResponse } from 'next/og';
import spots, { type Spot } from '../data';

export const runtime = 'edge';
export const alt = 'OG画像';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const spot = (spots as Spot[]).find((s) => s.slug === params.slug);

  const title = spot?.name ?? 'Find Your Fukuoka';
  const area = spot?.area ?? '';
  const img =
    spot?.image
      ? `${site}/images/spots/${spot.image}`
      : `${site}/hero.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',          // ★ 必須
          flexDirection: 'row',
          backgroundColor: '#0a0a0a',
          color: '#fff',
        }}
      >
        <div style={{ width: 720, height: '100%', display: 'flex' }}>
          <img
            src={img}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 16,
            padding: 48,
          }}
        >
          <div style={{ fontSize: 56, lineHeight: 1.2, fontWeight: 700 }}>
            {title}
          </div>
          {area && (
            <div style={{ fontSize: 28, opacity: 0.9 }}>{area}</div>
          )}
          <div style={{ marginTop: 8, fontSize: 24, opacity: 0.8 }}>
            福岡の旅を見つけよう
          </div>
        </div>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}
