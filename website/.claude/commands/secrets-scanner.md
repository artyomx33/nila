# Secrets Scanner

Scan codebase for exposed secrets, API keys, and sensitive data.

## Usage
```bash
/secrets-scanner
```

## What It Does
- Scans for hardcoded API keys
- Detects exposed credentials
- Finds leaked tokens
- Checks .env files not in git
- Validates Supabase keys are env vars

## Process
```bash
# Scan for secrets
npm run security:scan-secrets

# Check git history for leaked secrets
git secrets --scan-history

# Verify .env not committed
git ls-files | grep "\.env$"
```

## Common Patterns Detected
- `SUPABASE_KEY=` in code files
- `password =` hardcoded
- Private keys in source
- Database connection strings

## Integration with Gate 5
Gate 5 blocks deployment if secrets found in code.
