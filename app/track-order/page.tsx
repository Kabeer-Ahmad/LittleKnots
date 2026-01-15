"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "../constants/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Order {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_city: string;
    customer_address: string;
    order_items: any[];
    total_amount: number;
    item_count: number;
    status: string;
    customer_notes: string | null;
    payment_method: string;
    created_at: string;
}

export default function TrackOrderPage() {
    const [searchType, setSearchType] = useState<"orderId" | "email">("orderId");
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchValue.trim()) {
            setError("Please enter a search value");
            return;
        }

        setLoading(true);
        setError("");
        setSearched(true);

        try {
            let query = supabase.from('orders').select('*');

            if (searchType === "orderId") {
                query = query.eq('id', searchValue.trim());
            } else {
                query = query.eq('customer_email', searchValue.trim().toLowerCase());
            }

            const { data, error: fetchError } = await query.order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            if (!data || data.length === 0) {
                setError(searchType === "orderId"
                    ? "No order found with this Order ID"
                    : "No orders found with this email address");
                setOrders([]);
            } else {
                setOrders(data);
            }
        } catch (err) {
            console.error("Error fetching order:", err);
            setError("Failed to fetch order. Please try again.");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'confirmed': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return '⏳';
            case 'confirmed': return '✅';
            case 'processing': return '⚙️';
            case 'shipped': return '🚚';
            case 'delivered': return '📦';
            case 'cancelled': return '❌';
            default: return '📋';
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 to-accent/10 font-sans">
            <Navbar />

            <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-2">Track Your Order</h1>
                        <p className="text-foreground/60">Enter your Order ID or Email to check your order status</p>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
                        <form onSubmit={handleSearch} className="space-y-4">
                            {/* Search Type Selector */}
                            <div className="flex gap-2 justify-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchType("orderId");
                                        setSearchValue("");
                                        setError("");
                                    }}
                                    className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all ${searchType === "orderId"
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                                        }`}
                                >
                                    Order ID
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchType("email");
                                        setSearchValue("");
                                        setError("");
                                    }}
                                    className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all ${searchType === "email"
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                                        }`}
                                >
                                    Email Address
                                </button>
                            </div>

                            {/* Search Input */}
                            <div>
                                <label htmlFor="search" className="block text-sm font-semibold text-foreground mb-2">
                                    {searchType === "orderId" ? "Order ID" : "Email Address"}
                                </label>
                                <input
                                    type={searchType === "email" ? "email" : "text"}
                                    id="search"
                                    value={searchValue}
                                    onChange={(e) => {
                                        setSearchValue(e.target.value);
                                        setError("");
                                    }}
                                    className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder={searchType === "orderId"
                                        ? "Enter your Order ID (e.g., abc123...)"
                                        : "Enter your email address"}
                                />
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {loading ? "Searching..." : "Track Order"}
                            </button>
                        </form>
                    </div>

                    {/* Results */}
                    {searched && !loading && orders.length > 0 && (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    {/* Order Header */}
                                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div>
                                                <p className="text-sm text-foreground/60 mb-1">Order ID</p>
                                                <p className="font-mono text-sm sm:text-base font-semibold text-foreground">{order.id}</p>
                                            </div>
                                            <div className={`px-4 py-2 rounded-full border-2 ${getStatusColor(order.status)} font-bold text-sm sm:text-base flex items-center gap-2 w-fit`}>
                                                <span>{getStatusIcon(order.status)}</span>
                                                <span className="capitalize">{order.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="p-6">
                                        {/* Progress Tracker */}
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-semibold text-foreground">Order Progress</span>
                                                <span className="text-sm text-foreground/60">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="relative">
                                                <div className="flex justify-between mb-2">
                                                    {['pending', 'confirmed', 'processing', 'shipped', 'delivered'].map((step, index) => {
                                                        const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
                                                        const currentIndex = statusOrder.indexOf(order.status);
                                                        const isCompleted = index <= currentIndex;
                                                        const isCancelled = order.status === 'cancelled';

                                                        return (
                                                            <div key={step} className="flex flex-col items-center flex-1">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isCancelled ? 'bg-red-100 text-red-600' :
                                                                    isCompleted ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                                                                    }`}>
                                                                    {isCompleted ? '✓' : index + 1}
                                                                </div>
                                                                <span className="text-xs mt-1 capitalize hidden sm:block">{step}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
                                                    <div
                                                        className="h-full bg-primary transition-all duration-500"
                                                        style={{
                                                            width: `${(['pending', 'confirmed', 'processing', 'shipped', 'delivered'].indexOf(order.status) / 4) * 100}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customer & Order Info */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <span>👤</span> Customer Details
                                                </h3>
                                                <div className="space-y-1 text-sm">
                                                    <p><span className="text-gray-600">Name:</span> {order.customer_name}</p>
                                                    <p><span className="text-gray-600">Email:</span> {order.customer_email}</p>
                                                    <p><span className="text-gray-600">Phone:</span> {order.customer_phone}</p>
                                                    <p><span className="text-gray-600">City:</span> {order.customer_city}</p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <span>📋</span> Order Summary
                                                </h3>
                                                <div className="space-y-1 text-sm">
                                                    <p><span className="text-gray-600">Items:</span> {order.item_count}</p>
                                                    <p><span className="text-gray-600">Payment:</span> {order.payment_method === 'cod' ? '💵 COD' : '💳 Advance'}</p>
                                                    <p><span className="text-gray-600">Total:</span> <span className="font-bold text-primary">{formatPrice(order.total_amount)}</span></p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div className="mb-6">
                                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                                <span>🛍️</span> Order Items
                                            </h3>
                                            <div className="space-y-2">
                                                {order.order_items.map((item: any, index: number) => (
                                                    <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex-1">
                                                            <p className="font-medium text-sm">{item.name}</p>
                                                            {item.color && <p className="text-xs text-gray-600">Color: {item.color}</p>}
                                                            {item.description && <p className="text-xs text-gray-600">{item.description}</p>}
                                                        </div>
                                                        <div className="text-right ml-4">
                                                            <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                                                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Delivery Address */}
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                <span>📍</span> Delivery Address
                                            </h3>
                                            <p className="text-sm text-foreground/80">{order.customer_address}</p>
                                        </div>

                                        {/* Customer Notes */}
                                        {order.customer_notes && (
                                            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                                                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                    <span>💬</span> Your Notes
                                                </h3>
                                                <p className="text-sm text-foreground/80">{order.customer_notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {searched && !loading && orders.length === 0 && error && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">No Orders Found</h3>
                            <p className="text-foreground/60">{error}</p>
                        </div>
                    )}

                    {/* Help Section */}
                    {!searched && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                            <h3 className="font-bold text-foreground mb-4 text-center">Need Help?</h3>
                            <div className="space-y-3 text-sm text-foreground/70">
                                <p>📧 Your Order ID was sent to your email after placing the order</p>
                                <p>🔍 You can search by either Order ID or Email Address</p>
                                <p>💬 For any queries, contact us via WhatsApp or Instagram</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
