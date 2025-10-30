import Link from "next/link";
import { spots } from "./data";
import SafeImage from "../../../components/SafeImage";

export const metadata = { title: "スポット一覧 | Fukuoka Guide" };

export default function JaSpotsIndex() {
  return (
    <main style={{ display: "grid", gap: 24 }}>
      <h1>スポット一覧</h1>
      <ul style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", padding: 0, listStyle: "none" }}>
        {spots.map((s) => {
          const title = (s as any).name?.ja ?? (s as any).name ?? (s as any).title ?? s.slug;
          const summary = (s as any).summary?.ja ?? (s as any).summary ?? "";
          return (
            <li key={s.slug} style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
              <Link href={`/ja/spots/${s.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <SafeImage src={(s as any).image} alt={title} width={800} height={533} />
                <div style={{ padding: 12 }}>
                  <h3 style={{ margin: "8px 0" }}>{title}</h3>
                  {summary && <p style={{ margin: 0, color: "#555" }}>{summary}</p>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
