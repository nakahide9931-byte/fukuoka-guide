// src/app/ja/spots/page.tsx
'use client';

import Link from 'next/link';
import spots from './data';

export default function Page() {
  return (
    <main className="wrap">
      <h1>スポット一覧</h1>

      <ul className="grid">
        {spots.map((s) => {
          const img = `/images/spots/${s.image}`;
          return (
            <li
              key={s.slug}
              style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <Link href={`/ja/spots/${s.slug}`} style={{ display: 'block' }}>
                <img
                  src={img}
                  alt={`${s.name} の写真`}
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/hero.jpg';
                  }}
                />
              </Link>

              <div style={{ padding: '12px 12px 16px' }}>
                <h3 style={{ margin: 0 }}>{s.name}</h3>
                {s.description && <p className="desc">{s.description}</p>}
                <p style={{ marginTop: 8 }}>
                  <Link href={`/ja/spots/${s.slug}`}>詳細 →</Link>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
