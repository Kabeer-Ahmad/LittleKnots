"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "../constants/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Order {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    order_items: any[];
    total_amount: number;
    item_count: number;
    status: string;
    customer_notes: string | null;
    admin_notes: string | null;
    payment_method: string;
    created_at: string;
}

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth === "true") {
            setIsAuthenticated(true);
            fetchOrders();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === process.env.NEXT_PUBLIC_ADMIN_KEY) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_authenticated", "true");
            fetchOrders();
        } else {
            alert("Invalid password!");
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
            alert("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;
            fetchOrders();
            setSelectedOrder(null);
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update order");
        }
    };

    const updateOrder = async () => {
        if (!editingOrder) return;

        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    customer_name: editingOrder.customer_name,
                    customer_email: editingOrder.customer_email,
                    customer_phone: editingOrder.customer_phone,
                    customer_address: editingOrder.customer_address,
                    status: editingOrder.status,
                    admin_notes: editingOrder.admin_notes
                })
                .eq('id', editingOrder.id);

            if (error) throw error;
            fetchOrders();
            setEditingOrder(null);
            setSelectedOrder(null);
            alert("Order updated successfully!");
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update order");
        }
    };

    const deleteOrder = async (orderId: string) => {
        if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
            return;
        }

        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .eq('id', orderId);

            if (error) throw error;
            fetchOrders();
            setSelectedOrder(null);
            alert("Order deleted successfully!");
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Failed to delete order");
        }
    };

    const printOrder = (order: Order) => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const subtotal = order.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal >= 10000 ? 0 : 250;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Order #${order.id.slice(0, 8)}</title>
                <style>
                    @media print { @page { margin: 0.5in; } }
                    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #E31B6D; padding-bottom: 20px; }
                    .header h1 { color: #E31B6D; margin: 0; font-size: 32px; }
                    .header p { margin: 5px 0; color: #666; }
                    .section { margin-bottom: 25px; page-break-inside: avoid; }
                    .section h2 { color: #E31B6D; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; margin-bottom: 15px; font-size: 18px; }
                    .info-grid { display: grid; grid-template-columns: 150px 1fr; gap: 8px; }
                    .info-label { font-weight: bold; color: #333; }
                    .info-value { color: #666; }
                    .items-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    .items-table th { background-color: #f8f8f8; padding: 12px 8px; text-align: left; border-bottom: 2px solid #E31B6D; font-size: 14px; }
                    .items-table td { padding: 10px 8px; border-bottom: 1px solid #f0f0f0; }
                    .item-description { color: #666; font-size: 12px; margin-top: 4px; }
                    .totals { margin-top: 20px; border-top: 2px solid #f0f0f0; padding-top: 15px; }
                    .totals-row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px; }
                    .totals-row.grand-total { font-size: 20px; font-weight: bold; color: #E31B6D; border-top: 2px solid #E31B6D; padding-top: 10px; margin-top: 10px; }
                    .status-badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
                    .status-pending { background: #FEF3C7; color: #92400E; }
                    .status-confirmed { background: #DBEAFE; color: #1E40AF; }
                    .status-processing { background: #E0E7FF; color: #3730A3; }
                    .status-delivered { background: #D1FAE5; color: #065F46; }
                    .status-cancelled { background: #FEE2E2; color: #991B1B; }
                    .footer { margin-top: 50px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #f0f0f0; padding-top: 20px; }
                    .notes { background: #f8f8f8; padding: 15px; border-radius: 8px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🧶 LittleKnots</h1>
                    <p>Handmade Crochet Items with Love</p>
                    <p style="font-size: 12px; margin-top: 10px;">Contact: +92-321-4480668 | Instagram: @littleknotspk</p>
                </div>
                
                <div class="section">
                    <h2>📋 Order Information</h2>
                    <div class="info-grid">
                        <span class="info-label">Order ID:</span>
                        <span class="info-value">${order.id}</span>
                        
                        <span class="info-label">Order Date:</span>
                        <span class="info-value">${new Date(order.created_at).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</span>
                        
                        <span class="info-label">Status:</span>
                        <span class="info-value"><span class="status-badge status-${order.status}">${order.status}</span></span>
                        
                        <span class="info-label">Payment Method:</span>
                        <span class="info-value">${order.payment_method === 'cod' ? '💵 Cash on Delivery' : '💳 Advance Payment'}</span>
                    </div>
                </div>

                <div class="section">
                    <h2>👤 Customer Details</h2>
                    <div class="info-grid">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${order.customer_name}</span>
                        
                        <span class="info-label">Email:</span>
                        <span class="info-value">${order.customer_email}</span>
                        
                        <span class="info-label">Phone:</span>
                        <span class="info-value">${order.customer_phone}</span>
                        
                        <span class="info-label">Delivery Address:</span>
                        <span class="info-value">${order.customer_address}</span>
                    </div>
                </div>

                <div class="section">
                    <h2>🛍️ Order Items</h2>
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th style="width: 50%">Item</th>
                                <th style="width: 15%; text-align: center">Qty</th>
                                <th style="width: 17.5%; text-align: right">Price</th>
                                <th style="width: 17.5%; text-align: right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.order_items.map((item: any) => `
                                <tr>
                                    <td>
                                        <strong>${item.name}</strong>
                                        ${item.color ? `<div class="item-description">Color: ${item.color}</div>` : ''}
                                        ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
                                    </td>
                                    <td style="text-align: center">${item.quantity}</td>
                                    <td style="text-align: right">₨${item.price.toLocaleString()}</td>
                                    <td style="text-align: right"><strong>₨${(item.price * item.quantity).toLocaleString()}</strong></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="totals">
                        <div class="totals-row">
                            <span>Subtotal:</span>
                            <span>₨${subtotal.toLocaleString()}</span>
                        </div>
                        <div class="totals-row">
                            <span>Shipping:</span>
                            <span>${shipping === 0 ? 'FREE' : '₨' + shipping.toLocaleString()}</span>
                        </div>
                        <div class="totals-row grand-total">
                            <span>GRAND TOTAL:</span>
                            <span>₨${order.total_amount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                ${order.customer_notes ? `
                    <div class="section">
                        <h2>💬 Customer Notes</h2>
                        <div class="notes">${order.customer_notes}</div>
                    </div>
                ` : ''}

                ${order.admin_notes ? `
                    <div class="section">
                        <h2>📝 Admin Notes</h2>
                        <div class="notes" style="background: #FEF3C7;">${order.admin_notes}</div>
                    </div>
                ` : ''}

                <div class="footer">
                    <p><strong>Thank you for your order!</strong></p>
                    <p>LittleKnots - Handmade with Love 💕</p>
                    <p style="margin-top: 10px;">For any queries, contact us via WhatsApp or Instagram</p>
                </div>
            </body>
            </html>
        `);

        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 250);
    };

    // Statistics
    const stats = useMemo(() => {
        const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const completedOrders = orders.filter(o => o.status === 'delivered').length;
        const todayOrders = orders.filter(o => {
            const orderDate = new Date(o.created_at);
            const today = new Date();
            return orderDate.toDateString() === today.toDateString();
        }).length;

        return { totalRevenue, pendingOrders, completedOrders, todayOrders, totalOrders: orders.length };
    }, [orders]);

    // Filtered orders
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesFilter = filter === "all" || order.status === filter;
            const matchesSearch = searchQuery === "" ||
                order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer_phone.includes(searchQuery) ||
                order.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [orders, filter, searchQuery]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-primary mb-2">Admin Login</h1>
                        <p className="text-foreground/60">Enter password to access admin panel</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                                Admin Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
                        >
                            Login to Admin Panel
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            <Navbar />

            <main className="flex-grow py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">Admin Panel</h1>
                            <p className="text-foreground/60 text-sm mt-1">Manage your orders and track business performance</p>
                        </div>
                        <button
                            onClick={() => {
                                sessionStorage.removeItem("admin_authenticated");
                                setIsAuthenticated(false);
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-primary/10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-foreground/60 text-xs sm:text-sm font-medium">Total Revenue</p>
                                <span className="text-green-600">💰</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-primary">{formatPrice(stats.totalRevenue)}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-primary/10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-foreground/60 text-xs sm:text-sm font-medium">Total Orders</p>
                                <span className="text-blue-600">📦</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-primary/10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-foreground/60 text-xs sm:text-sm font-medium">Pending</p>
                                <span className="text-yellow-600">⏳</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-primary/10">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-foreground/60 text-xs sm:text-sm font-medium">Completed</p>
                                <span className="text-green-600">✓</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by customer name, email, phone, or order ID..."
                                className="w-full px-4 py-3 pl-12 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all text-sm ${filter === status
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-white text-foreground hover:bg-primary/10 border border-primary/10'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                {status === 'all' && ` (${orders.length})`}
                            </button>
                        ))}
                    </div>

                    {/* Orders Table/Cards */}
                    {loading ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-foreground/60">Loading orders...</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-foreground/60 text-lg">No orders found</p>
                            <p className="text-foreground/40 text-sm mt-2">Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-foreground">
                                                        {order.id.slice(0, 8)}...
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-foreground">{order.customer_name}</div>
                                                        <div className="text-sm text-gray-500">{order.customer_phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                                                        {order.item_count} items
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">
                                                        {formatPrice(order.total_amount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                                                        {order.payment_method === 'cod' ? '💵 COD' : '💳 Advance'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                                    order.status === 'confirmed' ? 'bg-indigo-100 text-indigo-800' :
                                                                        'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="text-primary hover:text-primary-dark font-semibold"
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            onClick={() => printOrder(order)}
                                                            className="text-blue-600 hover:text-blue-800 font-semibold"
                                                        >
                                                            Print
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {filteredOrders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-lg shadow-sm border border-primary/10 p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-semibold text-foreground">{order.customer_name}</p>
                                                <p className="text-xs text-gray-500 font-mono">#{order.id.slice(0, 8)}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'confirmed' ? 'bg-indigo-100 text-indigo-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2 mb-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Total:</span>
                                                <span className="font-bold text-primary">{formatPrice(order.total_amount)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Items:</span>
                                                <span>{order.item_count}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Payment:</span>
                                                <span>{order.payment_method === 'cod' ? '💵 COD' : '💳 Advance'}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Date:</span>
                                                <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => printOrder(order)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                Print
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 sm:p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-primary-dark mb-2">Order Details</h2>
                                    <p className="text-xs sm:text-sm text-gray-500 font-mono">ID: {selectedOrder.id}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-400 hover:text-gray-600 p-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            {editingOrder?.id === selectedOrder.id ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Customer Name</label>
                                            <input
                                                type="text"
                                                value={editingOrder.customer_name}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, customer_name: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={editingOrder.customer_email}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, customer_email: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                value={editingOrder.customer_phone}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, customer_phone: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2">Status</label>
                                            <select
                                                value={editingOrder.status}
                                                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Delivery Address</label>
                                        <textarea
                                            value={editingOrder.customer_address}
                                            onChange={(e) => setEditingOrder({ ...editingOrder, customer_address: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            rows={2}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Admin Notes</label>
                                        <textarea
                                            value={editingOrder.admin_notes || ''}
                                            onChange={(e) => setEditingOrder({ ...editingOrder, admin_notes: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                            rows={4}
                                            placeholder="Add notes about this order..."
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={updateOrder}
                                            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setEditingOrder(null)}
                                            className="px-4 py-2 bg-gray-300 text-foreground rounded-lg hover:bg-gray-400 font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                                <span>👤</span> Customer Information
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-medium text-gray-600">Name:</span> {selectedOrder.customer_name}</p>
                                                <p><span className="font-medium text-gray-600">Email:</span> {selectedOrder.customer_email}</p>
                                                <p><span className="font-medium text-gray-600">Phone:</span> {selectedOrder.customer_phone}</p>
                                                <p><span className="font-medium text-gray-600">Address:</span> {selectedOrder.customer_address}</p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                                <span>📋</span> Order Information
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <p><span className="font-medium text-gray-600">Status:</span> <span className="capitalize font-semibold">{selectedOrder.status}</span></p>
                                                <p><span className="font-medium text-gray-600">Payment:</span> {selectedOrder.payment_method === 'cod' ? '💵 Cash on Delivery' : '💳 Advance Payment'}</p>
                                                <p><span className="font-medium text-gray-600">Total:</span> <span className="font-bold text-primary">{formatPrice(selectedOrder.total_amount)}</span></p>
                                                <p><span className="font-medium text-gray-600">Date:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                            <span>🛍️</span> Order Items
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedOrder.order_items.map((item: any, index: number) => (
                                                <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex-1">
                                                        <p className="font-medium text-sm sm:text-base">{item.name}</p>
                                                        {item.color && <p className="text-xs sm:text-sm text-gray-600">Color: {item.color}</p>}
                                                        {item.description && <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>}
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <p className="font-medium text-sm sm:text-base">{formatPrice(item.price * item.quantity)}</p>
                                                        <p className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedOrder.customer_notes && (
                                        <div className="mb-6">
                                            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                <span>💬</span> Customer Notes
                                            </h3>
                                            <p className="text-sm bg-blue-50 p-3 rounded-lg">{selectedOrder.customer_notes}</p>
                                        </div>
                                    )}

                                    {selectedOrder.admin_notes && (
                                        <div className="mb-6">
                                            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                <span>📝</span> Admin Notes
                                            </h3>
                                            <p className="text-sm bg-yellow-50 p-3 rounded-lg">{selectedOrder.admin_notes}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => setEditingOrder(selectedOrder)}
                                            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold transition-colors"
                                        >
                                            ✏️ Edit Order
                                        </button>
                                        <button
                                            onClick={() => printOrder(selectedOrder)}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                                        >
                                            🖨️ Print Order
                                        </button>
                                        <button
                                            onClick={() => deleteOrder(selectedOrder.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
