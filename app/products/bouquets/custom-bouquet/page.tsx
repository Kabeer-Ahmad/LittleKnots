"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { PRODUCTS, LEAVES, formatPrice } from "@/app/constants/products";
import { useCart } from "@/app/context/CartContext";

interface ItemQuantity {
    [key: string]: number;
}

export default function CustomBouquetPage() {
    const { addToCart } = useCart();
    const [flowerQuantities, setFlowerQuantities] = useState<ItemQuantity>({});
    const [leafQuantities, setLeafQuantities] = useState<ItemQuantity>({});

    // Get all flowers from products
    const flowers = PRODUCTS.filter(p => p.category === "flowers");

    // Calculate total price
    const totalPrice = useMemo(() => {
        let total = 0;

        // Add flower prices
        flowers.forEach(flower => {
            const qty = flowerQuantities[flower.id] || 0;
            total += flower.price * qty;
        });

        // Add leaf prices
        LEAVES.forEach(leaf => {
            const qty = leafQuantities[leaf.id] || 0;
            total += leaf.price * qty;
        });

        return total;
    }, [flowerQuantities, leafQuantities, flowers]);

    const updateFlowerQuantity = (flowerId: string, delta: number) => {
        setFlowerQuantities(prev => {
            const current = prev[flowerId] || 0;
            const newQty = Math.max(0, Math.min(20, current + delta));
            return { ...prev, [flowerId]: newQty };
        });
    };

    const updateLeafQuantity = (leafId: string, delta: number) => {
        setLeafQuantities(prev => {
            const current = prev[leafId] || 0;
            const newQty = Math.max(0, Math.min(50, current + delta));
            return { ...prev, [leafId]: newQty };
        });
    };

    const handleAddToCart = () => {
        // Validate minimum 3 flowers
        const totalFlowers = Object.values(flowerQuantities).reduce((sum, qty) => sum + qty, 0);

        if (totalFlowers < 3) {
            alert("Please select at least 3 flowers to create your bouquet!");
            return;
        }

        // Create custom bouquet description
        const selectedFlowers = flowers
            .filter(f => (flowerQuantities[f.id] || 0) > 0)
            .map(f => `${flowerQuantities[f.id]}x ${f.name}`);

        const selectedLeaves = LEAVES
            .filter(l => (leafQuantities[l.id] || 0) > 0)
            .map(l => `${leafQuantities[l.id]}x ${l.name}`);

        const description = [...selectedFlowers, ...selectedLeaves].join(", ");

        addToCart({
            id: `bouquet-custom-${Date.now()}`,
            name: "Custom Bouquet",
            category: "bouquets",
            price: totalPrice,
            originalPrice: totalPrice,
            images: ["/categories/bouquets_cat.webp"],
            description: description,
            inStock: true,
        });

        // Reset selections
        setFlowerQuantities({});
        setLeafQuantities({});
    };

    const hasItems = totalPrice > 0;
    const totalFlowers = Object.values(flowerQuantities).reduce((sum, qty) => sum + qty, 0);
    const canAddToCart = totalFlowers >= 3;

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            <main className="flex-grow">
                <section className="py-8 px-4 sm:px-6 lg:px-8 bg-accent/10">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary-dark mb-6">
                            Make Your Own Bouquet
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
                            Create your perfect custom bouquet! Choose from our selection of handmade crochet flowers and add green leaves to complete your unique arrangement.
                        </p>
                    </div>
                </section>

                <section className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Flowers Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-primary-dark mb-6">Choose Your Flowers</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {flowers.map(flower => (
                                    <div key={flower.id} className="border border-primary/10 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={flower.images[0]}
                                                alt={flower.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">{flower.name}</h3>
                                        <p className="text-primary font-bold mb-3">{formatPrice(flower.price)}/stem</p>

                                        <div className="flex items-center justify-between bg-accent/5 rounded-lg p-2">
                                            <button
                                                onClick={() => updateFlowerQuantity(flower.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white border border-primary/20 rounded-md hover:bg-primary hover:text-white transition-colors disabled:opacity-30"
                                                disabled={!flowerQuantities[flower.id]}
                                            >
                                                -
                                            </button>
                                            <span className="font-semibold text-lg">{flowerQuantities[flower.id] || 0}</span>
                                            <button
                                                onClick={() => updateFlowerQuantity(flower.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white border border-primary/20 rounded-md hover:bg-primary hover:text-white transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Leaves Section */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-primary-dark mb-6">Add Leaves (Filler)</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {LEAVES.map(leaf => (
                                    <div key={leaf.id} className="border border-primary/10 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={leaf.image}
                                                alt={leaf.name}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-foreground text-sm mb-2">{leaf.name}</h3>
                                        <p className="text-primary font-bold mb-3">{formatPrice(leaf.price)}/piece</p>

                                        <div className="flex items-center justify-between bg-accent/5 rounded-lg p-2">
                                            <button
                                                onClick={() => updateLeafQuantity(leaf.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white border border-primary/20 rounded-md hover:bg-primary hover:text-white transition-colors disabled:opacity-30"
                                                disabled={!leafQuantities[leaf.id]}
                                            >
                                                -
                                            </button>
                                            <span className="font-semibold text-lg">{leafQuantities[leaf.id] || 0}</span>
                                            <button
                                                onClick={() => updateLeafQuantity(leaf.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white border border-primary/20 rounded-md hover:bg-primary hover:text-white transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Summary and Add to Cart */}
                        <div className="sticky bottom-0 bg-white border-t border-primary/20 py-3 px-4 shadow-lg">
                            <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 items-center">
                                {/* Left Column - Price Info */}
                                <div>
                                    <p className="text-xs text-foreground/60 mb-0.5">Total Price</p>
                                    <p className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</p>
                                    {totalFlowers > 0 && totalFlowers < 3 && (
                                        <p className="text-xs text-red-500 mt-0.5">Min 3 flowers ({totalFlowers}/3)</p>
                                    )}
                                </div>

                                {/* Right Column - Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!canAddToCart}
                                    className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-base hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
