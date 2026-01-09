"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { fleetPage } from "@/lib/content/fleet";

export function FleetHero() {
  return (
    <section className="section-wrapper relative min-h-[70vh] pt-16 lg:pt-20" id="fleet-hero">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fleet-hero.webp"
          alt="TeddyFix fleet and taxi services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="section-inner relative z-10 min-h-[70vh] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-teddy text-white text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            10+ Years Trusted
          </motion.div>
          <h1 className="heading-xl mb-6">{fleetPage.hero.title}</h1>
          <p className="text-lg lg:text-xl text-gray-200 leading-relaxed mb-8">
            {fleetPage.hero.subtitle}
          </p>
          <Button
            href={fleetPage.hero.cta.href}
            variant="primary"
            className="bg-teddy hover:bg-teddy/90"
          >
            {fleetPage.hero.cta.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
