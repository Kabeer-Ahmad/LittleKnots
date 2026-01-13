import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/app/constants/products";

export default function AllProductsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-8 px-4 sm:px-6 lg:px-8 bg-accent/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary-dark mb-6">
                            All Products
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
                            Browse our complete collection of handmade crochet items
                        </p>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {PRODUCTS.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/products/${product.category}/${product.id}`}
                                    className="group"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl border border-primary/10 group-hover:border-primary/30">
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="mt-2 text-xl font-bold text-primary">
                                            {formatPrice(product.price)}
                                        </p>
                                        {product.description && (
                                            <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
