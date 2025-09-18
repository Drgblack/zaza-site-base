'use client';

import { useTranslations } from 'next-intl';

export function CommunityCTA() {
  const t = useTranslations('community.cta');

  return (
    <section className="my-12 sm:my-14 md:my-16">
      <div className="mx-auto max-w-5xl rounded-2xl border p-6 sm:p-8 md:p-10 text-center bg-card/70 backdrop-blur shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
          {t('title')}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
          {t('desc')}
        </p>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a 
            href="https://teach.zazatechnologies.com"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200 hover:shadow-md"
          >
            {t('primary')}
          </a>
          <a 
            href="/resources"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-2.5 text-sm font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-200"
          >
            {t('secondary')}
          </a>
        </div>
      </div>
    </section>
  );
}