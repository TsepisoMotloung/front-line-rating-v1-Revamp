import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from './prisma';

// Simple hCaptcha verification with timeout
async function verifyHcaptcha(token: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${token}`,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('❌ hCaptcha error:', error);
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
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password required');
          }

          if (!credentials.hcaptchaToken) {
            throw new Error('Please complete the captcha');
          }

          // Verify captcha
          const captchaValid = await verifyHcaptcha(credentials.hcaptchaToken);
          if (!captchaValid) {
            throw new Error('Captcha verification failed');
          }

          // Find user
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { department: true },
          });

          if (!user) {
            throw new Error('Invalid email or password');
          }

          // Check status
          if (user.status !== 'APPROVED') {
            throw new Error('Your account is pending approval');
          }

          // Verify password
          const passwordValid = await bcrypt.compare(credentials.password, user.password);
          if (!passwordValid) {
            throw new Error('Invalid email or password');
          }

          // Return user data for session
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            departmentId: user.departmentId ?? undefined,
            departmentName: user.department?.name,
            status: user.status,
          };
        } catch (error: any) {
          console.error('🔐 Auth error:', error.message);
          throw error;
        }
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token on sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.departmentId = user.departmentId;
        token.departmentName = user.departmentName;
        token.status = user.status;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add token data to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.departmentId = token.departmentId as string;
        session.user.departmentName = token.departmentName as string;
        session.user.status = token.status as string;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/auth/login',
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};
