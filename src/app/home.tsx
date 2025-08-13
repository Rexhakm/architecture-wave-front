'use client';

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { getAllArticles, formatCategoryDisplay } from "./utils/articleUtils";
import Link from "next/link";
import { Article } from "./types/article";
import { absOrFallback } from "./utils/urlUtils";

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const articlesPerPage = 10;

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const allArticles = await getAllArticles();
                setArticles(allArticles);
                setDisplayedArticles(allArticles.slice(0, articlesPerPage));
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading articles:', error);
                setIsLoading(false);
            }
        };
        loadArticles();
    }, []);

    const handleViewMore = async () => {
        setIsLoadingMore(true);
        
        // Simulate a small delay for smoother UX
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const nextPage = currentPage + 1;
        const startIndex = 0;
        const endIndex = nextPage * articlesPerPage;
        setDisplayedArticles(articles.slice(startIndex, endIndex));
        setCurrentPage(nextPage);
        setIsLoadingMore(false);
    };

    const hasMoreArticles = displayedArticles.length < articles.length;

    if (isLoading) {
        return (
            <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white" style={{ borderRadius: '45px' }}>
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-lg">Loading articles...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-[calc(100%-20px)] sm:w-[calc(100%-30px)] md:w-[calc(100%-40px)] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 bg-white" style={{ borderRadius: '45px' }}>
            <div className="ml-[20px] sm:ml-[40px] md:ml-[60px]">
                <Header />
                <div className="ml-[30px] sm:ml-[50px] md:ml-[80px]">
                    <section className="mb-8 sm:mb-10 md:mb-12">
                        <div className="px-2 sm:px-4 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-12">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-normal mb-3 sm:mb-4 md:mb-6" style={{
                                fontFamily: 'var(--font-mazzard-soft)',
                                color: '#111',
                                lineHeight: '100%',
                                letterSpacing: '0%',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                Your atlas to a life<br />
                                <span style={{ fontWeight: 700 }}>with a good design.</span>
                            </h1>
                            <p className="mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl md:max-w-2xl" style={{
                                fontFamily: 'var(--font-mazzard-soft)',
                                fontWeight: 500,
                                lineHeight: '24px',
                                letterSpacing: '5%',
                                color: '#000',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 4,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                marginTop: '20px',
                                marginBottom: '40px'
                                
                            }}>
                                Discover the stories, trends, and<br />
                                experiences that shape <span style={{ fontWeight: 700 }}>
                                    how we live,<br />
                                    work, and connect, blending everyday.
                                </span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 w-full mt-8 sm:mt-10 md:mt-12 overflow-x-auto">
                                {articles.filter(article => article.isPromoted).slice(0, 3).map((article: Article) => (
                                    <Link
                                        key={article.id}
                                        href={absOrFallback(`/articles/${article.slug}`)}
                                        className="flex-shrink-0 w-full sm:w-[280px] md:w-[350px] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity"
                                    >
                                        <img
                                            src={article.coverImage}
                                            alt={article.category}
                                            className="rounded-2xl object-cover w-full sm:w-auto"
                                            style={{
                                                width: '100%',
                                                aspectRatio: '1/1',
                                                objectFit: 'cover',
                                                maxWidth: '140px'
                                            }}
                                        />
                                        <div className="flex flex-col flex-1">
                                            <span className="text-xs sm:text-sm md:text-base font-medium mb-1 block text-green-600">
                                                {formatCategoryDisplay(article.category, article.secondCategory)}
                                            </span>
                                            <span className="font-medium text-sm sm:text-base md:text-lg text-black block" style={{
                                                fontFamily: 'var(--font-mazzard-soft)',
                                                fontWeight: 500,
                                                fontSize: '16px',
                                                lineHeight: '24px',
                                                color: '#111',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {article.title}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Topic/Series/Creator Grid Section */}
                    <section className="mb-12 sm:mb-14 md:mb-16 px-2 sm:px-4 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-12">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2" style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            fontWeight: 600,
                            color: '#000000',
                            lineHeight: '120%',
                            letterSpacing: '0%'
                        }}>
                            Dive in by topic, series, or creator
                        </h2>
                        <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base max-w-lg sm:max-w-xl md:max-w-2xl" style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            fontWeight: 400,
                            fontSize: '12px',
                            color: '#111'
                        }}>
                            A ribbon-esque stair connects three levels that hold a bath
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                            {articles.slice(0, 3).map((article: Article) => (
                                <Link
                                    key={article.id}
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="w-full block hover:opacity-90 transition-opacity"
                                >
                                    <div>
                                        <img
                                            src={article.coverImage}
                                            alt={article.category}
                                            className="rounded-2xl mb-3 sm:mb-4 w-full h-[200px] sm:h-[250px] md:h-[320px] object-cover"
                                        />
                                        <span className="text-xs sm:text-sm font-semibold mb-2 block text-orange-400">
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#111',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs sm:text-sm" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 400,
                                            fontSize: '12px',
                                            lineHeight: '20px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: '#111'
                                        }}>
                                            {article.description?.substring(0, 100)}...
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Articles List Section */}
                    <section className="w-full px-2 sm:px-4 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8 lg:py-12 mb-[20px] sm:mb-[30px] md:mb-[40px]">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2" style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            fontWeight: 600,
                            color: '#000000',
                            lineHeight: '120%',
                            letterSpacing: '0%'
                        }}>
                            Latest Articles
                        </h2>
                        <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base max-w-lg sm:max-w-xl md:max-w-2xl" style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            fontWeight: 400,
                            fontSize: '12px',
                            color: '#111'
                        }}>
                            Discover our latest stories and insights
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                            {displayedArticles.slice(3).map((article: Article, index: number) => (
                                <div
                                    key={article.id}
                                    className="animate-fadeInUp"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <Link
                                        href={absOrFallback(`/articles/${article.slug}`)}
                                        className="w-full block hover:opacity-90 transition-opacity cursor-pointer"
                                    >
                                        <div>
                                            <img
                                                src={article.coverImage}
                                                alt={article.category}
                                                className="rounded-2xl mb-3 sm:mb-4 w-full h-[200px] sm:h-[250px] md:h-[320px] object-cover"
                                            />
                                            <span className="text-xs sm:text-sm font-semibold mb-2 block" style={{
                                                color: article.categoryColor,
                                                fontFamily: 'Inter',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                lineHeight: '16px',
                                                letterSpacing: '-5%'
                                            }}>
                                                {formatCategoryDisplay(article.category, article.secondCategory)}
                                            </span>
                                            <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2" style={{
                                                fontFamily: 'var(--font-mazzard-soft)',
                                                fontWeight: 500,
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                color: '#111',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs sm:text-sm" style={{
                                                fontFamily: 'var(--font-mazzard-soft)',
                                                fontWeight: 400,
                                                fontSize: '11px',
                                                lineHeight: '16px',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 3,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                color: '#111'
                                            }}>
                                                {article.description?.substring(0, 100)}...
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                            
                            {/* Loading indicator for new articles */}
                            {isLoadingMore && (
                                <>
                                    {[...Array(3)].map((_, index) => (
                                        <div key={`loading-${index}`} className="animate-pulse">
                                            <div className="w-full h-[200px] sm:h-[250px] md:h-[320px] bg-gray-200 rounded-2xl mb-3 sm:mb-4"></div>
                                            <div className="space-y-2 sm:space-y-3">
                                                <div className="h-3 bg-gray-200 rounded w-16 sm:w-20"></div>
                                                <div className="h-4 sm:h-5 bg-gray-200 rounded w-full"></div>
                                                <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4"></div>
                                                <div className="h-3 bg-gray-200 rounded w-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        
                        {hasMoreArticles && (
                            <div className="flex flex-col items-center justify-center w-full mt-8 sm:mt-10 md:mt-12">
                                <button
                                    onClick={handleViewMore}
                                    disabled={isLoadingMore}
                                    style={{
                                        width: 'auto',
                                        height: '40px',
                                        borderRadius: '8px',
                                        padding: '10px 14px',
                                        background: isLoadingMore ? '#666666' : '#000000',
                                        color: '#FFFFFF',
                                        fontFamily: 'var(--font-inter)',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        opacity: isLoadingMore ? 0.7 : 1
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isLoadingMore) {
                                            (e.target as HTMLButtonElement).style.opacity = '0.8';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isLoadingMore) {
                                            (e.target as HTMLButtonElement).style.opacity = '1';
                                        }
                                    }}
                                >
                                    {isLoadingMore ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Loading...
                                        </div>
                                    ) : (
                                        'View More'
                                    )}
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
            
            {/* Add CSS animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }
                
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: .5;
                    }
                }
            `}</style>
        </main>
    );
}
