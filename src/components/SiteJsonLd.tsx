// src/components/SiteJsonLd.tsx
type Props = { lang: "en" | "ja" };

export default function SiteJsonLd({ lang }: Props) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";
  const host = (() => {
    try {
      return new URL(site).host;
    } catch {
      return "fukuoka-guide.vercel.app";
    }
  })();
  const name = lang === "ja" ? "Fukuoka Guide（日本語）" : "Fukuoka Guide (English)";

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: `${site}/${lang}`,
      name,
      inLanguage: lang,
      potentialAction: {
        "@type": "SearchAction",
        target: `https://www.google.com/search?q={search_term_string}&sitesearch=${host}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      url: site,
      name: "Fukuoka Guide",
      logo: `${site}/icon.svg`,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
