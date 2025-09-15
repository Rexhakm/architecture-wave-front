import { ApiProductsResponse, ApiProduct, Product } from '../types/product';
import { getImageUrl, getBackendBaseUrl } from './imageUtils';

const API_BASE_URL = `${getBackendBaseUrl()}/api`;

// Function to transform API product to our Product interface
const transformApiProduct = (apiProduct: ApiProduct): Product => {
  // Handle image URL exactly the same way as articles
  let productImage = '/assets/chair.png'; // Default fallback
  
  if (apiProduct.product_thoumbnail && apiProduct.product_thoumbnail.url) {
    // Use the same image URL handling as articles - access .url property
    productImage = getImageUrl(apiProduct.product_thoumbnail.url);
  } else if (apiProduct.product_images && apiProduct.product_images.length > 0 && apiProduct.product_images[0].url) {
    // Use the same image URL handling as articles - access .url property
    productImage = getImageUrl(apiProduct.product_images[0].url);
  }

  return {
    id: apiProduct.id.toString(),
    name: apiProduct.title,
    brand: apiProduct.seller || 'Unknown Brand',
    price: apiProduct.price,
    image: productImage,
    description: apiProduct.description,
    longDescription: apiProduct.description,
    features: apiProduct.feature_text ? [apiProduct.feature_text] : [],
    category: 'Featured' // Default category for API products
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
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiProduct = await response.json();
    return transformApiProduct(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
