"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Heart, Share2, Star } from "lucide-react"
import Header from "../../components/Header"
import Link from "next/link"
import { getProductById, featuredProducts, exclusiveProducts } from "../../data/products"

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false)

  // Get product data based on ID
  const product = getProductById(params.id)
  
  // If product not found, show a fallback
  if (!product) {
    return (
      <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white rounded-3xl pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
        <Header />
        <div className="text-center py-12">
          <h1 className="text-2xl font-light text-gray-900 mb-4">Product not found</h1>
          <Link href="/shop" className="text-blue-600 hover:text-blue-800">
            Return to shop
          </Link>
        </div>
      </main>
    )
  }

  // Get related products (excluding current product)
  const allProducts = [...featuredProducts, ...exclusiveProducts]
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white rounded-3xl pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
      <Header />
      
      {/* Product Detail */}
      <div className="bg-white rounded-lg overflow-hidden mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="aspect-square relative bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
              <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-light text-gray-900 mb-2" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-light text-gray-900" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {product.price}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(product.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  ({product.reviews || 0} reviews)
                </span>
              </div>
              <div className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                <span className="font-medium">Seller:</span> {product.brand}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                {product.description}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                {product.longDescription}
              </p>
            </div>

            {/* Purchase */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <a 
                href="https://huckberry.com/store/onsen/category/p/52245-bath-bundle-large?utm_medium=affiliate&utm_source=dwell.com&clickref=1100lBjKSvsp&utm_content=partnerize" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded transition-colors inline-block text-center" 
                style={{ fontFamily: 'var(--font-mazzard-soft)' }}
              >
                SHOP
              </a>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>Features</h3>
              <ul className="space-y-2 text-sm text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                {product.features?.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                )) || <li>No features listed</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-xl font-light text-gray-900 mb-6" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
          You might also like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <Link 
              key={item.id} 
              href={`/shop/${item.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-square bg-gray-100 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 text-sm mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs mb-2" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {item.brand}
                </p>
                <p className="font-medium text-gray-900" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
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