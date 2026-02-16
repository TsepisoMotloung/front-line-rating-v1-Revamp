# Service Feedback Platform - Production Ready 🚀

A comprehensive employee and agent rating system built with Next.js 14, Prisma, and MySQL.

## ✨ Features

- **Multi-Role Authentication**: Admin, HOD, Agent, and Employee roles with secure JWT-based auth
- **Rating System**: Customer feedback for agents, internal ratings, and company-wide ratings
- **Real-time Dashboard**: Role-based dashboards with performance analytics
- **Complaint Management**: Track and resolve customer complaints
- **QR Code Integration**: Quick rating access via QR codes
- **Email Notifications**: Automated alerts for ratings and complaints
- **Department Management**: Organize teams and track performance by department
- **Advanced Analytics**: Charts, trends, and performance metrics
- **Mobile Responsive**: Optimized for all devices

## 🔧 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MySQL with Prisma ORM
- **Authentication**: NextAuth.js v4
- **UI**: Tailwind CSS + Lucide Icons
- **Charts**: Recharts
- **Security**: hCaptcha, bcrypt password hashing
- **Email**: Nodemailer

## 📋 Prerequisites

- Node.js 18+ 
- MySQL 8.0+ or compatible database
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd front-line-rating-v1-Revamp
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_HCAPTCHA_SITE_KEY="<your-key>"
HCAPTCHA_SECRET_KEY="<your-secret>"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

### 3. Setup Database

```bash
# Push database schema
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Default Login Credentials

After seeding, use these credentials:

**Admin:**
- Email: `admin@frontlinerating.com`
- Password: `Admin@123`

**HOD (Sales):**
- Email: `hod.sales@frontlinerating.com`
- Password: `Hod@123`

**Agent (Sales):**
- Email: `agent1.sales@frontlinerating.com`
- Password: `Agent@123`

**⚠️ IMPORTANT**: Change these passwords immediately in production!

## 📦 Production Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables

3. **Required Environment Variables in Vercel**
```
DATABASE_URL=<your-production-database-url>
NEXTAUTH_SECRET=<min-32-chars-secret>
NEXTAUTH_URL=https://your-app.vercel.app
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=<your-key>
HCAPTCHA_SECRET_KEY=<your-secret>
EMAIL_SERVER_HOST=<smtp-host>
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=<email>
EMAIL_SERVER_PASSWORD=<password>
EMAIL_FROM=<sender-email>
```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `https://your-app.vercel.app`

### Database Migration (Production)

```bash
npm run db:migrate:deploy
```

## ✅ Production Checklist

### Security
- [x] No hardcoded passwords in code (seed.js is for development only)
- [x] Environment variables properly configured
- [x] NextAuth secret is cryptographically secure (32+ chars)
- [x] CORS and security headers configured
- [x] Password hashing with bcrypt
- [x] SQL injection protection via Prisma
- [x] XSS protection configured
- [x] CSRF protection via NextAuth

### Performance
- [x] Database queries optimized with parallel execution
- [x] Proper database indexes on all foreign keys
- [x] Image optimization configured
- [x] Gzip compression enabled
- [x] CSS optimization enabled
- [x] Bundle size optimized
- [x] API response times < 2s

### Code Quality
- [x] TypeScript strict mode enabled
- [x] ESLint configured and passing
- [x] No console.logs in production API routes (only errors)
- [x] Error boundaries implemented
- [x] Proper error handling everywhere
- [x] Loading states for all async operations

### Monitoring
- [x] Error logging in API routes
- [x] Performance logging for slow queries
- [x] Authentication logging for debugging

### Documentation
- [x] README with setup instructions
- [x] .env.example with all required variables
- [x] Code comments for complex logic
- [x] API routes documented

## 📊 Database Schema

The application uses the following main models:

- **User**: Admin, HOD, Agent, Employee accounts
- **Department**: Organizational departments
- **Rating**: Customer ratings and feedback
- **Question**: Department-specific rating questions
- **Response**: Individual question responses
- **Notification**: User notifications
- **InternalRating**: Employee-to-employee ratings
- **AllianceInsuranceQuestion**: Company-wide rating questions

## 🔨 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with test data
npm run db:studio        # Open Prisma Studio
npm run db:migrate       # Create new migration
npm run db:migrate:deploy # Apply migrations (production)
```

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL connection string | Yes |
| `NEXTAUTH_SECRET` | JWT signing secret (min 32 chars) | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha public key | Yes |
| `HCAPTCHA_SECRET_KEY` | hCaptcha private key | Yes |
| `EMAIL_SERVER_HOST` | SMTP host | Yes |
| `EMAIL_SERVER_PORT` | SMTP port | Yes |
| `EMAIL_SERVER_USER` | SMTP username | Yes |
| `EMAIL_SERVER_PASSWORD` | SMTP password | Yes |
| `EMAIL_FROM` | Sender email address | Yes |

## 🐛 Troubleshooting

### Build Fails on Vercel

**Issue**: ESLint errors during build

**Solution**: Run `npm run lint` locally and fix all errors

### Database Connection Issues

**Issue**: Can't connect to MySQL

**Solution**: 
1. Verify DATABASE_URL format
2. Check database server is running
3. Verify credentials
4. Check firewall rules

### Authentication Not Working

**Issue**: Login redirects to error page

**Solution**:
1. Verify NEXTAUTH_SECRET is set (min 32 chars)
2. Check NEXTAUTH_URL matches your domain
3. Clear browser cookies
4. Check database has users table

### Slow API Responses

**Issue**: Dashboard takes too long to load

**Solution**:
1. Check database indexes exist
2. Verify queries are running in parallel
3. Check database server performance
4. Consider implementing Redis caching

## 📝 License

Proprietary - All rights reserved

## 👥 Support

For support, email support@frontlinerating.com

---

**Built with ❤️ for excellent customer service tracking**
