import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & { src: string };

/** spot.image がファイル名だけでも /images/spots を自動前置 */
export default function SafeImage({ src, alt, ...rest }: Props) {
  const resolved =
    src.startsWith("/") || /^https?:\/\//.test(src)
      ? src
      : `/images/spots/${src}`;
  return <Image src={resolved} alt={alt ?? ""} {...rest} />;
}
