"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HomeCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-charcoal-900 to-charcoal-950">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal-50">
            Ready to Optimize Your Property?
          </h2>
          <p className="text-xl text-charcoal-400 mb-8">
            Let&apos;s discuss how NILA can elevate your property management with precision and excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-nila-600 hover:bg-nila-700 text-white">
                Schedule a Consultation
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-nila-600 text-nila-500 hover:bg-nila-600/10">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
