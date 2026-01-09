/**
 * alt-text.ts
 * Comprehensive bilingual alt-text system for your website
 * Provides helpers for writing accessible, SEO-friendly image descriptions
 */

import { Language } from '@/lib/seo/metadata';

// Basic interface for bilingual text
export interface BilingualText {
  en: string;
  nl: string;
}

// Interface for alt-text with both languages
export interface AltText extends BilingualText {
  id?: string;
  category?: string;
}

// Age group constants
export const AGE_GROUPS = {
  BABY: {
    en: 'Baby',
    nl: 'Baby'
  },
  INFANT: {
    en: 'Infant',
    nl: 'Zuigeling'
  },
  TODDLER: {
    en: 'Toddler',
    nl: 'Dreumes'
  },
  PRESCHOOLER: {
    en: 'Preschooler',
    nl: 'Peuter'
  },
  CHILD: {
    en: 'Child',
    nl: 'Kind'
  },
  SCHOOL_AGE: {
    en: 'School-age child',
    nl: 'Schoolgaand kind'
  },
  CHILDREN: {
    en: 'Children',
    nl: 'Kinderen'
  },
  MIXED_GROUP: {
    en: 'Group of children',
    nl: 'Groep kinderen'
  }
};

// Activity constants
export const ACTIVITIES = {
  PLAYING: {
    en: 'playing',
    nl: 'spelend'
  },
  READING: {
    en: 'reading',
    nl: 'lezend'
  },
  PAINTING: {
    en: 'painting',
    nl: 'schilderend'
  },
  DRAWING: {
    en: 'drawing',
    nl: 'tekenend'
  },
  BUILDING: {
    en: 'building with blocks',
    nl: 'bouwend met blokken'
  },
  SINGING: {
    en: 'singing',
    nl: 'zingend'
  },
  DANCING: {
    en: 'dancing',
    nl: 'dansend'
  },
  EATING: {
    en: 'eating',
    nl: 'etend'
  },
  SLEEPING: {
    en: 'sleeping',
    nl: 'slapend'
  },
  LEARNING: {
    en: 'learning',
    nl: 'lerend'
  },
  EXPLORING: {
    en: 'exploring',
    nl: 'ontdekkend'
  },
  GARDENING: {
    en: 'gardening',
    nl: 'tuinierend'
  },
  INTERACTING: {
    en: 'interacting with teacher',
    nl: 'in interactie met leerkracht'
  },
  SHARING: {
    en: 'sharing toys',
    nl: 'speelgoed delend'
  }
};

// Location constants
export const LOCATIONS = {
  RBW: {
    en: 'at Rijnsburgerweg location',
    nl: 'op locatie Rijnsburgerweg'
  },
  LRZ: {
    en: 'at Leidseweg location',
    nl: 'op locatie Leidseweg'
  },
  ZML: {
    en: 'at Zeemanlaan location',
    nl: 'op locatie Zeemanlaan'
  },
  LEIDEN: {
    en: 'in Leiden',
    nl: 'in Leiden'
  },
  VOORSCHOTEN: {
    en: 'in Voorschoten',
    nl: 'in Voorschoten'
  },
  CLASSROOM: {
    en: 'in the classroom',
    nl: 'in het klaslokaal'
  },
  PLAYGROUND: {
    en: 'on the playground',
    nl: 'op de speelplaats'
  },
  GARDEN: {
    en: 'in the garden',
    nl: 'in de tuin'
  },
  INDOOR: {
    en: 'indoors',
    nl: 'binnen'
  },
  OUTDOOR: {
    en: 'outdoors',
    nl: 'buiten'
  }
};

