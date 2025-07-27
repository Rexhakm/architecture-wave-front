"use client";

import React from 'react';
import { CldImage } from 'next-cloudinary';

interface ArticleClientProps {
  article: any;
  ImagePreviewer: any;
  RichTextImageHandler: any;
  sanitize: any;
  marked: any;
}

export default function ArticleClient({ 
  article, 
  ImagePreviewer, 
  RichTextImageHandler, 
  sanitize, 
  marked 
}: ArticleClientProps) {
  return (
    <>
      {article.coverImage && (
        <div className="max-w-5xl mx-auto mb-6 sm:mb-8 h-64 sm:h-80 md:h-96 lg:h-[500px] relative rounded-2xl sm:rounded-[45px] overflow-hidden mt-8 sm:mt-12 md:mt-10">
          <CldImage
            src={article.coverImage}
            alt={article.coverImageData?.alternativeText || article.title}
            fill
            className="object-cover rounded-2xl sm:rounded-[45px] shadow-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            onError={(e) => {
              console.log('Cover image failed to load:', article.coverImage);
              // Fallback to a placeholder or hide the image
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{article.title}</h1>
        {article.description && (
          <p className="mb-6 sm:mb-8" style={{
            fontFamily: 'Mazzard Soft H',
            fontWeight: 400,
            fontStyle: 'Regular',
            fontSize: '30px',
            lineHeight: '38px',
            letterSpacing: '0%',
            color: '#000000',
            marginTop: '30px'
          }}>{article.description}</p>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
        {article.blocks &&
          article.blocks.map((block: any, index: number) => {
            if (block.__component === 'article-blocks.text-block') {
              const html = marked.parse(block.content);
              return (
                <div key={index} className="mb-6 sm:mb-8">
                  <RichTextImageHandler>
                    <div
                      className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-img:transition-all prose-img:duration-200 prose-img:hover:scale-[1.02] prose-img:cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '18px',
                        lineHeight: '26px',
                        letterSpacing: '0%',
                        color: '#000000'
                      }}
                      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
                    />
                  </RichTextImageHandler>
                </div>
              );
            }

            if (block.__component === 'article-blocks.image-block') {
              return (
                <div key={index} className="mb-6 sm:mb-8">
                  <ImagePreviewer images={block.images} />
                </div>
              );
            }

            return null;
          })}
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <hr className="border-gray-200" />
      </div>

      {/* Branding */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center justify-start gap-2 mb-4">
          <img src="/assets/Vector-7.png" alt="ArchitectureWave logo" width={32} height={28} className="w-8 h-7" />
          <span style={{
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000'
          }}>ArchitectureWave</span>
        </div>
      </div>

      {/* Similar Articles */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-24">
        <h2 style={{
          fontFamily: 'var(--font-mazzard-soft)',
          fontWeight: 500,
          fontStyle: 'normal',
          fontSize: '28px',
          lineHeight: '60px',
          letterSpacing: '0%',
          color: '#111111',
          marginBottom: '32px'
        }}>Similar articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={`/assets/image-${i}.png`}
                  alt={`Article preview ${i}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  Sample title for article card {i}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
} 