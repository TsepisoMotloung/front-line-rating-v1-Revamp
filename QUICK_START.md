# Quick Start Guide - New Features

## Setup & Configuration

### 1. Environment Variables
Add these to your `.env` file before deploying:

```env
# reCAPTCHA Keys (get from https://www.google.com/recaptcha/admin)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your_site_key_here"
RECAPTCHA_SECRET_KEY="your_secret_key_here"
```

### 2. Database Migration
The schema has been updated with Prisma. Run:

```bash
npm run db:push
```

This will:
- Add the `RatingType` enum
- Update the `Rating` model to support company ratings
- Create the new `InternalRating` model

---

## Feature Locations

### reCAPTCHA Protection
- **Login Page**: `/auth/login`
- **Register Page**: `/auth/register`
- Both pages now verify reCAPTCHA before processing

### Rate Alliance Insurance
- **URL**: `/rate/company`
- **Access**: Public (no login required)
- **Features**:
  - 2-step form (customer info → ratings)
  - Multiple rating questions
  - Optional feedback
  - Anonymous submission option

### Internal Employee Ratings
- **URL**: `/dashboard/internal-ratings`
- **Access**: Authenticated users only (AGENT, HOD, ADMIN)
- **Features**:
  - Search colleagues by name/email
  - Rate across 5 categories
  - 1-5 star scale
  - Optional feedback
  - Anonymous submission option
  - View recent ratings received

---

## API Endpoints

### Internal Ratings API

**Get Ratings:**
```
GET /api/ratings/internal
Query params:
  - raterId=<user_id>      (optional)
  - ratedId=<user_id>      (optional)
  - category=<category>    (optional)

Example: /api/ratings/internal?ratedId=user123
```

**Submit Rating:**
```
POST /api/ratings/internal

Body: {
  "ratedId": "user_id",
  "category": "professionalism|teamwork|performance|communication|reliability",
  "score": 1-5,
  "feedbackText": "optional feedback",
  "isAnonymous": true/false
}
```

### User Search API

```
GET /api/users/search
Query params:
  - search=<query>         (required, min 2 chars)
  - departmentId=<id>      (optional)
```

### Company Rating API

**Submit Company Rating:**
```
POST /api/ratings

Body: {
  "ratingType": "COMPANY",
  "customerName": "name or Anonymous",
  "customerContact": "optional phone",
  "policyNumber": "optional policy number",
  "isAnonymous": true/false,
  "feedbackText": "optional feedback",
  "responses": [
    {
      "questionId": "question_id",
      "score": 1-5
    }
  ]
}
```

---

## Database Models

### InternalRating
```prisma
model InternalRating {
  id            String   @id @default(cuid())
  raterId       String   // Who is rating
  rater         User     @relation("RaterUser", ...)
  ratedId       String   // Who is being rated
  rated         User     @relation("RatedUser", ...)
  category      String   // Rating category
  score         Int      // 1-5 rating
  feedbackText  String?  @db.Text
  isAnonymous   Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### Rating (Updated)
Now supports three types:
- `AGENT` - Customer rating an agent (existing)
- `COMPANY` - Customer rating the company (new)
- `INTERNAL` - Employee rating another employee (planned for future integration)

---

## UI Components & Routes

### New Files Created
- `app/rate/company/page.tsx` - Company rating form
- `app/dashboard/internal-ratings/page.tsx` - Internal rating interface
- `app/api/ratings/internal/route.ts` - Internal ratings API
- `app/api/users/search/route.ts` - User search API

### Modified Files
- `app/auth/login/page.tsx` - Added reCAPTCHA
- `app/auth/register/page.tsx` - Added reCAPTCHA
- `app/rate/page.tsx` - Added company rating option
- `components/DashboardLayout.tsx` - Added internal ratings navigation
- `lib/auth.ts` - Added reCAPTCHA verification
- `app/api/auth/register/route.ts` - Added reCAPTCHA verification
- `prisma/schema.prisma` - Updated schema with new models
- `app/api/ratings/route.ts` - Updated to support company ratings

---

## Testing Checklist

- [ ] reCAPTCHA appears on login page
- [ ] reCAPTCHA appears on register page
- [ ] Cannot submit login/register without solving reCAPTCHA
- [ ] Company rating page loads at `/rate/company`
- [ ] Can submit company rating with all fields
- [ ] Anonymous company rating works
- [ ] Internal ratings page loads at `/dashboard/internal-ratings`
- [ ] Can search for colleagues
- [ ] Can submit ratings for all 5 categories
- [ ] Cannot rate yourself
- [ ] Anonymous internal rating works
- [ ] Ratings appear in database
- [ ] Navigation shows "Internal Ratings" for logged-in users

---

## Troubleshooting

### reCAPTCHA Not Showing
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in `.env`
- Check browser console for errors
- Ensure domain is added to reCAPTCHA settings

### Company Rating Not Loading
- Verify `/api/ratings` endpoint is working
- Check database connection
- Ensure questions are created in database

### Internal Ratings Not Working
- Verify user is authenticated
- Check user role is AGENT, HOD, or ADMIN
- Verify `/api/ratings/internal` endpoint responds
- Check `/api/users/search` endpoint works

### Database Errors
- Run `npm run db:push` to sync schema
- Check `DATABASE_URL` in `.env`
- Verify MySQL connection

---

## Deployment Checklist

- [ ] Add reCAPTCHA keys to production `.env`
- [ ] Run `npm run db:push` on production database
- [ ] Verify build: `npm run build`
- [ ] Test all new features in staging
- [ ] Deploy to production
- [ ] Monitor error logs
- [ ] Verify API endpoints respond correctly

---

## Support Resources

- **reCAPTCHA Setup**: https://www.google.com/recaptcha/admin
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth Docs**: https://next-auth.js.org

---

Generated: January 23, 2026
Last Updated: v1.0.0
