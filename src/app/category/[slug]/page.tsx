import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import { getArticlesByCategory } from '../../utils/articleUtils';
import { Article } from '../../types/article';
import { absOrFallback } from '../../utils/urlUtils';
import { CATEGORY_COLORS } from '../../utils/categoryColors';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categories = Object.entries(CATEGORY_COLORS).map(([name, color]) => ({
  name,
  color
}));


export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const title = (() => {
    const normalized = slug
      .toLowerCase()
      .replace(/-/g, ' ')
      .replace(/\s+and\s+/g, ' + ')
      .replace(/plus/g, '+')
      .trim();
    const mapped = (normalized === 'architecture' || normalized === 'architecture+design' || normalized === 'architecture + design')
      ? 'architecture + design'
      : normalized;
    return mapped
      .split(/([+])/)
      .map(token => token === '+' ? ' + ' : token.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
      .join('')
      .replace(/\s+\+\s+/g, ' + ')
      .trim()
      .replace(/^Architecture \+ design$/, 'Architecture + Design');
  })();

  // Fetch articles for the current category
  let articles: Article[] = [];
  try {
    articles = await getArticlesByCategory(slug);
    console.log(`Fetched ${articles.length} articles for category: ${slug}`);
  } catch (error) {
    console.error('Error fetching articles:', error);
    articles = [];
  }

  // Display all available articles
  const displayArticles = articles;

  return (
    <main className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
      <Header />
      <div className="ml-0 sm:ml-[60px]">
        <section className="mb-12">
          <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
            {/* Category Title */}
            <h1
              className="mb-6 sm:mb-8 text-4xl sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#000'
              }}
            >
              {title}
            </h1>
            {/* Subheading - consistent across all categories */}
            <p className="mb-6 sm:mb-8 text-base sm:text-lg max-w-lg sm:max-w-xl md:max-w-2xl" style={{ 
              fontFamily: 'var(--font-mazzard-soft)',
              fontWeight: 500,
              lineHeight: '28px',
              letterSpacing: '5%',
              color: '#000',
            }}>
              Explore the narratives of how design influences identity, <span style={{ fontWeight: 700 }}>
              and the rhythms of modern living.
              </span>
            </p>
            
            {/* Category Filter Buttons - consistent styling across all categories */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
              {categories.map((cat) => {
                // Handle spaces and special characters in category names by converting to URL-friendly format
                const categorySlug = cat.name.toLowerCase()
                  .replace(/\s+/g, '-')           // Replace spaces with hyphens
                  .replace(/\+/g, 'plus')         // Replace + with 'plus'
                  .replace(/[^a-z0-9-]/g, '');   // Remove any other special characters
                const isActive = categorySlug === slug.toLowerCase();
                return (
                  <Link
                    key={cat.name}
                    href={absOrFallback(`/category/${categorySlug}`)}
                    className="px-3 sm:px-6 py-2 sm:text-base md:text-lg font-bold rounded-lg transition-colors duration-150"
                    style={{
                      background: isActive ? cat.color : '#F5F5F5',
                      color: '#111',
                      fontFamily: 'var(--font-mazzard-soft)',
                      lineHeight: '37px',
                      letterSpacing: '5%',
                      minWidth: 'fit-content',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      textAlign: 'center',
                      boxShadow: 'none',
                      height: '40px',
                    }}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Article Grid - single row layout with fixed heights */}
            {displayArticles.length > 0 ? (
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-5 mb-8 sm:mb-12" style={{ gap: '20px' }}>
                {displayArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={absOrFallback(`/articles/${article.slug}`)}
                    className="flex flex-col items-start flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer w-full sm:w-[300.20703125px]"
                    style={{ 
                      height: '400px'
                    }}
                  >
                    <div className="mb-3 overflow-hidden rounded-2xl bg-gray-100 w-full sm:w-[300.20703125px]" style={{ 
                      height: '300.20703125px'
                    }}>
                      <img 
                        src={article.coverImage} 
                        alt={article.title} 
                        className="w-full h-full object-cover rounded-2xl" 
                      />
                    </div>
                    <div className="font-medium text-sm sm:text-base leading-tight" style={{ 
                      fontFamily: 'var(--font-mazzard-soft)',
                      color: '#111',
                      fontWeight: 500,
                      fontStyle: 'normal',
                      fontSize: '20px',
                      lineHeight: '27px',
                      letterSpacing: '0%',
                      wordWrap: 'break-word'
                    }}>
                      {article.title}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg" style={{ fontFamily: 'var(--font-mazzard-soft)' }}>
                  Looks like there aren&apos;t any articles in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
} 