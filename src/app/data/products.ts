import { Product, Category, ShoppingGuide } from '../types/product';

export const categories: Category[] = [
    { name: "Furniture", image: "/assets/chair.png" },
    { name: "Kitchen & Dining", image: "/assets/dinner.png" },
    { name: "Bath & Bed", image: "/assets/chair.png" },
    { name: "Decor & More", image: "/assets/chair.png" },
    { name: "Lighting & Lamps", image: "/assets/chair.png" },
    { name: "Music", image: "/assets/chair.png" },
    { name: "Print", image: "/assets/chair.png" }
];

// Fallback image for when local images fail to load
const FALLBACK_IMAGE = "https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Product+Image";

export const featuredProducts: Product[] = [
    { 
        id: "1", 
        name: "Deep Blue Pot", 
        brand: "Huckberry", 
        price: "$156", 
        image: "/assets/chair.png",
        description: "A beautifully crafted ceramic pot in deep blue.",
        longDescription: "This handcrafted ceramic pot features a rich deep blue glaze that adds elegance to any space. Perfect for plants or as a decorative piece.",
        rating: 5,
        reviews: 89,
        features: [
            "Handcrafted ceramic construction",
            "Rich deep blue glaze",
            "Perfect for plants or decoration",
            "Food-safe material",
            "Easy to clean and maintain"
        ],
        category: "Decor & More"
    },
    { 
        id: "2", 
        name: "White Pillows", 
        brand: "Huckberry", 
        price: "$89", 
        image: "/assets/chair.png",
        description: "Premium comfort with elegant design.",
        longDescription: "These luxurious white pillows combine comfort with sophisticated design. Made from high-quality materials for lasting comfort.",
        rating: 4,
        reviews: 156,
        features: [
            "Premium cotton blend fabric",
            "Hypoallergenic filling",
            "Removable cover for easy cleaning",
            "Multiple size options available",
            "Designed for maximum comfort"
        ],
        category: "Bath & Bed"
    },
    { 
        id: "3", 
        name: "Textile Stack", 
        brand: "Huckberry", 
        price: "$124", 
        image: "/assets/chair.png",
        description: "A curated collection of premium textiles.",
        longDescription: "This carefully selected stack of textiles brings together the finest materials and craftsmanship for your home.",
        rating: 5,
        reviews: 67,
        features: [
            "Curated selection of premium textiles",
            "Various textures and patterns",
            "Perfect for layering and styling",
            "High-quality natural materials",
            "Versatile for multiple uses"
        ],
        category: "Decor & More"
    },
    { 
        id: "4", 
        name: "Pour-Over Kettle", 
        brand: "Fellow", 
        price: "$89", 
        image: "/assets/dinner.png",
        description: "Precision brewing for the perfect cup.",
        longDescription: "The Fellow Pour-Over Kettle combines precision engineering with elegant design for the ultimate coffee brewing experience.",
        rating: 5,
        reviews: 234,
        features: [
            "Precision pour spout design",
            "Temperature control system",
            "Ergonomic handle design",
            "Stainless steel construction",
            "Perfect for pour-over brewing"
        ],
        category: "Kitchen & Dining"
    },
    { 
        id: "5", 
        name: "Ceramic Vase", 
        brand: "Huckberry", 
        price: "$67", 
        image: "/assets/chair.png",
        description: "Timeless elegance in ceramic form.",
        longDescription: "This handcrafted ceramic vase brings timeless elegance to any room with its clean lines and beautiful finish.",
        rating: 4,
        reviews: 98,
        features: [
            "Handcrafted ceramic construction",
            "Timeless design",
            "Versatile size and shape",
            "Perfect for fresh or dried flowers",
            "Easy to clean and maintain"
        ],
        category: "Decor & More"
    },
    { 
        id: "6", 
        name: "Table Lamp", 
        brand: "Huckberry", 
        price: "$198", 
        image: "/assets/chair.png",
        description: "Modern lighting with classic appeal.",
        longDescription: "This modern table lamp combines contemporary design with classic appeal, providing perfect ambient lighting for any space.",
        rating: 5,
        reviews: 145,
        features: [
            "Modern design with classic appeal",
            "Adjustable brightness",
            "Energy-efficient LED bulb included",
            "Durable metal construction",
            "Perfect for bedside or desk use"
        ],
        category: "Lighting & Lamps"
    }
];

