// app/articles/[slug]/page.jsx

import dynamic from "next/dynamic";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { getImageUrl, getBackendBaseUrl } from "../../utils/imageUtils.ts";
import { absOrFallback } from "../../utils/urlUtils";
import { formatCategoryDisplay } from "../../utils/articleUtils";
import Header from "../../components/Header";
import { getCategoryColor } from "../../utils/categoryColors";

const API_BASE_URL = `${getBackendBaseUrl()}/api`;



function sanitize(html) {
  if (typeof window === "undefined") {
    const { window } = new JSDOM("");
    const DOMPurify = createDOMPurify(window);
    return DOMPurify.sanitize(html);
  }
  return createDOMPurify(window).sanitize(html);
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE_URL}/articles?fields=uid`);
    const data = await res.json();
    const articles = data.data || [];
    return articles.map((article) => ({ slug: article.uid }));
  } catch (error) {
    console.error("Error fetching article uids:", error);
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

  // Normalize cover image to absolute URL string
  let coverImageUrl = null;
  if (
    articleData.coverImage &&
    Array.isArray(articleData.coverImage) &&
    articleData.coverImage.length > 0
  ) {
    coverImageUrl = getImageUrl(articleData.coverImage[0].url);
  }

  return {
    title: articleData.title,
    slug: articleData.uid,
    description: articleData.description,
    category: (articleData.category && (articleData.category.toLowerCase() === 'architecture' || articleData.category.toLowerCase() === 'architecture+design' || articleData.category.toLowerCase() === 'architecture + design')) ? 'Architecture + Design' : articleData.category,
    secondCategory: articleData.secondCategory,
    categoryColor: getCategoryColor((articleData.category && (articleData.category.toLowerCase() === 'architecture' || articleData.category.toLowerCase() === 'architecture+design' || articleData.category.toLowerCase() === 'architecture + design')) ? 'Architecture + Design' : articleData.category),
    coverImage: coverImageUrl,
    coverImageData: articleData.coverImage?.[0] || null,
    createdAt: articleData.createdAt,
    updatedAt: articleData.updatedAt,
    blocks:
      articleData.blocks?.map((block) => {
        if (block.__component === "article-blocks.text-block") {
          return {
            __component: block.__component,
            content: block.content,
          };
        }
        if (block.__component === "article-blocks.image-block") {
          return {
            __component: block.__component,
            images: block.image || [],
          };
        }
        return block;
      }) || [],
  };
}

async function getSimilarArticles(category, currentSlug, limit = 3) {
  try {
    const normalize = (v) => (v || '').toLowerCase().trim();
    const isArchitecture = (() => {
      const n = normalize(category);
      return n === 'architecture' || n === 'architecture+design' || n === 'architecture + design';
    })();

    // read secondCategory for current article (raw from backend)
    const currentArticleRes = await fetch(
      `${API_BASE_URL}/articles?filters[uid][$eq]=${currentSlug}&fields=secondCategory`,
      { next: { revalidate: 60 } }
    );
    const currentArticleData = await currentArticleRes.json();
    const currentSecondCategory = currentArticleData.data?.[0]?.secondCategory;

    // Build target values to match against (category and secondCategory)
    const targets = new Set();
    if (isArchitecture) {
      ['Architecture', 'Architecture + Design', 'Architecture+Design', 'architecture', 'architecture+design', 'architecture + design'].forEach(v => targets.add(v));
    } else if (category) {
      const c = category;
      targets.add(c);
      const n = normalize(c);
      if (n && c !== n) targets.add(n);
    }
    if (currentSecondCategory) {
      const n = normalize(currentSecondCategory);
      if (n === 'architecture' || n === 'architecture+design' || n === 'architecture + design') {
        ['Architecture', 'Architecture + Design', 'Architecture+Design', 'architecture', 'architecture+design', 'architecture + design'].forEach(v => targets.add(v));
      } else {
        targets.add(currentSecondCategory);
        if (currentSecondCategory !== n) targets.add(n);
      }
    }

    // Construct filters using $in for both fields
    const values = Array.from(targets);
    let filters = `filters[uid][$ne]=${encodeURIComponent(currentSlug)}`;
    values.forEach((val, idx) => {
      const enc = encodeURIComponent(val);
      filters += `&filters[$or][0][category][$in][${idx}]=${enc}`;
      filters += `&filters[$or][1][secondCategory][$in][${idx}]=${enc}`;
    });

    let res = await fetch(
      `${API_BASE_URL}/articles?${filters}&populate[coverImage]=true&fields=id,title,description,uid,category,secondCategory,createdAt,updatedAt&sort=createdAt:desc&pagination[limit]=${limit}`,
      { next: { revalidate: 60 } }
    );

    let data = await res.json();

    // Fallback 1: explicitly query legacy Architecture in both fields
    if (!data.data || data.data.length === 0) {
      const val = encodeURIComponent('Architecture');
      const fallbackQuery = `filters[uid][$ne]=${encodeURIComponent(currentSlug)}&filters[$or][0][category][$eq]=${val}&filters[$or][1][secondCategory][$eq]=${val}`;
      res = await fetch(
        `${API_BASE_URL}/articles?${fallbackQuery}&populate[coverImage]=true&fields=id,title,description,uid,category,secondCategory,createdAt,updatedAt&sort=createdAt:desc&pagination[limit]=${limit}`,
        { next: { revalidate: 60 } }
      );
      data = await res.json();
    }

    // Fallback 2: case-insensitive contains 'architecture' on both fields
    if (!data.data || data.data.length === 0) {
      const containsQuery = `filters[uid][$ne]=${encodeURIComponent(currentSlug)}&filters[$or][0][category][$containsi]=architecture&filters[$or][1][secondCategory][$containsi]=architecture`;
      res = await fetch(
        `${API_BASE_URL}/articles?${containsQuery}&populate[coverImage]=true&fields=id,title,description,uid,category,secondCategory,createdAt,updatedAt&sort=createdAt:desc&pagination[limit]=${limit}`,
        { next: { revalidate: 60 } }
      );
      data = await res.json();
    }

    if (!data.data) return [];

    return data.data.map((article) => {
      let coverImageUrl = "/assets/image-1.png"; // fallback
      if (
        article.coverImage &&
        Array.isArray(article.coverImage) &&
        article.coverImage.length > 0
      ) {
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
        updatedAt: article.updatedAt,
      };
    });
  } catch (error) {
    console.error("Error fetching similar articles:", error);
    return [];
  }
}

// Server-side social metadata (used by crawlers)
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  const articleUrl = absOrFallback(`/articles/${article.slug}`);
  const imageUrl =
    article.coverImage || absOrFallback("/default-article-image.jpg");

  return {
    title: article.title,
    description:
      article.description ||
      "Check out this interesting article on ArchitectureWave",
    alternates: { canonical: articleUrl },
    openGraph: {
      title: article.title,
      description:
        article.description ||
        "Check out this interesting article on ArchitectureWave",
      url: articleUrl,
      siteName: "ArchitectureWave",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.coverImageData?.alternativeText || article.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: ["ArchitectureWave"],
      section: article.category,
      tags: [article.category, article.secondCategory].filter(Boolean),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description:
        article.description ||
        "Check out this interesting article on ArchitectureWave",
      images: [imageUrl],
      creator: "@ArchitectureWave",
      site: "@ArchitectureWave",
    },
    keywords: [article.category, article.secondCategory, "architecture", "design"]
      .filter(Boolean)
      .join(", "),
    authors: [{ name: "ArchitectureWave" }],
  };
}

const ImagePreviewer = dynamic(() => import("./ImagePreviewer"), { ssr: false });
const RichTextImageHandler = dynamic(() => import("./RichTextImageHandler"), {
  ssr: false,
});
const UnifiedImageLightbox = dynamic(() => import("./UnifiedImageLightbox"), {
  ssr: false,
});
const CoverImage = dynamic(() => import("./CoverImage"), { ssr: false });
const ShareButton = dynamic(() => import("./ShareButton"), { ssr: false });

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

  const similarArticles = await getSimilarArticles(article.category, slug, 3);

  // Collect images for unified lightbox
  const allImages = [];

  // From image blocks
  article.blocks?.forEach((block, blockIndex) => {
    if (block.__component === "article-blocks.image-block" && block.images) {
      block.images.forEach((image, imageIndex) => {
        allImages.push({
          src: getImageUrl(image.url),
          alt:
            image.alternativeText || `Article image ${allImages.length + 1}`,
          type: "image-block",
          caption: image.caption,
          blockIndex,
          imageIndex,
        });
      });
    }
  });

  // From markdown text blocks
  article.blocks?.forEach((block, blockIndex) => {
    if (block.__component === "article-blocks.text-block" && block.content) {
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let match;
      let imageIndex = 0;

      while ((match = imageRegex.exec(block.content)) !== null) {
        const [, alt, url] = match;
        const fullUrl = url.startsWith("http") ? url : getImageUrl(url);

        allImages.push({
          src: fullUrl,
          alt: alt || `Rich text image ${imageIndex + 1}`,
          type: "rich-text",
          caption: null,
          blockIndex,
          imageIndex: imageIndex++,
        });
      }
    }
  });

  return (
    <main
      className="w-[calc(100%-20px)] sm:w-[calc(100%-40px)] mx-auto px-2 sm:px-4 bg-white"
      style={{ marginBottom: "20px", borderRadius: "45px" }}
    >
      <Header tintColor={article.categoryColor} />
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
            <div className="flex flex-wrap gap-2" style={{ gap: "10px" }}>
              {article.category && (
                <span
                  className="text-white text-sm font-medium"
                  style={{
                    backgroundColor: article.categoryColor,
                    height: "40px",
                    borderRadius: "10px",
                    paddingTop: "4px",
                    paddingRight: "15px",
                    paddingBottom: "4px",
                    paddingLeft: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {article.category
                    .split(" ")
                    .map(
                      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </span>
              )}
              {article.secondCategory && (
                <span
                  className="text-white text-sm font-medium"
                  style={{
                    backgroundColor: getCategoryColor(article.secondCategory),
                    height: "40px",
                    borderRadius: "10px",
                    paddingTop: "4px",
                    paddingRight: "15px",
                    paddingBottom: "4px",
                    paddingLeft: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {article.secondCategory
                    .split(" ")
                    .map(
                      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </span>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {article.title}
                </h1>
                {article.description && (
                  <p className="text-base sm:text-lg md:text-xl text-gray-600">
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
            {article.blocks &&
              article.blocks.map((block, index) => {
                if (block.__component === "article-blocks.text-block") {
                  if (!block.content) return null;
                  const html = marked.parse(block.content);
                  return (
                    <div key={index} className="mb-6 sm:mb-8">
                      <RichTextImageHandler allImages={allImages}>
                        <div
                          className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-img:rounded-2xl prose-img:shadow-lg prose-img:transition-all prose-img:duration-200 prose-img:hover:scale-[1.02] prose-img:cursor-pointer"
                          style={{
                            fontFamily: "var(--font-mazzard-soft)",
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "18px",
                            lineHeight: "26px",
                            letterSpacing: "0%",
                            color: "#111111",
                          }}
                          dangerouslySetInnerHTML={{ __html: sanitize(html) }}
                        />
                      </RichTextImageHandler>
                    </div>
                  );
                }

                if (block.__component === "article-blocks.image-block") {
                  return (
                    <div key={index} className="mb-6 sm:mb-8">
                      <ImagePreviewer
                        images={block.images}
                        allImages={allImages}
                      />
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

          {/* Branding + Share */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={absOrFallback("/assets/Vector-7.png") || "/assets/Vector-7.png"}
                  alt="ArchitectureWave logo"
                  className="w-8 h-7"
                />
                <span
                  style={{
                    fontFamily: "var(--font-mazzard-soft)",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#000000",
                  }}
                >
                  ArchitectureWave
                </span>
              </div>
              <ShareButton article={article} />
            </div>
          </div>

          {/* Similar Articles */}
          {similarArticles.length > 0 && (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-12">
              <h2
                style={{
                  fontFamily: "var(--font-mazzard-soft)",
                  fontWeight: 500,
                  fontStyle: "normal",
                  fontSize: "28px",
                  lineHeight: "60px",
                  letterSpacing: "0%",
                  color: "#111111",
                  marginBottom: "32px",
                }}
              >
                Similar articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {similarArticles.map((similar) => (
                  <a
                    key={similar.id}
                    href={
                      absOrFallback(`/articles/${similar.slug}`) ||
                      `/articles/${similar.slug}`
                    }
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow block"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={similar.coverImage}
                        alt={similar.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {similar.title}
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
