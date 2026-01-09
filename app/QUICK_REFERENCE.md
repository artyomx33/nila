# Quick Reference - Zustand Stores

## Import Stores

```typescript
import { useUnitsStore } from '@/lib/stores/units-store';
import { useBookingsStore } from '@/lib/stores/bookings-store';
import { useCleaningsStore } from '@/lib/stores/cleanings-store';
```

---

## Units Store

### Read Data
```typescript
const { units, getUnit, getUnits } = useUnitsStore();

// Get all units
const allUnits = units;

// Get single unit
const unit = getUnit("unit-1");

// Get filtered units
const available = getUnits({ status: 'available' });
const apartments = getUnits({ type: 'apartment' });
const searched = getUnits({ search: 'Casa' });
```

### Create
```typescript
const { addUnit } = useUnitsStore();

const newUnit = addUnit({
  name: "Casa Nueva",
  type: "apartment",
  bedrooms: 2,
  bathrooms: 1,
  floor: 3,
  neighborhood: "Centro",
  owner_id: "owner-1",
  amenities: ["wifi", "ac", "pool"],
  is_smart: true,
  rental_type: "short",
  pricing: {
    base: 2500,
    high_season: 3500,
    low_season: 2000,
    cleaning_fee: 800,
    currency: "MXN",
  },
  photos: [],
  guide: "Welcome!",
  platform_urls: {
    airbnb: "https://...",
    booking: null,
  },
  status: "available",
});
```

### Update
```typescript
const { updateUnit } = useUnitsStore();

updateUnit("unit-1", {
  status: "maintenance",
  pricing: { ...unit.pricing, base: 2800 },
});
```

### Delete
```typescript
const { deleteUnit } = useUnitsStore();

const success = deleteUnit("unit-1");
```

---

## Bookings Store

### Read Data
```typescript
const {
  bookings,
  getBooking,
  getBookingsByUnit,
  getBookingsByStatus,
  getTodayCheckIns,
  getTodayCheckOuts,
} = useBookingsStore();

// Get all bookings
const allBookings = bookings;

// Get single booking
const booking = getBooking("booking-1");

// Get by unit
const unitBookings = getBookingsByUnit("unit-1");

// Get by status
const confirmed = getBookingsByStatus("confirmed");

// Get today's activity
const checkIns = getTodayCheckIns();
const checkOuts = getTodayCheckOuts();
```

### Check Availability
```typescript
const { isUnitAvailable } = useBookingsStore();

const available = isUnitAvailable(
  "unit-1",
  new Date("2026-02-01"),
  new Date("2026-02-08")
);
// Returns: true if available, false if conflict
```

### Create
```typescript
const { addBooking } = useBookingsStore();

const newBooking = addBooking({
  unit_id: "unit-1",
  guest: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555 123 4567",
    nationality: "USA",
    guests_count: 2,
    notes: "Anniversary trip",
  },
  check_in: new Date("2026-02-01"),
  check_out: new Date("2026-02-08"),
  source: "direct",
  status: "pending",
  pricing: {
    nightly_rate: 2500,
    nights: 7,
    subtotal: 17500,
    cleaning_fee: 800,
    taxes: 2790,
    total: 21090,
    currency: "MXN",
  },
  payment_status: "pending",
  notes: "Early check-in requested",
});
```

### Update
```typescript
const { updateBooking } = useBookingsStore();

updateBooking("booking-1", {
  status: "confirmed",
  payment_status: "paid",
});
```

### Cancel
```typescript
const { cancelBooking } = useBookingsStore();

cancelBooking("booking-1"); // Sets status to 'cancelled'
```

### Delete
```typescript
const { deleteBooking } = useBookingsStore();

const success = deleteBooking("booking-1");
```

---

## Cleanings Store

### Read Data
```typescript
const {
  cleanings,
  getCleaning,
  getCleaningsByStatus,
  getCleaningsByUnit,
  getCleaningsByCleaner,
} = useCleaningsStore();

// Get all cleanings
const allCleanings = cleanings;

// Get single cleaning
const cleaning = getCleaning("cleaning-1");

// Get by status
const pending = getCleaningsByStatus("pending");

// Get by unit
const unitCleanings = getCleaningsByUnit("unit-1");

// Get by cleaner
const cleanerTasks = getCleaningsByCleaner("cleaner-1");
```

### Create
```typescript
const { addCleaning } = useCleaningsStore();

const newCleaning = addCleaning({
  unit_id: "unit-1",
  booking_id: "booking-1",
  scheduled_date: new Date("2026-02-01T11:00:00"),
  cleaner_id: null,
  type: "turnover",
  status: "pending",
  checklist: standardChecklist,
  photos: [],
  notes: null,
  started_at: null,
  completed_at: null,
  verified_at: null,
});
```

