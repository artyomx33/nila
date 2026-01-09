# Before & After: CRUD Operations

## The Problem (Before)

### Mock Data Without State Management
```typescript
// /src/lib/db/units.ts
let units = [...mockUnits]; // In-memory array

export function createUnit(unitData) {
  const newUnit = { ...unitData, id: generateId() };
  units.push(newUnit);  // ❌ Direct mutation, no reactivity
  return newUnit;
}
```

### Components Using Direct Calls
```typescript
// /src/components/admin/units/unit-form.tsx
import { createUnit, updateUnit } from "@/lib/db/units";

function UnitForm() {
  const handleSubmit = () => {
    createUnit(unitData);  // ❌ Creates unit but UI doesn't update
    router.push('/admin/units');  // ❌ Must redirect to see changes
  };
}
```

### Issues:
- ❌ No reactive updates - UI doesn't reflect changes
- ❌ Components must reload to see new data
- ❌ No centralized state management
- ❌ Direct mutations bypass any change tracking
- ❌ "Add Unit" button doesn't work
- ❌ "Assign Cleaner" button doesn't work
- ❌ No booking form at all

---

## The Solution (After)

### Reactive State Management with Zustand
```typescript
// /src/lib/stores/units-store.ts
import { create } from 'zustand';

export const useUnitsStore = create<UnitsStore>((set, get) => ({
  units: [...mockUnits],

  addUnit: (unitData) => {
    const newUnit = { ...unitData, id: generateId() };

    set((state) => ({
      units: [...state.units, newUnit],  // ✅ Immutable update
    }));

    return newUnit;  // ✅ All subscribers re-render automatically
  },
}));
```

### Components Using Reactive Hooks
```typescript
// /src/components/admin/units/unit-form.tsx
import { useUnitsStore } from "@/lib/stores/units-store";

function UnitForm() {
  const { addUnit } = useUnitsStore();  // ✅ Reactive hook

  const handleSubmit = () => {
    const newUnit = addUnit(unitData);  // ✅ Creates unit + updates UI
    router.push(`/admin/units/${newUnit.id}`);  // ✅ Can navigate immediately
  };
}

// /src/app/admin/units/page.tsx
function UnitsPage() {
  const { units } = useUnitsStore();  // ✅ Auto-updates when units change

  return (
    <div>
      {units.map(unit => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
```

### Benefits:
- ✅ Reactive updates - UI reflects changes instantly
- ✅ No need to reload pages
- ✅ Centralized state management
- ✅ Immutable state updates
- ✅ "Add Unit" works perfectly
- ✅ "Assign Cleaner" works with modal
- ✅ Full booking form with validation

---

## Specific Examples

### Example 1: Creating a Unit

**Before:**
```typescript
// Click "Add Unit" button
// → Navigate to /admin/units/new
// → Fill out form
// → Click "Create"
// → Unit created in memory array
// ❌ Navigate to /admin/units
// ❌ Page doesn't show new unit
// ❌ Must refresh browser to see it
```

**After:**
```typescript
// Click "Add Unit" button
// → Navigate to /admin/units/new
// → Fill out form
// → Click "Create"
// → addUnit() called
// ✅ Store updates state
// ✅ Redirected to /admin/units/{id}
// ✅ Navigate to /admin/units
// ✅ New unit appears immediately
```

### Example 2: Assigning a Cleaner

**Before:**
```typescript
// Navigate to cleaning detail page
// → Click "Assign Cleaner" button
// ❌ Nothing happens - button not wired up
// ❌ No modal, no functionality
// ❌ Can't assign cleaners
```

**After:**
```typescript
// Navigate to cleaning detail page
// → Click "Assign Cleaner" button
// ✅ Modal opens
// ✅ Dropdown shows available cleaners
// → Select a cleaner
// → Click "Assign"
// ✅ assignCleaner() called
// ✅ Store updates cleaning with cleaner_id
// ✅ Status changes to "assigned"
// ✅ Modal closes
// ✅ Page shows assigned cleaner immediately
```

### Example 3: Creating a Booking

**Before:**
```typescript
// Navigate to /admin/bookings
// ❌ No "Add Booking" button
// ❌ No booking form exists
// ❌ Cannot create bookings
```

**After:**
```typescript
// Navigate to /admin/bookings/new
// ✅ Complete booking form loads
// ✅ Fill out guest info
// ✅ Select unit and dates
// ✅ Pricing auto-calculates
// ✅ Shows nights, subtotal, taxes, total
// ✅ Validates dates and availability
// → Click "Create Booking"
// ✅ addBooking() called
// ✅ Booking created in store
// ✅ Redirected to booking detail page
// ✅ Booking appears in /admin/bookings list
```

