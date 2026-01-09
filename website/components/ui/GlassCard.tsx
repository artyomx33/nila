import React from "react";
import { cn } from "@/lib/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-sm bg-charcoal-900/40 border border-charcoal-800/50 rounded-lg p-6",
        hover && "transition-all duration-300 hover:bg-charcoal-900/60 hover:border-nila-600/30 hover:shadow-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
