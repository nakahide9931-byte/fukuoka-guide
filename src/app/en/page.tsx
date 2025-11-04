import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export default function Page() {
  return (
    <main className="wrap">
      <section className="hero">
        <Image
          src="/hero.jpg"
          alt="Fukuoka night view"
          width={1920}
          height={1080}
          sizes="(min-width: 1024px) 960px, 100vw"
          priority
          style={{ width: "100%", height: "auto" }}
        />
        {/* ...以下既存のコンテンツ... */}
      </section>
    </main>
  );
}
