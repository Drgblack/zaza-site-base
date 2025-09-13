'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { locales, localeNames, localeFlags, type Locale } from '../../../i18n';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('navigation');
  const hero = useTranslations('hero');
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('resources'), href: '/resources' },
    { name: t('blog'), href: '/blog' },
    { name: t('community'), href: '/community' },
    { name: t('faq'), href: '/faq' },
    { name: t('pricing'), href: '/pricing' },
  ];

  const companyLinks = [
    { name: t('about'), href: '/about' },
    { name: 'Meet Your Fellow Educator', href: '/meet-your-fellow-educator' },
    { name: t('press'), href: '/press' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 dark:bg-gray-900/95 dark:border-gray-800' 
          : 'bg-white/90 backdrop-blur-sm dark:bg-gray-900/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16" role="banner">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" aria-label="Zaza Promptly Home">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center">
                <Image 
                  src="/images/zaza-logo.png" 
                  alt="Zaza Promptly Logo" 
                  className="w-8 h-8 rounded-lg"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                Zaza Promptly
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {hero('tagline')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              if (item.href === '/' || item.href === '/resources' || item.href === '/blog' || item.href === '/community' || item.href === '/faq') {
                return (
                  <Link
                    key={item.name}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={item.href as any}
                    className={`text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${
                      pathname === item.href
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${
                    pathname === item.href
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            
            {/* Our Company Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 text-gray-700 dark:text-gray-300">
                <span>{t('company')}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg dark:bg-gray-900/95 dark:border-gray-700">
                {companyLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild className="hover:bg-gray-50 dark:hover:bg-gray-800 focus:bg-gray-50 dark:focus:bg-gray-800">
                    <a
                      href={link.href}
                      className="w-full cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      {link.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {locales.map((loc) => (
                  <DropdownMenuItem key={loc} asChild>
                    <Link 
                      href={pathname} 
                      locale={loc}
                      className={`flex items-center w-full px-3 py-2 ${
                        loc === locale 
                          ? 'bg-purple-50 text-purple-700 font-semibold' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-3 text-lg">{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                      {loc === locale && (
                        <span className="ml-auto">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild>
              <a href="https://teach.zazatechnologies.com">
                {hero('cta_primary')}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="py-4 space-y-1">
              {navigation.map((item) => {
                if (item.href === '/' || item.href === '/resources' || item.href === '/blog' || item.href === '/faq' || item.href === '/community') {
                  return (
                    <Link
                      key={item.name}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      href={item.href as any}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md dark:text-gray-300 dark:hover:text-purple-400 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md dark:text-gray-300 dark:hover:text-purple-400 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-4">
                <Button asChild className="w-full">
                  <a href="https://teach.zazatechnologies.com">
                    {hero('cta_primary')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}