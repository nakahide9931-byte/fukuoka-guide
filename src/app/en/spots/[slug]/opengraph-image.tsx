import { ImageResponse } from "next/og";
import { spots } from "../data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function EnSpotOgImage({ params: { slug } }: { params: { slug: string } }) {
  const spot = (spots as any[]).find((s: any) => s.slug === slug);
  const title = spot?.name?.en ?? spot?.slug ?? "Fukuoka";
  return new ImageResponse(
    (
      <div style={{
        fontSize: 64, width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#fff"
      }}>
        <div style={{ maxWidth: 1000, textAlign: "center" }}>{title}</div>
      </div>
    ),
    size
  );
}
