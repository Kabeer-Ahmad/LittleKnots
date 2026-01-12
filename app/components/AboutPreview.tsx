import Link from "next/link";

export default function AboutPreview() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                    A Little Knot, A Lot of Love!
                </h2>
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Every piece at Little Knots is crafted on demand, just for you. We don't believe in mass production, but only in creating unique, heartfelt items that bring joy.
                </p>
                <Link
                    href="/about"
                    className="inline-block px-8 py-3 rounded-full bg-white text-primary-dark border-2 border-primary/20 font-bold text-base sm:text-lg hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md hover:shadow-lg"
                >
                    Read Our Story
                </Link>
            </div>
        </section>
    );
}
