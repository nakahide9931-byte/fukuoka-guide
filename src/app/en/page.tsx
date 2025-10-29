import Link from 'next/link';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero">
        <img src="/hero.jpg" alt="Fukuoka night view" />
        <div className="hero-inner">
          <h1>Welcome to Fukuoka</h1>
          <p>Discover food, culture, and nature in Kyushu’s vibrant heart.</p>
          <div className="actions">
            <Link href="/en/spots" className="btn primary">Explore Spots</Link>
            <Link href="/en/favorites" className="btn ghost">Top Tours</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
