"use client"

import React, { useState, useEffect } from "react"
import ProductImage from "../../components/ProductImage"
import { Heart, Share2, Star } from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer";
import Link from "next/link"
import { fetchProductById, fetchProducts } from "../../utils/apiService"
import { exclusiveProducts } from "../../data/products"
import { absOrFallback } from "../../utils/urlUtils";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        
        {/* Product Image */}
        <div className="relative flex items-center justify-center bg-white rounded-lg p-6">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="max-h-80 object-contain"
          />
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-1.5 sm:p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
            >
              <Heart
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
            <button className="p-1.5 sm:p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
              {product.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 gap-2 sm:gap-0">
              <span className="text-xl sm:text-2xl font-light text-gray-900" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                {product.price}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full self-start sm:self-auto" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                Free Shipping
              </span>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(product.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-500" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                ({product.reviews || 0} reviews)
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
              <span className="font-medium">Seller:</span> {product.brand}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
              {product.description}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
              {product.longDescription}
            </p>
          </div>

          {/* Purchase */}
          <div className="space-y-4 border-t border-gray-200 pt-4 sm:pt-6">
            <a 
              href="https://huckberry.com/store/onsen/category/p/52245-bath-bundle-large?utm_medium=affiliate&utm_source=dwell.com&clickref=1100lBjKSvsp&utm_content=partnerize" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded transition-colors inline-block text-center text-sm sm:text-base" 
              style={{ fontFamily: 'var(--font-mazzard-soft)' }}
            >
              SHOP
            </a>
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>Features</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
              {product.features?.map((feature: string, index: number) => (
                <li key={index}>• {feature}</li>
              )) || <li>No features listed</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-8 sm:mt-12 px-4 sm:px-0">
        <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
          You might also like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
          {relatedProducts.map((item) => (
            <Link 
              key={item.id} 
              href={absOrFallback(`/shop/${item.id}`)}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-center bg-white p-4 h-40">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-1 sm:mb-2" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {item.brand}
                </p>
                <p className="font-medium text-gray-900 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
