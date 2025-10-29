import Link from 'next/link';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero">
        <img src="/hero.jpg" alt="福岡の夜景" />
        <div className="hero-inner">
          <h1>Welcome to Fukuoka</h1>
          <p>食・文化・自然。九州の玄関口で見つける、あなたの旅。</p>
          <div className="actions">
            <Link href="/ja/spots" className="btn primary">スポットを見る</Link>
            <Link href="/ja/favorites" className="btn ghost">人気ツアー</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
