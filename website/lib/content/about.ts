// About page content for TeddyFix website

export const aboutPage = {
  pageTitle: "About TeddyFix",
  pageSubtitle: "Built on experience. Driven by trust.",

  // Section 1: Spas Profile (LEAD)
  spas: {
    title: "Meet Spas",
    subtitle: "Lead Technician & Garage Owner",
    shortBio:
      "Spas Genchin brings over 20 years of experience as a lead technician, garage owner, and high-performance builder. Now based in Leiden, he leads TeddyFix with a sharp eye, skilled hands, and no tolerance for guesswork.",
    imageAlt: "Spas working under the hood of a high-performance vehicle.",

    // Tabbed credentials
    tabs: [
      {
        id: "experience",
        label: "Experience",
        icon: "wrench",
        content: {
          title: "20+ Years in Car Repair",
          points: [
            "Former garage owner in Bulgaria with full-service operations",
            "Specializes in complex diagnostics and engine rebuilds",
            "Handled everything from daily maintenance to full restorations",
            "Expert in European and Asian vehicle systems",
          ],
        },
      },
      {
        id: "forensics",
        label: "Forensic Expert",
        icon: "search",
        content: {
          title: "Certified Forensic Automotive Expert",
          points: [
            "Trained to detect manipulation, hidden damage, and fraud",
            "VIN verification and odometer rollback detection",
            "Pre-purchase inspections for high-risk vehicle reviews",
            "Trusted for insurance and legal automotive analysis",
          ],
        },
      },
      {
        id: "tuning",
        label: "Tuning & Builds",
        icon: "flag",
        content: {
          title: "High-Performance Specialist",
          points: [
            "Power tuning: intake, turbo, exhaust optimization",
            "Aesthetic tuning: body kits and detail modifications",
            "Custom builds for street and track performance",
            "Known for blending daily-driver comfort with race-ready power",
          ],
        },
      },
    ],
  },

  // Section 2: Teddy Ecosystem
  ecosystem: {
    title: "Part of the Teddyverse",
    subtitle: "A network of trusted services for families and businesses",
    body: `TeddyFix is backed by the same team that built Teddy Kids, TISA international school, and the Teddy Wood renovation projects.

What connects all of these? A deep commitment to clarity, trust, and getting things done right — the first time.

From childcare to classrooms to car care, we've always delivered high-performance service with a human heart.`,
    brands: [
      {
        name: "Teddy Kids",
        description: "Daycare & BSO programs",
        icon: "heart",
      },
      {
        name: "TISA",
        description: "International school",
        icon: "book",
      },
      {
        name: "Teddy Wood",
        description: "Renovation projects",
        icon: "hammer",
      },
      {
        name: "TeddyFix",
        description: "Auto repair & fleet services",
        icon: "wrench",
      },
    ],
  },

  // Section 3: Teddy Origin Story
  intro: {
    title: "We Know Cars — And We Know Service.",
    body: `TeddyFix isn't just a garage. It's the next evolution in a growing network of services that thousands of families and businesses already trust.

From Teddy Kids daycare to our BSO programs, TISA international school, Teddy Wood renovations, and now TeddyFix — we've always built where there's real need.

With a growing fleet of Teslas, Zoes, and school transport vans, it became clear: it was time to bring that same standard of speed, safety, and clarity to the road.

And when our long-time friend and expert mechanic Spas decided to move to the Netherlands — the match was perfect. TeddyFix was born.`,
    quote: {
      text: "We built this garage the way we've built everything in the Teddyverse — with care, trust, and zero shortcuts.",
      author: "TeddyFix Team",
    },
  },

  // Final CTA
  cta: {
    title: "We'd Love to Show You the Shop.",
    subtitle: "Stop by, grab a coffee, and let's talk cars.",
    buttons: [
      {
        label: "Book a Visit",
        href: "https://wa.me/31612345678",
      },
      {
        label: "See Our Services",
        href: "/services",
      },
    ],
  },
};

// SEO metadata for about page
export const aboutSeo = {
  title: "About TeddyFix – Meet Spas, Forensic Auto Expert",
  description:
    "TeddyFix is led by Spas Genchin, a certified forensic automotive expert with 20+ years experience. Pre-purchase inspections, tuning, and trusted repairs in Leiden.",
  keywords: [
    "TeddyFix team",
    "Spas Genchin",
    "forensic automotive expert",
    "pre-purchase car inspection",
    "auto mechanic Leiden",
    "car tuning specialist",
  ],
};
