# Performance Audit

Run comprehensive performance audit for education platform.

## Usage
```bash
/performance-audit
```

## What It Does
- Measures dashboard load times
- Tests Core Web Vitals (LCP, FID, CLS)
- Profiles database queries
- Identifies slow operations (> 100ms)
- Generates performance report
- Load testing with k6 (optional)

## Process
```bash
# Run performance tests
npm run test:performance

# Run load tests (100 concurrent users)
npm run test:load

# Generate lighthouse report
npm run lighthouse

# Profile database queries
npm run db:profile
```

## Performance Targets
- Student Dashboard: < 1s
- Library Search: < 200ms
- Leaderboard: < 300ms
- Core Web Vitals: All green

## Integration with Gate 4
Gate 4 performance specialist reviews results before approval.
