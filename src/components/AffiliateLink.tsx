import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<LinkProps> & React.HTMLAttributes<HTMLAnchorElement>;

export default function AffiliateLink({ children, ...rest }: Props) {
  return (
    <Link
      {...rest}
      target="_blank"
      rel="nofollow sponsored noopener"
      style={{
        display: 'inline-block',
        textDecoration: 'underline',
        fontWeight: 500,
      }}
    >
      {children}
    </Link>
  );
}
