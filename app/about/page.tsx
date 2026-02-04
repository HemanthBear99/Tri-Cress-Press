export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 px-6 lg:px-20 bg-navy-deep relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,212,6,0.1),transparent_70%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto space-y-16 pb-20 relative z-10">
                <div className="text-center space-y-6 pt-10">
                    <h1 className="text-6xl lg:text-8xl font-display font-medium text-white tracking-tight animate-enter">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary">Story</span>
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto animate-enter delay-100" />
                </div>

                <div className="prose prose-xl prose-invert mx-auto font-serif text-center space-y-8">
                    <p className="text-3xl italic text-cream/90 leading-relaxed font-light animate-enter delay-200">
                        &quot;We believe that every great story deserves a binding as timeless as the words within.&quot;
                    </p>
                    <div className="grid lg:grid-cols-2 gap-12 text-left pt-8">
                        <p className="text-gray-400 text-lg leading-relaxed animate-enter delay-300">
                            Founded in 2025, <span className="text-white font-bold">Tricrest Press</span> has remained a bastion of literary excellence for over a century. From our humble beginnings in a small London bindery to our status today as a premier global publishing house, our mission has never wavered: to discover, nurture, and present the world&apos;s most compelling voices.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed animate-enter delay-400">
                            Our &quot;Tricrest&quot; symbol represents the three peaks of our philosophy: <strong className="text-primary">Integrity</strong> in curation, <strong className="text-primary">Artistry</strong> in production, and <strong className="text-primary">Legacy</strong> in preservation. We don&apos;t just print books; we craft artifacts that stand the test of time.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 pt-12 animate-enter delay-500">
                    {[
                        { count: "100+", label: "Years of Heritage" },
                        { count: "500+", label: "Bestselling Titles" },
                        { count: "50+", label: "Award Winners" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-10 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:bg-white/10 group">
                            <span className="block text-5xl font-display font-bold text-white group-hover:text-primary transition-colors mb-3">{stat.count}</span>
                            <span className="text-xs font-sans tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
