# Implementation Summary: reCAPTCHA, Alliance Insurance Rating & Internal Employee Ratings

## Overview
This document summarizes the new features added to the Frontline Rating System:
1. **reCAPTCHA Integration** - Added to login and registration pages
2. **Alliance Insurance Company Rating** - Customers can rate the company itself
3. **Internal Employee Ratings** - Employees can rate each other across multiple categories

---

## 1. reCAPTCHA Integration

### What's New
- Both **login** and **registration** pages now require reCAPTCHA verification
- Prevents bot attacks and automated abuse

### Files Modified
- `app/auth/login/page.tsx` - Added ReCAPTCHA component
- `app/auth/register/page.tsx` - Added ReCAPTCHA component
- `lib/auth.ts` - Added reCAPTCHA token verification in credentials provider
- `app/api/auth/register/route.ts` - Added server-side reCAPTCHA verification

### Environment Variables Required
Add these to your `.env` file:
```env
# Get your keys from: https://www.google.com/recaptcha/admin
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="YOUR_RECAPTCHA_SITE_KEY"
RECAPTCHA_SECRET_KEY="YOUR_RECAPTCHA_SECRET_KEY"
```

### How to Set Up reCAPTCHA
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site with reCAPTCHA v3
3. Copy the **Site Key** and **Secret Key**
4. Add them to your `.env` file

### Dependencies
- `next-recaptcha` - Already installed

---

## 2. Alliance Insurance Company Rating

### What's New
- Customers can now rate Alliance Insurance as a company (separate from agent ratings)
- Located at `/rate/company`
- Supports anonymous ratings
- Can include policy numbers and contact information
- Company ratings are tracked separately in the database

### New Files Created
- `app/rate/company/page.tsx` - Company rating form with 2-step process

### Updated Files
- `app/rate/page.tsx` - Added company rating option to the rate landing page

### Key Features
- **Step 1**: Collect customer information (name, phone, policy number)
- **Step 2**: Rate company on customizable questions
- **Optional**: Add feedback text
- **Anonymous Option**: Submit without revealing identity

### Database Schema Changes
- Added `RatingType` enum with values: `AGENT`, `COMPANY`, `INTERNAL`
- Updated `Rating` model:
  - Made `agentId` and `departmentId` optional (for company ratings)
  - Added `ratingType` field (defaults to `AGENT` for backward compatibility)

---

## 3. Internal Employee Ratings

### What's New
- Employees, agents, and HODs can rate each other
- Located at `/dashboard/internal-ratings`
- Separate from customer ratings
- Supports anonymous ratings
- Tracks who rated whom and when

### New Files Created
- `app/dashboard/internal-ratings/page.tsx` - Internal rating interface
- `app/api/ratings/internal/route.ts` - API endpoint for internal ratings
- `app/api/users/search/route.ts` - User search endpoint for finding colleagues

### Key Features
- **Search Employees**: Find colleagues by name, email, or employee ID
- **Multiple Rating Categories**:
  - Professionalism
  - Teamwork
  - Performance
  - Communication
  - Reliability
- **Ratings**: 1-5 star scale for each category
- **Optional Feedback**: Add comments for specific ratings
- **Anonymous Option**: Submit ratings anonymously
- **History View**: See recent ratings received by an employee

### Database Schema Changes
- Added new `InternalRating` model with fields:
  - `raterId` - Who is rating
  - `ratedId` - Who is being rated
  - `category` - Rating category
  - `score` - 1-5 rating
  - `feedbackText` - Optional comments
  - `isAnonymous` - Boolean flag
  - `createdAt` / `updatedAt` - Timestamps
- Updated `User` model to include relations:
  - `ratingsGiven` - Ratings given by this user
  - `ratingsReceived` - Ratings received by this user

### API Endpoints

#### Get Internal Ratings
```
GET /api/ratings/internal?raterId=<userId>&ratedId=<userId>&category=<category>
```

