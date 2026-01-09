"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { contactPage } from "@/lib/content/contact";

export function ContactHero() {
  return (
    <section className="section-wrapper relative min-h-[75vh] pt-16 lg:pt-20">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact-hero.webp"
          alt="Contact TeddyFix garage"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="section-inner relative z-10 min-h-[75vh] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <h1 className="heading-xl mb-4">{contactPage.pageTitle}</h1>
          <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
            {contactPage.pageSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
