import Image from 'next/image';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import { getImageUrl, getBackendBaseUrl } from '../../utils/imageUtils.ts';
import Header from '../../components/Header';


const API_BASE_URL = `${getBackendBaseUrl()}/api`;

function sanitize(html) {
  if (typeof window === 'undefined') {
    const { window } = new JSDOM('');
    return DOMPurify(window).sanitize(html);
  } else {
    return DOMPurify.sanitize(html);
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/articles?fields=uid`);
    const data = await res.json();
    const articles = data.data || [];
    return articles.map(article => ({ slug: article.uid }));
  } catch (error) {
    console.error('Error fetching article uids:', error);
    return [];
  }
}

async function getArticle(uid) {
  const res = await fetch(
    `${API_BASE_URL}/articles?filters[uid][$eq]=${uid}&populate[coverImage]=true&populate[blocks][populate]=*`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  if (!data.data || data.data.length === 0) return null;
  const articleData = data.data[0];
  console.log('articleData:', articleData);
  
  // Handle cover image - it's an array directly
  let coverImage = null;
  if (articleData.coverImage && Array.isArray(articleData.coverImage) && articleData.coverImage.length > 0) {
    coverImage = articleData.coverImage[0];
  }
  
  return {
    title: articleData.title,
    slug: articleData.uid,
    description: articleData.description,
    coverImage: coverImage,
    blocks: articleData.blocks?.map(block => {
      if (block.__component === 'article-blocks.text-block') {
        return {
          __component: block.__component,
          content: block.content,
        };
      }
      if (block.__component === 'article-blocks.image-block') {
        return {
          __component: block.__component,
          images: block.image || [], // use block.image from Strapi
        };
      }
      return block;
    }) || [],
  };
}

const ImagePreviewer = dynamic(() => import('./ImagePreviewer'), { ssr: false });

export default async function Page({ params }) {
  const { slug } = params;
  const article = await getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Article not found
      </div>
    );
  }

  return (
    <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white rounded-3xl" style={{ marginBottom: '20px' }}>
      <Header />
      <div className="min-h-screen bg-white">
        {article.coverImage && (
          <div className="max-w-5xl mx-auto mb-6 sm:mb-8 h-64 sm:h-80 md:h-96 lg:h-[500px] relative rounded-2xl sm:rounded-[45px] overflow-hidden mt-8 sm:mt-12 md:mt-10">
            <Image
              src={getImageUrl(article.coverImage.url)}
              alt={article.coverImage.alternativeText || article.title}
              fill
              className="w-full h-full object-cover rounded-2xl sm:rounded-[45px] shadow-lg"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{article.title}</h1>
          {article.description && (
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">{article.description}</p>
          )}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
          {article.blocks &&
            article.blocks.map((block, index) => {
              if (block.__component === 'article-blocks.text-block') {
                const html = marked.parse(block.content); 
                console.log('block.content:', block.content);
                console.log('Parsed HTML:', marked.parse(block.content));
                return (
                  <div key={index} className="mb-6 sm:mb-8">
                    <div
                      className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
                      style={{
                        fontFamily: 'var(--font-mazzard-soft)',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '18px',
                        lineHeight: '26px',
                        letterSpacing: '0%',
                        color: '#111111'
                      }}
                      dangerouslySetInnerHTML={{ __html: sanitize(html) }}
                      />
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

        {/* ArchitectureWave Branding */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-center justify-start gap-2 mb-4">
            <img src="/assets/Vector-7.png" alt="ArchitectureWave logo" className="w-8 h-7" />
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

        {/* Similar Articles Section */}
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
            {/* Article Card 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/assets/image-1.png" 
                  alt="Yellow-washed building" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  Why the Internet Is Obsessed with This Yellow-Washed...
                </h3>
              </div>
            </div>

            {/* Article Card 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/assets/image-2.png" 
                  alt="Pink wall with window" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  How Architecture Shapes What You Feel (Even If You...
                </h3>
              </div>
            </div>

            {/* Article Card 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="/assets/image-3.png" 
                  alt="Modern architectural interior" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  PEDREA by JSa and MTA+VPEDRE is not trying to...
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 