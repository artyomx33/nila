# NILA Project Master Plan

> **Universe**: NILAverse (separate from TeddyVerse & TISAverse)
> **Design DNA**: CafeTabs style (black + teal accent, atomic components)
> **Status**: Planning Phase

---

## Project Overview

**NILA Estate Management** - Property management platform for luxury vacation rentals in Riviera Maya (Bacalar focus).

### Two Products, One Codebase

```
NILA/
├── app/              # Operations Platform (Admin + Owner + Booker)
├── website/          # Marketing Website (Lead generation)
├── shared/           # Shared components, tokens, types
└── docs/             # Documentation
```

---

## Design System: "NILAverse"

### Color Palette (Teal + Black like CafeTabs)

```css
/* Primary Actions - Teal (Bacalar lagoon inspired) */
--teal-500: #0D9488;      /* Primary buttons, links */
--teal-600: #0F766E;      /* Hover states */
--teal-700: #115E59;      /* Active states */
--teal-50:  #F0FDFA;      /* Light backgrounds */

/* Neutrals - Black/Gray (CafeTabs style) */
--gray-950: #030712;      /* Text primary */
--gray-900: #111827;      /* Sidebar, headers */
--gray-800: #1F2937;      /* Cards dark mode */
--gray-700: #374151;      /* Borders */
--gray-600: #4B5563;      /* Text secondary */
--gray-100: #F3F4F6;      /* Backgrounds */
--gray-50:  #F9FAFB;      /* Page background */

/* Semantic */
--success: #059669;       /* Green */
--warning: #F59E0B;       /* Amber/Gold */
--danger:  #DC2626;       /* Red */
--info:    #0EA5E9;       /* Sky blue */
```

### Typography

```css
/* Font Stack */
--font-display: 'DM Serif Display', serif;  /* Hero, page titles */
--font-sans: 'DM Sans', system-ui, sans-serif;  /* Everything else */

/* Scale */
--text-xs:   0.75rem;   /* 12px */
--text-sm:   0.875rem;  /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg:   1.125rem;  /* 18px */
--text-xl:   1.25rem;   /* 20px */
--text-2xl:  1.5rem;    /* 24px */
--text-3xl:  1.875rem;  /* 30px */
--text-4xl:  2.25rem;   /* 36px */
```

### Spacing & Radius

```css
/* Radius - Rounded but not bubbly */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;

/* Shadows - Subtle, elegant */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
```

---

## Atomic Component Structure

```
components/
├── atoms/
│   ├── Button/
│   ├── Input/
│   ├── Badge/
│   ├── Avatar/
│   ├── Icon/
│   └── Spinner/
├── molecules/
│   ├── FormField/
│   ├── Card/
│   ├── StatCard/
│   ├── MenuItem/
│   ├── SearchBar/
│   └── DatePicker/
├── organisms/
│   ├── Sidebar/
│   ├── Header/
│   ├── DataTable/
│   ├── Calendar/
│   ├── UnitCard/
│   └── BookingCard/
├── templates/
│   ├── DashboardLayout/
│   ├── AuthLayout/
│   └── PublicLayout/
└── pages/
    └── (actual page components)
```

---

## APP Architecture

### Three Portals, Role-Based Access

```
┌─────────────────────────────────────────────────────────────┐
│                      NILA APP                               │
├─────────────────┬───────────────────┬───────────────────────┤
│  ADMIN PORTAL   │   OWNER PORTAL    │    BOOKER PORTAL      │
│  (Full Access)  │   (Own Units)     │    (Book Only)        │
├─────────────────┴───────────────────┴───────────────────────┤
│                    ROLE FILTER LAYER                        │
├─────────────────────────────────────────────────────────────┤
│                    LOCAL DATABASE                           │
│    Users | Units | Bookings | Cleanings | Expenses          │
└─────────────────────────────────────────────────────────────┘
```

### Route Structure

