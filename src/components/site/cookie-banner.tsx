'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

type CookieConsent = 'accepted' | 'declined' | null;

const COOKIE_CONSENT_KEY = 'zaza-cookie-consent';

const cookieTexts = {
  en: {
    message: "We use cookies to improve your experience. By clicking 'Accept', you agree to the use of cookies. You can learn more in our Privacy Policy.",
    accept: 'Accept',
    decline: 'Decline',
    moreInfo: 'More info',
    privacyLink: '/privacy'
  },
  de: {
    message: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Mit Klick auf 'Akzeptieren' stimmen Sie der Nutzung von Cookies zu. Mehr dazu finden Sie in unserer Datenschutzerklärung.",
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    moreInfo: 'Mehr Infos',
    privacyLink: '/datenschutz'
  },
  es: {
    message: "Utilizamos cookies para mejorar su experiencia. Al hacer clic en 'Aceptar', usted acepta el uso de cookies. Puede obtener más información en nuestra Política de Privacidad.",
    accept: 'Aceptar',
    decline: 'Rechazar',
    moreInfo: 'Más información',
    privacyLink: '/politica-de-privacidad'
  },
  fr: {
    message: "Nous utilisons des cookies pour améliorer votre expérience. En cliquant sur 'Accepter', vous acceptez l'utilisation des cookies. Plus d'informations dans notre Politique de confidentialité.",
    accept: 'Accepter',
    decline: 'Refuser',
    moreInfo: 'En savoir plus',
    privacyLink: '/politique-de-confidentialite'
  },
  it: {
    message: "Utilizziamo i cookie per migliorare la tua esperienza. Facendo clic su 'Accetta', accetti l'uso dei cookie. Maggiori informazioni nella nostra Informativa sulla privacy.",
    accept: 'Accetta',
    decline: 'Rifiuta',
    moreInfo: 'Maggiori informazioni',
    privacyLink: '/informativa-sulla-privacy'
  }
};

export function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale() as keyof typeof cookieTexts;
  
  const text = cookieTexts[locale] || cookieTexts.en;

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent;
    if (savedConsent) {
      setConsent(savedConsent);
      setIsVisible(false);
    } else {
      // Show banner after a short delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleConsent = (choice: CookieConsent) => {
    setConsent(choice);
    setIsVisible(false);
    
    if (choice) {
      localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    }

    // Dispatch custom event for analytics tracking
    window.dispatchEvent(new CustomEvent('cookieConsent', { 
      detail: { consent: choice } 
    }));

    // If declined, ensure no non-essential cookies are set
    if (choice === 'declined') {
      // Clear any existing analytics cookies
      const cookiesToClear = ['_ga', '_ga_*', '_gid', '_fbp', '_fbc'];
      cookiesToClear.forEach(cookieName => {
        if (cookieName.includes('*')) {
          // Clear all cookies matching pattern
          Object.keys(document.cookie.split(';')).forEach(key => {
            if (key.trim().startsWith(cookieName.replace('*', ''))) {
              document.cookie = `${key.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
            }
          });
        } else {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        }
      });
    }
  };

  if (!isVisible || consent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Cookie Icon */}
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0">
              <Cookie className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {text.message}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={text.privacyLink}
              className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
            >
              {text.moreInfo}
            </a>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConsent('declined')}
                className="text-xs"
              >
                {text.decline}
              </Button>
              
              <Button
                size="sm"
                onClick={() => handleConsent('accepted')}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
              >
                {text.accept}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to check cookie consent status
export function useCookieConsent(): CookieConsent {
  const [consent, setConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent;
    setConsent(savedConsent);

    const handleConsentChange = (event: CustomEvent) => {
      setConsent(event.detail.consent);
    };

    window.addEventListener('cookieConsent', handleConsentChange as EventListener);
    
    return () => {
      window.removeEventListener('cookieConsent', handleConsentChange as EventListener);
    };
  }, []);

  return consent;
}