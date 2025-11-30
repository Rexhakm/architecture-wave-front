"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import ProductImage from "../../../components/ProductImage";
import Link from "next/link";
import { categories } from "../../../data/products";
import { fetchProducts } from "../../../utils/apiService";
import { Product, Category } from "../../../types/product";
import { absOrFallback } from "../../../utils/urlUtils";

// Mock subcategories for filtering (based on the image description)
const getSubcategories = (categoryName: string): string[] => {
  const subcategoryMap: Record<string, string[]> = {
    Kitchen: ["Refrigeration", "Ovens", "Stoves", "Dishwashers", "Gas", "Electric", "Convection", "Ranges", "Toasters", "Microwave", "Hoods"],
    Furniture: ["Chairs", "Tables", "Sofas", "Desks", "Storage", "Beds"],
    Lighting: ["Ceiling", "Table", "Floor", "Wall", "Outdoor", "Pendant"],
    Decor: ["Vases", "Artwork", "Mirrors", "Candles", "Plants", "Sculptures"],
    Textiles: ["Pillows", "Throws", "Rugs", "Curtains", "Bedding", "Towels"],
    Storage: ["Shelves", "Cabinets", "Baskets", "Boxes", "Organizers"],
    Bathroom: ["Fixtures", "Accessories", "Towels", "Storage", "Mirrors"]
  };
  return subcategoryMap[categoryName] || [];
};

export default function ProductCategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Find the category from slug
  const category = categories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
  ) || categories[0];

  const subcategories = getSubcategories(category.name);

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

  // Filter products by subcategory (when subcategory filtering is implemented)
  useEffect(() => {
    if (selectedSubcategories.size === 0) {
      setFilteredProducts(products);
    } else {
      // For now, just show all products since API doesn't have subcategory data
      // This can be extended when subcategory data is available
      setFilteredProducts(products);
    }
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedSubcategories, products]);

  // Toggle subcategory selection
  const toggleSubcategory = (subcategory: string) => {
    const newSelected = new Set(selectedSubcategories);
    if (newSelected.has(subcategory)) {
      newSelected.delete(subcategory);
    } else {
      newSelected.add(subcategory);
    }
    setSelectedSubcategories(newSelected);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Get count for each subcategory (mock data for now)
  const getSubcategoryCount = (subcategory: string): number => {
    // This would normally filter products, but for now return mock counts
    const mockCounts: Record<string, number> = {
      Refrigeration: 29,
      Ovens: 23,
      Stoves: 12,
      Dishwashers: 13,
      Gas: 9,
      Electric: 17,
      Convection: 5,
      Ranges: 13,
      Toasters: 15,
      Microwave: 8,
      Hoods: 19,
    };
    return mockCounts[subcategory] || Math.floor(Math.random() * 20) + 5;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 15) {
      // Show all pages if 15 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      // Show more pages around current page
      if (currentPage > 5) {
        pages.push('...');
      }
      
      // Show pages around current page (more pages visible)
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 4) {
        pages.push('...');
      }
      
      // Show last page
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
            <img 
              src="/assets/left_arr.png" 
              alt="Previous" 
              style={{ 
                width: '12px',
                height: '10px',
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
            <img 
              src="/assets/right_arr.png" 
              alt="Next" 
              style={{ 
                width: '12px',
                height: '10px',
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
        {/* Category Header Section */}
        <section className="bg-black py-6 sm:py-8 px-4 sm:px-6 mb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2" style={{ 
                fontFamily: 'Inter',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '21.94px',
                letterSpacing: '0%',
                textAlign: 'center'
              }}>
                <Link
                  href={absOrFallback("/shop")}
                  style={{ 
                    color: '#D4AF37',
                    textDecoration: 'none'
                  }}
                >
                  All Products
                </Link>
                <span style={{ color: '#E5E5E5' }}>/</span>
                <span style={{ color: '#E5E5E5' }}>{category.name}</span>
              </div>
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
                {category.name}: Modern {category.name}, Lighting, Products, Gifts
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
            <Link
              href={absOrFallback("/shop")}
              className="text-sm text-gray-600 hover:text-black mb-6 inline-block"
              style={{ fontFamily: 'var(--font-mazzard-soft)' }}
            >
              ← All Products
            </Link>
            
            <div className="mb-6">
              <h2
                className="text-lg font-semibold mb-4 uppercase"
                style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}
              >
                {category.name.toUpperCase()} APPLIANCES
              </h2>
              
              <div className="space-y-2">
                {subcategories.map((subcategory) => {
                  const isSelected = selectedSubcategories.has(subcategory);
                  const count = getSubcategoryCount(subcategory);
                  
                  return (
                    <label
                      key={subcategory}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSubcategory(subcategory)}
                        className="w-4 h-4 mr-3 cursor-pointer"
                        style={{
                          accentColor: '#000000',
                          color: '#000000'
                        }}
                      />
                      <span
                        className={`text-sm ${
                          isSelected ? 'text-black font-medium' : 'text-gray-600'
                        } group-hover:text-black transition-colors`}
                        style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                      >
                        {subcategory} ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                {[...Array(8)].map((_, index) => (
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

