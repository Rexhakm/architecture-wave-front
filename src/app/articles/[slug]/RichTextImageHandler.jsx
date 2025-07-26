"use client";

import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function RichTextImageHandler({ children }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Find all images in the rich text content
    const imageElements = document.querySelectorAll('.prose img');
    const imageArray = Array.from(imageElements).map((img, idx) => ({
      src: img.src,
      alt: img.alt || `Image ${idx + 1}`,
      element: img
    }));

    setImages(imageArray);

    // Add click handlers to images
    imageArray.forEach((imgData, idx) => {
      imgData.element.addEventListener('click', () => {
        setIndex(idx);
        setOpen(true);
      });
    });

    // Cleanup function
    return () => {
      imageArray.forEach(imgData => {
        imgData.element.removeEventListener('click', () => {});
      });
    };
  }, [children]);

  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map(img => ({ src: img.src, alt: img.alt }))}
        index={index}
        animation={{ fade: 500, swipe: 500 }}
      />
      {children}
    </>
  );
} 