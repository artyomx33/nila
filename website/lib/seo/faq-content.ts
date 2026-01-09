/**
 * faq-content.ts
 * FAQ content structure for your website
 * Bilingual FAQ templates ready to customize
 */

// Simple FAQ item interface - use this to structure your FAQs
export interface FAQItem {
  id: string;
  questionEn: string;
  questionNl: string;
  answerEn: string;
  answerNl: string;
  category?: string;
}

/**
 * General FAQs about TeddyKids and bilingual daycare
 * Suitable for Home page and About page
 */
export const GENERAL_FAQS: FAQItem[] = [
  /* ------------------------------------------------------------------
   *  Luna's voice-search-optimised FAQs (Homepage primary)
   *  These short, punchy Q&As appear first for featured-snippet pickup.
   * -----------------------------------------------------------------*/
  {
    id: 'luna-what-is-bilingual-daycare',
    questionEn: 'What is bilingual daycare?',
    questionNl: 'Wat is tweetalige kinderopvang?',
    answerEn:
      'At Teddy Kids, we speak English and Dutch in every group—children learn both languages naturally through daily play and interaction.',
    answerNl:
      'Bij Teddy Kids spreken we Engels en Nederlands in elke groep—kinderen leren beide talen op een natuurlijke en speelse manier.',
  },
  {
    id: 'luna-start-age',
    questionEn: 'From what age can my child start?',
    questionNl: 'Vanaf welke leeftijd kan mijn kind starten?',
    answerEn:
      'From 8 weeks old. We care for babies, toddlers and children up to 12 years in our after-school programs.',
    answerNl:
      'Vanaf 8 weken. We bieden opvang voor baby’s, peuters en kinderen tot 12 jaar via onze BSO.',
  },
  {
    id: 'luna-expat-friendly',
    questionEn: 'Is Teddy Kids suitable for expat families?',
    questionNl: 'Is Teddy Kids geschikt voor expat gezinnen?',
    answerEn:
      'Absolutely! We’re international, communication is English-friendly, and we guide you through Dutch childcare systems.',
    answerNl:
      'Zeker! We zijn internationaal, communicatie is Engels-vriendelijk en we helpen je door het Nederlandse kinderopvangsysteem.',
  },
  {
    id: 'luna-opening-hours',
    questionEn: 'What are your hours?',
    questionNl: 'Wat zijn jullie openingstijden?',
    answerEn: 'Monday to Friday, 07:30–18:30.',
    answerNl: 'Maandag t/m vrijdag van 07:30 tot 18:30.',
  },
  {
    id: 'luna-meals-included',
    questionEn: 'Do you include meals?',
    questionNl: 'Zijn maaltijden inbegrepen?',
    answerEn: 'Yes—healthy snacks, warm lunches, and all dietary needs covered.',
    answerNl: 'Ja—gezonde snacks, warme lunch en rekening met dieetwensen.',
  },
  {
    id: 'what-is-bilingual-daycare',
    questionEn: 'What is bilingual daycare?',
    questionNl: 'Wat is tweetalige kinderopvang?',
    answerEn: 'Bilingual daycare offers daily care where children hear and use two languages—at Teddy Kids that\'s English and Dutch—helping them develop natural fluency from an early age. Our educators are native speakers who create an immersive environment where children absorb both languages naturally through play, stories, and daily activities.',
    answerNl: 'Bij tweetalige kinderopvang horen en gebruiken kinderen dagelijks twee talen. Bij Teddy Kids zijn dat Nederlands én Engels. Onze pedagogisch medewerkers zijn moedertaalsprekers die een natuurlijke omgeving creëren waarin kinderen beide talen spelenderwijs leren door spel, verhalen en dagelijkse activiteiten.'
  },
  {
    id: 'why-choose-teddy-kids',
    questionEn: 'Why choose Teddy Kids for my child?',
    questionNl: 'Waarom zou ik voor Teddy Kids kiezen voor mijn kind?',
    answerEn: 'Teddy Kids offers a unique combination of bilingual education, experienced staff, and a warm, internationally inclusive environment. Since 2004, we\'ve nurtured thousands of children with our play-based approach that balances language development, social skills, and academic foundations. Our locations in Leiden and Voorschoten provide purpose-designed spaces with outdoor gardens, healthy meals, and a supportive community for both children and parents.',
    answerNl: 'Teddy Kids biedt een unieke combinatie van tweetalig onderwijs, ervaren personeel en een warme, internationaal inclusieve omgeving. Sinds 2004 hebben we duizenden kinderen begeleid met onze spelgerichte aanpak die taalontwikkeling, sociale vaardigheden en academische basis in balans brengt. Onze locaties in Leiden en Voorschoten bieden doelgericht ontworpen ruimtes met buitentuinen, gezonde maaltijden en een ondersteunende gemeenschap voor zowel kinderen als ouders.'
  },
  {
    id: 'teddy-kids-founding',
    questionEn: 'When was Teddy Kids founded?',
    questionNl: 'Wanneer is Teddy Kids opgericht?',
    answerEn: 'Teddy Kids was founded in 2004 in Leiden, starting with one location and a vision to create a truly bilingual environment for children. Over the years, we\'ve grown to multiple locations while maintaining our family-run approach and commitment to quality care and education.',
    answerNl: 'Teddy Kids is opgericht in 2004 in Leiden, beginnend met één locatie en een visie om een echt tweetalige omgeving voor kinderen te creëren. Door de jaren heen zijn we uitgegroeid tot meerdere locaties, terwijl we onze familiegerichte aanpak en toewijding aan kwaliteitsvolle zorg en onderwijs hebben behouden.'
  },
  {
    id: 'languages-spoken',
    questionEn: 'Which languages are spoken at Teddy Kids?',
    questionNl: 'Welke talen worden er gesproken bij Teddy Kids?',
    answerEn: 'At Teddy Kids, we primarily speak English and Dutch in all our groups. Each group has at least one native English speaker and one native Dutch speaker. Many of our staff are also fluent in additional languages including German, French, Spanish, and more, reflecting our international community.',
    answerNl: 'Bij Teddy Kids spreken we voornamelijk Engels en Nederlands in al onze groepen. Elke groep heeft ten minste één moedertaalspreker Engels en één moedertaalspreker Nederlands. Veel van onze medewerkers spreken ook vloeiend andere talen, waaronder Duits, Frans, Spaans en meer, wat onze internationale gemeenschap weerspiegelt.'
  },
  {
    id: 'educational-philosophy',
    questionEn: 'What is Teddy Kids\' educational philosophy?',
    questionNl: 'Wat is de onderwijsfilosofie van Teddy Kids?',
    answerEn: 'Our philosophy combines play-based learning with elements from Montessori and other international approaches. We believe children learn best through exploration, creativity, and positive social interactions. Our bilingual environment enriches cognitive development while our prepared spaces encourage independence and curiosity. We focus on the whole child—developing social-emotional skills alongside language, cognitive, and physical abilities.',
    answerNl: 'Onze filosofie combineert spelend leren met elementen uit Montessori en andere internationale benaderingen. Wij geloven dat kinderen het beste leren door exploratie, creativiteit en positieve sociale interacties. Onze tweetalige omgeving verrijkt de cognitieve ontwikkeling terwijl onze voorbereide ruimtes zelfstandigheid en nieuwsgierigheid stimuleren. We richten ons op het hele kind—het ontwikkelen van sociaal-emotionele vaardigheden naast taal, cognitieve en fysieke vaardigheden.'
  }
];

