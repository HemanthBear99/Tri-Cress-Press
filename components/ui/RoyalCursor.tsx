"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, MotionValue, useReducedMotion } from "framer-motion";

import { usePathname } from "next/navigation";

function TrailDot({ index, mouseX, mouseY, total }: { index: number, mouseX: MotionValue<number>, mouseY: MotionValue<number>, total: number }) {
    const springConfig = {
        damping: 25 + (index * 3),
        stiffness: 250 - (index * 15),
        mass: 0.2 + (index * 0.1)
    };

    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);
    const scale = 1 - (index / total);
    const opacity = 0.8 - (index / total);

    return (
        <motion.div
            className="absolute bg-gradient-to-br from-primary to-gold-glow rounded-full mix-blend-screen"
            style={{
                x,
                y,
                width: 14,
                height: 14,
                translateX: "-50%",
                translateY: "-50%",
                scale,
                opacity,
            }}
        />
    );
}


export function RoyalCursor() {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");



    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const wantsReduced = useReducedMotion();
    const rafRef = useRef<number | null>(null);
    const lastPos = useRef({ x: -100, y: -100 });
    const [mounted, setMounted] = useState(false);

    // The Nib (Sharp, precise response)
    const nibSpringConfig = { damping: 20, stiffness: 400, mass: 0.2 };
    const cursorX = useSpring(mouseX, nibSpringConfig);
    const cursorY = useSpring(mouseY, nibSpringConfig);

    // The Ink Flow (Tapered Chain) - Creates the fluid "written" look
    const TRAIL_COUNT = 4;
    const trails = Array.from({ length: TRAIL_COUNT });

    useEffect(() => {
        // Mark as mounted to avoid SSR/client markup mismatch
        setMounted(true);

        // Only enable fancy cursor on non-studio routes
        if (isStudio) {
            document.body.classList.remove("hide-cursor");
            return;
        }

        // Respect reduced motion and pointer type
        const supportsFinePointer = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(pointer: fine)").matches : true;
        if (wantsReduced || !supportsFinePointer) return;

        document.body.classList.add("hide-cursor");

        const moveCursor = (e: MouseEvent) => {
            lastPos.current = { x: e.clientX, y: e.clientY };
            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(() => {
                    mouseX.set(lastPos.current.x);
                    mouseY.set(lastPos.current.y);
                    rafRef.current && cancelAnimationFrame(rafRef.current);
                    rafRef.current = null;
                });
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target?.tagName === "A" ||
                target?.tagName === "BUTTON" ||
                !!target?.closest?.("a") ||
                !!target?.closest?.("button") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsHoveringLink(isClickable);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            document.body.classList.remove("hide-cursor");
        };
    }, [mouseX, mouseY, isStudio, wantsReduced]);

    if (!mounted) return null;

    if (isStudio) return null;

    // Respect reduced motion: render a subtle single nib only
    if (wantsReduced) {
        return (
            <div className="fixed inset-0 pointer-events-none z-[2147483647] overflow-hidden">
                <motion.div
                    className="absolute"
                    style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-100%" }}
                >
                    <svg width="28" height="28" viewBox="0 0 32 32" className="drop-shadow-lg">
                        <path d="M 16 32 L 8 16 C 8 10, 12 2, 16 2 C 20 2, 24 10, 24 16 L 16 32 Z" fill="#EAB308" />
                    </svg>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 pointer-events-none z-[2147483647] overflow-hidden">
            {/* The fluid gold ink trail */}
            {trails.map((_, i) => (
                <TrailDot
                    key={i}
                    index={i}
                    mouseX={mouseX}
                    mouseY={mouseY}
                    total={TRAIL_COUNT}
                />
            ))}

            {/* The Masterpiece Nib */}
            <motion.div
                className="absolute"
                style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-100%" }}
                animate={{
                    rotate: isHoveringLink ? -45 : -25, // Tilts to write when hovering links
                    scale: isClicked ? 0.9 : isHoveringLink ? 1.2 : 1, // Enlarge when hovering
                    filter: isHoveringLink ? "drop-shadow(0 0 8px rgba(249,212,6,0.5))" : "none", // Glow on hover
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-xl"
                >
                    <defs>
                        <linearGradient id="nibGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#FDE047" />
                            <stop offset="50%" stopColor="#EAB308" />
                            <stop offset="100%" stopColor="#CA8A04" />
                        </linearGradient>
                    </defs>

                    {/* Simple Elegant Nib */}
                    <path
                        d="M 16 32 L 8 16 C 8 10, 12 2, 16 2 C 20 2, 24 10, 24 16 L 16 32 Z"
                        fill="url(#nibGradient)"
                        stroke="white"
                        strokeWidth="0.5"
                        strokeOpacity="0.8"
                    />

                    {/* Ink Channel */}
                    <path d="M 16 12 L 16 28" stroke="#0A1120" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="16" cy="12" r="1.5" fill="#0A1120" />
                </svg>
            </motion.div>
        </div>
    );
}
