import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary-dark mb-6">
                            Crafting Happiness, One Loop at a Time
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/80 font-medium">
                            Welcome to Little Knots.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-16">

                        {/* Introduction */}
                        <div className="text-center">
                            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                                We believe that the best gifts are the ones made by hand, with patience, care, and a little bit of magic in every stitch.
                            </p>
                        </div>

                        {/* Our Story */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">Our Story</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                What started as a love for the timeless art of crochet has grown into a small studio dedicated to creating everlasting beauty. At Little Knots, we don't just move yarn with a hook; we weave memories. We wanted to create flowers that never wilt and gifts that feel like a warm hug.
                            </p>
                        </div>

                        {/* What We Make */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">What We Make</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                We specialize in bringing yarn to life. Whether it's our signature crochet bouquets that stay fresh forever, adorable stuffed toys for your little ones, or stylish hair bows and bracelets to accessorize your day, every item is unique.
                            </p>
                        </div>

                        {/* The Promise */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">The Little Knots Promise</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                                Everything you see here is <span className="font-semibold text-primary">Crafted On Demand</span>. We don't believe in mass production. When you order a set of coasters or a custom keychain, it is being made specifically for you.
                            </p>
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                Thank you for supporting handmade and letting us share our passion with you.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="text-center pt-8">
                            <Link
                                href="/categories"
                                className="inline-block px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                            >
                                Explore the Collection
                            </Link>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
