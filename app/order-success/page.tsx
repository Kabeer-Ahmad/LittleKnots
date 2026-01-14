"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order");
    const paymentMethod = searchParams.get("payment");

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 to-accent/10 font-sans">
            <Navbar />

            <main className="flex-grow flex items-center justify-center p-8">
                <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
                    {/* Success Icon */}
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-2">Order Placed Successfully! 🎉</h1>
                        <p className="text-foreground/60">Thank you for your order</p>
                    </div>

                    {/* Order Details */}
                    <div className="bg-primary/5 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-foreground/60">Order ID</span>
                            <span className="font-mono text-sm font-bold text-primary">{orderId}</span>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-foreground mb-4">What's Next?</h2>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-primary text-sm font-bold">1</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Order Confirmation</p>
                                    <p className="text-sm text-foreground/60">We'll review your order and send you a confirmation shortly.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-primary text-sm font-bold">2</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Processing</p>
                                    <p className="text-sm text-foreground/60">Our team will start working on your handmade order with love.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-primary text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">Delivery</p>
                                    <p className="text-sm text-foreground/60">Your order will be carefully packaged and delivered to your address.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-blue-50 rounded-xl p-6 mb-6">
                        <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                        <p className="text-sm text-foreground/70 mb-3">
                            For any questions about your order, feel free to contact us via WhatsApp or Instagram.
                        </p>
                        <div className="flex gap-2">
                            <a href="https://wa.me/923214480668" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary-dark font-semibold">
                                WhatsApp →
                            </a>
                            <span className="text-foreground/40">|</span>
                            <a href="https://instagram.com/littleknotspk" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary-dark font-semibold">
                                Instagram →
                            </a>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/track-order" className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors text-center">
                            Track Your Order
                        </Link>
                        <Link href="/products" className="flex-1 px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors text-center">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
}
