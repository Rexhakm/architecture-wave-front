"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ProductImage from "../components/ProductImage";
import Link from "next/link";
import { categories, exclusiveProducts, shoppingGuides } from "../data/products";
import { fetchProducts } from "../utils/apiService";
import { Product, Category, ShoppingGuide } from "../types/product";
import { absOrFallback } from "../utils/urlUtils";

export default function ShopPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollPosition);
            return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
        }
    }, []);

    // Fetch products from API
    useEffect(() => {
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

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white rounded-2xl pb-12 sm:pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px', marginBottom: '0.75rem' }}>
            <Header />

            {/* Main Title */}
            <section className="text-center py-8 sm:py-12 px-4 w-[895px] max-[992px]:w-auto mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal" style={{
                    fontFamily: 'var(--font-mazzard-soft)',
                    color: '#111',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                }}>
                    Smart Shopping for the Design Obsessed
                </h1>
            </section>

            {/* Category Navigation Bar */}
            <section className="bg-black   p-4 sm:p-6 mb-8 sm:mb-16 mx-4 sm:mx-0" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-4" style={{ gap: '1.875rem' }}>
                    {categories.map((category: Category, index: number) => (
                        <div key={index} className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
                            <div className="bg-gray-100  p-1 sm:p-2 mb-1 sm:mb-2 transition-all duration-300 group-hover:bg-gray-200 group-hover:shadow-lg aspect-square">
                                <ProductImage
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <span className="text-white text-xs font-medium transition-colors duration-300 group-hover:text-gray-300" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>{category.name}</span>
                        </div>
                    ))}
                </div>
            </section>


            {/* Featured Products Section */}
            <section className="mb-8 sm:mb-16 px-4 sm:px-0" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                <div className="flex flex-col sm:flex-row  sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0" style={{ gap: '30px' }}>
                    <h2
                        className="text-xl sm:text-2xl font-semibold"
                        style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}
                    >
                        Featured Products
                    </h2>
                    <Link
                        href="#"
                        className="bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors self-start sm:self-auto flex items-center justify-center"
                        style={{ fontFamily: 'var(--font-mazzard-soft)', width: '90px', height: '37px' }}
                    >
                        See all
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-gray-200 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 h-40"></div>
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6" style={{ gap: '3.125rem' }}>
                        {featuredProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={absOrFallback(`/shop/${product.id}`)}
                                className="group cursor-pointer relative"
                            >
                                {/* Image container */}
                                <div className="relative bg-white  overflow-hidden h-56 sm:h-64" style={{ height: '305px' }}>
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
                )}
            </section>



            {/* Exclusive Scent Profiles Section */}
            <section className="mb-8 sm:mb-16 px-4 sm:px-0" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                <div className="flex gap-8" style={{ gap: '3.125rem' }}>
                    <div className="min-w-[424px] max-[1440px]:min-w-[250px] max-[1200px]:min-w-[200px]">
                        <img 
                            src="/assets/exclusive-scent-banner.png" 
                            alt="Lifestyle scene with woman and built-in shelves"
                            style={{ width: '424px', height: '574px', objectFit: 'cover'}}
                        />
                    </div>
                    <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111', width: '340px' }}>
                        Exclusive scent profiles crafted by archwave
                    </h2>
                    
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${canScrollLeft
                                ? 'border-gray-300 hover:bg-gray-50 text-gray-600'
                                : 'border-gray-200 text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            disabled={!canScrollRight}
                            className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${canScrollRight
                                ? 'border-gray-300 hover:bg-gray-50 text-gray-600'
                                : 'border-gray-200 text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                    </div>
                </div>
                <Link href="#" className="bg-black sm:mb-8 text-white text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-mazzard-soft)', width: '177px', height: '47px' }}>
                            Shop the scents
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_135_356)">
                                    <path d="M5.70703 12.4609H19.707" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.707 16.4609L19.707 12.4609" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.707 8.46094L19.707 12.4609" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_135_356">
                                        <rect width="24" height="24" fill="white" transform="translate(0.707031 0.460938)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {exclusiveProducts.map((product: Product, index: number) => (
                            <Link key={index} href={absOrFallback(`/shop/${product.id}`)} className={`group cursor-pointer relative flex-shrink-0 ${index === 0 ? 'w-64 sm:w-80' : 'w-48 sm:w-64'}`}>
                                {/* Image container */}
                                <div className="relative bg-white  overflow-hidden aspect-square">
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
                </div>
                    </div>
                </div>
            </section>

            {/* Shopping Guides Section */}
            <section className="mb-8 sm:mb-16 px-4 sm:px-0" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
                <div className="flex flex-col sm:flex-row  sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0" style={{ gap: '30px' }}>
                    <h2 className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}>
                        Shopping guides
                    </h2>
                    <Link href="#" className="bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors self-start sm:self-auto flex items-center justify-center" style={{ fontFamily: 'var(--font-mazzard-soft)', width: '90px', height: '37px' }}>
                        See all
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" style={{ gap: '3.125rem' }}>
                    {shoppingGuides.map((guide: ShoppingGuide, index: number) => (
                        <div key={index} className="group cursor-pointer relative">
                            {/* Image container */}
                            <div className="relative bg-white   overflow-hidden aspect-square">
                                <ProductImage
                                    src={guide.image}
                                    alt={guide.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                                    fallbackIndex={index}
                                />

                                {/* Hover overlay bar */}
                                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 flex items-center justify-center px-3 py-2">
                                    <div
                                        className="text-xs sm:text-sm font-bold text-gray-800"
                                        style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                                    >
                                        View Guide
                                    </div>
                                </div>
                            </div>

                            {/* Guide title */}
                            <h3
                                className="mt-2 text-sm font-medium text-black leading-tight transition-colors duration-300 group-hover:text-gray-700"
                                style={{ fontFamily: 'var(--font-mazzard-soft)' }}
                            >
                                {guide.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
} 