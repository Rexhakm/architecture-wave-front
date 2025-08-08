"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Create context for the unified lightbox
const UnifiedLightboxContext = createContext();

export const useUnifiedLightbox = () => {
  const context = useContext(UnifiedLightboxContext);
  if (!context) {
    throw new Error('useUnifiedLightbox must be used within a UnifiedImageLightbox provider');
  }
  return context;
};

export default function UnifiedImageLightbox({ allImages, children }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Filter out any invalid images
  const validImages = allImages?.filter(img => img?.src) || [];

  const slides = validImages.map(img => ({
    src: img.src,
    alt: img.alt || '',
    description: img.caption || ''
  }));

  const openLightbox = (imageIndex) => {
    if (imageIndex >= 0 && imageIndex < validImages.length) {
      setIndex(imageIndex);
      setOpen(true);
    }
  };

  const closeLightbox = () => {
    setOpen(false);
  };

  const contextValue = {
    openLightbox,
    closeLightbox,
    totalImages: validImages.length
  };

  return (
    <UnifiedLightboxContext.Provider value={contextValue}>
      {children}
      {validImages.length > 0 && (
        <Lightbox
          open={open}
          close={closeLightbox}
          slides={slides}
          index={index}
          animation={{ fade: 500, swipe: 500 }}
          render={{
            iconNext: () => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
            iconPrev: () => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
            iconClose: () => (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ),
          }}
          carousel={{
            finite: true,
            preload: 2
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: true
          }}
          keyboard={{
            Escape: closeLightbox,
            ArrowLeft: () => {
              if (index > 0) {
                setIndex(index - 1);
              }
            },
            ArrowRight: () => {
              if (index < validImages.length - 1) {
                setIndex(index + 1);
              }
            }
          }}
          labels={{
            Next: "Next image",
            Previous: "Previous image",
            Close: "Close lightbox"
          }}
        />
      )}
    </UnifiedLightboxContext.Provider>
  );
} 