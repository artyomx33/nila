# Supabase Type Generator

**Quick command to generate TypeScript types from Supabase schema**

## What This Does

Automatically generates TypeScript types from your Supabase database schema:
- Generates `src/types/database.ts` from current schema
- Creates types for all tables, views, functions
- Generates enum types
- Ensures type safety across application
- Integrates with Gate 1 type verification

## Usage

```bash
/supabase-type-generator
```

Or manually:
```bash
npm run types:generate
```

## Process

### Step 1: Generate Types
```bash
# Generate from local Supabase instance
npx supabase gen types typescript --local > src/types/database.ts

# Or generate from production (use with caution)
npx supabase gen types typescript --linked > src/types/database.ts

# Or generate from specific project
npx supabase gen types typescript --project-id [project-ref] > src/types/database.ts
```

### Step 2: Verify Types Compile
```bash
# Check TypeScript compilation
npx tsc --noEmit

# If errors, review generated types and schema
```

### Step 3: Update API Contracts
```bash
# Import new database types in your API files
# Example: src/types/api.ts

import { Database } from './database'

export type Student = Database['public']['Tables']['students']['Row']
export type StudentInsert = Database['public']['Tables']['students']['Insert']
export type StudentUpdate = Database['public']['Tables']['students']['Update']
```

### Step 4: Create Zod Schemas (for Gate 1)
```bash
# Create runtime validation schemas
# Example: src/types/schemas.ts

import { z } from 'zod'
import type { StudentInsert } from './api'

export const StudentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  pin: z.string().length(4).regex(/^\d{4}$/),
  // ... more fields
}) satisfies z.ZodType<StudentInsert>
```

### Step 5: Run Gate 1 Verification
```bash
# Verify types are complete and correct
npm run gate:1

# Or run type verification only
npm run verify:types
```

## Generated File Structure

The generated `src/types/database.ts` has this structure:

```typescript
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          name: string
          email: string
          created_at: string
          // ... all columns
        }
        Insert: {
          id?: string
          name: string
          email: string
          created_at?: string
          // ... required and optional inserts
        }
        Update: {
          id?: string
          name?: string
          email?: string
          created_at?: string
          // ... all columns optional
        }
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          }
        ]
      }
      // ... more tables
    }
    Views: {
      // ... any database views
    }
    Functions: {
      // ... any database functions
    }
    Enums: {
      // ... any enum types
    }
    CompositeTypes: {
      // ... any composite types
    }
  }
}
```

## Usage Patterns

### Pattern 1: Use Row types for fetched data
```typescript
import { Database } from '@/types/database'

type Student = Database['public']['Tables']['students']['Row']

// Fetch students with correct typing
const { data: students } = await supabase
  .from('students')
  .select('*')
// students is typed as Student[] | null
```

### Pattern 2: Use Insert types for creating records
```typescript
type StudentInsert = Database['public']['Tables']['students']['Insert']

const newStudent: StudentInsert = {
  name: 'John Doe',
  email: 'john@example.com',
  pin: '1234'
  // id and created_at are optional (have defaults)
}

const { data, error } = await supabase
  .from('students')
  .insert(newStudent)
  .select()
  .single()
```

### Pattern 3: Use Update types for partial updates
```typescript
type StudentUpdate = Database['public']['Tables']['students']['Update']

const updates: StudentUpdate = {
  name: 'Jane Doe'
  // All fields optional for updates
}

const { data, error } = await supabase
  .from('students')
  .update(updates)
  .eq('id', studentId)
  .select()
  .single()
```

### Pattern 4: Type relations with joins
```typescript
type Student = Database['public']['Tables']['students']['Row']
type Class = Database['public']['Tables']['classes']['Row']

// Manual typing for join queries
type StudentWithClass = Student & {
  class: Class
}

const { data: students } = await supabase
  .from('students')
  .select('*, class:classes(*)')
// Manually cast to StudentWithClass[]
```