```
app/
├── (marketing)/           # Public pages
│   ├── page.tsx          # Landing (redirect to website or show teaser)
│   └── login/            # Login page (future)
│
├── (admin)/              # Admin Portal
│   ├── layout.tsx        # Admin sidebar layout
│   ├── dashboard/        # Overview dashboard
│   ├── units/            # Property management
│   │   ├── page.tsx      # List all units
│   │   ├── [id]/         # Unit detail
│   │   └── new/          # Create unit
│   ├── bookings/         # Booking management
│   │   ├── page.tsx      # Calendar view
│   │   ├── [id]/         # Booking detail
│   │   └── new/          # Create booking
│   ├── operations/       # Cleaning & maintenance
│   │   ├── cleanings/    # Cleaning schedule
│   │   ├── maintenance/  # Maintenance requests
│   │   └── staff/        # Cleaner roster
│   ├── owners/           # Owner management
│   └── reports/          # Financial reports
│
├── (owner)/              # Owner Portal
│   ├── layout.tsx        # Owner sidebar layout
│   ├── dashboard/        # My properties overview
│   ├── properties/       # My units
│   │   └── [id]/         # Unit detail (read-only)
│   ├── bookings/         # My bookings calendar
│   ├── financials/       # Income/expenses
│   └── documents/        # Contracts, reports
│
└── (booker)/             # Booker Portal (Simple)
    ├── layout.tsx        # Minimal layout
    ├── browse/           # Browse available units
    ├── book/[unitId]/    # Booking flow
    └── my-bookings/      # View my bookings
```

---

## Feature Breakdown

### 1. Units Management (Admin)

**List View**
- Grid/List toggle
- Filter by: status, type, owner, location
- Search by name
- Quick actions: view, edit, toggle availability

**Unit Profile**
- Basic info: name, type, bedrooms, floor, neighborhood
- Owner assignment
- Amenities (checkboxes/tags)
- Photos gallery (upload, reorder, delete)
- Pricing: base rate, high season, low season
- Rental type: short-term / long-term / both
- Smart home toggle
- Property guide (rich text)
- Linked platforms (Airbnb URL, Booking.com URL)

**Unit Status**
- Available (green)
- Occupied (blue)
- Maintenance (orange)
- Blocked (gray)

---

### 2. Bookings Management (Admin)

**Calendar View**
- Monthly calendar (react-big-calendar or custom)
- Color-coded by source:
  - Teal: Direct booking
  - Orange: Airbnb
  - Blue: Booking.com
  - Purple: Owner stay
- Click to view/edit booking

**Booking Details**
- Guest info: name, email, phone, nationality
- Dates: check-in, check-out, nights
- Unit assigned
- Source: direct/airbnb/booking/owner
- Pricing: nightly rate, total, cleaning fee, taxes
- Payment status: pending/partial/paid
- Contract: generated/sent/signed
- Notes

**Booking Workflow**
1. Request received (pending)
2. Admin approves (approved)
3. Contract sent (contract_sent)
4. Contract signed (confirmed)
5. Payment received (paid)
6. Guest arrives (active)
7. Guest departs (completed)

---

### 3. Operations - Cleaning (Admin)

**Cleaning Schedule**
- List of cleanings by date
- Filter: today, this week, upcoming
- Status: pending, in_progress, completed, verified

**Cleaning Assignment**
- Unit
- Date/time
- Cleaner assigned
- Type: turnover / deep clean / maintenance clean
- Estimated duration

**Cleaning Checklist**
Dynamic checklist per unit type:
- [ ] Bedroom 1 - bed made, linens changed
- [ ] Bedroom 1 - surfaces dusted
- [ ] Bathroom 1 - cleaned and sanitized
- [ ] Kitchen - appliances cleaned
- [ ] Living area - vacuumed/mopped
- [ ] Terrace - swept
- [ ] Amenities restocked
- [ ] Photos uploaded (before/after)

**Photo Verification**
- Cleaner uploads photos per room
- Admin reviews and approves
- Stored per cleaning record

**Cleaner Management**
- Roster of cleaners
- Contact info
- Availability
- Performance history

---

### 4. Operations - Maintenance (Admin)

