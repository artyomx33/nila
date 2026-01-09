// ============================================
// ICON BOX COMPONENT
// Colored background box for icons
// ============================================

import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

export interface IconBoxProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  variant?: "teal" | "gold" | "green" | "red";
  size?: "sm" | "md" | "lg" | "xl";
}

const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, icon, variant = "teal", size = "md", ...props }, ref) => {
    const variants = {
      teal: "icon-box-teal",
      gold: "icon-box-gold",
      green: "icon-box-green",
      red: "icon-box-red",
    };

    const sizes = {
      sm: "icon-box-sm",
      md: "icon-box-md",
      lg: "icon-box-lg",
      xl: "icon-box-xl",
    };

    return (
      <div
        ref={ref}
        className={cn("icon-box", variants[variant], sizes[size], className)}
        {...props}
      >
        {icon}
      </div>
    );
  }
);

IconBox.displayName = "IconBox";

export default IconBox;
