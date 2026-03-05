# Applying Alliance Ratings Migration to Production

## Quick Summary
✅ Migration file created and ready  
✅ Prisma client regenerated  
📋 Next: Apply migration to your production database

## Step-by-Step Instructions

### Option 1: Using Prisma CLI (Recommended)

#### 1.1 Get Your Vercel Database URL
1. Go to [Vercel.com](https://vercel.com)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Find or copy your `DATABASE_URL`
5. It should look like: `mysql://user:password@host/database`

#### 1.2 Apply Migration Locally First (Test)
```bash
# Set the DATABASE_URL in your terminal
export DATABASE_URL="mysql://user:password@your-vercel-host/frontline"

# Deploy the migration
npx prisma migrate deploy
```

#### 1.3 Apply to Vercel Production
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Ensure `DATABASE_URL` is set (it should be from your MySQL provider)
3. Redeploy your project:
   ```bash
   vercel env pull  # Get environment variables
   npx prisma migrate deploy  # Apply migrations
   vercel deploy  # Redeploy
   ```

---

### Option 2: Manual SQL (If Prisma Doesn't Work)

Connect to your MySQL database and run this SQL directly:

```sql
-- Make questionId optional in Response table
ALTER TABLE `Response` MODIFY `questionId` VARCHAR(191);

-- Add allianceQuestionId column to Response table
ALTER TABLE `Response` ADD COLUMN `allianceQuestionId` VARCHAR(191);

-- Add index for allianceQuestionId
ALTER TABLE `Response` ADD KEY `Response_allianceQuestionId_idx`(`allianceQuestionId`);

-- Add foreign key constraint for allianceQuestionId
ALTER TABLE `Response` ADD CONSTRAINT `Response_allianceQuestionId_fkey` 
  FOREIGN KEY (`allianceQuestionId`) 
  REFERENCES `AllianceInsuranceQuestion`(`id`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE;

-- Mark migration as applied (Prisma tracking)
INSERT INTO `_prisma_migrations` (id, checksum, finished_at, execution_time, name, logs, rolled_back_at, started_at, applied_steps_count) 
VALUES ('20260305103000_add_alliance_question_responses', 'aabbccdd11223344', NOW(), 0, 'add_alliance_question_responses', NULL, NULL, NOW(), 1);
```

---

### Option 3: Using Vercel CLI
```bash
# Pull current environment
vercel env pull

# Run migration
npx prisma migrate deploy

# Push updated schema
git add prisma/
git commit -m "chore: apply alliance questions migration"
git push

# Trigger Vercel rebuild
vercel deploy --prod
```

---

## Verification After Migration

### Check Migration Applied
```bash
# List all migrations
npx prisma migrate status

# Should show: Migration applied: 20260305103000_add_alliance_question_responses
```

### Check Database Schema
```sql
-- Verify new columns exist
DESCRIBE Response;

-- Should show: allianceQuestionId  varchar(191)  NULL
```

### Test Alliance Ratings API
```bash
# 1. Create an alliance rating
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

# 2. Verify responses were stored
curl "https://your-app.com/api/ratings?ratingType=ALLIANCE"

# 3. Check admin stats includes alliance ratings
curl "https://your-app.com/api/dashboard/admin-stats"
```

---

## Troubleshooting

### Error: "Failed to connect to database"
- ✅ Verify DATABASE_URL is correct
- ✅ Check IP whitelist in MySQL provider
- ✅ Confirm credentials have proper permissions

### Error: "Column already exists"
- Database already has the migration applied
- Run `npx prisma migrate status` to verify
- You can safely proceed

### Error: "Foreign key constraint fails"
- Ensure `AllianceInsuranceQuestion` table exists
- Run: `SELECT COUNT(*) FROM AllianceInsuranceQuestion;`
- If empty, seed data first

### Alliance Ratings Still Not Showing
1. Verify migration was applied: `npx prisma migrate status`
2. Regenerate client: `npx prisma generate`
3. Rebuild project: `npm run build`
4. Restart server

---

## Files Modified
- ✅ `prisma/schema.prisma` - Added allianceQuestion relation
- ✅ `prisma/migrations/20260305103000_add_alliance_question_responses/migration.sql` - Migration created
- ✅ `app/api/ratings/route.ts` - Ready to store alliance responses
- ✅ `app/dashboard/ratings/page.tsx` - Ready to display responses
- ✅ Generated Prisma client updated

---

## Git Commit & Push
```bash
# Everything is ready - just commit and push
git add -A
git commit -m "feat: add alliance question responses migration

- Add allianceQuestionId column to Response table
- Make questionId optional for alliance ratings
- Add proper foreign key constraints
- Update Prisma schema and client"
git push origin main
```

Then Vercel will automatically deploy. Run the migration on your production database after the code is deployed.
