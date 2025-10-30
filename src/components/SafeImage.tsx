import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & { src: string };

/**
 * spot.image にファイル名だけ（例: "nakasu-night.jpg"）が来ても
 * 自動で /images/spots/ を前置して解決する安全ローダー。
 * すでに `/` や `http` で始まる場合はそのまま使用。
 */
export default function SafeImage({ src, alt, ...rest }: Props) {
  const resolved =
    src.startsWith("/") || /^https?:\/\//.test(src)
      ? src
      : `/images/spots/${src}`;
  return <Image src={resolved} alt={alt ?? ""} {...rest} />;
}