### Pattern 5: Type-safe Supabase client
```typescript
// Create typed Supabase client
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Now all queries are fully typed
const { data } = await supabase
  .from('students')  // ← IDE autocomplete
  .select('name, email')  // ← Column autocomplete
  .eq('class_id', classId)  // ← Type-safe WHERE clause
```

## Integration with TISAverse

### Update Helper Types
After generating database types, update `src/types/api.ts`:

```typescript
import { Database } from './database'

// Table row types
export type Student = Database['public']['Tables']['students']['Row']
export type Class = Database['public']['Tables']['classes']['Row']
export type LibraryBook = Database['public']['Tables']['library_books']['Row']
export type LibraryCheckout = Database['public']['Tables']['library_checkouts']['Row']
export type Quest = Database['public']['Tables']['quests']['Row']
export type XPTransaction = Database['public']['Tables']['xp_transactions']['Row']

// Insert types
export type StudentInsert = Database['public']['Tables']['students']['Insert']
export type ClassInsert = Database['public']['Tables']['classes']['Insert']
export type LibraryCheckoutInsert = Database['public']['Tables']['library_checkouts']['Insert']
export type QuestInsert = Database['public']['Tables']['quests']['Insert']

// Update types
export type StudentUpdate = Database['public']['Tables']['students']['Update']
export type ClassUpdate = Database['public']['Tables']['classes']['Update']
export type LibraryCheckoutUpdate = Database['public']['Tables']['library_checkouts']['Update']
export type QuestUpdate = Database['public']['Tables']['quests']['Update']

// Extended types with relations
export type StudentWithStats = Student & {
  total_xp: number
  active_checkouts: number
  class: Class
}

export type LibraryCheckoutWithDetails = LibraryCheckout & {
  student: Student
  book: LibraryBook
}
```

### Update Zod Schemas
After generating database types, update `src/types/schemas.ts`:

```typescript
import { z } from 'zod'

// Student validation schema
export const StudentSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email format'),
  pin: z.string().length(4, 'PIN must be 4 digits').regex(/^\d{4}$/, 'PIN must be numeric'),
  class_id: z.string().uuid('Invalid class ID'),
  created_at: z.string().datetime().optional()
})

// Library checkout validation schema
export const LibraryCheckoutSchema = z.object({
  id: z.string().uuid().optional(),
  student_id: z.string().uuid('Invalid student ID'),
  book_id: z.string().uuid('Invalid book ID'),
  checked_out_at: z.string().datetime().optional(),
  due_at: z.string().datetime('Due date is required'),
  returned_at: z.string().datetime().optional(),
  fine_amount: z.number().min(0, 'Fine cannot be negative').optional()
})

// Quest submission validation schema
export const QuestSubmissionSchema = z.object({
  id: z.string().uuid().optional(),
  student_id: z.string().uuid('Invalid student ID'),
  quest_id: z.string().uuid('Invalid quest ID'),
  evidence_url: z.string().url('Invalid evidence URL').optional(),
  submitted_at: z.string().datetime().optional(),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  xp_awarded: z.number().min(0, 'XP cannot be negative').default(0)
})
```

### Update Supabase Client
Ensure your Supabase client is typed:

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Export typed database type
export type TypedSupabaseClient = typeof supabase
```

## Automation

### NPM Script Setup
Add to `package.json`:

```json
{
  "scripts": {
    "types:generate": "npx supabase gen types typescript --local > src/types/database.ts",
    "types:generate:prod": "npx supabase gen types typescript --linked > src/types/database.ts",
    "types:verify": "npx tsc --noEmit",
    "types:update": "npm run types:generate && npm run types:verify",
    "postmigration": "npm run types:update"
  }
}
```

### Git Hooks
Add to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Verify types match database schema
echo "Verifying database types..."

# Generate types from current local schema
npx supabase gen types typescript --local > /tmp/database-types-check.ts

# Compare with committed types
if ! diff -q src/types/database.ts /tmp/database-types-check.ts > /dev/null; then
  echo "❌ Database types are out of sync with schema"
  echo "Run: npm run types:generate"
  exit 1
fi

echo "✅ Database types verified"
```