/**
 * FAQs about age groups and programs
 * Suitable for Programs page
 */
export const PROGRAMS_FAQS: FAQItem[] = [
  {
    id: 'age-groups',
    questionEn: 'How old are children at Teddy Kids?',
    questionNl: 'Vanaf welke leeftijd kan mijn kind starten?',
    answerEn: 'We welcome babies from 3 months up to preschoolers of 4 years in our daycare programs. Additionally, we offer after-school care (BSO) for children aged 4-12 years. Each age group has dedicated spaces and activities tailored to their developmental stage.',
    answerNl: 'We verwelkomen baby\'s vanaf 3 maanden tot peuters van 4 jaar in onze kinderdagverblijfprogramma\'s. Daarnaast bieden we buitenschoolse opvang (BSO) voor kinderen van 4-12 jaar. Elke leeftijdsgroep heeft eigen ruimtes en activiteiten die zijn afgestemd op hun ontwikkelingsfase.'
  },
  {
    id: 'horizontal-groups',
    questionEn: 'Why does Teddy Kids use horizontal age groups?',
    questionNl: 'Waarom gebruikt Teddy Kids horizontale leeftijdsgroepen?',
    answerEn: 'We organize children into horizontal age groups (babies, toddlers, preschoolers) because each developmental stage has unique needs. This approach allows us to create perfectly tailored environments, activities, and routines. Children benefit from interacting with peers at similar stages, while our educators can specialize in age-specific care and learning approaches.',
    answerNl: 'We organiseren kinderen in horizontale leeftijdsgroepen (baby\'s, dreumesen, peuters) omdat elke ontwikkelingsfase unieke behoeften heeft. Deze aanpak stelt ons in staat om perfect op maat gemaakte omgevingen, activiteiten en routines te creëren. Kinderen profiteren van interactie met leeftijdsgenoten in vergelijkbare stadia, terwijl onze pedagogisch medewerkers zich kunnen specialiseren in leeftijdsspecifieke zorg en leerbenaderingen.'
  },
  {
    id: 'nursery-program',
    questionEn: 'What does the Nursery program (0-2 years) include?',
    questionNl: 'Wat houdt het Baby- en Dreumesprogramma (0-2 jaar) in?',
    answerEn: 'Our Nursery program provides loving care in a gentle, sensory-rich environment. We follow each baby\'s individual feeding and sleeping schedule while introducing age-appropriate activities that support motor development, language exposure, and emotional security. Babies enjoy tummy time, music, simple games, and outdoor experiences, all narrated in both English and Dutch by our attentive educators.',
    answerNl: 'Ons Baby- en Dreumesprogramma biedt liefdevolle zorg in een zachte, zintuiglijk rijke omgeving. We volgen het individuele voedings- en slaapschema van elke baby en introduceren leeftijdsgeschikte activiteiten die de motorische ontwikkeling, taalontwikkeling en emotionele veiligheid ondersteunen. Baby\'s genieten van buiktijd, muziek, eenvoudige spelletjes en buitenervaringen, allemaal verteld in zowel Engels als Nederlands door onze aandachtige pedagogisch medewerkers.'
  },
  {
    id: 'preschool-program',
    questionEn: 'What does the Preschool program (2-4 years) include?',
    questionNl: 'Wat houdt het Peuterprogramma (2-4 jaar) in?',
    answerEn: 'Our Preschool program builds independence, social skills, and early academic foundations through play-based learning. Children engage in art, music, storytelling, early math concepts, and outdoor exploration. Our bilingual approach means all activities happen in both English and Dutch, preparing children for either Dutch or international primary education. We incorporate elements of Montessori philosophy with self-directed activities and prepared environments.',
    answerNl: 'Ons Peuterprogramma bouwt zelfstandigheid, sociale vaardigheden en vroege academische basis op door spelend leren. Kinderen doen mee aan kunst, muziek, verhalen vertellen, vroege rekenbegrippen en buitenverkenning. Onze tweetalige aanpak betekent dat alle activiteiten in zowel Engels als Nederlands plaatsvinden, waardoor kinderen worden voorbereid op Nederlands of internationaal basisonderwijs. We integreren elementen van de Montessori-filosofie met zelfgestuurde activiteiten en voorbereide omgevingen.'
  },
  {
    id: 'bso-program',
    questionEn: 'What activities are offered in the After-School Care (BSO)?',
    questionNl: 'Welke activiteiten worden aangeboden in de Buitenschoolse Opvang (BSO)?',
    answerEn: 'Our After-School Care offers a balance of structured activities and free play time. Children can choose from sports, arts and crafts, cooking, science experiments, outdoor adventures, and quiet spaces for homework. We organize themed weeks, special projects, and occasional field trips. The program is bilingual, supporting children from both Dutch and international schools.',
    answerNl: 'Onze Buitenschoolse Opvang biedt een balans tussen gestructureerde activiteiten en vrije speeltijd. Kinderen kunnen kiezen uit sport, knutselen, koken, wetenschappelijke experimenten, buitenavonturen en rustige ruimtes voor huiswerk. We organiseren themaweken, speciale projecten en occasionele uitstapjes. Het programma is tweetalig, ter ondersteuning van kinderen van zowel Nederlandse als internationale scholen.'
  },
  {
    id: 'tisa-program',
    questionEn: 'What is the TISA program at Teddy Kids?',
    questionNl: 'Wat is het TISA-programma bij Teddy Kids?',
    answerEn: 'The TISA (The International School Approach) program is our specialized English-focused curriculum that bridges to international primary education. It incorporates more structured learning activities while maintaining our play-based philosophy. The program is ideal for families planning to enroll their children in international schools, providing a smooth transition with familiar educational approaches and stronger emphasis on English language development.',
    answerNl: 'Het TISA-programma (The International School Approach) is ons gespecialiseerde, Engels-gerichte curriculum dat aansluit bij internationaal basisonderwijs. Het bevat meer gestructureerde leeractiviteiten terwijl onze spelgerichte filosofie behouden blijft. Het programma is ideaal voor gezinnen die van plan zijn hun kinderen in te schrijven op internationale scholen, en biedt een soepele overgang met vertrouwde onderwijsbenaderingen en sterkere nadruk op Engelse taalontwikkeling.'
  }
];

