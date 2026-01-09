# State Management Architecture

## Overview

The NILA Estate Management app now uses Zustand for reactive state management, providing a clean separation between data layer and UI components.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         React Components                          │
│  (Pages, Forms, Lists, Detail Views)                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ useStore() hooks
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                      Zustand Stores                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Units Store  │  │Bookings Store│  │Cleanings Store│         │
│  │              │  │              │  │              │         │
│  │ - units[]    │  │ - bookings[] │  │ - cleanings[]│         │
│  │ - addUnit    │  │ - addBooking │  │ - addCleaning│         │
│  │ - updateUnit │  │ - updateBook │  │ - assignClean│         │
│  │ - deleteUnit │  │ - deleteBook │  │ - startClean │         │
│  │ - getUnit    │  │ - getBooking │  │ - complete   │         │
│  │ - getUnits   │  │ - isAvailable│  │ - verify     │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ initialize with
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│                         Mock Data                                │
│  /src/lib/db/units.ts    /src/lib/db/bookings.ts               │
│  /src/lib/db/cleanings.ts                                       │
└─────────────────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### 1. Components Layer
**Location:** `/src/components/*`, `/src/app/*`
**Responsibility:** Presentation and user interaction
**Examples:**
- `UnitForm` - Renders form, handles user input
- `BookingForm` - Collects booking data, validates
- `CleaningDetail` - Displays cleaning info, shows modal

**Rules:**
- Components don't know about data storage
- Components use hooks to access state
- Components call store methods to update data
- Components re-render when store state changes

### 2. Stores Layer
**Location:** `/src/lib/stores/*`
**Responsibility:** State management and business logic
**Examples:**
- `useUnitsStore` - Manages all unit data and operations
- `useBookingsStore` - Handles bookings + availability logic
- `useCleaningsStore` - Manages cleaning workflow

**Rules:**
- Stores are the single source of truth
- All state updates go through store methods
- Stores notify subscribers of changes
- Stores handle validation and computed values

### 3. Data Layer
**Location:** `/src/lib/db/*`
**Responsibility:** Initial data and type definitions
**Examples:**
- `mockUnits` - Initial unit data
- `mockBookings` - Initial booking data
- `mockCleanings` - Initial cleaning data

**Rules:**
- Only used to initialize stores
- Never imported directly by components
- Will be replaced by API calls when backend is ready

## Data Flow

### Read Flow
```
1. Component renders
   ↓
2. Component calls useStore() hook
   ↓
3. Hook subscribes component to store
   ↓
4. Component receives current state
   ↓
5. Component renders with data
   ↓
6. Store state changes elsewhere
   ↓
7. Hook notifies component
   ↓
8. Component re-renders with new data
```

### Write Flow
```
1. User interacts with UI
   ↓
2. Component event handler fires
   ↓
3. Handler calls store method (e.g., addUnit)
   ↓
4. Store validates input
   ↓
5. Store updates state immutably
   ↓
6. Zustand notifies all subscribers
   ↓
7. All components using that store re-render
   ↓
8. UI updates across the app
```

## Store Structure

Each store follows this pattern:

```typescript
import { create } from 'zustand';

interface StoreData {
  // 1. State
  items: Item[];

  // 2. CRUD Operations
  addItem: (item: Omit<Item, 'id' | 'created_at'>) => Item;
  updateItem: (id: string, updates: Partial<Item>) => Item | null;
  deleteItem: (id: string) => boolean;

  // 3. Getters
  getItem: (id: string) => Item | undefined;
  getItems: (filters?: Filters) => Item[];

  // 4. Business Logic
  specialOperation: (params) => Result;
}

export const useStore = create<StoreData>((set, get) => ({
  // State initialization
  items: [...mockData],

  // Method implementations
  addItem: (itemData) => {
    const newItem = { ...itemData, id: generateId() };
    set((state) => ({ items: [...state.items, newItem] }));
    return newItem;
  },

  // ... other methods using set() and get()
}));
```

## Component Patterns

