"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { aboutPage } from "@/lib/content/about";

export function AboutIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-gray-50" ref={ref}>
      <div className="section-inner">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <h2 className="heading-lg text-black mb-6">{aboutPage.intro.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
              {aboutPage.intro.body}
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-12 bg-white rounded-xl p-8 border-l-4 border-teddy"
          >
            <blockquote className="text-xl text-gray-800 italic mb-4">
              &ldquo;{aboutPage.intro.quote.text}&rdquo;
            </blockquote>
            <p className="text-teddy font-semibold">
              — {aboutPage.intro.quote.author}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
