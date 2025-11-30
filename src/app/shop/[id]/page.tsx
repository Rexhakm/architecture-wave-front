"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import ProductImage from "../../components/ProductImage"
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import Link from "next/link"
import { fetchProductById, fetchProducts } from "../../utils/apiService"
import { exclusiveProducts } from "../../data/products"
import { absOrFallback } from "../../utils/urlUtils";
import { Product } from "../../types/product";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Fetch product data and related products
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch the specific product
        const productData = await fetchProductById(params.id)
        if (!productData) {
          setError('Product not found')
          return
        }
        setProduct(productData)
        setCurrentImageIndex(0) // Reset to first image when product changes
        console.log('=== Product Detail Debug ===');
        console.log('Product:', productData);
        console.log('Product images array:', productData.images);
        console.log('Number of images:', productData.images?.length || 0);
        if (productData.images) {
          productData.images.forEach((img, idx) => {
            console.log(`Image ${idx}:`, img);
          });
        }

        // Fetch all products for related products
        const allProducts = await fetchProducts()
        const related = [...allProducts, ...exclusiveProducts]
          .filter(p => p.id !== productData.id)
          .slice(0, 4)
        setRelatedProducts(related)
      } catch (err) {
        setError('Failed to load product')
        console.error('Error loading product:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProductData()
  }, [params.id])

  // Show loading state
  if (isLoading) {
    return (
      <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px' }}>
        <Header />
        <div className="text-center py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </main>
    )
  }

  // Show error state
  if (error || !product) {
    return (
      <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px' }}>
        <Header />
        <div className="text-center py-12">
          <h1 className="text-2xl font-light text-gray-900 mb-4">{error || 'Product not found'}</h1>
          <Link href={absOrFallback('/shop')} className="text-blue-600 hover:text-blue-800">
            Return to shop
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white rounded-2xl pb-12 sm:pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px' }}>
      <Header />
      
      {/* Product Detail */}
      <div className="ml-0 sm:ml-[55px] sm:mr-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-0">
        
          {/* Product Image */}
          <div className="relative flex flex-col gap-4 p-8 sm:p-12 bg-white">
            {/* Main Image with Navigation */}
            <div className="relative flex-1 flex items-center justify-center group">
              {product.images && product.images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev > 0 ? prev - 1 : product.images!.length - 1
                    )}
                    className="absolute left-4 z-10 bg-white/80 hover:bg-white p-2 transition-colors"
                    aria-label="Previous image"
                  >
                    <Image 
                      src="/assets/left_black_arr.png" 
                      alt="Previous" 
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </button>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev < product.images!.length - 1 ? prev + 1 : 0
                    )}
                    className="absolute right-4 z-10 bg-white/80 hover:bg-white p-2 transition-colors"
                    aria-label="Next image"
                  >
                    <Image 
                      src="/assets/right_black_arr.png" 
                      alt="Next" 
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </button>
                </>
              )}
              
              <ProductImage
                src={product.images && product.images.length > 0 
                  ? product.images[currentImageIndex] 
                  : product.image}
                alt={product.name}
                className="w-full object-contain transition-all duration-300 group-hover:brightness-90"
                style={{ maxHeight: '800px' }}
              />
            </div>

            {/* Thumbnails - only show if multiple images, displayed below main image */}
            {product.images && product.images.length > 1 && (
              <div className="flex flex-row gap-2 justify-center flex-wrap">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-black'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <ProductImage
                      src={img}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

        {/* Product Information */}
        <div className="p-6 sm:p-8 lg:p-12 space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
              {product.name}
            </h1>
            <div className="mb-6">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-black" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                {product.price}
              </span>
            </div>
          </div>

          {/* Purchase */}
          <div className="mb-6">
            <a 
              href="https://huckberry.com/store/onsen/category/p/52245-bath-bundle-large?utm_medium=affiliate&utm_source=dwell.com&clickref=1100lBjKSvsp&utm_content=partnerize" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-black hover:bg-gray-900 text-white font-medium py-4 px-6 text-center text-sm sm:text-base transition-colors block" 
              style={{ fontFamily: 'var(--font-mazzard-soft)' }}
            >
              SHOP
            </a>
          </div>

          <div className="space-y-4">
            <p className="text-base sm:text-lg text-gray-900 leading-relaxed" style={{ 
              fontFamily: 'Spectral, serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '23.9px',
              letterSpacing: '0%'
            }}>
              {product.description}
            </p>
            {product.longDescription && product.longDescription !== product.description && (
              <p className="text-base sm:text-lg text-gray-900 leading-relaxed" style={{ 
                fontFamily: 'Spectral, serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '23.9px',
                letterSpacing: '0%'
              }}>
                {product.longDescription}
              </p>
            )}
          </div>

          {/* Share Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 text-sm sm:text-base transition-colors inline-flex items-center gap-2"
              style={{ fontFamily: 'var(--font-mazzard-soft)' }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 17l9.2-9.2M17 8v9m-9-9h9"
                />
              </svg>
              SHARE
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="ml-0 sm:ml-[100px] sm:mr-[50px] mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-6 sm:mb-8" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
          Similar &amp; Suggested
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts.map((item) => (
            <Link 
              key={item.id} 
              href={absOrFallback(`/shop/${item.id}`)}
              className="group cursor-pointer relative"
            >
              {/* Image container */}
              <div className="relative bg-white overflow-hidden h-56 sm:h-64">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                  fallbackIndex={Number(item.id)}
                />

                {/* Hover overlay bar */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 flex items-center justify-between px-3 py-2">
                  <div
                    className="text-xs sm:text-sm font-bold text-gray-800"
                    style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                  >
                    Buy {item.price}
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Product name + brand */}
              <div
                className="mt-2 text-xs sm:text-sm font-medium text-black transition-colors duration-300 group-hover:text-gray-700"
                style={{ fontFamily: 'var(--font-mazzard-soft)' }}
              >
                {item.name}
              </div>
              <div
                className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-600"
                style={{ fontFamily: 'var(--font-mazzard-soft)' }}
              >
                {item.brand}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
