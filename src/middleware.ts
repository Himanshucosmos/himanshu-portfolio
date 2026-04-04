import { NextResponse, type NextRequest } from 'next/server'

// Simple session middleware for admin protection
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /admin routes (but not /admin/login itself)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionToken = request.cookies.get('admin_session')?.value
    const expectedToken = process.env.ADMIN_SECRET_TOKEN

    if (!sessionToken || sessionToken !== expectedToken) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
