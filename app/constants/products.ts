// Product data structure
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number; // Price in PKR
    images: string[];
    description?: string;
    inStock: boolean;
    colors?: string[]; // Optional color variants
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
        id: "flower-daisy",
        name: "Daisy Crochet Flower",
        category: "flowers",
        price: 800,
        images: ["/Products/Flowers/Daisy_1.png", "/Products/Flowers/Daisy_2.png"],
        description: "Handcrafted crochet daisy flower that never wilts. Perfect for home decor or as a thoughtful gift.",
        inStock: true,
        colors: ["Pink", "Purple", "Blue", "Off-white"],
    },
    {
        id: "flower-lavender",
        name: "Lavender Crochet Flower",
        category: "flowers",
        price: 900,
        images: ["/Products/Flowers/Lavendar.png"],
        description: "Delicate lavender flower handmade with love. Adds a touch of elegance to any space.",
        inStock: true,
        colors: ["Light Pink", "Dark Pink", "Light Purple", "Dark Purple", "Maroon", "Off-white"],
    },
    {
        id: "flower-lily",
        name: "Lily Crochet Flower",
        category: "flowers",
        price: 1000,
        images: ["/Products/Flowers/Lily.png"],
        description: "Elegant lily flower that stays fresh forever. A timeless piece of handmade art.",
        inStock: true,
        colors: ["Light Pink", "Dark Pink", "Light Purple", "Dark Purple", "Light Blue", "Dark Blue", "Off-white", "Maroon", "Yellow"],
    },
    {
        id: "flower-rose",
        name: "Rose Crochet Flower",
        category: "flowers",
        price: 1200,
        images: ["/Products/Flowers/Rose.png"],
        description: "Classic rose design crafted with care. The perfect gift that lasts forever.",
        inStock: true,
        colors: ["Light Pink", "Dark Pink", "Light Purple", "Dark Purple", "Light Blue", "Dark Blue", "Off-white", "Maroon"],
    },
    {
        id: "flower-tulip",
        name: "Tulip Crochet Flower",
        category: "flowers",
        price: 950,
        images: ["/Products/Flowers/Tulip.png"],
        description: "Charming tulip flower handcrafted with premium materials. Brings spring vibes year-round.",
        inStock: true,
        colors: ["Light Pink", "Dark Pink", "Light Purple", "Dark Purple", "Light Blue", "Dark Blue", "Off-white", "Maroon", "Yellow"],
    },
    {
        id: "flower-sunflower",
        name: "Sunflower Crochet Flower",
        category: "flowers",
        price: 1100,
        images: ["/Products/Flowers/Sunflower.png"],
        description: "Bright and cheerful sunflower that brings warmth and happiness. Perfect for adding a sunny touch to any space.",
        inStock: true,
        colors: ["Yellow"],
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

    // Coasters Category
    {
        id: "coaster-elegant",
        name: "Elegant Coaster",
        category: "coasters",
        price: 400,
        images: ["/Products/Coasters/Elegant_Coaster.png"],
        description: "Delicate pink coaster handcrafted with care. Perfect for protecting your surfaces in style.",
        inStock: true,
        colors: ["Light Pink", "Dark Pink", "Light Purple", "Dark Purple", "Maroon", "Light Blue", "Dark Blue", "Off-white", "Yellow", "Green", "Brown", "Skin"],
    },
    {
        id: "coaster-rose",
        name: "Rose Coaster",
        category: "coasters",
        price: 450,
        images: ["/Products/Coasters/Rose_Coaster.png"],
        description: "Beautiful rose-themed coaster that adds elegance to your table. Functional and decorative.",
        inStock: true,
    },

    // Keychains Category
    {
        id: "keychain-cherry",
        name: "Cherry Keychain",
        category: "keychains",
        price: 350,
        images: ["/Products/Keychain/Cherry_Keychain.png"],
        description: "Adorable cherry keychain to brighten up your keys. Sweet and charming accessory.",
        inStock: true,
    },
    {
        id: "keychain-honeybee",
        name: "HoneyBee Keychain",
        category: "keychains",
        price: 400,
        images: ["/Products/Keychain/HoneyBee_Keychain.png"],
        description: "Cute honeybee keychain crafted with attention to detail. Perfect for bee lovers!",
        inStock: true,
    },
    {
        id: "keychain-panda",
        name: "Panda Keychain",
        category: "keychains",
        price: 450,
        images: ["/Products/Keychain/Panda_Keychain.png"],
        description: "Lovable panda keychain handmade with premium yarn. Makes a perfect gift or personal accessory.",
        inStock: true,
    },

    // Bracelets Category
    {
        id: "bracelet-berry-bliss",
        name: "Berry Bliss Bracelet",
        category: "bracelets",
        price: 600,
        images: ["/Products/Bracelet/Berry_Bliss_Bracelet.png"],
        description: "Sweet berry-themed bracelet with delightful colors. A charming accessory for any occasion.",
        inStock: true,
    },
    {
        id: "bracelet-butterfly-skyblue",
        name: "Butterfly Sky Blue Bracelet",
        category: "bracelets",
        price: 650,
        images: ["/Products/Bracelet/Butterfly_SkyBlue_Bracelet.png"],
        description: "Beautiful sky blue bracelet adorned with butterfly charm. Elegant and whimsical.",
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
    return `₨ ${price.toLocaleString()}`;
};
