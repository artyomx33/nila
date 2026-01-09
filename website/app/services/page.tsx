import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { servicesArray } from "@/lib/content/services";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | NILA Estate Management",
  description:
    "Comprehensive property management services in Riviera Maya: Preventive Maintenance, Vacation Rental Management, Interior Design, and HOA/Development Maintenance.",
};

// Icon mapping (same as ServicesOverview)
const iconMap: Record<string, React.ReactNode> = {
  wrench: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  home: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  palette: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  building: (
    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
};

export default function ServicesPage() {
  return (
    <main className="bg-charcoal-950">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-charcoal-900 to-charcoal-950">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl mb-6 text-charcoal-50">
              Comprehensive Property Management Solutions
            </h1>
            <p className="text-xl text-charcoal-400">
              From preventive maintenance to vacation rentals, we manage every aspect of your property with precision and care
            </p>
          </div>
        </Container>
      </section>

      {/* Services Detail Sections */}
      {servicesArray.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${index % 2 === 0 ? "bg-charcoal-950" : "bg-charcoal-900/50"}`}
        >
          <Container>
            <div className="max-w-5xl mx-auto">
              {/* Service Header */}
              <div className="mb-12">
                <div className="text-nila-500 mb-6">
                  {iconMap[service.icon]}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 text-charcoal-50">
                  {service.name.en}
                </h2>
                <p className="text-xl text-charcoal-400">
                  {service.tagline.en}
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {service.features.map((feature, idx) => (
                  <GlassCard key={idx}>
                    <h3 className="font-serif text-xl mb-3 text-nila-500">
                      {feature.title.en}
                    </h3>
                    <ul className="space-y-2">
                      {feature.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-charcoal-400 flex items-start">
                          <span className="text-nila-600 mr-2">•</span>
                          {item.en}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                ))}
              </div>

              {/* Pricing */}
              {service.pricing && (
                <GlassCard className="bg-nila-950/20 border-nila-800/30">
                  <h3 className="font-serif text-2xl mb-6 text-charcoal-50">
                    Pricing
                  </h3>

                  {/* Preventive Maintenance Pricing Table */}
                  {service.id === "preventive-maintenance" && "tiers" in service.pricing && (
                    <div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {service.pricing.tiers.map((tier, idx) => (
                          <div key={idx} className="text-center p-4 rounded bg-charcoal-900/50">
                            <div className="text-sm text-charcoal-400 mb-2">
                              {tier.name.en}
                            </div>
                            <div className="font-serif text-2xl text-nila-500">
                              ${tier.price.toLocaleString()}
                            </div>
                            <div className="text-xs text-charcoal-500 mt-1">
                              {service.pricing.currency}/{service.pricing.period.en}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-charcoal-800 pt-4">
                        <p className="text-sm text-charcoal-400 mb-2">Included:</p>
                        <ul className="space-y-1">
                          {service.pricing.included.map((item, idx) => (
                            <li key={idx} className="text-charcoal-400 text-sm flex items-center">
                              <span className="text-nila-600 mr-2">✓</span>
                              {item.en}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Vacation Rental Pricing */}
                  {service.id === "vacation-rental" && "vacationRental" in service.pricing && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-charcoal-50 mb-3">
                          Vacation Rental
                        </h4>
                        <div className="font-serif text-3xl text-nila-500 mb-2">
                          {service.pricing.vacationRental.fee}% {service.pricing.vacationRental.feeType.en}
                        </div>
                        <p className="text-sm text-charcoal-400 mb-3">
                          Included before each check-in:
                        </p>
                        <ul className="space-y-1">
                          {service.pricing.vacationRental.included.map((item, idx) => (
                            <li key={idx} className="text-charcoal-400 text-sm flex items-center">
                              <span className="text-nila-600 mr-2">✓</span>
                              {item.en}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t border-charcoal-800 pt-6">
                        <h4 className="text-lg font-medium text-charcoal-50 mb-3">
                          Long-Term Rental
                        </h4>
                        <div className="space-y-2 text-charcoal-400">
                          <p>• Annual contract: {service.pricing.longTermRental.annual.fee.en}</p>
                          <p>• 6-month contract: {service.pricing.longTermRental.sixMonth.fee.en}</p>
                          <p>• Contract renewal: {service.pricing.longTermRental.renewal.fee.en}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Quote Services */}
                  {("model" in service.pricing) && (
                    <div className="text-center">
                      <p className="text-xl text-charcoal-400 mb-6">
                        {service.pricing.model.en}
                      </p>
                      <Link href="/contact">
                        <Button className="bg-nila-600 hover:bg-nila-700 text-white">
                          Request a Quote
                        </Button>
                      </Link>
                    </div>
                  )}
                </GlassCard>
              )}

              {/* CTA */}
              <div className="text-center mt-8">
                <Link href="/contact">
                  <Button size="lg" className="bg-nila-600 hover:bg-nila-700 text-white">
                    Get Started with {service.name.en}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      ))}
    </main>
  );
}
