"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, addItem, total } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const { success, error } = useToast();
    const router = useRouter();

    // Hydration fix for persistent state
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-navy-deep border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out transform flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-display font-medium text-white flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Your Collection
                        <span className="text-sm text-gray-400 font-sans ml-2">({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <ShoppingBag className="w-16 h-16 text-white/10" />
                            <p className="text-gray-400 text-lg">Your cart is empty</p>
                            <Link
                                href="/shop"
                                onClick={closeCart}
                                className="inline-block bg-primary text-navy-deep font-bold px-6 py-3 rounded-full hover:bg-white hover:scale-105 transition-all shadow-lg"
                            >
                                Start Browsing
                            </Link>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-24 h-32 flex-shrink-0 rounded-md overflow-hidden border border-white/10 bg-white/5">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-navy-light/50">
                                            <ShoppingBag className="w-8 h-8 text-white/20" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-white font-medium font-display leading-tight mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-400">{item.author}</p>
                                        </div>
                                        <p className="text-primary font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/5">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-medium text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => addItem(item)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id, true)}
                                            className="text-gray-500 hover:text-red-400 transition-colors p-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 bg-navy-deep border-t border-white/10 space-y-4">
                        <div className="flex items-center justify-between text-lg font-medium text-white">
                            <span>Total</span>
                            <span className="font-bold text-primary">₹{total().toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-center text-gray-500">Shipping and taxes calculated at checkout</p>
                        <button
                            onClick={async () => {
                                if (isCheckingOut) return;

                                setIsCheckingOut(true);
                                try {
                                    const response = await fetch('/api/checkout', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ items }),
                                    });

                                    if (!response.ok) {
                                        throw new Error(`HTTP error! status: ${response.status}`);
                                    }

                                    const data = await response.json();
                                    if (data.url) {
                                        window.location.href = data.url;
                                    } else {
                                        throw new Error('No checkout URL returned');
                                    }
                                } catch (err) {
                                    if (process.env.NODE_ENV !== 'production') console.error("Checkout failed", err);
                                    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
                                    error("Checkout failed. Please try again.");
                                } finally {
                                    setIsCheckingOut(false);
                                }
                            }}
                            disabled={isCheckingOut}
                            className="w-full bg-primary text-navy-deep font-bold h-14 rounded-full hover:bg-white transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCheckingOut ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-navy-deep border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Proceed to Checkout
                                    <ShoppingBag className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
