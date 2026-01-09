# Zustand State Management Implementation

This document describes the implementation of working CRUD operations using Zustand stores for the NILA Estate Management app.

## Overview

Previously, the app used mock data files (`/src/lib/db/*.ts`) with CRUD functions, but there was no reactive state management. Actions like "Add Unit", "Assign Cleaner", and "Create Booking" didn't persist or update the UI in real-time.

Now, all data is managed through Zustand stores that provide:
- Reactive state updates across components
- Full CRUD operations
- Type-safe state management
- Clean separation between data layer and UI

## Created Files

### 1. Zustand Stores

#### `/src/lib/stores/units-store.ts`
**Purpose:** Manage unit (property) state and operations

**Key Functions:**
- `addUnit(unit)` - Create a new unit
- `updateUnit(id, updates)` - Update an existing unit
- `deleteUnit(id)` - Delete a unit
- `getUnit(id)` - Get a single unit
- `getUnits(filters)` - Get all units with optional filtering

**Usage Example:**
```typescript
import { useUnitsStore } from '@/lib/stores/units-store';

function MyComponent() {
  const { units, addUnit, updateUnit } = useUnitsStore();

  const handleCreate = () => {
    const newUnit = addUnit({
      name: "Casa Nueva",
      type: "apartment",
      bedrooms: 2,
      // ... other fields
    });
  };
}
```

#### `/src/lib/stores/bookings-store.ts`
**Purpose:** Manage booking state and operations

**Key Functions:**
- `addBooking(booking)` - Create a new booking
- `updateBooking(id, updates)` - Update a booking
- `deleteBooking(id)` - Delete a booking
- `cancelBooking(id)` - Cancel a booking (sets status to 'cancelled')
- `getBooking(id)` - Get a single booking
- `getBookingsByUnit(unitId)` - Get all bookings for a unit
- `getBookingsByStatus(status)` - Filter bookings by status
- `isUnitAvailable(unitId, checkIn, checkOut, excludeBookingId?)` - Check availability
- `getTodayCheckIns()` - Get today's check-ins
- `getTodayCheckOuts()` - Get today's check-outs

**Usage Example:**
```typescript
import { useBookingsStore } from '@/lib/stores/bookings-store';

function BookingComponent() {
  const { addBooking, isUnitAvailable } = useBookingsStore();

  const handleSubmit = () => {
    const available = isUnitAvailable(unitId, checkIn, checkOut);
    if (available) {
      addBooking({ /* booking data */ });
    }
  };
}
```

#### `/src/lib/stores/cleanings-store.ts`
**Purpose:** Manage cleaning task state and operations

**Key Functions:**
- `addCleaning(cleaning)` - Create a new cleaning task
- `updateCleaning(id, updates)` - Update a cleaning task
- `deleteCleaning(id)` - Delete a cleaning task
- `getCleaning(id)` - Get a single cleaning task
- `getCleaningsByStatus(status)` - Filter by status
- `getCleaningsByUnit(unitId)` - Get cleanings for a unit
- `getCleaningsByCleaner(cleanerId)` - Get cleanings assigned to a cleaner
- `assignCleaner(cleaningId, cleanerId)` - Assign a cleaner to a task
- `updateStatus(cleaningId, status)` - Update cleaning status
- `startCleaning(cleaningId)` - Start a cleaning (sets status and started_at)
- `completeCleaning(cleaningId)` - Complete a cleaning (sets status and completed_at)
- `verifyCleaning(cleaningId)` - Verify a cleaning (sets status and verified_at)
- `updateChecklist(cleaningId, checklist)` - Update the checklist items

**Usage Example:**
```typescript
import { useCleaningsStore } from '@/lib/stores/cleanings-store';

function CleaningDetail() {
  const { getCleaning, assignCleaner, startCleaning } = useCleaningsStore();
  const cleaning = getCleaning(id);

  const handleAssign = (cleanerId: string) => {
    assignCleaner(cleaning.id, cleanerId);
  };
}
```

### 2. Updated Components

#### `/src/components/admin/units/unit-form.tsx`
**Changes:**
- Removed direct imports from `/src/lib/db/units`
- Now uses `useUnitsStore()` hook
- Calls `addUnit()` for creation and `updateUnit()` for editing
- UI updates automatically when data changes

**Before:**
```typescript
import { createUnit, updateUnit } from "@/lib/db/units";
// ...
createUnit(unitData);
```

**After:**
```typescript
import { useUnitsStore } from "@/lib/stores/units-store";
// ...
const { addUnit, updateUnit } = useUnitsStore();
addUnit(unitData);
```

#### `/src/app/admin/operations/cleaning/[id]/page.tsx`
**Changes:**
- Removed direct imports from `/src/lib/db/cleanings`
- Now uses `useCleaningsStore()` hook
- Added "Assign Cleaner" modal functionality
- Cleaner assignment now actually works
- All status updates are reactive

**New Features:**
- Modal dialog for assigning/reassigning cleaners
- Dropdown showing available cleaners with ratings
- Real-time status updates when starting, completing, or verifying cleanings
- Checklist updates persist to store

### 3. New Components

#### `/src/components/bookings/BookingForm.tsx`
**Purpose:** Complete form for creating and editing bookings

**Features:**
- Guest information (name, email, phone, nationality, guest count)
- Booking details (unit selection, check-in/check-out dates, source)
- Automatic pricing calculation:
  - Calculates nights from date range
  - Computes subtotal (nightly_rate × nights)
  - Adds cleaning fee
  - Calculates taxes based on percentage
  - Shows total
- Real-time pricing summary
- Unit availability checking
- Payment status management
- Notes and internal comments
- Full validation with error messages

