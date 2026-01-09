/**
 * schemas.ts
 * Comprehensive JSON-LD schema definitions for TeddyKids website
 * Implements Schema.org structured data for SEO, voice search, and AI optimization
 */

// Basic Schema.org types
export interface SchemaBase {
  '@context': 'https://schema.org';
  '@type': string | string[];
}

export interface PostalAddressSchema {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressCountry: string;
}

export interface GeoCoordinatesSchema {
  '@type': 'GeoCoordinates';
  latitude: string;
  longitude: string;
}

export interface ContactPointSchema {
  '@type': 'ContactPoint';
  contactType: string;
  telephone: string;
  email: string;
  availableLanguage?: string[];
}

export interface ImageObjectSchema {
  '@type': 'ImageObject';
  contentUrl: string;
  caption?: string;
  description?: string;
}

export interface PersonSchema extends SchemaBase {
  '@type': 'Person';
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  worksFor?: {
    '@type': 'Organization';
    name: string;
  };
}

export interface FAQItemSchema {
  '@type': 'Question';
  name: string;
  acceptedAnswer: {
    '@type': 'Answer';
    text: string;
  };
}

export interface OpeningHoursSchema {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
  validFrom?: string;
  validThrough?: string;
}

// Main schema types
export interface OrganizationSchema extends SchemaBase {
  '@type': string[] | string;
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  founders?: PersonSchema[];
  address?: PostalAddressSchema;
  contactPoint?: ContactPointSchema[];
  image?: string[];
  sameAs?: string[];
  priceRange?: string;
}

export interface LocalBusinessSchema extends SchemaBase {
  '@type': string[] | string;
  name: string;
  image?: string | string[];
  telephone?: string;
  priceRange?: string;
  address: PostalAddressSchema;
  geo?: GeoCoordinatesSchema;
  openingHoursSpecification?: OpeningHoursSchema[];
  hasMap?: string;
  parentOrganization?: {
    '@type': 'Organization';
    name: string;
  };
}

export interface ServiceSchema extends SchemaBase {
  '@type': 'Service';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization' | 'LocalBusiness';
    name: string;
  };
  serviceType: string;
  areaServed?: string | {
    '@type': 'Place';
    name: string;
  };
  audience?: {
    '@type': 'Audience';
    audienceType: string;
  };
  availableLanguage?: string[];
  image?: string;
  priceRange?: string;
}

export interface FAQPageSchema extends SchemaBase {
  '@type': 'FAQPage';
  mainEntity: FAQItemSchema[];
}

export interface BreadcrumbListSchema extends SchemaBase {
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }[];
}

export interface ImageGallerySchema extends SchemaBase {
  '@type': 'ImageGallery';
  name: string;
  image: ImageObjectSchema[];
}

// Helper functions to generate schemas

/**
 * Generate the main organization schema for TeddyKids
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'ChildCare', 'Organization'],
    name: 'Teddy Kids',
    alternateName: 'Teddy Kids Bilingual Daycare & Preschool',
    url: 'https://www.teddykids.nl',
    logo: 'https://www.teddykids.nl/images/logo.svg',
    foundingDate: '2004',
    description: 'Warm, trustworthy, and internationally inclusive bilingual daycare and early childhood learning in the Netherlands since 2004.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rijnsburgerweg 35',
      addressLocality: 'Leiden',
      postalCode: '2334 BE',
      addressCountry: 'NL'
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+31 71 870 05 05',
      email: 'info@teddykids.nl',
      availableLanguage: ['en', 'nl', 'de', 'fr']
    }],
    image: [
      'https://www.teddykids.nl/images/logos/teddy-kids-logo.png',
      'https://www.teddykids.nl/images/hero.jpg',
      'https://www.teddykids.nl/images/classroom.jpg'
    ],
    sameAs: [
      'https://www.facebook.com/teddykids',
      'https://www.instagram.com/teddykids.nl/'
    ],
    priceRange: '€€'
  };
}

/**
 * Generate LocalBusiness schema for a specific location
 */
export function generateLocationSchema(
  name: string,
  streetAddress: string,
  addressLocality: string,
  postalCode: string,
  telephone: string,
  latitude: string,
  longitude: string,
  imageUrl: string,
  mapUrl: string
): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ChildCare'],
    name: `Teddy Kids Bilingual Daycare – ${name}`,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Teddy Kids'
    },
    image: imageUrl,
    telephone: telephone,
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '18:30',
        validFrom: '2025-01-01',
        validThrough: '2025-12-31'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '00:00',
        closes: '00:00'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: streetAddress,
      addressLocality: addressLocality,
      postalCode: postalCode,
      addressCountry: 'NL'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: latitude,
      longitude: longitude
    },
    hasMap: mapUrl
  };
}

/**
 * Generate Person schema for team members
 */
