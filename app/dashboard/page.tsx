import { currentUser } from "@clerk/nextjs/server";
import { getBooksByAuthorEmail, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Plus, Book, Clock, CheckCircle } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { SanityBook } from "@/types";

export default async function DashboardPage() {
    const user = await currentUser();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-display text-navy-deep">Access Restricted</h1>
                    <p className="text-navy-deep/60 max-w-md mx-auto">
                        Please sign in to your author account to access your personal dashboard and manage your publications.
                    </p>
                </div>
                <SignInButton mode="modal">
                    <button className="bg-primary text-navy-deep px-10 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
                        Sign In Now
                    </button>
                </SignInButton>
            </div>
        );
    }

    // Get the user's primary email from Clerk
    const userEmail = user.emailAddresses[0]?.emailAddress;

    // Fetch books where this user's email matches an author's email
    const books: SanityBook[] = userEmail
        ? await getBooksByAuthorEmail(userEmail)
        : [];

    const stats = [
        {
            icon: Book,
            value: books.length,
            label: "Total Books",
            color: "text-primary"
        },
        {
            icon: CheckCircle,
            value: books.filter(book => book.publishStatus === 'published').length,
            label: "Published",
            color: "text-green-500"
        },
        {
            icon: Clock,
            value: books.filter(book => book.publishStatus === 'draft').length,
            label: "In Review",
            color: "text-amber-500"
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 lg:px-20 bg-background-dark">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl lg:text-5xl font-display text-white">
                            Author <span className="text-primary italic">Panel</span>
                        </h1>
                        <p className="text-white/60 font-light text-lg">
                            Welcome back, {user.firstName || "Author"}. Here is an overview of your publications.
                        </p>
                        <p className="text-white/40 text-sm">
                            Showing books linked to: <span className="font-medium">{userEmail}</span>
                        </p>
                    </div>
                    <Link
                        href="/dashboard/new"
                        className="flex items-center gap-2 bg-navy-deep text-white px-6 py-3 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-navy-deep transition-all shadow-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Submit Manuscript
                    </Link>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5 shadow-sm">
                            <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-white/40 uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Books List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-display text-white">Your Publications</h2>
                    <div className="grid gap-4">
                        {books.length > 0 ? (
                            books.map((book) => (
                                <div key={book._id} className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-between hover:border-primary/30 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="relative w-16 h-20 bg-gray-800 rounded overflow-hidden shadow-md">
                                            {book.coverImage ? (
                                                <Image
                                                    src={urlFor(book.coverImage as any).width(100).height(150).url()}
                                                    alt={book.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Image</div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-primary transition-colors">{book.title}</h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${book.publishStatus === 'published' ? 'bg-green-900 text-green-300' : 'bg-amber-900 text-amber-300'
                                                    }`}>
                                                    {book.publishStatus || 'Draft'}
                                                </span>
                                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">₹{book.price}</span>
                                                {book.authors && book.authors.length > 1 && (
                                                    <span className="text-[10px] text-white/40">
                                                        Co-authored with {book.authors.filter((a: any) => typeof a === 'string' ? a !== user.firstName : a.name !== user.firstName).length} other(s)
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/shop/${book.slug.current}`}
                                        className="text-xs font-bold text-white/40 hover:text-primary uppercase tracking-widest px-4 py-2"
                                    >
                                        View Live
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                <p className="text-white/40">
                                    No books found for your email ({userEmail}).
                                </p>
                                <p className="text-white/30 text-sm mt-2">
                                    Make sure your author profile in Sanity has this email address.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

