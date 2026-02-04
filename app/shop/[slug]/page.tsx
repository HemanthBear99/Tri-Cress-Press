import { BookPreview } from "@/components/product/BookPreview";
import { ProductActions } from "@/components/product/ProductActions";
import { Check } from "lucide-react";
import { getBookBySlug, urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { formatAuthorNames } from "@/lib/utils";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const book = await getBookBySlug(slug);

    // If book not found, show 404
    if (!book) {
        notFound();
    }

    // Transform for components
    const bookData = {
        id: book._id,
        title: book.title,
        author: formatAuthorNames(book.authors || book.author),
        price: book.price,
        coverImage: book.coverImage
            ? urlFor(book.coverImage).width(600).height(800).url()
            : "/images/books/placeholder.jpg",
        backCoverImage: book.backCoverImage
            ? urlFor(book.backCoverImage).width(600).height(800).url()
            : undefined,
        category: "",
        slug: book.slug.current,
    };

    return (
        <main className="min-h-screen pt-24 pb-20 px-6 lg:px-20 bg-background-dark">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left: Book Preview */}
                <div className="w-full h-[500px] lg:h-[600px] bg-white/5 rounded-2xl flex items-center justify-center p-8 border border-gold-muted/10 relative overflow-hidden">
                    <BookPreview
                        coverImage={bookData.coverImage}
                        backImage={bookData.backCoverImage}
                        title={bookData.title}
                        author={bookData.author}
                    />
                    <div className="absolute bottom-6 left-0 w-full text-center text-sm text-white/40 italic">
                        Click to flip book
                    </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col gap-8">
                    <div className="space-y-2">
                        <h3 className="text-primary font-bold tracking-widest uppercase text-sm">{bookData.author}</h3>
                        <h1 className="text-4xl lg:text-5xl font-display text-white leading-none">
                            {bookData.title}
                        </h1>
                    </div>

                    <div className="space-y-4">
                        {book.description && (
                            <p className="text-lg leading-relaxed text-white/80 font-light">
                                {book.description}
                            </p>
                        )}
                        <ul className="grid grid-cols-2 gap-3 pt-2">
                            {["Hardcover", "Premium Quality", "Free Shipping"].map(feature => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Client Component for Cart Actions */}
                    <ProductActions book={bookData} />
                </div>
            </div>
        </main>
    );
}
