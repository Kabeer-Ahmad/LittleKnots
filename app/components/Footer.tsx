import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
                                    <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">Shop</Link>
                                    <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">About Us</Link>
                                    <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">Contact</Link>
                                    <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">Privacy Policy</Link>
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
                                <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">Shop</Link>
                                <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">About Us</Link>
                                <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">Contact</Link>
                                <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">Privacy Policy</Link>
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
        </footer>
    );
}
