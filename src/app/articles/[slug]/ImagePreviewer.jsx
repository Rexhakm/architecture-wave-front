"use client";

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { getImageUrl } from '../../utils/imageUtils';

export default function ImagePreviewer({ images }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Prepare slides for the lightbox
  const slides = images.map((img) => ({
    src: getImageUrl(img.url),
    alt: img.alternativeText || '',
  }));

  const handleImageClick = (idx) => {
    console.log('Image clicked:', idx);
    setIndex(idx);
    setOpen(true);
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
      {images.length === 1 ? (
        <div className="relative cursor-pointer" onClick={() => handleImageClick(0)}>
          <Image
            src={getImageUrl(images[0].url)}
            alt={images[0].alternativeText || 'Article image'}
            width={1000}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      ) : (
        <div className={`grid gap-2 sm:gap-4 w-full ${
          images.length === 2 
            ? 'grid-cols-1 sm:grid-cols-2' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className={`relative group cursor-pointer ${
                images.length >= 2 
                  ? 'aspect-square sm:aspect-[4/5]' 
                  : ''
              }`}
              onClick={() => handleImageClick(imageIndex)}
            >
              <Image
                src={getImageUrl(image.url)}
                alt={image.alternativeText || `Article image ${imageIndex + 1}`}
                fill
                className="rounded-lg shadow-md object-cover transition-transform duration-200 group-hover:scale-105"
                sizes={
                  images.length === 2 
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw" 
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
} 