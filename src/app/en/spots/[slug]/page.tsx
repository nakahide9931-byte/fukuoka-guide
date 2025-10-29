import Link from 'next/link';
import { notFound } from 'next/navigation';
import spots, { type Spot } from '../data';

type Params = { slug: string };

export function generateStaticParams() {
  return (spots as Spot[]).map((s) => ({ slug: s.slug }));
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const spot = (spots as Spot[]).find((s) => s.slug === slug);
  if (!spot) notFound();

  const img = spot.image ? `/images/spots/${spot.image}` : '/hero.jpg';

  return (
    <main className="wrap">
      <h1 style={{ marginBottom: 8 }}>{spot.name}</h1>
      <div style={{ marginBottom: 12 }}>
        <Link href="/en/spots">← Back to list</Link>
      </div>
      <img
        src={img}
        alt={`${spot.name} photo`}
        style={{ width: '100%', height: 'auto', borderRadius: 12, display: 'block' }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero.jpg'; }}
      />
      {spot.description && <p style={{ marginTop: 12 }}>{spot.description}</p>}
    </main>
  );
}
