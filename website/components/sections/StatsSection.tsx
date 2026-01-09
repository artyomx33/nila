"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const stats = [
  {
    value: 15,
    suffix: "+",
    label: { es: "Propiedades Administradas", en: "Properties Managed" },
    description: { es: "En Bacalar y Riviera Maya", en: "In Bacalar and Riviera Maya" },
  },
  {
    value: 95,
    suffix: "%",
    label: { es: "Tasa de Ocupación", en: "Occupancy Rate" },
    description: { es: "Promedio anual", en: "Annual average" },
  },
  {
    value: 20,
    suffix: "+",
    label: { es: "Años de Experiencia", en: "Years of Experience" },
    description: { es: "Hospitalidad + Real Estate", en: "Hospitality + Real Estate" },
  },
  {
    value: 100,
    suffix: "%",
    label: { es: "Satisfacción del Cliente", en: "Client Satisfaction" },
    description: { es: "Transparencia total", en: "Total transparency" },
  },
];

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="font-serif text-5xl md:text-6xl lg:text-7xl text-gradient-teal">
      {count}
      {suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 bg-charcoal-950 relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-teal opacity-50" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="text-center group"
            >
              {/* Glow effect behind the number */}
              <div className="relative">
                <div className="absolute inset-0 bg-nila-600/10 rounded-full blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
              </div>

              <div className="text-charcoal-100 font-medium mt-3 mb-1">
                {stat.label.en}
              </div>
              <div className="text-charcoal-500 text-sm">
                {stat.description.en}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
