"use client";

import { useEffect } from "react";
import { useMotionValue, motion } from "framer-motion";

export function SoulMirror() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* The Ambient Glow - Tuned Down for Subtlety */}
            <motion.div
                className="absolute w-[350px] h-[350px] bg-gold-glow/10 rounded-full blur-[80px] mix-blend-plus-lighter opacity-40"
                style={{
                    x,
                    y,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                transition={{ type: "spring", stiffness: 50, damping: 30 }}
            />

            {/* The Soul Distortion Field (Noise) - Reduced */}
            <div className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
        </div>
    );
}
