"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button, CTAButton } from "@/components/ui/Button";
import Link from "next/link";
import { staggerContainer, heroTextReveal, fadeInUp } from "@/lib/animations";
import { ArrowRight, Calendar } from "lucide-react";

export function HomeCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Mesh overlays */}
      <div className="absolute inset-0 bg-mesh-hero opacity-50" />
      <div className="absolute inset-0 bg-mesh-sunset opacity-30" />

      {/* Decorative orbs */}
      <motion.div
        className="absolute -left-32 top-1/4 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(13, 148, 136, 0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <motion.h2
            variants={heroTextReveal}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-charcoal-50"
          >
            Ready to{" "}
            <span className="text-gradient-teal">Optimize</span>
            <br />
            Your Property?
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-charcoal-400 mb-10 max-w-2xl mx-auto"
          >
            Let&apos;s discuss how NILA can elevate your property management
            with precision and excellence
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <CTAButton size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Schedule a Consultation
              </CTAButton>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="gap-2">
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Trust badge */}
          <motion.p
            variants={fadeInUp}
            className="mt-8 text-charcoal-500 text-sm"
          >
            Trusted by property owners across Riviera Maya
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
