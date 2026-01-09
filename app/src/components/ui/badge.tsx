// ============================================
// BADGE COMPONENT
// Status indicators and tags with color variants
// ============================================

import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "teal"
    | "gold"
    | "success"
    | "error"
    | "warning"
    | "muted"
    | "direct"
    | "airbnb"
    | "booking";
  size?: "sm" | "md";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "muted", size = "md", children, ...props }, ref) => {
    const variants = {
      teal: "badge-teal",
      gold: "badge-gold",
      success: "badge-success",
      error: "badge-error",
      warning: "badge-warning",
      muted: "badge-muted",
      direct: "badge-direct",
      airbnb: "badge-airbnb",
      booking: "badge-booking",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-xs",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-md",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export default Badge;
