'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
}

export function BlogImage({ src, alt, title, className = '', priority = false }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc !== '/images/blog/default.jpg') {
      setImgSrc('/images/blog/default.jpg');
      setHasError(false); // Reset error state when falling back
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    // Final fallback - show a placeholder
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500 p-8">
          <div className="text-4xl mb-2">🖼️</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        title={title}
        fill
        className={`object-cover rounded-2xl transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  );
}