/**
 * FAQs about daily routines and practical information
 * Suitable for Programs and About pages
 */
export const DAILY_ROUTINE_FAQS: FAQItem[] = [
  {
    id: 'typical-day',
    questionEn: 'What does a typical day look like at Teddy Kids?',
    questionNl: 'Hoe ziet een typische dag eruit bij Teddy Kids?',
    answerEn: 'A typical day includes a warm welcome, free play, circle time with songs and stories, structured activities (art, movement, language), outdoor play, meals and snacks, rest time (for younger children), and more play-based learning. The exact schedule varies by age group, but all include a balance of active and quiet times, individual and group activities, and indoor and outdoor experiences—all delivered bilingually.',
    answerNl: 'Een typische dag bestaat uit een warm welkom, vrij spel, kringactiviteiten met liedjes en verhalen, gestructureerde activiteiten (kunst, beweging, taal), buitenspelen, maaltijden en snacks, rusttijd (voor jongere kinderen) en meer spelend leren. Het exacte schema varieert per leeftijdsgroep, maar allemaal bevatten ze een balans tussen actieve en rustige momenten, individuele en groepsactiviteiten, en binnen- en buitenervaringen—allemaal tweetalig aangeboden.'
  },
  {
    id: 'meals-provided',
    questionEn: 'Are meals included at Teddy Kids?',
    questionNl: 'Zijn maaltijden inbegrepen bij Teddy Kids?',
    answerEn: 'Yes, we provide all meals and snacks during the day, including breakfast, a warm lunch, and healthy snacks. Our menu is nutritionally balanced, freshly prepared, and accommodates dietary restrictions and allergies. We introduce children to diverse foods and flavors while teaching healthy eating habits. Mealtimes are social learning opportunities where children practice language, manners, and independence.',
    answerNl: 'Ja, we verzorgen alle maaltijden en snacks gedurende de dag, inclusief ontbijt, een warme lunch en gezonde tussendoortjes. Ons menu is voedingskundig uitgebalanceerd, vers bereid en houdt rekening met dieetbeperkingen en allergieën. We introduceren kinderen aan diverse voedingsmiddelen en smaken terwijl we gezonde eetgewoonten aanleren. Maaltijden zijn sociale leermomenten waar kinderen taal, manieren en zelfstandigheid oefenen.'
  },
  {
    id: 'sleep-arrangements',
    questionEn: 'How do you handle nap times and sleeping arrangements?',
    questionNl: 'Hoe gaan jullie om met slaaptijden en slaapvoorzieningen?',
    answerEn: 'We have dedicated sleeping areas with individual cribs for babies and cots for toddlers. We follow each child\'s individual sleep routine and parents\' preferences while adhering to safe sleep guidelines. Babies sleep according to their own schedules, while older groups have a scheduled rest period after lunch. Our staff includes certified baby sleep coaches who can support healthy sleep habits.',
    answerNl: 'We hebben speciale slaapruimtes met individuele bedjes voor baby\'s en stretchers voor peuters. We volgen het individuele slaapritme van elk kind en de voorkeuren van ouders, terwijl we ons houden aan veilige slaaprichtlijnen. Baby\'s slapen volgens hun eigen schema, terwijl oudere groepen een geplande rustperiode na de lunch hebben. Ons personeel bestaat uit gecertificeerde babyslaapcoaches die gezonde slaapgewoonten kunnen ondersteunen.'
  },
  {
    id: 'outdoor-play',
    questionEn: 'Is there outdoor play at Teddy Kids?',
    questionNl: 'Is er buitenspeelgelegenheid bij Teddy Kids?',
    answerEn: 'Absolutely! Every location has a secure garden or playground used daily, weather permitting. We believe outdoor play is essential for healthy development, so children go outside at least once a day for fresh air, physical activity, and nature exploration. Our outdoor spaces are designed with age-appropriate equipment and natural elements that encourage different types of play and learning.',
    answerNl: 'Absoluut! Elke locatie heeft een veilige tuin of speelplaats die dagelijks wordt gebruikt, als het weer het toelaat. We geloven dat buitenspelen essentieel is voor een gezonde ontwikkeling, dus kinderen gaan minstens één keer per dag naar buiten voor frisse lucht, fysieke activiteit en natuurverkenning. Onze buitenruimtes zijn ontworpen met leeftijdsgeschikte apparatuur en natuurlijke elementen die verschillende soorten spel en leren stimuleren.'
  },
  {
    id: 'parent-communication',
    questionEn: 'How do you communicate with parents about their child\'s day?',
    questionNl: 'Hoe communiceren jullie met ouders over de dag van hun kind?',
    answerEn: 'We use a secure parent app that provides daily updates, photos, and information about your child\'s activities, meals, naps, and developmental milestones. Parents receive real-time notifications and can message staff directly through the app. We also have regular parent-teacher meetings, newsletters, and informal daily check-ins during drop-off and pick-up times. All communication is available in both English and Dutch.',
    answerNl: 'We gebruiken een beveiligde ouder-app die dagelijkse updates, foto\'s en informatie biedt over de activiteiten, maaltijden, dutjes en ontwikkelingsmijlpalen van je kind. Ouders ontvangen realtime meldingen en kunnen direct berichten sturen naar medewerkers via de app. We hebben ook regelmatige ouder-leerkracht gesprekken, nieuwsbrieven en informele dagelijkse check-ins tijdens het brengen en halen. Alle communicatie is beschikbaar in zowel Engels als Nederlands.'
  }
];

