"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-charcoal-900 to-charcoal-950">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero-bacalar.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/80 via-charcoal-950/60 to-charcoal-950" />

      <Container className="relative z-10 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 text-charcoal-50">
          El arte de operar
          <br />
          <span className="text-nila-500">con precisión</span>
        </h1>

        <p className="text-xl md:text-2xl text-charcoal-300 mb-8 max-w-3xl mx-auto">
          Premium property management in Mexico&apos;s most exceptional destinations
        </p>

        <p className="text-lg text-charcoal-400 mb-12 max-w-2xl mx-auto">
          From Four Seasons & Ritz-Carlton to your Riviera Maya investment
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services">
            <Button size="lg" className="bg-nila-600 hover:bg-nila-700 text-white">
              Explore Our Services
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-nila-600 text-nila-500 hover:bg-nila-600/10">
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
