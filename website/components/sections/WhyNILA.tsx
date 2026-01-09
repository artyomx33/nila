"use client";

import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { brand } from "@/lib/content/brand";

export function WhyNILA() {
  return (
    <section className="py-24 bg-gradient-to-b from-charcoal-950 to-charcoal-900">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal-50">
            Why Choose NILA
          </h2>
          <p className="text-xl text-charcoal-400 max-w-3xl mx-auto">
            {brand.tagline.en}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {brand.usps.slice(0, 3).map((usp, index) => (
            <GlassCard key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-nila-600/20 flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 rounded-full bg-nila-600" />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-charcoal-50">
                {usp.title.en}
              </h3>
              <p className="text-charcoal-400">
                {usp.description.en}
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-center">
            <blockquote className="font-serif text-2xl md:text-3xl text-nila-500 mb-4">
              &quot;Our excellence is a system: the same level of service, in any property, with any team, and at any time&quot;
            </blockquote>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}
