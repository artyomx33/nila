# NILA Property Manager - Discovery Session

## The Brand DNA (from PDF)

**NILA Estate Management** - "El arte de operar con precisión"
- Founded by Bernadette Gonnet (luxury hospitality - Four Seasons, Ritz-Carlton) + Juan Francisco Caparrós (real estate investment)
- Focus: Riviera Maya, especially Bacalar
- Values: Transparency, precision, excellence, sustainability
- Aesthetic: Organic luxury, water elements, natural textures

---

## THE THREE PERSONAS

### 1. ADMIN (Bernadette & Juan Francisco)

**Who**: The property management company operators
**Goal**: See EVERYTHING, manage EVERYTHING, keep owners happy

**Mental Model**:
> "I need to know if Unit 4B's AC is broken, if the cleaner showed up, if the booking is paid, and if the owner got their monthly report - all before my morning coffee."

**Key Jobs-to-be-Done**:
- Dashboard overview of ALL properties across ALL owners
- See today's check-ins/check-outs at a glance
- Assign cleaners to units
- Track cleaning completion (checklist verification)
- Monitor income/expenses per unit
- Generate owner reports
- Handle booking requests (approve/reject)
- Manage contracts (create, send, track signing)
- See calendar across ALL units
- Track maintenance issues

**Pain Points**:
- Juggling WhatsApp, spreadsheets, Airbnb dashboard
- No single source of truth
- Manual report generation for owners
- Coordinating cleaners across multiple properties

---

### 2. UNIT OWNER (Property Investor)

**Who**: People who bought units as investment, often live abroad
**Goal**: Peace of mind + know their money is being managed well

**Mental Model**:
> "I bought a condo in Tulum as an investment. I trust NILA to manage it, but I want to see what's happening without bothering them constantly."

**Key Jobs-to-be-Done**:
- See MY properties only
- View booking calendar (when is it rented vs vacant)
- See income breakdown (gross, fees, net)
- View expenses (maintenance, repairs, supplies)
- Download monthly reports
- See property condition photos
- View/download contracts
- Check upcoming maintenance

**Pain Points**:
- Feeling disconnected from their investment
- Having to ask for updates
- Not knowing if maintenance is being done
- Unclear on actual ROI

---

### 3. BOOKER (Guest/Renter)

**Who**: People wanting to rent a unit (direct booking, not Airbnb)
**Goal**: Easy booking, clear communication, smooth experience

**Mental Model**:
> "I found this beautiful place online, I want to book it directly. Just tell me if it's available, how much, and let me pay."

**Key Jobs-to-be-Done**:
- Browse available units
- Check availability for dates
- Request booking
- Receive/sign contract
- Make payment
- Get property guide/info
- Request special experiences (flowers, chef, etc.)

**Pain Points**:
- Slow responses
- Unclear pricing
- Complicated booking process
- No visibility into request status

---

## CORE FEATURES: The NILA Hub Concept

Three portals, one system:

```
┌─────────────────────────────────────────────────────────┐
│                    NILA Platform                        │
├─────────────────┬─────────────────┬─────────────────────┤
│   ADMIN PORTAL  │  OWNER PORTAL   │   BOOKER PORTAL     │
│   (Full Access) │  (Read + Own)   │   (Browse + Book)   │
├─────────────────┴─────────────────┴─────────────────────┤
│                   SHARED DATABASE                       │
│  Units | Bookings | Cleaners | Contracts | Payments    │
└─────────────────────────────────────────────────────────┘
```

---

## FEATURE BREAKDOWN BY PERSONA

### ADMIN FEATURES

**Dashboard**
- Today's Activity: Check-ins, Check-outs, Cleanings scheduled
- Occupancy rate (this week/month)
- Revenue snapshot
- Pending approvals (booking requests)
- Maintenance alerts

**Units Management**
- All units with status (Available/Occupied/Maintenance)
- Unit profile: photos, amenities, neighborhood guide, floor, type (condo/villa/standalone)
- Smart unit toggle (yes/no)
- Rental type: short-term / long-term / both
- Linked platforms (Airbnb, Booking, Direct)
- Pricing by season (high/low)
- Expense tracking per unit

**Booking Management**
- Calendar view (all units, color-coded by source: Airbnb=orange, Direct=teal, Booking.com=blue)
- Booking details: guest info, dates, price, status, payment status
- Approval workflow (for direct bookings)
- Contract generation + e-signature tracking
- Payment tracking (Stripe/Bank/Cash)

