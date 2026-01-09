# NILA App - Implementation Plan for Parallel Agents

> **Goal**: 3-4 agents working simultaneously without conflicts
> **Strategy**: Each agent owns a vertical slice (complete feature end-to-end)

---

## Agent Ownership Map

```
┌─────────────────────────────────────────────────────────────────┐
│                        NILA APP                                 │
├─────────────────┬─────────────────┬─────────────────┬───────────┤
│   AGENT 1       │   AGENT 2       │   AGENT 3       │  AGENT 4  │
│   Foundation    │   Units         │   Bookings      │  Operations│
│   + Layouts     │   Management    │   Calendar      │  Cleaning │
├─────────────────┼─────────────────┼─────────────────┼───────────┤
│ src/components/ │ src/app/admin/  │ src/app/admin/  │ src/app/  │
│   ui/*          │   units/*       │   bookings/*    │   admin/  │
│ src/app/        │ src/components/ │ src/components/ │   opera-  │
│   layout.tsx    │   admin/units/* │   admin/        │   tions/* │
│ src/app/admin/  │ src/lib/db/     │   bookings/*    │ src/compo-│
│   layout.tsx    │   units.ts      │ src/lib/db/     │   nents/  │
│   dashboard/    │ src/types/      │   bookings.ts   │   admin/  │
│ src/lib/        │   unit.ts       │ src/types/      │   ops/*   │
│   stores/*      │                 │   booking.ts    │ src/lib/  │
│ src/types/      │                 │                 │   db/     │
│   index.ts      │                 │                 │   clean-  │
│                 │                 │                 │   ings.ts │
└─────────────────┴─────────────────┴─────────────────┴───────────┘
```

---

## AGENT 1: Foundation + Layouts + Dashboard

**Scope**: Core infrastructure that all other agents depend on

### Files to Create

```
src/
├── components/ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── checkbox.tsx
│   ├── avatar.tsx
│   ├── icon-box.tsx
│   ├── stat-card.tsx
│   ├── loading-spinner.tsx
│   ├── empty-state.tsx
│   └── index.ts
├── components/shared/
│   ├── sidebar.tsx
│   ├── header.tsx
│   ├── page-header.tsx
│   └── index.ts
├── app/
│   ├── layout.tsx (already exists - enhance)
│   └── page.tsx (already exists - enhance)
├── app/admin/
│   ├── layout.tsx (admin shell with sidebar)
│   └── dashboard/
│       └── page.tsx (stats overview)
├── lib/
│   ├── stores/
│   │   ├── ui-store.ts (sidebar state)
│   │   └── index.ts
│   └── db/
│       └── index.ts (mock data loader)
└── types/
    └── index.ts (all shared types)
```

### Detailed Tasks

1. **UI Components** (atomic)
   - Button: primary, secondary, ghost, outline variants
   - Card: default, glass, interactive variants
   - Badge: teal, gold, success, error, warning, muted + booking sources
   - Input: text, with label, with error
   - Select: dropdown with options
   - Checkbox: with label
   - Avatar: image or initials fallback
   - IconBox: teal, gold, green, red + sizes
   - StatCard: icon + label + value + trend
   - LoadingSpinner: centered spinner
   - EmptyState: icon + message + action

2. **Shared Components**
   - Sidebar: collapsible, nav items, active state, role-based sections
   - Header: page title, breadcrumbs, actions slot
   - PageHeader: title + description + actions

3. **Admin Layout**
   - Sidebar navigation (Dashboard, Units, Bookings, Operations, Owners, Reports)
   - Top header with search + user menu
   - Main content area

4. **Dashboard Page**
   - Stats row: Total Units, Active Bookings, This Month Revenue, Occupancy %
   - Today's Activity: Check-ins, Check-outs, Cleanings
   - Quick actions cards

5. **Stores**
   - UI Store: sidebar open/closed, active section

6. **Types** (shared by all agents)
   ```typescript
   // User
   interface User { id, email, name, phone, role, created_at }

   // Unit
   interface Unit { id, name, type, bedrooms, bathrooms, floor, neighborhood, owner_id, amenities, is_smart, rental_type, pricing, photos, guide, platform_urls, status, created_at }

   // Booking
   interface Booking { id, unit_id, guest, check_in, check_out, source, status, pricing, payment_status, contract_url, contract_signed_at, notes, created_at }

   // Cleaning
   interface Cleaning { id, unit_id, booking_id, scheduled_date, cleaner_id, type, status, checklist, photos, notes, started_at, completed_at, verified_at, created_at }

   // Cleaner
   interface Cleaner { id, name, phone, email, status, created_at }

   // Expense
   interface Expense { id, unit_id, category, amount, currency, description, receipt_url, date, created_at }
   ```

