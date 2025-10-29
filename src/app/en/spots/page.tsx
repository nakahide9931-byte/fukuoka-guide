'use client';

import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';
import spots from './data';

export default function Page() {
  return (
    <main className="wrap">
      <ul className="grid">
        {spots.map((s) => {
          const img = s.image ? `/images/spots/${s.image}` : '/hero.jpg';
          return (
            <li key={s.slug} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
              <Link href={`/en/spots/${s.slug}`} style={{ display: 'block' }}>
                <img
                  src={img}
                  alt={`${s.name} photo`}
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero.jpg'; }}
                />
              </Link>
              <div style={{ padding: '12px 12px 16px' }}>
                <h3 style={{ margin: 0 }}>
                  {s.name}{' '}
                  <FavoriteButton slug={s.slug} className="btn small ghost" label={{ save: '☆ Save', remove: '★ Saved' }} />
                </h3>
                {s.description && <p style={{ margin: '8px 0 12px' }}>{s.description}</p>}
                <p style={{ margin: 0 }}>
                  <span style={{ marginRight: 8 }}>⏱ {s.time}</span>
                  <span>📍 {s.area}</span>
                </p>
                <p style={{ margin: '8px 0 0' }}><Link href={`/en/spots/${s.slug}`}>Detail →</Link></p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
