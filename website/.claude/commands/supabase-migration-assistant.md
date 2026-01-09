# Supabase Migration Assistant

**Quick command to create safe, TISA-compliant database migrations**

## What This Does

Guides you through creating a safe Supabase database migration with:
- Proper naming convention
- Reversible migration design
- RLS policy recommendations
- TISA compliance checks (no mock data)
- Index recommendations
- Type generation reminder

## Usage

```bash
/supabase-migration-assistant
```

Or manually:
```bash
npm run migration:create [description]
```

## Process

### Step 1: Create Migration File
```bash
# Generate timestamped migration file
npx supabase migration new [description]

# Example:
npx supabase migration new add_quest_submissions_table

# Creates: supabase/migrations/20250109123456_add_quest_submissions_table.sql
```

### Step 2: Write Migration SQL
```sql
-- Migration: Add quest submissions table
-- Purpose: Track student quest completions for XP awards
-- TISA Compliance: ✅ No mock data

BEGIN;

-- Create table
CREATE TABLE IF NOT EXISTS quest_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  evidence_url TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  xp_awarded INTEGER DEFAULT 0 CHECK (xp_awarded >= 0),
  reviewer_notes TEXT,
  reviewed_by UUID REFERENCES users(id),

  -- Prevent duplicate submissions
  CONSTRAINT unique_student_quest UNIQUE (student_id, quest_id)
);

-- Add indexes
CREATE INDEX idx_quest_submissions_student ON quest_submissions(student_id);
CREATE INDEX idx_quest_submissions_quest ON quest_submissions(quest_id);
CREATE INDEX idx_quest_submissions_status ON quest_submissions(status) WHERE status = 'pending';
CREATE INDEX idx_quest_submissions_submitted_at ON quest_submissions(submitted_at DESC);

-- Add RLS policies
ALTER TABLE quest_submissions ENABLE ROW LEVEL SECURITY;

-- Students can view their own submissions
CREATE POLICY "Students view own submissions"
  ON quest_submissions
  FOR SELECT
  USING (auth.uid() = student_id);

-- Students can insert their own submissions
CREATE POLICY "Students create own submissions"
  ON quest_submissions
  FOR INSERT
  WITH CHECK (auth.uid() = student_id AND status = 'pending');

-- Staff can view all submissions
CREATE POLICY "Staff view all submissions"
  ON quest_submissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM staff_members
      WHERE staff_members.user_id = auth.uid()
    )
  );

-- Staff can update submissions (review)
CREATE POLICY "Staff review submissions"
  ON quest_submissions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM staff_members
      WHERE staff_members.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM staff_members
      WHERE staff_members.user_id = auth.uid()
    )
  );

-- ⚠️ NO MOCK DATA - TISA COMPLIANCE
-- ❌ DO NOT ADD: INSERT INTO quest_submissions VALUES (...)
-- ✅ Data created via application only

COMMIT;
```

### Step 3: Write Rollback Migration
```sql
-- File: supabase/migrations/rollback/20250109123456_add_quest_submissions_table.sql

BEGIN;

-- Drop policies first
DROP POLICY IF EXISTS "Staff review submissions" ON quest_submissions;
DROP POLICY IF EXISTS "Staff view all submissions" ON quest_submissions;
DROP POLICY IF EXISTS "Students create own submissions" ON quest_submissions;
DROP POLICY IF EXISTS "Students view own submissions" ON quest_submissions;

-- Drop table (CASCADE will drop indexes)
DROP TABLE IF EXISTS quest_submissions CASCADE;

COMMIT;
```

### Step 4: Apply Migration Locally
```bash
# Apply migration to local Supabase
npx supabase db reset

# Or apply specific migration
npx supabase migration up
```

### Step 5: Generate TypeScript Types
```bash
# Generate types from updated schema
npx supabase gen types typescript --local > src/types/database.ts

# Verify types compile
npx tsc --noEmit
```

### Step 6: TISA Compliance Check
```bash
# Scan migration for forbidden patterns
npm run verify:rules

# Or manually search:
grep -i "INSERT INTO\|mock\|sample\|test.*data\|demo" supabase/migrations/*.sql
```

### Step 7: Test Migration
```bash
# Test migration is reversible
npx supabase db reset  # Applies all migrations
npx supabase migration down  # Rolls back last migration
npx supabase migration up  # Re-applies migration

# Verify RLS policies work
psql $DATABASE_URL -c "SET ROLE student_role; SELECT * FROM quest_submissions;"
```

## Migration Safety Checklist

Before applying migration to production:

### SQL Safety
- [ ] Migration wrapped in BEGIN/COMMIT transaction
- [ ] All table names use `snake_case`
- [ ] All foreign keys have `ON DELETE` action specified
- [ ] All constraints have meaningful names
- [ ] All columns have appropriate types and constraints
- [ ] No data loss will occur

### Performance
- [ ] Indexes added for all foreign keys
- [ ] Indexes added for date columns used in queries
- [ ] Partial indexes used where appropriate (e.g., WHERE status = 'active')
- [ ] No indexes on columns that change frequently
- [ ] Migration runs in < 5 minutes (test with realistic data volume)

