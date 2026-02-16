import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const { pathname } = request.nextUrl;
  console.log('🛡️ [MIDDLEWARE] Request to:', pathname, 'at', new Date().toISOString());
  
  // Check if the path requires authentication
  const protectedPaths = ['/dashboard', '/admin', '/profile'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  if (!isProtectedPath) {
    console.log('✅ [MIDDLEWARE] Public path, allowing');
    return NextResponse.next();
  }

  try {
    // Get the session token
    const tokenStart = Date.now();
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log('⏱️ [MIDDLEWARE] Token retrieved in', Date.now() - tokenStart, 'ms');

    // Log for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 [MIDDLEWARE] Path:', pathname);
      console.log('📊 [MIDDLEWARE] Token exists:', !!token);
      if (token) {
        console.log('📊 [MIDDLEWARE] User:', token.email, 'Role:', token.role, 'Status:', token.status);
      }
    }

    // If no token, redirect to login
    if (!token) {
      console.log('❌ [MIDDLEWARE] No token, redirecting to login');
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if user is approved
    if (token.status !== 'APPROVED') {
      console.log('❌ [MIDDLEWARE] User not approved, redirecting to login');
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('error', 'Your account is not approved');
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid, allow the request
    console.log('✅ [MIDDLEWARE] User authorized, allowing request in', Date.now() - startTime, 'ms');
    return NextResponse.next();
  } catch (error) {
    console.error('❌ [MIDDLEWARE] Error:', error);
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