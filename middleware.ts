import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path requires authentication
  const protectedPaths = ['/dashboard', '/admin', '/profile'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  try {
    // Get the session token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Middleware - Path:', pathname);
      console.log('Middleware - Token exists:', !!token);
      if (token) {
        console.log('Middleware - User:', token.email, 'Role:', token.role);
      }
    }

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is approved
    if (token.status !== 'APPROVED') {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('error', 'Your account is not approved');
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid, allow the request
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, redirect to login to be safe
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('error', 'Authentication error');
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
  ],
};