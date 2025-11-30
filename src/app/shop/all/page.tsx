"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import ProductImage from "../../components/ProductImage";
import Link from "next/link";
import { categories } from "../../data/products";
import { fetchProducts } from "../../utils/apiService";
import { Product, Category } from "../../types/product";
import { absOrFallback } from "../../utils/urlUtils";

// Extended categories list based on screenshot
// Maps to actual category slugs used in /shop/category/[slug]
const allCategories = [
  { name: "Editor's Picks", slug: "editors-picks", categorySlug: null }, // No category page, stays on all
  { name: "Furniture", slug: "furniture", categorySlug: "furniture" },
  { name: "Kitchen & Dining", slug: "kitchen-dining", categorySlug: "kitchen" },
  { name: "Bath & Bed", slug: "bath-bed", categorySlug: "bathroom" },
  { name: "Decor & More", slug: "decor-more", categorySlug: "decor" },
  { name: "Lighting & Fans", slug: "lighting-fans", categorySlug: "lighting" },
  { name: "Textiles", slug: "textiles", categorySlug: "textiles" },
  { name: "Storage", slug: "storage", categorySlug: "storage" },
  { name: "Rugs & Flooring", slug: "rugs-flooring", categorySlug: null }, // No category page
  { name: "Tech", slug: "tech", categorySlug: null }, // No category page
  { name: "Fashion & Travel", slug: "fashion-travel", categorySlug: null }, // No category page
  { name: "Books & Media", slug: "books-media", categorySlug: null }, // No category page
  { name: "Office", slug: "office", categorySlug: null } // No category page
];

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 36;

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProducts = await fetchProducts();
        console.log('Fetched products from Strapi:', fetchedProducts.length);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      // Filter products by category (you may need to adjust this based on your product data structure)
      const filtered = products.filter((product) => {
        const productCategory = product.category?.toLowerCase() || '';
        const selected = selectedCategory.toLowerCase();
        
        // Map category slugs to actual category names
        const categoryMap: Record<string, string[]> = {
          "editors-picks": ["featured", "editor", "pick"],
          "furniture": ["furniture", "chair", "sofa", "table", "desk", "bed"],
          "kitchen-dining": ["kitchen", "dining", "oven", "stove", "refrigerator"],
          "bath-bed": ["bath", "bed", "bathroom", "bedroom"],
          "decor-more": ["decor", "textile", "vase", "artwork", "mirror"],
          "lighting-fans": ["lighting", "light", "lamp", "fan"],
          "rugs-flooring": ["rug", "flooring", "carpet"],
          "tech": ["tech", "technology", "electronic"],
          "fashion-travel": ["fashion", "travel", "bag", "luggage"],
          "books-media": ["book", "media", "magazine"],
          "office": ["office", "desk", "chair"]
        };
        
        const searchTerms = categoryMap[selected] || [selected];
        return searchTerms.some(term => productCategory.includes(term));
      });
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, products]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 15) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 5) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 4) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }

    return (
      <div className="relative flex items-center justify-center" style={{ marginTop: '100px' }}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center bg-white disabled:cursor-not-allowed hover:bg-gray-50 transition-colors relative"
            style={{ 
              fontFamily: 'var(--font-mazzard-soft)',
              width: '32px',
              height: '32px',
              opacity: currentPage === 1 ? 0.5 : 1,
              borderRadius: '4px',
              backgroundColor: currentPage === 1 ? '#919EAB' : 'white',
              border: currentPage === 1 ? '1px solid #919EAB' : '1px solid #DFE3E8'
            }}
          >
            <Image 
              src="/assets/left_arr.png" 
              alt="Previous" 
              width={12}
              height={10}
              style={{ 
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </button>
          
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <button
                  className="flex items-center justify-center bg-white text-black"
                  style={{ 
                    fontFamily: 'var(--font-mazzard-soft)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    border: '1px solid #DFE3E8'
                  }}
                  disabled
                >
                  ...
                </button>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={`flex items-center justify-center ${
                    currentPage === page
                      ? 'bg-white'
                      : 'bg-white hover:bg-gray-50'
                  } transition-colors`}
                  style={{ 
                    fontFamily: 'var(--font-mazzard-soft)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '4px',
                    border: currentPage === page ? '1px solid #CFC640' : '1px solid #DFE3E8',
                    color: currentPage === page ? '#CFC640' : '#000000'
                  }}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
          
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center bg-white text-black disabled:cursor-not-allowed hover:bg-gray-50 transition-colors relative"
            style={{ 
              fontFamily: 'var(--font-mazzard-soft)',
              width: '32px',
              height: '32px',
              opacity: currentPage === totalPages ? 0.5 : 1,
              borderRadius: '4px',
              backgroundColor: currentPage === totalPages ? '#919EAB' : 'white',
              border: currentPage === totalPages ? '1px solid #919EAB' : '1px solid #DFE3E8'
            }}
          >
            <Image 
              src="/assets/right_arr.png" 
              alt="Next" 
              width={12}
              height={10}
              style={{ 
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </button>
        </div>
        
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`absolute right-0 px-6 py-2 bg-black text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors`}
          style={{ fontFamily: 'var(--font-mazzard-soft)' }}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <>
      <style>{`
        input[type="checkbox"] {
          accent-color: #000000;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        input[type="checkbox"]:checked {
          accent-color: #000000;
        }
      `}</style>
      <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white rounded-2xl pb-12 sm:pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px' }}>
        <Header />

        <div className="ml-0 sm:ml-[95px] sm:mr-[60px] pr-4 sm:pr-8">
          {/* Page Header Section */}
          <section className="bg-black py-6 sm:py-8 px-4 sm:px-6 mb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h1
                  style={{
                    fontFamily: 'Melodrama',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '24.69px',
                    lineHeight: '21.94px',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    color: '#E5E5E5'
                  }}
                >
                  New Arrivals: Modern Furniture, Lighting, Products, Gifts
                </h1>
              </div>
              <div style={{ 
                fontFamily: 'Inter',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '21.94px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#E5E5E5'
              }}>
                {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Left Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0 p-4" style={{ backgroundColor: '#F9F9F9' }}>
              <div className="mb-6">
                <h2
                  className="text-lg font-semibold mb-4 uppercase"
                  style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}
                >
                  Categories
                </h2>
                
                <div className="space-y-2">
                  {allCategories.map((category) => {
                    const isSelected = selectedCategory === category.slug;
                    
                    // If category has a categorySlug, link to category page, otherwise filter on current page
                    if (category.categorySlug) {
                      return (
                        <Link
                          key={category.slug}
                          href={absOrFallback(`/shop/category/${category.categorySlug}`)}
                          className={`w-full text-left px-2 py-2 rounded transition-colors block ${
                            isSelected 
                              ? 'bg-black text-white' 
                              : 'bg-transparent text-gray-600 hover:bg-gray-200 hover:text-black'
                          }`}
                          style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                        >
                          {category.name}
                        </Link>
                      );
                    } else {
                      return (
                        <button
                          key={category.slug}
                          onClick={() => setSelectedCategory(isSelected ? null : category.slug)}
                          className={`w-full text-left px-2 py-2 rounded transition-colors ${
                            isSelected 
                              ? 'bg-black text-white' 
                              : 'bg-transparent text-gray-600 hover:bg-gray-200 hover:text-black'
                          }`}
                          style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                        >
                          {category.name}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 rounded-lg h-56 sm:h-64 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p
                    className="text-gray-500 mb-4"
                    style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                  >
                    {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                    {currentProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={absOrFallback(`/shop/${product.id}`)}
                        className="group cursor-pointer relative"
                      >
                        {/* Image container */}
                        <div className="relative bg-white overflow-hidden h-56 sm:h-64">
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                            fallbackIndex={Number(product.id)}
                          />

                          {/* Hover overlay bar */}
                          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 flex items-center justify-between px-3 py-2">
                            <div
                              className="text-xs sm:text-sm font-bold text-gray-800"
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

                          {/* Heart icon for favorites */}
                          <button
                            className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              // Add favorite functionality here
                            }}
                          >
                            <svg
                              className="w-5 h-5 text-gray-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Product name + brand */}
                        <div
                          className="mt-2 text-xs sm:text-sm font-medium text-black transition-colors duration-300 group-hover:text-gray-700"
                          style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                        >
                          {product.name}
                        </div>
                        <div
                          className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-600"
                          style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                        >
                          {product.brand}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && renderPagination()}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

