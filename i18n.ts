import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'de', 'fr', 'es', 'it'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',
  de: 'Deutsch', 
  fr: 'Français',
  es: 'Español',
  it: 'Italiano'
} as const;

export const localeFlags = {
  en: '🇺🇸',
  de: '🇩🇪',
  fr: '🇫🇷', 
  es: '🇪🇸',
  it: '🇮🇹'
} as const;

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});