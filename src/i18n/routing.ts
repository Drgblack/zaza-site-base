import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en','de','fr','es','it'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/resources': {
      en: '/resources',
      de: '/ressourcen',
      fr: '/ressources',
      es: '/recursos', 
      it: '/risorse'
    },
    '/cookies': '/cookies'
  }
});
 
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
