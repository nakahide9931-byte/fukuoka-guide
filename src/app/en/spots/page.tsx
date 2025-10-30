// src/app/en/spots/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { spots } from './data';

export default function SpotsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Spots</h1>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, listStyle: 'none', padding: 0 }}>
        {(spots as any[]).map((s: any) => (
          <li key={s.slug} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
            <Link href={`/en/spots/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {s.image ? (
                <Image
                  src={s.image}
                  alt={s.title ?? s.name ?? s.slug}
                  width={600}
                  height={338}
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ width: '100%', height: 'auto', borderRadius: 6 }}
                />
              ) : null}
              <h3 style={{ marginTop: 12 }}>{s.title ?? s.name ?? s.slug}</h3>
              {s.description ? <p style={{ color: '#555' }}>{s.description}</p> : null}
              <p style={{ marginTop: 8, color: '#06c' }}>Details →</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
