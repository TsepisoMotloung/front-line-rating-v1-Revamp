# Authentication Flow Documentation

## Overview
This application uses NextAuth v4 with JWT strategy for authentication. The flow involves client-side login, server-side session verification, and middleware-based route protection.

## Complete Authentication Flow

### 1. Login Process (Client-Side)
**File**: `app/auth/login/page.tsx`

```
User submits form → hCaptcha validation → signIn('credentials', {...})
```

**Steps**:
1. User enters email/password and completes hCaptcha
2. Form calls `signIn('credentials', { redirect: false })`
3. NextAuth sends POST to `/api/auth/callback/credentials`
4. Server-side authorize function runs (see step 2)
5. If successful, JWT token is created and encrypted
6. Session cookie is set: `__Secure-next-auth.session-token` (production) or `next-auth.session-token` (development)
7. After successful login:
   - Wait 500ms for cookie to settle
   - Call `router.refresh()` to refresh server components
   - Call `router.push('/dashboard')` to navigate

### 2. Authorization (Server-Side)
**File**: `lib/auth.ts` - `authorize` function

```
Validate credentials → Verify hCaptcha → Find user → Check status → Verify password → Return user object
```

**Validations**:
- Email and password provided
- hCaptcha token valid
- User exists in database
- User status is APPROVED (not PENDING or REJECTED)
- Password matches hash in database

**Returns**: User object with id, email, name, role, departmentId, departmentName, status

### 3. JWT Creation
**File**: `lib/auth.ts` - `jwt` callback

```
User object → Create JWT token → Encrypt with NEXTAUTH_SECRET → Store in cookie
```

**Token Structure**:
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "User Name",
  "role": "ADMIN|HOD|AGENT|EMPLOYEE",
  "departmentId": "dept_id",
  "departmentName": "Department Name",
  "status": "APPROVED",
  "iat": 1234567890,
  "exp": 1237159890
}
```

### 4. Session Creation
**File**: `lib/auth.ts` - `session` callback

```
JWT token → Decrypt → Extract user data → Create session object
```

**Session Structure**:
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "ADMIN",
    "departmentId": "dept_id",
    "departmentName": "Department Name",
    "status": "APPROVED"
  },
  "expires": "2026-03-18T..."
}
```

### 5. Route Protection (Middleware)
**File**: `middleware.ts`

```
Request → Check if protected path → Get token from cookie → Decrypt → Validate → Allow/Redirect
```

**Protected Paths**:
- `/dashboard/*`
- `/admin/*`
- `/profile/*`

**Middleware Logic**:
1. Check if request path requires authentication
2. Extract session token from cookies
3. Decrypt token using NEXTAUTH_SECRET
4. Validate token (not expired, user approved)
5. If valid: allow request to proceed
6. If invalid: redirect to `/auth/login?callbackUrl={original_path}`

### 6. Server Component Access
**File**: `app/dashboard/page.tsx`

```
Component renders → getServerSession() → Check session → Render or redirect
```

**Usage**:
```typescript
const session = await getServerSession(authOptions);
if (!session) {
  redirect('/auth/login');
}
// Use session.user.role, session.user.id, etc.
```

## Cookie Configuration

### Development
- Cookie name: `next-auth.session-token`
- Secure: false
- HttpOnly: true
- SameSite: lax
- Path: /

### Production
- Cookie name: `__Secure-next-auth.session-token`
- Secure: true (HTTPS only)
- HttpOnly: true (JavaScript cannot access)
- SameSite: lax (CSRF protection)
- Path: /

## Environment Variables

