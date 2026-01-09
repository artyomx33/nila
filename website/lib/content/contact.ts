// Contact page content for TeddyFix website

export const contactPage = {
  pageTitle: "Contact TeddyFix",
  pageSubtitle: "Let's get your car back on the road — fast.",

  infoBlock: {
    addressLabel: "Visit Us",
    address: "Energieweg 41C, Zoeterwoude, Netherlands",
    phoneLabel: "Call or WhatsApp",
    phone: "+31 123 456 789",
    phoneHref: "tel:+31123456789",
    whatsappHref: "https://wa.me/31123456789",
    emailLabel: "Email",
    email: "spas@teddyfix.nl",
    emailHref: "mailto:spas@teddyfix.nl",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.6936400218784!2d4.517354315670835!3d52.12747877192733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5c72201ec0c59%3A0x965b5017601bd938!2sEnergieweg%2041c%2C%202387%20AB%20Zoeterwoude!5e0!3m2!1sen!2snl!4v1661543885634!5m2!1sen!2snl",
  },

  hours: {
    title: "Opening Hours",
    schedule: [
      { day: "Morning Shift", time: "6:00 – 14:00" },
      { day: "Evening Shift", time: "19:00 – 22:00" },
    ],
    note: "Flexible hours for fleet clients — contact us for priority scheduling.",
  },

  quickContact: {
    title: "Quick Contact",
    whatsappCta: {
      label: "WhatsApp Us Now",
      href: "https://wa.me/31123456789",
      description: "Fastest way to reach us",
    },
    photoCta: {
      label: "Send a Photo for Quick Quote",
      description:
        "Send a pic via WhatsApp for instant issue assessment, price estimate, and time quote.",
    },
  },

  formBlock: {
    title: "Send Us a Message",
    subtitle:
      "Prefer email? Questions about a specific issue? Use the form below and we'll reply ASAP.",
    fields: {
      name: "Your Name",
      email: "Your Email",
      phone: "Phone (optional)",
      message: "What can we help you with?",
    },
    submitLabel: "Send Message",
    successMessage: "Thanks! We'll get back to you shortly.",
  },

  teddyverseBlock: {
    title: "Part of the Teddy Network",
    subtitle:
      "We're proud to be part of a trusted family of services in Leiden & Zoeterwoude.",
    brands: [
      {
        label: "Teddy Kids",
        href: "https://teddykids.nl",
        icon: "heart",
      },
      {
        label: "Teddy BSO",
        href: "https://teddykids.nl/bso",
        icon: "backpack",
      },
      {
        label: "TISA Primary",
        href: "https://tisaschool.nl",
        icon: "school",
      },
      {
        label: "Teddy Wood",
        href: "#",
        icon: "hammer",
      },
    ],
  },
};

// SEO metadata for contact page
export const contactSeo = {
  title: "Contact TeddyFix – Visit Our Garage in Zoeterwoude",
  description:
    "Contact TeddyFix for fast auto repair, fleet maintenance, and premium car services. Visit us at Energieweg 41C, Zoeterwoude or WhatsApp for quick quotes.",
  keywords: [
    "TeddyFix contact",
    "auto garage Zoeterwoude",
    "car repair Leiden",
    "WhatsApp mechanic",
    "fleet service contact",
  ],
};