---

## Code Comparison

### Unit Form - Before
```typescript
import { createUnit, updateUnit } from "@/lib/db/units";

export function UnitForm({ unit, mode }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "create") {
      createUnit(unitData);  // Direct call, no reactivity
    } else {
      updateUnit(unit.id, unitData);  // Direct mutation
    }

    router.push('/admin/units');  // Must navigate away
  };
}
```

### Unit Form - After
```typescript
import { useUnitsStore } from "@/lib/stores/units-store";

export function UnitForm({ unit, mode }) {
  const { addUnit, updateUnit } = useUnitsStore();  // Reactive hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "create") {
      const newUnit = addUnit(unitData);  // Reactive update
      router.push(`/admin/units/${newUnit.id}`);  // Navigate to new unit
    } else {
      const updated = updateUnit(unit.id, unitData);  // Reactive update
      if (updated) {
        router.push(`/admin/units/${unit.id}`);  // Can see changes immediately
      }
    }
  };
}
```

### Cleaning Assignment - Before
```typescript
// /src/app/admin/operations/cleaning/[id]/page.tsx

<button className="text-sm text-teal-400">
  Assign Cleaner →  {/* ❌ No onClick, doesn't work */}
</button>
```

### Cleaning Assignment - After
```typescript
// /src/app/admin/operations/cleaning/[id]/page.tsx
import { useCleaningsStore } from "@/lib/stores/cleanings-store";

const { assignCleaner } = useCleaningsStore();
const [showAssignModal, setShowAssignModal] = useState(false);
const [selectedCleanerId, setSelectedCleanerId] = useState("");

const handleAssignCleaner = () => {
  if (selectedCleanerId) {
    assignCleaner(id, selectedCleanerId);  // ✅ Works!
    setShowAssignModal(false);
  }
};

return (
  <>
    <button onClick={() => setShowAssignModal(true)}>
      Assign Cleaner →  {/* ✅ Opens modal */}
    </button>

    {showAssignModal && (
      <div className="modal">
        <select
          value={selectedCleanerId}
          onChange={(e) => setSelectedCleanerId(e.target.value)}
        >
          {availableCleaners.map(cleaner => (
            <option value={cleaner.id}>
              {cleaner.name} - Rating: {cleaner.rating}/5
            </option>
          ))}
        </select>
        <button onClick={handleAssignCleaner}>Assign</button>
      </div>
    )}
  </>
);
```

---

## What Changed Under the Hood

### Data Flow - Before
```
User Action
    ↓
Component Function
    ↓
Direct Array Mutation (units.push(...))
    ↓
❌ Nothing happens - no subscribers
❌ UI doesn't update
❌ Must reload page to see changes
```

### Data Flow - After
```
User Action
    ↓
Component Function
    ↓
Store Method (addUnit(...))
    ↓
Zustand set() - Immutable Update
    ↓
✅ All subscribers notified
✅ React re-renders components
✅ UI updates immediately
```

---

## Summary

| Feature | Before | After |
|---------|--------|-------|
| **Add Unit** | ❌ Doesn't persist | ✅ Works perfectly |
| **Edit Unit** | ❌ Doesn't update UI | ✅ Reactive updates |
| **Delete Unit** | ❌ Not implemented | ✅ Available in store |
| **Create Booking** | ❌ No form | ✅ Full form with validation |
| **Edit Booking** | ❌ Not implemented | ✅ Available in store |
| **Assign Cleaner** | ❌ Button doesn't work | ✅ Modal + full workflow |
| **Start Cleaning** | ❌ No reactivity | ✅ Updates immediately |
| **Complete Cleaning** | ❌ No reactivity | ✅ Updates immediately |
| **Verify Cleaning** | ❌ No reactivity | ✅ Updates immediately |
| **Checklist Updates** | ❌ Don't persist | ✅ Reactive updates |
| **Unit Availability** | ❌ Not checked | ✅ Validates on booking |
| **Pricing Calc** | ❌ Manual | ✅ Auto-calculated |
| **State Management** | ❌ None | ✅ Zustand stores |
| **Type Safety** | ⚠️ Partial | ✅ Full TypeScript |
| **Reactivity** | ❌ None | ✅ Full reactivity |

---

## The Bottom Line

**Before:** Buttons and forms existed but didn't actually work. Data was stored in arrays that weren't reactive. UI never updated without page reloads.

**After:** Everything works as expected. Create units, bookings, and cleanings. Assign cleaners. All changes are immediate and reactive. The app feels like a real application.
