'use client';

import { useTranslations } from 'next-intl';

export function StarterButton() {
  const t = useTranslations('pricing');

  return (
    <button 
      onClick={() => window?.gtag?.('event', 'click_pricing_choose_starter')}
      className="mt-5 w-full rounded-full border border-white/25 px-4 py-2 text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
      className="mt-5 w-full rounded-full bg-gradient-to-r from-[#6d28d9] via-[#d946ef] to-[#06b6d4] px-4 py-2 font-medium text-white shadow-[0_8px_24px_rgba(109,40,217,0.35)] hover:shadow-[0_10px_28px_rgba(109,40,217,0.45)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {t('cta.choose_pro')}
    </button>
  );
}