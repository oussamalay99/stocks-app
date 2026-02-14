import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

/**
 * Enforces session-based authentication for incoming Next.js requests.
 *
 * If a session cookie is missing, redirects the client to `/sign-in`; otherwise allows the request to continue.
 *
 * @param request - The incoming Next.js request to inspect for a session cookie
 * @returns A `NextResponse` that redirects to `/sign-in` when no session cookie is present, or `NextResponse.next()` to continue processing
 */
export async function middleware(request: NextRequest) {
const sessionCookie = getSessionCookie(request);

 // Check cookie presence - prevents obviously unauthorized users
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)',
  ],
};