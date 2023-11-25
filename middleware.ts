import { createI18nMiddleware } from 'next-international/middleware';
import type { NextRequest } from 'next/server';
import { Settings } from './settings';

const I18nMiddleware = createI18nMiddleware({
  locales: Settings.lang,
  defaultLocale: 'en',
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};