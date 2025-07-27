"use client";

import React from "react";
import Link from "next/link";
import { CldImage } from 'next-cloudinary';
import { Article } from "../types/article";

interface HomeClientProps {
  articles: Article[];
}

export default function HomeClient({ articles }: HomeClientProps) {
  return (
    <>
      <section className="mb-12">
        <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 sm:mb-6" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            color: '#111',
            lineHeight: '100%',
            letterSpacing: '0%'
          }}>Your atlas to a life<br /><span style={{
            fontWeight: 700,
            fontFamily: 'var(--font-mazzard-soft)'
          }}>with a good design.</span></h1>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg max-w-lg sm:max-w-xl md:max-w-2xl" style={{
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 500,
            lineHeight: '28px',
            letterSpacing: '5%',
            color: '#000',
          }}>
            Discover the stories, trends, and experiences that shape <span style={{ fontWeight: 700 }}>
              how we live, work, and connect, blending everyday.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-start items-start mt-8 sm:mt-12 md:mt-20">
            {articles.slice(0, 3).map((article: Article, idx: number) => (
              <Link key={article.id} href={`/articles/${article.slug}`} className="flex flex-row items-center w-full sm:w-80 gap-4 hover:opacity-90 transition-opacity">
                <CldImage 
                  src={article.coverImage} 
                  alt={article.category} 
                  width={140}
                  height={140}
                  className="rounded-2xl object-cover" 
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'cover'
                  }}
                  sizes="140px"
                />
                <div>
                  <span className="text-sm sm:text-base font-medium mb-1 block" style={{
                    fontFamily: 'Inter',
                    fontWeight: 600,
                    lineHeight: '28.5px',
                    letterSpacing: '-5%',
                    color: article.categoryColor,
                    textTransform: 'capitalize'
                  }}>{article.category}</span>
                  <span className="font-medium text-sm sm:text-base text-black text-left block" style={{
                    fontWeight: 500,
                    marginBottom: 0,
                    fontFamily: 'var(--font-mazzard-soft)',
                    color: '#000000',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}>{article.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Topic/Series/Creator Grid Section */}
      <section className="mb-16 px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2" style={{
          fontFamily: 'var(--font-mazzard-soft)',
          fontWeight: 500,
          color: '#000000',
          lineHeight: '100%',
          letterSpacing: '0%'
        }}>
          Dive in by topic, series, or creator
        </h2>
        <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-500 max-w-lg sm:max-w-xl md:max-w-2xl" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400 }}>
          A ribbon-esque stair connects three levels that hold a bath
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.slice(0, 6).map((article: Article, idx: number) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="p-0 hover:opacity-90 transition-opacity">
              <div>
                <CldImage 
                  src={article.coverImage} 
                  alt={article.category} 
                  width={400}
                  height={225}
                  className="w-full rounded-2xl mb-4 object-cover" 
                  style={{
                    aspectRatio: '16/9',
                    objectFit: 'cover'
                  }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="text-sm sm:text-base font-medium mb-1 block" style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  lineHeight: '28.5px',
                  letterSpacing: '-5%',
                  color: article.categoryColor,
                  textTransform: 'capitalize'
                }}>{article.category}</span>
                <h3 className="font-semibold text-base sm:text-lg mb-1" style={{
                  fontFamily: 'var(--font-mazzard-soft)',
                  fontWeight: 500,
                  fontSize: '18px',
                  lineHeight: '27px',
                  letterSpacing: '0%',
                  color: '#111'
                }}>{article.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  {article.description?.substring(0, 100)}...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Vertical Card List Section */}
      <section className="mb-16 px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col gap-8 sm:gap-12">
          {articles.slice(0, 4).map((article: Article, idx: number) => (
            <Link key={article.id} href={`/articles/${article.slug}`} className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 hover:opacity-90 transition-opacity">
              <CldImage 
                src={article.coverImage} 
                alt={article.category} 
                width={350}
                height={219}
                className="w-full lg:w-[350px] rounded-2xl object-cover" 
                style={{
                  aspectRatio: '16/10',
                  objectFit: 'cover'
                }}
                sizes="(max-width: 1024px) 100vw, 350px"
              />
              <div>
                <span className="block mb-1 text-sm sm:text-base" style={{
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  lineHeight: '28.5px',
                  letterSpacing: '-5%',
                  color: article.categoryColor,
                  textTransform: 'capitalize'
                }}>{article.category}</span>
                <h3 className="mb-1 text-lg sm:text-xl lg:text-2xl" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, lineHeight: '32px', color: '#111' }}>{article.title}</h3>
                <p className="text-sm sm:text-base" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, lineHeight: '26px', color: '#6B7280' }}>
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Featured Projects Section */}
      <section className="mb-16 px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
        <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--font-mazzard-soft)', color: '#111' }}>
          Featured Projects
        </h2>
        <p className="mb-8 text-gray-500" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', maxWidth: '700px' }}>
          Projects are submitted to Wave by our community of architects, designers, agents, and proud home dwellers. <a href="#" className="font-semibold underline">Post your project!</a>
        </p>
        {/* Two Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Card */}
          {articles.length > 0 && (
            <Link href={`/articles/${articles[0].slug}`} className="hover:opacity-90 transition-opacity">
              <CldImage 
                src={articles[0].coverImage} 
                alt="Featured" 
                width={600}
                height={338}
                className="w-full rounded-2xl mb-4 object-cover" 
                style={{
                  aspectRatio: '16/9',
                  objectFit: 'cover'
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="block mb-1" style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '28.5px',
                letterSpacing: '-5%',
                color: articles[0].categoryColor,
                textTransform: 'capitalize'
              }}>{articles[0].category}</span>
              <h3 className="mb-1" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '32px',
                color: '#111'
              }}>{articles[0].title}</h3>
              <p style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '26px',
                color: '#6B7280'
              }}>
                {articles[0].description?.substring(0, 150)}...
              </p>
            </Link>
          )}
          {/* Second Card */}
          {articles.length > 1 && (
            <Link href={`/articles/${articles[1].slug}`} className="hover:opacity-90 transition-opacity">
              <CldImage 
                src={articles[1].coverImage} 
                alt={articles[1].category} 
                width={600}
                height={338}
                className="w-full rounded-2xl mb-4 object-cover" 
                style={{
                  aspectRatio: '16/9',
                  objectFit: 'cover'
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="block mb-1" style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '28.5px',
                letterSpacing: '-5%',
                color: articles[1].categoryColor,
                textTransform: 'capitalize'
              }}>{articles[1].category}</span>
              <h3 className="mb-1" style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '32px',
                color: '#111'
              }}>{articles[1].title}</h3>
              <p style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '26px',
                color: '#6B7280'
              }}>
                {articles[1].description?.substring(0, 150)}...
              </p>
            </Link>
          )}
        </div>
      </section>
      {/* Subscribe Hero Section */}
      <section className="w-full flex items-center justify-center pb-16" style={{ height: '550px', marginBottom: '40px', paddingLeft: '40px', paddingRight: '40px' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          height: '550px',
          borderRadius: '36px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'url(/assets/Vector-5.png) center/cover no-repeat',
        }}>
          {/* Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(17, 17, 17, 0.65)',
            zIndex: 1,
          }} />
          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <h2 style={{
              color: 'white',
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 400,
              fontSize: '48px',
              lineHeight: '110%',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              Your atlas to a life<br />
              <span style={{ fontWeight: 700 }}>with a good design.</span>
            </h2>
            <button style={{
              marginTop: '24px',
              background: 'white',
              color: '#111',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 32px',
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>Subscribe</button>
          </div>
        </div>
      </section>
      {/* Articles List Section */}
      <section className="w-full flex flex-col items-center pb-16" style={{ paddingLeft: '40px', paddingRight: '40px', marginBottom: '40px' }}>
        <div className="flex flex-col gap-12 w-full max-w-3xl">
          {articles.map((article: Article, idx: number) => (
            <Link 
              key={article.id}
              href={`/articles/${article.slug}`}
              className="flex flex-col md:flex-row items-start gap-8 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <CldImage 
                src={article.coverImage} 
                alt={article.category} 
                width={350}
                height={219}
                className="w-full md:w-[350px] rounded-2xl object-cover" 
                style={{
                  aspectRatio: '16/10',
                  objectFit: 'cover'
                }}
                sizes="(max-width: 768px) 100vw, 350px"
              />
              <div>
                <span className="block mb-1" style={{ color: article.categoryColor, fontFamily: 'Inter', fontWeight: 600, fontSize: '16px', lineHeight: '28.5px', letterSpacing: '-5%', textTransform: 'capitalize' }}>{article.category}</span>
                <h3 className="mb-1" style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 700, fontSize: '24px', lineHeight: '32px', color: '#111' }}>{article.title}</h3>
                <p style={{ fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: '#6B7280' }}>{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center mt-12">
          <span style={{ color: '#BDBDBD', fontFamily: 'var(--font-mazzard-soft)', fontWeight: 400, fontSize: '16px' }}>
            {articles.length} articles available
          </span>
        </div>
      </section>
    </>
  );
} 