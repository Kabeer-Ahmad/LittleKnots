"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS, formatPrice } from "../constants/products";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    // Filter products based on search query
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];

        const query = searchQuery.toLowerCase();
        return PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query)
        ).slice(0, 8); // Limit to 8 results
    }, [searchQuery]);

    const handleClose = () => {
        setIsOpen(false);
        setSearchQuery("");
    };

    return (
        <>
            {/* Search Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:text-primary transition-colors"
                aria-label="Search products"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={handleClose}
                    />

                    {/* Search Box */}
                    <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
                        <div className="bg-white rounded-lg shadow-2xl">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 p-4 border-b border-primary/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/60">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="flex-1 outline-none text-lg"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {/* Search Results */}
                            <div className="max-h-96 overflow-y-auto">
                                {searchQuery.trim() && filteredProducts.length === 0 ? (
                                    <div className="p-8 text-center text-foreground/60">
                                        No products found for "{searchQuery}"
                                    </div>
                                ) : filteredProducts.length > 0 ? (
                                    <div className="p-2">
                                        {filteredProducts.map(product => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.category}/${product.id}`}
                                                onClick={handleClose}
                                                className="flex items-center gap-4 p-3 hover:bg-accent/10 rounded-lg transition-colors"
                                            >
                                                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                                                    <p className="text-sm text-foreground/60 capitalize">{product.category}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">{formatPrice(product.price)}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-foreground/60">
                                        Start typing to search products...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
