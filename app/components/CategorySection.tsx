"use client";

import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const CATEGORIES = [
    { name: "Flowers", slug: "flowers", image: "/categories/flowers_cat.webp" },
    { name: "Bouquets", slug: "bouquets", image: "/categories/bouquets_cat.webp" },
    { name: "Keychains", slug: "keychains", image: "/categories/keychain_cat.webp" },
    { name: "Bows", slug: "bows", image: "/categories/bows_cat.webp" },
    { name: "Coasters", slug: "coasters", image: "/categories/coaster_cat.webp" },
    { name: "Toys", slug: "toys", image: "/categories/toys_cat.webp" },
    { name: "Bracelets", slug: "bracelets", image: "/categories/bracelet_cat.webp" },
];

export default function CategorySection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        dragFree: true,
    });
    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi: any) => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    const onScroll = useCallback((emblaApi: any) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        onScroll(emblaApi);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("reInit", onScroll);
        emblaApi.on("select", onSelect);
        emblaApi.on("scroll", onScroll);

        return () => {
            emblaApi.off("reInit", onSelect);
            emblaApi.off("reInit", onScroll);
            emblaApi.off("select", onSelect);
            emblaApi.off("scroll", onScroll);
        };
    }, [emblaApi, onSelect, onScroll]);

    return (
        <section className="pt-8 pb-16 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary-dark">Shop by Categories</h2>
                    <p className="mt-4 text-xl text-foreground/70">Find the perfect handmade creation</p>
                </div>

                {/* Carousel Container with Navigation Buttons */}
                <div className="relative">
                    {/* Previous Button */}
                    {canScrollPrev && (
                        <button
                            onClick={scrollPrev}
                            className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary text-primary hover:text-white p-4 rounded-full shadow-xl border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:scale-110 active:scale-95 hidden md:flex items-center justify-center group"
                            aria-label="Previous categories"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    {/* Next Button */}
                    {canScrollNext && (
                        <button
                            onClick={scrollNext}
                            className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-primary text-primary hover:text-white p-4 rounded-full shadow-xl border-2 border-primary/20 hover:border-primary transition-all duration-300 hover:scale-110 active:scale-95 hidden md:flex items-center justify-center group"
                            aria-label="Next categories"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    )}

                    {/* Embla Carousel Viewport */}
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex touch-pan-y -ml-4 cursor-grab active:cursor-grabbing">
                            {CATEGORIES.map((category) => (
                                <div
                                    key={category.slug}
                                    className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] min-w-0 pl-4"
                                >
                                    <Link href={`/products/${category.slug}`} className="group block h-full">
                                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md border border-primary/10">
                                            {/* Category Image */}
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                            />

                                            {/* Overlay on hover */}
                                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                                        </div>

                                        <div className="mt-4 text-center">
                                            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {category.name}
                                            </h3>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 mx-auto max-w-md">
                    <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
