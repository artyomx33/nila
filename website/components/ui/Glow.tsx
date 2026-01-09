"use client";

import React, { useEffect, useRef, useCallback, memo } from "react";
import { cn } from "@/lib/utils/cn";

export type GlowVariant = "teal" | "gold" | "sunset" | "ocean";

const GLOW_COLORS: Record<GlowVariant, string[]> = {
  teal: ["#2DD4BF", "#14B8A6", "#0D9488", "#0F766E"],
  gold: ["#FBBF24", "#F59E0B", "#D97706", "#B45309"],
  sunset: ["#F97316", "#FB923C", "#F59E0B", "#EA580C"],
  ocean: ["#0EA5E9", "#06B6D4", "#14B8A6", "#0284C7"],
};

interface GlowProps {
  children: React.ReactNode;
  className?: string;
  variant?: GlowVariant;
  spread?: number;
  proximity?: number;
  blur?: number;
  borderWidth?: number;
  disabled?: boolean;
}

export const Glow = memo(function Glow({
  children,
  className,
  variant = "teal",
  spread = 50,
  proximity = 150,
  blur = 6,
  borderWidth = 2,
  disabled = false,
}: GlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const currentAngle = useRef(0);
  const animationRef = useRef<number>(0);

  const handleMove = useCallback(
    (e?: PointerEvent) => {
      if (!containerRef.current || !glowRef.current || disabled) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        const glowEl = glowRef.current;
        if (!container || !glowEl) return;

        const rect = container.getBoundingClientRect();
        const mouseX = e?.clientX ?? 0;
        const mouseY = e?.clientY ?? 0;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const isNearby =
          mouseX > rect.left - proximity &&
          mouseX < rect.right + proximity &&
          mouseY > rect.top - proximity &&
          mouseY < rect.bottom + proximity;

        const isActive = isNearby && e !== undefined;
        glowEl.style.opacity = isActive ? "1" : "0";

        if (!isActive) return;

        const angleRad = Math.atan2(mouseY - centerY, mouseX - centerX);
        const angleDeg = (angleRad * 180) / Math.PI + 90;

        let diff = angleDeg - currentAngle.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        currentAngle.current += diff * 0.15;

        glowEl.style.setProperty("--glow-angle", `${currentAngle.current}deg`);
      });
    },
    [proximity, disabled]
  );

  useEffect(() => {
    if (disabled) return;

    const handlePointerMove = (e: PointerEvent) => handleMove(e);
    document.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handleMove, disabled]);

  if (disabled) {
    return <>{children}</>;
  }

  const colors = GLOW_COLORS[variant];

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ isolation: "isolate" }}
    >
      {/* Glow border effect */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute rounded-[inherit] transition-opacity duration-300"
        style={{
          inset: `-${borderWidth}px`,
          padding: `${borderWidth}px`,
          opacity: 0,
          zIndex: 0,
          background: `conic-gradient(
            from var(--glow-angle, 0deg) at 50% 50%,
            transparent 0deg,
            ${colors[0]} ${spread * 0.5}deg,
            ${colors[1]} ${spread}deg,
            ${colors[2]} ${spread * 1.5}deg,
            ${colors[3]} ${spread * 2}deg,
            transparent ${spread * 2.5}deg
          )`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          filter: blur > 0 ? `blur(${blur}px)` : undefined,
          ["--glow-angle" as string]: "0deg",
        }}
        aria-hidden="true"
      />

      {/* Content with background to cover glow in center */}
      <div className="relative z-10 h-full rounded-[inherit]">
        {children}
      </div>
    </div>
  );
});

export default Glow;
