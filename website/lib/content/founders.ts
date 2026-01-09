/**
 * NILA Estate Management - Founders Content
 * Content-as-TypeScript pattern for founder profiles
 */

export const founders = [
  {
    name: "Bernadette Gonnet",
    role: {
      es: "Co-Fundadora",
      en: "Co-Founder",
    },
    phone: "+52 984 185 1505",
    image: "/images/founders/bernadette-gonnet.jpg",
    bio: {
      es: `Bernadette aporta más de 20 años de experiencia en hospitalidad de lujo con Four Seasons y The Ritz-Carlton, siendo especialista en operaciones de servicio premium, estándares de calidad y gestión meticulosa orientada al detalle.

Hace 8 años fundó Haus Real Estate, posicionándola como agencia boutique de referencia en la Riviera Maya, con enfoque en inversión estratégica, mercados emergentes y activos de alto valor.

Su experiencia incluye operaciones de hospitalidad de lujo, estándares de servicio premium, control de calidad, estrategia de inversión, y anticipación de tendencias de mercado para máxima rentabilidad y apreciación.

Combina una visión comercial aguda con la disciplina operativa heredada de la hospitalidad de lujo. Su profundo entendimiento de los inversionistas inyecta precisión estratégica y una cultura de excelencia en NILA, asegurando que cada activo se gestione bajo los más rigurosos estándares internacionales de hospitalidad.`,
      en: `Bernadette brings over 20 years of experience in luxury hospitality with Four Seasons and The Ritz-Carlton, specializing in premium service operations, quality standards, and meticulous detail-oriented management.

8 years ago, she founded Haus Real Estate, establishing it as a boutique reference agency in the Riviera Maya, with a focus on strategic investment, emerging markets, and high-value assets.

Her expertise includes luxury hospitality operations, premium service standards, quality control and detail-oriented management, investment strategy, and market trend anticipation for maximum profitability and appreciation.

She combines sharp commercial vision with operational discipline inherited from luxury hospitality. Her deep understanding of investors injects strategic precision and a culture of excellence into NILA, ensuring every asset is managed under the most rigorous international hospitality standards.`,
    },
    expertise: [
      {
        es: "Operaciones de hospitalidad de lujo",
        en: "Luxury hospitality operations",
      },
      {
        es: "Estándares de servicio premium",
        en: "Premium service standards",
      },
      {
        es: "Control de calidad y gestión orientada al detalle",
        en: "Quality control and detail-oriented management",
      },
      {
        es: "Estrategia de inversión",
        en: "Investment strategy",
      },
      {
        es: "Anticipación de tendencias de mercado",
        en: "Market trend anticipation",
      },
      {
        es: "Psicología y necesidades del inversionista",
        en: "Investor psychology and needs",
      },
    ],
  },
  {
    name: "Juan Francisco Caparrós",
    role: {
      es: "Co-Fundador",
      en: "Co-Founder",
    },
    phone: "+52 984 276 4317",
    image: "/images/founders/juan-francisco-caparros.jpg",
    bio: {
      es: `Juan Francisco cuenta con más de 5 años de impacto en la Riviera Maya, siendo experto en inversión y desarrollo inmobiliario con un historial notable en estructuración, administración y optimización de activos de alto valor.

Comenzó como Coordinador Comercial en Caribe Abita Desarrollos (creadores de proyectos ATTHA), fue Asesor de Inversiones en Tulum Land & Property especializándose en crecimiento estratégico y fortalecimiento de portafolios de inversión, y actualmente dirige la expansión comercial y desarrollo de negocios en NAM Tulum.

Gestiona exitosamente propiedades residenciales y Asociaciones de Propietarios (HOAs), con experiencia en estructuración de inversiones, administración y optimización de propiedades, desarrollo inmobiliario, crecimiento estratégico, gestión de portafolios, gestión de HOAs e implementación de procesos técnicos rigurosos y gestión operativa de élite.`,
      en: `Juan Francisco has over 5 years of impact in the Riviera Maya, being an expert in investment and real estate development with a notable track record in structuring, administration, and optimization of high-value assets.

He started as Commercial Coordinator at Caribe Abita Desarrollos (creators of ATTHA projects), was an Investment Advisor at Tulum Land & Property specializing in strategic growth and investment portfolio strengthening, and currently directs commercial expansion and business development at NAM Tulum.

He successfully manages residential properties and Homeowners Associations (HOAs), with expertise in investment structuring, property administration and optimization, real estate development, strategic growth, portfolio management, HOA management, and implementation of rigorous technical and elite operational management processes.`,
    },
    expertise: [
      {
        es: "Estructuración de inversiones",
        en: "Investment structuring",
      },
      {
        es: "Administración y optimización de propiedades",
        en: "Property administration and optimization",
      },
      {
        es: "Desarrollo inmobiliario",
        en: "Real estate development",
      },
      {
        es: "Crecimiento estratégico",
        en: "Strategic growth",
      },
      {
        es: "Gestión de portafolios",
        en: "Portfolio management",
      },
      {
        es: "Gestión de HOAs",
        en: "HOA management",
      },
    ],
  },
] as const;
