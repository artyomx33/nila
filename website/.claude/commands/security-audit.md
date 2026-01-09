# Security Audit

Run comprehensive security audit for education platform.

## Usage
```bash
/security-audit
```

## What It Does
- OWASP Top 10 vulnerability scan
- RLS policy verification
- Student data protection check
- Input validation audit
- Dependency vulnerability scan
- Security headers check

## Process
```bash
# Run security audit
npm run security:audit

# Scan dependencies
npm audit

# Check RLS policies
npm run db:check-rls

# Verify input validation
npm run security:validate-inputs
```

## Compliance Checks
- FERPA student data protection
- GDPR compliance (if applicable)
- TISA-LIBRARY-RULES.md compliance

## Integration with Gate 5
Gate 5 security specialist reviews audit before production deployment.
