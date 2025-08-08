'use client';

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { getAllArticles, formatCategoryDisplay } from "./utils/articleUtils";
import Link from "next/link";
import { Article } from "./types/article";

export default function Home() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
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

    const handleViewMore = () => {
        const nextPage = currentPage + 1;
        const startIndex = 0;
        const endIndex = nextPage * articlesPerPage;
        setDisplayedArticles(articles.slice(startIndex, endIndex));
        setCurrentPage(nextPage);
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
        <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white" style={{ borderRadius: '45px' }}>
            <Header />
            <div className="ml-[60px]">
                <section className="mb-12">
                    <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 sm:mb-6" style={{
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
                            marginBottom: '70px'
                            
                        }}>
                            Discover the stories, trends, and<br />
                            experiences that shape <span style={{ fontWeight: 700 }}>
                                how we live,<br />
                                work, and connect, blending everyday.
                            </span>
                        </p>
                        <div className="flex flex-row gap-8 w-full mt-12 overflow-hidden">
                            {articles.slice(0, 3).map((article: Article) => (
                                <Link
                                    key={article.id}
                                    href={`/articles/${article.slug}`}
                                    className="flex-shrink-0 w-[350px] flex flex-row items-center gap-4 hover:opacity-90 transition-opacity"
                                >
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="rounded-2xl object-cover"
                                        style={{
                                            width: '140px',
                                            aspectRatio: '1/1',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm sm:text-base font-medium mb-1 block text-green-600">
                                            {formatCategoryDisplay(article.category, article.secondCategory)}
                                        </span>
                                        <span className="font-medium text-sm sm:text-base text-black block" style={{
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
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Topic/Series/Creator Grid Section */}
                <section className="mb-16 px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2" style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 600,
                        color: '#000000',
                        lineHeight: '120%',
                        letterSpacing: '0%'
                    }}>
                        Dive in by topic, series, or creator
                    </h2>
                    <p className="mb-8 text-sm sm:text-base max-w-lg sm:max-w-xl md:max-w-2xl" style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 400,
                        fontSize: '14px',
                        color: '#111'
                    }}>
                        A ribbon-esque stair connects three levels that hold a bath
                    </p>
                    <div className="flex justify-start gap-12 flex-wrap">
                        {articles.slice(0, 3).map((article: Article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.slug}`}
                                className="w-[320px] block hover:opacity-90 transition-opacity"
                            >
                                <div>
                                    <img
                                        src={article.coverImage}
                                        alt={article.category}
                                        className="rounded-2xl mb-4 w-full h-[320px] object-cover"
                                    />
                                    <span className="text-sm font-semibold mb-2 block text-orange-400">
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

                {/* Articles List Section */}
                <section className="w-full flex flex-col items-start pb-16 mb-[40px] ml-[40px]">
                    <div className="flex flex-col gap-12 w-full max-w-3xl">
                        {displayedArticles.map((article: Article) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.slug}`}
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
                        ))}
                    </div>
                    {hasMoreArticles && (
                        <div className="flex flex-col items-center justify-center w-full mt-12">
                            <button
                                onClick={handleViewMore}
                                style={{
                                    width: 'auto',
                                    height: '53px',
                                    borderRadius: '10px',
                                    padding: '15px 20px',
                                    background: '#000000',
                                    color: '#FFFFFF',
                                    fontFamily: 'var(--font-inter)',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    transition: 'opacity 0.2s ease'
                                }}
                                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '0.8'}
                                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
                            >
                                View More
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