### Pattern: List View
```typescript
function ListView() {
  // 1. Subscribe to store
  const { items } = useStore();

  // 2. Render list
  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### Pattern: Detail View
```typescript
function DetailView({ id }: { id: string }) {
  // 1. Subscribe to store
  const { getItem, updateItem } = useStore();

  // 2. Get specific item
  const item = getItem(id);

  // 3. Handle updates
  const handleUpdate = (updates) => {
    updateItem(id, updates);
  };

  // 4. Render
  return item ? (
    <div>
      <h1>{item.name}</h1>
      <button onClick={() => handleUpdate({ status: 'active' })}>
        Activate
      </button>
    </div>
  ) : null;
}
```

### Pattern: Form
```typescript
function CreateForm() {
  // 1. Subscribe to store
  const { addItem } = useStore();

  // 2. Local form state
  const [formData, setFormData] = useState({});

  // 3. Handle submit
  const handleSubmit = () => {
    const newItem = addItem(formData);
    router.push(`/items/${newItem.id}`);
  };

  // 4. Render form
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## State Update Rules

### ✅ Correct: Immutable Updates
```typescript
// Arrays
set((state) => ({
  items: [...state.items, newItem],
}));

set((state) => ({
  items: state.items.filter(item => item.id !== id),
}));

set((state) => ({
  items: state.items.map(item =>
    item.id === id ? { ...item, ...updates } : item
  ),
}));

// Objects
set((state) => ({
  config: { ...state.config, theme: 'dark' },
}));
```

### ❌ Incorrect: Direct Mutations
```typescript
// Don't do this!
set((state) => {
  state.items.push(newItem);  // ❌ Mutates array
  return state;
});

// Don't do this!
const item = get().items.find(i => i.id === id);
item.status = 'active';  // ❌ Mutates object
```

## Type Safety

All stores are fully typed:

```typescript
import { Unit, UnitType, UnitStatus } from '@/types';

interface UnitsStore {
  units: Unit[];  // Typed state
  addUnit: (unit: Omit<Unit, 'id' | 'created_at'>) => Unit;  // Typed params/return
  updateUnit: (id: string, updates: Partial<Unit>) => Unit | null;  // Typed
  getUnits: (filters?: { status?: UnitStatus }) => Unit[];  // Typed
}

export const useUnitsStore = create<UnitsStore>((set, get) => ({
  // Implementation with full type checking
}));
```

Benefits:
- Autocomplete in IDE
- Compile-time error checking
- Refactoring safety
- Better documentation

## Migration Strategy

### Current: In-Memory State
```typescript
export const useUnitsStore = create<UnitsStore>((set) => ({
  units: [...mockUnits],

  addUnit: (unitData) => {
    const newUnit = { ...unitData, id: generateId() };
    set((state) => ({ units: [...state.units, newUnit] }));
    return newUnit;
  },
}));
```

### Future: With Supabase
```typescript
export const useUnitsStore = create<UnitsStore>((set) => ({
  units: [],

  // Load initial data
  loadUnits: async () => {
    const { data } = await supabase.from('units').select('*');
    if (data) set({ units: data });
  },

  // Create with API call
  addUnit: async (unitData) => {
    const { data, error } = await supabase
      .from('units')
      .insert([unitData])
      .select()
      .single();

    if (data) {
      set((state) => ({ units: [...state.units, data] }));
      return data;
    }
    throw error;
  },
}));
```

**Key Points:**
- Store interface stays the same
- Components don't need to change
- Add loading states
- Add error handling
- Add optimistic updates

## Performance Considerations

### Selective Subscriptions
```typescript
// ✅ Good: Only subscribe to what you need
const addUnit = useUnitsStore((state) => state.addUnit);

// ⚠️ OK but less efficient
const { addUnit } = useUnitsStore();

// ❌ Bad: Re-renders on any state change
const store = useUnitsStore();
```

### Computed Values
```typescript
// ✅ Good: Compute in store
getUnits: (filters) => {
  const items = get().units;
  return filters ? items.filter(...) : items;
}

// ❌ Bad: Compute in component
const available = units.filter(u => u.status === 'available');
```

### Batched Updates
```typescript
// ✅ Good: Single update
set((state) => ({
  units: updatedUnits,
  stats: newStats,
}));

// ⚠️ Less efficient: Multiple updates
set({ units: updatedUnits });
set({ stats: newStats });
```

## Testing

### Testing Stores
```typescript
import { useUnitsStore } from '@/lib/stores/units-store';

describe('UnitsStore', () => {
  beforeEach(() => {
    // Reset store state
    useUnitsStore.setState({ units: [] });
  });

  it('adds a unit', () => {
    const { addUnit, units } = useUnitsStore.getState();

    const newUnit = addUnit({ name: 'Test Unit', ... });

    expect(newUnit.id).toBeDefined();
    expect(units).toHaveLength(1);
  });
});
```

### Testing Components
```typescript
import { renderHook } from '@testing-library/react';
import { useUnitsStore } from '@/lib/stores/units-store';

it('renders unit list', () => {
  // Set up test data
  useUnitsStore.setState({
    units: [{ id: '1', name: 'Test', ... }],
  });

  // Render component
  render(<UnitsList />);

  // Assert
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

## Directory Structure

```
src/
├── lib/
│   ├── stores/              # Zustand stores
│   │   ├── units-store.ts
│   │   ├── bookings-store.ts
│   │   └── cleanings-store.ts
│   │
│   └── db/                  # Mock data (initial state)
│       ├── units.ts
│       ├── bookings.ts
│       └── cleanings.ts
│
├── components/              # React components
│   ├── admin/
│   │   └── units/
│   │       └── unit-form.tsx
│   └── bookings/
│       └── BookingForm.tsx
│
└── app/                     # Next.js pages
    └── admin/
        ├── units/
        ├── bookings/
        └── operations/
```

## Best Practices

1. **Single Responsibility**: Each store manages one domain
2. **Immutability**: Always use immutable updates
3. **Type Safety**: Full TypeScript throughout
4. **Selective Subscriptions**: Only subscribe to needed state
5. **Computed Values**: Do filtering/sorting in stores
6. **Avoid Duplication**: Don't store derived state
7. **Clear Naming**: Methods clearly indicate actions
8. **Return Values**: Return created/updated items for chaining
9. **Error Handling**: Check return values for null/undefined
10. **Documentation**: Document complex business logic

## Future Enhancements

1. **Persistence**: Add localStorage or IndexedDB
2. **Real-time**: Add Supabase subscriptions
3. **Optimistic Updates**: Update UI before API responds
4. **Undo/Redo**: Track state history
5. **Middleware**: Add logging, analytics
6. **Devtools**: Integrate with Redux DevTools
7. **Pagination**: Add pagination to getters
8. **Caching**: Implement data caching strategies
9. **Loading States**: Add per-operation loading flags
10. **Error States**: Add error tracking and recovery
