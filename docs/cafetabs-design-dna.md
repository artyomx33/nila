# CafeTabs Design DNA - Comprehensive Analysis

> **Source Project**: `/Users/artyomx/projects/cafetab`
> **Purpose**: Blueprint for NILA's design system (adapted: teal primary instead of gold)

---

## 1. PROJECT STRUCTURE

```
cafetab/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── admin/                    # Admin dashboard routes
│   │   │   ├── kitchen/
│   │   │   ├── products/
│   │   │   ├── sellers/
│   │   │   ├── settings/
│   │   │   └── tables/
│   │   ├── seller/                   # Seller/staff routes
│   │   │   ├── orders/
│   │   │   └── tables/[tableId]/
│   │   ├── table/[qr]/               # Customer-facing QR routes
│   │   │   ├── menu/
│   │   │   ├── pay/
│   │   │   └── tab/
│   │   ├── tab/[code]/               # Tab lookup by code
│   │   ├── demo/                     # Demo page
│   │   ├── layout.tsx                # Root layout with fonts
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Global styles + design tokens
│   │
│   ├── components/
│   │   ├── ui/                       # 28 reusable UI components
│   │   │   ├── action-card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── cart-review-drawer.tsx
│   │   │   ├── category-toggle.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── filter-pills.tsx
│   │   │   ├── glow.tsx              # Custom glow effect
│   │   │   ├── icon-box.tsx
│   │   │   ├── input.tsx
│   │   │   ├── list-row.tsx
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── order-drawer.tsx
│   │   │   ├── order-ticket.tsx
│   │   │   ├── pin-input.tsx
│   │   │   ├── product-modal.tsx
│   │   │   ├── product-tile.tsx
│   │   │   ├── quantity-selector.tsx
│   │   │   ├── stat-card.tsx
│   │   │   ├── table-card.tsx
│   │   │   ├── tab-type-modal.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   ├── toast.tsx
│   │   │   └── index.ts
│   │   ├── admin/
│   │   ├── seller/
│   │   ├── client/
│   │   └── theme-provider.tsx
│   │
│   ├── config/
│   │   ├── site.ts                   # Site metadata
│   │   └── theme.ts                  # Brand color palette
│   │
│   ├── stores/
│   │   ├── index.ts
│   │   ├── cart-store.ts             # Zustand cart management
│   │   ├── seller-store.ts
│   │   ├── theme-store.ts
│   │   └── ui-store.ts
│   │
│   ├── lib/
│   │   ├── actions/                  # Server actions
│   │   ├── supabase/
│   │   ├── auth/
│   │   ├── mock/
│   │   ├── utils/
│   │   └── utils.ts                  # cn() utility
│   │
│   └── types/
│       ├── index.ts
│       └── seller.ts
│
├── supabase/
├── public/
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 2. DESIGN SYSTEM

### Color Palette (Original CafeTabs)

```css
/* Primary Background - DARK THEME */
--background: #0D0D0F (Charcoal 950)
--foreground: #FFFFFF

/* Primary Brand - GOLD */
--primary: #C9A962
--primary-foreground: #0D0D0F

/* Secondary - TEAL */
--secondary: #4ECDC4
--secondary-foreground: #0D0D0F

/* Accent - GOLD */
--accent: #C9A962
--accent-foreground: #0D0D0F

/* Cards */
--card: rgba(39, 39, 42, 0.6)
--card-foreground: #FFFFFF
--card-border: rgba(63, 63, 68, 0.5)

/* Muted */
--muted: #18181B
--muted-foreground: #A1A1AA

/* Input */
--input-bg: #18181B
--input-border: #3F3F46

/* Sidebar */
--sidebar: rgba(24, 24, 27, 0.8)
--sidebar-foreground: #FFFFFF
--sidebar-border: rgba(63, 63, 68, 0.5)
--sidebar-hover: rgba(39, 39, 42, 0.5)
```

### NILA Adaptation (Teal Primary)

```css
/* Background - Same dark base */
--background: #0D0D0F
--foreground: #FFFFFF

