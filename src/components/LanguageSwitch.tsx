"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
  "data-testid"?: string;
};

export default function LanguageSwitch({ className, style, ...rest }: Props) {
  const pathname = usePathname() ?? "/";
  const isJa = pathname.startsWith("/ja");
  const to = isJa
    ? pathname.replace(/^\/ja/, "/en")
    : pathname.replace(/^\/en/, "/ja");
  const label = isJa ? "English" : "日本語";

  return (
    <Link
      href={to}
      className={className}
      style={style}
      data-testid="lang-switch"
      {...rest}
    >
      {label}
    </Link>
  );
}