## Troubleshooting

### Error: "Supabase CLI not found"
```bash
# Install Supabase CLI
npm install -g supabase

# Or use via npx
npx supabase gen types typescript --local > src/types/database.ts
```

### Error: "Cannot connect to local Supabase"
```bash
# Start local Supabase
npx supabase start

# Check status
npx supabase status

# If not initialized
npx supabase init
```

### Error: "Generated types have TypeScript errors"
```bash
# Check schema for issues
npx supabase db lint

# Verify migrations applied
npx supabase db reset

# Regenerate types
npm run types:generate

# Check TypeScript compilation
npx tsc --noEmit
```

### Error: "Types don't match actual data"
```bash
# Schema might have changed without migration
# Pull current production schema
npx supabase db pull

# Apply all migrations fresh
npx supabase db reset

# Regenerate types
npm run types:generate
```

### Error: "Import error: Cannot find module './database'"
```bash
# Verify file was generated
ls -la src/types/database.ts

# If missing, generate it
npm run types:generate

# Verify TypeScript can find it
npx tsc --noEmit
```

## Best Practices

### DO's
- ✅ Regenerate types after every migration
- ✅ Commit generated types to version control
- ✅ Use Row types for fetched data
- ✅ Use Insert types for creating records
- ✅ Use Update types for partial updates
- ✅ Create helper type aliases in `api.ts`
- ✅ Validate with Zod schemas at runtime
- ✅ Run `npx tsc --noEmit` after generation

### DON'Ts
- ❌ Never manually edit `database.ts`
- ❌ Never commit out-of-sync types
- ❌ Never skip type generation after migration
- ❌ Never use `any` instead of generated types
- ❌ Never generate from production unless necessary
- ❌ Never commit types without verifying compilation

## Integration with Gate 1

After generating types:

1. **Verify types compile**: `npx tsc --noEmit`
2. **Update API contracts**: Add type aliases to `api.ts`
3. **Create Zod schemas**: Add runtime validation
4. **Run Gate 1**: `npm run gate:1`
5. **Proceed to Gate 2**: If approved

## Quick Commands

```bash
# Generate types from local
npm run types:generate

# Generate types from production
npm run types:generate:prod

# Verify types compile
npm run types:verify

# Generate and verify
npm run types:update

# Check for type mismatches
git diff src/types/database.ts
```

## Example Complete Workflow

```bash
# 1. Create migration
npx supabase migration new add_student_achievements

# 2. Write migration SQL
vim supabase/migrations/YYYYMMDDHHMMSS_add_student_achievements.sql

# 3. Apply migration locally
npx supabase db reset

# 4. Generate types
npm run types:generate

# 5. Verify types
npx tsc --noEmit

# 6. Update API contracts
vim src/types/api.ts
# Add: export type StudentAchievement = Database['public']['Tables']['student_achievements']['Row']

# 7. Create Zod schema
vim src/types/schemas.ts
# Add: export const StudentAchievementSchema = z.object({...})

# 8. Run Gate 1
npm run gate:1

# 9. Commit if approved
git add src/types/
git commit -m "feat: add student achievements types"
```

## Remember

**Type Safety is Critical**
- Always regenerate types after schema changes
- Always verify types compile
- Always use generated types (never `any`)
- Always commit types with migrations

**TISA Compliance**
- Types are generated from schema only
- No mock data in type definitions
- Real data only via application

**Gate Integration**
- Type generation is part of Gate 1
- Cannot proceed to Gate 2 without types
- Types must compile before approval

---

**This command ensures TISAverse maintains 100% type safety from database to application layer.**
