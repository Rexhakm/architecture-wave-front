"use client"

import React, { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}

export default function ProductImage({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Product+Image" 
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      console.log(`Image failed to load: ${src}, using fallback`)
      setImgSrc(fallbackSrc)
    }
  }

  // Ensure the src is properly formatted for production
  const getImageSrc = (imagePath: string) => {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    
    // If it starts with /, ensure it's properly formatted
    if (imagePath.startsWith('/')) {
      return imagePath
    }
    
    // If it doesn't start with /, add it
    return `/${imagePath}`
  }

  return (
    <img
      src={getImageSrc(imgSrc)}
      alt={alt}
      className={className}
      onError={handleError}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  )
} 