"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ProductImage from "../components/ProductImage";
import Link from "next/link";
import { categories, shoppingGuides } from "../data/products";
import { fetchProducts } from "../utils/apiService";
import { Product, Category, ShoppingGuide } from "../types/product";
import { absOrFallback } from "../utils/urlUtils";

export default function ShopPage() {
    const scrollContainerRef1 = useRef<HTMLDivElement>(null);
    const scrollContainerRef2 = useRef<HTMLDivElement>(null);
    const [canScrollLeft1, setCanScrollLeft1] = useState(false);
    const [canScrollRight1, setCanScrollRight1] = useState(true);
    const [canScrollLeft2, setCanScrollLeft2] = useState(false);
    const [canScrollRight2, setCanScrollRight2] = useState(true);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkScrollPosition1 = () => {
        if (scrollContainerRef1.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef1.current;
            setCanScrollLeft1(scrollLeft > 0);
            setCanScrollRight1(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const checkScrollPosition2 = () => {
        if (scrollContainerRef2.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef2.current;
            setCanScrollLeft2(scrollLeft > 0);
            setCanScrollRight2(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        const scrollContainer1 = scrollContainerRef1.current;
        const scrollContainer2 = scrollContainerRef2.current;
        
        if (scrollContainer1) {
            checkScrollPosition1();
            scrollContainer1.addEventListener('scroll', checkScrollPosition1);
        }
        if (scrollContainer2) {
            checkScrollPosition2();
            scrollContainer2.addEventListener('scroll', checkScrollPosition2);
        }
        
        const handleResize = () => {
            checkScrollPosition1();
            checkScrollPosition2();
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
            if (scrollContainer1) {
                scrollContainer1.removeEventListener('scroll', checkScrollPosition1);
            }
            if (scrollContainer2) {
                scrollContainer2.removeEventListener('scroll', checkScrollPosition2);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Re-check scroll position when products are loaded
    useEffect(() => {
        if (!isLoading && featuredProducts.length > 0) {
            setTimeout(() => {
                checkScrollPosition1();
                checkScrollPosition2();
            }, 100);
        }
    }, [isLoading, featuredProducts.length]);

    // Fetch products from API
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const products = await fetchProducts();
                console.log('Fetched products from Strapi:', products.length);
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

    const scrollLeft1 = () => {
        if (scrollContainerRef1.current) {
            const container = scrollContainerRef1.current;
            const itemWidth = container.querySelector('a')?.offsetWidth || 0;
            const gap = 24; // gap-6 = 1.5rem = 24px
            const scrollAmount = itemWidth + gap;
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(() => {
                checkScrollPosition1();
            }, 100);
        }
    };

    const scrollRight1 = () => {
        if (scrollContainerRef1.current) {
            const container = scrollContainerRef1.current;
            const itemWidth = container.querySelector('a')?.offsetWidth || 0;
            const gap = 24; // gap-6 = 1.5rem = 24px
            const scrollAmount = itemWidth + gap;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(() => {
                checkScrollPosition1();
            }, 100);
        }
    };

    const scrollLeft2 = () => {
        if (scrollContainerRef2.current) {
            const container = scrollContainerRef2.current;
            const itemWidth = container.querySelector('a')?.offsetWidth || 0;
            const gap = 24; // gap-6 = 1.5rem = 24px
            const scrollAmount = itemWidth + gap;
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(() => {
                checkScrollPosition2();
            }, 100);
        }
    };

    const scrollRight2 = () => {
        if (scrollContainerRef2.current) {
            const container = scrollContainerRef2.current;
            const itemWidth = container.querySelector('a')?.offsetWidth || 0;
            const gap = 24; // gap-6 = 1.5rem = 24px
            const scrollAmount = itemWidth + gap;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(() => {
                checkScrollPosition2();
            }, 100);
        }
    };

    return (
        <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white rounded-2xl pb-12 sm:pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px' }}>
            <Header />

            {/* Content wrapper aligned with header icon on desktop with equal side spacing */}
            <div className="ml-0 sm:ml-[95px] sm:mr-[50px]">

            {/* Main Title */}
            <section className="text-center sm:text-left py-8 sm:py-12">
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
            <section className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-16 sm:mr-8">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-4">
                    {categories.map((category: Category, index: number) => {
                        const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
                        return (
                            <Link
                                key={index}
                                href={absOrFallback(`/shop/category/${categorySlug}`)}
                                className="text-center group cursor-pointer transition-all duration-300 hover:scale-105"
                            >
                                <div className="bg-gray-100 rounded-lg p-1 sm:p-2 mb-1 sm:mb-2 transition-all duration-300 group-hover:bg-gray-200 group-hover:shadow-lg aspect-square">
                                    <ProductImage
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <span className="text-white text-xs font-medium transition-colors duration-300 group-hover:text-gray-300" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>{category.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </section>


            {/* Featured Products Section */}
            <section className="mb-8 sm:mb-16 sm:mr-8 testt">
                <div className="flex items-center gap-6 mb-6 sm:mb-8">
                    <h2
                        className="text-xl sm:text-2xl font-semibold"
                        style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}
                    >
                        Featured Products
                    </h2>
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center text-xs sm:text-sm font-medium bg-black text-white"
                        style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            height: 37,
                            paddingRight: 40,
                            paddingLeft: 40,
                            gap: 4,
                        }}
                    >
                        See all
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6">
                        {featuredProducts.slice(0, 8).map((product) => (
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
                )}
            </section>



            {/* Exclusive Scent Profiles Section */}
            <section className="mb-8 sm:mb-16 sm:mr-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6">
                    {/* Left: lifestyle image - spans first column */}
                    <div className="col-span-2 sm:col-span-1 flex justify-start">
                        <img
                            src="/assets/Frame%201.png"
                            alt="Exclusive scent profiles crafted by archwave"
                            className="object-cover w-full"
                            style={{
                                height: 480,
                                opacity: 1,
                                transform: 'rotate(0deg)',
                            }}
                        />
                    </div>

                    {/* Right: copy + products carousel */}
                    <div className="col-span-2 sm:col-span-3 flex flex-col">
                        <div className="flex items-start justify-between mb-6 gap-4">
                            <div>
                                <h2
                                    className="text-xl sm:text-2xl md:text-3xl font-normal mb-2"
                                    style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        color: '#111',
                                        lineHeight: '120%',
                                        width: 340.1572265625,
                                        height: 74,
                                        opacity: 1,
                                        transform: 'translateY(-3.38px)',
                                    }}
                                >
                                    Exclusive scent profiles
                                    <br />
                                    crafted by <span style={{ fontStyle: 'italic' }}>archwave.</span>
                    </h2>
                            </div>
                            <div className="hidden sm:flex items-center gap-[40px]">
                        <button
                            onClick={scrollLeft1}
                            disabled={!canScrollLeft1}
                                    className={`flex items-center justify-center transition-opacity ${
                                        canScrollLeft1
                                            ? 'opacity-100 hover:opacity-70'
                                : 'opacity-30 cursor-not-allowed'
                                }`}
                        >
                                    <img 
                                        src="/assets/left_black_arr.png" 
                                        alt="Previous" 
                                        className="w-4 h-4"
                                    />
                        </button>
                        <button
                            onClick={scrollRight1}
                            disabled={!canScrollRight1}
                                    className={`flex items-center justify-center transition-opacity ${
                                        canScrollRight1
                                            ? 'opacity-100 hover:opacity-70'
                                : 'opacity-30 cursor-not-allowed'
                                }`}
                        >
                                    <img 
                                        src="/assets/right_black_arr.png" 
                                        alt="Next" 
                                        className="w-4 h-4"
                                    />
                        </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center text-xs sm:text-sm font-medium bg-black text-white hover:bg-gray-900 transition-colors"
                                style={{
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    borderRadius: 0,
                                    width: 177,
                                    height: 47,
                                    paddingTop: 5,
                                    paddingRight: 20,
                                    paddingBottom: 5,
                                    paddingLeft: 20,
                                    opacity: 1,
                                    columnGap: 4,
                                }}
                            >
                            Shop the scents
                                <span>↗</span>
                            </Link>
                        </div>

                        <div className="relative mt-4 overflow-hidden w-full">
                            <div
                                ref={scrollContainerRef1}
                                className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {featuredProducts.slice(0, 6).map((product: Product, index: number) => (
                                    <Link
                                        key={index}
                                        href={absOrFallback(`/shop/${product.id}`)}
                                        className="group cursor-pointer relative flex-shrink-0 w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-3rem)/3)]"
                                    >
                                        {/* Image container */}
                                        <div className="relative bg-white overflow-hidden h-56 sm:h-64">
                                            <ProductImage
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                                                fallbackIndex={Number(product.id)}
                                            />

                                            {/* Hover overlay bar - same as Featured Products */}
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

            {/* Exclusive Scent Profiles Section (duplicate) */}
            <section className="mb-8 sm:mb-16 sm:mr-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-6">
                    {/* Left: lifestyle image - spans first column */}
                    <div className="col-span-2 sm:col-span-1 flex justify-start">
                        <img
                            src="/assets/Frame%201.png"
                            alt="Exclusive scent profiles crafted by archwave"
                            className="object-cover w-full"
                            style={{
                                height: 480,
                                opacity: 1,
                                transform: 'rotate(0deg)',
                            }}
                        />
                    </div>

                    {/* Right: copy + products carousel */}
                    <div className="col-span-2 sm:col-span-3 flex flex-col">
                        <div className="flex items-start justify-between mb-6 gap-4">
                            <div>
                                <h2
                                    className="text-xl sm:text-2xl md:text-3xl font-normal mb-2"
                                    style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        color: '#111',
                                        lineHeight: '120%',
                                        width: 340.1572265625,
                                        height: 74,
                                        opacity: 1,
                                        transform: 'translateY(-3.38px)',
                                    }}
                                >
                                    Exclusive scent profiles
                                    <br />
                                    crafted by <span style={{ fontStyle: 'italic' }}>archwave.</span>
                                </h2>
                            </div>
                            <div className="hidden sm:flex items-center gap-[40px]">
                                <button
                                    onClick={scrollLeft2}
                                    disabled={!canScrollLeft2}
                                    className={`flex items-center justify-center transition-opacity ${
                                        canScrollLeft2
                                            ? 'opacity-100 hover:opacity-70'
                                            : 'opacity-30 cursor-not-allowed'
                                    }`}
                                >
                                    <img 
                                        src="/assets/left_black_arr.png" 
                                        alt="Previous" 
                                        className="w-4 h-4"
                                    />
                                </button>
                                <button
                                    onClick={scrollRight2}
                                    disabled={!canScrollRight2}
                                    className={`flex items-center justify-center transition-opacity ${
                                        canScrollRight2
                                            ? 'opacity-100 hover:opacity-70'
                                            : 'opacity-30 cursor-not-allowed'
                                    }`}
                                >
                                    <img 
                                        src="/assets/right_black_arr.png" 
                                        alt="Next" 
                                        className="w-4 h-4"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center text-xs sm:text-sm font-medium bg-black text-white hover:bg-gray-900 transition-colors"
                                style={{
                                    fontFamily: 'var(--font-mazzard-soft)',
                                    borderRadius: 0,
                                    width: 177,
                                    height: 47,
                                    paddingTop: 5,
                                    paddingRight: 20,
                                    paddingBottom: 5,
                                    paddingLeft: 20,
                                    opacity: 1,
                                    columnGap: 4,
                                }}
                            >
                                Shop the scents
                                <span>↗</span>
                            </Link>
                        </div>

                        <div className="relative mt-4 overflow-hidden w-full">
                            <div
                                ref={scrollContainerRef2}
                                className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {featuredProducts.slice(0, 6).map((product: Product, index: number) => (
                                    <Link
                                        key={index}
                                        href={absOrFallback(`/shop/${product.id}`)}
                                        className="group cursor-pointer relative flex-shrink-0 w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-3rem)/3)]"
                                    >
                                {/* Image container */}
                                        <div className="relative bg-white overflow-hidden h-56 sm:h-64">
                                    <ProductImage
                                        src={product.image}
                                        alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:opacity-90"
                                                fallbackIndex={Number(product.id)}
                                    />

                                            {/* Hover overlay bar - same as Featured Products */}
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
            <section className="mb-8 sm:mb-16 sm:mr-8">
                <div className="flex items-center gap-6 mb-6 sm:mb-8">
                    <h2
                        className="text-xl sm:text-2xl font-semibold"
                        style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}
                    >
                        Shopping guides
                    </h2>
                    <Link
                        href="#"
                        className="inline-flex items-center justify-center text-xs sm:text-sm font-medium bg-black text-white"
                        style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            height: 37,
                            paddingRight: 40,
                            paddingLeft: 40,
                            gap: 4,
                        }}
                    >
                        See all
                    </Link>
                </div>
                {/* 4x2 compact grid like design, same card height as featured products */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                    {shoppingGuides.slice(0, 8).map((guide: ShoppingGuide, index: number) => (
                        <div key={index} className="group cursor-pointer">
                            {/* Design-style placeholder block with alternating colors */}
                            <div
                                className="w-full h-56 sm:h-64"
                                style={{
                                    backgroundColor: index % 2 === 0 ? '#959595' : '#D1D1D1',
                                }}
                            />
                            {/* Title */}
                            <h3
                                className="mt-2 text-black line-clamp-2"
                                style={{
                                    fontFamily: 'Spectral',
                                    fontWeight: 400,
                                    fontStyle: 'normal',
                                    fontSize: '14px',
                                    lineHeight: '23.9px',
                                    letterSpacing: '0%',
                                }}
                            >
                                {guide.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            </div>
        </main>
    );
} 