// Emotion constants
export const EMOTIONS = {
  HAPPY: {
    en: 'with a happy expression',
    nl: 'met een blije uitdrukking'
  },
  JOYFUL: {
    en: 'looking joyful',
    nl: 'er vrolijk uitziend'
  },
  CURIOUS: {
    en: 'with curious eyes',
    nl: 'met nieuwsgierige ogen'
  },
  FOCUSED: {
    en: 'deeply focused',
    nl: 'diep geconcentreerd'
  },
  EXCITED: {
    en: 'showing excitement',
    nl: 'enthousiasme tonend'
  },
  PEACEFUL: {
    en: 'peaceful and calm',
    nl: 'vredig en rustig'
  },
  PROUD: {
    en: 'looking proud',
    nl: 'er trots uitziend'
  },
  PLAYFUL: {
    en: 'in a playful mood',
    nl: 'in een speelse bui'
  },
  ENGAGED: {
    en: 'fully engaged',
    nl: 'volledig betrokken'
  }
};

// Lighting and atmosphere constants
export const ATMOSPHERE = {
  NATURAL_LIGHT: {
    en: 'in natural light',
    nl: 'in natuurlijk licht'
  },
  WARM_TONES: {
    en: 'with warm tones',
    nl: 'met warme tinten'
  },
  BRIGHT: {
    en: 'in a bright setting',
    nl: 'in een heldere omgeving'
  },
  COZY: {
    en: 'in a cozy environment',
    nl: 'in een gezellige omgeving'
  },
  COLORFUL: {
    en: 'surrounded by colors',
    nl: 'omringd door kleuren'
  }
};

/**
 * Helper function to build alt text from components
 */
export function buildAltText(
  ageGroup: BilingualText,
  activity: BilingualText,
  location: BilingualText,
  emotion: BilingualText
): AltText {
  return {
    en: `${ageGroup.en} ${activity.en} ${location.en}, ${emotion.en}`,
    nl: `${ageGroup.nl} ${activity.nl} ${location.nl}, ${emotion.nl}`
  };
}

/**
 * Get alt text by language
 */
export function getAltText(altText: AltText, language: Language = 'en'): string {
  return language === 'en' ? altText.en : altText.nl;
}

// Decorative character images
export const DECORATIVE_ALT_TEXTS: Record<string, AltText> = {
  'decorative-character-1': {
    en: 'Decorative illustration of a friendly purple dinosaur character from Teddy Kids',
    nl: 'Decoratieve illustratie van een vriendelijk paars dinosaurus karakter van Teddy Kids'
  },
  'decorative-character-2': {
    en: 'Decorative illustration of a happy child wearing a Teddy Kids sweater',
    nl: 'Decoratieve illustratie van een blij kind in een Teddy Kids trui'
  }
};

/**
 * Generate alt text for any registered key.
 * The collections are checked in order of likelihood/priority.
 */
export function generateAltText(
  key: string,
  language: Language = 'en'
): string {
  // Decorative first
  if (DECORATIVE_ALT_TEXTS[key]) {
    return getAltText(DECORATIVE_ALT_TEXTS[key], language);
  }
  // Hero images
  if (HERO_ALT_TEXTS[key]) {
    return getAltText(HERO_ALT_TEXTS[key], language);
  }
  // Carousel slides
  if (CAROUSEL_ALT_TEXTS[key]) {
    return getAltText(CAROUSEL_ALT_TEXTS[key], language);
  }
  // Program images
  if (PROGRAM_ALT_TEXTS[key]) {
    return getAltText(PROGRAM_ALT_TEXTS[key], language);
  }
  // Location images
  if (LOCATION_ALT_TEXTS[key]) {
    return getAltText(LOCATION_ALT_TEXTS[key], language);
  }
  // Team portraits
  if (TEAM_ALT_TEXTS[key]) {
    return getAltText(TEAM_ALT_TEXTS[key], language);
  }
  // Activity shots
  if (ACTIVITY_ALT_TEXTS[key]) {
    return getAltText(ACTIVITY_ALT_TEXTS[key], language);
  }
  // Facility photos
  if (FACILITY_ALT_TEXTS[key]) {
    return getAltText(FACILITY_ALT_TEXTS[key], language);
  }

  // Fallback – generic
  return language === 'en'
    ? `Teddy Kids bilingual daycare - ${key}`
    : `Teddy Kids tweetalige kinderopvang - ${key}`;
}

