'use client';

import {Link, usePathname} from '@/i18n/routing';

// Only show English locale for now (others not fully supported)
const enabledLocales = ['en'] as const;

export default function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      {enabledLocales.map((loc) => (
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