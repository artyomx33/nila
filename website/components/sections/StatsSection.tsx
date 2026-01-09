"use client";

import { Container } from "@/components/ui/Container";

const stats = [
  {
    value: "15+",
    label: { es: "Propiedades Administradas", en: "Properties Managed" },
    description: { es: "En Bacalar y Riviera Maya", en: "In Bacalar and Riviera Maya" },
  },
  {
    value: "95%",
    label: { es: "Tasa de Ocupación", en: "Occupancy Rate" },
    description: { es: "Promedio anual", en: "Annual average" },
  },
  {
    value: "20+",
    label: { es: "Años de Experiencia", en: "Years of Experience" },
    description: { es: "Hospitalidad + Real Estate", en: "Hospitality + Real Estate" },
  },
  {
    value: "100%",
    label: { es: "Satisfacción del Cliente", en: "Client Satisfaction" },
    description: { es: "Transparencia total", en: "Total transparency" },
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-nila-950">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-nila-500 mb-2">
                {stat.value}
              </div>
              <div className="text-charcoal-100 font-medium mb-1">
                {stat.label.en}
              </div>
              <div className="text-charcoal-500 text-sm">
                {stat.description.en}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
