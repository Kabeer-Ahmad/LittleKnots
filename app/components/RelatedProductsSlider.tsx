"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "../constants/products";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface RelatedProductsSliderProps {
    products: Product[];
    categorySlug: string;
    currentProductId: string;
}

export default function RelatedProductsSlider({ products, categorySlug, currentProductId }: RelatedProductsSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "start",
        slidesToScroll: 1,
        dragFree: true,
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Filter out current product
    const relatedProducts = products.filter(p => p.id !== currentProductId);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onScroll = useCallback(() => {
        if (!emblaApi) return;
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        onScroll();
        emblaApi.on("select", onSelect);
        emblaApi.on("scroll", onScroll);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect, onScroll]);

    if (relatedProducts.length === 0) return null;

    return (
        <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 md:gap-6">
                    {relatedProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${categorySlug}/${product.id}`}
                            className="flex-none w-[280px] group"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl border border-primary/10 group-hover:border-primary/30">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="280px"
                                />
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
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

            {/* Navigation Buttons */}
            {canScrollPrev && (
                <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/3 -translate-y-1/2 bg-white hover:bg-primary text-foreground hover:text-white p-3 rounded-full shadow-lg transition-all z-10"
                    aria-label="Previous products"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
            )}

            {canScrollNext && (
                <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/3 -translate-y-1/2 bg-white hover:bg-primary text-foreground hover:text-white p-3 rounded-full shadow-lg transition-all z-10"
                    aria-label="Next products"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            )}

            {/* Progress Bar */}
            <div className="mt-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>
        </div>
    );
}
