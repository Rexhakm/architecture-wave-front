import { getBackendBaseUrl, getImageUrl } from './imageUtils';
import { Article } from '../types/article';
import { getCategoryColor } from './categoryColors';

const API_BASE_URL = `${getBackendBaseUrl()}/api`;

// Array of fallback images that exist in the public/assets folder
const FALLBACK_IMAGES = [
  '/assets/image-1.png',
  '/assets/image-2.png',
  '/assets/image-3.png'
];

export async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/articles?populate[coverImage]=true&fields=id,title,description,uid,category,secondCategory,isPromoted,createdAt,updatedAt&sort=createdAt:desc`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();
    
    console.log('Strapi API response:', JSON.stringify(data, null, 2));
    
    if (!data.data) {
      console.error('No articles data received:', data);
      return [];
    }

    const articles: Article[] = [];
    
    const normalizePrimaryCategory = (raw?: string): string => {
      if (!raw) return 'Architecture + Design';
      const lowered = raw.toLowerCase().trim();
      if (lowered === 'architecture' || lowered === 'architecture+design' || lowered === 'architecture + design') return 'Architecture + Design';
      return raw;
    };

    for (const article of data.data) {
      console.log('Processing article:', article);
      
      // Get a fallback image based on article ID to ensure variety
      const fallbackImageIndex = article.id % FALLBACK_IMAGES.length;
      const fallbackImage = FALLBACK_IMAGES[fallbackImageIndex];
      
      // Handle cover image - it's an array directly, not wrapped in data
      let coverImageUrl = fallbackImage;
      if (article.coverImage && Array.isArray(article.coverImage) && article.coverImage.length > 0) {
        coverImageUrl = getImageUrl(article.coverImage[0].url);
      }
      
      articles.push({
        id: article.id,
        title: article.title || 'Untitled',
        description: article.description || '',
        slug: article.uid || `article-${article.id}`,
        category: normalizePrimaryCategory(article.category),
        secondCategory: article.secondCategory || undefined,
        categoryColor: getCategoryColor(normalizePrimaryCategory(article.category)),
        coverImage: coverImageUrl,
        isPromoted: article.isPromoted || false,
        createdAt: article.createdAt || new Date().toISOString(),
        updatedAt: article.updatedAt || new Date().toISOString()
      });
    }

    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const allArticles = await getAllArticles();

    // Normalization helper to align formats across slug and stored labels
    const normalizeLabel = (value?: string): string => {
      if (!value) return '';
      return value
        .toLowerCase()
        .replace(/-/g, ' ')          // hyphens to spaces
        .replace(/\s*\+\s*/g, '+') // collapse any spaced '+' to '+'
        .replace(/plus/g, '+')        // convert token 'plus' to '+'
        .replace(/\s+/g, ' ')        // collapse multiple spaces
        .trim();
    };

    const normalizeToCanonical = (value: string): string => {
      if (!value) return '';
      if (value === 'architecture' || value === 'architecture+design' || value === 'architecture + design') {
        return 'architecture';
      }
      return value;
    };

    let normalizedCategory = normalizeToCanonical(normalizeLabel(category));

    return allArticles.filter((article) => {
      const primary = normalizeToCanonical(normalizeLabel(article.category));
      const secondary = normalizeToCanonical(normalizeLabel(article.secondCategory));
      return primary === normalizedCategory || (!!secondary && secondary === normalizedCategory);
    });
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}



export function formatCategoryDisplay(category: string, secondCategory?: string): string {
  if (secondCategory) {
    // Format: "Category, SecondCategory" - title case over space and plus
    const toTitle = (value: string) => value
      .split(/([+])/)
      .map(token => token === '+' ? ' + ' : token.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '))
      .join('')
      .replace(/\s+\+\s+/g, ' + ')
      .trim();

    const mapPrimary = (value: string) => {
      const v = value.trim();
      if (v.toLowerCase() === 'architecture' || v.toLowerCase() === 'architecture+design' || v.toLowerCase() === 'architecture + design') return 'Architecture + Design';
      return v;
    };

    const firstPart = toTitle(mapPrimary(category));
    const secondPart = toTitle(secondCategory);
    return `${firstPart}, ${secondPart}`;
  }
  const value = category.trim();
  const mapped = (value.toLowerCase() === 'architecture' || value.toLowerCase() === 'architecture+design' || value.toLowerCase() === 'architecture + design') ? 'Architecture + Design' : value;
  return mapped
    .split(/([+])/)
    .map(token => token === '+' ? ' + ' : token.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '))
    .join('')
    .replace(/\s+\+\s+/g, ' + ')
    .trim();
} 