export function generatePersonSchema(
  name: string,
  jobTitle: string,
  description?: string,
  image?: string,
  linkedinUrl?: string
): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    jobTitle: jobTitle,
    description: description,
    image: image,
    worksFor: {
      '@type': 'Organization',
      name: 'Teddy Kids'
    },
    sameAs: linkedinUrl ? [linkedinUrl] : undefined
  };
}

/**
 * Generate Service schema for programs
 */
export function generateServiceSchema(
  name: string,
  description: string,
  serviceType: string,
  audienceType: string,
  imageUrl?: string,
  languages: string[] = ['en', 'nl']
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Teddy Kids'
    },
    serviceType: serviceType,
    audience: {
      '@type': 'Audience',
      audienceType: audienceType
    },
    availableLanguage: languages,
    image: imageUrl
  };
}

/**
 * Generate FAQ schema from question-answer pairs
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate ImageGallery schema
 */
export function generateImageGallerySchema(
  name: string,
  images: { url: string; caption: string }[]
): ImageGallerySchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: name,
    image: images.map(img => ({
      '@type': 'ImageObject',
      contentUrl: img.url,
      caption: img.caption
    }))
  };
}

/**
 * Convert any schema to JSON string for use in script tags
 */
export function schemaToString(schema: SchemaBase): string {
  return JSON.stringify(schema, null, 2);
}

/**
 * Combine multiple schemas into a single script element
 */
export function combineSchemas(...schemas: SchemaBase[]): string {
  const scriptsArray = schemas.map(schema => 
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
  );
  return scriptsArray.join('\n');
}

// Predefined location schemas
export const LEIDEN_LOCATION = generateLocationSchema(
  'Rijnsburgerweg',
  'Rijnsburgerweg 35',
  'Leiden',
  '2334 BE',
  '+31 71 870 05 05',
  '52.1680',
  '4.4710',
  'https://www.teddykids.nl/images/locations/rbw.jpg',
  'https://goo.gl/maps/teddykidsLeiden'
);

export const VOORSCHOTEN_LOCATION = generateLocationSchema(
  'Leidseweg',
  'Leidseweg 555',
  'Voorschoten',
  '2251 LC',
  '+31 6 38687402', // Antonela's number
  '52.1234',
  '4.4321',
  'https://www.teddykids.nl/images/locations/lrz.jpg',
  'https://goo.gl/maps/teddykidsVoorschoten'
);

// Comprehensive FAQ items using Luna's optimized content for schema markup
export const COMMON_FAQS = [
  {
    question: 'What is bilingual daycare?',
    answer: 'At Teddy Kids, we speak English and Dutch in every group—children learn both languages naturally through daily play and interaction.'
  },
  {
    question: 'From what age can my child start?',
    answer: 'From 8 weeks old. We care for babies, toddlers and children up to 12 years in our after-school programs.'
  },
  {
    question: 'Is Teddy Kids suitable for expat families?',
    answer: 'Absolutely! We\'re international, communication is English-friendly, and we guide you through Dutch childcare systems.'
  },
  {
    question: 'What are your hours?',
    answer: 'Monday to Friday, 07:30–18:30.'
  },
  {
    question: 'Do you include meals?',
    answer: 'Yes—healthy snacks, warm lunches, and all dietary needs covered.'
  },
  {
    question: 'Why choose Teddy Kids for my child?',
    answer: 'Teddy Kids offers a unique combination of bilingual Tedducation™, experienced staff, and a warm, internationally inclusive environment. Since 2004, we\'ve nurtured thousands of children with our play-based approach.'
  },
  {
    question: 'Which languages are spoken at Teddy Kids?',
    answer: 'At Teddy Kids, we primarily speak English and Dutch in all our groups. Each group has at least one native English speaker and one native Dutch speaker.'
  },
  {
    question: 'How do I register my child at Teddy Kids?',
    answer: 'You can register online for free using the form on our Apply page. Once submitted, we\'ll contact you to discuss availability and next steps.'
  },
  {
    question: 'Are there any costs for registration?',
    answer: 'No, registration is completely free—there are no fees until you accept a placement offer and sign the contract.'
  },
  {
    question: 'How much is the childcare allowance in the Netherlands?',
    answer: 'In 2025, you can receive €286 to €409 per child every 3 months—depending on age and income. We help parents navigate the application.'
  }
];

// Example program services
export const NURSERY_SERVICE = generateServiceSchema(
  'Teddy Kids Nursery Program',
  'Nurturing bilingual care for babies and toddlers from 3 months to 2 years old in a warm, stimulating environment.',
  'Childcare',
  'Infants and Toddlers',
  'https://www.teddykids.nl/images/programs/nursery.jpg',
  ['en', 'nl']
);

NURSERY_SERVICE.priceRange = '€€';

