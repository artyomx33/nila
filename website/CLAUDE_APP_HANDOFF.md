# Claude App - Website Starter Handoff

**From:** Claude Code CLI (Setup Phase)
**To:** Claude App (Development Phase)
**Status:** READY FOR CUSTOMIZATION

---

## What You're Receiving

A fully initialized, production-ready Next.js 16 website starter template with:

- ✅ **All Latest Dependencies** installed and verified
- ✅ **Configuration Complete** (next.config, tailwind, TypeScript, etc.)
- ✅ **Directory Structure Ready** (components, lib, public, .claude)
- ✅ **SEO Infrastructure** (metadata system, schemas, bilingual support)
- ✅ **Placeholder Pages** (Home, About, Services, Contact)
- ✅ **UI Components** (Button, Card, Container)
- ✅ **5 AI Agents** configured and ready
- ✅ **3 Slash Commands** for audits and optimization
- ✅ **Comprehensive Documentation**

---

## What to Do First

### 1. Start Development Server

```bash
cd your-project-name
npm run dev
```

Opens at http://localhost:3000

### 2. Follow GETTING_STARTED.md

**CRITICAL ORDER:**

1. **Update dependencies to latest** (don't skip this!)
   ```bash
   npm install next@latest react@latest react-dom@latest typescript@latest tailwindcss@latest --save
   ```

2. **Rename project**
   - Update package.json name
   - Replace "NEW_WEBSITE" → "Your Company Name"
   - Update app/layout.tsx metadata

3. **Customize branding**
   - Update colors in tailwind.config.ts
   - Update fonts in app/layout.tsx
   - Add your logo and images to public/

4. **Update SEO**
   - Edit lib/seo/metadata.ts with your domain and keywords
   - Edit lib/seo/schemas.ts with your business info
   - Create custom public/.well-known/gpt-site-prompt.txt
   - Update robots.txt with your sitemap

5. **Build your pages**
   - Customize Home, About, Services, Contact
   - Add new pages as needed
   - Update all placeholder content

6. **Test and deploy**
   - Run `npm run build` locally
   - Push to GitHub
   - Deploy to Vercel

---

## Build Phase Priority

### Phase 1: Brand & Content (First)

1. **Update metadata** in app/layout.tsx and lib/seo/metadata.ts
2. **Replace images** - Add your logo, hero images
3. **Update colors** - Customize color scheme in tailwind.config.ts
4. **Update content** - Replace all placeholder text

### Phase 2: Components & Pages (Second)

Pre-built placeholder pages ready to customize:
- **Home** (`app/page.tsx`) - Hero + intro + services + CTA
- **About** (`app/about/page.tsx`) - Story, mission, values, team
- **Services** (`app/services/page.tsx`) - Service grid, descriptions
- **Contact** (`app/contact/page.tsx`) - Form, info, map

UI Components ready to use:
- **Button** - Primary/secondary variants
- **Card** - With hover effects
- **Container** - Max-width wrapper

### Phase 3: SEO Optimization (Third)

1. **Update metadata.ts** - Page titles, descriptions, keywords
2. **Update schemas.ts** - Organization, LocalBusiness, Service schemas
3. **Create FAQ** - Add faq-content.ts with your Q&A
4. **Update alt-text.ts** - Image descriptions

### Phase 4: Performance & Lighthouse (Fourth)

1. Run `/performance-audit` slash command
2. Fix issues identified by performance-optimizer agent
3. Target: 90+ mobile, 95+ desktop Lighthouse scores

### Phase 5: Deploy (Fifth)

1. Push to GitHub
2. Vercel auto-deploys
3. Run `/security-audit` to verify security
4. Monitor with site-health-guardian agent

---

## Using Your AI Agents

This template includes 5 specialized agents:

### local-seo-dominator
Optimizes local SEO, Google Business Profile, location keywords

**When to use:** After completing content, before deployment

### performance-optimizer
Analyzes Core Web Vitals, load times, bundle sizes

**When to use:** Before final deployment, during optimization phase

### seo-watcher
Monitors SEO health, metadata, structured data, ranking opportunities

**When to use:** Ongoing - after content is live

### site-health-guardian
Ensures site reliability, security, broken links, overall health

**When to use:** Before and after deployment, ongoing monitoring

### dutch-translation-guardian
Validates and optimizes Dutch translations (if bilingual)

**When to use:** After adding Dutch translations

---

## Using Your Slash Commands

### /performance-audit
Comprehensive Lighthouse performance audit

```bash
/performance-audit
```

Reports on: Performance, SEO, Accessibility, Best Practices, Core Web Vitals

### /security-audit
Security vulnerability check and best practices

```bash
/security-audit
```

Reports on: Headers, HTTPS, Dependencies, Vulnerable patterns

### /vercel-deploy-optimize
Optimize deployment and edge functions for Vercel

```bash
/vercel-deploy-optimize
```

Includes: Caching strategy, compression, edge function setup

---

## Design System

### Colors

- **Primary:** Black (#000000) - Main brand color
- **Accent:** Blue (#3B82F6) - Easy to customize
- **Neutral:** Gray scale - Backgrounds, text

Update in `tailwind.config.ts`:
```ts
colors: {
  primary: '#000000',
  accent: '#3B82F6',
}
```

### Typography

- **Font:** Inter via next/font/google (already imported)
- **Headings:** Bold, 120% line height, semantic classes (.heading-xl, .heading-lg, etc.)
- **Body:** Regular, 150% line height
- **Semantic classes:** button-primary, text-muted, etc.

### Components

All use semantic class naming (no inline utilities like ml-32):

```tsx
// ✅ Good
<button className="button-primary">Click me</button>
<div className="heading-lg">Title</div>

// ❌ Avoid
<button className="ml-4 px-6 py-2">Click me</button>
```

### Spacing System

- Container: max-w-6xl
- Padding: px-4 (mobile) / px-8 (desktop)
- Sections: py-12 (mobile) / py-20 (desktop)
- Gaps: gap-4 to gap-12 depending on context

---

## Performance Targets

This template is optimized to achieve:

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ (mobile), 95+ (desktop) |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 98+ |
| Lighthouse Best Practices | 95+ |
| LCP (Largest Contentful Paint) | <2.5s |
| FID (First Input Delay) | <100ms |
| CLS (Cumulative Layout Shift) | <0.1 |

---

## File Structure

```
your-project/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout - UPDATE METADATA HERE
│   ├── page.tsx                 # Home page
│   ├── about/page.tsx           # About page (customize)
│   ├── services/page.tsx        # Services page (customize)
│   ├── contact/page.tsx         # Contact page (customize)
│   └── globals.css              # Global styles (Tailwind v4)
├── components/                   # Reusable components
│   ├── ui/                      # Button, Card, Container
│   ├── layout/                  # Header, Footer (placeholder)
│   └── sections/                # Section components (placeholder)
├── lib/                         # Utilities
│   ├── seo/                     # SEO infrastructure
│   │   ├── metadata.ts          # UPDATE: Your domain, keywords
│   │   ├── schemas.ts           # UPDATE: Your business info
│   │   ├── faq-content.ts       # UPDATE: Your FAQs
│   │   ├── content-strategy.ts  # Content pillars
│   │   └── alt-text.ts          # Image alt-text helpers
│   └── utils.ts                 # Generic utilities
├── public/                      # Static assets
│   ├── images/                  # ADD: Your images
│   ├── .well-known/
│   │   └── gpt-site-prompt.txt  # UPDATE: AI optimization
│   └── robots.txt               # UPDATE: Your domain
├── .claude/                     # Claude AI tools
│   ├── agents/                  # 5 specialized agents (ready)
│   │   ├── local-seo-dominator.md
│   │   ├── performance-optimizer.md
│   │   ├── seo-watcher.md
│   │   ├── site-health-guardian.md
│   │   └── dutch-translation-guardian.md
│   ├── commands/                # 3 slash commands (ready)
│   │   ├── performance-audit.md
│   │   ├── security-audit.md
│   │   └── vercel-deploy-optimize.md
│   └── settings.local.json      # Agent configuration
├── docs/                        # Documentation
│   ├── START_HERE.md
│   ├── SEO_GUIDE.md
│   └── DESIGN_SYSTEM.md
├── Configuration Files
│   ├── next.config.ts           # Next.js 16 + Turbopack
│   ├── tailwind.config.ts       # Design system
│   ├── tsconfig.json            # TypeScript strict
│   ├── postcss.config.mjs       # PostCSS (Tailwind v4)
│   ├── .eslintrc.json           # ESLint rules
│   ├── vercel.json              # Vercel deployment
│   ├── package.json             # Dependencies
│   └── README.md                # Project overview
└── GETTING_STARTED.md           # Step-by-step setup guide
```

---

## Important Constraints

⚠️ **DO update dependencies first** - This is critical for avoiding technical debt later. Always run:
```bash
npm install next@latest react@latest react-dom@latest typescript@latest tailwindcss@latest --save
```

⚠️ **TypeScript strict mode** - All code must pass `strict: true`. No `any` types.

⚠️ **Tailwind v4 syntax** - Uses `@import "tailwindcss"` in CSS, not `@tailwind` directives

⚠️ **Semantic class names** - Use `.button-primary`, NOT `.ml-32` or inline utilities

⚠️ **No webpack config** - Uses Turbopack (Next.js 16 default), no custom webpack needed

⚠️ **Bilingual ready** - metadata.ts supports en/nl languages, extend as needed

---

## Verification Steps

Before each phase, run:

```bash
npm run build          # Verify clean build
npm run lint           # Check code style
npm run type-check     # Verify TypeScript
npm run dev            # Check dev server starts
```

All should complete without errors.

---

## Deployment

### Push to GitHub

```bash
git add .
git commit -m "Customize: update metadata, branding, content"
git push origin main
```

### Auto-Deploy to Vercel

Once pushed to GitHub, Vercel auto-deploys (pre-configured)

### Manual Build Commands

```bash
npm run build    # Production build
npm start        # Test production build locally
```

---

## Reference Files

For additional context:

- `GETTING_STARTED.md` - Step-by-step setup instructions
- `docs/START_HERE.md` - Quick start guide
- `docs/SEO_GUIDE.md` - SEO implementation details
- `docs/DESIGN_SYSTEM.md` - Design system documentation
- `.claude/settings.local.json` - Agent configuration
- `tailwind.config.ts` - Design tokens and colors

---

## Next Actions (In Order)

1. ✅ Read GETTING_STARTED.md completely
2. ✅ Update all dependencies to latest
3. ✅ Rename project (package.json, find-replace)
4. ✅ Update metadata (app/layout.tsx, lib/seo/metadata.ts)
5. ✅ Add your brand (colors, logo, fonts)
6. ✅ Customize pages (Home, About, Services, Contact)
7. ✅ Add your content (text, images, info)
8. ✅ Run `/performance-audit` for optimization
9. ✅ Deploy to Vercel
10. ✅ Monitor with site-health-guardian

---

## You Now Have

✅ Production-ready Next.js 16 foundation
✅ Complete SEO infrastructure
✅ 5 AI agents for optimization
✅ 3 slash commands for audits
✅ Placeholder pages with design system
✅ Comprehensive documentation
✅ Zero technical debt (all latest versions)

**Start customizing and build something amazing!** 🚀

---

*Handoff from Claude Code CLI Setup Phase*
*Ready for Claude App Development Phase*
*Created: November 30, 2025*