### Assign Cleaner
```typescript
const { assignCleaner } = useCleaningsStore();

assignCleaner("cleaning-1", "cleaner-1");
// Updates cleaner_id AND sets status to 'assigned'
```

### Update Status
```typescript
const { updateStatus } = useCleaningsStore();

updateStatus("cleaning-1", "in_progress");
```

### Workflow Methods
```typescript
const {
  startCleaning,
  completeCleaning,
  verifyCleaning,
} = useCleaningsStore();

// Start cleaning
startCleaning("cleaning-1");
// → status: 'in_progress'
// → started_at: now

// Complete cleaning
completeCleaning("cleaning-1");
// → status: 'completed'
// → completed_at: now

// Verify cleaning
verifyCleaning("cleaning-1");
// → status: 'verified'
// → verified_at: now
```

### Update Checklist
```typescript
const { updateChecklist } = useCleaningsStore();

const updatedChecklist = cleaning.checklist.map(item =>
  item.id === "mb-1"
    ? { ...item, completed: true }
    : item
);

updateChecklist("cleaning-1", updatedChecklist);
```

### Update (General)
```typescript
const { updateCleaning } = useCleaningsStore();

updateCleaning("cleaning-1", {
  notes: "Unit in good condition",
  photos: [...cleaning.photos, "/uploads/new-photo.jpg"],
});
```

### Delete
```typescript
const { deleteCleaning } = useCleaningsStore();

const success = deleteCleaning("cleaning-1");
```

---

## Common Patterns

### Pattern 1: List + Actions
```typescript
function UnitsList() {
  const { units, deleteUnit } = useUnitsStore();

  return (
    <div>
      {units.map(unit => (
        <div key={unit.id}>
          <h3>{unit.name}</h3>
          <button onClick={() => deleteUnit(unit.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

### Pattern 2: Form + Create
```typescript
function CreateForm() {
  const { addUnit } = useUnitsStore();
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    const newUnit = addUnit(formData);
    router.push(`/admin/units/${newUnit.id}`);
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Pattern 3: Detail + Update
```typescript
function UnitDetail({ id }: { id: string }) {
  const { getUnit, updateUnit } = useUnitsStore();
  const unit = getUnit(id);

  const handleStatusChange = (status: UnitStatus) => {
    updateUnit(id, { status });
  };

  return (
    <div>
      <h1>{unit?.name}</h1>
      <select
        value={unit?.status}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
        <option value="maintenance">Maintenance</option>
      </select>
    </div>
  );
}
```

### Pattern 4: Filtering
```typescript
function FilteredList() {
  const { getUnits } = useUnitsStore();
  const [status, setStatus] = useState<UnitStatus | undefined>();

  const filteredUnits = getUnits({ status });

  return (
    <div>
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
      </select>

      {filteredUnits.map(unit => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
```

### Pattern 5: Availability Checking
```typescript
function BookingForm() {
  const { isUnitAvailable } = useBookingsStore();
  const [unitId, setUnitId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const available = unitId && checkIn && checkOut
    ? isUnitAvailable(
        unitId,
        new Date(checkIn),
        new Date(checkOut)
      )
    : null;

  return (
    <form>
      {/* ... form fields ... */}

      {available === false && (
        <p className="error">
          Unit not available for these dates
        </p>
      )}

      {available === true && (
        <p className="success">Unit is available!</p>
      )}
    </form>
  );
}
```

---

## Tips

1. **Always destructure what you need:**
   ```typescript
   ✅ const { addUnit, updateUnit } = useUnitsStore();
   ❌ const store = useUnitsStore();
   ```

2. **Use getters for computed data:**
   ```typescript
   ✅ const available = getUnits({ status: 'available' });
   ❌ const available = units.filter(u => u.status === 'available');
   ```

3. **Check return values:**
   ```typescript
   const updated = updateUnit(id, data);
   if (updated) {
     // Success
   } else {
     // Not found
   }
   ```

4. **Use proper types:**
   ```typescript
   import { Unit, UnitStatus } from '@/types';

   const handleUpdate = (status: UnitStatus) => {
     updateUnit(id, { status });
   };
   ```

5. **Handle loading states:**
   ```typescript
   const unit = getUnit(id);

   if (!unit) {
     return <div>Loading...</div>;
   }

   return <div>{unit.name}</div>;
   ```

---

## File Locations

| Store | Path |
|-------|------|
| Units | `/src/lib/stores/units-store.ts` |
| Bookings | `/src/lib/stores/bookings-store.ts` |
| Cleanings | `/src/lib/stores/cleanings-store.ts` |

| Component | Path |
|-----------|------|
| Unit Form | `/src/components/admin/units/unit-form.tsx` |
| Booking Form | `/src/components/bookings/BookingForm.tsx` |
| Cleaning Detail | `/src/app/admin/operations/cleaning/[id]/page.tsx` |

| Page | Path |
|------|------|
| New Booking | `/src/app/admin/bookings/new/page.tsx` |
