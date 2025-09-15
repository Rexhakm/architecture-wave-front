import { Category, Product, ShoppingGuide } from '../types/product';

export const categories: Category[] = [
  {
    name: "Furniture",
    image: "/assets/chair.png"
  },
  {
    name: "Lighting",
    image: "/assets/Vector-2.png"
  },
  {
    name: "Decor",
    image: "/assets/Vector-3.png"
  },
  {
    name: "Textiles",
    image: "/assets/Vector-4.png"
  },
  {
    name: "Storage",
    image: "/assets/Vector-5.png"
  },
  {
    name: "Kitchen",
    image: "/assets/Vector-6.png"
  },
  {
    name: "Bathroom",
    image: "/assets/Vector-7.png"
  }
];

export const exclusiveProducts: Product[] = [
  {
    id: "1",
    name: "Modern Chair",
    brand: "ArchWave",
    price: "$299",
    image: "/assets/chair.png",
    description: "Elegant modern chair with clean lines",
    category: "Furniture"
  },
  {
    id: "2", 
    name: "Designer Lamp",
    brand: "ArchWave",
    price: "$199",
    image: "/assets/Vector-2.png",
    description: "Contemporary lighting solution",
    category: "Lighting"
  },
  {
    id: "3",
    name: "Art Deco Vase",
    brand: "ArchWave", 
    price: "$89",
    image: "/assets/Vector-3.png",
    description: "Statement piece for any room",
    category: "Decor"
  }
];

export const shoppingGuides: ShoppingGuide[] = [
  {
    title: "How to Choose the Perfect Sofa",
    image: "/assets/image-1.png"
  },
  {
    title: "Lighting Design Basics",
    image: "/assets/image-2.png"
  },
  {
    title: "Small Space Solutions",
    image: "/assets/image-3.png"
  }
];
