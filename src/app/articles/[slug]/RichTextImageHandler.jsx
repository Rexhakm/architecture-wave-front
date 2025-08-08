"use client";

import { useState, useEffect, useRef } from 'react';
import { useUnifiedLightbox } from './UnifiedImageLightbox';

export default function RichTextImageHandler({ children, allImages }) {
  const { openLightbox } = useUnifiedLightbox();
  const listenersRef = useRef([]);

  useEffect(() => {
    // Find all images in the rich text content
    const imageElements = document.querySelectorAll('.prose img');
    
    // Clear previous listeners
    listenersRef.current.forEach(({ element, handler }) => {
      element.removeEventListener('click', handler);
    });
    listenersRef.current = [];
    
    // Add click handlers to images
    imageElements.forEach((img, idx) => {
      const handleClick = () => {
        // Find the index of this image in the allImages array
        if (allImages) {
          const globalIndex = allImages.findIndex(globalImg => globalImg.src === img.src);
          if (globalIndex !== -1) {
            openLightbox(globalIndex);
          }
        }
      };
      
      img.addEventListener('click', handleClick);
      listenersRef.current.push({ element: img, handler: handleClick });
    });

    // Cleanup function
    return () => {
      listenersRef.current.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
      listenersRef.current = [];
    };
  }, [children, allImages, openLightbox]);

  return <>{children}</>;
} 