"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fleetPage } from "@/lib/content/fleet";

export function FleetPartnership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-gray-50" ref={ref}>
      <div className="section-inner">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-block bg-teddy/10 text-teddy font-semibold px-4 py-2 rounded-full text-sm mb-6">
              {fleetPage.partnership.highlight}
            </div>
            <h2 className="heading-lg text-black mb-6">
              {fleetPage.partnership.title}
            </h2>
            <p className="subtext-md whitespace-pre-line">
              {fleetPage.partnership.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