---

## AGENT 2: Units Management

**Scope**: Complete units CRUD with all views

### Files to Create

```
src/
├── app/admin/units/
│   ├── page.tsx (list view)
│   ├── [id]/
│   │   └── page.tsx (detail/edit view)
│   └── new/
│       └── page.tsx (create view)
├── components/admin/units/
│   ├── unit-card.tsx
│   ├── unit-list.tsx
│   ├── unit-grid.tsx
│   ├── unit-filters.tsx
│   ├── unit-form.tsx
│   ├── unit-status-badge.tsx
│   ├── unit-pricing-card.tsx
│   ├── unit-photos-gallery.tsx
│   └── index.ts
├── lib/db/
│   └── units.ts (mock data + CRUD functions)
└── types/
    └── unit.ts (unit-specific types)
```

### Detailed Tasks

1. **Units List Page** (`/admin/units`)
   - Header: "Units" + "Add Unit" button
   - View toggle: Grid / List
   - Filters: status, type, owner, search
   - Grid view: UnitCard components
   - List view: table with columns

2. **Unit Card Component**
   - Photo (or placeholder)
   - Name + type badge
   - Bedrooms/bathrooms icons
   - Status indicator (available/occupied/maintenance)
   - Owner name
   - Quick actions menu

3. **Unit Detail Page** (`/admin/units/[id]`)
   - Header with name + status + edit button
   - Tabs: Overview, Bookings, Financials, Maintenance
   - Overview tab:
     - Photo gallery
     - Basic info card
     - Amenities list
     - Pricing card
     - Owner info
   - (Other tabs can show "Coming soon")

4. **Unit Form** (create/edit)
   - Basic info: name, type, bedrooms, bathrooms, floor
   - Location: neighborhood dropdown
   - Owner: owner selector
   - Amenities: checkbox grid
   - Settings: is_smart toggle, rental_type radio
   - Pricing: base, high_season, low_season, cleaning_fee
   - Photos: upload area (mock for now)
   - Guide: textarea
   - Platform URLs: airbnb, booking inputs

5. **Mock Data** (`lib/db/units.ts`)
   - 6-8 sample units with varied data
   - CRUD functions: getUnits, getUnit, createUnit, updateUnit, deleteUnit
   - Filter functions: filterByStatus, filterByType, searchUnits

---

## AGENT 3: Bookings & Calendar

**Scope**: Booking management with calendar view

### Files to Create

```
src/
├── app/admin/bookings/
│   ├── page.tsx (calendar view)
│   ├── [id]/
│   │   └── page.tsx (booking detail)
│   └── new/
│       └── page.tsx (create booking)
├── components/admin/bookings/
│   ├── booking-calendar.tsx
│   ├── booking-card.tsx
│   ├── booking-list.tsx
│   ├── booking-detail-drawer.tsx
│   ├── booking-form.tsx
│   ├── booking-status-badge.tsx
│   ├── booking-source-badge.tsx
│   ├── booking-timeline.tsx
│   ├── guest-info-card.tsx
│   └── index.ts
├── lib/db/
│   └── bookings.ts (mock data + functions)
└── types/
    └── booking.ts (booking-specific types)
```

### Detailed Tasks

1. **Bookings Calendar Page** (`/admin/bookings`)
   - Header: "Bookings" + view toggle + "Add Booking" button
   - Calendar controls: prev/next month, today button
   - Monthly calendar grid
   - Bookings shown as colored bars across days
   - Color coding by source: teal=direct, orange=airbnb, blue=booking.com
   - Click booking → opens detail drawer
   - Click empty day → create booking modal

2. **Booking Calendar Component**
   - Monthly grid view
   - Shows unit names on left (rows)
   - Days across top (columns)
   - Booking bars span check-in to check-out
   - Hover shows tooltip with guest name + dates

3. **Booking Detail Drawer**
   - Slides in from right
   - Guest info card
   - Booking timeline (status history)
   - Pricing breakdown
   - Actions: approve, send contract, mark paid, cancel