/**
 * FAQs about enrollment, pricing, and practical information
 * Suitable for Contact and Apply pages
 */
export const ENROLLMENT_FAQS: FAQItem[] = [
  {
    id: 'enrollment-process',
    questionEn: 'How do I enroll my child at Teddy Kids?',
    questionNl: 'Hoe schrijf ik mijn kind in bij Teddy Kids?',
    answerEn: 'The enrollment process begins with filling out our online application form or contacting us directly. We\'ll then invite you for a tour of our facilities and discuss your needs and preferences. Once you decide to proceed, we\'ll confirm availability and send a placement agreement. After signing the agreement and paying the registration fee, your child\'s spot is secured. We\'ll then arrange a personalized transition plan with gradual settling-in sessions before the official start date.',
    answerNl: 'Het inschrijvingsproces begint met het invullen van ons online aanmeldformulier of direct contact met ons opnemen. We nodigen je dan uit voor een rondleiding door onze faciliteiten en bespreken je behoeften en voorkeuren. Zodra je besluit door te gaan, bevestigen we de beschikbaarheid en sturen we een plaatsingsovereenkomst. Na ondertekening van de overeenkomst en betaling van het inschrijfgeld, is de plek van je kind verzekerd. We regelen dan een gepersonaliseerd overgangsplan met geleidelijke wenperiodes vóór de officiële startdatum.'
  },
  {
    id: 'waiting-list',
    questionEn: 'Is there a waiting list for Teddy Kids?',
    questionNl: 'Is er een wachtlijst voor Teddy Kids?',
    answerEn: 'Waiting lists vary by location, age group, and desired days. Popular days (Tuesday-Thursday) and certain age groups may have longer waiting periods. We recommend applying as early as possible, even during pregnancy for infant care. Priority is given to siblings of current children and full-time enrollments. We can often accommodate part-time requests by matching complementary schedules. Contact us for current availability information specific to your situation.',
    answerNl: 'Wachtlijsten variëren per locatie, leeftijdsgroep en gewenste dagen. Populaire dagen (dinsdag-donderdag) en bepaalde leeftijdsgroepen kunnen langere wachttijden hebben. We raden aan zo vroeg mogelijk aan te melden, zelfs tijdens de zwangerschap voor babyopvang. Voorrang wordt gegeven aan broertjes en zusjes van huidige kinderen en voltijdse inschrijvingen. We kunnen vaak deeltijdverzoeken accommoderen door complementaire schema\'s te matchen. Neem contact met ons op voor actuele beschikbaarheidsinformatie specifiek voor jouw situatie.'
  },
  {
    id: 'pricing',
    questionEn: 'What are the fees for Teddy Kids?',
    questionNl: 'Wat zijn de kosten voor Teddy Kids?',
    answerEn: 'Our fees depend on the age group, number of days, and specific program. All fees include meals, snacks, diapers, and regular activities. We offer various attendance options from 1-5 days per week, with discounts for multiple days and siblings. Please contact us for a personalized quote. Many families qualify for the Dutch childcare allowance (kinderopvangtoeslag), which significantly reduces out-of-pocket costs.',
    answerNl: 'Onze tarieven zijn afhankelijk van de leeftijdsgroep, het aantal dagen en het specifieke programma. Alle tarieven zijn inclusief maaltijden, snacks, luiers en reguliere activiteiten. We bieden verschillende aanwezigheidsopties van 1-5 dagen per week, met kortingen voor meerdere dagen en broers en zussen. Neem contact met ons op voor een persoonlijke offerte. Veel gezinnen komen in aanmerking voor de Nederlandse kinderopvangtoeslag, wat de eigen kosten aanzienlijk vermindert.'
  },
  {
    id: 'childcare-allowance',
    questionEn: 'Can I receive the Dutch childcare allowance (kinderopvangtoeslag)?',
    questionNl: 'Kan ik de Nederlandse kinderopvangtoeslag ontvangen?',
    answerEn: 'Yes, Teddy Kids is a registered childcare provider, so families who meet the requirements can apply for the Dutch childcare allowance (kinderopvangtoeslag). Generally, both parents must work, study, or participate in a work reintegration program. The allowance amount depends on your income, number of children, and childcare hours. We can provide all necessary documentation and guide you through the application process with the Dutch Tax Authority (Belastingdienst).',
    answerNl: 'Ja, Teddy Kids is een geregistreerde kinderopvangaanbieder, dus gezinnen die aan de eisen voldoen kunnen de Nederlandse kinderopvangtoeslag aanvragen. Over het algemeen moeten beide ouders werken, studeren of deelnemen aan een re-integratietraject. Het toeslagbedrag is afhankelijk van je inkomen, aantal kinderen en kinderopvanguren. We kunnen alle nodige documentatie verstrekken en je begeleiden bij het aanvraagproces bij de Belastingdienst.'
  },
  {
    id: 'opening-hours',
    questionEn: 'What are Teddy Kids\' opening hours?',
    questionNl: 'Wat zijn de openingstijden van Teddy Kids?',
    answerEn: 'Teddy Kids is open Monday to Friday from 7:30 AM to 6:30 PM. We\'re closed on Dutch national holidays and for a few staff training days throughout the year (announced well in advance). Extended hours may be available at certain locations for parents with early/late work schedules—please inquire about this option if needed.',
    answerNl: 'Teddy Kids is geopend van maandag tot vrijdag van 7:30 tot 18:30 uur. We zijn gesloten op Nederlandse nationale feestdagen en voor enkele personeelstrainingsdagen gedurende het jaar (ruim van tevoren aangekondigd). Verlengde openingstijden kunnen beschikbaar zijn op bepaalde locaties voor ouders met vroege/late werkschema\'s—informeer naar deze optie indien nodig.'
  }
];

