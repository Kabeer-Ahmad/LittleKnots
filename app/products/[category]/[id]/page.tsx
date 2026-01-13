import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getCategoryBySlug, formatPrice } from "@/app/constants/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton";

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
                            {/* Product Image */}
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 border border-primary/10">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col">
                                <h1 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                                    {product.name}
                                </h1>

                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-primary">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                {product.description && (
                                    <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                                        {product.description}
                                    </p>
                                )}

                                <div className="mb-8">
                                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${product.inStock
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}>
                                        {product.inStock ? '✓ In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                <AddToCartButton product={product} />

                                <div className="mt-auto pt-12 border-t border-primary/10">
                                    <h3 className="font-semibold text-foreground mb-3">Product Details</h3>
                                    <ul className="space-y-2 text-sm text-foreground/70">
                                        <li>• Handcrafted with love</li>
                                        <li>• Made to order</li>
                                        <li>• Premium quality yarn</li>
                                        <li>• Delivering all over Pakistan 🇵🇰</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products Section - Placeholder */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-primary-dark mb-4">
                            More from {category.name}
                        </h2>
                        <Link
                            href={`/products/${categorySlug}`}
                            className="inline-block text-primary hover:text-primary-dark font-semibold transition-colors"
                        >
                            View All {category.name} →
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
