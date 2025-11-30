import { ApiProductsResponse, ApiProduct, Product, ApiImage } from '../types/product';
import { getImageUrl, getBackendBaseUrl } from './imageUtils';

const API_BASE_URL = `${getBackendBaseUrl()}/api`;

// Function to transform API product to our Product interface
// Supports both Strapi v3 flat payloads and v4 { attributes: {...} } payloads
const transformApiProduct = (raw: ApiProduct | { attributes: ApiProduct; id?: number | string }): Product => {
  const hasAttributes = 'attributes' in raw;
  const entity = hasAttributes && raw.attributes ? raw.attributes : raw as ApiProduct;

  if (!entity) {
    throw new Error('Invalid product payload from API');
  }

  // Handle image URL exactly the same way as articles
  let productImage = '/assets/chair.png'; // Default fallback
  const productImages: string[] = [];

  const thumb = entity.product_thoumbnail;
  const images = entity.product_images;

  console.log('=== Image Collection Debug ===');
  console.log('product_thoumbnail:', thumb);
  console.log('product_images:', images);
  console.log('product_images type:', typeof images);
  console.log('product_images is array:', Array.isArray(images));
  console.log('product_images length:', images?.length);

  // Collect all images
  if (images && Array.isArray(images) && images.length > 0) {
    console.log('Processing images array...');
    images.forEach((img, idx) => {
      console.log(`Image ${idx}:`, img);
      // Handle both direct image objects and nested structures (Strapi v4 format)
      let imageUrl: string | undefined;
      
      // Check if it's a nested structure with data property
      if (img && typeof img === 'object' && 'data' in img) {
        const data = (img as any).data;
        if (Array.isArray(data)) {
          // If data is an array, process each item
          data.forEach((item: any) => {
            const url = item?.attributes?.url || item?.url;
            if (url) {
              const finalUrl = getImageUrl(url);
              productImages.push(finalUrl);
              console.log(`Added image from nested array ${idx}:`, finalUrl);
            }
          });
          return; // Skip to next image
        } else {
          // If data is a single object
          imageUrl = data?.attributes?.url || data?.url;
        }
      } else {
        // Direct ApiImage structure
        imageUrl = (img as ApiImage)?.url;
      }
      
      if (imageUrl) {
        const finalUrl = getImageUrl(imageUrl);
        productImages.push(finalUrl);
        console.log(`Added image ${idx}:`, finalUrl);
        // Use first image as main image if no thumbnail
        if (!productImage || productImage === '/assets/chair.png') {
          productImage = finalUrl;
        }
      } else {
        console.warn(`Image ${idx} has no URL:`, img);
      }
    });
  } else {
    console.log('No images array or empty array');
  }
  
  console.log('Total images collected:', productImages.length);

  // Use thumbnail as main image if available
  if (thumb && thumb.url) {
    productImage = getImageUrl(thumb.url);
    // Add thumbnail to images array if not already included
    if (!productImages.includes(productImage)) {
      productImages.unshift(productImage);
    }
  }

  const rawId = hasAttributes ? raw.id : (raw as ApiProduct).id;
  return {
    id: (rawId ?? entity.id ?? '').toString(),
    name: entity.title,
    brand: entity.seller || 'Unknown Brand',
    price: entity.price,
    image: productImage,
    images: productImages.length > 0 ? productImages : undefined,
    description: entity.description,
    longDescription: entity.description,
    features: entity.feature_text ? [entity.feature_text] : [],
    category: 'Featured', // Default category for API products
  };
};

// Function to fetch products from the API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiProductsResponse = await response.json();
    
    // Transform API products to our Product interface
    return data.data.map(transformApiProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array on error to prevent breaking the UI
    return [];
  }
};

// Function to fetch a single product by ID
// First tries to fetch directly from API, falls back to list endpoint
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    // Try to fetch directly from API first
    try {
      const response = await fetch(`${API_BASE_URL}/products?filters[product_id][$eq]=${id}&populate=*`);
      
      if (response.ok) {
        const data: ApiProductsResponse = await response.json();
        if (data.data && data.data.length > 0) {
          const product = transformApiProduct(data.data[0]);
          return product;
        }
      }
    } catch (directFetchError) {
      console.warn('Direct fetch failed, trying list endpoint:', directFetchError);
    }

    // Fallback to list endpoint
    const products = await fetchProducts();
    const product = products.find(p => p.id === id);

    if (!product) {
      console.warn('fetchProductById: product not found for id:', id);
      return null;
    }

    return product;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
};