/**
 * FAQs specifically for expat families
 * Registration & Cost FAQs (Apply / Pricing pages)
 * Luna-crafted, parent-converting, bilingual Q&A block
 */
export const REGISTRATION_COST_FAQS: FAQItem[] = [
  {
    id: 'luna-how-to-register',
    questionEn: 'How do I register my child at Teddy Kids?',
    questionNl: 'Hoe schrijf ik mijn kind in bij Teddy Kids?',
    answerEn:
      'You can register online for free using the form on our Apply page. Once submitted, we’ll contact you to discuss availability and next steps.',
    answerNl:
      'Inschrijven is gratis en kan eenvoudig via het formulier op onze Apply-pagina. We nemen daarna contact met je op om beschikbaarheid en vervolgstappen te bespreken.'
  },
  {
    id: 'luna-after-registration',
    questionEn: 'What happens after I register?',
    questionNl: 'Wat gebeurt er nadat ik me heb ingeschreven?',
    answerEn:
      'After receiving your application, we check availability and invite you for a tour if there’s a match. You\'re always welcome to visit.',
    answerNl:
      'Na je inschrijving bekijken we de beschikbaarheid en nodigen we je uit voor een rondleiding als er een match is. Je bent altijd welkom om langs te komen.'
  },
  {
    id: 'luna-waiting-list',
    questionEn: 'Is there a waiting list?',
    questionNl: 'Is er een wachtlijst?',
    answerEn:
      'Depending on your preferred days and group, we may place your child on a waiting list. As soon as a spot opens, we reach out.',
    answerNl:
      'Afhankelijk van je gewenste dagen en groep kan je kind op een wachtlijst komen. Zodra er plek is, nemen we contact op.'
  },
  {
    id: 'luna-registration-costs',
    questionEn: 'Are there any costs for registration?',
    questionNl: 'Zijn er kosten verbonden aan inschrijven?',
    answerEn:
      'No, registration is completely free—there are no fees until you accept a placement offer and sign the contract.',
    answerNl:
      'Nee, inschrijven is helemaal gratis. Er zijn pas kosten als je een plaatsingsaanbod accepteert en het contract ondertekent.'
  },
  {
    id: 'luna-childcare-allowance-2025',
    questionEn: 'How much is the childcare allowance in the Netherlands?',
    questionNl: 'Hoeveel kinderopvangtoeslag krijg ik in Nederland?',
    answerEn:
      'In 2025, you can receive €286 to €409 per child every 3 months—depending on age and income. We help parents navigate the application.',
    answerNl:
      'In 2025 krijg je tussen de €286 en €409 per kind per 3 maanden—afhankelijk van leeftijd en inkomen. Wij helpen je bij de aanvraag.'
  },
  {
    id: 'luna-early-late-discount',
    questionEn: 'Do I pay less if I drop off late or pick up early?',
    questionNl: 'Betaal ik minder als ik mijn kind eerder ophaal of later breng?',
    answerEn:
      'No. Your monthly fee is fixed and based on your contract days—not on actual hours of attendance.',
    answerNl:
      'Nee. Je betaalt een vast bedrag per maand gebaseerd op je contractdagen, niet op hoe lang je kind daadwerkelijk aanwezig is.'
  },
  {
    id: 'luna-invoice-timing',
    questionEn: 'How and when do I receive my invoice?',
    questionNl: 'Hoe en wanneer ontvang ik mijn factuur?',
    answerEn:
      'Invoices are sent around the 17th of each month. You can pay via automatic debit or Tikkie.',
    answerNl:
      'Je ontvangt je factuur rond de 17e van de maand. Betalen kan via automatische incasso of Tikkie.'
  },
  {
    id: 'luna-cancel-before-contract',
    questionEn: 'Can I cancel without a fee before signing the contract?',
    questionNl: 'Kan ik annuleren zonder kosten voordat ik het contract teken?',
    answerEn:
      'Yes. There are no cancellation fees before a final placement offer and signed contract.',
    answerNl:
      'Ja. Er zijn geen annuleringskosten zolang er nog geen definitief plaatsingsaanbod en ondertekend contract is.'
  }
];

/**
 * Suitable for dedicated Expat section or integrated into other pages
 */
