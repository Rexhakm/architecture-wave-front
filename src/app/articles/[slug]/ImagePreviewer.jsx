"use client";

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function ImagePreviewer({ images }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Prepare slides for the lightbox
  const slides = images.map((img) => ({
    src: `http://localhost:1337${img.url}`,
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, imageIndex) => (
          <div key={imageIndex} className="relative group cursor-pointer" onClick={() => handleImageClick(imageIndex)}>
            <Image
              src={`http://localhost:1337${image.url}`}
              alt={image.alternativeText || `Article image ${imageIndex + 1}`}
              width={400}
              height={300}
              className="w-full h-auto rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </>
  );
} 