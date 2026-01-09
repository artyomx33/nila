/**
 * metadata.ts
 * Comprehensive metadata system for your website
 * Implements Next.js metadata API with bilingual support, OG tags, and SEO optimization
 *
 * CUSTOMIZE: Update BASE_URL, SITE_NAME, and DEFAULT_TITLE/DESCRIPTION for your project
 */

import { Metadata } from 'next';

// Supported languages
export type Language = 'en' | 'nl';

// Base URL for canonical links and OG images
// TODO: Update to your domain (e.g., https://www.your-domain.com)
export const BASE_URL = 'https://www.example.com';

// Default metadata values
export const DEFAULT_LOCALE = 'en';
export const SITE_NAME = 'New Website';
export const DEFAULT_TITLE = 'New Website | Welcome to Our Business';
export const DEFAULT_DESCRIPTION = 'Welcome to our website. Discover our services, mission, and how we can help you.';

// Keywords for each page (for SEO optimization)
export interface KeywordSet {
  primary: string[];
  secondary: string[];
  branded: string[];
}

// Metadata for each page in both languages
export interface PageMetadata {
  en: {
    title: string;
    description: string;
    keywords: KeywordSet;
    ogTitle?: string;
    ogDescription?: string;
    voiceSearch?: string[];
  };
  nl: {
    title: string;
    description: string;
    keywords: KeywordSet;
    ogTitle?: string;
    ogDescription?: string;
    voiceSearch?: string[];
  };
  ogImage?: string;
  structuredData?: string;
}

// Page metadata definitions
// CUSTOMIZE: Update these with your specific pages and keywords for your business
export const PAGE_METADATA: Record<string, PageMetadata> = {
  home: {
    en: {
      title: 'New Website | Welcome',
      description: 'Discover our services and learn how we can help you achieve your goals.',
      keywords: {
        primary: ['your service', 'your industry', 'your location'],
        secondary: ['related service', 'industry term', 'local service'],
        branded: ['your brand name', 'brand keyword']
      },
      voiceSearch: [
        'What services do you offer?',
        'How can I contact you?',
        'What are your hours?'
      ]
    },
    nl: {
      title: 'Nieuwe Website | Welkom',
      description: 'Ontdek onze diensten en hoe wij u kunnen helpen uw doelen te bereiken.',
      keywords: {
        primary: ['uw service', 'uw industrie', 'uw locatie'],
        secondary: ['gerelateerde service', 'industrie term', 'lokale service'],
        branded: ['uw merknaam', 'merk keyword']
      },
      voiceSearch: [
        'Welke diensten bieden jullie aan?',
        'Hoe kan ik contact opnemen?',
        'Wat zijn jullie openingstijden?'
      ]
    },
    ogImage: '/images/og/home-og.jpg'
  },
  about: {
    en: {
      title: 'About Us | Our Story & Team',
      description: 'Learn about our mission, values, and the team behind our success.',
      keywords: {
        primary: ['about company', 'company history', 'company values'],
        secondary: ['team members', 'company mission', 'our story'],
        branded: ['company name', 'brand story']
      }
    },
    nl: {
      title: 'Over Ons | Ons Verhaal & Team',
      description: 'Lees over onze missie, waarden en het team achter ons succes.',
      keywords: {
        primary: ['over bedrijf', 'bedrijfsgeschiedenis', 'bedrijfswaarden'],
        secondary: ['teamleden', 'bedrijfsmissie', 'ons verhaal'],
        branded: ['bedrijfsnaam', 'merk verhaal']
      }
    },
    ogImage: '/images/og/about-og.jpg'
  },
  services: {
    en: {
      title: 'Our Services | Solutions for Your Needs',
      description: 'Explore our range of professional services designed for you.',
      keywords: {
        primary: ['our services', 'service offerings', 'professional services'],
        secondary: ['service benefits', 'service features', 'service solutions'],
        branded: ['branded services', 'service name']
      }
    },
    nl: {
      title: 'Onze Diensten | Oplossingen voor Uw Behoeften',
      description: 'Ontdek ons aanbod van professionele diensten, speciaal voor u.',
      keywords: {
        primary: ['onze diensten', 'dienstenaanbod', 'professionele diensten'],
        secondary: ['voordelen van diensten', 'diensten kenmerken', 'diensten oplossingen'],
        branded: ['gemerkte diensten', 'dienstnaam']
      }
    },
    ogImage: '/images/og/services-og.jpg'
  },
  contact: {
    en: {
      title: 'Contact Us | Get in Touch',
      description: 'Have questions? We\'d love to hear from you. Contact us today.',
      keywords: {
        primary: ['contact us', 'get in touch', 'reach us'],
        secondary: ['contact form', 'phone number', 'email address'],
        branded: ['contact company', 'company contact']
      }
    },
    nl: {
      title: 'Neem Contact Op | Wij Horen Graag Van U',
      description: 'Vragen? Neem gerust contact met ons op. We helpen u graag verder.',
      keywords: {
        primary: ['neem contact op', 'contact opnemen', 'bereik ons'],
        secondary: ['contactformulier', 'telefoonnummer', 'e-mailadres'],
        branded: ['contact bedrijf', 'bedrijfscontact']
      }
    },
    ogImage: '/images/og/contact-og.jpg'
  }
};

