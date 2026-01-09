"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { fleetPage } from "@/lib/content/fleet";

export function FleetPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-gray-50" id="pricing" ref={ref}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-black">{fleetPage.pricing.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {fleetPage.pricing.plans.map((plan, index) => (
            <motion.div
              key={plan.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className={`relative rounded-xl p-6 lg:p-8 ${
                plan.featured
                  ? "bg-black text-white ring-2 ring-teddy"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teddy text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.featured ? "text-white" : "text-black"
                  }`}
                >
                  {plan.label}
                </h3>
                <p
                  className={`text-sm ${
                    plan.featured ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {plan.subtitle}
                </p>
              </div>

              <ul className="space-y-3">
                {plan.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.featured ? "bg-teddy/20" : "bg-teddy/10"
                      }`}
                    >
                      <svg
                        className="w-3 h-3 text-teddy"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span
                      className={`text-sm ${
                        plan.featured ? "text-gray-200" : "text-gray-600"
                      }`}
                    >
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <Button href={fleetPage.pricing.cta.href} variant="primary">
            {fleetPage.pricing.cta.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
