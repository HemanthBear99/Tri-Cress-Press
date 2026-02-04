import { ShopPageClient } from "@/components/shop/ShopPageClient";
import { getBooks, urlFor } from "@/lib/sanity";
import { SanityBook } from "@/types";
import { formatAuthorNames } from "@/lib/utils";

export default async function ShopPage() {
    // Fetch books from Sanity CMS
    const sanityBooks: SanityBook[] = await getBooks();

    // Transform Sanity data to match BookCard props
    const books = sanityBooks.map((book) => ({
        id: book._id,
        title: book.title,
        author: formatAuthorNames(book.authors || book.author),
        price: book.price,
        coverImage: book.coverImage
            ? urlFor(book.coverImage).width(400).height(600).url()
            : "/images/books/placeholder.jpg",
        backCoverImage: book.backCoverImage
            ? urlFor(book.backCoverImage).width(400).height(600).url()
            : undefined,
        category: "",
        slug: book.slug,
    }));

    return <ShopPageClient books={books} />;
}
