"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "../constants/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, getCartTotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
        paymentMethod: "cod" // cod or advance
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else {
            // Remove all non-digit characters for validation
            const phoneDigits = formData.phone.replace(/\D/g, '');

            // Check for Pakistani mobile number format (11 digits starting with 03, or 10 digits)
            if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                newErrors.phone = "Please enter a complete phone number (11 digits, e.g., 03XX-XXXXXXX)";
            } else if (phoneDigits.length === 11 && !phoneDigits.startsWith('03')) {
                newErrors.phone = "Mobile number should start with 03 (e.g., 0321-1234567)";
            } else if (phoneDigits.length === 10 && phoneDigits.startsWith('0')) {
                newErrors.phone = "Please enter the complete number (11 digits total)";
            }
        }

        if (!formData.address.trim()) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare order items
            const orderItems = cart.map(item => ({
                id: item.product.id,
                name: item.product.name,
                category: item.product.category,
                price: item.product.price,
                quantity: item.quantity,
                ...(item.selectedColor && { color: item.selectedColor }),
                ...(item.product.description && item.product.id.startsWith('bouquet-custom') && {
                    description: item.product.description
                })
            }));

            // Calculate totals
            const subtotal = getCartTotal();
            const shippingCost = subtotal >= 10000 ? 0 : 250;
            const totalAmount = subtotal + shippingCost;
            const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

            // Insert order into Supabase
            const { data, error } = await supabase
                .from('orders')
                .insert([
                    {
                        customer_name: formData.name,
                        customer_email: formData.email,
                        customer_phone: formData.phone,
                        customer_address: formData.address,
                        order_items: orderItems,
                        total_amount: totalAmount,
                        item_count: itemCount,
                        customer_notes: formData.notes || null,
                        payment_method: formData.paymentMethod
                    }
                ])
                .select();

            if (error) {
                console.error("Supabase error:", error);
                throw new Error(error.message || "Failed to create order");
            }

            if (!data || data.length === 0) {
                throw new Error("Order created but no data returned");
            }

            // Clear cart and redirect to success page
            clearCart();
            router.push(`/order-success?order=${data[0].id}&payment=${formData.paymentMethod}`);
        } catch (error: any) {
            console.error("Error submitting order:", error);
            alert(error.message || "Failed to submit order. Please check your internet connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // Calculate shipping
    const subtotal = getCartTotal();
    const SHIPPING_COST = 250;
    const FREE_SHIPPING_THRESHOLD = 10000;
    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shippingCost;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-white font-sans">
                <Navbar />
                <main className="flex-grow flex items-center justify-center p-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
                        <p className="text-foreground/60 mb-6">Add some items to your cart before checking out</p>
                        <button
                            onClick={() => router.push("/products")}
                            className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-primary-dark mb-8">Checkout</h1>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Customer Information Form */}
                        <div>
                            <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-primary-dark mb-6">Customer Information</h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-primary/20'
                                                }`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-primary/20'
                                                }`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500' : 'border-primary/20'
                                                }`}
                                            placeholder="+92-300-1234567"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-sm font-semibold text-foreground mb-2">
                                            Delivery Address *
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.address ? 'border-red-500' : 'border-primary/20'
                                                }`}
                                            placeholder="123 Main Street, City, Country"
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>

                                    {/* Payment Method Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-3">
                                            Payment Method *
                                        </label>
                                        <div className="space-y-3">
                                            {/* Cash on Delivery */}
                                            <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'cod'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-primary/20 hover:border-primary/40'
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={formData.paymentMethod === 'cod'}
                                                    onChange={handleInputChange}
                                                    className="mt-1 mr-3"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-semibold text-foreground">Cash on Delivery</div>
                                                    <p className="text-sm text-foreground/60 mt-1">
                                                        Pay when you receive your order
                                                    </p>
                                                </div>
                                            </label>

                                            {/* Advance Payment */}
                                            <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'advance'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-primary/20 hover:border-primary/40'
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="advance"
                                                    checked={formData.paymentMethod === 'advance'}
                                                    onChange={handleInputChange}
                                                    className="mt-1 mr-3"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-foreground">Advance Payment</span>
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                                            FREE GIFT 🎁
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-foreground/60 mt-1">
                                                        Pay now and receive a special free gift with your order!
                                                    </p>
                                                </div>
                                            </label>
                                        </div>

                                        {/* Bank Details - Show when Advance Payment is selected */}
                                        {formData.paymentMethod === 'advance' && (
                                            <div className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-accent/10 border-2 border-primary/20 rounded-lg">
                                                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                                                        <line x1="2" y1="10" x2="22" y2="10"></line>
                                                    </svg>
                                                    Bank Account Details
                                                </h3>
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex justify-between items-center p-2 bg-white rounded">
                                                        <span className="text-sm font-semibold text-foreground/70">Account Title:</span>
                                                        <span className="text-sm font-bold text-foreground">Kabeer Ahmad</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-white rounded">
                                                        <span className="text-sm font-semibold text-foreground/70">Account Number:</span>
                                                        <span className="text-sm font-bold text-primary font-mono">03214480668</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-2 bg-white rounded">
                                                        <span className="text-sm font-semibold text-foreground/70">Bank:</span>
                                                        <span className="text-sm font-bold text-foreground">Nayapay</span>
                                                    </div>
                                                </div>
                                                <div className="bg-accent/20 border border-primary/30 rounded-lg p-3">
                                                    <p className="text-sm text-foreground/80 font-semibold mb-1">
                                                        📸 After Payment:
                                                    </p>
                                                    <p className="text-sm text-foreground/70">
                                                        Please WhatsApp us the payment screenshot along with your order details. We'll confirm your order once payment is verified!
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-semibold text-foreground mb-2">
                                            Order Notes (Optional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Any special instructions for your order..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Placing Order..." : "Place Order"}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-sm sticky top-4">
                                <h2 className="text-2xl font-bold text-primary-dark mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    {cart.map((item, index) => (
                                        <div key={index} className="flex gap-4 pb-4 border-b border-primary/10">
                                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                                <Image
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-foreground text-sm">{item.product.name}</h3>
                                                {item.selectedColor && (
                                                    <p className="text-xs text-foreground/60">Color: {item.selectedColor}</p>
                                                )}
                                                {item.product.description && item.product.id.startsWith('bouquet-custom') && (
                                                    <p className="text-xs text-foreground/60 mt-1">{item.product.description}</p>
                                                )}
                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-sm text-foreground/60">Qty: {item.quantity}</span>
                                                    <span className="font-bold text-primary">{formatPrice(item.product.price * item.quantity)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-primary/20 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-foreground/70">Subtotal</span>
                                        <span className="font-semibold">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-primary/10">
                                        <span className="text-foreground/70">Shipping</span>
                                        <span className="font-semibold">
                                            {shippingCost === 0 ? (
                                                <span className="text-green-600">FREE</span>
                                            ) : (
                                                formatPrice(shippingCost)
                                            )}
                                        </span>
                                    </div>
                                    {subtotal < FREE_SHIPPING_THRESHOLD && subtotal > 0 && (
                                        <div className="mb-4 p-3 bg-accent/10 border border-primary/20 rounded-lg">
                                            <p className="text-xs text-foreground/70 text-center">
                                                Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for FREE shipping! 🎉
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-foreground">Total</span>
                                        <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
