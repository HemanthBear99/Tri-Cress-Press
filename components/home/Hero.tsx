"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ShoppingBag, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  // Parallax Logic
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  // Physics-based split


  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const glowVariants: Variants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1.1, 0.8],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <main ref={containerRef} className="relative flex flex-col lg:flex-row min-h-screen pt-20 lg:pt-0 overflow-hidden bg-navy-deep">

      {/* Left Side: Authors */}
      <motion.section
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{ flex: hoveredSide === "left" ? 1.15 : hoveredSide === "right" ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="relative bg-navy-deep flex flex-col justify-center py-20 lg:py-0 px-6 lg:px-20 min-w-0 border-r border-white/5 z-10"
      >
        {/* Background Parallax */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/hero_author_bg.png"
            alt="Background for Authors"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-navy-deep/60" />
          {/* Cinematic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/80" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl mx-auto lg:mx-0"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase font-sans text-primary/90">For Authors</span>
            <div className="w-12 h-[1px] bg-primary/30" />
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-white mb-8 font-display">
            BRING YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-gold-glow to-primary bg-[length:200%_auto] animate-shimmer inline-block">
              WORDS
            </span>{" "}
            TO LIFE
          </motion.h1>

          <motion.p variants={itemVariants} className="text-gray-300 text-base lg:text-lg mb-12 max-w-md leading-relaxed font-light font-sans">
            Join an elite community of storytellers. We provide the platform, polish, and prestige your masterpiece deserves.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
            <Link
              href="/authors"
              className="relative group overflow-hidden bg-primary text-navy-deep h-14 px-8 rounded-full text-base font-bold tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(249,212,6,0.3)] hover:shadow-[0_0_60px_-15px_rgba(249,212,6,0.5)] flex items-center gap-3"
            >
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">START PUBLISHING</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            <Link
              href="/guidelines"
              className="text-white/60 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors"
            >
              View Guidelines
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Right Side: Readers */}
      <motion.section
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{ flex: hoveredSide === "right" ? 1.15 : hoveredSide === "left" ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="relative bg-cream flex flex-col justify-center py-20 lg:py-0 px-6 lg:px-20 min-w-0 z-10"
      >
        {/* Background Parallax */}
        <motion.div style={{ y: y2 }} className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/hero_reader_bg.png"
            alt="Background for Readers"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-50 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-cream/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl mx-auto lg:mx-0 lg:ml-auto text-left lg:text-right flex flex-col items-start lg:items-end"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 text-navy-deep/80">
            <div className="w-12 h-[1px] bg-navy-deep/30 hidden lg:block" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase font-sans">For Readers</span>
            <BookOpen className="w-4 h-4 ml-1" />
            <div className="w-12 h-[1px] bg-navy-deep/30 lg:hidden" />
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-navy-deep mb-8 font-display">
            DISCOVER YOUR <br />
            NEXT <span className="italic font-display text-transparent bg-clip-text bg-gradient-to-br from-navy-deep to-blue-900">OBSESSION</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-navy-deep/80 text-base lg:text-lg mb-12 max-w-md leading-relaxed font-light lg:text-right font-sans">
            Immerse yourself in a curated collection of world-class fiction and non-fiction. Experience reading redefined.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center lg:justify-end w-full">
            <Link
              href="/shop"
              className="group flex items-center gap-3 border border-navy-deep/20 text-navy-deep hover:bg-navy-deep hover:text-primary h-14 px-8 rounded-full text-base font-bold tracking-wide transition-all hover:scale-105 duration-300"
            >
              <span className="group-hover:text-white transition-colors">BROWSE THE SHOP</span>
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:text-white" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Premium Trust Bar - Floating Glass */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-6 right-6 z-20"
      >
        <div className="max-w-7xl mx-auto bg-navy-deep/30 backdrop-blur-2xl rounded-2xl border border-white/10 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-500 hover:bg-navy-deep/40 hover:border-white/20 hover:shadow-[0_8px_32px_0_rgba(249,212,6,0.1)]">
          <span className="text-white/90 text-sm font-bold tracking-[0.25em] uppercase flex items-center gap-4 whitespace-nowrap drop-shadow-md">
            <motion.div variants={glowVariants} initial="initial" animate="animate">
              <Sparkles className="w-4 h-4 text-primary drop-shadow-[0_0_8px_rgba(249,212,6,0.8)]" />
            </motion.div>
            Trusted by leading platforms
          </span>
          <div className="flex items-center gap-10 opacity-90 hover:opacity-100 transition-opacity duration-500 flex-wrap justify-center">
            {["AMAZON", "GOODREADS", "KDP SELECT", "BARNES & NOBLE"].map((brand, index) => (
              <div key={index} className="text-white/70 font-bold tracking-widest text-xs lg:text-sm hover:text-primary transition-all duration-300 cursor-default hover:drop-shadow-[0_0_10px_rgba(249,212,6,0.5)]">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
