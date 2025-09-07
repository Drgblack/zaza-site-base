export const locales = ['en','es','fr','de','it'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';

export const routing = {
  locales: locales as readonly string[],
  defaultLocale
} as const;
