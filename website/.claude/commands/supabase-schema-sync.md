# Supabase Schema Sync

**Quick command to sync database schema between local and production**

## What This Does

Ensures your local Supabase schema matches production (or vice versa) by:
- Pulling production schema to local
- Pushing local schema to production
- Comparing schema differences
- Generating migration files from differences
- TISA compliance verification

## Usage

```bash
/supabase-schema-sync
```

Or use npm scripts:
```bash
npm run db:pull     # Pull from production
npm run db:push     # Push to production
npm run db:diff     # Show differences
```

## Sync Modes

### Mode 1: Pull from Production (Safe)
**Use when**: You want to match your local schema to production

```bash
# Pull production schema to local
npx supabase db pull

# This creates a new migration file with production schema changes
# File created: supabase/migrations/YYYYMMDDHHMMSS_remote_schema.sql

# Review the generated migration
cat supabase/migrations/YYYYMMDDHHMMSS_remote_schema.sql

# Apply to local database
npx supabase db reset
```

**Safety**: ✅ Safe - only affects local database

### Mode 2: Push to Production (DANGEROUS)
**Use when**: You want to apply local migrations to production

```bash
# ⚠️  DANGEROUS - Review thoroughly before proceeding

# Step 1: Verify all local migrations work
npx supabase db reset

# Step 2: Run TISA compliance check
npm run verify:rules
grep -r "INSERT INTO\|mock\|sample" supabase/migrations/

# Step 3: Check what will be pushed
npx supabase db diff --linked

# Step 4: Create backup of production (manual via dashboard)

# Step 5: Push migrations to production
npx supabase db push --linked

# Step 6: Verify production schema
npx supabase db pull --linked
```

**Safety**: ⚠️  DANGEROUS - can affect production data

### Mode 3: Compare Differences (Read-Only)
**Use when**: You want to see schema differences without changes

```bash
# Compare local vs production schema
npx supabase db diff --linked

# Output shows:
# - Tables added/removed
# - Columns added/removed/modified
# - Indexes added/removed
# - RLS policies changed
# - Functions/triggers modified
```

**Safety**: ✅ Safe - read-only operation

### Mode 4: Generate Migration from Diff
**Use when**: You manually changed production and need migration file

```bash
# Generate migration file from production changes
npx supabase db diff --linked -f [migration_name]

# Example:
npx supabase db diff --linked -f add_missing_indexes

# Review generated migration
cat supabase/migrations/YYYYMMDDHHMMSS_add_missing_indexes.sql

# Apply locally to test
npx supabase db reset
```

**Safety**: ✅ Safe - creates migration file only

## Complete Sync Workflow

### Scenario 1: Start New Feature Locally
**Goal**: Work on new schema changes locally, test, then push to production

```bash
# 1. Ensure local matches production
npx supabase db pull
npx supabase db reset

# 2. Create new migration
npx supabase migration new add_achievement_system

# 3. Write migration SQL (with TISA compliance)
vim supabase/migrations/YYYYMMDDHHMMSS_add_achievement_system.sql

# 4. Test locally
npx supabase db reset
npm run verify:rules

# 5. Generate TypeScript types
npx supabase gen types typescript --local > src/types/database.ts

# 6. Run Gate 1 verification
npm run gate:1

# 7. Deploy to production (after testing)
npx supabase db push --linked

# 8. Verify production types match
npx supabase gen types typescript --linked > src/types/database.production.ts
diff src/types/database.ts src/types/database.production.ts
```

### Scenario 2: Hotfix Production Schema
**Goal**: Fix production schema issue, then sync to local

```bash
# 1. Create migration locally
npx supabase migration new hotfix_rls_policy

# 2. Write fix migration
vim supabase/migrations/YYYYMMDDHHMMSS_hotfix_rls_policy.sql

# 3. Test locally
npx supabase db reset

# 4. Push to production immediately
npx supabase db push --linked

# 5. Verify fix worked
npx supabase db diff --linked  # Should show no differences

# 6. Pull to confirm
npx supabase db pull
```

### Scenario 3: Production Drift Detection
**Goal**: Someone manually changed production, need to sync back

```bash
# 1. Detect drift
npx supabase db diff --linked

# Output:
# + CREATE INDEX idx_students_email ON students(email);
# - DROP POLICY "Old policy" ON students;
# + CREATE POLICY "New policy" ON students FOR SELECT USING (...);

# 2. Generate migration from drift
npx supabase db diff --linked -f production_drift_YYYYMMDD

# 3. Review generated migration (TISA compliance check)
cat supabase/migrations/YYYYMMDDHHMMSS_production_drift_YYYYMMDD.sql
npm run verify:rules

# 4. Apply locally
npx supabase db reset

# 5. Verify local matches production
npx supabase db diff --linked  # Should show "No differences"
```

## TISA Compliance Checks

**CRITICAL**: Before any sync operation, verify TISA compliance

### Pre-Sync Checklist
```bash
# Check for forbidden patterns in migrations
grep -r "INSERT INTO" supabase/migrations/
grep -r "COPY.*FROM" supabase/migrations/
grep -ri "mock\|sample\|test.*data\|demo" supabase/migrations/

# If any matches found:
# ❌ STOP - Migration violates TISA rules
# ✅ Fix migration to remove data inserts
```