/**
 * Reusable alt-text blocks for common image types
 */
export const HERO_ALT_TEXTS: Record<string, AltText> = {
  // Home page hero
  homeHero: {
    en: `${AGE_GROUPS.MIXED_GROUP.en} playing together ${LOCATIONS.INDOOR.en}, ${EMOTIONS.HAPPY.en} ${ATMOSPHERE.WARM_TONES.en}`,
    nl: `${AGE_GROUPS.MIXED_GROUP.nl} samen ${ACTIVITIES.PLAYING.nl} ${LOCATIONS.INDOOR.nl}, ${EMOTIONS.HAPPY.nl} ${ATMOSPHERE.WARM_TONES.nl}`
  },
  // About page hero
  aboutHero: {
    en: `${AGE_GROUPS.TODDLER.en} and teacher ${ACTIVITIES.INTERACTING.en} ${LOCATIONS.CLASSROOM.en}, ${EMOTIONS.ENGAGED.en}`,
    nl: `${AGE_GROUPS.TODDLER.nl} en leerkracht ${ACTIVITIES.INTERACTING.nl} ${LOCATIONS.CLASSROOM.nl}, ${EMOTIONS.ENGAGED.nl}`
  },
  // Programs page hero
  programsHero: {
    en: `${AGE_GROUPS.PRESCHOOLER.en} ${ACTIVITIES.BUILDING.en} ${LOCATIONS.CLASSROOM.en}, ${EMOTIONS.FOCUSED.en}`,
    nl: `${AGE_GROUPS.PRESCHOOLER.nl} ${ACTIVITIES.BUILDING.nl} ${LOCATIONS.CLASSROOM.nl}, ${EMOTIONS.FOCUSED.nl}`
  },
  // Locations page hero
  locationsHero: {
    en: `Aerial view of Teddy Kids ${LOCATIONS.RBW.en} with playground and garden`,
    nl: `Luchtfoto van Teddy Kids ${LOCATIONS.RBW.nl} met speelplaats en tuin`
  },
  // Team page hero
  teamHero: {
    en: `Teddy Kids educators smiling together ${LOCATIONS.INDOOR.en}, ${ATMOSPHERE.BRIGHT.en}`,
    nl: `Teddy Kids pedagogen samen glimlachend ${LOCATIONS.INDOOR.nl}, ${ATMOSPHERE.BRIGHT.nl}`
  },
  // Contact page hero
  contactHero: {
    en: `Welcoming entrance of Teddy Kids daycare ${LOCATIONS.LEIDEN.en}, ${ATMOSPHERE.WARM_TONES.en}`,
    nl: `Uitnodigende ingang van Teddy Kids kinderopvang ${LOCATIONS.LEIDEN.nl}, ${ATMOSPHERE.WARM_TONES.nl}`
  },
  // Apply page hero
  applyHero: {
    en: `Parent and child holding hands walking into Teddy Kids, ${EMOTIONS.HAPPY.en}`,
    nl: `Ouder en kind hand in hand lopend naar Teddy Kids, ${EMOTIONS.HAPPY.nl}`
  }
};

/**
 * Homepage carousel alt‐texts (3-slide setup)
 */
export const CAROUSEL_ALT_TEXTS: Record<string, AltText> = {
  carouselSlide1: {
    en: 'Two toddlers running through the garden at Teddy Kids, laughter and sunshine',
    nl: 'Twee peuters rennen door de tuin bij Teddy Kids, lachend in de zon'
  },
  carouselSlide2: {
    en: 'Teacher reading an English story to a group of toddlers in a cozy classroom',
    nl: 'Leidster leest een Engels verhaal voor aan peuters in een knusse klas'
  },
  carouselSlide3: {
    en: 'Baby exploring a soft toy on the playmat, supported by caregiver',
    nl: 'Baby ontdekt een knuffel op het speelkleed, begeleid door een leidster'
  }
};

/**
 * Program-specific alt texts
 */
