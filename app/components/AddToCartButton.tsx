"use client";

import { Product } from "../constants/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

// Color mapping for visual display
const COLOR_MAP: { [key: string]: string } = {
    // Pinks
    "Pink": "#FFC0CB",
    "Light Pink": "#FFB6C1",
    "Dark Pink": "#FF69B4",

    // Purples
    "Purple": "#9370DB",
    "Light Purple": "#DDA0DD",
    "Dark Purple": "#6c106cff",

    // Blues
    "Blue": "#87CEEB",
    "Light Blue": "#ADD8E6",
    "Dark Blue": "#00008B",

    // Neutrals
    "Off-white": "#F8F8FF",
    "Offwhite": "#F8F8FF",

    // Others
    "Maroon": "#800000",
    "Yellow": "#FFD700",
    "Green": "#007900ff",
    "Brown": "#8B4513",
    "Skin": "#FFDAB9",
};

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "");
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        // If product has colors, require selection
        if (product.colors && product.colors.length > 0 && !selectedColor) {
            alert("Please select a color");
            return;
        }

        addToCart(product, quantity, selectedColor || undefined);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="space-y-5">
            {/* Color Selector - Show as circles if product has colors */}
            {product.colors && product.colors.length > 0 && (
                <div className="bg-accent/5 p-4 rounded-xl border border-primary/10">
                    <div className="mb-3">
                        <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
                            Choose Color
                        </span>
                        <p className="text-lg font-bold text-primary mt-0.5">
                            {selectedColor}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {product.colors.map((color) => {
                            const hexColor = COLOR_MAP[color] || "#CCCCCC";
                            const isSelected = selectedColor === color;

                            return (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`relative w-10 h-10 rounded-full transition-all ${isSelected
                                        ? 'ring-3 ring-primary ring-offset-2 scale-110'
                                        : 'hover:scale-105 ring-2 ring-gray-300 hover:ring-primary/50'
                                        }`}
                                    style={{ backgroundColor: hexColor }}
                                    title={color}
                                    aria-label={`Select ${color}`}
                                >
                                    {/* White stroke for light colors */}
                                    {(color.includes("white") || color.includes("Yellow")) && (
                                        <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
                                    )}
                                    {/* Checkmark for selected */}
                                    {isSelected && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <label className="font-semibold text-foreground">Quantity:</label>
                <div className="flex items-center border-2 border-primary/20 rounded-lg">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-primary/10 transition-colors"
                    >
                        −
                    </button>
                    <span className="px-6 py-2 font-semibold">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-primary/10 transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${added
                    ? 'bg-primary text-white'
                    : product.inStock
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                {added ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Added to Cart!
                    </span>
                ) : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
}
