"use client";

import { motion } from "framer-motion";
import { aboutPage } from "@/lib/content/about";

export function AboutHero() {
  return (
    <section className="section-wrapper bg-gradient-to-br from-gray-50 to-white pt-24 lg:pt-32">
      <div className="section-inner text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="heading-xl text-black mb-4">{aboutPage.pageTitle}</h1>
          <p className="subtext-md max-w-2xl mx-auto">
            {aboutPage.pageSubtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
