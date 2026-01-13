"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageCarouselProps {
    images: string[];
    productName: string;
}

export default function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 border border-primary/10">
            {/* Main Image */}
            <Image
                src={images[currentIndex]}
                alt={`${productName} - View ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentIndex === 0}
            />

            {/* Navigation Arrows - Only show if more than 1 image */}
            {images.length > 1 && (
                <>
                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-foreground/70 hover:text-foreground p-2 rounded-full shadow transition-all"
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 text-foreground/70 hover:text-foreground p-2 rounded-full shadow transition-all"
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>

                    {/* Image Indicator Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-primary w-6'
                                    : 'bg-white/60 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
