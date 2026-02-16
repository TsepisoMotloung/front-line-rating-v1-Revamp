import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect these paths
  if (!pathname.startsWith('/dashboard') && !pathname.startsWith('/profile')) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // No token = not logged in
    if (!token) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Not approved = can't access
    if (token.status !== 'APPROVED') {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('error', 'Account not approved');
      return NextResponse.redirect(loginUrl);
    }

    // All good, proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
