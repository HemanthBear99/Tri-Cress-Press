"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookCard } from "./BookCard";
import { BookCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { Book } from "@/types";

interface ShopPageClientProps {
    books: Book[];
}

function ShopPageContent({ books }: ShopPageClientProps) {
    const searchParams = useSearchParams();
    const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });

    useEffect(() => {
        const success = searchParams.get('success');
        const canceled = searchParams.get('canceled');

        if (success === '1') {
            setMessage({
                type: 'success',
                text: 'Payment successful! Your order has been processed.'
            });
            // Clear the URL parameter
            window.history.replaceState({}, '', '/shop');
        } else if (canceled === '1') {
            setMessage({
                type: 'error',
                text: 'Payment was canceled. You can continue shopping or try again.'
            });
            // Clear the URL parameter
            window.history.replaceState({}, '', '/shop');
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 lg:px-20 bg-background-dark">
            <div className="max-w-7xl mx-auto">
                {/* Payment Status Message */}
                {message.type && (
                    <div className={`mb-6 p-4 rounded-lg text-center animate-enter ${
                        message.type === 'success' 
                            ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Content Header */}
                <div className="text-center mb-12">
                    <h1 className="text-white text-4xl font-bold tracking-tight font-display animate-enter">
                        Our Collection
                    </h1>
                    <p className="text-white/60 mt-2 animate-enter delay-75">
                        {books.length} exquisite titles
                    </p>
                </div>

                {/* Book Grid */}
                {books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 animate-enter delay-200">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {[...Array(8)].map((_, i) => (
                            <BookCardSkeleton key={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function ShopPageClient({ books }: ShopPageClientProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopPageContent books={books} />
        </Suspense>
    );
}
