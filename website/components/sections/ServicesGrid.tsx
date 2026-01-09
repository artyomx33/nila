"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { services } from "@/lib/content/home";
import { WrenchIcon, SparkleIcon, FlagIcon, ChevronRightIcon } from "@/components/ui/Icons";

const iconMap: Record<string, React.ReactNode> = {
  wrench: <WrenchIcon size={32} className="text-teddy" />,
  sparkle: <SparkleIcon size={32} className="text-teddy" />,
  flag: <FlagIcon size={32} className="text-teddy" />,
};

export function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-wrapper bg-gray-50" id="services" ref={ref}>
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg text-black">{services.title}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.list.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
            >
              <Link href={service.link.href} className="block h-full">
                <div className="card-service h-full flex flex-col">
                  <div className="mb-4">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-teddy font-medium text-sm group">
                    {service.link.label}
                    <ChevronRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
