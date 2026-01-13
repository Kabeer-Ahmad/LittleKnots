"use client";

import { Product } from "../constants/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="space-y-4">
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
                        ? 'bg-green-600 text-white'
                        : product.inStock
                            ? 'bg-primary text-white hover:bg-primary-dark'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                {added ? '✓ Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    );
}
