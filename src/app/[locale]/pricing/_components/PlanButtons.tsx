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
      className="mt-5 w-full rounded-full px-4 py-2 font-medium text-white bg-[linear-gradient(90deg,#6d28d9,#d946ef,#06b6d4)] [background-size:200%_100%] animate-gradient-x shadow-[0_10px_28px_rgba(109,40,217,.45)] hover:shadow-[0_14px_34px_rgba(109,40,217,.6)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {t('cta.choose_pro')}
    </button>
  );
}