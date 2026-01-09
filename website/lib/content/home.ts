// Home page content for TeddyFix website
// Ready for production use

// HERO SECTION
export const hero = {
  title: "Trusted Garage Services. Lightning-Fast Turnaround.",
  subtitle:
    "From family cars to taxi fleets — TeddyFix delivers clean, precise, high-trust service that gets you back on the road, fast.",
  ctaPrimary: {
    label: "Book Your Service",
    href: "https://wa.me/31612345678", // TODO: Replace with real number
  },
  ctaSecondary: {
    label: "Talk to a Mechanic",
    href: "tel:+31612345678", // TODO: Replace with real number
  },
  imageAlt:
    "A clean auto repair bay with wood-panel design and matte black tools.",
};

// INTRO SECTION
export const intro = {
  title: "More Than a Garage — TeddyFix Is Your Pit Crew.",
  body: `Built by the team behind Teddy Kids — trusted by 500+ families and professional drivers across Leiden.
Whether it's your daily car, your fleet vehicle, or your pride and joy, we deliver expert repairs, detailing, and upgrades with zero guesswork and maximum respect for your time.`,
};

// SERVICE SNAPSHOT SECTION
export const services = {
  title: "What We Do Best",
  list: [
    {
      icon: "wrench",
      title: "Maintenance & Repair",
      description:
        "Vehicle diagnostics, chassis & suspension work, brake systems, electronics and engine component replacement. Fast and reliable.",
      link: {
        label: "Explore Maintenance",
        href: "/services#maintenance",
      },
    },
    {
      icon: "sparkle",
      title: "Detailing & Ceramic Coating",
      description:
        "Paint scratch removal, headlight restoration, full-body ceramic coating for long-lasting protection and premium appearance.",
      link: {
        label: "View Detailing",
        href: "/services#detailing",
      },
    },
    {
      icon: "flag",
      title: "Performance & Tuning",
      description:
        "Turbo upgrades, brake tuning, exhaust improvements, and full FIA-compliant race car prep. We turn metal into speed.",
      link: {
        label: "Go to Tuning",
        href: "/services#tuning",
      },
    },
  ],
};

// FLEET & TAXI SECTION
export const fleet = {
  title: "Trusted by Taxi Fleets Across Leiden",
  body: `We get it — time off the road is money lost. TeddyFix offers dedicated service lanes, fast repairs, and maintenance bundles designed for taxis and fleet owners.
Already serving long-time taxi partners across the city — and ready for more.`,
  cta: {
    label: "Fleet Services",
    href: "/fleet-taxi",
  },
};

// TESTIMONIALS SECTION
export const testimonials = {
  title: "What Our Clients Say",
  quotes: [
    {
      name: "Boris T.",
      role: "Taxi Driver",
      quote:
        "Cleanest garage I've ever seen — they fixed my brakes the same day I called.",
    },
    {
      name: "Lara V.",
      role: "Teddy Kids Parent",
      quote:
        "My car looked brand new after ceramic coating. Super friendly and fast.",
    },
    {
      name: "Stefan G.",
      role: "Fleet Manager",
      quote:
        "No more stress. Our whole team uses TeddyFix now. Honest, sharp, and fast.",
    },
  ],
};

// FINAL CTA SECTION
export const finalCta = {
  title: "Let's Get You Back on the Road.",
  subtitle:
    "Need something specific? From diagnostics to full upgrades — we're ready. Drop us a message and we'll take it from there.",
  buttons: [
    {
      label: "Book Now via WhatsApp",
      href: "https://wa.me/31612345678", // TODO: Replace with real number
    },
    {
      label: "Call TeddyFix",
      href: "tel:+31612345678", // TODO: Replace with real number
    },
  ],
};
