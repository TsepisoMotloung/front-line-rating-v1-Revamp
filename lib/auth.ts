import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import prisma from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        recaptchaToken: { label: 'reCAPTCHA Token', type: 'text' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        // Verify reCAPTCHA
        if (credentials.recaptchaToken) {
          try {
            const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${credentials.recaptchaToken}`,
            });

            const recaptchaData = await recaptchaResponse.json();

            if (!recaptchaData.success || recaptchaData.score < 0.5) {
              throw new Error('reCAPTCHA verification failed');
            }
          } catch (recaptchaError) {
            console.error('reCAPTCHA verification error:', recaptchaError);
            throw new Error('reCAPTCHA verification failed');
          }
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { department: true },
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (user.status === 'PENDING') {
          throw new Error('Your account is pending approval');
        }

        if (user.status === 'REJECTED') {
          throw new Error('Your account has been rejected');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

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
    async jwt({ token, user }) {
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
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};