"use client";

import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./LoadingSpinner";
import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

// Ensure proper forwarding of ref
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = "relative inline-flex items-center justify-center rounded-full font-bold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

    const variants = {
      primary: "bg-primary text-navy-deep shadow-[0_4px_14px_0_rgba(249,212,6,0.39)] hover:shadow-[0_6px_20px_rgba(249,212,6,0.23)] hover:bg-white",
      secondary: "bg-navy-deep text-white hover:bg-primary hover:text-navy-deep",
      outline: "border-2 border-navy-deep dark:border-white text-navy-deep dark:text-white hover:bg-navy-deep hover:text-white dark:hover:bg-white dark:hover:text-navy-deep",
    };

    const sizes = {
      sm: "h-10 px-6 text-sm",
      md: "h-12 px-8 text-base",
      lg: "h-14 px-10 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        <motion.span
          className="relative z-10 flex items-center gap-2"
          initial={{ y: 0 }}
        // hidden hover effect logic could go here for text flip
        >
          {children}
        </motion.span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
