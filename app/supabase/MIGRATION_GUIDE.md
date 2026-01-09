# Migration Guide: From Mock Data to Supabase

This guide explains how to transition your NILA Estate Management app from using mock data to real Supabase persistence.

## Overview

Currently, the app uses in-memory mock data from files like:
- `/src/lib/db/units.ts`
- `/src/lib/db/bookings.ts`
- `/src/lib/db/cleanings.ts`
- `/src/lib/db/cleaners.ts`
- `/src/lib/db/maintenance.ts`

After migration, the app will use Supabase for real database persistence.

## Migration Steps

### Step 1: Set Up Supabase

Follow the instructions in `/supabase/README.md` to:
1. Create a Supabase project
2. Configure environment variables
3. Run the database migration
4. (Optional) Seed initial data

### Step 2: Update Component Imports

You'll need to update your React components to use Supabase queries instead of mock data functions.

#### Before (Mock Data):
```typescript
import { getUnits, getUnitById } from '@/lib/db/units';

// In component
const units = getUnits({ status: 'available' });
```

#### After (Supabase):
```typescript
import { getUnits, getUnitById } from '@/lib/supabase';
import { useEffect, useState } from 'react';

// In component
const [units, setUnits] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchUnits() {
    try {
      const data = await getUnits({ status: 'available' });
      setUnits(data);
    } catch (error) {
      console.error('Error fetching units:', error);
    } finally {
      setLoading(false);
    }
  }

  fetchUnits();
}, []);
```

### Step 3: Handle Async Operations

Supabase queries are async, so you need to:
1. Use `async/await` syntax
2. Add loading states
3. Handle errors properly
4. Update UI to show loading indicators

#### Example: Update a Unit Component

**Before:**
```typescript
'use client';

import { getUnits } from '@/lib/db/units';

export default function UnitsPage() {
  const units = getUnits();

  return (
    <div>
      {units.map(unit => (
        <div key={unit.id}>{unit.name}</div>
      ))}
    </div>
  );
}
```

**After:**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { getUnits } from '@/lib/supabase';

export default function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUnits() {
      try {
        const data = await getUnits();
        setUnits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUnits();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {units.map(unit => (
        <div key={unit.id}>{unit.name}</div>
      ))}
    </div>
  );
}
```

### Step 4: Update Create/Update/Delete Operations

All mutations need to be async and handle errors:

#### Creating a Booking

**Before:**
```typescript
import { createBooking } from '@/lib/db/bookings';

const newBooking = createBooking(bookingData);
// Immediately available
```

**After:**
```typescript
import { createBooking } from '@/lib/supabase';

try {
  const newBooking = await createBooking(bookingData);
  // Handle success
  console.log('Booking created:', newBooking);
} catch (error) {
  // Handle error
  console.error('Failed to create booking:', error);
}
```

### Step 5: Use React Query (Recommended)

For better state management, consider using React Query:

```bash
npm install @tanstack/react-query
```

**Example with React Query:**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUnits, createUnit } from '@/lib/supabase';

export default function UnitsPage() {
  const queryClient = useQueryClient();

  // Fetch units
  const { data: units, isLoading, error } = useQuery({
    queryKey: ['units'],
    queryFn: () => getUnits(),
  });

  // Create unit mutation
  const createMutation = useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['units']);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {units?.map(unit => (
        <div key={unit.id}>{unit.name}</div>
      ))}
    </div>
  );
}
```

## Function Mapping

Here's how the old mock functions map to new Supabase functions:

### Units
| Mock Function | Supabase Function | Notes |
|--------------|------------------|-------|
| `getUnits()` | `getUnits()` | Now async |
| `getUnit(id)` | `getUnitById(id)` | Now async |
| `createUnit()` | `createUnit()` | Now async |
| `updateUnit()` | `updateUnit()` | Now async |
| `deleteUnit()` | `deleteUnit()` | Now async |
| `getUnitStats()` | `getUnitStats()` | Now async |

