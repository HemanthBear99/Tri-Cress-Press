import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-navy-deep text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

                {/* Brand */}
                <div className="lg:col-span-5 space-y-6">
                    <Link href="/" className="inline-block">
                        <span className="text-2xl font-display font-bold text-white">
                            Tricrest <span className="text-primary">Press</span>
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Elevating the art of storytelling through premium publishing and curated reading experiences.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-navy-deep transition-all">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>


                {/* Links 2 - Company */}
                <div className="lg:col-span-3 space-y-6">
                    <h4 className="font-bold text-white tracking-widest uppercase text-xs">Company</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        {["About Us", "Careers", "Press", "Contact", "Submission Guidelines"].map(item => (
                            <li key={item}><Link href="#" className="hover:text-primary transition-colors">{item}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="lg:col-span-4 space-y-6">
                    <h4 className="font-bold text-white tracking-widest uppercase text-xs">Stay Inspired</h4>
                    <p className="text-gray-400 text-sm">Join our newsletter for new releases and exclusive author interviews.</p>
                    <form className="flex">
                        <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-l-md px-4 py-3 text-sm text-white w-full focus:outline-none focus:border-primary/50" />
                        <button className="bg-primary text-navy-deep px-4 rounded-r-md font-bold hover:bg-white transition-colors">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Tricrest Press. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
