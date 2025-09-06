import { Metadata } from "next";
import Header from "../components/Header";
import Link from "next/link";
import { absOrFallback } from "../utils/urlUtils";

export const metadata: Metadata = {
  title: "Categories | Architecture Wave",
  description: "Browse our collection of architectural categories",
};

export default function CategoryPage() {
  const categories = [
    {
      name: "Residential",
      image: "/images/residential.jpg",
      description: "Explore our residential architecture projects and designs.",
    },
    {
      name: "Commercial",
      image: "/images/commercial.jpg",
      description: "Discover our commercial and office space designs.",
    },
    {
      name: "Urban Planning",
      image: "/images/urban-planning.jpg",
      description: "View our urban planning and development projects.",
    },
  ];

  return (
    <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white min-h-[calc(100vh-690px)]" style={{ marginBottom: 40, position: 'relative', zIndex: 1, borderRadius: '45px' }}>
      <Header />
      <div className="ml-[70px]">
        <section className="mb-12">
          <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-12">
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
              Oceanfront condos in <span style={{ fontWeight: 500 }}>Lifestyle + Culture</span>
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
            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={absOrFallback(`/category/${category.name.toLowerCase()}`)}
                  className="block hover:opacity-90 transition-opacity"
                >
                  <div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="rounded-2xl mb-4 w-full h-[320px] object-cover"
                    />
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2" style={{
                      fontFamily: 'var(--font-mazzard-soft)',
                      fontWeight: 500,
                      fontSize: '20px',
                      lineHeight: '32px',
                      color: '#111',
                    }}>
                      {category.name}
                    </h2>
                    <p className="text-gray-500 text-sm" style={{
                      fontFamily: 'var(--font-mazzard-soft)',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '26px',
                      color: '#111'
                    }}>
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 