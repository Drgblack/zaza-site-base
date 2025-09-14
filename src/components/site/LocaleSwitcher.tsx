'use client';

import { usePathname } from 'next/navigation';
import Link from 'next-intl/link';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LOCALES = ['en', 'de', 'fr', 'es', 'it'] as const;
const LOCALE_NAMES = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano'
} as const;

export function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('LocaleSwitcher');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <span>{LOCALE_NAMES[currentLocale as keyof typeof LOCALE_NAMES]}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={pathname || '/'}
                locale={locale}
                className={`block px-4 py-2 text-sm ${
                  currentLocale === locale
                    ? 'bg-purple-50 text-purple-600 font-medium cursor-default'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {LOCALE_NAMES[locale]}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