export const PROGRAM_ALT_TEXTS: Record<string, AltText> = {
  // Nursery program
  nursery: {
    en: `${AGE_GROUPS.BABY.en} exploring sensory toys ${LOCATIONS.CLASSROOM.en}, ${EMOTIONS.CURIOUS.en}`,
    nl: `${AGE_GROUPS.BABY.nl} zintuiglijk speelgoed ${ACTIVITIES.EXPLORING.nl} ${LOCATIONS.CLASSROOM.nl}, ${EMOTIONS.CURIOUS.nl}`
  },
  // Toddler program
  toddler: {
    en: `${AGE_GROUPS.TODDLER.en} ${ACTIVITIES.PAINTING.en} with hands ${LOCATIONS.CLASSROOM.en}, ${EMOTIONS.JOYFUL.en}`,
    nl: `${AGE_GROUPS.TODDLER.nl} met handen ${ACTIVITIES.PAINTING.nl} ${LOCATIONS.CLASSROOM.nl}, ${EMOTIONS.JOYFUL.nl}`
  },
  // Preschool program
  preschool: {
    en: `${AGE_GROUPS.PRESCHOOLER.en} ${ACTIVITIES.READING.en} with teacher ${LOCATIONS.CLASSROOM.en}, ${EMOTIONS.ENGAGED.en}`,
    nl: `${AGE_GROUPS.PRESCHOOLER.nl} ${ACTIVITIES.READING.nl} met leerkracht ${LOCATIONS.CLASSROOM.nl}, ${EMOTIONS.ENGAGED.nl}`
  },
  // After-school program
  afterSchool: {
    en: `${AGE_GROUPS.SCHOOL_AGE.en} ${ACTIVITIES.GARDENING.en} ${LOCATIONS.GARDEN.en}, ${EMOTIONS.PROUD.en}`,
    nl: `${AGE_GROUPS.SCHOOL_AGE.nl} ${ACTIVITIES.GARDENING.nl} ${LOCATIONS.GARDEN.nl}, ${EMOTIONS.PROUD.nl}`
  },
  // TISA program
  tisa: {
    en: `${AGE_GROUPS.PRESCHOOLER.en} learning English alphabet ${LOCATIONS.CLASSROOM.en}, ${EMOTIONS.FOCUSED.en}`,
    nl: `${AGE_GROUPS.PRESCHOOLER.nl} het Engelse alfabet lerend ${LOCATIONS.CLASSROOM.nl}, ${EMOTIONS.FOCUSED.nl}`
  }
};

/**
 * Location-specific alt texts
 */
export const LOCATION_ALT_TEXTS: Record<string, AltText> = {
  // RBW location
  rbwExterior: {
    en: `Teddy Kids Rijnsburgerweg location exterior, welcoming entrance with playground visible`,
    nl: `Teddy Kids locatie Rijnsburgerweg buitenkant, uitnodigende ingang met zichtbare speelplaats`
  },
  rbwPlayground: {
    en: `${AGE_GROUPS.CHILDREN.en} ${ACTIVITIES.PLAYING.en} on the playground ${LOCATIONS.RBW.en}, ${EMOTIONS.EXCITED.en}`,
    nl: `${AGE_GROUPS.CHILDREN.nl} ${ACTIVITIES.PLAYING.nl} op de speelplaats ${LOCATIONS.RBW.nl}, ${EMOTIONS.EXCITED.nl}`
  },
  // LRZ location
  lrzExterior: {
    en: `Teddy Kids Leidseweg location exterior, historic building with modern playground`,
    nl: `Teddy Kids locatie Leidseweg buitenkant, historisch gebouw met moderne speelplaats`
  },
  lrzPlayground: {
    en: `${AGE_GROUPS.CHILDREN.en} ${ACTIVITIES.PLAYING.en} on the playground ${LOCATIONS.LRZ.en}, ${EMOTIONS.JOYFUL.en}`,
    nl: `${AGE_GROUPS.CHILDREN.nl} ${ACTIVITIES.PLAYING.nl} op de speelplaats ${LOCATIONS.LRZ.nl}, ${EMOTIONS.JOYFUL.nl}`
  },
  // ZML location
  zmlExterior: {
    en: `Teddy Kids Zeemanlaan location exterior, bright modern building with garden`,
    nl: `Teddy Kids locatie Zeemanlaan buitenkant, helder modern gebouw met tuin`
  },
  zmlPlayground: {
    en: `${AGE_GROUPS.CHILDREN.en} ${ACTIVITIES.PLAYING.en} on the playground ${LOCATIONS.ZML.en}, ${EMOTIONS.PLAYFUL.en}`,
    nl: `${AGE_GROUPS.CHILDREN.nl} ${ACTIVITIES.PLAYING.nl} op de speelplaats ${LOCATIONS.ZML.nl}, ${EMOTIONS.PLAYFUL.nl}`
  }
};

