# TeddyFix Website Development TODO

## Current Status: Phase 2 - Building Components

---

## Phase 1: Foundation (COMPLETE)

- [x] Project setup with Next.js 16, React 19, TypeScript 5.9
- [x] Tailwind CSS v4 configured
- [x] Security headers and image optimization
- [x] Directory structure created
- [x] Git initialized
- [x] Documentation written

---

## Phase 2: Core Components & Home Page

### Shared Components

- [ ] `Header` - Sticky navigation with mobile toggle
- [ ] `Footer` - Nav links, contact info, social media
- [ ] `Button` - Primary and secondary variants

### Home Page Sections

- [ ] `HeroSection` - Hero image, H1, subtitle, dual CTAs
- [ ] `IntroSection` - Mission statement, trust signals
- [ ] `ServicesGrid` - 3 service category cards
- [ ] `FleetTeaser` - Fleet/taxi highlight with CTA
- [ ] `TestimonialSlider` - Customer quotes carousel
- [ ] `CallToAction` - Final booking CTA section

### Content Files

- [ ] `/lib/content/home.ts` - Home page copy
- [ ] `/lib/content/services.ts` - Service descriptions
- [ ] `/lib/content/testimonials.ts` - Customer quotes

---

## Phase 3: Service Pages

- [ ] `/services` - Services overview page
- [ ] `/services/maintenance` - Maintenance & Repair details
- [ ] `/services/detailing` - Detailing & Ceramic Coating
- [ ] `/services/performance` - Performance & Tuning

### Service Components

- [ ] `ServiceCard` - Icon + label + description
- [ ] `ServiceDetail` - Full service page layout
- [ ] `PricingTable` - Optional pricing display

---

## Phase 4: Additional Pages

- [ ] `/fleet-taxi` - Fleet services, priority appointments, contracts
- [ ] `/about` - Story, team bios, certifications
- [ ] `/testimonials` - Full testimonials page with ratings
- [ ] `/gallery` - Workshop, cars, before/after photos
- [ ] `/contact` - Form, WhatsApp CTA, map, hours
- [ ] `/faq` - Optional FAQ page

### Supporting Components

- [ ] `ContactForm` - Name, phone, message fields
- [ ] `GalleryBlock` - Image grid layout
- [ ] `FleetTable` - Fleet pricing/bundles table
- [ ] `FAQAccordion` - Expandable Q&A

---

## Phase 5: SEO Infrastructure

- [ ] Copy SEO utilities from TeddyKids (`/lib/seo/`)
- [ ] `metadata.ts` - Page metadata generator
- [ ] `schemas.ts` - Organization, LocalBusiness, Service schemas
- [ ] `faq-content.ts` - FAQ structured data
- [ ] `alt-text.ts` - Image alt-text helpers

### SEO Files

- [ ] `public/robots.txt`
- [ ] `public/sitemap.xml` (dynamic generation)
- [ ] `public/.well-known/gpt-site-prompt.txt`

### Per-Page SEO

- [ ] Add `generateMetadata()` to each page
- [ ] Global Organization schema in `app/layout.tsx`
- [ ] Page-specific schemas (LocalBusiness, Service, FAQPage)

---

## Phase 6: AI Agents & Commands

### Agents (copy from TeddyKids)

- [ ] `local-seo-dominator.md`
- [ ] `performance-optimizer.md`
- [ ] `seo-watcher.md`
- [ ] `site-health-guardian.md`
- [ ] `translation-guardian.md`
- [ ] `vercel-specialist.md`

### Slash Commands

- [ ] `performance-audit.md`
- [ ] `security-audit.md`
- [ ] `vercel-deploy-optimize.md`

### Configuration

- [ ] `.claude/settings.local.json`

---

## Phase 7: Optimization & Launch

### Performance

- [ ] Hero images: use `priority` attribute
- [ ] Below-fold images: use `loading="lazy"`
- [ ] All images: WebP/AVIF only
- [ ] JS bundle: < 200KB
- [ ] CSS: < 50KB
- [ ] Font optimization with `next/font`

### Testing

- [ ] Lighthouse audit (mobile 90+, desktop 95+)
- [ ] Core Web Vitals verification
- [ ] Google Rich Results Test
- [ ] Mobile responsiveness check
- [ ] Cross-browser testing

### Launch

- [ ] Final content review
- [ ] Deploy to Vercel
- [ ] Verify auto-deploy on git push
- [ ] Submit sitemap to Google Search Console

---

## Service Categories Reference

### 1. Maintenance & Repair
- Vehicle diagnostics + troubleshooting
- Chassis repair
- Braking system repair
- Engine repairs / component replacement
- Electronics component repairs
- Small part replacement (bulbs, filters, batteries)

### 2. Detailing & Preservation
- Headlight & brake light detailing
- Paint scratch removal
- Ceramic coating (paint + windows)

### 3. Performance & Tuning
- Engine tuning (intake, turbocharger, exhaust)
- Brake system tuning
- Exhaust system tuning
- Body kit tuning / aesthetic upgrades
- Full racing car prep (FIA compliance)

---

## Quick Reference

**Dev Server:** `npm run dev` → http://localhost:3000
**Build:** `npm run build`
**Type Check:** `npm run type-check`
**Lint:** `npm run lint`

**Design Doc:** `/docs/DESIGN.md`
**Content:** `/lib/content/`
**Components:** `/components/`
**Pages:** `/app/`
