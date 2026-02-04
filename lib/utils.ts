import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format price with currency symbol
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(price);
}

// Format author names from Sanity data
// Format author names from Sanity data
interface Author {
    name: string;
}

export function formatAuthorNames(authors: Author[] | Author | null | undefined): string {
    if (!authors) return "Unknown Author";

    if (Array.isArray(authors)) {
        return authors
            .map(author => (typeof author === 'string' ? author : author?.name))
            .filter(Boolean)
            .join(" & ");
    }

    return (typeof authors === 'string' ? authors : authors?.name) || "Unknown Author";
}

// Get initials from name
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

// Generate slug from string
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
