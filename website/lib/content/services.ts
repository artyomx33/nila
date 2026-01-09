/**
 * NILA Estate Management - Services Content
 * Content-as-TypeScript pattern for all services
 */

export const services = {
  preventiveMaintenance: {
    id: "preventive-maintenance",
    slug: "mantenimiento-preventivo",
    name: {
      es: "Mantenimiento Preventivo",
      en: "Preventive Maintenance",
    },
    tagline: {
      es: "Preservamos el valor de cada propiedad con mantenimiento constante y monitoreo técnico especializado.",
      en: "We preserve the value of every property with constant maintenance and specialized technical monitoring.",
    },
    icon: "wrench",
    features: [
      {
        title: {
          es: "Inspecciones Periódicas",
          en: "Periodic Inspections",
        },
        items: [
          { es: "Revisión mensual de condición general", en: "Monthly review of general condition" },
          { es: "Estructura, carpintería, sellos, cerraduras", en: "Structure, carpentry, seals, locks" },
          { es: "Ventanas y mosquiteros", en: "Windows and mosquito screens" },
          { es: "Fugas, humedad, grietas", en: "Leaks, humidity, cracks" },
          { es: "Sistemas de acceso", en: "Access systems" },
        ],
      },
      {
        title: {
          es: "Sistemas Eléctricos",
          en: "Electrical Systems",
        },
        items: [
          { es: "Monitoreo de tableros de control", en: "Control panels monitoring" },
          { es: "Iluminación, ventiladores, lámparas, focos", en: "Lighting, fans, lamps, bulbs" },
          { es: "Inspección de electrodomésticos", en: "Appliances inspection" },
          { es: "Detección de falsos contactos y sobrecargas", en: "Detection of false contacts and overloads" },
        ],
      },
      {
        title: {
          es: "Sistemas Hidráulicos",
          en: "Hydraulic Systems",
        },
        items: [
          { es: "Pruebas de presión", en: "Pressure tests" },
          { es: "Detección de fugas", en: "Leak detection" },
          { es: "Control de sarro", en: "Limescale control" },
          { es: "Inspección de grifos, duchas, inodoros", en: "Faucet, shower, toilet inspection" },
          { es: "Limpieza de calentador, tinaco y cisterna", en: "Boiler, water tank, and cistern cleaning" },
        ],
      },
      {
        title: {
          es: "Aire Acondicionado",
          en: "Air Conditioning",
        },
        items: [
          { es: "Limpieza de filtros", en: "Filter cleaning" },
          { es: "Inspección de drenaje", en: "Drainage inspection" },
          { es: "Revisión de gas refrigerante", en: "Refrigerant gas review" },
          { es: "Mantenimiento preventivo", en: "Preventive maintenance" },
        ],
      },
      {
        title: {
          es: "Áreas Exteriores y Terrazas",
          en: "Exterior Areas and Terraces",
        },
        items: [
          { es: "Limpieza", en: "Cleaning" },
          { es: "Jardinería", en: "Gardening" },
          { es: "Mantenimiento de sistemas de riego", en: "Irrigation system maintenance" },
          { es: "Limpieza de canaletas y desagües pluviales", en: "Gutter and rainwater drain cleaning" },
          { es: "Control de plagas", en: "Pest control" },
        ],
      },
      {
        title: {
          es: "Conservación Estética",
          en: "Aesthetic Conservation",
        },
        items: [
          { es: "Pintura", en: "Painting" },
          { es: "Mantenimiento de muebles fijos", en: "Fixed furniture maintenance" },
          { es: "Mantenimiento de pisos según material", en: "Floor maintenance according to material" },
          { es: "Pulido y sellado", en: "Polishing and sealing" },
        ],
      },
      {
        title: {
          es: "Reportes y Gestión",
          en: "Reports and Management",
        },
        items: [
          { es: "Reportes mensuales con evidencia visual", en: "Monthly reports with visual evidence" },
          { es: "Seguimiento de incidencias", en: "Incident tracking" },
        ],
      },
      {
        title: {
          es: "Gestión de Pagos de Servicios",
          en: "Service Payment Management",
        },
        items: [
          { es: "Gestión de pagos de servicios como electricidad e internet", en: "Manage payments for services like electricity and internet" },
        ],
      },
    ],
    pricing: {
      currency: "MXN",
      period: { es: "mensual", en: "monthly" },
      tiers: [
        {
          name: { es: "1 Recámara", en: "1 Bedroom" },
          price: 1500,
        },
        {
          name: { es: "1 Recámara PH", en: "1 Bedroom PH" },
          price: 2250,
        },
        {
          name: { es: "2 Recámaras", en: "2 Bedrooms" },
          price: 3000,
        },
        {
          name: { es: "2 Recámaras PH", en: "2 Bedrooms PH" },
          price: 3750,
        },
        {
          name: { es: "3 Recámaras", en: "3 Bedrooms" },
          price: 4500,
        },
        {
          name: { es: "3 Recámaras PH", en: "3 Bedrooms PH" },
          price: 5250,
        },
      ],
      included: [
        { es: "Reportes mensuales", en: "Monthly reports" },
        { es: "Limpieza profunda trimestral", en: "Quarterly deep cleaning" },
        { es: "Mantenimiento de aire acondicionado", en: "Air conditioning maintenance" },
      ],
    },
  },
  vacationRental: {
    id: "vacation-rental",
    slug: "rentas-vacacionales",
    name: {
      es: "Administración de Rentas Vacacionales",
      en: "Vacation Rental Management",
    },
    tagline: {
      es: "Gestión integral de propiedades para renta vacacional y de largo plazo, optimizando ingresos y garantizando la mejor experiencia para huéspedes y propietarios.",
      en: "Comprehensive management of properties for vacation and long-term rental, optimizing income and ensuring the best experience for guests and owners.",
    },
    icon: "home",
    features: [
      {
        title: {
          es: "Optimización de Ocupación",
          en: "Occupancy Optimization",
        },
        items: [
          { es: "Control de reservaciones", en: "Reservation control" },
          { es: "Coordinación de mantenimiento", en: "Maintenance coordination" },
          { es: "Comunicación directa con huéspedes", en: "Direct communication with guests" },
        ],
      },
      {
        title: {
          es: "Servicio Third Home",
          en: "Third Home Service",
        },
        items: [
          { es: "Disfruta de propiedades de alto nivel en diferentes destinos mientras tu propiedad genera ingresos", en: "Allows you to enjoy high-level properties in different destinations while your property generates income" },
          { es: "Red exclusiva de intercambio", en: "Exclusive exchange network" },
        ],
      },
      {
        title: {
          es: "Reportes Mensuales",
          en: "Monthly Reports",
        },
        items: [
          { es: "Seguimiento de ingresos", en: "Income tracking" },
          { es: "Desglose de gastos", en: "Expense breakdown" },
          { es: "Métricas de desempeño de la propiedad", en: "Property performance metrics" },
        ],
      },
      {
        title: {
          es: "Limpieza",
          en: "Cleaning",
        },
        items: [
          { es: "Gestionada directamente con el huésped", en: "Managed directly with guest" },
          { es: "Incluye cambio y lavado de blancos", en: "Includes change and washing of linens" },
          { es: "Revisión de inventario", en: "Inventory review" },
          { es: "Reposición de amenidades", en: "Amenity replenishment" },
        ],
      },
      {
        title: {
          es: "Marketing",
          en: "Marketing",
        },
        items: [
          { es: "Promoción en plataformas", en: "Promotion on platforms" },
          { es: "Marketing en redes sociales", en: "Social media marketing" },
          { es: "Maximizar visibilidad y ocupación", en: "Maximize visibility and occupancy" },
        ],
      },
      {
        title: {
          es: "Fotografía Profesional",
          en: "Professional Photography",
        },
        items: [
          { es: "Sesiones de foto y video", en: "Photo and video sessions" },
          { es: "Optimizado para plataformas y redes sociales", en: "Optimized for platforms and social networks" },
        ],
      },
      {
        title: {
          es: "Concierge & Experiencias",
          en: "Concierge & Experiences",
        },
        items: [
          { es: "Atención personalizada", en: "Personalized attention" },
          { es: "Arreglos de transporte", en: "Transportation arrangements" },
          { es: "Reservaciones", en: "Reservations" },
          { es: "Tours", en: "Tours" },
          { es: "Servicios de bienestar", en: "Wellness services" },
          { es: "Experiencias únicas", en: "Unique experiences" },
        ],
      },
      {
        title: {
          es: "Tecnología",
          en: "Technology",
        },
        items: [
          { es: "Plataforma digital para seguimiento de reservaciones", en: "Digital platform for reservation tracking" },
          { es: "Monitoreo de ingresos y gastos", en: "Income and expense monitoring" },
          { es: "Seguimiento de mantenimiento", en: "Maintenance tracking" },
          { es: "Reportes en tiempo real", en: "Real-time reports" },
          { es: "Comunicación directa con propietarios y huéspedes", en: "Direct communication with owners and guests" },
          { es: "Smart Lock para control de acceso", en: "Smart Lock for access control" },
          { es: "Cámaras de seguridad", en: "Security cameras" },
        ],
      },
    ],
    pricing: {
      vacationRental: {
        fee: 25,
        feeType: { es: "% de ingresos brutos", en: "% of gross income" },
        included: [
          { es: "Garrafón de agua", en: "Water jug" },
          { es: "Kit de baño", en: "Bathroom kit" },
          { es: "Sal, pimienta, aceite de oliva", en: "Salt, pepper, olive oil" },
        ],
      },
      longTermRental: {
        annual: {
          fee: { es: "1 mes de renta + cuota de mantenimiento", en: "1 month's rent + maintenance fee" },
        },
        sixMonth: {
          fee: { es: "50% de un mes de renta", en: "50% of one month's rent" },
        },
        renewal: {
          fee: { es: "50% de un mes de renta", en: "50% of one month's rent" },
        },
      },
    },
  },
  interiorDesign: {
    id: "interior-design",
    slug: "diseno-interiores",
    name: {
      es: "Diseño de Interiores",
      en: "Interior Design",
    },
    tagline: {
      es: "Transformamos espacios para maximizar su atractivo y funcionalidad, elevando el valor de la propiedad mientras consideramos tu estilo, presupuesto y propósito.",
      en: "We transform spaces to maximize their attractiveness and functionality, elevating the property's value while considering your style, budget, and purpose.",
    },
    icon: "palette",
    philosophy: {
      es: "Cada proyecto se adapta a las necesidades reales del cliente, cuidando la funcionalidad, la estética y la rentabilidad del espacio.",
      en: "Each project adapts to the real needs of the client, caring for functionality, aesthetics, and space profitability.",
    },
    features: [
      {
        title: {
          es: "Consultoría Integral",
          en: "Comprehensive Consulting",
        },
        items: [
          { es: "Desarrollo de concepto", en: "Concept development" },
          { es: "Distribución de espacios", en: "Space distribution" },
          { es: "Decoración de interiores", en: "Interior decoration" },
        ],
      },
      {
        title: {
          es: "Selección de Mobiliario",
          en: "Furniture Selection",
        },
        items: [
          { es: "Curación de muebles", en: "Furniture curation" },
          { es: "Selección de telas", en: "Fabric selection" },
          { es: "Diseño de iluminación", en: "Lighting design" },
          { es: "Accesorios según uso y estilo deseado", en: "Accessories according to use and desired style" },
        ],
      },
      {
        title: {
          es: "Curación de Materiales",
          en: "Materials Curation",
        },
        items: [
          { es: "Materiales y acabados que combinan durabilidad y armonía visual", en: "Materials and finishes that combine durability and visual harmony" },
        ],
      },
      {
        title: {
          es: "Colaboración con Artesanos Locales",
          en: "Local Artisan Collaboration",
        },
        items: [
          { es: "Trabajo con artesanos y diseñadores locales", en: "Work with local artisans and designers" },
          { es: "Integración de piezas únicas que aportan identidad y autenticidad", en: "Integration of unique pieces that bring identity and authenticity" },
        ],
      },
      {
        title: {
          es: "Supervisión de Proyecto",
          en: "Project Supervision",
        },
        items: [
          { es: "Supervisión del proceso de compra", en: "Purchase process supervision" },
          { es: "Supervisión de ensamblaje", en: "Assembly oversight" },
          { es: "Entrega final", en: "Final delivery" },
        ],
      },
    ],
    pricing: {
      model: { es: "Cotización personalizada por proyecto", en: "Custom quote per project" },
    },
  },
  hoaMaintenance: {
    id: "hoa-maintenance",
    slug: "mantenimiento-desarrollos",
    name: {
      es: "Mantenimiento de Desarrollos / HOA",
      en: "HOA / Development Maintenance",
    },
    tagline: {
      es: "Supervisión y mantenimiento integral de áreas comunes en desarrollos y condominios, garantizando funcionamiento operativo óptimo, preservación del valor del proyecto y satisfacción de propietarios.",
      en: "Comprehensive supervision and maintenance of common areas in developments and condominiums, ensuring optimal operational functioning, preservation of project value, and owner satisfaction.",
    },
    icon: "building",
    features: [
      {
        title: {
          es: "Mantenimiento General",
          en: "General Maintenance",
        },
        items: [
          { es: "Inspección y mantenimiento preventivo/correctivo", en: "Inspection and preventive/corrective maintenance" },
          { es: "Sistemas eléctricos", en: "Electrical systems" },
          { es: "Sistemas hidráulicos", en: "Hydraulic systems" },
          { es: "Sistemas sanitarios", en: "Sanitary systems" },
          { es: "Equipos de bombeo", en: "Pumping equipment" },
          { es: "Piscinas", en: "Pools" },
          { es: "Equipos de presión", en: "Pressure equipment" },
          { es: "Tratamiento de agua", en: "Water treatment" },
          { es: "Áreas comunes", en: "Common areas" },
        ],
      },
      {
        title: {
          es: "Operación Técnica",
          en: "Technical Operation",
        },
        items: [
          { es: "Programación de rutinas", en: "Routine programming" },
          { es: "Bitácoras digitales", en: "Digital logs" },
          { es: "Reportes mensuales", en: "Monthly reports" },
          { es: "Seguimiento de incidencias", en: "Incident tracking" },
        ],
      },
      {
        title: {
          es: "Limpieza y Jardinería",
          en: "Cleaning and Gardening",
        },
        items: [
          { es: "Limpieza de áreas comunes", en: "Common area cleaning" },
          { es: "Mantenimiento de drenajes y canaletas", en: "Drainage and gutter maintenance" },
          { es: "Mantenimiento de jardines", en: "Garden maintenance" },
          { es: "Control fitosanitario", en: "Phytosanitary control" },
        ],
      },
      {
        title: {
          es: "Supervisión Operativa",
          en: "Operational Supervision",
        },
        items: [
          { es: "Control de proveedores externos", en: "External vendor control" },
          { es: "Evaluación de desempeño", en: "Performance evaluation" },
          { es: "Cumplimiento de contratos", en: "Contract compliance" },
        ],
      },
      {
        title: {
          es: "Administración y Control",
          en: "Administration and Control",
        },
        items: [
          { es: "Planificación de presupuestos", en: "Budget planning" },
          { es: "Gestión de gastos comunes", en: "Common expense management" },
          { es: "Control de inventarios", en: "Inventory control" },
          { es: "Reportes financieros", en: "Financial reports" },
          { es: "Gestión de pólizas de seguro", en: "Insurance policy management" },
        ],
      },
      {
        title: {
          es: "Seguridad y Normativas",
          en: "Security and Regulations",
        },
        items: [
          { es: "Supervisión de accesos", en: "Access supervision" },
          { es: "Monitoreo CCTV", en: "CCTV monitoring" },
          { es: "Cumplimiento de normas de seguridad", en: "Safety standards compliance" },
          { es: "Protocolos de protección civil", en: "Civil protection protocols" },
        ],
      },
    ],
    pricing: {
      model: { es: "Cotización personalizada por proyecto", en: "Custom quote per project" },
    },
  },
} as const;

export const servicesArray = [
  services.preventiveMaintenance,
  services.vacationRental,
  services.interiorDesign,
  services.hoaMaintenance,
] as const;