/**
 * Team member alt texts
 */
export const TEAM_ALT_TEXTS: Record<string, AltText> = {
  // Generic team member
  teamMember: {
    en: 'Teddy Kids educator smiling in classroom setting',
    nl: 'Teddy Kids pedagoog glimlachend in klaslokaal'
  },
  // Director
  director: {
    en: 'Director of Teddy Kids in office, professional portrait',
    nl: 'Directeur van Teddy Kids in kantoor, professioneel portret'
  },
  // Teacher
  teacher: {
    en: 'Teddy Kids teacher interacting with children, engaged expression',
    nl: 'Teddy Kids leerkracht in interactie met kinderen, betrokken uitdrukking'
  }
};

/**
 * Activity-specific alt texts
 */
export const ACTIVITY_ALT_TEXTS: Record<string, AltText> = {
  // Art activities
  art: {
    en: `${AGE_GROUPS.PRESCHOOLER.en} ${ACTIVITIES.PAINTING.en} at art table, ${EMOTIONS.FOCUSED.en} ${ATMOSPHERE.COLORFUL.en}`,
    nl: `${AGE_GROUPS.PRESCHOOLER.nl} ${ACTIVITIES.PAINTING.nl} aan kunsttafel, ${EMOTIONS.FOCUSED.nl} ${ATMOSPHERE.COLORFUL.nl}`
  },
  // Music activities
  music: {
    en: `${AGE_GROUPS.CHILDREN.en} ${ACTIVITIES.SINGING.en} and playing instruments, ${EMOTIONS.JOYFUL.en}`,
    nl: `${AGE_GROUPS.CHILDREN.nl} ${ACTIVITIES.SINGING.nl} en instrumenten spelend, ${EMOTIONS.JOYFUL.nl}`
  },
  // Outdoor play
  outdoorPlay: {
    en: `${AGE_GROUPS.CHILDREN.en} ${ACTIVITIES.PLAYING.en} ${LOCATIONS.OUTDOOR.en}, ${EMOTIONS.EXCITED.en} ${ATMOSPHERE.NATURAL_LIGHT.en}`,
    nl: `${AGE_GROUPS.CHILDREN.nl} ${ACTIVITIES.PLAYING.nl} ${LOCATIONS.OUTDOOR.nl}, ${EMOTIONS.EXCITED.nl} ${ATMOSPHERE.NATURAL_LIGHT.nl}`
  },
  // Reading time
  readingTime: {
    en: `${AGE_GROUPS.TODDLER.en} ${ACTIVITIES.READING.en} with teacher, ${EMOTIONS.ENGAGED.en} ${ATMOSPHERE.COZY.en}`,
    nl: `${AGE_GROUPS.TODDLER.nl} ${ACTIVITIES.READING.nl} met leerkracht, ${EMOTIONS.ENGAGED.nl} ${ATMOSPHERE.COZY.nl}`
  },
  // Mealtime
  mealtime: {
    en: `${AGE_GROUPS.CHILDREN.en} ${ACTIVITIES.EATING.en} healthy lunch together, ${EMOTIONS.HAPPY.en}`,
    nl: `${AGE_GROUPS.CHILDREN.nl} samen gezonde lunch ${ACTIVITIES.EATING.nl}, ${EMOTIONS.HAPPY.nl}`
  }
};

