import { Category, Product, ShoppingGuide } from '../types/product';

export const categories: Category[] = [
  {
    name: "Furniture",
    image: "/assets/chair.png"
  },
  {
    name: "Lighting",
    image: "/assets/lighting.png"
  },
  {
    name: "Decor",
    image: "/assets/decor.png"
  },
  {
    name: "Textiles",
    image: "/assets/textiles.png"
  },
  {
    name: "Storage",
    image: "/assets/storage.png"
  },
  {
    name: "Kitchen",
    image: "/assets/kitchen.png"
  },
  {
    name: "Bathroom",
    image: "/assets/bathroom.png"
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
    title: "Smart Tech for the Home Doesn’t Have to Be Ugly",
    image: "/assets/image-1.png"
  },
  {
    title: "Hunter Craighill Makes Affordable Design Products That Solve Everyday Problems",
    image: "/assets/image-2.png"
  },
  {
    title: "Finally, a Weighted Blanket That You Can Actually Use Anywhere",
    image: "/assets/image-3.png"
  },
  {
    title: "My Quest for Beautiful Countertop Appliances You Don’t Need to Hide",
    image: "/assets/image-3.png"
  },
  {
    title: "My Quest for Beautiful Countertop Appliances You Don’t Need to Hide",
    image: "/assets/image-3.png"
  },
  {
    title: "My Quest for Beautiful Countertop Appliances You Don’t Need to Hide",
    image: "/assets/image-3.png"
  },
  {
    title: "My Quest for Beautiful Countertop Appliances You Don’t Need to Hide",
    image: "/assets/image-3.png"
  },
  {
    title: "My Quest for Beautiful Countertop Appliances You Don’t Need to Hide",
    image: "/assets/image-3.png"
  },
  {
    title: "My Quest for Beautiful Countertop Appliances You Don’t Need to Hide",
    image: "/assets/image-3.png"
  }];
