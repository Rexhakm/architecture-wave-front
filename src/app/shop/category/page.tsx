"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductImage from "../../components/ProductImage";
import Link from "next/link";
import { categories, exclusiveProducts } from "../../data/products";
import { fetchProducts } from "../../utils/apiService";
import { Product, Category } from "../../types/product";
import { absOrFallback } from "../../utils/urlUtils";

export default function CategoryPage() {
    const [selectedCategory, setSelectedCategory] = useState("Editor's Picks");
    const [currentPage, setCurrentPage] = useState(1);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const productsPerPage = 9;
    const totalProducts = 16; // Total number of products
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const categoryList = [
        "Editor's Picks",
        "Furniture",
        "Kitchen & Dining",
        "Bath & Bed",
        "Decor & More",
        "Lighting & Fans",
        "Rugs & Flooring",
        "Tech",
        "Fashion & Travel",
        "Books & Studio Office"
    ];

    // Fetch products from API (same as shop page)
    React.useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const products = await fetchProducts();
                setFeaturedProducts(products);
            } catch (err) {
                setError('Failed to load products');
                console.error('Error loading products:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Calculate which products to show for current page
    const getCurrentPageProducts = () => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        return Array.from({ length: productsPerPage }, (_, index) => {
            const globalIndex = startIndex + index;
            if (globalIndex >= totalProducts) return null; // No more products
            const product = featuredProducts[globalIndex % featuredProducts.length];
            return { ...product, uniqueId: `${product.id}-${globalIndex}` };
        }).filter((product): product is NonNullable<typeof product> => product !== null); // Remove null entries with type guard
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white rounded-2xl pb-12 sm:pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px', marginBottom: '0.75rem' }}>
            <Header />

            {/* Header Section */}
            <section className="bg-black text-white py-8 px-4 sm:px-0" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h2 className="font-medium mb-4" style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            color: '#D4AF37',
                            fontSize: '12px',
                            lineHeight: '100%',
                            letterSpacing: '0%'
                        }}>
                            All Products
                        </h2>
                        <h1 className="font-medium" style={{
                            fontFamily: 'Melodrama',
                            fontWeight: 500,
                            fontSize: '24px',
                            lineHeight: '22px',
                            letterSpacing: '0%'
                        }}>
                            New Arrivals: Modern Furniture, Lighting, Products, Gifts
                        </h1>
                    </div>
                    <div className="text-sm sm:text-base" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                        {((currentPage - 1) * productsPerPage) + 1}-{Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="flex gap-8 px-4 sm:px-0" style={{ paddingTop: '50px' }}>
                {/* Left Sidebar - Categories */}
                <div className="w-64 flex-shrink-0"  style={{ backgroundColor: '#F9F9F9' }}>
                    <div className="rounded-lg p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}>
                            Categories
                        </h3>
                        <ul className="space-y-3">
                            {categoryList.map((category, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`text-left w-full py-2 px-3 rounded-lg transition-colors ${
                                            selectedCategory === category
                                                ? 'bg-gray-100 text-black'
                                                : 'text-gray-600 hover:text-black hover:bg-gray-50'
                                        }`}
                                        style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Content - Products Grid */}
                <div className="flex-1" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gap: '3.125rem' }}>
                            {[...Array(9)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="bg-gray-200 rounded-lg h-80 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gap: '3.125rem' }}>
                            {getCurrentPageProducts().map((product, index) => (
                                <Link
                                    key={product.uniqueId}
                                    href={absOrFallback(`/shop/${product.id}`)}
                                    className="group cursor-pointer relative"
                                >
                                    {/* Image container */}
                                    <div className="relative bg-white rounded-lg overflow-hidden h-80 mb-4">
                                        <ProductImage
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                                            fallbackIndex={index}
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
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-12">
                        {/* Left side - Previous button (only show when not on page 1) */}
                        <div className="flex items-center">
                            {currentPage > 1 && (
                                <button 
                                    onClick={handlePrevPage}
                                    className="bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                                    style={{ fontFamily: 'var(--font-mazzard-soft)', width: '90px', height: '37px', borderRadius: '4px' }}
                                >
                                    Previous
                                </button>
                            )}
                        </div>

                        {/* Center - Pagination block with arrows and numbers */}
                        <div className="flex items-center gap-1">
                            {/* Previous Arrow */}
                            <button 
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${
                                    currentPage === 1 
                                        ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed' 
                                        : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Page Numbers */}
                            <button
                                onClick={() => handlePageChange(1)}
                                className={`w-8 h-8 rounded border text-sm font-medium transition-colors ${
                                    currentPage === 1
                                        ? 'bg-yellow-400 border-yellow-400 text-black'
                                        : 'bg-white border-gray-300 text-black hover:bg-gray-50'
                                }`}
                            >
                                1
                            </button>
                            
                            <button
                                onClick={() => handlePageChange(2)}
                                className={`w-8 h-8 rounded border text-sm font-medium transition-colors ${
                                    currentPage === 2
                                        ? 'bg-yellow-400 border-yellow-400 text-black'
                                        : 'bg-white border-gray-300 text-black hover:bg-gray-50'
                                }`}
                            >
                                2
                            </button>

                            {/* Ellipsis */}
                            <div className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center">
                                <span className="text-black text-sm">...</span>
                            </div>

                            <button
                                onClick={() => handlePageChange(9)}
                                className={`w-8 h-8 rounded border text-sm font-medium transition-colors ${
                                    currentPage === 9
                                        ? 'bg-yellow-400 border-yellow-400 text-black'
                                        : 'bg-white border-gray-300 text-black hover:bg-gray-50'
                                }`}
                            >
                                9
                            </button>

                            <button
                                onClick={() => handlePageChange(10)}
                                className={`w-8 h-8 rounded border text-sm font-medium transition-colors ${
                                    currentPage === 10
                                        ? 'bg-yellow-400 border-yellow-400 text-black'
                                        : 'bg-white border-gray-300 text-black hover:bg-gray-50'
                                }`}
                            >
                                10
                            </button>

                            {/* Next Arrow */}
                            <button 
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${
                                    currentPage === totalPages 
                                        ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed' 
                                        : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Right side - Next button (only show when there are more pages) */}
                        <div className="flex items-center">
                            {currentPage < totalPages && (
                                <button 
                                    onClick={handleNextPage}
                                    className="bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                                    style={{ fontFamily: 'var(--font-mazzard-soft)', width: '90px', height: '37px', borderRadius: '4px' }}
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
