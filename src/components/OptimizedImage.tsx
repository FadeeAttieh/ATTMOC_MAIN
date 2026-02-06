import Image from 'next/image';
import { CSSProperties } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  objectPosition?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
  sizes?: string;
}

/**
 * Optimized Image component using Next.js Image
 * - Automatic format selection (WebP, AVIF)
 * - Responsive image serving
 * - Lazy loading
 * - Blur placeholder support
 */
export default function OptimizedImage({
  src,
  alt,
  width = 1920,
  height = 1080,
  priority = false,
  className = '',
  style,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  placeholder = 'empty',
  blurDataURL,
  quality = 85,
  sizes,
}: OptimizedImageProps) {
  // Use external images from Sanity
  const isExternal = src.startsWith('http') || src.startsWith('//');
  
  const imageProps = {
    src,
    alt,
    priority,
    quality,
    placeholder: (placeholder && blurDataURL) ? placeholder : 'empty',
    blurDataURL: placeholder === 'blur' ? blurDataURL : undefined,
    sizes: sizes || '(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 1200px',
    className,
    style: {
      objectFit,
      objectPosition,
      ...style,
    },
  } as any;

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  // Local images
  if (!isExternal) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    );
  }

  // External images (from Sanity or other sources)
  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
      unoptimized={isExternal && !src.includes('cdn.sanity.io')}
    />
  );
}
