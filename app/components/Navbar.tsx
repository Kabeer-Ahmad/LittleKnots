"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartSheet from "./CartSheet";
import SearchBar from "./SearchBar";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                        <div className="relative h-14 w-32 md:h-20 md:w-44 overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Little Knots Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                            Home
                        </Link>

                        <Link href="/categories" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                            Categories
                        </Link>

                        <Link href="/products" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                            Products
                        </Link>

                        <Link href="/products/bouquets/custom-bouquet" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                            Custom Bouquet
                        </Link>

                        <Link href="/about" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                            About
                        </Link>

                        <Link href="/track-order" className="text-foreground/80 hover:text-primary font-medium transition-colors">
                            Track Order
                        </Link>

                        <SearchBar />
                        <CartSheet />
                    </div>

                    {/* Mobile: Cart Icon and Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <SearchBar />
                        <CartSheet />

                        <button
                            className="p-2 text-foreground/80 hover:text-primary transition-colors relative z-50"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Enhanced with animations */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-4 space-y-1 border-t border-primary/10">
                        <Link
                            href="/"
                            className="block px-4 py-3 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-all transform hover:translate-x-1 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                Home
                            </span>
                        </Link>
                        <Link
                            href="/categories"
                            className="block px-4 py-3 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-all transform hover:translate-x-1 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                Categories
                            </span>
                        </Link>
                        <Link
                            href="/products"
                            className="block px-4 py-3 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-all transform hover:translate-x-1 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                Products
                            </span>
                        </Link>
                        <Link
                            href="/products/bouquets/custom-bouquet"
                            className="block px-4 py-3 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-all transform hover:translate-x-1 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                    <path d="M8 12H5a3 3 0 0 0 0 6h3"></path>
                                    <path d="M16 12h3a3 3 0 0 1 0 6h-3"></path>
                                    <path d="M12 12v10"></path>
                                </svg>
                                Custom Bouquet
                            </span>
                        </Link>
                        <Link
                            href="/about"
                            className="block px-4 py-3 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-all transform hover:translate-x-1 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                About
                            </span>
                        </Link>
                        <Link
                            href="/track-order"
                            className="block px-4 py-3 text-foreground/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-all transform hover:translate-x-1 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                Track Order
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
