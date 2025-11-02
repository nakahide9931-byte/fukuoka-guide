"use client";

import * as React from "react";
import { trackCta } from "../lib/ga";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  /** GA に送りたい CTA 名。未指定ならテキストから自動抽出 */
  ctaLabel?: string;
};

/**
 * 外部アフィリエイト / CTA リンク
 * - target=_blank / rel=sponsored/nofollow をデフォルト付与
 * - クリック時に GA4 へ `outbound_click` と `cta_click` を送信
 */
export default function AffiliateLink({
  href,
  children,
  ctaLabel,
  rel,
  target,
  onClick,
  ...rest
}: Props) {
  const getText = () => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) {
      const merged = children.filter(c => typeof c === "string").join(" ").trim();
      return merged || undefined;
    }
    return (rest.title as string) || ctaLabel || undefined;
  };

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    try {
      const label = ctaLabel || getText() || "cta";
      trackCta(href, label);
    } catch {
      // no-op（計測に失敗してもリンク遷移は継続）
    }
    onClick?.(e);
  };

  return (
    <a
      href={href}
      target={target ?? "_blank"}
      rel={rel ?? "nofollow sponsored noopener noreferrer"}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
