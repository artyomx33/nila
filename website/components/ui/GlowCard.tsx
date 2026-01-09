"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Glow, GlowVariant } from "./Glow";
import { cardHover } from "@/lib/animations";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowVariant?: GlowVariant;
  hover?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export function GlowCard({
  children,
  className,
  glowVariant = "teal",
  hover = true,
  animated = true,
  onClick,
}: GlowCardProps) {
  const cardContent = (
    <div
      className={cn(
        "h-full backdrop-blur-sm bg-charcoal-900/40 border border-charcoal-800/50 rounded-xl p-6",
        hover && "transition-all duration-300",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (!animated) {
    return (
      <Glow variant={glowVariant} className="rounded-xl" disabled={!hover}>
        {cardContent}
      </Glow>
    );
  }

  return (
    <Glow variant={glowVariant} className="rounded-xl" disabled={!hover}>
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={cardHover}
        className="h-full"
      >
        {cardContent}
      </motion.div>
    </Glow>
  );
}

// Simpler version without glow (for nested usage or performance)
export function SimpleCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "backdrop-blur-sm bg-charcoal-900/40 border border-charcoal-800/50 rounded-xl p-6",
        hover && "transition-all duration-300 hover:bg-charcoal-900/60 hover:border-nila-600/30 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
