import React, { useState } from 'react';

export interface ArchivalImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  variant?: 'thumbnail' | 'card' | 'hero' | 'full';
  fallbackSrc?: string;
  pictureClassName?: string;
}

const DEFAULT_FALLBACK = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/konark_sun_temple_structure.jpg`;

/**
 * Derive responsive WebP srcSet for verified local archive images (`/assets/archive/<name>.jpg`)
 * while preserving the original `.jpg` file as the canonical `<img>` fallback.
 */
export function resolveArchiveWebpSources(
  src: string,
  variant: 'thumbnail' | 'card' | 'hero' | 'full' = 'card',
  customSizes?: string
): { webpSrcSet: string | null; sizes: string } {
  if (!src) {
    return { webpSrcSet: null, sizes: customSizes || '100vw' };
  }

  const match = src.match(/^(.*\/assets\/archive\/[^/?#]+)\.jpg$/i);
  if (!match) {
    return { webpSrcSet: null, sizes: customSizes || '100vw' };
  }

  const base = match[1];

  if (variant === 'thumbnail') {
    return {
      webpSrcSet: `${base}-480w.webp 480w`,
      sizes: customSizes || '120px'
    };
  }

  if (variant === 'card') {
    return {
      webpSrcSet: `${base}-480w.webp 480w, ${base}-960w.webp 960w`,
      sizes: customSizes || '(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px'
    };
  }

  if (variant === 'hero') {
    return {
      webpSrcSet: `${base}-480w.webp 480w, ${base}-960w.webp 960w, ${base}.webp 1280w`,
      sizes: customSizes || '(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 720px'
    };
  }

  // 'full' variant for lightbox / full-resolution viewing
  return {
    webpSrcSet: `${base}-960w.webp 960w, ${base}.webp 1600w`,
    sizes: customSizes || '100vw'
  };
}

export const ArchivalImage: React.FC<ArchivalImageProps> = React.memo(
  ({
    src,
    alt,
    width,
    height,
    sizes,
    priority = false,
    variant = 'card',
    fallbackSrc = DEFAULT_FALLBACK,
    className = '',
    pictureClassName = 'block w-full h-full',
    onError,
    ...rest
  }) => {
    const [failed, setFailed] = useState(false);

    const activeSrc = failed || !src ? fallbackSrc : src;

    const defaultWidth =
      width ?? (variant === 'thumbnail' ? 160 : variant === 'card' ? 640 : 1200);
    const defaultHeight =
      height ?? (variant === 'thumbnail' ? 160 : variant === 'card' ? 400 : 675);

    const { webpSrcSet, sizes: resolvedSizes } = resolveArchiveWebpSources(
      activeSrc,
      variant,
      sizes
    );

    const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (!failed && activeSrc !== fallbackSrc) {
        setFailed(true);
      }
      if (onError) {
        onError(e);
      }
    };

    const imgElement = (
      <img
        src={activeSrc}
        alt={alt}
        width={defaultWidth}
        height={defaultHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        onError={handleImgError}
        className={className}
        {...rest}
      />
    );

    if (!webpSrcSet) {
      return imgElement;
    }

    return (
      <picture className={pictureClassName}>
        <source type="image/webp" srcSet={webpSrcSet} sizes={resolvedSizes} />
        {imgElement}
      </picture>
    );
  }
);

ArchivalImage.displayName = 'ArchivalImage';
