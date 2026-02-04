// Shared types for Sanity data structures

export interface SanityImageSource {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  email: string;
  image?: SanityImageSource;
  bio?: string;
}

export interface SanityBook {
  _id: string;
  title: string;
  slug: string;
  price: number;
  description?: string;
  coverImage?: SanityImageSource;
  backCoverImage?: SanityImageSource;
  authors?: SanityAuthor[];
  author?: SanityAuthor;
  publishedAt?: string;
  publishStatus?: 'draft' | 'published';
  isPremium?: boolean;
}

// Clean, unified book interface for frontend use
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  backCoverImage?: string;
  category: string;
  slug: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  author: string;
  quantity: number;
}

// Dashboard specific types
export interface DashboardBook {
  _id: string;
  title: string;
  slug: string;
  price: number;
  publishStatus?: string;
  coverImage?: SanityImageSource;
  authors?: string[];
}
