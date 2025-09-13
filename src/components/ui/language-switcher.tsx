'use client';

import { Link, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  return (
    <ul>
      {routing.locales.map((loc) => (
        <li key={loc}>
          <Link href={pathname} locale={loc} className="block px-3 py-2">
            {loc}
          </Link>
        </li>
      ))}
    </ul>
  );
}