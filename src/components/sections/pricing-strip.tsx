// src/components/sections/pricing-strip.tsx
import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRICING, formatPrice, getAllPlans } from '@/lib/pricing';

export function PricingStrip() {
  const t = useTranslations('home');
  const pricing = useTranslations('pricing');
  
  const annualPlans = getAllPlans('annual');

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-yellow-950/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(251,146,60,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.12),transparent_50%)]" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-300/25 to-orange-300/25 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="mx-auto max-w-5xl">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 border-2 border-orange-200 dark:border-orange-700/50 text-sm font-bold text-orange-800 dark:text-orange-200 shadow-lg">
              <Heart className="w-5 h-5 mr-2" />
              💝 Made for teacher budgets
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
              {t('pricing_banner_title')}
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto font-medium">
              {t('pricing_banner_copy')}
            </p>
          </div>

          {/* Annual Plans Grid */}
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-8">
            {annualPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`relative backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
                  plan.badge === 'best_value' 
                    ? 'border-3 border-orange-300 dark:border-orange-500/70 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/60 dark:via-amber-950/60 dark:to-yellow-950/60 shadow-2xl scale-105'
                    : 'border-2 border-blue-200 dark:border-blue-700/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50'
                }`}
              >
                {plan.badge === 'best_value' && (
                  <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white px-6 py-2 text-sm font-black shadow-lg">
                    {pricing('plans.pro.best_value')}
                  </Badge>
                )}
                
                <CardHeader className={`pb-6 ${plan.badge === 'best_value' ? 'pt-8' : 'pt-6'}`}>
                  <CardTitle className={`text-2xl flex items-center gap-2 ${
                    plan.badge === 'best_value' 
                      ? 'text-orange-800 dark:text-orange-200' 
                      : 'text-blue-800 dark:text-blue-200'
                  }`}>
                    {plan.id === 'starter' ? 'Starter' : 'Pro'}
                  </CardTitle>
                  <CardDescription className={`font-medium ${
                    plan.badge === 'best_value' 
                      ? 'text-orange-700 dark:text-orange-300' 
                      : 'text-blue-700 dark:text-blue-300'
                  }`}>
                    {formatPrice(plan.price, plan.priceSuffix)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className={`text-5xl font-black ${
                      plan.badge === 'best_value' 
                        ? 'text-orange-600 dark:text-orange-400' 
                        : 'text-blue-600 dark:text-blue-400'
                    }`}>
                      €{plan.price}<span className={`text-2xl font-bold ${
                        plan.badge === 'best_value' 
                          ? 'text-orange-700 dark:text-orange-300' 
                          : 'text-blue-700 dark:text-blue-300'
                      }`}>/year</span>
                    </div>
                  </div>

                  <ul className="space-y-4 text-sm">
                    {plan.bullets.slice(0, 3).map((bullet, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${
                          plan.badge === 'best_value'
                            ? 'bg-gradient-to-br from-orange-400 to-amber-500'
                            : 'bg-gradient-to-br from-blue-400 to-indigo-500'
                        }`}>
                          <Check className="h-4 w-4 text-white font-bold" />
                        </div>
                        <span className="text-slate-800 dark:text-slate-200 font-bold">✓ {bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full font-bold py-4 shadow-xl text-lg transition-all duration-300 ${
                      plan.badge === 'best_value'
                        ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white transform hover:scale-105'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                    }`}
                    asChild
                  >
                    <a
                      href={plan.stripeCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.id === 'starter' ? pricing('cta.choose_starter') : pricing('cta.choose_pro')}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary CTAs */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <a href="/pricing">
                  {t('pricing_primary_cta')}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                asChild
              >
                <a href="/pricing">
                  {t('pricing_secondary_cta')}
                </a>
              </Button>
            </div>
            
            {/* Micro-copy */}
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              {t('zaza_pass_microcopy')}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Monthly is available on the Pricing page
            </p>
          </div>

          {/* Trust Row */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{pricing('guarantee')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>{pricing('secure')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>{pricing('trusted')}</span>
              </div>
            </div>
          </div>

          {/* App Store Buttons */}
          <div className="mt-16 text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 border border-orange-200 dark:border-orange-700/50 text-sm font-medium text-orange-700 dark:text-orange-300 mb-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Use Promptly on the go
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Take Zaza with you anywhere</h3>
            <div className="flex items-center gap-3 justify-center">
              <a
                href="https://apps.apple.com/app/promptly-teacher-assistant/id6738104361"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
                className="inline-flex"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.promptly.teacher"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="inline-flex"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}