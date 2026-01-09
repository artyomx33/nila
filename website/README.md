# Website Starter Template 🚀

**Universal, Production-Ready Website Starter**

A complete, high-performance website template with SEO infrastructure, AI agents, design system, and placeholder pages ready for any business.

## Tech Stack (All Latest)

- **Framework:** Next.js 16.0.5 (with Turbopack)
- **React:** 19.2.0
- **TypeScript:** 5.9.3
- **Styling:** Tailwind CSS 4.1.17 + @tailwindcss/postcss
- **Animation:** Framer Motion 12.23.24
- **Hosting:** Vercel (Amsterdam region - arn1)
- **Analytics:** Vercel Analytics & Speed Insights

## Project Structure

```
your-project/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout (UPDATE metadata)
│   ├── page.tsx           # Home page (customize)
│   ├── about/page.tsx     # About page (customize)
│   ├── services/page.tsx  # Services page (customize)
│   ├── contact/page.tsx   # Contact page (customize)
│   └── globals.css        # Global styles (Tailwind v4)
├── components/            # Reusable components
│   ├── ui/               # Button, Card, Container (ready)
│   ├── layout/           # Header, Footer (placeholder)
│   └── sections/         # Section components (placeholder)
├── lib/                   # Utilities
│   ├── seo/              # SEO infrastructure (complete)
│   │   ├── metadata.ts   # UPDATE: your domain, keywords
│   │   ├── schemas.ts    # UPDATE: your business info
│   │   ├── faq-content.ts # UPDATE: your FAQs
│   │   ├── content-strategy.ts # Content guidelines
│   │   └── alt-text.ts   # Image alt-text helpers
│   └── utils.ts          # Utilities
├── public/               # Static assets
│   ├── images/           # ADD: your images
│   ├── .well-known/      # AI optimization (update)
│   └── robots.txt        # SEO robots (update)
├── docs/                 # Documentation
│   ├── START_HERE.md     # Quick start
│   ├── SEO_GUIDE.md      # SEO guide
│   └── DESIGN_SYSTEM.md  # Design system
├── .claude/              # Claude AI tools
│   ├── agents/           # 5 specialized agents (ready)
│   ├── commands/         # 3 slash commands (ready)
│   └── settings.local.json # Agent config
└── [config files]        # next.config.ts, tailwind.config.ts, etc.
```

## Target Performance Scores

- **Lighthouse Performance:** 95+ (desktop), 90+ (mobile)
- **SEO:** 100/100
- **Accessibility:** 98+/100
- **Best Practices:** 95+/100

## Design Guidelines

