"use client";

import { useState, useMemo, useCallback } from 'react';
import { getImageUrl } from '../../utils/imageUtils';
import { useUnifiedLightbox } from './UnifiedImageLightbox';

interface Image {
  id?: string;
  url: string;
  alternativeText?: string;
  caption?: string;
}

interface ImagePreviewerProps {
  images: Image[];
  allImages?: any[];
}

export default function ImagePreviewer({ images, allImages }: ImagePreviewerProps) {
  const { openLightbox } = useUnifiedLightbox();

  const validImages = useMemo(
    () => (images || []).filter(img => img?.url),
    [images]
  );

  const slides = useMemo(
    () =>
      validImages.map((img) => ({
        src: getImageUrl(img.url),
        alt: img.alternativeText || '',
      })),
    [validImages]
  );

  const handleImageClick = useCallback((idx: number) => {
    // Find the index of this image in the allImages array
    if (allImages) {
      const imageUrl = getImageUrl(validImages[idx].url);
      const globalIndex = allImages.findIndex(img => img.src === imageUrl);
      if (globalIndex !== -1) {
        openLightbox(globalIndex);
      }
    }
  }, [validImages, allImages, openLightbox]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', e.currentTarget.src);
  };

  if (validImages.length === 0) return null;

  return (
    <>
      {validImages.length === 1 ? (
        <div className="relative group">
          <div className="cursor-pointer" onClick={() => handleImageClick(0)}>
            <div className="h-[400px] sm:h-[900px] md:h-[700px] lg:h-[800px] w-full">
              <img
                src={slides[0].src}
                alt={slides[0].alt}
                loading="lazy"
                onError={handleImageError}
                className="w-full h-full rounded-2xl shadow-lg transition-transform duration-200 group-hover:scale-[1.02] border border-gray-100 object-cover"
              />
            </div>
          </div>
          {validImages[0].caption && (
            <div className="mt-3">
              <p className="text-sm sm:text-base text-gray-600 italic font-light leading-relaxed font-[var(--font-mazzard-soft)]">
                {validImages[0].caption}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`grid gap-3 sm:gap-4 w-full ${
            validImages.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {validImages.map((image, i) => (
            <div
              key={image.id || i}
              className="relative group"
              style={{ height: validImages.length === 2 ? '600px' : '400px' }}
            >
              <div className="cursor-pointer h-full" onClick={() => handleImageClick(i)}>
                <img
                  src={getImageUrl(image.url)}
                  alt={image.alternativeText || `Article image ${i + 1}`}
                  loading="lazy"
                  onError={handleImageError}
                  className="w-full h-full rounded-2xl shadow-md object-cover transition-transform duration-200 group-hover:scale-105 border border-gray-100"
                />
              </div>
              {image.caption && (
                <div className="mt-2">
                  <p className="text-xs sm:text-sm text-gray-600 italic font-light leading-snug font-[var(--font-mazzard-soft)]">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
