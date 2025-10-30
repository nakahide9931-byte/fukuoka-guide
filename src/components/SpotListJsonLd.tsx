type Item = { position: number; name: string; url: string; image?: string };

export default function SpotListJsonLd({ items }: { items: Item[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it) => ({
      "@type": "ListItem",
      position: it.position,
      item: {
        "@type": "Thing",
        name: it.name,
        url: it.url,
        image: it.image
      }
    }))
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