4. **Booking Form** (create/edit)
   - Unit selector (dropdown with availability check)
   - Date picker: check-in, check-out
   - Guest info: name, email, phone, nationality, guests_count
   - Source: direct, airbnb, booking.com, owner
   - Pricing: auto-calculated from unit + dates
   - Notes textarea

5. **Booking List View** (alternative to calendar)
   - Table with: guest, unit, dates, source, status, total
   - Sortable columns
   - Filter by: status, source, unit, date range

6. **Mock Data** (`lib/db/bookings.ts`)
   - 10-15 sample bookings across different units
   - Various statuses and sources
   - CRUD + filter functions

---

## AGENT 4: Operations (Cleaning & Maintenance)

**Scope**: Cleaning schedule, checklists, cleaner management

### Files to Create

```
src/
├── app/admin/operations/
│   ├── layout.tsx (operations sub-nav)
│   ├── page.tsx (redirect to cleanings)
│   ├── cleanings/
│   │   ├── page.tsx (cleaning schedule)
│   │   └── [id]/
│   │       └── page.tsx (cleaning detail)
│   ├── staff/
│   │   └── page.tsx (cleaner roster)
│   └── maintenance/
│       └── page.tsx (maintenance requests)
├── components/admin/operations/
│   ├── cleaning-card.tsx
│   ├── cleaning-list.tsx
│   ├── cleaning-checklist.tsx
│   ├── cleaning-photos.tsx
│   ├── cleaning-assignment-modal.tsx
│   ├── cleaner-card.tsx
│   ├── cleaner-list.tsx
│   ├── cleaner-form.tsx
│   ├── maintenance-card.tsx
│   ├── maintenance-list.tsx
│   └── index.ts
├── lib/db/
│   ├── cleanings.ts
│   ├── cleaners.ts
│   └── maintenance.ts
└── types/
    ├── cleaning.ts
    ├── cleaner.ts
    └── maintenance.ts
```

### Detailed Tasks

1. **Operations Layout**
   - Sub-navigation: Cleanings, Staff, Maintenance
   - Shared header area

2. **Cleanings Schedule Page** (`/admin/operations/cleanings`)
   - Header: "Cleaning Schedule" + filters + "Assign Cleaning" button
   - Filter tabs: Today, This Week, Upcoming, All
   - List of cleaning cards grouped by date
   - Status indicators: pending (gray), in_progress (yellow), completed (green), verified (teal)

3. **Cleaning Card Component**
   - Unit name + photo thumbnail
   - Scheduled date/time
   - Type badge (turnover/deep/maintenance)
   - Assigned cleaner (or "Unassigned")
   - Status badge
   - Quick actions: assign, start, complete, verify

4. **Cleaning Detail Page** (`/admin/operations/cleanings/[id]`)
   - Header with unit name + status
   - Assignment info (cleaner, scheduled time)
   - Interactive checklist:
     - Grouped by room
     - Each item: checkbox + label + optional photo
     - Progress bar at top
   - Photo upload section (before/after per room)
   - Notes/comments
   - Timeline of status changes
   - Actions: reassign, mark complete, verify

5. **Cleaning Checklist Component**
   - Dynamic checklist based on unit type
   - Default items per room type
   - Checkbox with photo upload option
   - Progress tracking

6. **Staff Page** (`/admin/operations/staff`)
   - Cleaner roster cards
   - Each card: name, phone, status, recent assignments
   - Add/edit cleaner modal
   - Toggle active/inactive

7. **Maintenance Requests Page** (`/admin/operations/maintenance`)
   - List of maintenance issues
   - Filter by: priority, status, unit
   - Each card: unit, issue type, priority, description, status
   - Click to expand details
   - Assign contractor, update status, add cost

8. **Mock Data**
   - 8-10 cleanings (various statuses)
   - 4-5 cleaners
   - 5-6 maintenance requests
   - CRUD functions for each

---

## Shared Dependencies

### Order of Operations

1. **AGENT 1 runs first** (15-20 mins head start)
   - Creates all shared UI components
   - Creates types that other agents need
   - Creates admin layout

