// 例: src/components/AffiliateLink.tsx（抜粋）
import { gaEvent } from '@/lib/ga';

export default function AffiliateLink({
  href,
  children,
  target,
  rel,
  onClick,
  ...rest
}: React.ComponentProps<'a'> & { href: string }) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    try {
      const url = new URL(href, window.location.href);
      const isOutbound = url.host !== window.location.host;

      gaEvent(isOutbound ? 'outbound_click' : 'cta_click', {
        link_url: url.toString(),
        link_domain: url.hostname,
        link_text:
          typeof children === 'string'
            ? children
            : (e.currentTarget.textContent || '').slice(0, 80),
        language: document.documentElement.lang,
      });
    } catch {
      // no-op
    }
    onClick?.(e);
  };

  return (
    <a
      href={href}
      target={target ?? '_blank'}
      rel={rel ?? 'nofollow sponsored noopener noreferrer'}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
