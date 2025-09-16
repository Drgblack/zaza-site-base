import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PRICING } from '@/lib/pricing';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { softwareApplicationSchema, organizationSchema } from '@/components/seo/structured-data-schemas';
import PricingExplainerZazaPass from '@/components/pricing/PricingExplainerZazaPass';
import RiskFreeBand from '@/components/pricing/RiskFreeBand';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMetadata('pricing', locale as 'en' | 'de' | 'fr' | 'es' | 'it');
}

export default async function PricingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pricing');

  // Default to annual
  const annual = PRICING.annual;
  const starter = annual.starter;
  const pro = annual.pro;

  return (
    <>
      <section className="relative pt-24 md:pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-5">
              {t('headline')}
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {t('subhead')}
            </p>
          </div>

          {/* Zaza Pass explainer */}
          <div className="text-center">
            <PricingExplainerZazaPass />
          </div>

          {/* Cards – Annual only */}
          <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mt-10">
            {/* Starter */}
            <PricingCard
              title={t('plans.starter.name')}
              price={`€${starter.price}`}
              suffix="/year"
              bullets={starter.bullets}
              ctaLabel={t('cta.choose_starter')}
              ctaHref={starter.stripeCheckoutUrl}
            />

            {/* Pro */}
            <PricingCard
              title={t('plans.pro.name')}
              price={`€${pro.price}`}
              suffix="/year"
              bullets={pro.bullets}
              ctaLabel={t('cta.choose_pro')}
              ctaHref={pro.stripeCheckoutUrl}
              badge={t('plans.pro.best_value')}
              featured
            />
          </section>

          <p className="mt-4 text-xs text-slate-500 text-center">
            {t('annual_saves')}
          </p>

          {/* Risk-free band */}
          <RiskFreeBand />

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/50 p-4 bg-white/70 dark:bg-slate-900/50 text-center">
              {t('badges.money_back')}
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/50 p-4 bg-white/70 dark:bg-slate-900/50 text-center">
              {t('badges.stripe')}
            </div>
            <div className="rounded-xl border border-slate-200/60 dark:border-slate-700/50 p-4 bg-white/70 dark:bg-slate-900/50 text-center">
              {t('badges.trusted')}
            </div>
          </div>

          {/* App store buttons (consistent sizing) */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="https://apps.apple.com/app/promptly-teacher-assistant/id6738104361" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12 w-auto" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.promptly.teacher" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12 w-auto" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Structured data for SEO (Starter + Pro annual) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Promptly — Starter (Annual)",
              "brand": { "@type": "Brand", "name": "Zaza Promptly" },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": "99",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Promptly — Pro (Annual)",
              "brand": { "@type": "Brand", "name": "Zaza Promptly" },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "EUR",
                "price": "149",
                "priceValidUntil": "2026-12-31",
                "availability": "https://schema.org/InStock"
              }
            }
          ])
        }}
      />
      
      {/* Original structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}

function PricingCard({
  title, price, suffix, bullets, ctaLabel, ctaHref, badge, featured=false
}:{
  title:string; price:string; suffix:string; bullets:string[];
  ctaLabel:string; ctaHref:string; badge?:string; featured?:boolean;
}) {
  return (
    <div className={`rounded-2xl border p-6 ${featured ? 'border-orange-400/40 shadow-[0_0_0_2px_rgba(251,146,60,.2)] bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50' : 'border-slate-200/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/50'}`}>
      {badge && (
        <div className="mb-3 inline-flex text-[11px] font-bold px-3 py-1 rounded-full bg-orange-500/15 text-orange-700 border border-orange-500/30">
          {badge}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-4xl font-black">{price}<span className="text-base font-semibold text-slate-400">{suffix}</span></div>
      <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
        {bullets.map((b)=> (<li key={b} className="flex items-start gap-2"><span className="text-emerald-600">✓</span><span>{b}</span></li>))}
      </ul>
      <a href={ctaHref} className={`mt-6 inline-flex w-full justify-center rounded-xl px-4 py-3 font-semibold transition-colors ${featured ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
        {ctaLabel}
      </a>
    </div>
  );
}