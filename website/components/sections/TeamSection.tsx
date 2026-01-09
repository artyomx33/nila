"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { founders } from "@/lib/content/founders";
import { Phone, MessageCircle } from "lucide-react";
import { staggerContainer, fadeInUp, heroTextReveal } from "@/lib/animations";

// Format WhatsApp number
const getWhatsAppNumber = (phone: string) => phone.replace(/\s+/g, "").replace("+", "");

export function TeamSection() {
  return (
    <section className="py-24 bg-charcoal-950 relative overflow-hidden">
      {/* Subtle mesh background */}
      <div className="absolute inset-0 bg-mesh-teal opacity-30" />

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
            Meet the{" "}
            <span className="text-gradient-teal">Founders</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-charcoal-400 max-w-3xl mx-auto"
          >
            Combining luxury hospitality expertise with real estate investment knowledge
          </motion.p>
        </motion.div>

        {/* Founders grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {founders.map((founder, idx) => (
            <motion.div key={idx} variants={fadeInUp}>
              <GlowCard glowVariant={idx === 0 ? "teal" : "gold"} className="text-center">
                {/* Photo placeholder with glow ring */}
                <motion.div
                  className="relative w-36 h-36 mx-auto mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Glow ring */}
                  <div className={`absolute inset-0 rounded-full ${idx === 0 ? "bg-nila-500/20" : "bg-gold-500/20"} blur-xl`} />

                  {/* Photo circle */}
                  <div className="relative w-full h-full rounded-full bg-charcoal-800 flex items-center justify-center overflow-hidden border-2 border-charcoal-700">
                    <span className="text-charcoal-500 text-3xl font-serif">
                      {founder.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                </motion.div>

                {/* Info */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl mb-1 text-charcoal-50">
                    {founder.name}
                  </h3>
                  <p className={`mb-4 font-medium ${idx === 0 ? "text-nila-400" : "text-gold-400"}`}>
                    {founder.role.en}
                  </p>

                  {/* Contact button */}
                  <motion.a
                    href={`https://wa.me/${getWhatsAppNumber(founder.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal-800/50 text-charcoal-300 hover:text-nila-400 hover:bg-charcoal-800 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{founder.phone}</span>
                  </motion.a>
                </div>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {founder.expertise.slice(0, 3).map((exp, expIdx) => (
                    <span
                      key={expIdx}
                      className="px-3 py-1 bg-charcoal-800/70 text-charcoal-400 text-xs rounded-full border border-charcoal-700/50 hover:border-nila-600/30 transition-colors"
                    >
                      {exp.en}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
