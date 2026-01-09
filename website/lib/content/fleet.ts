// Fleet & Taxi page content for TeddyFix website

export const fleetPage = {
  pageTitle: "Fleet & Taxi Services",
  pageSubtitle: "Reliable service for the drivers who move the city.",

  hero: {
    title: "Keep Your Fleet Moving. We'll Handle the Rest.",
    subtitle:
      "Time off the road means money lost. TeddyFix is built to deliver fast, trusted repairs and maintenance for taxi drivers, fleet owners, and company cars — with full focus on uptime, fairness, and speed.",
    cta: {
      label: "Request Fleet Pricing",
      href: "https://wa.me/31612345678",
    },
  },

  benefits: {
    title: "Why Taxi Fleets Choose TeddyFix",
    list: [
      "Same-day service — skip the line for our fleet clients",
      "Discounted service bundles for teams of 3+ vehicles",
      "Repairs done once, and done right — no comebacks",
      "Direct WhatsApp line with mechanics (no hold music)",
      "Free diagnostics with every service contract",
      "Real-time updates: pickup, ready-time, parts status",
    ],
  },

  partnership: {
    title: "Trusted by the Best",
    body: `We've proudly worked with Brahim & Mo from Taxi X-Cellent for over 10 years.
They've transported hundreds of children from Teddy Kids to school and back — and now, they trust TeddyFix to keep their vehicles running strong. That's a partnership built on precision, care, and time-tested reliability.`,
    highlight: "10+ years of partnership",
    imageAlt: "Taxi X-Cellent van parked in front of TeddyFix",
  },

  services: {
    title: "What We Offer Fleets",
    list: [
      {
        icon: "wrench",
        text: "Maintenance: Brakes, suspension, bulbs, fluids, and drivetrain",
      },
      {
        icon: "search",
        text: "Diagnostics: We catch issues early so you're never off schedule",
      },
      {
        icon: "sparkle",
        text: "Detailing: Clean exterior = better ratings, better tips",
      },
      {
        icon: "car",
        text: "Multi-car pickup options available",
      },
      {
        icon: "clipboard",
        text: "Maintenance contracts with fixed monthly rates",
      },
      {
        icon: "clock",
        text: "Prioritized scheduling during weekday slow hours",
      },
    ],
  },

  pricing: {
    title: "Fleet Packages Available",
    plans: [
      {
        label: "Lite Fleet",
        subtitle: "3–5 vehicles",
        perks: [
          "10% service discount",
          "Free pickup/drop-off in Leiden",
          "Group diagnostics 1x / month",
        ],
      },
      {
        label: "Pro Fleet",
        subtitle: "6–15 vehicles",
        featured: true,
        perks: [
          "15% service discount",
          "Same-day guaranteed repair window",
          "Priority queue access 5 days/week",
          "Custom WhatsApp channel for driver support",
        ],
      },
      {
        label: "Partner Fleet",
        subtitle: "15+ vehicles",
        perks: [
          "Custom pricing",
          "Embedded mechanic availability",
          "Maintenance rotation scheduling",
          "Priority repair access, always",
        ],
      },
    ],
    cta: {
      label: "Let's Discuss a Fleet Plan",
      href: "https://wa.me/31612345678",
    },
  },

  finalCta: {
    title: "Your Drivers Deserve the Best",
    subtitle:
      "Let's build a simple, fast, and fair partnership to keep your fleet on the move.",
    buttons: [
      {
        label: "Message TeddyFix Now",
        href: "https://wa.me/31612345678",
      },
      {
        label: "Call the Garage",
        href: "tel:+31612345678",
      },
    ],
  },
};

// SEO metadata for fleet page
export const fleetSeo = {
  title: "Taxi & Fleet Vehicle Repair – TeddyFix",
  description:
    "Leiden's fastest, most trusted garage for taxi maintenance and fleet vehicle repair. Trusted by Taxi X-Cellent. Priority scheduling, fixed pricing, pro diagnostics.",
  keywords: [
    "taxi maintenance Leiden",
    "fleet repair Netherlands",
    "TeddyFix fleet services",
    "garage for taxi drivers",
    "fast car repair for taxis",
  ],
};