export const exclusiveProducts: Product[] = [
    { 
        id: "7", 
        name: "Legacy Adirondack", 
        brand: "Huckberry", 
        price: "$156", 
        image: "/assets/chair.png",
        description: "Timeless outdoor comfort reimagined.",
        longDescription: "The Legacy Adirondack chair brings classic outdoor comfort into the modern era with premium materials and thoughtful design.",
        rating: 5,
        reviews: 203,
        features: [
            "Premium weather-resistant materials",
            "Ergonomic design for maximum comfort",
            "Easy assembly with included hardware",
            "Available in multiple finishes",
            "Built to last for generations"
        ],
        category: "Furniture"
    },
    { 
        id: "8", 
        name: "Upholstered Chair", 
        brand: "Huckberry", 
        price: "$234", 
        image: "/assets/chair.png",
        description: "Luxurious comfort meets sophisticated design.",
        longDescription: "This upholstered chair combines luxurious comfort with sophisticated design, making it the perfect addition to any living space.",
        rating: 5,
        reviews: 178,
        features: [
            "Premium fabric upholstery",
            "High-density foam cushioning",
            "Solid wood frame construction",
            "Multiple fabric options available",
            "Professional assembly recommended"
        ],
        category: "Furniture"
    },
    { 
        id: "9", 
        name: "Woven Lamp", 
        brand: "Huckberry", 
        price: "$178", 
        image: "/assets/chair.png",
        description: "Artisanal craftsmanship in lighting.",
        longDescription: "This hand-woven lamp showcases artisanal craftsmanship while providing beautiful, diffused lighting for any room.",
        rating: 4,
        reviews: 92,
        features: [
            "Hand-woven natural materials",
            "Soft, diffused lighting",
            "Unique artisanal design",
            "Energy-efficient bulb included",
            "Perfect for ambient lighting"
        ],
        category: "Lighting & Lamps"
    },
    { 
        id: "10", 
        name: "Modern Side Table", 
        brand: "Huckberry", 
        price: "$145", 
        image: "/assets/chair.png",
        description: "Clean lines and functional design.",
        longDescription: "This modern side table features clean lines and functional design, making it the perfect complement to any seating arrangement.",
        rating: 4,
        reviews: 134,
        features: [
            "Clean, modern design",
            "Solid wood construction",
            "Perfect height for most seating",
            "Easy assembly required",
            "Available in multiple finishes"
        ],
        category: "Furniture"
    },
    { 
        id: "11", 
        name: "Leather Ottoman", 
        brand: "Huckberry", 
        price: "$267", 
        image: "/assets/chair.png",
        description: "Premium leather with timeless appeal.",
        longDescription: "This leather ottoman combines premium materials with timeless design, providing both comfort and style to your living space.",
        rating: 5,
        reviews: 167,
        features: [
            "Premium full-grain leather",
            "High-density foam filling",
            "Solid wood frame",
            "Multiple color options",
            "Easy to maintain and clean"
        ],
        category: "Furniture"
    },
    { 
        id: "12", 
        name: "Ceramic Planter", 
        brand: "Huckberry", 
        price: "$89", 
        image: "/assets/chair.png",
        description: "Beautiful homes for your plants.",
        longDescription: "These ceramic planters provide beautiful homes for your plants while adding style and elegance to any space.",
        rating: 4,
        reviews: 89,
        features: [
            "Handcrafted ceramic construction",
            "Drainage holes included",
            "Multiple sizes available",
            "Perfect for indoor plants",
            "Easy to clean and maintain"
        ],
        category: "Decor & More"
    },
    { 
        id: "13", 
        name: "Wool Throw Blanket", 
        brand: "Huckberry", 
        price: "$134", 
        image: "/assets/chair.png",
        description: "Luxurious warmth and comfort.",
        longDescription: "This wool throw blanket provides luxurious warmth and comfort while adding texture and style to your home decor.",
        rating: 5,
        reviews: 223,
        features: [
            "100% natural wool",
            "Generous size for maximum coverage",
            "Soft, non-scratchy texture",
            "Naturally temperature regulating",
            "Easy to care for and maintain"
        ],
        category: "Bath & Bed"
    },
    { 
        id: "14", 
        name: "Brass Candle Holder", 
        brand: "Huckberry", 
        price: "$78", 
        image: "/assets/chair.png",
        description: "Elegant illumination for any space.",
        longDescription: "This brass candle holder brings elegant illumination to any space with its timeless design and premium materials.",
        rating: 4,
        reviews: 156,
        features: [
            "Solid brass construction",
            "Timeless design",
            "Perfect for standard candles",
            "Develops beautiful patina over time",
            "Easy to clean and maintain"
        ],
        category: "Decor & More"
    }
];

export const shoppingGuides: ShoppingGuide[] = [
    { title: "Smart Tech for the Home Doesn't Have to Be Ugly", image: "/assets/chair.png" },
    { title: "Hunter Craighill Makes Affordable Design Products That Solve Everyday Problems", image: "/assets/chair.png" },
    { title: "Finally, a Weighted Blanket That You Can Actually Use Anywhere", image: "/assets/chair.png" },
    { title: "Smart Tech for the Home Doesn't Have to Be Ugly", image: "/assets/chair.png" },
    { title: "Hunter Craighill Makes Affordable Design Products That Solve Everyday Problems", image: "/assets/chair.png" },
    { title: "My Quest for Beautiful Countertop Appliances You Don't Need to Hide", image: "/assets/chair.png" }
];

// Function to get product by ID
export const getProductById = (id: string): Product | undefined => {
    const allProducts = [...featuredProducts, ...exclusiveProducts];
    return allProducts.find(product => product.id === id);
};

// Helper function to get image with fallback
export const getImageWithFallback = (imagePath: string): string => {
    return imagePath || FALLBACK_IMAGE;
}; 