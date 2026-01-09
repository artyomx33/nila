"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fleetPage } from "@/lib/content/fleet";
import {
  WrenchIcon,
  SparkleIcon,
  CarIcon,
} from "@/components/ui/Icons";

// Simple icon components for fleet services
function SearchIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ClipboardIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function ClockIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  wrench: <WrenchIcon size={24} className="text-teddy" />,
  search: <SearchIcon size={24} className="text-teddy" />,
  sparkle: <SparkleIcon size={24} className="text-teddy" />,
  car: <CarIcon size={24} className="text-teddy" />,
  clipboard: <ClipboardIcon size={24} className="text-teddy" />,
  clock: <ClockIcon size={24} className="text-teddy" />,
};

export function FleetServices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-white" id="services" ref={ref}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-black">{fleetPage.services.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleetPage.services.list.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="flex-shrink-0 w-12 h-12 rounded-lg bg-teddy/10 flex items-center justify-center">
                {iconMap[service.icon]}
              </span>
              <span className="text-gray-700">{service.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
