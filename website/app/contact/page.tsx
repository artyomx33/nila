"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button, CTAButton } from "@/components/ui/Button";
import { founders } from "@/lib/content/founders";
import { staggerContainer, fadeInUp, heroTextReveal, fadeInLeft, fadeInRight } from "@/lib/animations";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";

// Format WhatsApp number
const getWhatsAppNumber = (phone: string) => phone.replace(/\s+/g, "").replace("+", "");

export default function ContactPage() {
  return (
    <main className="bg-charcoal-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 bg-mesh-sunset opacity-40" />

        {/* Decorative orbs */}
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              variants={heroTextReveal}
              className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-charcoal-50"
            >
              Let&apos;s{" "}
              <span className="text-gradient-gold">Connect</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-charcoal-400 max-w-2xl mx-auto"
            >
              Ready to elevate your property management? We&apos;d love to hear from you.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Cards */}
      <section className="py-16 relative">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {/* WhatsApp - Primary */}
            <motion.div variants={fadeInUp}>
              <GlowCard glowVariant="teal" className="text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-nila-600/20 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-7 h-7 text-nila-400" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-charcoal-50">WhatsApp</h3>
                <p className="text-charcoal-400 text-sm mb-4">Fastest response time</p>
                <div className="space-y-2">
                  {founders.map((founder) => (
                    <a
                      key={founder.name}
                      href={`https://wa.me/${getWhatsAppNumber(founder.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-nila-400 hover:text-nila-300 transition-colors text-sm"
                    >
                      {founder.name}: {founder.phone}
                    </a>
                  ))}
                </div>
              </GlowCard>
            </motion.div>

            {/* Location */}
            <motion.div variants={fadeInUp}>
              <GlowCard glowVariant="gold" className="text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-gold-600/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-charcoal-50">Location</h3>
                <p className="text-charcoal-400 text-sm mb-4">We operate across</p>
                <div className="space-y-1 text-charcoal-300 text-sm">
                  <p>Bacalar, Quintana Roo</p>
                  <p>Tulum, Quintana Roo</p>
                  <p>Riviera Maya, Mexico</p>
                </div>
              </GlowCard>
            </motion.div>

            {/* Hours */}
            <motion.div variants={fadeInUp}>
              <GlowCard glowVariant="teal" className="text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-nila-600/20 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-nila-400" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-charcoal-50">Availability</h3>
                <p className="text-charcoal-400 text-sm mb-4">We&apos;re here for you</p>
                <div className="space-y-1 text-charcoal-300 text-sm">
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 2:00 PM</p>
                  <p className="text-nila-400">24/7 for emergencies</p>
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-mesh-teal opacity-30" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
            >
              <GlowCard glowVariant="teal" className="p-8">
                <h2 className="font-serif text-3xl mb-2 text-charcoal-50">
                  Send us a Message
                </h2>
                <p className="text-charcoal-400 mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-lg text-charcoal-100 placeholder-charcoal-500 focus:outline-none focus:border-nila-500 focus:ring-1 focus:ring-nila-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-lg text-charcoal-100 placeholder-charcoal-500 focus:outline-none focus:border-nila-500 focus:ring-1 focus:ring-nila-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-300 mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+52 ..."
                      className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-lg text-charcoal-100 placeholder-charcoal-500 focus:outline-none focus:border-nila-500 focus:ring-1 focus:ring-nila-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-300 mb-2">
                      Service Interest
                    </label>
                    <select className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-lg text-charcoal-100 focus:outline-none focus:border-nila-500 focus:ring-1 focus:ring-nila-500/50 transition-all">
                      <option value="">Select a service</option>
                      <option value="maintenance">Preventive Maintenance</option>
                      <option value="rental">Vacation Rental Management</option>
                      <option value="interior">Interior Design</option>
                      <option value="construction">Construction Oversight</option>
                      <option value="other">Other / General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your property and how we can help..."
                      className="w-full px-4 py-3 bg-charcoal-800/50 border border-charcoal-700 rounded-lg text-charcoal-100 placeholder-charcoal-500 focus:outline-none focus:border-nila-500 focus:ring-1 focus:ring-nila-500/50 transition-all resize-none"
                    />
                  </div>

                  <CTAButton className="w-full gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </CTAButton>
                </form>
              </GlowCard>
            </motion.div>

            {/* Founders Direct Contact */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="font-serif text-3xl mb-2 text-charcoal-50">
                  Speak Directly with Our Founders
                </h2>
                <p className="text-charcoal-400">
                  For immediate assistance, reach out directly via WhatsApp.
                </p>
              </div>

              {founders.map((founder, idx) => (
                <GlowCard
                  key={founder.name}
                  glowVariant={idx === 0 ? "teal" : "gold"}
                >
                  <div className="flex items-start gap-4">
                    {/* Photo placeholder */}
                    <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${idx === 0 ? "bg-nila-600/20 border-nila-600/30" : "bg-gold-600/20 border-gold-600/30"}`}>
                      <span className={`text-xl font-serif ${idx === 0 ? "text-nila-400" : "text-gold-400"}`}>
                        {founder.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-charcoal-50">
                        {founder.name}
                      </h3>
                      <p className={`text-sm mb-3 ${idx === 0 ? "text-nila-400" : "text-gold-400"}`}>
                        {founder.role.en}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`https://wa.me/${getWhatsAppNumber(founder.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="primary" size="sm" className="gap-2">
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </Button>
                        </a>
                        <a href={`tel:${founder.phone}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Phone className="w-4 h-4" />
                            Call
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}

              {/* Map placeholder */}
              <GlowCard glowVariant="teal" className="overflow-hidden">
                <div className="aspect-video bg-charcoal-800/50 rounded-lg flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-mesh-teal opacity-30" />
                  <div className="relative z-10 text-center">
                    <MapPin className="w-12 h-12 text-nila-500/50 mx-auto mb-2" />
                    <p className="text-charcoal-500 text-sm">
                      Riviera Maya, Mexico
                    </p>
                    <p className="text-charcoal-600 text-xs mt-1">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero opacity-50" />

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal-50">
              Prefer to{" "}
              <span className="text-gradient-teal">Chat Now?</span>
            </h2>
            <p className="text-xl text-charcoal-400 mb-8">
              Our team typically responds within minutes during business hours.
            </p>
            <a
              href={`https://wa.me/${getWhatsAppNumber(founders[0].phone)}?text=Hello! I'm interested in learning more about NILA's property management services.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CTAButton size="lg" className="gap-3">
                <MessageCircle className="w-6 h-6" />
                Start WhatsApp Chat
              </CTAButton>
            </a>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