export const PRESCHOOL_SERVICE = generateServiceSchema(
  'Teddy Kids Preschool Program',
  'Bilingual early learning program for children 2-4 years, preparing them for school with play-based activities.',
  'Preschool Education',
  'Preschool Children',
  'https://www.teddykids.nl/images/programs/preschool.jpg',
  ['en', 'nl']
);

PRESCHOOL_SERVICE.priceRange = '€€';

// Specific FAQ schemas for different page contexts
export const ENROLLMENT_FAQS = [
  {
    question: 'How do I register my child at Teddy Kids?',
    answer: 'You can register online for free using the form on our Apply page. Once submitted, we\'ll contact you to discuss availability and next steps.'
  },
  {
    question: 'What happens after I register?',
    answer: 'After receiving your application, we check availability and invite you for a tour if there\'s a match. You\'re always welcome to visit.'
  },
  {
    question: 'Is there a waiting list?',
    answer: 'Depending on your preferred days and group, we may place your child on a waiting list. As soon as a spot opens, we reach out.'
  },
  {
    question: 'Are there any costs for registration?',
    answer: 'No, registration is completely free—there are no fees until you accept a placement offer and sign the contract.'
  },
  {
    question: 'How much is the childcare allowance in the Netherlands?',
    answer: 'In 2025, you can receive €286 to €409 per child every 3 months—depending on age and income. We help parents navigate the application.'
  },
  {
    question: 'Can I cancel without a fee before signing the contract?',
    answer: 'Yes. There are no cancellation fees before a final placement offer and signed contract.'
  }
];

export const PROGRAMS_FAQS = [
  {
    question: 'How old are children at Teddy Kids?',
    answer: 'We welcome babies from 3 months up to preschoolers of 4 years in our daycare programs. Additionally, we offer after-school care (BSO) for children aged 4-12 years.'
  },
  {
    question: 'What does the Nursery program (0-2 years) include?',
    answer: 'Our Nursery program provides loving care in a gentle, sensory-rich environment. We follow each baby\'s individual feeding and sleeping schedule while introducing age-appropriate activities that support motor development.'
  },
  {
    question: 'What does the Preschool program (2-4 years) include?',
    answer: 'Our Preschool program builds independence, social skills, and early academic foundations through play-based learning. Children engage in art, music, storytelling, early math concepts, and outdoor exploration.'
  },
  {
    question: 'What activities are offered in the After-School Care (BSO)?',
    answer: 'Our After-School Care offers a balance of structured activities and free play time. Children can choose from sports, arts and crafts, cooking, science experiments, outdoor Teddventures™, and quiet spaces for homework.'
  },
  {
    question: 'What is the TISA program at Teddy Kids?',
    answer: 'The TISA (The International School Approach) program is our specialized English-focused curriculum that bridges to international primary education.'
  }
];

export const LOCATION_FAQS = [
  {
    question: 'Where are Teddy Kids locations?',
    answer: 'Teddy Kids has multiple locations in Leiden and Voorschoten. Our main centers include Rijnsburgerweg (RBW) and Leidseweg (LRZ).'
  },
  {
    question: 'What are the differences between your locations?',
    answer: 'While all locations follow our bilingual approach and quality standards, each has unique characteristics. RBW (Leiden) is our largest center with extensive outdoor space and proximity to the Bio Science Park.'
  },
  {
    question: 'What security measures are in place at Teddy Kids?',
    answer: 'Child safety is our top priority. Our facilities feature secure access systems with coded entry, CCTV monitoring of entrances, fully fenced outdoor areas, and strict pick-up authorization protocols.'
  },
  {
    question: 'What are the outdoor spaces like at Teddy Kids?',
    answer: 'Our outdoor spaces are designed as natural extensions of our learning environment. Each location features age-appropriate play equipment, gardening areas, sensory elements, and both sunny and shaded spaces.'
  },
  {
    question: 'Is there transportation between schools and Teddy Kids BSO?',
    answer: 'Yes, for our After-School Care program, we provide supervised transportation from partner schools to our BSO locations.'
  }
];

/**
 * Generate page-specific FAQ schema
 */
export function generatePageFAQSchema(page: string): FAQPageSchema {
  let faqs: { question: string; answer: string }[];

  switch (page) {
    case 'apply':
    case 'contact':
      faqs = ENROLLMENT_FAQS;
      break;
    case 'programs':
      faqs = PROGRAMS_FAQS;
      break;
    case 'locations':
      faqs = LOCATION_FAQS;
      break;
    default:
      faqs = COMMON_FAQS.slice(0, 8); // Limit to 8 for general pages
  }

  return generateFAQSchema(faqs);
}

/**
 * Generate BreadcrumbList schema from breadcrumb items
 */
export function generateBreadcrumbSchema(
  breadcrumbs: { name: string; href: string }[]
): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: index < breadcrumbs.length - 1 ? `https://www.teddykids.nl${breadcrumb.href}` : undefined
    }))
  };
}
