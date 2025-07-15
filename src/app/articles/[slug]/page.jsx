import Image from 'next/image';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import { getImageUrl, getBackendBaseUrl } from '../../utils/imageUtils';
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
    return articles.map(article => ({ slug: article.attributes.uid }));
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
  return {
    title: articleData.title,
    slug: articleData.uid,
    description: articleData.description,
    coverImage: Array.isArray(articleData.coverImage) ? articleData.coverImage[0] : null,
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
          <div className="max-w-5xl mx-auto mb-6 sm:mb-8 h-64 sm:h-80 md:h-96 lg:h-[500px] relative rounded-2xl sm:rounded-[45px] overflow-hidden mt-16 sm:mt-20 md:mt-[100px]">
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
      </div>
    </main>
  );
} 