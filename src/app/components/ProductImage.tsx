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
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  )
} 