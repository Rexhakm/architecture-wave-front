"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductImage from "../../components/ProductImage";
import Link from "next/link";
import { fetchProducts } from "../../utils/apiService";
import { Product } from "../../types/product";
import { absOrFallback } from "../../utils/urlUtils";

export default function BrandPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'articles'>('products');

  // Decode brand name from slug (replace hyphens with spaces)
  const brandName = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await fetchProducts();
        // Filter products by brand (case-insensitive)
        const brandProducts = allProducts.filter(p => 
          p.brand.toLowerCase() === brandName.toLowerCase()
        );
        setProducts(brandProducts);
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (brandName) {
      loadProducts();
    }
  }, [brandName]);

  const productCount = products.length;
  const articleCount = 0; // TODO: Implement article fetching by brand

  return (
    <>
      <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white rounded-2xl pb-12 sm:pb-24 min-h-[calc(100vh-690px)]" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px', marginBottom: 40, position: 'relative', zIndex: 1 }}>
        <Header />

        <div className="ml-0 sm:ml-[98px] sm:mr-[92px]">
          {/* Brand Header Section */}
          <section className="py-8 sm:py-12 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {brandName}
                </h1>
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-transparent border border-black text-black hover:bg-black hover:text-white'
                }`}
                style={{ fontFamily: 'var(--font-mazzard-soft)' }}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex flex-wrap gap-4 sm:gap-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('products')}
                className={`pb-4 px-2 text-sm font-medium transition-colors ${
                  activeTab === 'products'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black'
                }`}
                style={{ fontFamily: 'var(--font-mazzard-soft)' }}
              >
                {productCount} {productCount === 1 ? 'Product' : 'Products'}
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={`pb-4 px-2 text-sm font-medium transition-colors ${
                  activeTab === 'articles'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-black'
                }`}
                style={{ fontFamily: 'var(--font-mazzard-soft)' }}
              >
                {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
              </button>
            </nav>
          </section>

          {/* Content Section */}
          {activeTab === 'products' && (
            <section className="mb-12">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-56 sm:h-64 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-black" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                      Products
                    </h2>
                    <Link
                      href={absOrFallback(`/shop/all?brand=${encodeURIComponent(brandName)}`)}
                      className="text-sm font-medium text-black hover:text-gray-600 flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                    >
                      View All
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4" style={{ gap: '2.5rem' }}>
                    {products.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={absOrFallback(`/shop/${product.id}`)}
                        className="group cursor-pointer relative"
                      >
                        {/* Image container */}
                        <div className="relative bg-white overflow-hidden h-56 sm:h-64 rounded-lg">
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                            fallbackIndex={Number(product.id)}
                          />

                          {/* Hover overlay bar */}
                          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white flex items-center justify-between px-3 py-2" style={{ opacity: 1 }}>
                            <div
                              className="text-xs sm:text-sm font-bold text-black"
                              style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                            >
                              Buy {product.price}
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
                          className="mt-2 text-xs sm:text-sm font-medium text-black"
                          style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                        >
                          {product.name}
                        </div>
                        <div
                          className="text-xs text-black"
                          style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                        >
                          {product.brand}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                    No products found for {brandName}
                  </p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'articles' && (
            <section className="mb-12">
              <div className="text-center py-12">
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  No articles found for {brandName}
                </p>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}


