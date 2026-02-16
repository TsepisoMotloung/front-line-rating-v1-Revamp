import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from './prisma';

// Validate required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  console.error('❌ NEXTAUTH_SECRET is not set in environment variables');
}

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ NEXTAUTH_URL is not set - using VERCEL_URL as fallback');
}

async function verifyHcaptchaToken(token: string): Promise<boolean> {
  try {
    // Add 5 second timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(process.env.HCAPTCHA_SECRET_KEY || '')}&response=${encodeURIComponent(token)}`,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return false;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        hcaptchaToken: { label: 'hCaptcha Token', type: 'text' },
      },
      async authorize(credentials, req) {
        console.log('🔐 Authorize starting for:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        if (!credentials?.hcaptchaToken) {
          throw new Error('hCaptcha verification failed');
        }

        // Verify hCaptcha token server-side
        console.log('🤖 Verifying hCaptcha...');
        const hcaptchaValid = await verifyHcaptchaToken(credentials.hcaptchaToken);
        console.log('🤖 hCaptcha result:', hcaptchaValid);
        
        if (!hcaptchaValid) {
          throw new Error('hCaptcha verification failed');
        }

        console.log('🔍 Querying database for user...');
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { department: true },
        });
        console.log('🔍 User found:', user ? user.email : 'null');

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (user.status === 'PENDING') {
          throw new Error('Your account is pending approval');
        }

        if (user.status === 'REJECTED') {
          throw new Error('Your account has been rejected');
        }

        console.log('🔑 Verifying password...');
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log('🔑 Password valid:', isPasswordValid);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        console.log('✅ Authorization successful for:', user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          departmentId: user.departmentId ?? undefined,
          departmentName: user.department?.name,
          status: user.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.departmentId = user.departmentId;
        token.departmentName = user.departmentName;
        token.status = user.status;
      }
      
      // Log token creation in development
      if (process.env.NODE_ENV === 'development' && trigger === 'signIn') {
        console.log('JWT callback - Creating token for:', token.email);
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.departmentId = token.departmentId as string;
        session.user.departmentName = token.departmentName as string;
        session.user.status = token.status as string;
      }
      
      // Log session creation in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Session callback - User:', session.user?.email, 'Role:', session.user?.role);
      }
      
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};