/* Primary - TEAL (Bacalar lagoon) */
--primary: #0D9488
--primary-foreground: #FFFFFF

/* Secondary - GOLD (sunset accent) */
--secondary: #F59E0B
--secondary-foreground: #0D0D0F

/* Accent - TEAL */
--accent: #0D9488
--accent-foreground: #FFFFFF
```

### Charcoal Palette (Neutral Base)

```css
--charcoal-950: #0D0D0F   /* Background */
--charcoal-900: #18181B   /* Sidebar, cards */
--charcoal-800: #27272A   /* Elevated surfaces */
--charcoal-700: #3F3F46   /* Borders */
--charcoal-600: #52525B   /* Disabled */
--charcoal-500: #71717A   /* Muted text */
```

### Teal Palette (NILA Primary)

```css
--teal-50:  #F0FDFA
--teal-100: #CCFBF1
--teal-200: #99F6E4
--teal-300: #5EEAD4
--teal-400: #2DD4BF
--teal-500: #14B8A6
--teal-600: #0D9488   /* PRIMARY */
--teal-700: #0F766E   /* Hover */
--teal-800: #115E59   /* Active */
--teal-900: #134E4A   /* Text dark */
```

### Semantic Colors

```css
--success: #22C55E
--error: #EF4444
--warning: #F59E0B
--info: #0EA5E9
```

---

## 3. TYPOGRAPHY

### Fonts

```typescript
// CafeTabs uses:
font-sans: "Geist" (Next.js default)
font-mono: "Geist Mono"
font-serif: "Playfair Display"

// NILA will use:
font-sans: "DM Sans"
font-serif: "DM Serif Display"
```

### Usage

- **Body text**: DM Sans (sans-serif)
- **Headings (h1, h2, h3)**: DM Serif Display
- **Hero titles**: DM Serif Display
- **UI elements**: DM Sans

---

## 4. SPACING & SIZING

### Touch Targets (Mobile-First)

```css
/* Buttons */
min-height: 44px (default)
min-height: 56px (large)

/* Inputs */
min-height: 56px

/* Cards */
padding: 1rem (16px)

/* Gaps */
gap: 0.75rem | 1rem | 1.5rem | 2rem
```

### Border Radius

```css
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px   /* Cards, tiles */
--radius-xl: 16px   /* Large cards */
```

---

## 5. SHADOWS & EFFECTS

### Glow Effects (NILA Teal Version)

```css
.glow-teal {
  box-shadow: 0 0 40px rgba(13, 148, 136, 0.15);
}

.glow-teal-strong {
  box-shadow: 0 0 60px rgba(13, 148, 136, 0.25);
}

.glow-teal-subtle {
  box-shadow: 0 0 20px rgba(13, 148, 136, 0.1);
}

.glow-border-teal {
  box-shadow: 0 0 0 1px rgba(13, 148, 136, 0.3),
              0 0 20px rgba(13, 148, 136, 0.1);
}
```

### Glass Morphism

```css
.glass {
  background-color: rgba(39, 39, 42, 0.5);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(63, 63, 68, 0.5);
}

.glass-subtle {
  background-color: rgba(39, 39, 42, 0.3);
  backdrop-filter: blur(12px);
}

.glass-strong {
  background-color: rgba(39, 39, 42, 0.7);
  backdrop-filter: blur(32px);
}
```

---

## 6. COMPONENT PATTERNS

### Button

```typescript
// Variants
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

// Sizes
type ButtonSize = "default" | "sm" | "lg";

// Styling
primary: {
  background: var(--teal-600),
  color: white,
  hover: var(--teal-700),
  glow on hover
}

secondary: {
  background: var(--gold-500),
  color: var(--charcoal-950)
}

