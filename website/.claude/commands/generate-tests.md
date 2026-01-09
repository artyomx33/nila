# Generate Tests

Auto-generate TISA-compliant test suites for functions and components.

## Usage
```bash
/generate-tests [file-path]
```

## What It Does
- Analyzes function/component code
- Generates test file with factories (no mock data)
- Creates unit tests for all functions
- Adds type contract validation tests
- Generates error scenario tests
- TISA-compliant: uses factories, not mock arrays

## Example
```bash
/generate-tests src/lib/library-helpers.ts
# Creates: src/lib/library-helpers.test.ts

# Invoke gate-4-test-generator agent for full suite
```

## Quick Test Generation
```bash
# Generate tests for specific file
npm run test:generate src/lib/library-helpers.ts

# Generate tests for all untested files
npm run test:generate:all
```
