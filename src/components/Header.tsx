'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Image 
                  src="/images/zaza-logo.png" 
                  alt="Zaza Technologies Logo" 
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg"
                  width={40}
                  height={40}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-sm"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                Zaza Technologies
              </div>
              <div className="text-xs lg:text-sm text-gray-500 font-medium">AI for Educators</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Our Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Our Solutions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40">
                  <Link
                    href="/products"
                    className="block px-4 py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="font-medium">All Products</div>
                    <div className="text-xs text-gray-500">Complete suite overview</div>
                  </Link>
                  <Link
                    href="/teach"
                    className="block px-4 py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="font-medium">Zaza Teach</div>
                    <div className="text-xs text-gray-500">Lesson planning assistant</div>
                  </Link>
                  <Link
                    href="/notably"
                    className="block px-4 py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="font-medium">Zaza Inbox</div>
                    <div className="text-xs text-gray-500">Communication suite</div>
                  </Link>
                  <Link
                    href="/promptly"
                    className="block px-4 py-3 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors border-l-2 border-purple-500 bg-purple-50/50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="font-medium">Zaza Promptly</div>
                    <div className="text-xs text-gray-500">AI comment generator</div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/about-founder" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              About Us
            </Link>
            
            {/* CTA Button */}
            <Link 
              href="https://www.zazapromptly.com"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Start Free Trial
            </Link>
          </nav>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="true"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div 
            className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            id="mobile-navigation"
            role="region"
            aria-label="Mobile navigation menu"
          >
            <nav className="py-4 space-y-1" role="navigation" aria-label="Mobile navigation links">
              {/* Our Solutions Section */}
              <div className="px-4 py-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Our Solutions</div>
                <Link 
                  href="/products" 
                  className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Products
                </Link>
                <Link 
                  href="/promptly" 
                  className="block px-2 py-2 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Zaza Promptly
                </Link>
              </div>

              <Link 
                href="/about-founder" 
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              {/* Mobile CTA */}
              <div className="px-4 pt-2">
                <Link 
                  href="https://www.zazapromptly.com"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg text-center transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
