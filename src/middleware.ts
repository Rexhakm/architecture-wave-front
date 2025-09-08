import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/favicon.ico') {
    const url = request.nextUrl.clone();
    url.pathname = '/assets/Vector-12.png';
    // Add cache-busting so browsers don't reuse old icon
    url.searchParams.set('v', '4');
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/favicon.ico'],
};