### Required
- `NEXTAUTH_SECRET`: Used to encrypt/decrypt JWT tokens (CRITICAL - must be same across deploys)
- `NEXTAUTH_URL`: Your application URL (e.g., `https://your-app.vercel.app`)
- `DATABASE_URL`: MySQL connection string
- `HCAPTCHA_SECRET_KEY`: Server-side hCaptcha verification
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`: Client-side hCaptcha widget

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## Common Issues and Solutions

### Issue 1: Login loop on Vercel (JWT decryption error)
**Cause**: Old session cookies encrypted with a different NEXTAUTH_SECRET

**Solution**:
1. Clear browser cookies for the domain
2. Ensure NEXTAUTH_SECRET is set in Vercel environment variables
3. Redeploy after setting NEXTAUTH_SECRET
4. Test in incognito/private browsing

### Issue 2: Session not found after successful login
**Cause**: Cookie not being set properly or timing issue

**Solution**:
- Login flow now waits 500ms before navigation
- Uses `router.refresh()` to ensure server components get new session
- Uses `router.push()` instead of `window.location`

### Issue 3: Middleware constantly redirecting
**Cause**: Token validation failing

**Solution**:
- Check middleware logs in development
- Verify NEXTAUTH_SECRET matches between auth config and middleware
- Ensure user.status is 'APPROVED'

### Issue 4: "decryption operation failed"
**Cause**: Token encrypted with one secret, trying to decrypt with another

**Solution**:
1. Verify NEXTAUTH_SECRET in Vercel matches local development (if testing with same cookies)
2. Clear all cookies and login fresh
3. Check Vercel logs for any NEXTAUTH_SECRET loading errors

## Debugging

### Development Mode
Set `debug: true` in auth config (already enabled in development):
```typescript
debug: process.env.NODE_ENV === 'development',
```

### Middleware Logs
Middleware logs in development:
- Path being accessed
- Token existence
- User email and role

### Browser DevTools
1. **Application/Storage tab**: Check cookies
   - Look for `next-auth.session-token` (dev) or `__Secure-next-auth.session-token` (prod)
   - Value should be an encrypted JWT (long string)

2. **Network tab**: Monitor auth requests
   - `/api/auth/callback/credentials` - Login POST
   - `/api/auth/session` - Session check
   - Look for 200 OK (success) or 4xx/5xx errors

3. **Console**: Check for error messages

### Vercel Logs
```bash
vercel logs [deployment-url]
```

Look for:
- "JWT callback - Creating token for:"
- "Session callback - User:"
- "Middleware - Path:", "Token exists:"
- Any error messages

## Testing Checklist

### Local Development
- [ ] Login with valid credentials
- [ ] Redirects to /dashboard after login
- [ ] Dashboard loads without redirect loop
- [ ] Protected routes accessible
- [ ] Logout works
- [ ] Login with invalid credentials shows error

### Production (Vercel)
- [ ] Environment variables set correctly
- [ ] NEXTAUTH_SECRET generated and set
- [ ] NEXTAUTH_URL matches deployment URL
- [ ] Clear cookies before testing
- [ ] Login in incognito mode
- [ ] Check Vercel logs for errors
- [ ] Session persists across page refreshes

## API Endpoints

### NextAuth Endpoints (Auto-generated)
- `GET/POST /api/auth/callback/credentials` - Handle login
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - Logout
- `GET /api/auth/providers` - List auth providers
- `GET /api/auth/csrf` - CSRF token

### Custom API Endpoints
All require valid session (checked with `getServerSession`):
- `/api/dashboard/*` - Dashboard stats
- `/api/profile` - User profile
- `/api/notifications` - User notifications
- `/api/ratings/*` - Rating operations
- `/api/complaints/*` - Complaint operations
- `/api/admin/*` - Admin operations (role check included)

## Architecture Decisions

### Why JWT instead of Database Sessions?
- Scalability: No database lookup on every request
- Serverless-friendly: Works with Vercel's serverless functions
- Performance: Faster than database queries

### Why Custom Middleware instead of Default?
- Better error handling
- Detailed logging for debugging
- Status checking (APPROVED users only)
- Custom redirect logic

### Why 500ms Delay After Login?
- Ensures session cookie is fully written to browser
- Prevents race condition where middleware doesn't see cookie yet
- Small enough to not impact UX

### Why router.push() instead of window.location?
- Proper Next.js navigation (prefetching, transitions)
- Maintains client-side state
- Works with app router's server components
- More reliable than window.location in some browsers

## Security Considerations

1. **HTTPS Required in Production**: Cookies use Secure flag
2. **HttpOnly Cookies**: JavaScript cannot access tokens (XSS protection)
3. **SameSite=lax**: CSRF protection
4. **hCaptcha Validation**: Bot protection
5. **bcrypt Password Hashing**: Secure password storage
6. **JWT Encryption**: Token contents encrypted, not just signed
7. **Short-lived Sessions**: 30-day max age with automatic expiry
8. **Server-side Validation**: All auth checks happen server-side

## Troubleshooting Commands

### Check Environment Variables (Local)
```bash
node -e "console.log(process.env.NEXTAUTH_SECRET ? 'Set' : 'Not set')"
```

### Check Cookies (Browser Console)
```javascript
document.cookie.split(';').find(c => c.includes('next-auth'))
```

### Test Session API
```bash
curl -H "Cookie: next-auth.session-token=YOUR_TOKEN" \
  http://localhost:3000/api/auth/session
```

### Verify Database User
```sql
SELECT id, email, status, role FROM User WHERE email = 'user@example.com';
```

## Flow Diagram

```
┌─────────────┐
│ Login Form  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ signIn('credentials')│
└──────┬──────────────┘
       │
       ▼
┌──────────────────────┐
│ POST /callback/...   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ authorize() function │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ JWT callback         │
│ (create token)       │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Set session cookie   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Wait 500ms           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ router.refresh()     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ router.push('/dash') │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Middleware checks    │
│ token from cookie    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Dashboard renders    │
│ getServerSession()   │
└──────────────────────┘
```
