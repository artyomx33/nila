"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { WrenchIcon, SparkleIcon, FlagIcon } from "@/components/ui/Icons";

interface ServiceSectionProps {
  id: string;
  icon: string;
  title: string;
  intro: string;
  list: string[];
  cta: {
    label: string;
    href: string;
  };
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  wrench: <WrenchIcon size={40} className="text-teddy" />,
  sparkle: <SparkleIcon size={40} className="text-teddy" />,
  flag: <FlagIcon size={40} className="text-teddy" />,
};

export function ServiceSection({
  id,
  icon,
  title,
  intro,
  list,
  cta,
  index,
}: ServiceSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Alternate background colors
  const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-50";

  return (
    <section
      className={`section-wrapper ${bgColor}`}
      id={id}
      ref={ref}
    >
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Icon + Title + Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4">{iconMap[icon]}</div>
            <h2 className="heading-lg text-black mb-4">{title}</h2>
            <p className="subtext-md mb-6">{intro}</p>
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </motion.div>

          {/* Right: Service List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <ul className="space-y-4">
              {list.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teddy/10 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-teddy"
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
                  <span className="text-gray-700 text-base lg:text-lg">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
