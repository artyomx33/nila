"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { brand } from "@/lib/content/brand";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, heroTextReveal } from "@/lib/animations";
import { Check } from "lucide-react";

export function WhyNILA() {
  return (
    <section className="py-24 bg-charcoal-950 relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-mesh-gold opacity-30" />

      {/* Decorative floating orb */}
      <motion.div
        className="absolute -right-32 top-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={heroTextReveal}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-charcoal-50"
          >
            Why Choose{" "}
            <span className="text-gradient-gold">NILA</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-charcoal-400 max-w-3xl mx-auto"
          >
            {brand.tagline.en}
          </motion.p>
        </motion.div>

        {/* USP Cards - Asymmetric layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {brand.usps.slice(0, 3).map((usp, index) => (
            <motion.div
              key={index}
              variants={index === 1 ? fadeInUp : index === 0 ? fadeInLeft : fadeInRight}
              className={index === 1 ? "md:-mt-4" : ""}
            >
              <GlowCard glowVariant="gold" className="h-full text-center">
                {/* Animated icon */}
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="w-8 h-8 text-gold-500" />
                </motion.div>

                <h3 className="font-serif text-2xl mb-3 text-charcoal-50">
                  {usp.title.en}
                </h3>
                <p className="text-charcoal-400 leading-relaxed">
                  {usp.description.en}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured quote */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <GlowCard glowVariant="teal" className="text-center relative overflow-hidden">
            {/* Decorative quote marks */}
            <div className="absolute top-4 left-6 text-6xl font-serif text-nila-600/20">&ldquo;</div>
            <div className="absolute bottom-4 right-6 text-6xl font-serif text-nila-600/20">&rdquo;</div>

            <blockquote className="font-serif text-2xl md:text-3xl text-nila-400 relative z-10 px-8 py-4">
              Our excellence is a system: the same level of service, in any property,
              with any team, and at any time
            </blockquote>
          </GlowCard>
        </motion.div>
      </Container>
    </section>
  );
}
