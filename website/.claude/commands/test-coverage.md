# Test Coverage

Check test coverage and identify untested code.

## Usage
```bash
/test-coverage
```

## What It Does
- Runs all tests with coverage reporting
- Shows coverage % by file
- Identifies untested lines
- Highlights files below 80% threshold
- Generates HTML coverage report

## Process
```bash
# Run tests with coverage
npm run test:coverage

# View coverage report
open coverage/index.html

# Check specific file coverage
npm run test:coverage -- src/lib/library-helpers.ts
```

## Coverage Targets
- New code: > 80%
- Critical paths: 100%
- Utility functions: > 90%
- Components: > 85%

## Integration with Gate 4
Gate 4 requires > 80% coverage before approval.
