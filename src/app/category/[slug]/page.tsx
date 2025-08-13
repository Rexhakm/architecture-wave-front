import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import { getArticlesByCategory } from '../../utils/articleUtils';
import { Article } from '../../types/article';
import { absOrFallback } from '../../utils/urlUtils';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const categories = [
  { name: 'Lifestyle', color: '#E6C6C6' },
  { name: 'Travel', color: '#E6E6E6' },
  { name: 'DIY', color: '#E6E6E6' },
  { name: 'Art', color: '#E6E6E6' },
];

// Fallback articles for when API is not available
const fallbackArticles = [
  { id: 1, title: 'WTF Happened to the Winners of Airbnb\'s $10M', coverImage: '/assets/article1.jpg', category: 'Lifestyle' },
  { id: 2, title: 'Modern Architecture Trends in 2024', coverImage: '/assets/article2.jpg', category: 'Travel' },
  { id: 3, title: 'DIY Home Renovation Guide', coverImage: '/assets/article3.jpg', category: 'DIY' },
  { id: 4, title: 'Contemporary Art in Architecture', coverImage: '/assets/article4.jpg', category: 'Art' },
  { id: 5, title: 'Sustainable Living Spaces', coverImage: '/assets/article5.jpg', category: 'Lifestyle' },
  { id: 6, title: 'Urban Planning Innovations', coverImage: '/assets/article6.jpg', category: 'Travel' },
  { id: 7, title: 'Creative DIY Projects', coverImage: '/assets/article7.jpg', category: 'DIY' },
  { id: 8, title: 'Artistic Interior Design', coverImage: '/assets/article8.jpg', category: 'Art' },
  { id: 9, title: 'Lifestyle Architecture Trends', coverImage: '/assets/article9.jpg', category: 'Lifestyle' },
];

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  // Fetch articles for the current category
  let articles: Article[] = [];
  try {
    articles = await getArticlesByCategory(slug);
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Use fallback articles filtered by category
    articles = fallbackArticles
      .filter(article => article.category.toLowerCase() === slug.toLowerCase())
      .map(article => ({
        id: article.id,
        title: article.title,
        description: '',
        slug: `article-${article.id}`,
        category: article.category,
        categoryColor: '#88B056',
        coverImage: article.coverImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
  }

  return (
    <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
      <Header />
      <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-8 md:py-12">
        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 sm:mb-6 w-full lg:w-3/5"
          style={{
            fontFamily: 'var(--font-mazzard-soft)',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#111',
          }}
        >
          Oceanfront condos in <span style={{ fontWeight: 500 }}>{title} + Culture</span>
        </h1>
        {/* Subheading */}
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
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={absOrFallback(`/category/${cat.name.toLowerCase()}`)}
              className="px-3 sm:px-6 py-2 sm:text-base md:text-lg font-bold rounded-lg transition-colors duration-150"
              style={{
                background: cat.name.toLowerCase() === slug.toLowerCase() ? '#E0B1B1' : '#F5F5F5',
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
          ))}
        </div>
        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {articles.map((article) => (
            <div key={article.id} className="flex flex-col items-start">
              <div className="mb-3 overflow-hidden rounded-2xl bg-gray-100 w-full aspect-square">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-full object-cover rounded-2xl" 
                />
              </div>
              <div className="font-medium text-sm sm:text-base leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                {article.title}
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex flex-col items-center">
          <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium mb-2 hover:bg-gray-900 transition text-sm sm:text-base">
            View More
          </button>
          <span className="text-gray-400 text-xs sm:text-sm">{articles.length} articles in {title}</span>
        </div>
      </div>
    </main>
  );
} 