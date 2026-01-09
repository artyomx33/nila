# Supabase Quick Start

Fast setup guide for NILA Estate Management.

## 5-Minute Setup

### 1. Create Supabase Project
https://app.supabase.com → New Project → Name it "NILA Estate Management"

### 2. Get Credentials
Settings → API → Copy:
- Project URL
- anon public key

### 3. Configure App
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4. Run Migration
Supabase Dashboard → SQL Editor → New Query → Paste contents of:
```
supabase/migrations/001_initial_schema.sql
```
Click **RUN**

### 5. (Optional) Add Sample Data
SQL Editor → New Query → Paste:
```
supabase/seed.sql
```
Click **RUN**

### 6. Verify
Table Editor → You should see 7 tables:
- owners
- units
- bookings
- staff
- cleanings
- maintenance_requests
- expenses

## Start Using

```typescript
import { getUnits, createBooking } from '@/lib/supabase';

// Fetch data
const units = await getUnits({ status: 'available' });

// Create data
const booking = await createBooking({
  unit_id: 'unit-id',
  guest: { name: 'John Doe', ... },
  check_in: new Date('2026-03-01'),
  check_out: new Date('2026-03-08'),
  // ... rest of booking data
});
```

## Files Overview

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Supabase connection |
| `src/lib/supabase/queries.ts` | 40+ data functions |
| `src/lib/supabase/types.ts` | TypeScript types |
| `supabase/migrations/001_initial_schema.sql` | Database schema |
| `supabase/seed.sql` | Sample data |

## Common Commands

```bash
# Install dependencies (already done)
npm install @supabase/supabase-js

# Start dev server
npm run dev

# Type check
npm run type-check
```

## Next Steps

1. Read full guide: `supabase/README.md`
2. Migrate components: `supabase/MIGRATION_GUIDE.md`
3. See completion notes: `SUPABASE_SETUP_COMPLETE.md`

## Troubleshooting

**Error: Missing environment variables**
→ Create `.env.local` with credentials

**Error: relation 'units' does not exist**
→ Run the migration SQL in Supabase dashboard

**Can't connect to database**
→ Check credentials, verify project is active

## Resources

- Supabase Dashboard: https://app.supabase.com
- Docs: https://supabase.com/docs
- JS Reference: https://supabase.com/docs/reference/javascript
