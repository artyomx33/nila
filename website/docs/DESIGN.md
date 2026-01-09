# TeddyFix Website Design Document

## Brand Overview

**Business:** Premium auto repair garage
**Location:** Leiden, Netherlands
**Specialization:** Taxi fleet maintenance, ceramic coating, premium services
**Parent Brand:** TeddyKids (trusted by 500+ families)

### Brand Voice
- Professional but approachable
- Speed + reliability + respect
- Premium quality
- Local expertise

### Tagline Ideas
- "Trusted Garage Services. Lightning-Fast Turnaround."
- "More Than a Garage — TeddyFix Is Your Pit Crew."
- "We turn metal into speed."

---

## Three Target Audiences

TeddyFix serves **three distinct customer segments**:

1. **Families & Daily Drivers** - Smart service for parents, everyday car owners
2. **Taxi Fleets** - Tactical, efficient repair for professional drivers
3. **Performance Enthusiasts** - High-performance prep for speed chasers

---

## Service Categories

### 1. Maintenance & Repair

**Tagline:** "Drive smooth. Stay safe. Fix fast."

For daily drivers, parents, taxis — people who want their car to run smooth, safe, and without surprises.

**Sub-services:**
- Vehicle diagnostics + troubleshooting advice
- Repair of chassis
- Repair of braking system
- Engine repairs / component replacement
- Electronics component repairs
- Small part replacement (bulbs, filters, batteries, etc.)

**Implementation:**
- Simple card grid — icon, title, 2-line summary
- Each card expandable or links to `/services`
- Include checkmarks, short FAQ-style benefits

---

### 2. Detailing & Preservation

**Tagline:** "Make your car look — and stay — new."

For car lovers who care how their vehicle feels and looks — premium car owners and fleet leaders.

**Sub-services:**
- Headlight & brake light detailing
- Paint scratch removal
- Ceramic coating (paint + windows)

**Implementation:**
- Before/after images or sliders
- Simple explainer graphics (rain beads off, UV protected, scratch-resistant)
- Highlight long-term benefits: resale value, visual brand, less washing

---

### 3. Tuning & Performance Upgrades

**Tagline:** "Why is standard not enough?"

For adrenaline-fueled drivers. Building machines with purpose — street or race.

**Sub-services:**
- Engine tuning (intake, turbocharger, exhaust)
- Brake system tuning
- Exhaust system tuning
- Body kit tuning / aesthetic upgrades
- Full racing car prep (FIA compliance)

**Implementation:**
- Custom car photos, dyno stats, videos if possible
- Quote callout: "We turn metal into speed."
- Optional: separate sub-page for Motorsport clients

---

## Website Structure

### Pages

```
/                     → Home (landing page)
/services             → Services overview
  /services/maintenance      → Maintenance & Repair details
  /services/detailing        → Detailing & Ceramic Coating
  /services/performance      → Performance & Tuning
/fleet-taxi           → Fleet/Taxi dedicated page
/about                → Story, team, certifications
/testimonials         → Customer reviews, before/after
/gallery              → Workshop, cars, staff photos
/contact              → Form, WhatsApp, map, hours
/faq                  → Optional Q&A page
```

---

## Home Page Sections

| # | Section | Purpose | Component |
|---|---------|---------|-----------|
| 1 | Hero | First impression, instant CTA | `<HeroSection />` |
| 2 | Intro / Mission | Why we exist, what we solve | `<IntroSection />` |
| 3 | Services Snapshot | Overview of 3 core services | `<ServicesGrid />` |
| 4 | Fleet / Taxi Highlight | Direct CTA to fleet owners | `<FleetTeaser />` |
| 5 | Testimonials | Proof of trust | `<TestimonialSlider />` |
| 6 | CTA / Booking | Final push to book or contact | `<CallToAction />` |

---

## Home Page Content

### Section 1: Hero

**Headline:**
"Trusted Garage Services. Lightning-Fast Turnaround."

**Subheadline:**
From family cars to taxi fleets — TeddyFix delivers clean, precise, high-trust service that gets you back on the road, fast.

**CTA Buttons:**
- "Book Your Service" → WhatsApp deep link
- "Talk to a Mechanic" → tel:+31...

**Background:**
Full-width image or Three.js rotating pink Tesla (optional)
Overlay matte black / wood tone gradient

---

### Section 2: Intro / Mission

**Header:**
"More Than a Garage — TeddyFix Is Your Pit Crew."

**Text:**
We're built by the team behind Teddy Kids — trusted by over 500 families and the drivers who power Leiden.

