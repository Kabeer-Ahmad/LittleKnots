"use client";

import { useCart } from "../context/CartContext";
import { formatPrice } from "../constants/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartSheet() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Cart Icon Button */}
            <button
                onClick={toggleCart}
                className="relative p-2 hover:text-primary transition-colors"
                aria-label="Shopping cart"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {getCartCount()}
                    </span>
                )}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={toggleCart}
                />
            )}

            {/* Cart Slide-in Panel */}
            <div
                className={`fixed top-16 md:top-0 right-0 h-[calc(100vh-4rem)] md:h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-primary/10">
                        <h2 className="text-2xl font-bold text-primary-dark">
                            Your Cart ({getCartCount()})
                        </h2>
                        <button
                            onClick={toggleCart}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto p-6">
                        {cart.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-foreground/60 text-lg">Your cart is empty</p>
                                <button
                                    onClick={toggleCart}
                                    className="mt-4 text-primary hover:text-primary-dark font-semibold"
                                >
                                    Continue Shopping →
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 pb-4 border-b border-primary/10">
                                        {/* Product Image */}
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                                sizes="96px"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-foreground mb-1">
                                                {item.product.name}
                                            </h3>
                                            {item.selectedColor && (
                                                <p className="text-sm text-foreground/60 mb-1">
                                                    Color: {item.selectedColor}
                                                </p>
                                            )}
                                            {item.product.description && item.product.id.startsWith('bouquet-custom') && (
                                                <p className="text-xs text-foreground/60 mb-2">
                                                    {item.product.description}
                                                </p>
                                            )}
                                            <p className="text-primary font-bold mb-2">
                                                {formatPrice(item.product.price)}
                                            </p>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                                                    className="px-2 py-1 border border-primary/20 rounded hover:bg-primary/10 transition-colors"
                                                >
                                                    −
                                                </button>
                                                <span className="px-3 font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                                                    className="px-2 py-1 border border-primary/20 rounded hover:bg-primary/10 transition-colors"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                                                    className="ml-auto text-red-500 hover:text-red-700 text-sm font-semibold"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="border-t border-primary/10 p-6 space-y-4">
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-semibold text-foreground">Total:</span>
                                <span className="font-bold text-primary text-2xl">
                                    {formatPrice(getCartTotal())}
                                </span>
                            </div>
                            <Link
                                href="/checkout"
                                onClick={toggleCart}
                                className="block w-full px-8 py-4 rounded-full bg-primary text-white font-bold text-lg text-center hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                            >
                                Proceed to Checkout
                            </Link>
                            <p className="text-xs text-center text-foreground/60">
                                Complete your purchase on the checkout page
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// Export the toggle function hook for external use
export function useCartSheet() {
    const [isOpen, setIsOpen] = useState(false);
    return {
        isOpen,
        toggleCart: () => setIsOpen(!isOpen),
    };
}
