// Product data structure
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number; // Price in PKR
    images: string[];
    description?: string;
    inStock: boolean;
}

// Categories
export const CATEGORIES = [
    { name: "Flowers", slug: "flowers", image: "/categories/flowers_cat.webp" },
    { name: "Bouquets", slug: "bouquets", image: "/categories/bouquets_cat.webp" },
    { name: "Keychains", slug: "keychains", image: "/categories/keychain_cat.webp" },
    { name: "Bows", slug: "bows", image: "/categories/bows_cat.webp" },
    { name: "Coasters", slug: "coasters", image: "/categories/coaster_cat.webp" },
    { name: "Toys", slug: "toys", image: "/categories/toys_cat.webp" },
    { name: "Bracelets", slug: "bracelets", image: "/categories/bracelet_cat.webp" },
];

// Products Database
export const PRODUCTS: Product[] = [
    // Flowers Category
    {
        id: "flower-daisy-1",
        name: "Daisy Crochet Flower",
        category: "flowers",
        price: 800,
        images: ["/Products/Flowers/Daisy_1.png"],
        description: "Handcrafted crochet daisy flower that never wilts. Perfect for home decor or as a thoughtful gift.",
        inStock: true,
    },
    {
        id: "flower-daisy-2",
        name: "Daisy Bouquet Variant",
        category: "flowers",
        price: 850,
        images: ["/Products/Flowers/Daisy_2.png"],
        description: "A beautiful daisy variation, meticulously crafted with premium yarn.",
        inStock: true,
    },
    {
        id: "flower-lavender",
        name: "Lavender Crochet Flower",
        category: "flowers",
        price: 900,
        images: ["/Products/Flowers/Lavendar.png"],
        description: "Delicate lavender flower handmade with love. Adds a touch of elegance to any space.",
        inStock: true,
    },
    {
        id: "flower-lily",
        name: "Lily Crochet Flower",
        category: "flowers",
        price: 1000,
        images: ["/Products/Flowers/Lily.png"],
        description: "Elegant lily flower that stays fresh forever. A timeless piece of handmade art.",
        inStock: true,
    },
    {
        id: "flower-rose",
        name: "Rose Crochet Flower",
        category: "flowers",
        price: 1200,
        images: ["/Products/Flowers/Rose.png"],
        description: "Classic rose design crafted with care. The perfect gift that lasts forever.",
        inStock: true,
    },
    {
        id: "flower-tulip",
        name: "Tulip Crochet Flower",
        category: "flowers",
        price: 950,
        images: ["/Products/Flowers/Tulip.png"],
        description: "Charming tulip flower handcrafted with premium materials. Brings spring vibes year-round.",
        inStock: true,
    },

    // Bouquets Category
    {
        id: "bouquet-midnight-bloom",
        name: "Midnight Bloom Bouquet",
        category: "bouquets",
        price: 2500,
        images: ["/Products/Bouquets/Midnight Bloom Bouquet.png"],
        description: "Enchanting dark-themed bouquet with deep purple and blue tones. Perfect for creating a dramatic, elegant atmosphere.",
        inStock: true,
    },
    {
        id: "bouquet-sunflower-duo",
        name: "Sunflower Duo Bouquet",
        category: "bouquets",
        price: 2200,
        images: ["/Products/Bouquets/Sunflower Duo Bouquet.png"],
        description: "Cheerful sunflower bouquet that radiates warmth and happiness. Bright and beautiful, never wilts.",
        inStock: true,
    },
    {
        id: "bouquet-sweetheart-stitches",
        name: "SweetHeart Stitches Bouquet",
        category: "bouquets",
        price: 2800,
        images: ["/Products/Bouquets/SweetHeart Stiches Bouquet.png"],
        description: "Romantic bouquet crafted with love and care. Perfect for expressing your heartfelt emotions.",
        inStock: true,
    },
    {
        id: "bouquet-signature-sunshine",
        name: "The Signature Sunshine Bouquet",
        category: "bouquets",
        price: 3000,
        images: ["/Products/Bouquets/The Signature Sunshine Bouquet.png"],
        description: "Our signature bouquet featuring vibrant yellow blooms. Brings sunshine and joy to any space.",
        inStock: true,
    },
];

// Helper functions
export const getProductsByCategory = (category: string): Product[] => {
    return PRODUCTS.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
    return PRODUCTS.find(product => product.id === id);
};

export const getCategoryBySlug = (slug: string) => {
    return CATEGORIES.find(cat => cat.slug === slug);
};

// Format price in PKR
export const formatPrice = (price: number): string => {
    return `₨${price.toLocaleString()}`;
};
