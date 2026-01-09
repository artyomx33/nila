"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Glow, GlowVariant } from "./Glow";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "glow" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  glowVariant?: GlowVariant;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  glowVariant = "teal",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-nila-600 text-white hover:bg-nila-700 hover:shadow-lg hover:shadow-nila-600/20",
    secondary:
      "bg-charcoal-800 text-charcoal-100 border border-charcoal-700 hover:bg-charcoal-700 hover:border-charcoal-600",
    outline:
      "bg-transparent border border-nila-600/50 text-nila-400 hover:bg-nila-600/10 hover:border-nila-500",
    glow: "bg-nila-600 text-white hover:bg-nila-700 animate-glow-pulse",
    ghost:
      "bg-transparent text-charcoal-300 hover:text-nila-400 hover:bg-charcoal-800/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    disabledStyles,
    className
  );

  const buttonContent = href ? (
    <a href={href} className={classes}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );

  // Wrap glow variant in Glow component for interactive effect
  if (variant === "glow") {
    return (
      <Glow variant={glowVariant} className="rounded-lg inline-block">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {buttonContent}
        </motion.div>
      </Glow>
    );
  }

  // Regular variants with subtle motion
  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {buttonContent}
    </motion.div>
  );
}

// CTA Button - prominent call to action with always-on glow
export function CTAButton({
  children,
  href,
  onClick,
  className,
  size = "lg",
}: Omit<ButtonProps, "variant">) {
  return (
    <Glow variant="teal" className="rounded-lg inline-block" spread={60} blur={8}>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <a
          href={href}
          onClick={onClick as () => void}
          className={cn(
            "inline-flex items-center justify-center rounded-lg font-semibold",
            "bg-gradient-to-r from-nila-600 to-nila-500 text-white",
            "hover:from-nila-500 hover:to-nila-400",
            "shadow-lg shadow-nila-600/30 hover:shadow-nila-500/40",
            "transition-all duration-300",
            size === "sm" && "px-4 py-2 text-sm",
            size === "md" && "px-6 py-3 text-base",
            size === "lg" && "px-8 py-4 text-lg",
            className
          )}
        >
          {children}
        </a>
      </motion.div>
    </Glow>
  );
}