Whether it's your everyday car, a high-performance machine, or a working taxi, we deliver expert repair, detailing, and upgrades with zero guesswork and maximum respect for your time.

---

### Section 3: Services Snapshot

**Header:**
"What We Do Best"

**Cards:**

1. **Maintenance & Repair**
   - Icon: wrench
   - "Diagnostics, brakes, chassis, electronics."
   - CTA: "Learn More" → `/services/maintenance`

2. **Detailing & Ceramic Coating**
   - Icon: sparkle
   - "Paint correction, headlight polish, full-body ceramic."
   - CTA: "Learn More" → `/services/detailing`

3. **Performance & Tuning**
   - Icon: racing flag
   - "Turbo upgrades, brake systems, full FIA race prep."
   - CTA: "Learn More" → `/services/performance`

---

### Section 4: Fleet / Taxi Teaser

**Header:**
"Trusted by Taxi Fleets Across Leiden"

**Text:**
We get it — time off the road is money lost. TeddyFix offers dedicated service lanes, fast repairs, and maintenance bundles designed for taxis and fleet owners.

Already serving Leiden's taxi leaders — and ready for more.

**Button:**
"Fleet Solutions" → `/fleet-taxi`

---

### Section 5: Testimonials

**Quotes:**

> "Cleanest garage I've ever seen — they fixed it same day."
> — Boris, Taxi Driver

> "After ceramic coating, my car looks brand new."
> — Lara, Teddy Parent

Display: Rotate 2-3 in a slider or static quote box

---

### Section 6: Final CTA

**Header:**
"Let's Get You Back on the Road."

**CTA Buttons:**
- "Book Now via WhatsApp"
- "Call TeddyFix"

**Text:**
Need something custom? From diagnostics to deep upgrades — we're ready. Drop us a message and we'll take it from there.

---

## Quick Banners / Microcopy

- **Quick Fixes:** "Light out? Engine light on? We do fast, clean replacements while you wait."
- **Trusted by Professionals:** "Our clients include taxi fleets, family cars, and performance drivers."
- **Speed Obsessed:** "Our tuning programs are built from years of experience in racing prep."

---

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Black | #000000 | Text, buttons |
| Teddy Pink | #FF5C5C | Accent, highlights |
| Wood Tone | #8B6F47 | Warm accents |
| Concrete | #9E9E9E | Secondary text |
| White | #FFFFFF | Backgrounds |

### Typography

- **Primary Font:** Inter, DM Sans
- **Headings:** Bold, 120% line height
- **Body:** Regular/Medium, relaxed spacing

### Buttons

- **Primary:** Black bg, white text, 4px radius, soft shadow
- **Secondary:** Transparent bg, black border, 4px radius

### Animations

- **Tool:** Framer Motion
- **Timing:** 400-1200ms smooth transitions
- **Trigger:** Scroll-based reveals
- **Optional:** Three.js hero (pink Tesla) - lazy-loaded, desktop only

---

## Component Architecture

### Wrapper Structure

```tsx
<section className="section-wrapper" id="section-name">
  <div className="section-inner">
    {/* Content here */}
  </div>
</section>
```

### Semantic Classes (from globals.css)

- `.section-wrapper` - Full-width section container
- `.section-inner` - Max-width 6xl with padding
- `.button-primary` - Primary CTA button
- `.button-secondary` - Secondary button
- `.heading-xl` - Hero headings (4xl/6xl)
- `.heading-lg` - Section headings (3xl/4xl)
- `.heading-md` - Subsection headings (2xl/3xl)
- `.subtext-md` - Paragraph text (lg/xl gray)
- `.card-service` - Service card styling
- `.testimonial-card` - Testimonial card styling

---

## Performance Targets

| Metric | Mobile | Desktop |
|--------|--------|---------|
| Lighthouse Performance | 90+ | 95+ |
| Lighthouse SEO | 100 | 100 |
| Lighthouse Accessibility | 98+ | 98+ |
| LCP | <2.5s | <2.5s |
| FID | <100ms | <100ms |
| CLS | <0.1 | <0.1 |

---

## Footer Structure

- Location (Leiden, Netherlands)
- Phone number
- WhatsApp link
- Navigation: Home / Services / Fleet / About / Contact
- TeddyFix logo/icon

---

## Technical Notes

- All content lives in `/lib/content/`
- Images in `/public/images/` (WebP/AVIF only)
- Components in `/components/ui/` and `/components/sections/`
- SEO infrastructure in `/lib/seo/`
- Mobile-first responsive design
- TypeScript strict mode required