2. **AGENTS 2, 3, 4 run in parallel** (after Agent 1's foundation)
   - Each works in their own slice
   - Import from `@/components/ui`
   - Import types from `@/types`

### File Ownership Rules

| File Pattern | Owner |
|--------------|-------|
| `src/components/ui/*` | Agent 1 ONLY |
| `src/components/shared/*` | Agent 1 ONLY |
| `src/types/index.ts` | Agent 1 ONLY |
| `src/app/admin/layout.tsx` | Agent 1 ONLY |
| `src/app/admin/dashboard/*` | Agent 1 ONLY |
| `src/app/admin/units/*` | Agent 2 ONLY |
| `src/components/admin/units/*` | Agent 2 ONLY |
| `src/lib/db/units.ts` | Agent 2 ONLY |
| `src/app/admin/bookings/*` | Agent 3 ONLY |
| `src/components/admin/bookings/*` | Agent 3 ONLY |
| `src/lib/db/bookings.ts` | Agent 3 ONLY |
| `src/app/admin/operations/*` | Agent 4 ONLY |
| `src/components/admin/operations/*` | Agent 4 ONLY |
| `src/lib/db/cleanings.ts` | Agent 4 ONLY |
| `src/lib/db/cleaners.ts` | Agent 4 ONLY |

---

## Mock Data Guidelines

All agents should create realistic mock data:

### Units (Agent 2)
```typescript
const mockUnits: Unit[] = [
  {
    id: "unit-1",
    name: "Casa Azul",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    floor: 3,
    neighborhood: "Centro Bacalar",
    owner_id: "owner-1",
    amenities: ["wifi", "ac", "pool", "parking", "kitchen"],
    is_smart: true,
    rental_type: "short",
    pricing: { base: 2500, high_season: 3500, low_season: 2000, cleaning_fee: 800 },
    photos: ["/images/units/casa-azul-1.jpg"],
    guide: "Welcome to Casa Azul...",
    platform_urls: { airbnb: "https://airbnb.com/...", booking: null },
    status: "available",
    created_at: new Date(),
  },
  // ... more units
];
```

### Bookings (Agent 3)
```typescript
const mockBookings: Booking[] = [
  {
    id: "booking-1",
    unit_id: "unit-1",
    guest: {
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 555 123 4567",
      nationality: "USA",
      guests_count: 2,
    },
    check_in: new Date("2026-01-15"),
    check_out: new Date("2026-01-22"),
    source: "direct",
    status: "confirmed",
    pricing: {
      nightly_rate: 2500,
      nights: 7,
      subtotal: 17500,
      cleaning_fee: 800,
      taxes: 2790,
      total: 21090,
    },
    payment_status: "paid",
    contract_url: "/contracts/booking-1.pdf",
    contract_signed_at: new Date("2026-01-10"),
    notes: "Anniversary trip",
    created_at: new Date(),
  },
  // ... more bookings
];
```

### Cleanings (Agent 4)
```typescript
const mockCleanings: Cleaning[] = [
  {
    id: "cleaning-1",
    unit_id: "unit-1",
    booking_id: "booking-1",
    scheduled_date: new Date("2026-01-22T11:00:00"),
    cleaner_id: "cleaner-1",
    type: "turnover",
    status: "pending",
    checklist: [
      { id: "c1", label: "Master bedroom - change linens", completed: false },
      { id: "c2", label: "Master bedroom - dust surfaces", completed: false },
      { id: "c3", label: "Bathroom 1 - deep clean", completed: false },
      // ... more items
    ],
    photos: [],
    notes: null,
    started_at: null,
    completed_at: null,
    verified_at: null,
    created_at: new Date(),
  },
  // ... more cleanings
];
```

---

## UI Component Specs (Agent 1)

### Button
```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}
```

### Card
```typescript
interface CardProps {
  variant?: "default" | "glass" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

### Badge
```typescript
interface BadgeProps {
  variant?: "teal" | "gold" | "success" | "error" | "warning" | "muted" | "direct" | "airbnb" | "booking";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}
```

### StatCard
```typescript
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: { value: number; positive: boolean };
  variant?: "teal" | "gold" | "green" | "red";
}
```

---

## Success Criteria

Each agent should deliver:

1. **Working pages** - All routes render without errors
2. **Styled components** - Following NILA theme (teal + dark)
3. **Mock data** - Realistic sample data
4. **Interactivity** - Click handlers, filters work
5. **Responsive** - Works on mobile + desktop

---

*Plan created: 2026-01-08*
