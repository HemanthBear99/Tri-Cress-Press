"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, motion, useReducedMotion } from "framer-motion";

export function SoulMirror() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const wantsReduced = useReducedMotion();
    const rafRef = useRef<number | null>(null);
    const lastPos = useRef({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // cleanup will unset? not necessary
        if (wantsReduced) return;

        const move = (e: MouseEvent) => {
            lastPos.current = { x: e.clientX, y: e.clientY };
            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(() => {
                    x.set(lastPos.current.x);
                    y.set(lastPos.current.y);
                    if (rafRef.current) cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                });
            }
        };

        window.addEventListener("mousemove", move, { passive: true });
        return () => {
            window.removeEventListener("mousemove", move);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [x, y, wantsReduced]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* The Ambient Glow - Tuned Down for Subtlety */}
            {!wantsReduced && (
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
            )}

            {/* The Soul Distortion Field (Noise) - Reduced */}
            <div className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
        </div>
    );
}
