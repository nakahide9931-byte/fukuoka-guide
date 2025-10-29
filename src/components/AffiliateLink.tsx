// src/components/AffiliateLink.tsx
'use client';

type Props = {
  href: string;
  event: 'spot_hotels' | 'spot_tours' | 'cta_hotels' | 'cta_tours';
  className?: string;
  children: React.ReactNode;
};

export default function AffiliateLink({ href, event, className, children }: Props) {
  const onClick = () => {
    try {
      (window as any).gtag?.('event', event, { transport_type: 'beacon' });
    } catch {}
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
