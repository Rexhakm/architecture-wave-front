import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import { getImageUrl, getBackendBaseUrl } from '../../utils/imageUtils.ts';
import { formatCategoryDisplay } from '../../utils/articleUtils';
import Header from '../../components/Header';

const API_BASE_URL = `${getBackendBaseUrl()}/api`;

// Category color mapping function
function getCategoryColor(category) {
  const categoryColors = {
    'Architecture': '#88B056',
    'Lifestyle': '#DA6969',
    'Travel': '#5162BC',
    'Design': '#88B056',
    'Interior': '#DA6969',
    'Urban': '#5162BC'
  };
  
  const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : 'Architecture';
  return categoryColors[capitalizedCategory] || '#88B056';
}

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
    `${API_BASE_URL}/articles?filters[uid][$eq]=${uid}&populate[coverImage]=true&populate[blocks][populate]=*&fields=id,title,description,uid,category,secondCategory,createdAt,updatedAt`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  if (!data.data || data.data.length === 0) return null;
  
  const articleData = data.data[0];
  console.log('articleData:', articleData);
  
  // Handle cover image - convert to string URL like in articleUtils.ts
  let coverImageUrl = null;
  if (articleData.coverImage && Array.isArray(articleData.coverImage) && articleData.coverImage.length > 0) {
    coverImageUrl = getImageUrl(articleData.coverImage[0].url);
    console.log('Generated cover image URL:', coverImageUrl);
  }
  
  return {
    title: articleData.title,
    slug: articleData.uid,
    description: articleData.description,
    category: articleData.category,
    secondCategory: articleData.secondCategory,
    categoryColor: getCategoryColor(articleData.category),
    coverImage: coverImageUrl, // Return as string URL
    coverImageData: articleData.coverImage?.[0] || null, // Keep original data for alt text
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

async function getSimilarArticles(category, currentSlug, limit = 3) {
  try {
    // URL encode the category to handle special characters like "+"
    const encodedCategory = encodeURIComponent(category);
    console.log('Searching for similar articles with category:', category, 'encoded:', encodedCategory);
    
    // Get the current article to access its secondCategory
    const currentArticleRes = await fetch(
      `${API_BASE_URL}/articles?filters[uid][$eq]=${currentSlug}&fields=secondCategory`,
      { next: { revalidate: 60 } }
    );
    const currentArticleData = await currentArticleRes.json();
    const currentSecondCategory = currentArticleData.data?.[0]?.secondCategory;
    
    // Build the OR filter for category OR secondCategory
    let filters = `filters[uid][$ne]=${currentSlug}`;
    
    if (currentSecondCategory) {
      const encodedSecondCategory = encodeURIComponent(currentSecondCategory);
      filters += `&filters[$or][0][category][$eq]=${encodedCategory}&filters[$or][1][category][$eq]=${encodedSecondCategory}&filters[$or][2][secondCategory][$eq]=${encodedCategory}&filters[$or][3][secondCategory][$eq]=${encodedSecondCategory}`;
    } else {
      filters += `&filters[$or][0][category][$eq]=${encodedCategory}&filters[$or][1][secondCategory][$eq]=${encodedCategory}`;
    }
    
    console.log('Using filters:', filters);
    
    let res = await fetch(
      `${API_BASE_URL}/articles?${filters}&populate[coverImage]=true&fields=id,title,description,uid,category,secondCategory,createdAt,updatedAt&sort=createdAt:desc&pagination[limit]=${limit}`,
      { next: { revalidate: 60 } }
    );

    let data = await res.json();
    console.log('Similar articles API response:', data);
    
    // If no articles found, try Architecture category as fallback
    if (!data.data || data.data.length === 0) {
      console.log(`No articles found with category or secondCategory, falling back to Architecture category`);
      res = await fetch(
        `${API_BASE_URL}/articles?filters[category][$eq]=Architecture&filters[uid][$ne]=${currentSlug}&populate[coverImage]=true&fields=id,title,description,uid,category,secondCategory,createdAt,updatedAt&sort=createdAt:desc&pagination[limit]=${limit}`,
        { next: { revalidate: 60 } }
      );
      data = await res.json();
      console.log('Fallback Architecture articles response:', data);
    }

    if (!data.data) {
      console.log('No similar articles found with any category or secondCategory');
      return [];
    }

    console.log(`Found ${data.data.length} similar articles`);

    return data.data.map(article => {
      // Handle cover image
      let coverImageUrl = '/assets/image-1.png'; // fallback
      if (article.coverImage && Array.isArray(article.coverImage) && article.coverImage.length > 0) {
        coverImageUrl = getImageUrl(article.coverImage[0].url);
      }

      return {
        id: article.id,
        title: article.title,
        description: article.description,
        slug: article.uid,
        category: article.category,
        secondCategory: article.secondCategory,
        coverImage: coverImageUrl,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt
      };
    });
  } catch (error) {
    console.error('Error fetching similar articles:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const articleUrl = `${baseUrl}/articles/${article.slug}`;
  const imageUrl = article.coverImage ? article.coverImage : `${baseUrl}/default-article-image.jpg`;

  return {
    title: article.title,
    description: article.description || 'Check out this interesting article on ArchitectureWave',
    
    // Open Graph tags for Facebook
    openGraph: {
      title: article.title,
      description: article.description || 'Check out this interesting article on ArchitectureWave',
      url: articleUrl,
      siteName: 'ArchitectureWave',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.coverImageData?.alternativeText || article.title,
          type: 'image/jpeg',
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: ['ArchitectureWave'],
      section: article.category,
      tags: [article.category, article.secondCategory].filter(Boolean),
    },
    
    // Twitter Card tags
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || 'Check out this interesting article on ArchitectureWave',
      images: [imageUrl],
      creator: '@ArchitectureWave',
      site: '@ArchitectureWave',
    },
    
    // Additional meta tags
    alternates: {
      canonical: articleUrl,
    },
    
    // Additional meta tags for better social sharing
    keywords: [article.category, article.secondCategory, 'architecture', 'design'].filter(Boolean).join(', '),
    authors: [{ name: 'ArchitectureWave' }],
  };
}

const ImagePreviewer = dynamic(() => import('./ImagePreviewer'), { ssr: false });
const RichTextImageHandler = dynamic(() => import('./RichTextImageHandler'), { ssr: false });
const UnifiedImageLightbox = dynamic(() => import('./UnifiedImageLightbox'), { ssr: false });
const CoverImage = dynamic(() => import('./CoverImage'), { ssr: false });
const ShareButton = dynamic(() => import('./ShareButton'), { ssr: false });

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

  // Fetch similar articles with the same category
  const similarArticles = await getSimilarArticles(article.category, slug, 3);

  // Collect all images from the article for unified lightbox
  const allImages = [];
  
  // Add images from image blocks
  article.blocks?.forEach((block, blockIndex) => {
    if (block.__component === 'article-blocks.image-block' && block.images) {
      block.images.forEach((image, imageIndex) => {
        allImages.push({
          src: getImageUrl(image.url),
          alt: image.alternativeText || `Article image ${allImages.length + 1}`,
          type: 'image-block',
          caption: image.caption,
          blockIndex,
          imageIndex
        });
      });
    }
  });

  // Extract images from rich text content (markdown)
  article.blocks?.forEach((block, blockIndex) => {
    if (block.__component === 'article-blocks.text-block' && block.content) {
      // Simple regex to find markdown image syntax ![alt](url)
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let match;
      let imageIndex = 0;
      
      while ((match = imageRegex.exec(block.content)) !== null) {
        const [, alt, url] = match;
        // Check if it's a relative URL and convert to full URL if needed
        const fullUrl = url.startsWith('http') ? url : getImageUrl(url);
        
        allImages.push({
          src: fullUrl,
          alt: alt || `Rich text image ${imageIndex + 1}`,
          type: 'rich-text',
          caption: null,
          blockIndex,
          imageIndex: imageIndex++
        });
      }
    }
  });

  return (
    <main className="w-[calc(100%-40px)] mx-auto px-4 bg-white" style={{ marginBottom: '20px', borderRadius: '45px'  }}>
      <Header />
      <UnifiedImageLightbox allImages={allImages}>
        <div className="min-h-screen">
          {article.coverImage && (
            <CoverImage 
              src={article.coverImage}
              alt={article.coverImageData?.alternativeText || article.title}
            />
          )}

          {/* Category Tags */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex flex-wrap gap-2" style={{ gap: '10px' }}>
              {article.category && (
                <span 
                  className="text-white text-sm font-medium"
                  style={{
                    backgroundColor: article.categoryColor,
                    height: '40px',
                    borderRadius: '10px',
                    paddingTop: '4px',
                    paddingRight: '15px',
                    paddingBottom: '4px',
                    paddingLeft: '15px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {article.category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </span>
              )}
              {article.secondCategory && (
                <span 
                  className="text-white text-sm font-medium"
                  style={{
                    backgroundColor: article.categoryColor,
                    height: '40px',
                    borderRadius: '10px',
                    paddingTop: '4px',
                    paddingRight: '15px',
                    paddingBottom: '4px',
                    paddingLeft: '15px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {article.secondCategory.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                </span>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{article.title}</h1>
                {article.description && (
                  <p className="text-base sm:text-lg md:text-xl text-gray-600">{article.description}</p>
                )}
              </div>
              <ShareButton article={article} />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
            {article.blocks &&
              article.blocks.map((block, index) => {
                if (block.__component === 'article-blocks.text-block') {
                  // Add null check for block.content
                  if (!block.content) {
                    return null; // Skip rendering if content is null/undefined
                  }
                  const html = marked.parse(block.content);
                  return (
                    <div key={index} className="mb-6 sm:mb-8">
                      <RichTextImageHandler allImages={allImages}>
                        <div
                          className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-img:transition-all prose-img:duration-200 prose-img:hover:scale-[1.02] prose-img:cursor-pointer"
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
                      </RichTextImageHandler>
                    </div>
                  );
                }

                if (block.__component === 'article-blocks.image-block') {
                  return (
                    <div key={index} className="mb-6 sm:mb-8">
                      <ImagePreviewer images={block.images} allImages={allImages} />
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

          {/* Similar Articles */}
          {similarArticles.length > 0 && (
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
                {similarArticles.map((similarArticle) => (
                  <a 
                    key={similarArticle.id} 
                    href={`/articles/${similarArticle.slug}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={similarArticle.coverImage}
                        alt={similarArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {similarArticle.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </UnifiedImageLightbox>
    </main>
  );
}