ghost: {
  background: transparent,
  color: var(--muted-foreground),
  hover: var(--charcoal-800)
}
```

### Card

```typescript
// Variants
type CardVariant = "default" | "glass" | "glow" | "interactive";

// Default
default: {
  background: var(--card),
  border: 1px solid var(--card-border),
  borderRadius: 12px
}

// Interactive (hover effect)
interactive: {
  ...default,
  transition: transform 0.2s, box-shadow 0.2s,
  hover: translateY(-2px) + glow
}
```

### Badge

```typescript
// Variants
type BadgeVariant =
  | "teal" | "gold" | "purple"
  | "success" | "error" | "warning" | "muted"
  | "active" | "pending" | "completed";

// Styling
teal: {
  background: rgba(13, 148, 136, 0.2),
  color: var(--teal-400)
}
```

### Input

```typescript
// Styling
{
  minHeight: 56px,
  borderRadius: 8px,
  background: var(--charcoal-900),
  border: 1px solid var(--charcoal-700),
  focusRing: 2px var(--teal-600)
}
```

### Icon Box

```typescript
// Sizes
type IconBoxSize = "sm" | "md" | "lg" | "xl";
// sm: 2rem, md: 2.5rem, lg: 3rem, xl: 3.5rem

// Variants
type IconBoxVariant = "teal" | "gold" | "purple" | "green";

// Styling
teal: {
  background: rgba(13, 148, 136, 0.2),
  color: var(--teal-400)
}
```

---

## 7. ANIMATIONS

### Keyframes

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(13, 148, 136, 0.2); }
  50% { box-shadow: 0 0 40px rgba(13, 148, 136, 0.4); }
}
```

### Framer Motion Usage

```typescript
// Page transitions
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Modal/Drawer
initial={{ y: "100%" }}
animate={{ y: 0 }}
exit={{ y: "100%" }}
transition={{ type: "spring", damping: 25 }}

// List items (stagger)
variants={{
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.1 }
  })
}}
```

---

## 8. TECH STACK

```json
{
  "framework": "Next.js 15+",
  "react": "19+",
  "typescript": "5.x",

  "styling": {
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "tailwind-merge": "^3",
    "clsx": "^2"
  },

  "state": {
    "zustand": "^5"
  },

  "forms": {
    "react-hook-form": "^7",
    "@hookform/resolvers": "^5",
    "zod": "^4"
  },

  "animation": {
    "motion": "^12" (formerly framer-motion)
  },

  "icons": {
    "lucide-react": "^0.56+"
  },

  "database": {
    "local": "JSON files or better-sqlite3",
    "future": "Supabase"
  }
}
```

---

## 9. UTILITY FUNCTIONS

### cn() - Class Name Merger

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
cn(
  "px-2 py-1 bg-gray-100",
  isActive && "bg-teal-600 text-white",
  className
)
```

---

## 10. KEY DESIGN PRINCIPLES

1. **Dark Theme First** - Charcoal background (#0D0D0F)
2. **Teal Accent** - Primary action color (lagoon-inspired)
3. **Mobile-Optimized** - 44-56px touch targets
4. **Interactive** - Glow effects, smooth animations
5. **Glassmorphism** - Modals, overlays, elevated surfaces
6. **Accessibility** - Focus rings, high contrast, aria labels
7. **Type-Safe** - Full TypeScript, Zod validation
8. **Atomic** - atoms → molecules → organisms → templates → pages

---

## NILA-SPECIFIC ADAPTATIONS

| CafeTabs | NILA |
|----------|------|
| Gold primary (#C9A962) | Teal primary (#0D9488) |
| Teal secondary | Gold accent (#F59E0B) |
| Playfair Display | DM Serif Display |
| Geist Sans | DM Sans |
| Product tiles | Unit cards |
| Cart store | Booking store |
| Tables | Units |
| Tabs | Bookings |

---

*Extracted from CafeTabs project: 2026-01-08*
