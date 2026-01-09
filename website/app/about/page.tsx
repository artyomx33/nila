import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { brand } from "@/lib/content/brand";
import { founders } from "@/lib/content/founders";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | NILA Estate Management",
  description:
    "Meet the founders behind NILA Estate Management. Combining luxury hospitality expertise with real estate investment knowledge in Riviera Maya.",
};

export default function AboutPage() {
  return (
    <main className="bg-charcoal-950">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-charcoal-900 to-charcoal-950">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal-50">
              Our Story
            </h1>
            <p className="text-xl text-charcoal-400">
              {brand.tagline.en}
            </p>
          </div>
        </Container>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-charcoal-950">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              {brand.story.en.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-charcoal-400 mb-6 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-charcoal-900/50">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <GlassCard>
              <h2 className="font-serif text-3xl mb-4 text-nila-500">Our Mission</h2>
              <p className="text-charcoal-400 leading-relaxed">
                {brand.mission.en}
              </p>
            </GlassCard>
            <GlassCard>
              <h2 className="font-serif text-3xl mb-4 text-nila-500">Our Vision</h2>
              <p className="text-charcoal-400 leading-relaxed">
                {brand.vision.en}
              </p>
            </GlassCard>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-charcoal-950">
        <Container>
          <h2 className="font-serif text-4xl md:text-5xl mb-12 text-center text-charcoal-50">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {brand.values.map((value, idx) => (
              <GlassCard key={idx} className="text-center">
                <div className="w-12 h-12 rounded-full bg-nila-600/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 rounded-full bg-nila-600" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-charcoal-50">
                  {value.title.en}
                </h3>
                <p className="text-charcoal-400 text-sm">
                  {value.description.en}
                </p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-charcoal-900/50">
        <Container>
          <h2 className="font-serif text-4xl md:text-5xl mb-12 text-center text-charcoal-50">
            Meet Our Founders
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {founders.map((founder, idx) => (
              <GlassCard key={idx}>
                {/* Founder Photo Placeholder */}
                <div className="w-48 h-48 rounded-full bg-charcoal-800 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                  <span className="text-charcoal-600 text-sm text-center px-4">
                    {founder.name}
                    <br />
                    Photo
                  </span>
                </div>

                <div className="text-center mb-6">
                  <h3 className="font-serif text-3xl mb-2 text-charcoal-50">
                    {founder.name}
                  </h3>
                  <p className="text-nila-500 mb-3">{founder.role.en}</p>
                  <a
                    href={`tel:${founder.phone}`}
                    className="inline-flex items-center gap-2 text-charcoal-400 hover:text-nila-500 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {founder.phone}
                  </a>
                </div>

                <div className="mb-6">
                  {founder.bio.en.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-charcoal-400 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div>
                  <h4 className="font-serif text-lg mb-3 text-nila-500">Expertise</h4>
                  <ul className="space-y-2">
                    {founder.expertise.map((exp, expIdx) => (
                      <li key={expIdx} className="text-charcoal-400 flex items-start text-sm">
                        <span className="text-nila-600 mr-2">•</span>
                        {exp.en}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal-950">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-charcoal-50">
              Ready to Work with Us?
            </h2>
            <p className="text-xl text-charcoal-400 mb-8">
              Let&apos;s discuss how we can help you optimize and manage your property with precision
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-nila-600 hover:bg-nila-700 text-white">
                Get in Touch
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
