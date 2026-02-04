import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource, SanityBook, SanityAuthor } from '@/types';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-23',
    useCdn: true, // Enable CDN for faster reads
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Fetch all books
export async function getBooks(): Promise<SanityBook[]> {
    return client.fetch(`
        *[_type == "book"] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            price,
            description,
            coverImage,
            backCoverImage,
            "authors": coalesce(authors[]->name, [author->name]),
            "author": coalesce(authors[0]->name, author->name)
        }
    `);
}

// Fetch a single book by slug
export async function getBookBySlug(slug: string): Promise<SanityBook | null> {
    return client.fetch(`
        *[_type == "book" && slug.current == $slug][0] {
            _id,
            title,
            "slug": slug.current,
            price,
            description,
            coverImage,
            backCoverImage,
            "authors": coalesce(authors[]->name, [author->name]),
            "author": coalesce(authors[0]->name, author->name)
        }
    `, { slug });
}

// Fetch books by author email (for dashboard)
export async function getBooksByAuthorEmail(email: string): Promise<SanityBook[]> {
    return client.fetch(`
        *[_type == "book" && ($email in authors[]->email || author->email == $email)] | order(publishedAt desc) {
            _id,
            title,
            "slug": slug.current,
            price,
            publishStatus,
            coverImage,
            "authors": coalesce(authors[]->name, [author->name])
        }
    `, { email });
}

