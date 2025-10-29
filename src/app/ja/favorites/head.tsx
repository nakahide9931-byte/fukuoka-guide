// src/app/ja/favorites/head.tsx
export default function Head() {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const url = `${site}/ja/favorites`;
  const title = 'お気に入り — Find Your Fukuoka';
  const description = '保存した福岡のスポット一覧。';

  const image = `${site}/hero.jpg`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* canonical / alternate */}
      <link rel="canonical" href={url} />
      <link rel="alternate" href={`${site}/ja/favorites`} hrefLang="ja" />
      <link rel="alternate" href={`${site}/en/favorites`} hrefLang="en" />
      <link rel="alternate" href={url} hrefLang="x-default" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Find Your Fukuoka" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favorites はインデックス不要 */}
      <meta name="robots" content="noindex,follow" />
    </>
  );
}