### Post-Sync Verification
```bash
# Verify types generated correctly
npx supabase gen types typescript --local > src/types/database.ts
npx tsc --noEmit

# Verify no mock data in database
npm run verify:rules

# Verify RLS policies active
psql $DATABASE_URL -c "SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"
```

## Safety Protocols

### Before Pushing to Production

1. **Backup Production Database**
   - Use Supabase Dashboard: Database → Backups → Create Backup
   - Or: `pg_dump $PRODUCTION_URL > backup_YYYYMMDD.sql`

2. **Test Migrations Locally**
   ```bash
   npx supabase db reset  # Apply all migrations fresh
   npm run test:db        # Run database tests
   npm run gate:1         # Verify schema safety
   ```

3. **Review Migration Content**
   ```bash
   # Check for breaking changes
   grep -i "DROP\|ALTER.*DROP\|ALTER.*TYPE" supabase/migrations/*.sql

   # Check for TISA violations
   npm run verify:rules
   ```

4. **Get Approval** (for production changes)
   - [ ] Schema changes reviewed by team
   - [ ] RLS policies verified
   - [ ] Performance impact assessed
   - [ ] Rollback plan documented

5. **Monitor After Push**
   - Watch Supabase Dashboard for errors
   - Check application logs for database errors
   - Verify RLS policies working in production
   - Test critical user flows

### Emergency Rollback

If production sync causes issues:

```bash
# Option 1: Rollback via migration
npx supabase migration down --linked

# Option 2: Restore from backup (Supabase Dashboard)
# Database → Backups → Select backup → Restore

# Option 3: Manual SQL rollback
psql $PRODUCTION_URL < rollback_script.sql

# After rollback:
# 1. Pull production schema
npx supabase db pull --linked

# 2. Fix local migrations
# 3. Test thoroughly
# 4. Re-attempt push
```

## Common Sync Scenarios

### Daily Development Workflow
```bash
# Morning: Sync with production
npx supabase db pull
npx supabase db reset

# During day: Create migrations as needed
npx supabase migration new [feature_name]

# Evening: Push tested changes (after Gate 1-5)
npm run verify:all
npx supabase db push --linked
```

### Team Collaboration Workflow
```bash
# Pull teammate's migrations from git
git pull origin main

# Apply new migrations locally
npx supabase db reset

# Regenerate types
npx supabase gen types typescript --local > src/types/database.ts

# Continue work
```

### Production Monitoring Workflow
```bash
# Weekly: Check for schema drift
npx supabase db diff --linked

# If drift detected:
# 1. Investigate who/what/why
# 2. Generate migration to capture changes
# 3. Review for TISA compliance
# 4. Apply to local and commit to git
```

## Integration with Gate System

### Gate 1 Integration
After schema sync:
1. Run `/supabase-type-generator` to update types
2. Invoke Gate 1 agent for schema review
3. Create Zod schemas for changed types
4. Update API contracts
5. Proceed to Gate 2

### Pre-Commit Hook
```bash
# .husky/pre-commit should include:

# Verify local schema matches migrations
npx supabase db diff > /dev/null || {
  echo "❌ Local schema has uncommitted changes"
  echo "Run: npx supabase db diff -f new_migration_name"
  exit 1
}

# Verify types are up to date
npm run verify:types

# Verify TISA compliance
npm run verify:rules
```

## Troubleshooting

### Error: "Database is not linked"
```bash
# Link to production project
npx supabase link --project-ref [your-project-ref]

# Or set environment variable
export SUPABASE_PROJECT_REF=[your-project-ref]
```

### Error: "Migration conflicts detected"
```bash
# View conflict details
npx supabase db diff --linked

# Option 1: Accept production changes
npx supabase db pull --linked

# Option 2: Force push local changes (DANGEROUS)
npx supabase db push --linked --force  # ⚠️  Use with caution
```

### Error: "Types out of sync with database"
```bash
# Regenerate types
npx supabase gen types typescript --local > src/types/database.ts

# Verify TypeScript compiles
npx tsc --noEmit

# Check for manual edits to database.ts (shouldn't happen)
git diff src/types/database.ts
```

### Error: "RLS policy prevents access"
```bash
# Check current RLS policies
psql $DATABASE_URL -c "SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';"

# Test policy as specific user
psql $DATABASE_URL -c "SET ROLE student_role; SELECT * FROM students LIMIT 1;"

# Debugging: Temporarily disable RLS (LOCAL ONLY)
psql $LOCAL_DATABASE_URL -c "ALTER TABLE students DISABLE ROW LEVEL SECURITY;"
```

## Quick Reference

```bash
# Pull from production
npx supabase db pull

# Push to production
npx supabase db push --linked

# Show differences
npx supabase db diff --linked

# Generate migration from diff
npx supabase db diff --linked -f [name]

# Reset local to match migrations
npx supabase db reset

# Generate types
npx supabase gen types typescript --local > src/types/database.ts

# Verify sync
npm run verify:types && npm run verify:rules
```

## Remember

**TISA Compliance First**
- Never sync migrations with mock data
- Always check `npm run verify:rules` before push
- Schema only, data via application

**Safety First**
- Always backup before production push
- Always test locally before production
- Always verify RLS policies work
- Always have rollback plan ready

**Team Communication**
- Announce production schema changes
- Coordinate migrations with team
- Document breaking changes
- Review each other's migrations

---

**This command keeps TISAverse schema in sync across environments while maintaining TISA compliance and data safety.**
