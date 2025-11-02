// src/components/SeoJsonLd.tsx
// ※ 'use client' は付けません（サーバー側で静的に出力したいため）

type BreadcrumbItem = { name: string; href: string };

function JsonLd({ json }: { json: unknown }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

/** サイト全体（Organization / WebSite） */
export function SiteJsonLd({
  name,
  url,
  logo = "/icon.svg",
}: {
  name: string;
  url: string;
  logo?: string;
}) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: `${url}${logo}`,
  };

  const web = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };

  return (
    <>
      <JsonLd json={org} />
      <JsonLd json={web} />
    </>
  );
}

/** パンくず */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.href,
    })),
  };
  return <JsonLd json={json} />;
}

/** スポット詳細（観光地） */
export function SpotJsonLd({
  lang,
  slug,
  name,
  description,
  imageUrl,
  siteUrl,
}: {
  lang: "ja" | "en";
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  siteUrl: string;
}) {
  const url = `${siteUrl}/${lang}/spots/${slug}`;

  const json = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    image: [imageUrl],
    url,
    inLanguage: lang,
    isPartOf: {
      "@type": "WebSite",
      name: "Fukuoka Guide",
      url: siteUrl,
    },
    subjectOf: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLd json={json} />;
}
