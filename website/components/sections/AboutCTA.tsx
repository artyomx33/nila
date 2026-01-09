"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { aboutPage } from "@/lib/content/about";

export function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-white" ref={ref}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="heading-lg text-black mb-4">{aboutPage.cta.title}</h2>
          <p className="subtext-md mb-8">{aboutPage.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {aboutPage.cta.buttons.map((button, index) => (
              <Button
                key={button.label}
                href={button.href}
                variant={index === 0 ? "primary" : "secondary"}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
