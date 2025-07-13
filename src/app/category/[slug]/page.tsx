import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

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

const articles = [
  { img: '/assets/article1.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article2.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article3.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article4.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article5.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article6.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article7.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article8.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
  { img: '/assets/article9.jpg', title: `WTF Happened to the Winners of Airbnb's $10M` },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white rounded-3xl min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1 }}>
      <Header />
      <div style={{ padding: '48px 48px 48px 30px' }}>
        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-mazzard-soft)',
            fontWeight: 400,
            fontSize: '72px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#111',
            marginBottom: 0,
            width: '60%'
          }}
        >
          Oceanfront condos in <span style={{ fontWeight: 500 }}>{title} + Culture</span>
        </h1>
        {/* Subheading */}
        <p style={{ 
        margin: '24px 0 32px 0', 
        fontFamily: 'var(--font-mazzard-soft)',
        fontWeight: 500,
        fontSize: '18px',
        lineHeight: '28px',
        letterSpacing: '5%',
        color: '#000',
        maxWidth: '600px'
      }}>
        Discover the stories, trends, and experiences that shape <span style={{ fontWeight: 700 }}>
          how we live, work, and connect, blending everyday.
        </span>
      </p>
        {/* Category Filter Buttons */}
        <div className="flex gap-3 mb-10">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${cat.name.toLowerCase()}`}
              style={{
                background: cat.name.toLowerCase() === slug.toLowerCase() ? '#E0B1B1' : '#F5F5F5',
                color: '#111',
                fontFamily: 'var(--font-mazzard-soft)',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '37px',
                letterSpacing: '5%',
                borderRadius: '10px',
                padding: '0 24px',
                height: '40.38px',
                minWidth: '109px',
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                textAlign: 'center',
                transition: 'background 0.15s, color 0.15s',
                boxShadow: 'none',
                marginRight: 12
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        {/* Article Grid */}
        <div
          className="mb-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 300px)',
            gap: 20,
            justifyContent: 'start',
          }}
        >
          {articles.map((article, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="mb-3 overflow-hidden rounded-2xl bg-gray-100" style={{ width: 300, height: 300 }}>
                <img src={article.img} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
              </div>
              <div className="font-medium text-base leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{article.title}</div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex flex-col items-center">
          <button className="bg-black text-white px-6 py-2 rounded-lg font-medium mb-2 hover:bg-gray-900 transition">View More</button>
          <span className="text-gray-400 text-sm">723 more articles</span>
        </div>
      </div>
    </main>
  );
} 