**Form Fields:**
```typescript
Guest Information:
- Guest Name (required)
- Email (required)
- Phone (required)
- Nationality
- Number of Guests (required, min: 1)
- Guest Notes

Booking Details:
- Unit (required, select from available units)
- Source (direct, airbnb, booking, owner)
- Check-in Date (required)
- Check-out Date (required, must be after check-in)

Pricing:
- Nightly Rate (required, > 0)
- Cleaning Fee
- Tax Rate (%)
- Currency (MXN/USD)
- Auto-calculated: nights, subtotal, taxes, total

Payment & Notes:
- Payment Status (pending, partial, paid, refunded)
- Internal Notes
```

**Validation:**
- All required fields checked
- Email format validation
- Date logic (check-out after check-in)
- Unit availability check for selected dates
- Pricing calculations must be valid

#### `/src/app/admin/bookings/new/page.tsx`
**Purpose:** Page for creating new bookings

Simple wrapper that renders the `BookingForm` component in create mode.

## How It Works

### Data Flow

1. **Initialization:**
   - Each store initializes with mock data from `/src/lib/db/*.ts` files
   - Mock data provides the initial state

2. **Reading Data:**
   - Components import and use the store hooks
   - Store state is reactive - UI updates automatically when state changes
   - No need to manually refresh or reload

3. **Updating Data:**
   - Call store methods like `addUnit()`, `updateBooking()`, etc.
   - Store updates its internal state
   - All components using that store re-render with new data

4. **Persistence:**
   - Currently, data persists in-memory during the session
   - When ready to connect to Supabase, replace store internals with API calls
   - The component APIs remain the same

### Example: Creating a Booking

```typescript
// 1. User fills out the BookingForm
// 2. Form validates input
// 3. On submit, form calls:
const newBooking = addBooking({
  unit_id: "unit-1",
  guest: { name: "John Doe", ... },
  check_in: new Date("2026-01-15"),
  check_out: new Date("2026-01-22"),
  pricing: { ... },
  // ... other fields
});

// 4. Store adds the booking to its state
// 5. All components using useBookingsStore() re-render
// 6. User is redirected to /admin/bookings/{newBooking.id}
```

### Example: Assigning a Cleaner

```typescript
// 1. User opens cleaning detail page
// 2. Clicks "Assign Cleaner" button
// 3. Modal opens with dropdown of available cleaners
// 4. User selects a cleaner and clicks "Assign"
// 5. Component calls:
assignCleaner(cleaningId, cleanerId);

// 6. Store updates cleaning with:
//    - cleaner_id set
//    - status changed to "assigned"
// 7. Page re-renders showing assigned cleaner
// 8. Modal closes
```

## Testing

### Unit Form
1. Navigate to `/admin/units/new`
2. Fill out the form with unit details
3. Click "Create Unit"
4. You should be redirected to the unit detail page
5. Navigate to `/admin/units` - your new unit should appear

### Booking Form
1. Navigate to `/admin/bookings/new`
2. Fill out guest information
3. Select a unit and dates
4. Enter pricing information
5. See the pricing summary update automatically
6. Click "Create Booking"
7. You should be redirected to the booking detail page
8. Check `/admin/bookings` to see your new booking

### Cleaning Assignment
1. Navigate to `/admin/operations/cleaning`
2. Click on a cleaning task that is "Unassigned"
3. Click "Assign Cleaner"
4. Select a cleaner from the dropdown
5. Click "Assign"
6. The page should update showing the assigned cleaner
7. The status should change to "assigned"

## Migration Path to Supabase

When ready to connect to Supabase:

1. Keep the store interface the same
2. Replace store internals to use Supabase queries:

```typescript
// Instead of:
set((state) => ({
  units: [...state.units, newUnit],
}));

// Use:
const { data, error } = await supabase
  .from('units')
  .insert([newUnit])
  .select();

if (data) {
  set((state) => ({
    units: [...state.units, data[0]],
  }));
}
```

3. Components don't need to change
4. The store handles the data layer complexity

## Benefits

1. **Reactive UI:** Changes to data automatically update all components
2. **Type Safety:** Full TypeScript support with proper types
3. **Centralized State:** Single source of truth for each data type
4. **Decoupled:** Components don't know about data storage details
5. **Testable:** Easy to mock stores for testing
6. **Scalable:** Easy to add new features or change data layer

## File Structure

```
src/
├── lib/
│   ├── stores/
│   │   ├── units-store.ts       (Units state management)
│   │   ├── bookings-store.ts    (Bookings state management)
│   │   └── cleanings-store.ts   (Cleanings state management)
│   └── db/
│       ├── units.ts             (Mock data - used as initial state)
│       ├── bookings.ts          (Mock data - used as initial state)
│       └── cleanings.ts         (Mock data - used as initial state)
├── components/
│   ├── admin/
│   │   └── units/
│   │       └── unit-form.tsx    (Updated to use units-store)
│   └── bookings/
│       └── BookingForm.tsx      (New: full booking form)
└── app/
    └── admin/
        ├── bookings/
        │   └── new/
        │       └── page.tsx     (New: create booking page)
        └── operations/
            └── cleaning/
                └── [id]/
                    └── page.tsx (Updated: cleaner assignment)
```

## Next Steps

Potential enhancements:

1. Add success/error toast notifications
2. Add optimistic updates for better UX
3. Implement undo/redo functionality
4. Add data persistence to localStorage
5. Connect to Supabase backend
6. Add real-time subscriptions for multi-user updates
7. Implement proper loading states
8. Add data caching and invalidation strategies