export const EXPAT_FAQS: FAQItem[] = [
  {
    id: 'expat-support',
    questionEn: 'How does Teddy Kids support expat families?',
    questionNl: 'Hoe ondersteunt Teddy Kids expatgezinnen?',
    answerEn: 'We provide comprehensive support for expat families, including assistance with childcare allowance applications, multilingual staff, and cultural integration. All communication is available in English, and we help navigate Dutch childcare regulations. Our international community creates a welcoming environment where families connect and share experiences. We understand the challenges of raising children abroad and offer flexibility with contracts for families on temporary assignments.',
    answerNl: 'We bieden uitgebreide ondersteuning voor expatgezinnen, inclusief hulp bij kinderopvangtoeslagaanvragen, meertalig personeel en culturele integratie. Alle communicatie is beschikbaar in het Engels en we helpen bij het navigeren door Nederlandse kinderopvangregels. Onze internationale gemeenschap creëert een verwelkomende omgeving waar gezinnen contact maken en ervaringen delen. We begrijpen de uitdagingen van het opvoeden van kinderen in het buitenland en bieden flexibiliteit met contracten voor gezinnen met tijdelijke opdrachten.'
  },
  {
    id: 'dutch-system',
    questionEn: 'How does the Dutch childcare system work?',
    questionNl: 'Hoe werkt het Nederlandse kinderopvangsysteem?',
    answerEn: 'The Dutch childcare system is regulated by the government to ensure quality and safety. Licensed providers like Teddy Kids must meet strict standards for staff qualifications, child-to-teacher ratios, facilities, and educational programs. The government subsidizes childcare through the childcare allowance (kinderopvangtoeslag), making it more affordable for working parents. Children typically attend daycare until age 4, when they start primary school, and may then attend after-school care (BSO).',
    answerNl: 'Het Nederlandse kinderopvangsysteem wordt gereguleerd door de overheid om kwaliteit en veiligheid te waarborgen. Geregistreerde aanbieders zoals Teddy Kids moeten voldoen aan strenge normen voor personeelskwalificaties, kind-leidster ratio\'s, faciliteiten en educatieve programma\'s. De overheid subsidieert kinderopvang via de kinderopvangtoeslag, waardoor het betaalbaarder wordt voor werkende ouders. Kinderen gaan meestal naar de kinderopvang tot 4 jaar, wanneer ze naar de basisschool gaan, en kunnen daarna naar de buitenschoolse opvang (BSO).'
  },
  {
    id: 'language-development',
    questionEn: 'Will my child become fluent in both English and Dutch?',
    questionNl: 'Zal mijn kind vloeiend worden in zowel Engels als Nederlands?',
    answerEn: 'Most children at Teddy Kids develop strong skills in both languages, though individual results vary based on exposure time, age of entry, and home language environment. Our immersive approach with native-speaking teachers creates natural bilingual development. Young children (0-3 years) typically absorb both languages effortlessly, while older children may take a few months to become comfortable in their non-dominant language. We track language milestones and provide regular updates on your child\'s progress.',
    answerNl: 'De meeste kinderen bij Teddy Kids ontwikkelen sterke vaardigheden in beide talen, hoewel individuele resultaten variëren op basis van blootstellingstijd, leeftijd bij binnenkomst en thuistaalomgeving. Onze immersieve aanpak met moedertaalsprekende leerkrachten creëert natuurlijke tweetalige ontwikkeling. Jonge kinderen (0-3 jaar) nemen beide talen meestal moeiteloos op, terwijl oudere kinderen enkele maanden nodig kunnen hebben om zich comfortabel te voelen in hun niet-dominante taal. We volgen taalmijlpalen en geven regelmatige updates over de voortgang van je kind.'
  },
  {
    id: 'school-transition',
    questionEn: 'How does Teddy Kids prepare children for Dutch or international schools?',
    questionNl: 'Hoe bereidt Teddy Kids kinderen voor op Nederlandse of internationale scholen?',
    answerEn: 'We prepare children for both Dutch and international primary education pathways. Our curriculum develops key school readiness skills including language, pre-literacy, early math concepts, social skills, and independence. For children heading to Dutch schools, we strengthen Dutch vocabulary and cultural familiarity. For those continuing to international education, our TISA program provides additional English-focused activities and international curriculum elements. We maintain relationships with local schools to ensure smooth transitions.',
    answerNl: 'We bereiden kinderen voor op zowel Nederlandse als internationale basisonderwijstrajecten. Ons curriculum ontwikkelt belangrijke schoolvoorbereidingsvaardigheden, waaronder taal, geletterdheid, vroege rekenbegrippen, sociale vaardigheden en zelfstandigheid. Voor kinderen die naar Nederlandse scholen gaan, versterken we de Nederlandse woordenschat en culturele vertrouwdheid. Voor degenen die doorgaan naar internationaal onderwijs, biedt ons TISA-programma aanvullende Engels-gerichte activiteiten en internationale curriculumelementen. We onderhouden relaties met lokale scholen om soepele overgangen te garanderen.'
  },
  {
    id: 'contract-flexibility',
    questionEn: 'Do you offer flexible contracts for expat families?',
    questionNl: 'Bieden jullie flexibele contracten voor expatgezinnen?',
    answerEn: 'Yes, we understand the unique needs of expat families and offer more flexible contract terms than is typical in Dutch childcare. While we generally require a minimum commitment of three months, we can accommodate shorter terms for corporate relocations with proper notice. We also offer assistance with contract transitions if you need to change locations within the Netherlands, and can provide documentation for employer childcare reimbursement programs.',
    answerNl: 'Ja, we begrijpen de unieke behoeften van expatgezinnen en bieden flexibelere contractvoorwaarden dan gebruikelijk is in de Nederlandse kinderopvang. Hoewel we over het algemeen een minimale verbintenis van drie maanden vereisen, kunnen we kortere termijnen accommoderen voor bedrijfsverhuizingen met gepaste kennisgeving. We bieden ook hulp bij contractovergangen als je binnen Nederland van locatie moet veranderen, en kunnen documentatie verstrekken voor kinderopvangvergoedingsprogramma\'s van werkgevers.'
  }
];

/**
 * FAQs about staff and qualifications
 * Suitable for Team and About pages
 */
