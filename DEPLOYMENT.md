# Production Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

### Code Quality
- [ ] All ESLint warnings fixed
- [ ] TypeScript compilation successful
- [ ] No console.logs in production code (except error logging)
- [ ] All tests passing (if applicable)
- [ ] Code reviewed and approved

### Security
- [ ] All environment variables configured in Vercel
- [ ] NEXTAUTH_SECRET is cryptographically secure (32+ chars)
- [ ] Database credentials are secure
- [ ] API keys are not exposed in client code
- [ ] CORS configured correctly
- [ ] Security headers configured
- [ ] Default seed passwords documented for change

### Database
- [ ] Production database created
- [ ] Database migrations applied
- [ ] Database properly indexed
- [ ] Backup strategy in place
- [ ] Connection pooling configured

### Environment Variables
- [ ] DATABASE_URL (production)
- [ ] NEXTAUTH_SECRET (production-specific)
- [ ] NEXTAUTH_URL (https://your-domain.vercel.app)
- [ ] NEXT_PUBLIC_HCAPTCHA_SITE_KEY
- [ ] HCAPTCHA_SECRET_KEY
- [ ] EMAIL_SERVER_HOST
- [ ] EMAIL_SERVER_PORT
- [ ] EMAIL_SERVER_USER
- [ ] EMAIL_SERVER_PASSWORD
- [ ] EMAIL_FROM

### Performance
- [ ] API response times tested
- [ ] Database queries optimized
- [ ] Images optimized
- [ ] Bundle size acceptable
- [ ] Lighthouse score > 90

## Deployment Steps

1. **Verify Build Locally**
```bash
npm run build
npm run start
```

2. **Push to GitHub**
```bash
git add .
git commit -m "Production ready"
git push origin main
```

3. **Configure Vercel**
- Import GitHub repository
- Add all environment variables
- Set Node.js version to 18.x or higher

4. **Deploy**
- Vercel auto-deploys on git push
- Monitor build logs
- Verify deployment success

5. **Seed Production Database** (First time only)
```bash
npm run db:migrate:deploy
npm run db:seed
```

## Post-Deployment

### Verification
- [ ] Application loads correctly
- [ ] Login works (test all roles)
- [ ] Database queries execute successfully
- [ ] Email notifications working
- [ ] QR codes generate properly
- [ ] Dashboard displays data
- [ ] Mobile responsive
- [ ] SSL certificate active (https)

### Security
- [ ] Change default admin password
- [ ] Change all default seed passwords
- [ ] Disable test accounts (if any)
- [ ] Review user permissions
- [ ] Test authentication flows
- [ ] Verify CORS settings

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure uptime monitoring
- [ ] Set up alerts for critical errors
- [ ] Monitor API response times
- [ ] Track database performance

### Documentation
- [ ] Update README with production URL
- [ ] Document any production-specific setup
- [ ] Share credentials securely with team
- [ ] Document backup procedures
- [ ] Create runbook for common issues

## Important Production URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Application**: https://your-app.vercel.app
- **Prisma Studio**: Run `npm run db:studio` locally with production DATABASE_URL

## Emergency Rollback

If issues occur:

1. **Immediate Rollback**
   - Go to Vercel Dashboard
   - Navigate to Deployments
   - Click on previous working deployment
   - Click "Promote to Production"

2. **Fix and Redeploy**
   - Fix issues locally
   - Test thoroughly
   - Push to GitHub
   - Verify new deployment

## Post-Launch Tasks

- [ ] Monitor error logs for 24 hours
- [ ] Check API performance metrics
- [ ] Verify email delivery
- [ ] Test with real users
- [ ] Collect initial feedback
- [ ] Document any issues for future reference

## Support Contacts

- **Database Issues**: [Database Admin Contact]
- **Vercel Support**: https://vercel.com/support
- **Email Service**: [Email Provider Support]
- **Team Lead**: [Contact Info]

---

**Date Completed**: _____________

**Deployed By**: _____________

**Production URL**: _____________

**Version**: 1.0.0
