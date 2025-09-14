'use client';

import {Link, usePathname} from '@/i18n/routing';
import {routing} from '@/i18n/routing';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  // Temporarily only show English until other locales are ready
  const supportedLocales = ['en'];

  return (
    <div className="flex gap-2">
      {routing.locales.filter(loc => supportedLocales.includes(loc)).map((loc) => (
        <Link
          key={loc}
          href={pathname || '/'}
          locale={loc}
          prefetch
          className="px-2 py-1 rounded hover:underline"
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}