import SafeImage from "../../../../components/SafeImage";
import { spots } from "../data";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return spots.map((s) => ({ slug: s.slug }));
}

export default function JaSpotDetail({ params: { slug } }: Params) {
  const spot = spots.find((s) => s.slug === slug);
  if (!spot) return <main><h1>見つかりませんでした</h1></main>;

  const title = (spot as any).name?.ja ?? (spot as any).name ?? (spot as any).title ?? spot.slug;
  const summary = (spot as any).summary?.ja ?? (spot as any).summary ?? "";

  return (
    <main style={{ display: "grid", gap: 16 }}>
      <h1>{title}</h1>
      <SafeImage src={(spot as any).image} alt={title} width={1200} height={800} />
      {summary && <p style={{ color: "#444" }}>{summary}</p>}
    </main>
  );
}