### Bookings
| Mock Function | Supabase Function | Notes |
|--------------|------------------|-------|
| `getAllBookings()` | `getAllBookings()` | Now async |
| `getBookingById()` | `getBookingById()` | Now async |
| `getBookingsByUnit()` | `getBookingsByUnit()` | Now async |
| `getBookingsByStatus()` | `getBookingsByStatus()` | Now async |
| `getBookingsInRange()` | `getBookingsInRange()` | Now async |
| `createBooking()` | `createBooking()` | Now async |
| `updateBooking()` | `updateBooking()` | Now async |
| `deleteBooking()` | `deleteBooking()` | Now async |
| `isUnitAvailable()` | `isUnitAvailable()` | Now async |

### Cleanings
| Mock Function | Supabase Function | Notes |
|--------------|------------------|-------|
| `getAllCleanings()` | `getAllCleanings()` | Now async |
| `getCleaningById()` | `getCleaningById()` | Now async |
| `getCleaningsByStatus()` | `getCleaningsByStatus()` | Now async |
| `getCleaningsByUnit()` | `getCleaningsByUnit()` | Now async |
| `createCleaning()` | `createCleaning()` | Now async |
| `updateCleaning()` | `updateCleaning()` | Now async |
| `deleteCleaning()` | `deleteCleaning()` | Now async |

### Staff
| Mock Function | Supabase Function | Notes |
|--------------|------------------|-------|
| `getAllCleaners()` | `getAllStaff()` | Now async |
| `getCleanerById()` | `getStaffById()` | Now async |
| N/A | `getActiveCleaners()` | New function |
| `createCleaner()` | `createStaff()` | Now async |
| `updateCleaner()` | `updateStaff()` | Now async |
| `deleteCleaner()` | `deleteStaff()` | Now async |

### Maintenance
| Mock Function | Supabase Function | Notes |
|--------------|------------------|-------|
| `getAllMaintenanceRequests()` | `getAllMaintenanceRequests()` | Now async |
| `getMaintenanceRequestById()` | `getMaintenanceRequestById()` | Now async |
| `getMaintenanceRequestsByStatus()` | `getMaintenanceRequestsByStatus()` | Now async |
| `getMaintenanceRequestsByUnit()` | `getMaintenanceRequestsByUnit()` | Now async |
| `createMaintenanceRequest()` | `createMaintenanceRequest()` | Now async |
| `updateMaintenanceRequest()` | `updateMaintenanceRequest()` | Now async |
| `deleteMaintenanceRequest()` | `deleteMaintenanceRequest()` | Now async |

## Common Patterns

### Loading States
```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    setLoading(true);
    try {
      const data = await getUnits();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);
```

### Error Handling
```typescript
const [error, setError] = useState(null);

try {
  const result = await createBooking(bookingData);
  setError(null); // Clear previous errors
} catch (err) {
  setError(err.message);
  // Show error to user
}
```

### Form Submission
```typescript
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const newUnit = await createUnit(formData);
    // Success - redirect or show message
    router.push('/units');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
```

## Testing During Migration

You can test incrementally by:

1. Keep mock data files as backup
2. Create a flag to switch between mock and real data:

```typescript
// config.ts
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// In components
const getUnits = USE_MOCK_DATA
  ? require('@/lib/db/units').getUnits
  : require('@/lib/supabase').getUnits;
```

3. Test one module at a time (e.g., units first, then bookings, etc.)

## Troubleshooting

### "Cannot read properties of undefined"
- Make sure you're handling loading states
- Check that data exists before mapping

### "Network error" or "Failed to fetch"
- Verify Supabase credentials in `.env.local`
- Check your internet connection
- Ensure Supabase project is active

### "Row Level Security policy violation"
- Development policies should allow all operations
- If you've modified RLS policies, check they're correct

### Data type mismatches
- Dates are returned as strings from Supabase
- Convert using `new Date(dateString)` when needed

## Best Practices

1. **Always handle errors**: Show user-friendly error messages
2. **Add loading states**: Improve UX with loading indicators
3. **Use React Query**: Better caching and state management
4. **Validate data**: Check data before sending to Supabase
5. **Test incrementally**: Don't migrate everything at once
6. **Keep backups**: Keep mock data files until fully migrated

## Next Features to Add

After basic migration:
1. **Real-time subscriptions**: Get live updates when data changes
2. **Optimistic updates**: Update UI before server confirms
3. **Caching strategy**: Reduce unnecessary API calls
4. **Pagination**: Handle large datasets efficiently
5. **Search**: Implement full-text search with Supabase

## Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
