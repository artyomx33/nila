"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button, CTAButton } from "@/components/ui/Button";
import Link from "next/link";
import { heroTextReveal, staggerContainer, float } from "@/lib/animations";

export function HomeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal-950"
    >
      {/* Gradient mesh background with parallax */}
      <motion.div
        className="absolute inset-0 bg-mesh-hero"
        style={{ y: backgroundY }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        variants={float}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        variants={float}
        initial="initial"
        animate="animate"
        transition={{ delay: 2 }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-950/30 to-charcoal-950" />

      {/* Content with parallax */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 w-full">
        <Container className="text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Main headline with staggered reveal */}
            <motion.h1
              variants={heroTextReveal}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight"
            >
              <span className="block text-charcoal-50">El arte de operar</span>
              <span className="block text-gradient-teal mt-2">con precisión</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={heroTextReveal}
              className="text-xl md:text-2xl lg:text-3xl text-charcoal-300 max-w-3xl mx-auto font-light"
            >
              Premium property management in Mexico&apos;s most exceptional destinations
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={heroTextReveal}
              className="text-base md:text-lg text-charcoal-500 max-w-2xl mx-auto"
            >
              From Four Seasons & Ritz-Carlton to your Riviera Maya investment
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={heroTextReveal}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <Link href="/services">
                <CTAButton size="lg">Explore Our Services</CTAButton>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-charcoal-700 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-nila-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
