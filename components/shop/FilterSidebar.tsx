"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const GENRES = ["Literary Fiction", "Biography & Memoir", "Art & Design", "Modern Classics"];
const FORMATS = ["Hardcover", "eBook", "Audiobook"];

export function FilterSidebar() {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        genre: true,
        format: true,
    });

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className="w-full lg:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gold-muted/30 p-6 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto bg-background-light dark:bg-background-dark/50 backdrop-blur-sm z-30">
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-navy-deep dark:text-white text-2xl font-bold leading-tight font-display">
                        Refine Search
                    </h3>
                    <button className="lg:hidden text-sm underline opacity-70">Close</button>
                </div>

                {/* Genre Filter */}
                <div className="flex flex-col gap-2">
                    <div className="border border-gold-muted/20 rounded-lg bg-white/50 dark:bg-white/5 px-4 py-3">
                        <button
                            onClick={() => toggleSection('genre')}
                            className="flex w-full items-center justify-between"
                        >
                            <span className="text-navy-deep dark:text-white font-semibold">Genre</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", openSections.genre && "rotate-180")} />
                        </button>

                        {openSections.genre && (
                            <div className="pt-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                                {GENRES.map((genre) => (
                                    <label key={genre} className="flex items-center gap-3 cursor-pointer group/item hover:text-primary transition-colors">
                                        <div className="relative flex items-center justify-center w-5 h-5 border border-navy-deep/30 dark:border-white/30 rounded bg-white dark:bg-black group-hover/item:border-primary transition-colors">
                                            <input type="checkbox" className="peer appearance-none absolute inset-0 cursor-pointer" />
                                            <Check className="w-3 h-3 text-navy-deep opacity-0 peer-checked:opacity-100" />
                                        </div>
                                        <span className="text-navy-deep/80 dark:text-gray-300 text-sm">{genre}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Format Filter */}
                <div className="flex flex-col gap-2">
                    <div className="border border-gold-muted/20 rounded-lg bg-white/50 dark:bg-white/5 px-4 py-3">
                        <button
                            onClick={() => toggleSection('format')}
                            className="flex w-full items-center justify-between"
                        >
                            <span className="text-navy-deep dark:text-white font-semibold">Format</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", openSections.format && "rotate-180")} />
                        </button>

                        {openSections.format && (
                            <div className="pt-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                                {FORMATS.map((format) => (
                                    <label key={format} className="flex items-center gap-3 cursor-pointer group/item hover:text-primary transition-colors">
                                        <div className="relative flex items-center justify-center w-5 h-5 border border-navy-deep/30 dark:border-white/30 rounded-full bg-white dark:bg-black group-hover/item:border-primary transition-colors">
                                            <input type="radio" name="format" className="peer appearance-none absolute inset-0 cursor-pointer" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-navy-deep opacity-0 peer-checked:opacity-100" />
                                        </div>
                                        <span className="text-navy-deep/80 dark:text-gray-300 text-sm">{format}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Price Slider (Visual) */}
                <div className="flex flex-col gap-4 p-1">
                    <p className="text-navy-deep dark:text-white font-semibold">Price Range</p>
                    <div className="relative h-1 w-full bg-gold-muted/30 rounded-full mt-2">
                        <div className="absolute left-[20%] right-[30%] h-full bg-primary rounded-full" />
                        <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-4 h-4 bg-primary border-2 border-white dark:border-background-dark rounded-full shadow cursor-grab hover:scale-110 transition-transform" />
                        <div className="absolute top-1/2 -translate-y-1/2 right-[30%] w-4 h-4 bg-primary border-2 border-white dark:border-background-dark rounded-full shadow cursor-grab hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex justify-between text-sm text-navy-deep/70 dark:text-white/70 font-medium font-sans">
                        <span>$20</span>
                        <span>$85</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
