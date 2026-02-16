## 🚀 Quick Fix for Vercel Login Issue

### The Problem
Login works locally but fails to redirect on Vercel.

### The Solution (2 minutes)

1. **Go to Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   → Select your project
   → Settings → Environment Variables
   ```

2. **Add These 2 Critical Variables**
   
   **Variable 1:**
   ```
   Name:  NEXTAUTH_URL
   Value: https://front-line-rating-v1-revamp.vercel.app
   ```
   
   **Variable 2:**
   ```
   Name:  NEXTAUTH_SECRET
   Value: [Generate using command below]
   ```

3. **Generate Secret Key**
   Run in terminal:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output → Paste as NEXTAUTH_SECRET value

4. **Redeploy**
   ```
   Vercel Dashboard → Deployments → (Latest) → Redeploy
   ```

5. **Test**
   Visit login page → Login → Should redirect to dashboard ✅

---

### All Required Environment Variables

Copy these to Vercel (Settings → Environment Variables):

```bash
# Database
DATABASE_URL=mysql://user:pass@host:3306/database

# Auth (REQUIRED)
NEXTAUTH_URL=https://front-line-rating-v1-revamp.vercel.app
NEXTAUTH_SECRET=[generate with openssl rand -base64 32]

# Email
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@example.com

# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your-site-key
HCAPTCHA_SECRET_KEY=your-secret-key

# App
APP_NAME=Service Feedback Platform
APP_URL=https://front-line-rating-v1-revamp.vercel.app
```

### Still Not Working?

**Check:**
1. ✅ NEXTAUTH_URL matches your exact Vercel URL (with https://)
2. ✅ NEXTAUTH_SECRET is at least 32 characters
3. ✅ You redeployed after adding variables
4. ✅ Check Vercel logs for errors (Dashboard → Deployments → Click deployment → Logs)

**Need Help?**
Check full docs: [VERCEL_SETUP.md](./VERCEL_SETUP.md)