### RLS Policies
- [ ] RLS enabled on table: `ALTER TABLE [table] ENABLE ROW LEVEL SECURITY`
- [ ] At least one SELECT policy defined
- [ ] Policies cover all CRUD operations used by app
- [ ] Student data protected (students see own data only)
- [ ] Staff permissions appropriate for role
- [ ] Policies tested with different user roles

### TISA Compliance (CRITICAL)
- [ ] ✅ Zero `INSERT INTO` statements for data
- [ ] ✅ Zero mock/sample/test/demo data
- [ ] ✅ Zero hardcoded users or records
- [ ] ✅ No `COPY` commands loading data files
- [ ] ✅ Only schema changes (CREATE, ALTER, DROP)

### Reversibility
- [ ] Rollback migration created and tested
- [ ] Rollback documented if not fully reversible
- [ ] Data migration plan documented if needed
- [ ] Emergency rollback procedure written

### Documentation
- [ ] Migration purpose documented in SQL comments
- [ ] TISA compliance noted in comments
- [ ] Breaking changes documented
- [ ] Dependent application changes noted

## Common Education Platform Patterns

### Student Data Table
```sql
CREATE TABLE student_reading_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES library_books(id),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  pages_read INTEGER CHECK (pages_read >= 0),
  minutes_spent INTEGER CHECK (minutes_spent >= 0),
  xp_earned INTEGER DEFAULT 0 CHECK (xp_earned >= 0)
);

-- Always index student_id for student data tables
CREATE INDEX idx_student_reading_logs_student ON student_reading_logs(student_id);
CREATE INDEX idx_student_reading_logs_book ON student_reading_logs(book_id);

-- RLS: Students see own data, staff see all
ALTER TABLE student_reading_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own reading logs"
  ON student_reading_logs FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Staff view all reading logs"
  ON student_reading_logs FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM staff_members WHERE user_id = auth.uid())
  );
```

### Multi-Tenant Class Table
```sql
CREATE TABLE class_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  assignment_name TEXT NOT NULL,
  due_date DATE NOT NULL,
  points_possible INTEGER CHECK (points_possible > 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for class queries
CREATE INDEX idx_class_assignments_class_id ON class_assignments(class_id);
CREATE INDEX idx_class_assignments_due_date ON class_assignments(due_date);

-- RLS: Only students/staff in class can see assignments
ALTER TABLE class_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Class members view assignments"
  ON class_assignments FOR SELECT
  USING (
    -- Student in class
    EXISTS (
      SELECT 1 FROM student_class_enrollments
      WHERE class_id = class_assignments.class_id
      AND student_id = auth.uid()
    )
    OR
    -- Staff teaching class
    EXISTS (
      SELECT 1 FROM staff_class_assignments
      WHERE class_id = class_assignments.class_id
      AND staff_user_id = auth.uid()
    )
  );
```

### Audit Log Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  changed_by UUID NOT NULL REFERENCES users(id),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for audit queries
CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_changed_by ON audit_logs(changed_by);
CREATE INDEX idx_audit_logs_changed_at ON audit_logs(changed_at DESC);

-- RLS: Only admins can view audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM staff_members
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );
```

## Error Handling

### Common Migration Errors

**Error**: `relation already exists`
```sql
-- Solution: Use IF NOT EXISTS
CREATE TABLE IF NOT EXISTS my_table (...);
```

**Error**: `constraint already exists`
```sql
-- Solution: Use IF NOT EXISTS or DROP first
ALTER TABLE my_table
  DROP CONSTRAINT IF EXISTS my_constraint,
  ADD CONSTRAINT my_constraint CHECK (...);
```

**Error**: `column does not exist` (in rollback)
```sql
-- Solution: Use IF EXISTS in rollback
ALTER TABLE my_table DROP COLUMN IF EXISTS my_column;
```

**Error**: `migration failed, cannot rollback automatically`
```sql
-- Solution: Manual rollback required
-- 1. Connect to database
-- 2. Run rollback SQL manually
-- 3. Fix migration file
-- 4. Re-apply migration
```

## Integration with Gate 1

After creating migration:
1. Run `/supabase-type-generator` to update types
2. Invoke Gate 1 agent for schema review
3. Create Zod schemas for new types
4. Update API contracts
5. Proceed to Gate 2 (Dependency Mapping)

## Quick Commands

```bash
# Create migration
npx supabase migration new [description]

# Apply migration locally
npx supabase db reset

# Generate types
npx supabase gen types typescript --local > src/types/database.ts

# Verify types
npx tsc --noEmit

# Check TISA compliance
npm run verify:rules

# Test migration
npm run test:db
```

## Emergency Rollback

If production migration fails:

```bash
# Option 1: Use Supabase CLI (if safe)
npx supabase migration down

# Option 2: Manual SQL rollback
psql $DATABASE_URL < supabase/migrations/rollback/[migration_file].sql

# Option 3: Restore from backup (last resort)
# Contact Supabase support or use dashboard
```

## Remember

**TISA Compliance is MANDATORY**
- ❌ No mock data in migrations
- ❌ No sample users
- ❌ No test records
- ✅ Schema only
- ✅ Real data via application

**Safety First**
- Always test locally before production
- Always create rollback migration
- Always verify RLS policies work
- Always check performance impact

---

**This command ensures all migrations follow TISAverse standards and protect student data.**
