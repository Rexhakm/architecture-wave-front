"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ProductImage from "../components/ProductImage";
import Link from "next/link";
import { categories, featuredProducts, exclusiveProducts, shoppingGuides } from "../data/products";
import { absOrFallback } from "../utils/urlUtils";

export default function ShopPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

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
        <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white rounded-2xl pb-12 sm:pb-24" style={{ fontFamily: 'var(--font-mazzard-soft)', borderRadius: '45px' }}>
            <Header />
            
            {/* Main Title */}
            <section className="text-center py-8 sm:py-12 px-4">
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
            <section className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-8 sm:mb-16 mx-4 sm:mx-0">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-4">
                    {categories.map((category, index) => (
                        <div key={index} className="text-center group cursor-pointer transition-all duration-300 hover:scale-105">
                            <div className="bg-gray-100 rounded-lg p-1 sm:p-2 mb-1 sm:mb-2 transition-all duration-300 group-hover:bg-gray-200 group-hover:shadow-lg aspect-square">
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
            <section className="mb-8 sm:mb-16 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
                    <h2 className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}>
                        Featured Products
                    </h2>
                    <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors self-start sm:self-auto" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                        See all
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
                    {featuredProducts.map((product, index) => (
                        <Link key={index} href={absOrFallback(`/shop/${product.id}`)} className="group cursor-pointer transition-all duration-300 hover:scale-105">
                            <div className="bg-gray-100 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 transition-all duration-300 group-hover:bg-gray-200 group-hover:shadow-lg aspect-square">
                                <ProductImage 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                <div className="text-xs sm:text-sm font-bold text-gray-600 transition-colors duration-300 group-hover:text-gray-800" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                                    Buy {product.price}
                                </div>
                                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-xs sm:text-sm font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-700" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>{product.name}</div>
                            <div className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>{product.brand}</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Exclusive Scent Profiles Section */}
            <section className="mb-8 sm:mb-16 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}>
                        Exclusive scent profiles crafted by archwave
                    </h2>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button 
                            onClick={scrollLeft}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${
                                canScrollLeft 
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
                            className={`p-2 rounded-full border transition-all duration-300 hover:scale-110 ${
                                canScrollRight 
                                    ? 'border-gray-300 hover:bg-gray-50 text-gray-600' 
                                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                            Shop the scents
                        </Link>
                    </div>
                </div>
                <div className="relative">
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-3 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {exclusiveProducts.map((product, index) => (
                            <Link key={index} href={absOrFallback(`/shop/${product.id}`)} className={`group cursor-pointer transition-all duration-300 hover:scale-105 flex-shrink-0 ${index === 0 ? 'w-64 sm:w-80' : 'w-48 sm:w-64'}`}>
                                <div className="bg-gray-100 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 transition-all duration-300 group-hover:bg-gray-200 group-hover:shadow-lg aspect-square">
                                    <ProductImage 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                                    <div className="text-xs sm:text-sm font-bold text-gray-600 transition-colors duration-300 group-hover:text-gray-800" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                                        Buy {product.price}
                                    </div>
                                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-700" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>{product.name}</div>
                                <div className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-gray-600" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>{product.brand}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shopping Guides Section */}
            <section className="mb-8 sm:mb-16 px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-2 sm:gap-0">
                    <h2 className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}>
                        Shopping guides
                    </h2>
                    <Link href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors self-start sm:self-auto" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                        See all
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {shoppingGuides.map((guide, index) => (
                        <div key={index} className="group cursor-pointer transition-all duration-300 hover:scale-105">
                            <div className="bg-gray-100 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 transition-all duration-300 group-hover:bg-gray-200 group-hover:shadow-lg aspect-square">
                                <ProductImage 
                                    src={guide.image} 
                                    alt={guide.title}
                                    className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-sm font-medium text-black leading-tight transition-colors duration-300 group-hover:text-gray-700" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>{guide.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
} 