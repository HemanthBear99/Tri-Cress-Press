"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const { openCart, items } = useCartStore();
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const isHomePage = pathname === "/";
    const isAboutPage = pathname === "/about";
    const isContactPage = pathname === "/contact";
    const isAuthorsPage = pathname === "/authors";
    const isReadersPage = pathname === "/readers";

    // Always use nav-text class for consistent styling
    const textColorClass = "nav-text";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 navbar-consistent",
                isScrolled && "navbar-scrolled"
            )}
        >
            <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
                <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image src="/images/logo.png" alt="Tricrest Press" width={45} height={45} className="object-cover rounded-full shadow-md" />
                            <span className={cn("text-base sm:text-lg lg:text-xl font-bold tracking-tight font-display transition-colors nav-text", textColorClass)}>
                                Tricrest <span className="text-primary">Press</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <div className="flex items-center gap-4 xl:gap-6">
                            {["Authors", "Readers", "About", "Contact"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className={cn(
                                        "text-xs font-bold uppercase tracking-[0.15em] transition-all hover:tracking-[0.2em] nav-text whitespace-nowrap px-1",
                                        textColorClass
                                    )}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth & Actions */}
                    <div className="hidden md:flex items-center gap-2 xl:gap-4 flex-shrink-0">
                        <button
                            className={cn("text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 nav-text whitespace-nowrap px-2", textColorClass)}
                            onClick={openCart}
                        >
                            Cart {itemCount > 0 && <span className="bg-primary text-navy-deep text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{itemCount}</span>}
                        </button>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className={cn("text-xs font-bold uppercase tracking-[0.15em] transition-all nav-text whitespace-nowrap px-2", textColorClass)}>
                                    Login
                                </button>
                            </SignInButton>
                            <Link
                                href="/shop"
                                className="flex items-center justify-center h-9 px-3 xl:h-10 xl:px-4 bg-primary text-navy-deep text-xs font-bold uppercase tracking-widest rounded-md shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                            >
                                Bookstore
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center h-9 px-3 xl:h-10 xl:px-4 bg-primary text-navy-deep text-xs font-bold uppercase tracking-widest rounded-md shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
                            >
                                Dashboard
                            </Link>
                            <div className="ml-2">
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={cn("md:hidden transition-colors nav-text flex-shrink-0 p-1", textColorClass)}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-navy-deep/95 backdrop-blur-xl border-t border-white/10 absolute w-full">
                    <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
                        {["Authors", "Readers", "About", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-base font-medium text-gray-300 hover:text-primary transition-colors py-2 whitespace-nowrap"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="h-px bg-white/10 my-2" />

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="text-left text-base font-semibold text-white hover:text-primary transition-colors py-2 whitespace-nowrap">
                                    Login
                                </button>
                            </SignInButton>
                            <Link
                                href="/shop"
                                className="flex items-center justify-center h-12 w-full bg-primary text-navy-deep text-sm font-bold rounded-full hover:bg-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Bookstore
                            </Link>
                        </SignedOut>

                        <SignedIn>
                            <Link
                                href="/dashboard"
                                className="text-left text-base font-semibold text-white hover:text-primary transition-colors py-2 whitespace-nowrap"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Author Dashboard
                            </Link>
                            <div className="flex items-center gap-3 py-2">
                                <UserButton showName afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            )}
        </nav>
    );
}
