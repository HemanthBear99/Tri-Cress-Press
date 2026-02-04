"use client";

import { useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { Truck, Shield, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/Button";
import { Book } from "@/types";

interface ProductActionsProps {
    book: Book;
}

export function ProductActions({ book }: ProductActionsProps) {
    const { addItem, openCart } = useCartStore();
    const { success, error } = useToast();
    const [isBuying, setIsBuying] = useState(false);

    const createCartItem = () => ({
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.coverImage,
        author: book.author,
        quantity: 1
    });

    const handleAddToCart = () => {
        addItem(createCartItem());
        openCart();
        success(`${book.title} added to cart!`);
    };

    const handleBuyNow = async () => {
        setIsBuying(true);

        try {
            const cartItem = createCartItem();

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: [cartItem]
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (err) {
            if (process.env.NODE_ENV !== 'production') console.error("Checkout failed", err);
            error("Checkout failed. Please try again.");
            // Fallback: add to cart and open
            addItem(createCartItem());
            openCart();
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 pt-8">
            <div className="flex items-end gap-6">
                <span className="text-5xl font-bold text-white font-display animate-enter">
                    ₹{book.price}
                </span>
                <div className="flex items-center gap-2 pb-2">
                    <Sparkles className="w-4 h-4 text-primary animate-glow" />
                    <span className="text-sm text-primary font-medium">+ Free Shipping</span>
                </div>
            </div>

            <div className="flex gap-4">
                <Button
                    onClick={handleAddToCart}
                    variant="secondary"
                    size="lg"
                    className="flex-1 hover-lift border-gold hover-glow"
                >
                    <span className="flex items-center gap-2">
                        ADD TO CART
                    </span>
                </Button>
                <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    size="lg"
                    loading={isBuying}
                    className="flex-1 hover-lift border-gold hover-glow text-primary hover:text-white"
                >
                    <span className="flex items-center gap-2">
                        {isBuying ? (
                            <>
                                PROCESSING...
                            </>
                        ) : (
                            <>
                                BUY NOW
                            </>
                        )}
                    </span>
                </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-xs text-gray-400 mt-4">
                <span className="flex items-center gap-2 hover:text-primary transition-colors hover-glow">
                    <Truck className="w-4 h-4" />
                    Ships in 24h
                </span>
                <span className="flex items-center gap-2 hover:text-primary transition-colors hover-glow">
                    <Shield className="w-4 h-4" />
                    Secure Payment
                </span>
            </div>
        </div>
    );
}
