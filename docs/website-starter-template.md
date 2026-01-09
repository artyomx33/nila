# NEW_WEBSITE_STARTER Template Analysis

> **Source**: `/Users/artyomx/projects/NEW_WEBSITE_STARTER`
> **Purpose**: Base template for NILA website with SEO + geo structure

---

## Key Features for NILA

### 1. Tech Stack (Already Perfect)
- Next.js 16 with Turbopack
- React 19
- Tailwind CSS v4
- Framer Motion
- TypeScript strict mode
- Vercel Analytics + Speed Insights

### 2. SEO System (Comprehensive)
- Bilingual support (EN/NL → adapt to EN/ES for NILA)
- JSON-LD schemas for all page types
- Alt-text generation system
- FAQ structured data
- Voice search optimization
- Blog post framework with internal linking

### 3. Component Architecture
```
components/
├── layout/          # Header, Footer
├── sections/        # Page-specific sections (26 components)
└── ui/              # Button, Card, Container, Icons
```

### 4. Content-as-TypeScript Pattern
```
lib/content/
├── home.ts          # Hero, services, testimonials
├── about.ts         # Team, story, values
├── services.ts      # Service listings
├── contact.ts       # Contact info, form
└── fleet.ts         # Industry-specific page
```

### 5. SEO Library
```
lib/seo/
├── metadata.ts      # Next.js metadata generation
├── schemas.ts       # JSON-LD schema generators
├── alt-text.ts      # Bilingual alt-text builder
├── content-strategy.ts  # Blog planning
└── faq-content.ts   # 650+ FAQ items
```

---

## NILA Adaptation Plan

### Colors to Change
```typescript
// FROM (TeddyFix)
teddy: "#FF5C5C"      // Red
wood: "#8B6F47"       // Brown
concrete: "#9E9E9E"   // Gray

// TO (NILA - Bacalar inspired)
nila: "#0D9488"       // Teal primary
lagoon: "#115E59"     // Deep teal
sand: "#F59E0B"       // Gold accent
charcoal: "#18181B"   // Dark background
```

### Language to Change
```typescript
// FROM
type Language = 'en' | 'nl'

// TO
type Language = 'en' | 'es'
```

### Content Files to Create
```
lib/content/
├── home.ts           # Hero, value prop, services overview
├── about.ts          # Founders, story, values
├── services.ts       # 4 services overview
├── services/
│   ├── maintenance.ts
│   ├── rentals.ts
│   ├── design.ts
│   └── hoa.ts
├── portfolio.ts      # Properties gallery
├── sustainability.ts # Environmental commitment
└── contact.ts        # Contact info
```

### SEO Schemas to Adapt
- Organization → NILA Estate Management
- LocalBusiness → Bacalar/Riviera Maya locations
- Service → Property management services
- FAQPage → Property owner FAQs
- Person → Bernadette + Juan Francisco profiles

### Pages to Create
```
app/
├── page.tsx                    # Home
├── nosotros/page.tsx           # About
├── servicios/
│   ├── page.tsx                # Services overview
│   ├── mantenimiento/page.tsx  # Maintenance
│   ├── rentas/page.tsx         # Rental management
│   ├── diseno/page.tsx         # Interior design
│   └── hoa/page.tsx            # HOA management
├── portafolio/page.tsx         # Portfolio
├── sostenibilidad/page.tsx     # Sustainability
├── contacto/page.tsx           # Contact
└── propietarios/page.tsx       # → Link to app portal
```

---

## Files to Copy Directly

### Keep As-Is
- `postcss.config.mjs`
- `tsconfig.json`
- `.eslintrc.json`
- `.gitignore`
- `vercel.json` (update headers if needed)
- `.husky/` folder

### Modify Slightly
- `package.json` - Change name, add any deps
- `tailwind.config.ts` - Change colors
- `next.config.ts` - Keep structure

### Rewrite Completely
- `lib/content/*` - All NILA content
- `lib/seo/*` - NILA-specific SEO
- `components/sections/*` - NILA page sections
- `app/*` - NILA pages

---

## Implementation Steps

1. **Copy template to `/NILA/website/`**
2. **Update `package.json`** - name: "nila-website"
3. **Update `tailwind.config.ts`** - NILA colors
4. **Update `lib/seo/metadata.ts`** - NILA metadata
5. **Create content files** from website-content-analysis.md
6. **Build page sections** following CafeTabs design DNA
7. **Add NILA-specific images** to `/public/images/`

---

## Template Statistics

| Metric | Value |
|--------|-------|
| Components | 31+ |
| Pages | 6 |
| FAQ Items | 650+ |
| Blog Posts Pre-planned | 6 |
| Languages | 2 (EN/NL) |
| Dependencies | 7 runtime, 11 dev |

---

*Analyzed: 2026-01-08*
