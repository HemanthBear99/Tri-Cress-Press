"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/hooks/useCartStore";
import { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating to product page
        addItem({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.coverImage,
            author: book.author
        });
        openCart();
    };

    return (
        <div className="group relative flex flex-col gap-4 perspective-1000">
            <Link href={`/shop/${book.slug}`} className="block w-full">
                <div className="relative w-full aspect-[2/3] bg-[#F0EFE9] dark:bg-white/5 rounded-sm shadow-book group-hover:shadow-book-hover group-hover:-translate-y-2 transition-all duration-500 flex items-center justify-center overflow-hidden preserve-3d group-hover:rotate-y-12 ease-out">

                    {/* Bookmark Ribbon */}
                    <div className="absolute top-0 right-4 w-8 h-12 bg-primary flex items-end justify-center pb-2 shadow-sm z-30 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <Heart className="w-4 h-4 text-navy-deep fill-current" />
                    </div>

                    {/* Book Cover Image Container */}
                    <div className="relative w-[85%] h-[85%] shadow-lg rounded-sm transform transition-all duration-700 preserve-3d group-hover:scale-105">
                        {/* Front Image */}
                        <div className="absolute inset-0 z-20 backface-hidden">
                            <Image
                                src={book.coverImage || "/images/books/placeholder.jpg"}
                                alt={book.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-sm"
                            />
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                        </div>

                        {/* Back Image (Optional Hover) */}
                        {book.backCoverImage && (
                            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-[-1]">
                                <Image
                                    src={book.backCoverImage}
                                    alt={`${book.title} back`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover rounded-sm"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            <div className="flex flex-col gap-1 px-1">
                <Link href={`/shop/${book.slug}`}>
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-primary transition-colors font-display">
                        {book.title}
                    </h3>
                </Link>
                <p className="text-sm italic text-white/60 font-serif">
                    {book.author}
                </p>
                <div className="flex items-center justify-between mt-2">
                    <span className="bg-primary text-navy-deep font-bold px-2 py-1 rounded text-xs tracking-wider shadow-[0_0_10px_rgba(249,212,6,0.3)]">
                        ₹{book.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-primary p-2 rounded-full hover:bg-white/10"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
