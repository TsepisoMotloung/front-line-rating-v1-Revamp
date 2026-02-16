# Vercel Deployment Configuration

## Required Environment Variables

To fix the login redirect issue on Vercel, you **MUST** configure these environment variables in your Vercel project:

### 1. Go to Vercel Dashboard
Navigate to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

### 2. Add These Variables

#### Database
```
DATABASE_URL=mysql://username:password@host:port/database
```

#### NextAuth (CRITICAL for login to work)
```
NEXTAUTH_URL=https://front-line-rating-v1-revamp.vercel.app
NEXTAUTH_SECRET=your-generated-secret-key-here
```

**Important**: 
- `NEXTAUTH_URL` must be your actual Vercel deployment URL
- Generate a strong `NEXTAUTH_SECRET` using: `openssl rand -base64 32`

#### Email Configuration
```
EMAIL_SERVER_HOST=your-smtp-host
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=noreply@your-domain.com
```

#### hCaptcha
```
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your-hcaptcha-site-key
HCAPTCHA_SECRET_KEY=your-hcaptcha-secret-key
```

#### Application
```
APP_NAME=Service Feedback Platform
APP_URL=https://front-line-rating-v1-revamp.vercel.app
```

### 3. Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` in Vercel.

### 4. Redeploy

After adding all environment variables:
1. Go to Deployments tab in Vercel
2. Click the three dots on your latest deployment
3. Click "Redeploy"
4. Or push a new commit to trigger redeployment

### 5. Verify

After redeployment:
1. Visit your login page
2. Try logging in
3. You should be redirected to `/dashboard` successfully

## Common Issues

### Issue: Still not redirecting after login
**Solution**: Make sure `NEXTAUTH_URL` exactly matches your Vercel deployment URL (including https://)

### Issue: "Configuration error" message
**Solution**: Check that `NEXTAUTH_SECRET` is set and is at least 32 characters

### Issue: hCaptcha not working
**Solution**: Verify both `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` and `HCAPTCHA_SECRET_KEY` are correct

## Testing Locally

To test with production-like settings locally:
```bash
# In your .env file
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret-key
```

Then run:
```bash
npm run dev
```
