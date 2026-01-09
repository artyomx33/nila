# Vercel Deploy & Optimize

Deploy to Vercel with performance optimization.

## Usage
```bash
/vercel-deploy-optimize
```

## What It Does
- Pre-deployment checks (tests, build, Gate 5)
- Optimizes bundle size
- Configures edge caching
- Deploys to Vercel
- Verifies Core Web Vitals
- Sets up monitoring

## Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Gate 5 approved
- [ ] Environment variables set
- [ ] Build succeeds locally
- [ ] No secrets in code

## Optimization Steps
```bash
# Analyze bundle
npm run analyze

# Optimize images
npm run optimize:images

# Build for production
npm run build

# Deploy
vercel --prod

# Verify
curl -I https://tisaverse.school.edu
```

## Post-Deployment
- Check Core Web Vitals
- Monitor error rates
- Verify API endpoints
- Test critical user flows

## Integration with Gate 5
Gate 5 must approve before production deployment.