**Operations**
- Cleaner roster (who's available)
- Cleaning assignments (unit + time needed)
- Cleaning checklist (with photo verification)
- Check-in checklist (supplies, hot water, amenities)
- Maintenance requests log
- Experience add-ons (flowers, decorations, mariachi)

**Reporting**
- Generate owner reports (PDF)
- Income/expense breakdown
- Occupancy analytics
- Performance vs. expected

### OWNER FEATURES

**My Dashboard**
- My units at a glance
- This month's income/expenses
- Upcoming bookings
- Property status (all good / needs attention)

**My Properties**
- Calendar view (my units only)
- Booking history
- Financial reports (downloadable)
- Maintenance history
- Property photos/condition

**Documents**
- Contracts (view/download)
- Monthly reports (auto-generated)
- Payment receipts

### BOOKER FEATURES

**Browse**
- Available units gallery
- Filter by dates, bedrooms, price, amenities
- Unit details page (photos, description, guide)

**Book**
- Date selection
- Price calculator
- Request booking (pending approval)
- Sign contract (e-signature)
- Payment (Stripe)
- Booking confirmation

**My Bookings**
- View status
- Property guide access
- Request add-ons (experiences)
- Contact property manager

---

## DESIGN DIRECTION: "NILAverse"

**Aesthetic**: Organic Luxury meets Caribbean Serenity

**Color Palette** (inspired by Bacalar's lagoon):
```
Primary:      #0D9488 (Teal - like the lagoon)
Secondary:    #115E59 (Deep Teal)
Accent:       #F59E0B (Warm Gold - sunset)
Background:   #F0FDFA (Pale Aqua)
Text:         #134E4A (Dark Teal)
White:        #FFFFFF
Danger:       #DC2626
Success:      #059669
```

**Typography**:
- Headers: **DM Serif Display** (elegant, editorial)
- Body: **DM Sans** (clean, modern)

**Design Elements**:
- Rounded corners (12-16px)
- Subtle shadows (soft, natural)
- Water-inspired gradients
- Organic shapes for decorative elements
- Clean whitespace
- Photography-forward (beautiful property images)

**Animations**:
- Smooth, liquid transitions
- Subtle hover effects
- Gentle loading states

---

## TECH STACK

```yaml
Framework:    Next.js 15 (App Router)
Language:     TypeScript
Styling:      Tailwind CSS + Atomic Components
State:        Zustand (global state)
Forms:        React Hook Form + Zod
Database:     Local SQLite/JSON for now, Supabase later
Auth:         None for MVP (no RLS)
Storage:      Local for now, Supabase Storage later
Payments:     Stripe (future)
Charts:       Recharts
Animations:   Framer Motion
Calendar:     Custom or react-big-calendar
E-Signature:  Simple in-app signing (not DocuSign level)
PDF:          React-PDF for reports
Email:        Resend (for notifications) - future
```

---

## DATA MODEL (Simplified)

```
Users
├── id, email, role (admin/owner/booker), name, phone

Units
├── id, name, type, bedrooms, floor, neighborhood
├── owner_id (FK to Users)
├── amenities (JSON), is_smart, rental_type
├── pricing (JSON: base, high_season, low_season)
├── photos[], guide_text

Bookings
├── id, unit_id, booker_id
├── check_in, check_out
├── source (airbnb/booking/direct)
├── status (pending/approved/confirmed/cancelled)
├── total_price, payment_status
├── contract_signed, contract_url

Cleanings
├── id, unit_id, booking_id
├── scheduled_date, cleaner_id
├── checklist (JSON), photos[], status

Expenses
├── id, unit_id, category, amount, date, description

Contracts
├── id, booking_id, template, signed_at, signed_url
```

---

## MVP SCOPE (Phase 1)

**Phase 1 - Core Operations**
1. Auth (login for admin/owner/booker) - SKIPPED for now
2. Admin: Units CRUD
3. Admin: Bookings calendar + management
4. Admin: Cleaning assignments + checklists
5. Owner: View my units + bookings + income
6. Booker: Browse + request booking

**Phase 2 - Enhancement**
- Contract generation + e-signature
- Payment integration (Stripe)
- Owner reports (PDF generation)
- Expense tracking
- Maintenance requests

**Phase 3 - Polish**
- Mobile responsive refinement
- Notifications (email/push)
- Airbnb calendar sync (iCal)
- Experience add-ons booking
- Analytics dashboard

---

## PROJECT STRUCTURE

```
nila-manager/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (admin)/
│   │   ├── dashboard/
│   │   ├── units/
│   │   ├── bookings/
│   │   ├── operations/
│   │   └── reports/
│   ├── (owner)/
│   │   ├── dashboard/
│   │   ├── my-properties/
│   │   └── documents/
│   ├── (booker)/
│   │   ├── browse/
│   │   ├── my-bookings/
│   │   └── book/[unitId]/
│   ├── layout.tsx
│   └── page.tsx (landing)
├── components/
│   ├── ui/           (atomic components)
│   ├── forms/        (form components)
│   ├── layouts/      (nav, sidebar, etc.)
│   └── features/     (feature-specific)
├── lib/
│   ├── db/           (local database)
│   ├── actions/      (server actions)
│   ├── stores/       (zustand stores)
│   └── utils/
├── types/
└── public/
```

---

## DECISIONS MADE

| Question | Decision |
|----------|----------|
| Database | Local now, Supabase later |
| Auth | No auth, no RLS for MVP |
| Language | English only for MVP |
| Airbnb Sync | Account for it, don't implement yet |
| Start Point | Website first (wow factor), then app |
| Name | NILA Manager |

---

## NEXT STEPS

1. Personas to review this plan
2. Website planning agent to analyze PDF for marketing site
3. App structure setup
