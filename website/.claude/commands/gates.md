# Gate System Commands

Quick access commands for the Type-Enforced Review Gates System.

## Available Commands

### /gate1
Runs Gate 1: Schema & Type Verification

Verifies:
- Database migrations are safe
- Types are generated from schema
- API contracts defined
- Zod schemas created

Usage: Run BEFORE creating/modifying database schemas
Command: `npm run gate:1`

### /gate4
Runs Gate 4: Integration Testing

Verifies:
- All tests pass
- Type contracts validated
- Integration points tested
- Coverage meets threshold

Usage: Run AFTER implementation complete
Command: `npm run gate:4`

### /gate5
Runs Gate 5: Final Review

Comprehensive verification including:
- All previous gates
- TISA rules compliance
- TypeScript compilation
- ESLint checks
- No console.log statements

Usage: Run BEFORE committing
Command: `npm run gate:5`

### /verify-all
Runs all automated verifications

Executes:
- Type safety checks
- TISA rules verification
- All configured tests
- Code quality checks

Usage: Run before creating pull request
Command: `npm run verify:all`

### /verify-rules
Check TISA Library rules compliance

Scans for:
- Forbidden file names (mock*.ts)
- Forbidden function names
- Forbidden imports
- Forbidden code patterns
- Hardcoded sample data

Usage: Quick check for rule violations
Command: `npm run verify:rules`

### /verify-types
Basic type verification

Checks:
- Database type sync
- No `any` types
- TypeScript compilation
- API contracts exist
- Zod schemas exist

Usage: Quick type safety check
Command: `npm run verify:types`

## Manual Gates

### Gate 2: Dependency Mapping
**Manual process** - Use the gate-2-dependency-mapper agent

1. Identify target files for modification
2. Map import/export dependencies
3. Calculate impact radius
4. Determine update order

Agent: `.claude/agents/gate-2-dependency-mapper.md`

### Gate 3: Implementation Guard
**Manual checkpoints** - Use the gate-3-implementation-guard agent

1. Stop every 50 lines of code
2. Verify type explicitness
3. Check contract adherence
4. Validate runtime checks

Agent: `.claude/agents/gate-3-implementation-guard.md`

## Workflow Example

```bash
# 1. Planning a new feature
npm run verify:rules  # Check current state
# Use Gate 1 agent to design schema

# 2. Before coding
# Use Gate 2 agent to map dependencies

# 3. During coding
# Use Gate 3 checkpoints every 50 lines

# 4. After coding
npm run gate:4  # Run tests

# 5. Before commit
npm run verify:all  # Final verification

# 6. Create commit
git add .
git commit -m "feat: description"
# Pre-commit hook runs automatically
```

## Emergency Commands

If verification fails:

```bash
# Check specific issues
npm run verify:rules     # Find TISA violations
npm run verify:types     # Find type issues
npm run type-check       # TypeScript errors
npm run lint             # ESLint issues

# Fix formatting
npx prettier --write .

# View detailed agent instructions
cat .claude/agents/gate-*.md
```

## Configuration

- Gate agents: `.claude/agents/gate-*.md`
- Verification scripts: `scripts/verify-*.ts`
- Rules document: `TISA-LIBRARY-RULES.md`
- Pre-commit hook: `.husky/pre-commit`
