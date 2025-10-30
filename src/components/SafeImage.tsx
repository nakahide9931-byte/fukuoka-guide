'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type Props = ImageProps & {
  /** 画像読み込みに失敗したときの代替画像 */
  fallbackSrc?: string;
};

export default function SafeImage({
  fallbackSrc = '/og-default-ja.png',
  alt,
  src,
  ...rest
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src as string);

  return (
    <Image
      {...rest}
      alt={alt}
      src={currentSrc}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  );
}