**Maintenance Requests**
- Unit
- Issue type: plumbing, electrical, AC, appliance, structural, other
- Priority: low, medium, high, urgent
- Description
- Photos
- Status: open, assigned, in_progress, completed
- Assigned to (contractor/staff)
- Cost estimate → actual cost

---

### 5. Owner Portal

**Dashboard**
- My units summary (cards)
- This month: income, expenses, net
- Upcoming bookings (next 30 days)
- Occupancy rate
- Alerts (maintenance needed, etc.)

**My Properties**
- List of my units
- Click to see:
  - Booking calendar (view only)
  - Financial history
  - Maintenance history
  - Photo gallery

**Financial Reports**
- Monthly summary
- Income by booking
- Expenses by category
- Download PDF

**Documents**
- Contracts (view/download)
- Monthly reports
- Tax documents (future)

---

### 6. Booker Portal (Simple Flow)

**Browse Units**
- Gallery of available units
- Filter: dates, bedrooms, price range
- Card: photo, name, bedrooms, price/night, location

**Unit Detail**
- Photo gallery
- Description
- Amenities
- Location/neighborhood
- Pricing calculator (select dates → see total)
- "Request Booking" button

**Booking Request**
- Dates (pre-filled)
- Guest info form:
  - Name
  - Email
  - Phone
  - Number of guests
  - Special requests
- Submit → Thank you page
- Email confirmation sent

**My Bookings** (if they have email)
- Simple lookup by email
- See booking status
- Download contract (when ready)

---

## Data Models

### Users
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'owner' | 'booker';
  created_at: Date;
}
```

### Units
```typescript
interface Unit {
  id: string;
  name: string;
  type: 'apartment' | 'penthouse' | 'villa' | 'studio';
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  neighborhood: string;
  owner_id: string;
  amenities: string[];
  is_smart: boolean;
  rental_type: 'short' | 'long' | 'both';
  pricing: {
    base: number;
    high_season: number;
    low_season: number;
    cleaning_fee: number;
  };
  photos: string[];
  guide: string;
  platform_urls: {
    airbnb?: string;
    booking?: string;
  };
  status: 'available' | 'occupied' | 'maintenance' | 'blocked';
  created_at: Date;
}
```

### Bookings
```typescript
interface Booking {
  id: string;
  unit_id: string;
  guest: {
    name: string;
    email: string;
    phone: string;
    nationality?: string;
    guests_count: number;
  };
  check_in: Date;
  check_out: Date;
  source: 'direct' | 'airbnb' | 'booking' | 'owner';
  status: 'pending' | 'approved' | 'contract_sent' | 'confirmed' | 'paid' | 'active' | 'completed' | 'cancelled';
  pricing: {
    nightly_rate: number;
    nights: number;
    subtotal: number;
    cleaning_fee: number;
    taxes: number;
    total: number;
  };
  payment_status: 'pending' | 'partial' | 'paid';
  contract_url?: string;
  contract_signed_at?: Date;
  notes?: string;
  created_at: Date;
}
```

### Cleanings
```typescript
interface Cleaning {
  id: string;
  unit_id: string;
  booking_id?: string;
  scheduled_date: Date;
  cleaner_id?: string;
  type: 'turnover' | 'deep' | 'maintenance';
  status: 'pending' | 'in_progress' | 'completed' | 'verified';
  checklist: ChecklistItem[];
  photos: string[];
  notes?: string;
  started_at?: Date;
  completed_at?: Date;
  verified_at?: Date;
  created_at: Date;
}

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  photo?: string;
}
```

### Expenses
```typescript
interface Expense {
  id: string;
  unit_id: string;
  category: 'maintenance' | 'cleaning' | 'supplies' | 'utilities' | 'repairs' | 'other';
  amount: number;
  currency: 'MXN' | 'USD';
  description: string;
  receipt_url?: string;
  date: Date;
  created_at: Date;
}
```

### Cleaners
```typescript
interface Cleaner {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'active' | 'inactive';
  created_at: Date;
}
```

---

## WEBSITE Architecture

### Pages

```
website/
├── app/
│   ├── page.tsx              # Home/Landing
│   ├── servicios/            # Services
│   │   ├── page.tsx          # Services overview
│   │   ├── mantenimiento/    # Preventive maintenance
│   │   ├── rentas/           # Rental management
│   │   ├── diseno/           # Interior design
│   │   └── hoa/              # HOA management
│   ├── nosotros/             # About us
│   ├── portafolio/           # Portfolio/Gallery
│   ├── contacto/             # Contact
│   └── propietarios/         # → Link to Owner Portal
```

### Landing Page Sections

1. **Hero**
   - Full-width background (lagoon/property image)
   - Logo
   - Tagline: "El arte de operar con precisión"
   - CTA: "Conoce nuestros servicios" / "Contáctanos"

2. **Value Proposition**
   - 3-4 key benefits with icons
   - Trust, transparency, results

3. **Services Overview**
   - 4 cards (Maintenance, Rentals, Design, HOA)
   - Brief description + "Learn more"

4. **About/Team**
   - Bernadette + Juan Francisco profiles
   - Credentials and experience

5. **Portfolio/Gallery**
   - Property photos carousel
   - Maybe testimonials

6. **Contact**
   - Form (name, email, phone, property type, message)
   - WhatsApp link
   - Phone numbers
   - Location: Riviera Maya

7. **Footer**
   - Logo
   - Quick links
   - Contact info
   - Social links

---

## Tech Stack

```yaml
# Both projects
Framework:      Next.js 15 (App Router)
Language:       TypeScript
Styling:        Tailwind CSS v4
Components:     shadcn/ui (customized)
Icons:          Lucide React
Fonts:          DM Sans + DM Serif Display (Google Fonts)

