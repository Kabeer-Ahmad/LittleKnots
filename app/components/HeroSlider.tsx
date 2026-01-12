"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Banner from "../../public/b1.png";
import Banner1 from "../../public/b2.png";
import Banner2 from "../../public/b.png";

const SLIDES = [
    Banner,
    Banner1,
    Banner2,
];

export default function HeroSlider() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    return (
        <div className="w-full relative overflow-hidden">
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full w-full touch-pan-y">
                    {SLIDES.map((src, index) => (
                        <div className="relative h-full w-full flex-[0_0_100%]" key={index}>
                            <Image
                                src={src}
                                alt={`Hero Banner ${index + 1}`}
                                className="w-full h-auto"
                                sizes="100vw"
                                priority={index === 0}
                                placeholder="blur"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
