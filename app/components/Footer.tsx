"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    return (
        <footer className="bg-white border-t border-primary/20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile: Logo full width, then 2-col grid. Desktop: 3-col grid */}
                <div className="mb-12">
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                        {/* Brand - Full Width on Mobile */}
                        <div className="flex flex-col items-center space-y-4 mb-8">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="relative h-20 w-40 overflow-hidden">
                                    <Image
                                        src="/logo.png"
                                        alt="Little Knots Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                            <p className="text-foreground/70 text-center max-w-xs">
                                Handmade crochet with love. Custom orders delivering all over Pakistan 🇵🇰
                            </p>
                        </div>

                        {/* 2 Columns on Mobile */}
                        <div className="grid grid-cols-2 gap-8">
                            {/* Quick Links */}
                            <div className="flex flex-col items-center space-y-4">
                                <h3 className="font-bold text-lg text-primary-dark">Quick Links</h3>
                                <div className="flex flex-col space-y-2 text-center">
                                    <Link href="/track-order" className="text-foreground/80 hover:text-primary transition-colors">Track Order</Link>
                                    <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">About Us</Link>
                                    <Link href="/admin" className="text-foreground/80 hover:text-primary transition-colors">Admin</Link>
                                    <button onClick={() => setShowPrivacyPolicy(true)} className="text-foreground/80 hover:text-primary transition-colors text-left">Privacy Policy</button>
                                </div>
                            </div>

                            {/* Social */}
                            <div className="flex flex-col items-center space-y-4">
                                <h3 className="font-bold text-lg text-primary-dark">Connect With Us</h3>
                                <div className="flex items-center gap-4">
                                    <a href="https://www.instagram.com/littleknotspk?igsh=encxa2R5MDlyNmMy" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                    <a href="https://wa.link/xxiwb5" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500/10 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-all transform hover:scale-110">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout - 3 Equal Columns */}
                    <div className="hidden md:grid md:grid-cols-3 gap-12">
                        {/* Column 1: Brand */}
                        <div className="flex flex-col items-start space-y-4">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="relative h-20 w-40 overflow-hidden">
                                    <Image
                                        src="/logo.png"
                                        alt="Little Knots Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                            <p className="text-foreground/70 text-left max-w-xs">
                                Handmade crochet with love. Custom orders delivering all over Pakistan 🇵🇰
                            </p>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className="flex flex-col items-start space-y-4">
                            <h3 className="font-bold text-lg text-primary-dark">Quick Links</h3>
                            <div className="flex flex-col space-y-2 text-left">
                                <Link href="/track-order" className="text-foreground/80 hover:text-primary transition-colors">Track Order</Link>
                                <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">About Us</Link>
                                <Link href="/admin" className="text-foreground/80 hover:text-primary transition-colors">Admin</Link>
                                <button onClick={() => setShowPrivacyPolicy(true)} className="text-foreground/80 hover:text-primary transition-colors text-left">Privacy Policy</button>
                            </div>
                        </div>

                        {/* Column 3: Social */}
                        <div className="flex flex-col items-start space-y-4">
                            <h3 className="font-bold text-lg text-primary-dark">Connect With Us</h3>
                            <div className="flex items-center gap-4">
                                <a href="https://www.instagram.com/littleknotspk?igsh=encxa2R5MDlyNmMy" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="https://wa.link/xxiwb5" target="_blank" rel="noopener noreferrer" className="p-2 bg-green-500/10 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition-all transform hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary/10 pt-8 text-center text-foreground/60 text-sm">
                    &copy; {new Date().getFullYear()} Little Knots. All rights reserved.
                </div>
            </div>

            {/* Privacy Policy Modal */}
            {showPrivacyPolicy && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPrivacyPolicy(false)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-primary-dark">Privacy Policy</h2>
                                <button
                                    onClick={() => setShowPrivacyPolicy(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-4 text-foreground/80">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Information Collection</h3>
                                    <p className="text-sm">We collect information you provide directly to us when placing orders, including your name, email address, phone number, and delivery address. This information is used solely to process and fulfill your orders.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">How We Use Your Information</h3>
                                    <p className="text-sm">Your information is used to:
                                        <br />• Process and deliver your orders
                                        <br />• Communicate with you about your orders
                                        <br />• Improve our products and services
                                        <br />• Send you updates about new products (only with your consent)
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Data Security</h3>
                                    <p className="text-sm">We implement appropriate security measures to protect your personal information. Your data is stored securely and is only accessible to authorized personnel.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Third-Party Sharing</h3>
                                    <p className="text-sm">We do not sell, trade, or otherwise transfer your personal information to third parties. Your information may only be shared with delivery partners for order fulfillment purposes.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Your Rights</h3>
                                    <p className="text-sm">You have the right to access, correct, or delete your personal information at any time. Contact us via WhatsApp or Instagram to exercise these rights.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Contact Us</h3>
                                    <p className="text-sm">If you have any questions about this Privacy Policy, please contact us through WhatsApp or Instagram.</p>
                                </div>
                                <div className="pt-4 border-t border-primary/10">
                                    <p className="text-xs text-foreground/60">Last updated: January 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}
