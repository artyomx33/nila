"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { fleet } from "@/lib/content/home";
import { CarIcon } from "@/components/ui/Icons";

export function FleetTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-black text-white" id="fleet" ref={ref}>
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="heading-lg mb-6">{fleet.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line mb-8">
              {fleet.body}
            </p>
            <Button href={fleet.cta.href} variant="primary" className="bg-teddy hover:bg-teddy/90">
              {fleet.cta.label}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-white/10 flex items-center justify-center">
              <CarIcon size={80} className="text-teddy" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
