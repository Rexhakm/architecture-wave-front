import { ApiProductsResponse, ApiProduct, Product } from '../types/product';
import { getImageUrl, getBackendBaseUrl } from './imageUtils';

const API_BASE_URL = `${getBackendBaseUrl()}/api`;

// Function to transform API product to our Product interface
// Supports both Strapi v3 flat payloads and v4 { attributes: {...} } payloads
const transformApiProduct = (raw: ApiProduct | any): Product => {
  const entity = raw?.attributes ? raw.attributes : raw;

  if (!entity) {
    throw new Error('Invalid product payload from API');
  }

  // Handle image URL exactly the same way as articles
  let productImage = '/assets/chair.png'; // Default fallback

  const thumb = entity.product_thoumbnail;
  const images = entity.product_images;

  if (thumb && thumb.url) {
    productImage = getImageUrl(thumb.url);
  } else if (images && images.length > 0 && images[0].url) {
    productImage = getImageUrl(images[0].url);
  }

  return {
    id: (raw.id ?? entity.id).toString(),
    name: entity.title,
    brand: entity.seller || 'Unknown Brand',
    price: entity.price,
    image: productImage,
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
// To avoid issues with backend ID mismatches / 404s, we reuse the list endpoint
// and find the product client-side.
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
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
