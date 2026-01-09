"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { fleetPage } from "@/lib/content/fleet";

export function FleetCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-black text-white" ref={ref}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="heading-lg mb-4">{fleetPage.finalCta.title}</h2>
          <p className="text-gray-300 text-lg mb-8">
            {fleetPage.finalCta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {fleetPage.finalCta.buttons.map((button, index) => (
              <Button
                key={button.label}
                href={button.href}
                variant={index === 0 ? "primary" : "secondary"}
                className={
                  index === 0
                    ? "bg-teddy hover:bg-teddy/90"
                    : "border-white text-white hover:bg-white hover:text-black"
                }
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