/**
 * Facility-specific alt texts
 */
export const FACILITY_ALT_TEXTS: Record<string, AltText> = {
  // Classroom
  classroom: {
    en: 'Bright, well-equipped classroom at Teddy Kids with learning centers and child-sized furniture',
    nl: 'Helder, goed uitgerust klaslokaal bij Teddy Kids met leercentra en kindvriendelijk meubilair'
  },
  // Playground
  playground: {
    en: 'Safe, nature-inspired playground at Teddy Kids with climbing structures and sandpit',
    nl: 'Veilige, door de natuur geïnspireerde speelplaats bij Teddy Kids met klimstructuren en zandbak'
  },
  // Sleeping area
  sleepingArea: {
    en: 'Peaceful sleeping area for babies and toddlers with individual cribs and soft lighting',
    nl: 'Rustige slaapruimte voor baby\'s en dreumesen met individuele bedjes en zachte verlichting'
  },
  // Garden
  garden: {
    en: 'Lush garden at Teddy Kids with vegetable patches, flowers, and natural play elements',
    nl: 'Weelderige tuin bij Teddy Kids met groentetuintjes, bloemen en natuurlijke speelelementen'
  }
};

/**
 * Create a custom alt text following Luna's formula
 */
export function createCustomAltText(
  ageGroup: keyof typeof AGE_GROUPS,
  activity: keyof typeof ACTIVITIES,
  location: keyof typeof LOCATIONS,
  emotion: keyof typeof EMOTIONS,
  atmosphere?: keyof typeof ATMOSPHERE
): AltText {
  const altText = {
    en: `${AGE_GROUPS[ageGroup].en} ${ACTIVITIES[activity].en} ${LOCATIONS[location].en}, ${EMOTIONS[emotion].en}`,
    nl: `${AGE_GROUPS[ageGroup].nl} ${ACTIVITIES[activity].nl} ${LOCATIONS[location].nl}, ${EMOTIONS[emotion].nl}`
  };

  if (atmosphere) {
    altText.en += ` ${ATMOSPHERE[atmosphere].en}`;
    altText.nl += ` ${ATMOSPHERE[atmosphere].nl}`;
  }

  return altText;
}

/**
 * Get alt text by category and ID
 */
export function getAltTextById(
  category: 'hero' | 'program' | 'location' | 'team' | 'activity' | 'facility',
  id: string,
  language: Language = 'en'
): string {
  let collection: Record<string, AltText>;

  switch (category) {
    case 'hero':
      collection = HERO_ALT_TEXTS;
      break;
    case 'program':
      collection = PROGRAM_ALT_TEXTS;
      break;
    case 'location':
      collection = LOCATION_ALT_TEXTS;
      break;
    case 'team':
      collection = TEAM_ALT_TEXTS;
      break;
    case 'activity':
      collection = ACTIVITY_ALT_TEXTS;
      break;
    case 'facility':
      collection = FACILITY_ALT_TEXTS;
      break;
    default:
      collection = HERO_ALT_TEXTS;
  }

  const altText = collection[id];
  if (!altText) {
    // Fallback to a generic alt text if the specific one is not found
    return language === 'en'
      ? `Teddy Kids bilingual daycare - ${id}`
      : `Teddy Kids tweetalige kinderopvang - ${id}`;
  }

  return language === 'en' ? altText.en : altText.nl;
}

/**
 * Example usage in a component:
 * 
 * import { useTranslation } from '@/lib/translations';
 * import { getAltTextById } from '@/lib/seo/alt-text';
 * 
 * function HeroSection() {
 *   const { language } = useTranslation();
 *   
 *   return (
 *     <Image
 *       src="/images/heroes/home-hero.jpg"
 *       alt={getAltTextById('hero', 'homeHero', language)}
 *       ...
 *     />
 *   );
 * }
 */
