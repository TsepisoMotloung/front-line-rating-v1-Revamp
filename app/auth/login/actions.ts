'use server';

import { signIn } from 'next-auth/react';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

interface LoginResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

async function verifyHcaptchaToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(process.env.HCAPTCHA_SECRET_KEY || '')}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return false;
  }
}

export async function loginAction(formData: {
  email: string;
  password: string;
  hcaptchaToken: string;
}): Promise<LoginResult> {
  try {
    // Validate inputs
    if (!formData.email || !formData.password) {
      return { success: false, error: 'Please enter your email and password' };
    }

    if (!formData.hcaptchaToken) {
      return { success: false, error: 'hCaptcha verification failed' };
    }

    // Verify hCaptcha token
    const hcaptchaValid = await verifyHcaptchaToken(formData.hcaptchaToken);
    if (!hcaptchaValid) {
      return { success: false, error: 'hCaptcha verification failed' };
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: formData.email },
      include: { department: true },
    });

    if (!user) {
      return { success: false, error: 'No user found with this email' };
    }

    // Check user status
    if (user.status === 'PENDING') {
      return { success: false, error: 'Your account is pending approval' };
    }

    if (user.status === 'REJECTED') {
      return { success: false, error: 'Your account has been rejected' };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(formData.password, user.password);
    if (!isPasswordValid) {
      return { success: false, error: 'Invalid password' };
    }

    // Return success - let the client side handle NextAuth signIn
    return { 
      success: true, 
      redirectTo: '/dashboard'
    };
  } catch (error: any) {
    console.error('Login action error:', error);
    return { 
      success: false, 
      error: error?.message || 'Login failed. Please try again.' 
    };
  }
}
