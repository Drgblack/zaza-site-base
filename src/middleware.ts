import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  locales: ['en', 'de', 'fr', 'es', 'it'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(de|fr|es|it)/:path*']
};