### Color Palette
- **Primary Black:** #000000
- **Accent Blue:** #3B82F6 (easily customizable)
- **Neutral:** Gray scale (#F5F5F5 to #1F1F1F)

### Typography
- **Font Family:** Inter (via next/font/google)
- **Approach:** Clean, professional, accessible

### Class Naming Conventions
Use semantic names, NOT numeric utilities:
- ✅ `button-primary`, `hero-section`, `card-service`
- ❌ `ml-32`, `w-1440`, `h-120`

### Button Styles
- Rounded 4px
- Soft shadows (no borders)
- Primary: black bg, white text
- Secondary: transparent bg, black border

### Animation
- **Tool:** Framer Motion
- **Timing:** Smooth transitions (400-1200ms easing)
- **Strategy:** Scroll-triggered fades and slides
- **Optional:** Three.js hero (pink Tesla) - lazy-loaded desktop only

## Core Pages (Included)

- **Home (`/`)** - Hero section with intro and CTA (customize with your content)
- **About (`/about`)** - Company story, mission, values, team section
- **Services (`/services`)** - Service grid with 6 placeholder services
- **Contact (`/contact`)** - Contact form, information, and map placeholder

Additional pages can be added by creating new directories in `app/`

## SEO Infrastructure (Included)

- **Metadata System:** Complete, bilingual-ready metadata in `lib/seo/metadata.ts`
- **Schemas:** Organization, LocalBusiness, Service schema generators
- **Bilingual Support:** English & Dutch (easily customizable to other languages)
- **AI Optimization:** `.well-known/gpt-site-prompt.txt` template included
- **Content Strategy:** Pillar-based content framework in `content-strategy.ts`
- **Alt-Text Helpers:** Image optimization utilities ready to use

## Development Scripts

```bash
npm run dev              # Start dev server with Turbopack
npm run build            # Production build
npm run start            # Run production server
npm run lint             # ESLint check
npm run lint:fix         # Auto-fix lint issues
npm run type-check       # TypeScript check
```

## Environment Setup

### Required Environment Variables
None currently (add as needed for Resend email, analytics, etc.)

### Install Dependencies
```bash
npm install
```

### Start Development
```bash
npm run dev
# Open http://localhost:3000
```

## AI Agents & Commands (Included)

**5 Specialized AI Agents** (in `.claude/agents/`):
- **local-seo-dominator** - Optimizes local SEO and Google Business Profile
- **performance-optimizer** - Analyzes and improves Core Web Vitals and load times
- **seo-watcher** - Monitors SEO health, metadata, and ranking opportunities
- **site-health-guardian** - Ensures reliability, security, and overall site health
- **dutch-translation-guardian** - Validates Dutch translations (for bilingual sites)

**3 Slash Commands** (in `.claude/commands/`):
- `/performance-audit` - Run comprehensive Lighthouse audit
- `/security-audit` - Check for security vulnerabilities
- `/vercel-deploy-optimize` - Optimize Vercel deployment

## Getting Started (Next Steps)

1. **Read GETTING_STARTED.md** - Step-by-step setup guide
2. **Update dependencies** - Critical first step
3. **Customize metadata** - Update your domain, keywords, business info
4. **Add your branding** - Colors, fonts, logo, images
5. **Update pages** - Customize Home, About, Services, Contact
6. **Deploy** - Push to GitHub for Vercel auto-deploy
7. **Optimize** - Use agents to improve SEO and performance

See `GETTING_STARTED.md` for detailed instructions.

For complete development guide, see `CLAUDE_APP_HANDOFF.md`

## Building & Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
Push to GitHub - Vercel auto-deploys:
```bash
git push origin main
```

## Performance Checklist

- [ ] Hero images use `priority` attribute
- [ ] Below-fold images use `loading="lazy"`
- [ ] All images in WebP/AVIF format
- [ ] JS bundle < 200KB
- [ ] CSS < 50KB
- [ ] Fonts optimized with `next/font`
- [ ] LCP < 2.5s, FID < 100ms, CLS < 0.1

## Key Files Reference

**Configuration:**
- `next.config.ts` - Next.js optimization
- `tsconfig.json` - TypeScript config (strict mode)
- `tailwind.config.ts` - Design system
- `vercel.json` - Vercel deployment

**Styles:**
- `app/globals.css` - Global Tailwind setup
- Component-level CSS via Tailwind classes

**Docs:**
- `DEVELOPMENT_GUIDE.md` (coming)
- `SEO_GEO_IMPLEMENTATION.md` (coming)
- `QUICK_CHECKLIST.md` (coming)

## What's Included

✅ **Next.js 16.0.5** with Turbopack and latest dependencies
✅ **Production-ready configuration** - Security headers, image optimization, compression
✅ **Complete SEO infrastructure** - Metadata system, schemas, bilingual support
✅ **Design system** - Colors, typography, semantic component classes
✅ **Placeholder pages** - Home, About, Services, Contact (ready to customize)
✅ **UI components** - Button, Card, Container
✅ **5 AI agents** - SEO, Performance, Health, Security, Translation
✅ **3 slash commands** - Audits and optimization tools
✅ **Comprehensive documentation** - Setup guides, design system, SEO guide
✅ **Zero project-specific code** - 100% generic and reusable
✅ **Zero technical debt** - All dependencies at latest versions

---

**Status:** ✅ **UNIVERSAL TEMPLATE COMPLETE - READY FOR CUSTOMIZATION**

**Last Updated:** November 30, 2025

**Perfect for:** Building professional websites in minutes with production-ready foundation