export const STAFF_FAQS: FAQItem[] = [
  {
    id: 'staff-qualifications',
    questionEn: 'What qualifications do Teddy Kids staff have?',
    questionNl: 'Welke kwalificaties heeft het personeel van Teddy Kids?',
    answerEn: 'All our educators have professional qualifications in early childhood education, meeting or exceeding Dutch regulatory requirements. Many hold additional specialized certifications in areas like baby care, language development, or Montessori methods. Our international staff brings diverse educational backgrounds from various countries, enriching our approach. All staff undergo continuous professional development, regular training, and background checks. Many team members have been with us for 5+ years, ensuring stability and experience.',
    answerNl: 'Al onze pedagogisch medewerkers hebben professionele kwalificaties in vroegkinderlijk onderwijs, die voldoen aan of de Nederlandse wettelijke vereisten overtreffen. Velen hebben aanvullende gespecialiseerde certificeringen op gebieden zoals babyzorg, taalontwikkeling of Montessori-methoden. Ons internationale personeel brengt diverse onderwijsachtergronden uit verschillende landen mee, wat onze aanpak verrijkt. Alle medewerkers ondergaan continue professionele ontwikkeling, regelmatige training en achtergrondcontroles. Veel teamleden zijn al 5+ jaar bij ons, wat stabiliteit en ervaring garandeert.'
  },
  {
    id: 'teacher-ratio',
    questionEn: 'What is the teacher-to-child ratio at Teddy Kids?',
    questionNl: 'Wat is de leidster-kind ratio bij Teddy Kids?',
    answerEn: 'We follow Dutch guidelines for teacher-to-child ratios, which ensure quality care and individual attention: 1 educator per 3 babies (0-1 year), 1 per 5 toddlers (1-2 years), 1 per 8 preschoolers (2-4 years), and 1 per 10 school-age children (4+ years). These ratios allow our educators to provide personalized care, respond to individual needs, and build meaningful relationships with each child.',
    answerNl: 'We volgen de Nederlandse richtlijnen voor leidster-kind ratio\'s, die kwaliteitszorg en individuele aandacht waarborgen: 1 pedagogisch medewerker per 3 baby\'s (0-1 jaar), 1 per 5 dreumesen (1-2 jaar), 1 per 8 peuters (2-4 jaar) en 1 per 10 schoolgaande kinderen (4+ jaar). Deze ratio\'s stellen onze pedagogisch medewerkers in staat om gepersonaliseerde zorg te bieden, te reageren op individuele behoeften en betekenisvolle relaties op te bouwen met elk kind.'
  },
  {
    id: 'consistent-caregivers',
    questionEn: 'Will my child have consistent caregivers?',
    questionNl: 'Zal mijn kind vaste verzorgers hebben?',
    answerEn: 'Yes, we prioritize consistency in caregiving relationships. Each child is assigned primary educators who are present on their attendance days. We maintain stable group compositions and minimize staff turnover through supportive workplace practices. This consistency helps children develop secure attachments and trust, which are essential for healthy social-emotional development. When staff changes are necessary, we manage transitions carefully with proper introductions and adjustment periods.',
    answerNl: 'Ja, we geven prioriteit aan consistentie in zorgrelaties. Elk kind krijgt vaste pedagogisch medewerkers toegewezen die aanwezig zijn op hun aanwezigheidsdagen. We handhaven stabiele groepssamenstellingen en minimaliseren personeelsverloop door ondersteunende werkpraktijken. Deze consistentie helpt kinderen veilige hechtingen en vertrouwen te ontwikkelen, die essentieel zijn voor een gezonde sociaal-emotionele ontwikkeling. Wanneer personeelswijzigingen noodzakelijk zijn, beheren we overgangen zorgvuldig met gepaste introducties en aanpassingsperiodes.'
  },
  {
    id: 'language-teachers',
    questionEn: 'Are your teachers native speakers of English and Dutch?',
    questionNl: 'Zijn jullie leerkrachten moedertaalsprekers van Engels en Nederlands?',
    answerEn: 'Yes, we ensure that each group has at least one native English speaker and one native Dutch speaker, creating an authentic bilingual environment. Many of our international staff are native speakers of additional languages including German, French, Spanish, Portuguese, and more. All non-native speakers have demonstrated proficiency in their teaching languages. This linguistic diversity reflects our international community and enriches the cultural experience for all children.',
    answerNl: 'Ja, we zorgen ervoor dat elke groep ten minste één moedertaalspreker Engels en één moedertaalspreker Nederlands heeft, waardoor een authentieke tweetalige omgeving ontstaat. Veel van onze internationale medewerkers zijn moedertaalsprekers van aanvullende talen, waaronder Duits, Frans, Spaans, Portugees en meer. Alle niet-moedertaalsprekers hebben aangetoonde vaardigheid in hun onderwijstalen. Deze taalkundige diversiteit weerspiegelt onze internationale gemeenschap en verrijkt de culturele ervaring voor alle kinderen.'
  }
];

/**
 * FAQs about facilities and locations
 * Suitable for Locations page
 */
