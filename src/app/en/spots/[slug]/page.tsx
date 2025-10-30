import SafeImage from "../../../../components/SafeImage";
import { notFound } from "next/navigation";
import { spots } from "../data";

export async function generateStaticParams() {
  return (spots as any[]).map((s: any) => ({ slug: s.slug }));
}

export default async function EnSpotDetail(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;                        // ← await
  const spot = (spots as any[]).find((s: any) => s.slug === slug);
  if (!spot) notFound();

  const title =
    (spot?.name?.en as string) ??
    (spot?.name as string) ??
    (spot?.title as string) ??
    slug;

  const summary =
    (spot?.summary?.en as string) ?? (spot?.summary as string) ?? "";

  return (
    <main style={{ display: "grid", gap: 16 }}>
      <h1>{title}</h1>
      <SafeImage src={spot.image ?? ""} alt={title} width={1200} height={800} />
      {summary && <p style={{ color: "#444" }}>{summary}</p>}
    </main>
  );
}
