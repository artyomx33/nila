"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerContainerSlow,
  viewportOnce,
} from "@/lib/animations";

type AnimationType = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn" | "scaleIn";
type StaggerType = "normal" | "slow" | "none";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  stagger?: StaggerType;
  delay?: number;
  once?: boolean;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeIn,
  scaleIn,
};

const staggerVariants: Record<Exclude<StaggerType, "none">, Variants> = {
  normal: staggerContainer,
  slow: staggerContainerSlow,
};

export function AnimatedSection({
  children,
  className,
  animation = "fadeInUp",
  stagger = "none",
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  const variants = animationVariants[animation];

  // Add delay to the visible state
  const delayedVariants: Variants = {
    ...variants,
    visible: {
      ...variants.visible,
      transition: {
        ...(typeof variants.visible === "object" && "transition" in variants.visible
          ? variants.visible.transition
          : {}),
        delay,
      },
    },
  };

  if (stagger !== "none") {
    // Container with staggered children
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={once ? viewportOnce : { once: false, margin: "-50px" }}
        variants={staggerVariants[stagger]}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { once: false, margin: "-50px" }}
      variants={delayedVariants}
    >
      {children}
    </motion.div>
  );
}

// Individual animated item (for use inside stagger containers)
interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
}

export function AnimatedItem({
  children,
  className,
  animation = "fadeInUp",
}: AnimatedItemProps) {
  return (
    <motion.div className={className} variants={animationVariants[animation]}>
      {children}
    </motion.div>
  );
}

// Pre-configured section wrapper with noise texture option
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  withNoise?: boolean;
  withMesh?: "teal" | "gold" | "hero" | "sunset" | "none";
}

export function SectionWrapper({
  children,
  className,
  innerClassName,
  withNoise = false,
  withMesh = "none",
}: SectionWrapperProps) {
  const meshClass = withMesh !== "none" ? `bg-mesh-${withMesh}` : "";

  return (
    <section
      className={cn(
        "section-wrapper relative",
        withNoise && "bg-noise",
        meshClass,
        className
      )}
    >
      <div className={cn("section-inner relative z-10", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
