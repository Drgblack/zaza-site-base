'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('pricing');

  return (
    <section className="relative isolate overflow-hidden rounded-b-2xl bg-gradient-to-b from-[#2a2140] via-[#21193a] to-[#0e0b1a]">
      <div className="mx-auto max-w-5xl px-4 pt-24 pb-10 text-center">
        <a 
          href="#plans" 
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10 transition animate-fade-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t('zaza_pass.hero_badge')}
        </a>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {t('headline')}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/85 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t('zaza_pass.hero_desc')}
        </p>
      </div>
    </section>
  );
}