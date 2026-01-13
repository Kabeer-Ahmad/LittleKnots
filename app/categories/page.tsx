import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
    { name: "Flowers", slug: "flowers", image: "/categories/flowers_cat.webp" },
    { name: "Bouquets", slug: "bouquets", image: "/categories/bouquets_cat.webp" },
    { name: "Keychains", slug: "keychains", image: "/categories/keychain_cat.webp" },
    { name: "Bows", slug: "bows", image: "/categories/bows_cat.webp" },
    { name: "Coasters", slug: "coasters", image: "/categories/coaster_cat.webp" },
    { name: "Toys", slug: "toys", image: "/categories/toys_cat.webp" },
    { name: "Bracelets", slug: "bracelets", image: "/categories/bracelet_cat.webp" },
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary-dark mb-6">
                            Shop by Categories
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
                            Discover our handmade crochet creations, crafted with love just for you.
                        </p>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {CATEGORIES.map((category) => (
                                <Link
                                    key={category.slug}
                                    href={`/products/${category.slug}`}
                                    className="group block"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl border border-primary/10 group-hover:border-primary/30">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Category Name on Hover */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Category Name Below */}
                                    <div className="mt-4 text-center">
                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
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
