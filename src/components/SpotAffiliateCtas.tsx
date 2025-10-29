'use client';

type Props = {
  spotName: string;
  area: string;
  lang: 'en' | 'ja';
};

const labels = {
  en: { hotels: 'Nearby Hotels', tours: 'Tours around here' },
  ja: { hotels: '近くの宿を探す', tours: '周辺の体験・ツアー' },
};

export default function SpotAffiliateCtas({ spotName, area, lang }: Props) {
  const l = labels[lang];

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const AID = 'YOUR_AID'; // ← あとで自分のAIDに差し替え

  const bookingUrl =
    `https://www.booking.com/searchresults.en.html?ss=${encodeURIComponent(`${spotName} ${area} Fukuoka`)}` +
    `&aid=${AID}&utm_source=fukuoka-guide&utm_medium=affiliate&utm_campaign=spot_hotels&ref=${encodeURIComponent(site)}`;

  const klookUrl =
    `https://www.klook.com/en/search/?query=${encodeURIComponent(`${spotName} ${area} Fukuoka`)}` +
    `&aff_adid=${AID}&utm_source=fukuoka-guide&utm_medium=affiliate&utm_campaign=spot_tours&ref=${encodeURIComponent(site)}`;

  const fire = (event: string, vendor: 'booking' | 'klook') => {
    try {
      (window as any).gtag?.('event', event, { vendor, spot: spotName, area, lang });
    } catch {}
  };

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '12px 0 16px' }}>
      <a
        href={bookingUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="btn primary"
        onClick={() => fire('spot_hotels', 'booking')}
      >
        {l.hotels}
      </a>

      <a
        href={klookUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="btn ghost"
        onClick={() => fire('spot_tours', 'klook')}
      >
        {l.tours}
      </a>
    </div>
  );
}
