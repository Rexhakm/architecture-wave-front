"use client"

import React, { useState } from 'react'
import { getImageUrl } from '../utils/imageUtils'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  style?: React.CSSProperties
  fallbackIndex?: number
}

export default function ProductImage({ 
  src, 
  alt, 
  className = "", 
  fallbackSrc = "",
  style = {},
  fallbackIndex = 0
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Use provided fallbackSrc if present; otherwise pick a deterministic Pexels variant
      const pexelsPool = [
        'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/271832/pexels-photo-271832.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
      ]
      const poolIndex = ((fallbackIndex || 0) % pexelsPool.length + pexelsPool.length) % pexelsPool.length
      const chosenFallback = fallbackSrc || pexelsPool[poolIndex]
      setImgSrc(chosenFallback)
    }
  }

  // Reset error state when src changes
  React.useEffect(() => {
    setHasError(false)
    setImgSrc(src)
  }, [src])

  // Use the same image URL handling as articles
  const getImageSrc = (imagePath: string) => {
    // If it's already a complete URL (starts with http), use it directly
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Otherwise, process it through getImageUrl for relative paths
    return getImageUrl(imagePath);
  }

  return (
    <img
      src={getImageSrc(imgSrc)}
      alt={alt}
      className={`rounded-2xl sm:rounded-[45px] ${className}`}
      onError={handleError}
      style={{ 
        objectFit: 'cover',
        width: '100%', 
        height: '100%', 
        ...style 
      }}
    />
  )
} 