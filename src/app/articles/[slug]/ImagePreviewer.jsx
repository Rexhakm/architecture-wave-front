"use client";

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { getImageUrl } from '../../utils/imageUtils.ts';

export default function ImagePreviewer({ images }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Filter out invalid images
  const validImages = images.filter(img => img && img.url);

  if (validImages.length === 0) return null;

  // Prepare slides for the lightbox
  const slides = validImages.map((img) => ({
    src: getImageUrl(img.url),
    alt: img.alternativeText || '',
  }));

  const handleImageClick = (idx) => {
    console.log('Image clicked:', idx);
    setIndex(idx);
    setOpen(true);
  };

  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    // You could set a fallback image here if needed
  };

  console.log('Lightbox open:', open, 'Index:', index);

  return (
    <>
      <Lightbox
        open={open}
        close={() => { console.log('Lightbox closed'); setOpen(false); }}
        slides={slides}
        index={index}
        animation={{ fade: 500, swipe: 500 }}
      />
      {validImages.length === 1 ? (
        <div className="relative group">
          <div className="cursor-pointer" onClick={() => handleImageClick(0)}>
            <div className="h-[400px] sm:h-[900px] md:h-[700px] lg:h-[800px] w-full">
              <img
                src={getImageUrl(validImages[0].url)}
                alt={validImages[0].alternativeText || 'Article image'}
                className="w-full h-full rounded-2xl shadow-lg transition-transform duration-200 group-hover:scale-[1.02] border border-gray-100 object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
          {validImages[0].caption && (
            <div className="mt-3">
              <p className="text-sm sm:text-base text-gray-600 italic" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 400,
                lineHeight: '1.5'
              }}>
                {validImages[0].caption}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className={`grid gap-3 sm:gap-4 w-full ${
          validImages.length === 2 
            ? 'grid-cols-1 sm:grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {validImages.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className={`relative group ${
                validImages.length >= 2 
                  ? 'aspect-square sm:aspect-[4/5]' 
                  : ''
              }`}
            >
              <div className="cursor-pointer" onClick={() => handleImageClick(imageIndex)}>
                <img
                  src={getImageUrl(image.url)}
                  alt={image.alternativeText || `Article image ${imageIndex + 1}`}
                  className="w-full h-full rounded-2xl shadow-md object-cover transition-transform duration-200 group-hover:scale-105 border border-gray-100"
                  onError={handleImageError}
                />
              </div>
              {image.caption && (
                <div className="mt-2">
                  <p className="text-xs sm:text-sm text-gray-600 italic" style={{
                    fontFamily: 'var(--font-mazzard-soft)',
                    fontWeight: 400,
                    lineHeight: '1.4'
                  }}>
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