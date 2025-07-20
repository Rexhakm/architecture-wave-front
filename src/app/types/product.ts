export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  description?: string;
  longDescription?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  category?: string;
}

export interface Category {
  name: string;
  image: string;
}

export interface ShoppingGuide {
  title: string;
  image: string;
} 