"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneIcon, MapPinIcon } from "@/components/ui/Icons";
import { founders } from "@/lib/content/founders";
import { servicesArray } from "@/lib/content/services";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Format WhatsApp numbers
const getWhatsAppNumber = (phone: string) => phone.replace(/\s+/g, "").replace("+", "");

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white relative overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-mesh-teal opacity-20" />

      {/* Glowing divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nila-600/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-nila-600/20 flex items-center justify-center border border-nila-600/30 group-hover:border-nila-500/50 transition-colors">
                <span className="text-lg font-serif text-nila-500">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-serif text-charcoal-50 leading-tight">
                  NILA
                </span>
                <span className="text-[10px] text-charcoal-500 uppercase tracking-wider">
                  Estate Management
                </span>
              </div>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed">
              El arte de operar con precisión. Premium property management in
              Riviera Maya&apos;s most exceptional destinations.
            </p>

            {/* Social icons placeholder */}
            <div className="flex gap-3 mt-6">
              {["instagram", "linkedin", "facebook"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-charcoal-800/50 flex items-center justify-center text-charcoal-500 hover:text-nila-400 hover:bg-charcoal-800 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs uppercase">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-charcoal-300">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-charcoal-400 hover:text-nila-400 transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-nila-500 group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/app/admin/dashboard"
                  className="text-charcoal-600 hover:text-nila-400 transition-colors text-sm inline-flex items-center group"
                >
                  <span className="w-0 h-px bg-nila-500 group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                  Owner Portal
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-charcoal-300">
              Services
            </h3>
            <ul className="space-y-3">
              {servicesArray.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-charcoal-400 hover:text-nila-400 transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-px bg-nila-500 group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {service.name.en}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-charcoal-300">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-nila-600/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon size={16} className="text-nila-500" />
                </div>
                <span className="text-charcoal-400 text-sm pt-1">
                  Bacalar & Riviera Maya, Mexico
                </span>
              </li>
              {founders.map((founder) => (
                <li key={founder.name} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-nila-600/10 flex items-center justify-center flex-shrink-0">
                    <PhoneIcon size={16} className="text-nila-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-charcoal-600 text-xs">{founder.name}</span>
                    <a
                      href={`https://wa.me/${getWhatsAppNumber(founder.phone)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal-400 hover:text-nila-400 transition-colors text-sm"
                    >
                      {founder.phone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-charcoal-800/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-charcoal-500 text-sm">
              &copy; {new Date().getFullYear()} NILA Estate Management. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {["Bacalar", "Tulum", "Riviera Maya"].map((location, idx) => (
                <span key={location} className="flex items-center gap-2">
                  <span className="text-charcoal-600 text-xs">{location}</span>
                  {idx < 2 && <span className="w-1 h-1 rounded-full bg-nila-600/50" />}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
