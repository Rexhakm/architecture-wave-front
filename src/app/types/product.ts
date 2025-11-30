export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  images?: string[]; // Array of all product images
  description?: string;
  longDescription?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  category?: string;
}

// Image formats structure
export interface ImageFormats {
  thumbnail?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;
  };
  small?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;
  };
  medium?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;
  };
  large?: {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;
  };
}

// Image object structure (same as articles)
export interface ApiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: ImageFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// API Product interface matching the backend response
export interface ApiProduct {
  id: number;
  documentId: string;
  title: string;
  description: string;
  product_id: string;
  affiliate_url: string;
  seller: string | null;
  feature_text: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  price: string;
  product_thoumbnail?: ApiImage; // Note: typo in API field name
  product_images?: ApiImage[];
}

export interface ApiProductsResponse {
  data: ApiProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Category {
  name: string;
  image: string;
}

export interface ShoppingGuide {
  title: string;
  image: string;
} 