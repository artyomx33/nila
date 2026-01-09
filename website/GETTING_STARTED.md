# Getting Started with Website Starter Template

Welcome! This is a universal, production-ready website starter template. Follow these steps to customize it for your project.

## Step 1: Clone This Template

Copy this entire folder to your new project:

```bash
cp -r NEW_WEBSITE_STARTER your-project-name
cd your-project-name
```

## Step 2: Update All Dependencies to Latest

**CRITICAL**: Always update to latest versions before starting development. This ensures you avoid technical debt:

```bash
npm install next@latest react@latest react-dom@latest typescript@latest tailwindcss@latest framer-motion@latest --save
npm install --save-dev @tailwindcss/postcss@latest @types/node@latest @types/react@latest @types/react-dom@latest
```

## Step 3: Rename Project

1. Update `package.json`:
   - Change `"name"` from `"new-website-starter"` to `"your-project-name"`
   - Update description

2. Find and replace throughout the project:
   - Replace `"NEW_WEBSITE"` → `"Your Company Name"`
   - Replace `"New Website"` → `"Your Website Title"`
   - Replace `example.com` → `your-domain.com`

3. Update metadata in `app/layout.tsx`:
   ```tsx
   title: "Your Company | Your Tagline"
   description: "Your company description"
   keywords: ["your keywords"]
   ```

## Step 4: Customize Branding

1. **Colors** - Update `tailwind.config.ts`:
   ```ts
   colors: {
     primary: '#YOUR_COLOR',
     accent: '#YOUR_ACCENT',
   }
   ```

2. **Fonts** - Update `app/layout.tsx`:
   ```tsx
   const font = YourFont({ subsets: ["latin"] })
   ```

3. **Images** - Replace placeholder images in `public/images/`

4. **Logo** - Add your logo to `public/`

## Step 5: Update SEO Infrastructure

1. **Customize metadata** - Edit `lib/seo/metadata.ts`:
   ```ts
   export const BASE_URL = 'https://www.your-domain.com'
   export const SITE_NAME = 'Your Company'
   export const DEFAULT_TITLE = 'Your Company | Your Tagline'
   export const DEFAULT_DESCRIPTION = 'Your description'
   
   // Update PAGE_METADATA with your specific pages and keywords
   export const PAGE_METADATA = {
     home: { ... },
     about: { ... },
     services: { ... },
     contact: { ... }
   }
   ```

2. **Update schemas** - Edit `lib/seo/schemas.ts`:
   ```ts
   // Update Organization schema with your business info
   // Update LocalBusiness schema with your location/hours
   ```

3. **Create AI optimization** - Edit `public/.well-known/gpt-site-prompt.txt`:
   - Customize instructions for AI to better understand your site
   - Include your business context and key information

4. **Update robots.txt** - Edit `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://www.your-domain.com/sitemap.xml
   ```

## Step 6: Build Your Pages

The template includes placeholder pages. Customize them:

- **Home** (`app/page.tsx`) - Hero, intro, services, CTA
- **About** (`app/about/page.tsx`) - Your story, mission, values, team
- **Services** (`app/services/page.tsx`) - Your service offerings
- **Contact** (`app/contact/page.tsx`) - Contact form, info, map

Add more pages as needed:
```bash
mkdir -p app/your-page
# Create page.tsx in the new directory
```

## Step 7: Use AI Agents

This template includes 5 specialized AI agents in `.claude/agents/`:

1. **local-seo-dominator** - Optimizes local SEO and Google Business
2. **performance-optimizer** - Improves Core Web Vitals and speed
3. **seo-watcher** - Monitors SEO health and opportunities
4. **site-health-guardian** - Ensures reliability and security
5. **dutch-translation-guardian** - Optimizes Dutch translations (if bilingual)

And 3 slash commands in `.claude/commands/`:
- `/performance-audit` - Run Lighthouse audit
- `/security-audit` - Check security issues
- `/vercel-deploy-optimize` - Optimize Vercel deployment

## Step 8: Start Development

```bash
npm run dev
```

Opens at http://localhost:3000

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit: customize website"
git push origin main
```

2. Vercel auto-deploys (if linked)

Or deploy manually:
```bash
npm run build
vercel deploy --prod
```

## Performance Targets

This template is built to achieve:
- Lighthouse Performance: 90+ mobile, 95+ desktop
- Lighthouse SEO: 100
- Lighthouse Accessibility: 98+
- Lighthouse Best Practices: 95+
- LCP: <2.5s
- CLS: <0.1

## Design System

The template includes a complete design system with:

**Colors:**
- Primary: Black (#000000)
- Accent: Blue (#3B82F6) - easily customizable
- Neutral: Gray scale

**Typography:**
- Font: Inter via next/font/google
- Headings: Bold, 120% line height
- Body: Regular, 150% line height

**Components:**
- Button (primary/secondary variants)
- Card (with hover effects)
- Container (max-width wrapper)
- Sections (with semantic classes)

**Spacing:**
- Container: max-w-6xl
- Padding: 4 (mobile) / 8 (desktop)
- Sections: py-12 (mobile) / py-20 (desktop)

## File Structure

```
your-project/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── services/page.tsx  # Services page
│   ├── contact/page.tsx   # Contact page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Button, Card, Container
│   ├── layout/           # Header, Footer
│   └── sections/         # Section components
├── lib/seo/              # SEO infrastructure
│   ├── metadata.ts       # Metadata system
│   ├── schemas.ts        # JSON-LD schemas
│   ├── faq-content.ts    # FAQ data
│   ├── content-strategy.ts # Content guidelines
│   └── alt-text.ts       # Alt-text helpers
├── public/               # Static assets
│   ├── images/           # Your images
│   ├── .well-known/      # AI optimization
│   └── robots.txt        # SEO robots file
├── .claude/              # Claude AI tools
│   ├── agents/           # 5 specialized agents
│   ├── commands/         # 3 slash commands
│   └── settings.local.json # Agent configuration
└── Configuration Files
    ├── next.config.ts     # Next.js config
    ├── tailwind.config.ts # Design system
    ├── tsconfig.json      # TypeScript config
    └── package.json       # Dependencies
```

## Important Notes

⚠️ **Update dependencies first** - Don't skip Step 2! Using latest versions prevents technical debt.

⚠️ **Customize metadata** - Update all placeholder metadata with your actual business info.

⚠️ **Test before deploying** - Run `npm run build` and `npm run lint` locally.

⚠️ **Add your content** - Replace all "Placeholder" text with your real content.

✅ **TypeScript strict mode** - All code must pass `strict: true`

✅ **Semantic class names** - Use `button-primary`, NOT utility classes like `ml-32`

✅ **Tailwind v4** - Uses `@import "tailwindcss"` in CSS files

## Next Steps

1. Complete all 8 steps above
2. Run `npm run build` to verify clean build
3. Run `npm run dev` to test locally
4. Use the 5 agents to optimize your site
5. Deploy to Vercel
6. Monitor with site-health-guardian agent

## Support

- Refer to `CLAUDE_APP_HANDOFF.md` for detailed development guide
- Check `docs/` folder for design system and SEO guides
- Use agents to optimize your site

---

**Happy building! You now have a production-ready website foundation. 🚀**
