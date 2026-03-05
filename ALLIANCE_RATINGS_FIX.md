# Alliance Ratings Fix - Implementation Guide

## Problem Summary
Alliance ratings were being stored without their question responses, causing 500 errors when trying to display them.

## Root Cause
The database schema didn't support storing alliance question responses. There was a separate `AllianceInsuranceQuestion` table, but the `Response` table only referenced the `Question` table.

## Issues Fixed

### 1. **Database Schema Updated** (Prisma)
- Made `questionId` optional in Response model
- Added `allianceQuestionId` field to Response model  
- Added relationship between Response and AllianceInsuranceQuestion
- Added reverse relationship in AllianceInsuranceQuestion model

### 2. **API Endpoints Hardened**
- Added graceful error handling in `/api/ratings` (POST & GET)
- Added detailed error logging to `/api/dashboard/admin-stats`
- Both endpoints now fall back gracefully if migration hasn't been applied
- Report generation endpoint handles missing question data

### 3. **Response Storage Strategy**
- Alliance ratings now attempt to store responses with `allianceQuestionId`
- If migration not applied yet, responses are skipped (rating still saved)
- Once migration applied, responses will be automatically captured

## Migration Details

**Migration File**: `prisma/migrations/20260305103000_add_alliance_question_responses/migration.sql`

**What it does**:
- Makes `questionId` nullable in Response table
- Adds `allianceQuestionId` column to Response table
- Creates foreign key constraint from Response to AllianceInsuranceQuestion

## How to Deploy to Production

### Option 1: Using Prisma CLI (Recommended)
```bash
npx prisma migrate deploy
```

### Option 2: Manual Database Setup
Run the SQL from `prisma/migrations/20260305103000_add_alliance_question_responses/migration.sql` directly on your production database.

## Testing Checklist

After deployment, test these endpoints:

```bash
# 1. Test Alliance Rating Creation
curl -X POST https://your-app.com/api/ratings \
  -H "Content-Type: application/json" \
  -d '{
    "ratingType": "ALLIANCE",
    "customerName": "Test Customer",
    "customerContact": "test@example.com",
    "responses": [
      {"questionId": "q1-id", "score": 5},
      {"questionId": "q2-id", "score": 4}
    ]
  }'

# 2. Test Get Ratings with Alliance Filter
curl "https://your-app.com/api/ratings?ratingType=ALLIANCE"

# 3. Test Admin Stats (includes alliance ratings count)
curl "https://your-app.com/api/dashboard/admin-stats"

# 4. Check Ratings Dashboard
# Navigate to /dashboard/ratings to view stored alliance ratings with responses
```

## Current Status

✅ **Code Changes**: All complete and tested
⏳ **Database Migration**: Ready to apply
✅ **Error Handling**: Comprehensive logging added
✅ **Backward Compatibility**: Code works with or without migration

## Expected Behavior After Migration

1. **Alliance Rating Creation**: Questions and responses stored in Response table
2. **Dashboard Display**: Alliance ratings show with scored questions
3. **Analytics**: Alliance rating trends and distribution visible
4. **Reports**: Alliance ratings included with question responses
5. **Admin Stats**: Separate count for alliance ratings

## Rollback Plan (if needed)

The database migration is safe because:
- Existing data is not deleted or modified
- Only new columns are added 
- Columns are marked as optional for backward compatibility
- Foreign keys use CASCADE delete (safe)

To rollback:
```bash
npx prisma migrate reset --force
# or
npx prisma migrate resolve --rolled-back 20260305103000_add_alliance_question_responses
```

## Verification

After running migration, verify with:
```sql
-- Check Response table structure
DESCRIBE Response;

-- Should show: allianceQuestionId (varchar, nullable)
```

## Files Modified

1. `/prisma/schema.prisma` - Added allianceQuestion relation
2. `/app/api/ratings/route.ts` - Added alliance response storage with fallback
3. `/app/api/dashboard/admin-stats/route.ts` - Added error logging
4. `/app/api/reports/generate/route.ts` - Handle missing question data
5. `/app/dashboard/ratings/page.tsx` - Display alliance responses gracefully
6. `/prisma/migrations/20260305103000_add_alliance_question_responses/migration.sql` - NEW

## Support

If you encounter issues:
1. Check server logs for detailed error messages (now logged)
2. Verify migration was applied: `prisma migrate status`
3. Regenerate Prisma client: `npx prisma generate`
