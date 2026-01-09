# NILA Estate Management - Supabase Setup Guide

This guide will help you set up Supabase for real data persistence in the NILA Estate Management application.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Setup Steps

### 1. Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in your project details:
   - **Name**: NILA Estate Management
   - **Database Password**: Choose a strong password (save it securely)
   - **Region**: Choose the closest region to Riviera Maya (e.g., US East)
4. Wait for the project to be created (takes ~2 minutes)

### 2. Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. You'll need two values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

### 3. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Run the Database Migration

You have two options to run the migration:

#### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `supabase/migrations/001_initial_schema.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the migration

#### Option B: Using Supabase CLI

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-id
   ```

4. Push the migration:
   ```bash
   supabase db push
   ```

### 5. Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the following tables:
   - owners
   - units
   - bookings
   - staff
   - cleanings
   - maintenance_requests
   - expenses

### 6. (Optional) Seed Initial Data

If you want to populate your database with the mock data from the app:

1. Go to **SQL Editor** in Supabase
2. Create a new query
3. Add INSERT statements for your initial data
4. Run the query

Example for adding an owner:
```sql
INSERT INTO owners (name, email, phone, commission_rate)
VALUES ('John Doe', 'john@example.com', '+52 998 123 4567', 15.00);
```

## Database Schema Overview

### Tables

- **owners**: Property owners with contact and commission info
- **units**: Properties/rentals with details, pricing, and amenities
- **bookings**: Guest reservations with dates, pricing, and status
- **staff**: Cleaners and maintenance workers
- **cleanings**: Cleaning schedules and checklists
- **maintenance_requests**: Repair and maintenance tracking
- **expenses**: Operating expenses and costs

### Key Features

- **Row Level Security (RLS)**: Enabled on all tables
- **Automatic Timestamps**: `created_at` and `updated_at` fields
- **Foreign Keys**: Proper relationships between tables
- **Indexes**: Optimized for common queries
- **JSON Support**: Flexible data structures for pricing, guest info, etc.

## Using the Data Access Layer

The app includes a comprehensive data access layer in `/src/lib/supabase/queries.ts`.

### Example Usage

```typescript
import { getUnits, createBooking, updateCleaning } from '@/lib/supabase';

// Get all available units
const units = await getUnits({ status: 'available' });

// Create a booking
const booking = await createBooking({
  unit_id: 'unit-id-here',
  guest: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 555 123 4567',
    nationality: 'USA',
    guests_count: 2,
  },
  check_in: new Date('2026-02-01'),
  check_out: new Date('2026-02-08'),
  source: 'direct',
  status: 'confirmed',
  pricing: {
    nightly_rate: 2500,
    nights: 7,
    subtotal: 17500,
    cleaning_fee: 800,
    taxes: 2790,
    total: 21090,
    currency: 'MXN',
  },
  payment_status: 'paid',
});

// Update cleaning status
await updateCleaning('cleaning-id-here', {
  status: 'completed',
  completed_at: new Date(),
});
```

## Security Notes

### Current Setup (Development)

The database currently has **permissive policies** that allow all operations. This is for development convenience.

### Before Production

You MUST update the Row Level Security policies to implement proper authentication:

1. Set up Supabase Auth
2. Remove the development policies
3. Add authentication-based policies

Example production policy:
```sql
-- Remove development policy
DROP POLICY "Allow all operations for development" ON units;

-- Add authenticated policy
CREATE POLICY "Users can view all units" ON units
  FOR SELECT USING (true);

CREATE POLICY "Admins can modify units" ON units
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );
```

## Troubleshooting

### Error: "Missing Supabase environment variables"

Make sure you've created `.env.local` with the correct variables:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

Restart your dev server after adding the variables.

### Error: "relation 'units' does not exist"

The database migration hasn't been run. Follow Step 4 above.

### Connection Issues

1. Check that your Supabase project is active
2. Verify your API credentials are correct
3. Ensure your internet connection is stable
4. Check Supabase status page: https://status.supabase.com

## Next Steps

After setting up Supabase:

1. **Update Components**: Modify your React components to use the Supabase queries instead of mock data
2. **Add Authentication**: Implement Supabase Auth for user login
3. **Add Real-time Features**: Use Supabase Realtime for live updates
4. **Set Up Storage**: Configure Supabase Storage for photos and documents
5. **Implement RLS**: Add proper Row Level Security policies

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)

## Support

If you encounter issues:
1. Check the [Supabase Discord](https://discord.supabase.com)
2. Review the [Supabase GitHub Discussions](https://github.com/supabase/supabase/discussions)
3. Consult the documentation links above
