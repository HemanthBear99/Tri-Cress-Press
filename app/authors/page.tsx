import { PenTool, Upload, Book, Trophy } from "lucide-react";
import Link from "next/link";

export default function AuthorsPage() {
    return (
        <main className="min-h-screen pt-24 px-6 lg:px-20 bg-navy-deep relative overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-20 pb-20 relative z-10">
                {/* Hero Section */}
                <div className="text-center space-y-6 pt-10 max-w-4xl mx-auto">
                    <h1 className="text-6xl lg:text-8xl font-display font-medium text-white tracking-tight animate-enter">
                        Craft Your <span className="text-primary italic font-serif">Legacy</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-enter delay-100">
                        Join an elite collective of storytellers. At Tricrest Press, we don&apos;t just publish books; we curate masterpieces that stand the test of time.
                    </p>
                    <div className="pt-6 animate-enter delay-200">
                        <Link href="/contact" className="inline-block bg-primary text-navy-deep font-bold px-10 py-4 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(249,212,6,0.2)] hover:shadow-[0_0_40px_rgba(249,212,6,0.4)] tracking-widest uppercase text-sm">
                            Submit Manuscript
                        </Link>
                    </div>
                </div>

                {/* Process Steps */}
                <div className="grid md:grid-cols-3 gap-8 pt-10 animate-enter delay-300">
                    {[
                        {
                            icon: Upload,
                            title: "Submission",
                            desc: "Submit your manuscript through our secure portal. Our editorial board reviews every work with the respect it deserves."
                        },
                        {
                            icon: PenTool,
                            title: "Refinement",
                            desc: "Collaborate with world-class editors to polish your prose, ensuring your voice resonates with clarity and power."
                        },
                        {
                            icon: Trophy,
                            title: "Publication",
                            desc: "Your work is crafted into a physical artifact—bound, printed, and distributed to discerning readers worldwide."
                        }
                    ].map((step, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl hover:bg-white/10 transition-colors group">
                            <div className="w-16 h-16 bg-navy-deep border border-primary/30 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg">
                                <step.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
