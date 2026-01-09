// ============================================
// STAT CARD COMPONENT
// Dashboard statistics card with icon, label, value, and trend
// ============================================

import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import Card from "./card";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "teal" | "gold" | "green" | "red";
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, icon, label, value, trend, variant = "teal", ...props }, ref) => {
    const iconVariants = {
      teal: "icon-box-teal",
      gold: "icon-box-gold",
      green: "icon-box-green",
      red: "icon-box-red",
    };

    const glowVariants = {
      teal: "glow-teal-subtle",
      gold: "glow-gold",
      green: "shadow-glow",
      red: "",
    };

    return (
      <Card
        ref={ref}
        variant="glass"
        className={cn("hover:border-teal-600/30 transition-all", glowVariants[variant], className)}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-zinc-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.positive ? "text-green-400" : "text-red-400"
                  )}
                >
                  {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-zinc-500">vs last month</span>
              </div>
            )}
          </div>
          <div className={cn("icon-box icon-box-lg", iconVariants[variant])}>
            {icon}
          </div>
        </div>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export default StatCard;
