import { BookOpen, Star, Sparkles, Coffee } from "lucide-react";
import Link from "next/link";

export default function ReadersPage() {
    return (
        <main className="min-h-screen pt-24 px-6 lg:px-20 bg-navy-deep relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-20 pb-20 relative z-10">
                {/* Hero Section */}
                <div className="text-center space-y-6 pt-10 max-w-4xl mx-auto">
                    <h1 className="text-6xl lg:text-8xl font-display font-medium text-white tracking-tight animate-enter">
                        Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">Excellence</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-enter delay-100">
                        Discover a collection where every title is chosen for its brilliance. Immerse yourself in stories that challenge, inspire, and endure.
                    </p>
                    <div className="pt-6 animate-enter delay-200">
                        <Link href="/shop" className="inline-block bg-primary text-navy-deep font-bold px-10 py-4 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(249,212,6,0.2)] hover:shadow-[0_0_40px_rgba(249,212,6,0.4)] tracking-widest uppercase text-sm">
                            Browse The Shop
                        </Link>
                    </div>
                </div>

                {/* Collections Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 pt-10 animate-enter delay-300">
                    {[
                        {
                            icon: Star,
                            title: "Modern Classics",
                            desc: "Contemporary works destined to become the standards of tomorrow. Bold, innovative, and essential.",
                            gradient: "from-purple-900/40 to-blue-900/40"
                        },
                        {
                            icon: Sparkles,
                            title: "Rare Editions",
                            desc: "Limited run prints, signed copies, and exclusive bindings for the true collector.",
                            gradient: "from-amber-900/40 to-red-900/40"
                        },
                        {
                            icon: BookOpen,
                            title: "Non-Fiction",
                            desc: "Biographies, histories, and essays that illuminate the human condition.",
                            gradient: "from-emerald-900/40 to-teal-900/40"
                        },
                        {
                            icon: Coffee,
                            title: "Book Club Picks",
                            desc: "Titles guaranteed to spark conversation and debate into the late hours.",
                            gradient: "from-pink-900/40 to-rose-900/40"
                        }
                    ].map((collection, i) => (
                        <div key={i} className={`bg-gradient-to-br ${collection.gradient} border border-white/10 p-12 rounded-3xl hover:border-primary/50 transition-all group relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <collection.icon className="w-48 h-48 text-white" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                                    <collection.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-3xl font-display font-medium text-white mb-4">{collection.title}</h3>
                                <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
                                    {collection.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
