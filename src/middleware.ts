import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const rolePending = request.cookies.get('role_selection_pending')?.value === 'true'
  const pathname = request.nextUrl.pathname

  // 1. User is Logged In
  if (token) {
    // A. Pending Role Selection
    if (rolePending) {
      // Must go to /select-role
      if (pathname !== '/select-role') {
        return NextResponse.redirect(new URL('/select-role', request.url))
      }
      return NextResponse.next()
    }

    // B. Role Selected (No pending cookie)
    // Cannot access /select-role or /login
    if (pathname === '/select-role' || pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Allow dashboard access
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  }

  // 2. User is NOT Logged In
  // Protect /dashboard and /select-role
  if (pathname.startsWith('/dashboard') || pathname === '/select-role') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  return response
}

export const config = {
  matcher: [
    '/login',
    '/select-role',
    '/dashboard/:path*',
  ],
}
