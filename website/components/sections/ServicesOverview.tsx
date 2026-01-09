"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { servicesArray } from "@/lib/content/services";
import Link from "next/link";
import { ArrowRight, Settings, Home, Palette, Building2 } from "lucide-react";
import { staggerContainer, fadeInUp, heroTextReveal } from "@/lib/animations";

// Lucide icon mapping
const iconMap: Record<string, React.ReactNode> = {
  wrench: <Settings className="w-8 h-8" />,
  home: <Home className="w-8 h-8" />,
  palette: <Palette className="w-8 h-8" />,
  building: <Building2 className="w-8 h-8" />,
};

export function ServicesOverview() {
  return (
    <section className="py-24 bg-charcoal-950 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-900/20 to-transparent" />

      <Container className="relative z-10">
        {/* Section header with animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={heroTextReveal}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal-50"
          >
            Comprehensive Property
            <br />
            <span className="text-gradient-teal">Management Solutions</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-charcoal-400 max-w-3xl mx-auto"
          >
            From preventive maintenance to vacation rentals, we manage every aspect
            of your property with precision and care
          </motion.p>
        </motion.div>

        {/* Services grid with staggered animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicesArray.map((service, idx) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <Link href={`/services#${service.id}`} className="block h-full">
                <GlowCard
                  glowVariant={idx % 2 === 0 ? "teal" : "gold"}
                  className="h-full flex flex-col"
                >
                  {/* Icon with glow background */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-nila-600/20 rounded-xl blur-xl" />
                    <div className="relative w-14 h-14 rounded-xl bg-nila-600/10 flex items-center justify-center text-nila-400">
                      {iconMap[service.icon]}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl mb-3 text-charcoal-50">
                    {service.name.en}
                  </h3>
                  <p className="text-charcoal-400 mb-4 line-clamp-3 flex-grow">
                    {service.tagline.en}
                  </p>

                  {/* Learn more link */}
                  <div className="flex items-center text-nila-500 text-sm font-medium group/link">
                    <span className="group-hover/link:mr-2 transition-all duration-300">
                      Learn More
                    </span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </div>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
