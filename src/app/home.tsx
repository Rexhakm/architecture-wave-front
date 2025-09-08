'use client';

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { getAllArticles, formatCategoryDisplay } from "./utils/articleUtils";
import Link from "next/link";
import { Article } from "./types/article";
import { absOrFallback } from "./utils/urlUtils";
import { getCategoryColor } from "./utils/categoryColors";

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
            <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white" style={{ borderRadius: '45px' }}>
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-lg">Loading articles...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white" style={{ borderRadius: '45px' }}>
            <Header />
            <div className="ml-0 sm:ml-[60px]">
                <section className="mb-12">
                    <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 sm:mb-6" style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            color: '#111',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}>
                            Your atlas to a life<br />
                            <span style={{ fontWeight: 700 }}>with a good design.</span>
                        </h1>
                        <p className="mb-6 sm:mb-8 text-base sm:text-lg max-w-lg sm:max-w-xl md:max-w-2xl" style={{
                            fontFamily: 'var(--font-mazzard-soft)',
                            fontWeight: 500,
                            lineHeight: '28px',
                            letterSpacing: '5%',
                            color: '#000',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 4,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: '40px',
                            marginBottom: '70px',

                        }}>
                            Discover the stories, trends, and<br />
                            experiences that shape <span style={{ fontWeight: 700 }}>
                                how we live,<br />
                                work, and connect in the rhythm of everyday life.
                            </span>
                        </p>
                        {/* Mobile: Vertical list layout */}
                        <div className="flex flex-col sm:hidden gap-6 w-full mt-12">
                            {articles.filter(article => article.isPromoted).slice(0, 3).map((article: Article) => (
                                <Link
                                    key={article.id}
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="flex items-center gap-4 hover:opacity-90 transition-opacity"
                                >
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="rounded-2xl object-cover w-32 h-32 flex-shrink-0"
                                        style={{
                                            aspectRatio: '1/1',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div className="flex flex-col flex-1">
                                        <span className="text-sm font-medium mb-1 block" style={{
                                            color: getCategoryColor(article.category)
                                        }}>
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <span className="font-medium text-sm text-black block" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            color: '#111',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>
                                            {article.title}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Desktop: Horizontal layout */}
                        <div className="hidden sm:flex flex-row gap-8 w-full mt-12 overflow-hidden">
                            {articles.filter(article => article.isPromoted).slice(0, 3).map((article: Article) => (
                                <Link
                                    key={article.id}
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="flex-shrink-0 w-[350px] flex flex-row items-center gap-4 hover:opacity-90 transition-opacity"
                                >
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="rounded-2xl object-cover w-[140px] h-[140px]"
                                        style={{
                                            aspectRatio: '1/1',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium mb-1 block" style={{
                                            color: getCategoryColor(article.category)
                                        }}>
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <span className="font-medium text-sm text-black block" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 500,
                                            fontSize: '20px',
                                            lineHeight: '32px',
                                            color: '#111',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
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
                <section className="mb-4 px-4 sm:px-8 md:px-10 py-2 sm:py-4 md:py-6">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2" style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 600,
                        color: '#000000',
                        lineHeight: '120%',
                        letterSpacing: '0%'
                    }}>
                        Dive into projects, ideas, and culture.
                    </h2>
                    <p className="mb-8 text-sm sm:text-base max-w-lg sm:max-w-xl md:max-w-2xl" style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#111'
                    }}>
                        Understanding design as a language of space and story.
                    </p>
                    {/* Mobile: Vertical list layout */}
                    <div className="flex flex-col sm:hidden gap-6">
                        {articles.slice(0, 6).map((article: Article) => (
                            <Link
                                key={article.id}
                                href={absOrFallback(`/articles/${article.slug}`)}
                                className="flex items-center gap-4 hover:opacity-90 transition-opacity"
                            >
                                <img
                                    src={article.coverImage}
                                    alt={article.category}
                                    className="rounded-2xl w-32 h-32 flex-shrink-0 object-cover"
                                />
                                <div className="flex flex-col flex-1">
                                    <span className="text-sm font-semibold mb-1 block" style={{
                                        color: getCategoryColor(article.category)
                                    }}>
                                        {formatCategoryDisplay(article.category, article.secondCategory)}
                                    </span>
                                    <h3 className="font-bold text-sm mb-1" style={{
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
                                    <p className="text-gray-500 text-xs" style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        fontWeight: 400,
                                        fontSize: '12px',
                                        lineHeight: '18px',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        color: '#111'
                                    }}>
                                        {article.description?.substring(0, 80)}...
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Desktop: Grid layout */}
                    <div className="hidden sm:flex justify-start gap-4 sm:gap-12 flex-wrap">
                        {articles.slice(0, 6).map((article: Article) => (
                            <Link
                                key={article.id}
                                href={absOrFallback(`/articles/${article.slug}`)}
                                className="w-full sm:w-[320px] block hover:opacity-90 transition-opacity"
                            >
                                <div>
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="rounded-2xl mb-4 w-full h-[320px] object-cover"
                                    />
                                    <span className="text-sm font-semibold mb-2 block" style={{
                                        color: getCategoryColor(article.category)
                                    }}>
                                        {formatCategoryDisplay(article.category, article.secondCategory)}
                                    </span>
                                    <h3 className="font-bold text-lg mb-2" style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        fontWeight: 500,
                                        fontSize: '20px',
                                        lineHeight: '32px',
                                        color: '#111',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm" style={{
                                        fontFamily: 'var(--font-mazzard-soft)',
                                        fontWeight: 400,
                                        fontSize: '14px',
                                        lineHeight: '26px',
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

            

                {/* New Articles Section - 4 items only */}
                <section className="w-full flex flex-col items-start pb-4 mb-3 ml-0 sm:ml-[40px]">
                    <div className="flex flex-col gap-8 sm:gap-6 w-full max-w-3xl">
                        {articles.length > 3 ? articles.slice(3, 7).map((article: Article, index: number) => (
                            <div
                                key={`new-${article.id}`}
                                className="animate-fadeInUp"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: 'both'
                                }}
                            >
                                <Link
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="flex flex-col md:flex-row items-start gap-8 hover:opacity-90 transition-opacity cursor-pointer"
                                >
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="w-full md:w-[350px] rounded-2xl object-cover"
                                        style={{
                                            aspectRatio: '16/10',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div>
                                        <span className="block mb-1" style={{
                                            color: article.categoryColor,
                                            fontFamily: 'Inter',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '28.5px',
                                            letterSpacing: '-5%'
                                        }}>
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <h3 className="mb-1" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 500,
                                            fontSize: '20px',
                                            lineHeight: '32px',
                                            color: '#111',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {article.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            lineHeight: '26px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: '#111'
                                        }}>
                                            {article.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )) : (
                            <div className="text-center text-gray-500 py-8">
                                No additional articles available
                            </div>
                        )}
                    </div>
                </section>

                    {/* Featured Projects Section */}
                <section className="mb-4 px-4 sm:px-8 md:px-10 py-2 sm:py-4 md:py-6">
                    <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl" style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 500,
                        fontStyle: 'Medium',
                        lineHeight: '80px',
                        letterSpacing: '0%',
                        color: '#000000'
                    }}>
                        Featured Projects
                    </h2>
                    <p className="mb-4 text-base max-w-2xl" style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#111',
                        lineHeight: '24px'
                    }}>
                        Projects are submitted to Wave by our community of architects, designers, agents, and proud home dwellers. <span 
                            className="cursor-pointer hover:opacity-80" 
                            style={{
                                fontFamily: 'Mazzard Soft H',
                                fontWeight: 600,
                                fontStyle: 'Semi Bold',
                                fontSize: '14px',
                                lineHeight: '100%',
                                letterSpacing: '0%',
                                verticalAlign: 'middle',
                                textDecoration: 'underline',
                                textDecorationStyle: 'solid',
                                textDecorationThickness: '0%'
                            }}
                        >Submit your project! </span>
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        {articles.filter(article => article.isPromoted).slice(0, 1).map((article: Article) => (
                            <div key={`featured-${article.id}`} className="bg-white rounded-2xl overflow-hidden">
                                <Link
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="block hover:opacity-95 transition-opacity"
                                >
                                    <div className="relative">
                                        <img
                                            src={article.coverImage}
                                            alt={article.category}
                                            className="w-full h-[500px] object-cover"
                                            style={{ borderRadius: '45px' }}
                                        />
                                    </div>
                                    <div className="pl-0 pr-2 py-4">
                                        <span className="block mb-1" style={{
                                            color: getCategoryColor(article.category),
                                            fontFamily: 'Inter',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '28.5px',
                                            letterSpacing: '-5%'
                                        }}>
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <h3 className="mb-1" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 500,
                                            fontSize: '20px',
                                            lineHeight: '32px',
                                            color: '#111',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {article.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            lineHeight: '26px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: '#111'
                                        }}>
                                            {article.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Section - Two Cards Side by Side */}
                <section className="mb-4 px-4 sm:px-8 md:px-10 pt-0 pb-2 sm:pt-1 sm:pb-4 md:pt-2 md:pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {articles.filter(article => article.isPromoted).slice(0, 2).map((article: Article, index: number) => (
                            <div key={`featured-card-${article.id}`} className="bg-white rounded-2xl overflow-hidden">
                                <Link
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="block hover:opacity-95 transition-opacity"
                                >
                                    <div className="relative">
                                        <img
                                            src={article.coverImage}
                                            alt={article.category}
                                            className="w-full h-[350px] object-cover"
                                            style={{ borderRadius: '20px' }}
                                        />
                                    </div>
                                    <div className="pt-6 pr-6 pb-6 pl-0">
                                        <span className="block mb-3 text-sm font-semibold" style={{
                                            color: getCategoryColor(article.category),
                                            fontFamily: 'Inter',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            letterSpacing: '-2%'
                                        }}>
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <h3 className="mb-3" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 700,
                                            fontSize: '24px',
                                            lineHeight: '32px',
                                            color: '#111',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {article.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: '#666'
                                        }}>
                                            {article.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Articles List Section */}
                <section className="w-full flex flex-col items-start pb-4 mb-3 ml-0 sm:ml-[40px]">
                    <div className="flex flex-col gap-8 sm:gap-6 w-full max-w-3xl">
                        {displayedArticles.slice(7).map((article: Article, index: number) => (
                            <div
                                key={article.id}
                                className="animate-fadeInUp"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: 'both'
                                }}
                            >
                                {/* Mobile: Vertical list layout */}
                                <Link
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="flex sm:hidden items-center gap-4 hover:opacity-90 transition-opacity cursor-pointer ml-4"
                                >
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="w-32 h-32 rounded-2xl object-cover flex-shrink-0"
                                        style={{
                                            aspectRatio: '1/1',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div className="flex flex-col flex-1">
                                        <span className="block mb-1 text-sm" style={{
                                            color: article.categoryColor,
                                            fontFamily: 'Inter',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            letterSpacing: '-5%'
                                        }}>
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <h3 className="mb-1" style={{
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
                                        <p className="text-xs" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 400,
                                            fontSize: '12px',
                                            lineHeight: '18px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: '#111'
                                        }}>
                                            {article.description}
                                        </p>
                                    </div>
                                </Link>

                                {/* Desktop: Horizontal layout */}
                                <Link
                                    href={absOrFallback(`/articles/${article.slug}`)}
                                    className="hidden sm:flex flex-col md:flex-row items-start gap-8 hover:opacity-90 transition-opacity cursor-pointer"
                                >
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="w-full md:w-[350px] rounded-2xl object-cover"
                                        style={{
                                            aspectRatio: '16/10',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div>
                                        <span className="block mb-1" style={{
                                            color: article.categoryColor,
                                            fontFamily: 'Inter',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '28.5px',
                                            letterSpacing: '-5%'
                                        }}>
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <h3 className="mb-1" style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 500,
                                            fontSize: '20px',
                                            lineHeight: '32px',
                                            color: '#111',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {article.title}
                                        </h3>
                                        <p style={{
                                            fontFamily: 'var(--font-mazzard-soft)',
                                            fontWeight: 400,
                                            fontSize: '14px',
                                            lineHeight: '26px',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            color: '#111'
                                        }}>
                                            {article.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                        
                        {/* Loading indicator for new articles */}
                        {isLoadingMore && (
                            <div className="flex flex-col gap-6 w-full max-w-3xl animate-pulse">
                                {[...Array(3)].map((_, index) => (
                                    <div key={`loading-${index}`} className="flex flex-col md:flex-row items-start gap-8">
                                        <div className="w-full md:w-[350px] h-[220px] bg-gray-200 rounded-2xl animate-pulse"></div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                            <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                                            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {hasMoreArticles && (
                        <div className="flex flex-col items-center justify-center w-full mt-6">
                            <button
                                onClick={handleViewMore}
                                disabled={isLoadingMore}
                                style={{
                                    width: 'auto',
                                    height: '53px',
                                    borderRadius: '10px',
                                    padding: '15px 20px',
                                    background: isLoadingMore ? '#666666' : '#000000',
                                    color: '#FFFFFF',
                                    fontFamily: 'var(--font-inter)',
                                    fontWeight: 700,
                                    fontSize: '18px',
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
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