#### Submit Internal Rating
```
POST /api/ratings/internal
Body: {
  ratedId: string,
  category: string,
  score: number (1-5),
  feedbackText?: string,
  isAnonymous?: boolean
}
```

---

## 4. Dashboard Updates

### Modified Files
- `components/DashboardLayout.tsx` - Added "Internal Ratings" to navigation for all authenticated users

### Navigation Changes
- All authenticated users (AGENT, HOD, ADMIN) now see "Internal Ratings" in the sidebar
- Link: `/dashboard/internal-ratings`

---

## 5. Database Schema Summary

### New Models
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

### Modified Enums
```prisma
enum RatingType {
  AGENT          // Customer rating an agent
  COMPANY        // Customer rating Alliance Insurance
  INTERNAL       // Internal rating (employee to employee)
}
```

### Modified Models
- **User**: Added relations for `ratingsGiven` and `ratingsReceived`
- **Rating**: 
  - Added `ratingType` field
  - Made `agentId` and `departmentId` optional

---

## 6. Configuration Changes

### Environment Variables
Updated `.env` with:
```env
# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="YOUR_RECAPTCHA_SITE_KEY"
RECAPTCHA_SECRET_KEY="YOUR_RECAPTCHA_SECRET_KEY"
```

### Dependencies Added
```json
{
  "next-recaptcha": "^3.x"
}
```

---

## 7. User Flows

### Company Rating Flow
1. User navigates to `/rate/company`
2. Enters customer information
3. Selects ratings for predefined questions
4. Optionally adds feedback
5. Can choose to submit anonymously
6. Receives success confirmation

### Internal Rating Flow
1. User navigates to `/dashboard/internal-ratings`
2. Searches for employee to rate
3. Selects the employee
4. Rates across 5 categories (1-5 scale)
5. Optionally adds feedback
6. Can choose to submit anonymously
7. Receives success confirmation

---

## 8. Security Considerations

### reCAPTCHA
- Server-side verification prevents token replay attacks
- Minimum score threshold (0.5) to prevent automated abuse
- Keys stored in environment variables

### Internal Ratings
- Requires authentication (user must be logged in)
- Cannot rate yourself
- Prevents duplicate ratings in same category (updates existing instead)

### Company Ratings
- Accepts anonymous submissions
- Can be marked as complaints

---

## 9. Testing Checklist

- [ ] Test reCAPTCHA on login page
- [ ] Test reCAPTCHA on register page
- [ ] Test company rating at `/rate/company`
- [ ] Test internal ratings at `/dashboard/internal-ratings`
- [ ] Test employee search in internal ratings
- [ ] Test rating submission with all categories
- [ ] Test anonymous rating submission
- [ ] Test cannot rate self
- [ ] Verify database entries created correctly
- [ ] Test navigation updates in dashboard
- [ ] Verify email notifications work (if applicable)

---

## 10. Future Enhancements

Potential improvements for future development:
- Add rating analytics dashboard
- Implement rating trending/charts
- Add department-level rating reports
- Implement rating notifications
- Add rating review/moderation system
- Export ratings to CSV/Excel
- Add rating filtering and sorting
- Implement rating categories customization
- Add performance comparison between employees
- Implement 360-degree review system

---

## 11. Deployment Notes

### Before Deploying
1. Add reCAPTCHA keys to production environment variables
2. Run database migrations: `npm run db:push`
3. Test all new features in staging environment

### Post-Deployment
1. Monitor reCAPTCHA verification success rates
2. Check database for schema sync issues
3. Verify all API endpoints are responding
4. Test user flows end-to-end

---

## 12. Support & Troubleshooting

### reCAPTCHA Issues
- Ensure keys are correctly added to `.env`
- Check browser console for reCAPTCHA errors
- Verify domain is added to reCAPTCHA settings

### Internal Ratings Not Appearing
- Ensure user is authenticated
- Check user has correct role (AGENT, HOD, or ADMIN)
- Verify database schema is synced

### Company Rating Not Working
- Check company questions are created in database
- Verify API endpoint is responding

---

Generated: January 23, 2026
Version: 1.0.0
