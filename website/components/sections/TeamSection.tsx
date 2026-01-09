"use client";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { founders } from "@/lib/content/founders";
import { Phone } from "lucide-react";

// Format WhatsApp number
const getWhatsAppNumber = (phone: string) => phone.replace(/\s+/g, "").replace("+", "");

export function TeamSection() {
  return (
    <section className="py-24 bg-charcoal-950">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal-50">
            Meet the Founders
          </h2>
          <p className="text-xl text-charcoal-400 max-w-3xl mx-auto">
            Combining luxury hospitality expertise with real estate investment knowledge
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, idx) => (
            <GlassCard key={idx} hover>
              {/* Photo placeholder */}
              <div className="w-32 h-32 rounded-full bg-charcoal-800 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                <span className="text-charcoal-600 text-2xl font-serif">
                  {founder.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl mb-1 text-charcoal-50">
                  {founder.name}
                </h3>
                <p className="text-nila-500 mb-3">{founder.role.en}</p>
                <a
                  href={`https://wa.me/${getWhatsAppNumber(founder.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-charcoal-400 hover:text-nila-500 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  {founder.phone}
                </a>
              </div>

              {/* Top 3 expertise areas */}
              <div className="flex flex-wrap gap-2 justify-center">
                {founder.expertise.slice(0, 3).map((exp, expIdx) => (
                  <span
                    key={expIdx}
                    className="px-3 py-1 bg-charcoal-800/50 text-charcoal-400 text-xs rounded-full"
                  >
                    {exp.en}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
