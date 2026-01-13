import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getCategoryBySlug, formatPrice, getProductsByCategory } from "@/app/constants/products";
import { notFound, redirect } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton";
import ProductImageCarousel from "@/app/components/ProductImageCarousel";
import RelatedProductsSlider from "@/app/components/RelatedProductsSlider";
import ViewerCount from "@/app/components/ViewerCount";

export default async function ProductDetailPage({
    params
}: {
    params: Promise<{ category: string; id: string }>
}) {
    const { category: categorySlug, id: productId } = await params;
    const product = getProductById(productId);
    const category = getCategoryBySlug(categorySlug);

    if (!product || !category || product.category !== categorySlug) {
        notFound();
    }

    // Redirect custom bouquet to builder page
    if (product.isCustom && product.id === "bouquet-custom") {
        redirect("/products/bouquets/custom-bouquet");
    }

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Breadcrumb */}
                <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-primary/10">
                    <div className="max-w-7xl mx-auto">
                        <nav className="flex items-center space-x-2 text-sm text-foreground/60">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
                            <span>/</span>
                            <Link href={`/products/${categorySlug}`} className="hover:text-primary transition-colors">{category.name}</Link>
                            <span>/</span>
                            <span className="text-foreground">{product.name}</span>
                        </nav>
                    </div>
                </section>

                {/* Product Detail */}
                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Product Images Carousel */}
                            <ProductImageCarousel
                                images={product.images}
                                productName={product.name}
                            />

                            {/* Product Info */}
                            <div className="flex flex-col">
                                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                                    {product.name}
                                </h1>

                                <div className="mb-6">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl font-bold text-primary">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="text-xl text-foreground/50 line-through">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        </div>
                                        <ViewerCount />
                                    </div>
                                </div>

                                {product.description && (
                                    <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                                        {product.description}
                                    </p>
                                )}

                                {/* Flowers Included - For Bouquets */}
                                {product.flowersIncluded && (
                                    <div className="bg-gradient-to-r from-primary/5 to-accent/10 border-2 border-primary/20 rounded-2xl p-6 mb-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                                                <path d="M8 12h8"></path>
                                                <path d="M12 12v9"></path>
                                            </svg>
                                            <h3 className="text-xl font-bold text-primary">Flowers Included</h3>
                                        </div>
                                        <p className="text-base text-foreground/80 leading-relaxed">
                                            {product.flowersIncluded}
                                        </p>
                                    </div>
                                )}

                                <AddToCartButton product={product} />
                            </div>
                        </div>

                        {/* Product Details & Custom Designs Section */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Product Details - Left Column */}
                            <div>
                                <h3 className="text-lg font-bold text-primary-dark mb-4">Product Details</h3>
                                <div className="flex flex-wrap gap-2">
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0 mt-0.5">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                        <span className="text-sm text-foreground">Handcrafted with love</span>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0 mt-0.5">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        <span className="text-sm text-foreground">Made to order</span>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0 mt-0.5">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="m9 12 2 2 4-4"></path>
                                        </svg>
                                        <span className="text-sm text-foreground">Premium quality yarn</span>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0 mt-0.5">
                                            <rect width="16" height="13" x="6" y="4" rx="2"></rect>
                                            <path d="m22 7-7.5 3.5L7 7"></path>
                                            <path d="M6 20h12"></path>
                                            <path d="M6 20v-4"></path>
                                            <path d="M18 20v-4"></path>
                                        </svg>
                                        <span className="text-sm text-foreground">Shipping: 5-6 days</span>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/5">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0 mt-0.5">
                                            <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                                            <path d="M9 22v-4h6v4"></path>
                                            <path d="M8 6h.01"></path>
                                            <path d="M16 6h.01"></path>
                                            <path d="M12 6h.01"></path>
                                            <path d="M12 10h.01"></path>
                                            <path d="M12 14h.01"></path>
                                            <path d="M16 10h.01"></path>
                                            <path d="M16 14h.01"></path>
                                            <path d="M8 10h.01"></path>
                                            <path d="M8 14h.01"></path>
                                        </svg>
                                        <span className="text-sm text-foreground">Delivering all over Pakistan</span>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Designs - Right Column */}
                            <div>
                                <div className="p-6 rounded-lg border border-primary/20 bg-accent/5 h-full">
                                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                                        </svg>
                                        Custom Designs Available
                                    </h4>
                                    <p className="text-sm text-foreground/70 mb-4">Want something unique? Contact us for custom orders!</p>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <a
                                            href="https://www.instagram.com/__.littleknots.__?igsh=MWYzZHJ1b2tlb3R1ZA=="
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-white border border-primary/20 text-foreground rounded-lg hover:border-primary hover:text-primary transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                            </svg>
                                            Instagram
                                        </a>
                                        <a
                                            href="https://wa.me/923114540014"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-white border border-primary/20 text-foreground rounded-lg hover:border-primary hover:text-primary transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"></path>
                                                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
                                            </svg>
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-primary-dark">
                                More from {category.name}
                            </h2>
                        </div>
                        <RelatedProductsSlider
                            products={getProductsByCategory(categorySlug)}
                            categorySlug={categorySlug}
                            currentProductId={productId}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