/**
 * Helper function to get metadata for a specific page and language
 */
export function getPageMetadata(pageName: string, lang: Language = 'en'): PageMetadata[Language] {
  const pageData = PAGE_METADATA[pageName];
  if (!pageData) {
    return PAGE_METADATA.home[lang];
  }
  return pageData[lang];
}

/**
 * Generate hreflang links for bilingual support
 */
export function generateHreflangLinks(path: string): { rel: string; hrefLang: string; href: string }[] {
  // Strip query strings to avoid self-referencing hreflang errors
  const cleanPath = path.split('?')[0];
  return [
    {
      rel: 'alternate',
      hrefLang: 'en',
      href: `${BASE_URL}${cleanPath}`
    },
    {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: `${BASE_URL}${cleanPath}`
    }
  ];
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string, lang: Language = 'en'): string {
  if (lang === 'en') {
    return `${BASE_URL}${path}`;
  }
  return `${BASE_URL}/${lang}${path}`;
}

/**
 * Generate full metadata object for Next.js generateMetadata function
 */
export function generateMetadata(
  pageName: string,
  lang: Language = 'en',
  path: string,
  additionalMetadata: Partial<Metadata> = {}
): Metadata {
  // Normalise path (remove query strings) for canonical / OG consistency
  const cleanPath = path.split('?')[0];
  const pageData = getPageMetadata(pageName, lang);
  const ogImage = PAGE_METADATA[pageName]?.ogImage || '/images/og/default-og.jpg';
  
  const metadata: Metadata = {
    title: pageData.title,
    description: pageData.description,
    keywords: [
      ...pageData.keywords.primary,
      ...pageData.keywords.secondary,
      ...pageData.keywords.branded
    ],
    openGraph: {
      title: pageData.ogTitle || pageData.title,
      description: pageData.ogDescription || pageData.description,
      url: generateCanonicalUrl(cleanPath, lang),
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageData.title
        }
      ],
      locale: lang === 'en' ? 'en_US' : 'nl_NL',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.ogTitle || pageData.title,
      description: pageData.ogDescription || pageData.description,
      images: [ogImage]
    },
    alternates: {
      canonical: generateCanonicalUrl(cleanPath, lang),
      languages: {
        'en': `${BASE_URL}${cleanPath}`,
        'x-default': `${BASE_URL}${cleanPath}`
      }
    },
    other: {
      'google-site-verification': 'your-verification-code-here',
      'msvalidate.01': 'your-bing-verification-code-here'
    }
  };

  // Merge with any additional metadata
  return { ...metadata, ...additionalMetadata };
}

/**
 * Generate voice search optimized content
 * This helps with featured snippets and voice assistants
 */
export function getVoiceSearchContent(pageName: string, lang: Language = 'en'): string[] {
  const pageData = getPageMetadata(pageName, lang);
  return pageData.voiceSearch || [];
}

/**
 * Format keywords for meta tag
 */
export function formatKeywords(keywords: string[]): string {
  return keywords.join(', ');
}

/**
 * Generate schema.org JSON-LD script element
 */
export function generateSchemaScript(schema: object): string {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

/**
 * ---------------------------------------------------------------------------
 *  generatePageMetadata
 *  Lightweight helper for App-Router `generateMetadata()` functions.
 *  ‑ Provides:
 *    • Bilingual title / description fallbacks
 *    • Optional hreflang <link> generation
 *    • OG / Twitter defaults
 *  ‑ Usage example:
 *      export async function generateMetadata() {
 *        return generatePageMetadata('apply', { hreflang: true });
 *      }
 * ---------------------------------------------------------------------------
 */
export function generatePageMetadata(
  pageName: string,
  options: {
    titleEn?: string;
    titleNl?: string;
    descriptionEn?: string;
    descriptionNl?: string;
    keywordsEn?: string;
    keywordsNl?: string;
    hreflang?: boolean;
    ogImage?: string;
  } = {}
): Metadata {
  const path = pageName === 'home' ? '/' : `/${pageName}`;

  // Fallback to pre-defined metadata blocks
  const fallbackEn = PAGE_METADATA[pageName]?.en || PAGE_METADATA.home.en;

  const ogImg = options.ogImage ||
    PAGE_METADATA[pageName]?.ogImage ||
    '/images/og/default-og.jpg';

  const baseTitleEn = options.titleEn || fallbackEn.title;
  const baseDescEn = options.descriptionEn || fallbackEn.description;

  const baseKeywordsEn =
    options.keywordsEn ||
    [...fallbackEn.keywords.primary, ...fallbackEn.keywords.secondary].join(', ');

  const meta: Metadata = {
    title: baseTitleEn,
    description: baseDescEn,
    keywords: baseKeywordsEn,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: baseTitleEn,
      description: baseDescEn,
      url: `${BASE_URL}${path}`,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: baseTitleEn
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitleEn,
      description: baseDescEn,
      images: [ogImg]
    },
    robots: {
      index: true,
      follow: true
    }
  };

  // Inject hreflang links when requested
  if (options.hreflang) {
    meta.alternates = {
      canonical: path,
      languages: {
        en: path,
        'x-default': path
      }
    };
  }

  return meta;
}
