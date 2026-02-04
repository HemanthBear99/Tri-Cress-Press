"use client";

import { Send, MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 px-6 lg:px-20 bg-navy-deep relative overflow-hidden flex items-center justify-center">
            <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 lg:gap-24 mb-20 relative z-10">

                <div className="space-y-10 self-center animate-enter">
                    <div>
                        <h1 className="text-6xl lg:text-7xl font-display font-medium text-white mb-6">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-primary italic">Touch</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                            Whether you&apos;re an author seeking representation or a reader with a question, we&apos;re here to listen to your story.
                        </p>
                    </div>

                    <div className="space-y-8 pt-4">
                        <div className="flex gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">Headquarters</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">123 Literary Lane, Publishing District<br />London, UK SW1A 1AA</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">Email</h4>
                                <p className="text-gray-400 text-sm">contact@tricrestpress.com</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">Hours</h4>
                                <p className="text-gray-400 text-sm">Mon - Fri: 9:00 AM - 6:00 PM GMT</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl animate-enter delay-200">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white uppercase tracking-wider ml-1">Name</label>
                                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:border-primary/50 focus:bg-black/30 outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white uppercase tracking-wider ml-1">Email</label>
                                <input type="email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:border-primary/50 focus:bg-black/30 outline-none transition-all" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white uppercase tracking-wider ml-1">Subject</label>
                            <div className="relative">
                                <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary/50 focus:bg-black/30 outline-none transition-all appearance-none cursor-pointer">
                                    <option className="bg-navy-deep">General Inquiry</option>
                                    <option className="bg-navy-deep">Manuscript Submission</option>
                                    <option className="bg-navy-deep">Press / Media</option>
                                    <option className="bg-navy-deep">Support</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white uppercase tracking-wider ml-1">Message</label>
                            <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:border-primary/50 focus:bg-black/30 outline-none transition-all resize-none" placeholder="How can we help you?" />
                        </div>

                        <button type="button" className="w-full bg-primary text-navy-deep font-bold text-sm tracking-widest uppercase py-4 rounded-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,212,6,0.15)] hover:shadow-[0_0_30px_rgba(249,212,6,0.3)]">
                            <span>SEND MESSAGE</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>

            </div>
        </main>
    );
}