export const LOCATIONS_FAQS: FAQItem[] = [
  {
    id: 'locations-overview',
    questionEn: 'Where are Teddy Kids locations?',
    questionNl: 'Waar zijn de Teddy Kids locaties?',
    answerEn: 'Teddy Kids has multiple locations in Leiden and Voorschoten. Our main centers include Rijnsburgerweg (RBW) and Leidseweg (LRZ). Each location has been thoughtfully designed to provide a safe, stimulating environment with dedicated spaces for different age groups, outdoor play areas, and modern facilities. All locations follow the same high-quality standards and bilingual approach, though each has its own unique character and community.',
    answerNl: 'Teddy Kids heeft meerdere locaties in Leiden en Voorschoten. Onze belangrijkste centra zijn Rijnsburgerweg (RBW) en Leidseweg (LRZ). Elke locatie is zorgvuldig ontworpen om een veilige, stimulerende omgeving te bieden met speciale ruimtes voor verschillende leeftijdsgroepen, buitenspeelplaatsen en moderne faciliteiten. Alle locaties volgen dezelfde hoogwaardige normen en tweetalige aanpak, hoewel elk zijn eigen unieke karakter en gemeenschap heeft.'
  },
  {
    id: 'location-differences',
    questionEn: 'What are the differences between your locations?',
    questionNl: 'Wat zijn de verschillen tussen jullie locaties?',
    answerEn: 'While all locations follow our bilingual approach and quality standards, each has unique characteristics. RBW (Leiden) is our largest center with extensive outdoor space and proximity to the Bio Science Park. LRZ (Voorschoten) offers a cozy, village-like atmosphere with beautiful gardens. The age groups, available days, and specific facilities vary slightly between locations. We\'re happy to discuss which location might best suit your family\'s needs during a personal tour.',
    answerNl: 'Hoewel alle locaties onze tweetalige aanpak en kwaliteitsnormen volgen, heeft elk unieke kenmerken. RBW (Leiden) is ons grootste centrum met uitgebreide buitenruimte en nabijheid van het Bio Science Park. LRZ (Voorschoten) biedt een gezellige, dorpsachtige sfeer met prachtige tuinen. De leeftijdsgroepen, beschikbare dagen en specifieke faciliteiten verschillen enigszins tussen locaties. We bespreken graag welke locatie het beste bij de behoeften van jouw gezin past tijdens een persoonlijke rondleiding.'
  },
  {
    id: 'security-measures',
    questionEn: 'What security measures are in place at Teddy Kids?',
    questionNl: 'Welke veiligheidsmaatregelen zijn er bij Teddy Kids?',
    answerEn: 'Child safety is our top priority. Our facilities feature secure access systems with coded entry, CCTV monitoring of entrances, fully fenced outdoor areas, and strict pick-up authorization protocols. All staff are trained in emergency procedures, first aid, and child protection policies. We conduct regular safety drills and maintain low teacher-to-child ratios for proper supervision. Our buildings meet or exceed all Dutch safety regulations for childcare facilities.',
    answerNl: 'Kindveiligheid is onze topprioriteit. Onze faciliteiten hebben beveiligde toegangssystemen met gecodeerde toegang, CCTV-bewaking van ingangen, volledig omheinde buitenruimtes en strikte ophaalprotocollen. Alle medewerkers zijn getraind in noodprocedures, EHBO en kinderbeschermingsbeleid. We voeren regelmatig veiligheidsoefeningen uit en handhaven lage leidster-kind ratio\'s voor goede supervisie. Onze gebouwen voldoen aan of overtreffen alle Nederlandse veiligheidsvoorschriften voor kinderopvangfaciliteiten.'
  },
  {
    id: 'outdoor-spaces',
    questionEn: 'What are the outdoor spaces like at Teddy Kids?',
    questionNl: 'Hoe zien de buitenruimtes eruit bij Teddy Kids?',
    answerEn: 'Our outdoor spaces are designed as natural extensions of our learning environment. Each location features age-appropriate play equipment, gardening areas, sensory elements, and both sunny and shaded spaces. We incorporate natural materials, plants, and opportunities for exploration. Safety surfaces under climbing equipment, secure fencing, and careful supervision ensure children can enjoy outdoor play safely. We use these spaces daily, weather permitting, for physical activity, nature education, and fresh air.',
    answerNl: 'Onze buitenruimtes zijn ontworpen als natuurlijke verlengstukken van onze leeromgeving. Elke locatie heeft leeftijdsgeschikte speeltoestellen, tuingebieden, zintuiglijke elementen en zowel zonnige als schaduwrijke ruimtes. We integreren natuurlijke materialen, planten en mogelijkheden voor exploratie. Veiligheidsondergronden onder klimtoestellen, veilige omheiningen en zorgvuldige supervisie zorgen ervoor dat kinderen veilig buiten kunnen spelen. We gebruiken deze ruimtes dagelijks, als het weer het toelaat, voor fysieke activiteit, natuureducatie en frisse lucht.'
  },
  {
    id: 'transportation',
    questionEn: 'Is there transportation between schools and Teddy Kids BSO?',
    questionNl: 'Is er transport tussen scholen en Teddy Kids BSO?',
    answerEn: 'Yes, for our After-School Care program, we provide supervised transportation from partner schools to our BSO locations. Depending on the distance, this may be walking groups (with safety vests and proper supervision) or our dedicated Teddy Kids vans driven by certified staff. We coordinate closely with schools regarding dismissal times and have established pick-up points. For schools further away, please inquire about specific transportation arrangements during enrollment.',
    answerNl: 'Ja, voor ons Buitenschoolse Opvang programma bieden we begeleid transport van partnerscholen naar onze BSO-locaties. Afhankelijk van de afstand kan dit loopgroepen zijn (met veiligheidshesjes en goede begeleiding) of onze speciale Teddy Kids busjes bestuurd door gecertificeerd personeel. We coördineren nauw met scholen over eindtijden en hebben vaste ophaalpunten. Voor scholen die verder weg liggen, informeer naar specifieke transportregelingen tijdens de inschrijving.'
  }
];

/**
 * Combine all FAQs for comprehensive pages
 */
export const ALL_FAQS = [
  ...GENERAL_FAQS,
  ...PROGRAMS_FAQS,
  ...DAILY_ROUTINE_FAQS,
  ...ENROLLMENT_FAQS,
  ...REGISTRATION_COST_FAQS,
  ...EXPAT_FAQS,
  ...STAFF_FAQS,
  ...LOCATIONS_FAQS
];

/**
 * Helper function to get FAQs by page
 */
export function getFAQsByPage(page: string): FAQItem[] {
  switch (page) {
    case 'home':
      return [...GENERAL_FAQS.slice(0, 3), ...ENROLLMENT_FAQS.slice(0, 2)];
    case 'about':
      return [...GENERAL_FAQS, ...STAFF_FAQS.slice(0, 2)];
    case 'programs':
      return [...PROGRAMS_FAQS, ...DAILY_ROUTINE_FAQS.slice(0, 2)];
    case 'locations':
      return LOCATIONS_FAQS;
    case 'team':
      return STAFF_FAQS;
    case 'contact':
      return [...ENROLLMENT_FAQS.slice(0, 3), ...GENERAL_FAQS.slice(0, 2)];
    case 'apply':
      // Prioritise Luna's high-conversion registration FAQ block,
      // followed by a concise set of enrollment and expat questions.
      return [
        ...REGISTRATION_COST_FAQS,
        ...ENROLLMENT_FAQS.slice(0, 2),
        ...EXPAT_FAQS.slice(0, 2)
      ];
    case 'registration':
      return REGISTRATION_COST_FAQS;
    default:
      return GENERAL_FAQS;
  }
}

/**
 * Get FAQs by category for custom pages
 */
export function getFAQsByCategory(category: string): FAQItem[] {
  switch (category) {
    case 'general':
      return GENERAL_FAQS;
    case 'programs':
      return PROGRAMS_FAQS;
    case 'daily':
      return DAILY_ROUTINE_FAQS;
    case 'enrollment':
      return ENROLLMENT_FAQS;
    case 'expat':
      return EXPAT_FAQS;
    case 'staff':
      return STAFF_FAQS;
    case 'locations':
      return LOCATIONS_FAQS;
    default:
      return GENERAL_FAQS;
  }
}

/**
 * Get FAQs by specific keywords or topics
 */
export function getFAQsByTopic(topic: string): FAQItem[] {
  const topicLower = topic.toLowerCase();
  
  return ALL_FAQS.filter(faq => {
    const questionEn = faq.questionEn.toLowerCase();
    const questionNl = faq.questionNl.toLowerCase();
    const answerEn = faq.answerEn.toLowerCase();
    const answerNl = faq.answerNl.toLowerCase();
    
    return (
      questionEn.includes(topicLower) ||
      questionNl.includes(topicLower) ||
      answerEn.includes(topicLower) ||
      answerNl.includes(topicLower)
    );
  });
}
