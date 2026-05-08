"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "default" | "outline" | "ghost" | "glow";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90": variant === "default",
            "border border-border glass hover:bg-white/10 text-foreground": variant === "outline",
            "hover:bg-white/10 text-foreground": variant === "ghost",
            "bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]": variant === "glow",
            "h-10 py-2 px-4": size === "default",
            "h-9 px-3 rounded-md": size === "sm",
            "h-12 px-8 rounded-full text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
