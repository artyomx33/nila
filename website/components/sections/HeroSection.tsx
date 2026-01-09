"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/content/home";

export function HeroSection() {
  return (
    <section className="section-wrapper relative min-h-[90vh] pt-16 lg:pt-20" id="hero">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero.webp"
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="section-inner relative z-10 min-h-[90vh] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <h1 className="heading-xl mb-6">{hero.title}</h1>
          <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
            {hero.subtitle}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              href={hero.ctaPrimary.href}
              variant="primary"
              className="bg-teddy hover:bg-teddy/90"
            >
              {hero.ctaPrimary.label}
            </Button>
            <Button
              href={hero.ctaSecondary.href}
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              {hero.ctaSecondary.label}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
