import { NextRequest, NextResponse } from 'next/server';
import { env } from './lib/env/server';
import { cookies } from 'next/headers';
import { BetterAuthSessionProps } from '@mns/api/types';

const PRIVATE_ROUTE = ['/user'];

export default async function Proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const cookieStore = await cookies();

  if (!PRIVATE_ROUTE.includes(pathname)) {
    return NextResponse.next();
  }

  const response = await fetch(`${env.API_URL}/api/auth/get-session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const session: BetterAuthSessionProps = await response.json();

  if (!session?.user) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
