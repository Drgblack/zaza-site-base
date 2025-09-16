'use client';

import { useTranslations } from 'next-intl';

export function StarterButton() {
  const t = useTranslations('pricing');

  return (
    <button 
      onClick={() => window?.gtag?.('event', 'click_pricing_choose_starter')}
      className="mt-5 w-full h-11 rounded-lg border border-white/25 px-4 py-2 text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {t('cta.choose_starter')}
    </button>
  );
}

export function ProButton() {
  const t = useTranslations('pricing');

  return (
    <button 
      onClick={() => window?.gtag?.('event', 'click_pricing_choose_pro')}
      className="mt-5 w-full h-11 rounded-lg bg-white text-[#18122b] px-4 py-2 font-medium hover:bg-white/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {t('cta.choose_pro')}
    </button>
  );
}