# App specific
State:          Zustand
Forms:          React Hook Form + Zod
Calendar:       react-big-calendar or FullCalendar
Charts:         Recharts
PDF:            @react-pdf/renderer
Date handling:  date-fns

# Website specific
Animations:     Framer Motion
Images:         next/image + blur placeholders

# Database (for now)
Local:          JSON files or SQLite via better-sqlite3
Future:         Supabase
```

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Project setup (Next.js, Tailwind, shadcn)
- [ ] Design tokens and theme
- [ ] Atomic components (atoms + molecules)
- [ ] Layouts (Admin, Owner, Public)
- [ ] Mock data fixtures

### Phase 2: Admin Portal Core
- [ ] Dashboard
- [ ] Units CRUD
- [ ] Bookings calendar
- [ ] Booking management

### Phase 3: Operations
- [ ] Cleaning schedule
- [ ] Cleaning checklists with photos
- [ ] Cleaner management
- [ ] Maintenance requests

### Phase 4: Owner Portal
- [ ] Owner dashboard
- [ ] Property view
- [ ] Financial reports
- [ ] Document access

### Phase 5: Booker Portal
- [ ] Browse units
- [ ] Unit detail
- [ ] Booking request flow
- [ ] Booking lookup

### Phase 6: Website
- [ ] Landing page
- [ ] Services pages
- [ ] About page
- [ ] Contact form
- [ ] Portfolio

### Phase 7: Polish
- [ ] PDF report generation
- [ ] Email notifications (Resend)
- [ ] Responsive refinement
- [ ] Performance optimization

---

## File Locations

| Document | Path |
|----------|------|
| Master Plan | `/NILA/docs/MASTER-PLAN.md` |
| Discovery Session | `/NILA/docs/discovery-session.md` |
| Website Content Analysis | `/NILA/docs/website-content-analysis.md` (in progress) |
| CafeTabs Design DNA | `/NILA/docs/cafetabs-design-dna.md` (in progress) |
| PDF Source | `/NILA/*.pdf` |

---

## Next Actions

1. ✅ Master plan created
2. 🔄 PDF analysis agent running
3. 🔄 CafeTabs exploration agent running
4. ⏳ Initialize app project
5. ⏳ Initialize website project
6. ⏳ Create shared design tokens
7. ⏳ Build atomic components
8. ⏳ Implement features

---

*Created: 2026-01-08*
*Last Updated: 2026-01-08*
