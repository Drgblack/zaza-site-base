'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CreditCard, 
  Users, 
  Star,
  Zap,
  Heart,
  Database,
  Clock,
  FileText,
  Download,
  Check,
  MessageCircle
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TrustBadges } from '@/components/site/trust-badges';
import { PRICING, getAllPlans, formatPrice, type Cadence } from '@/lib/pricing';

export function PricingPageClient() {
  const [cadence, setCadence] = useState<Cadence>('annual');
  const t = useTranslations('pricing');
  const home = useTranslations('home');
  
  const plans = getAllPlans(cadence);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
              {t('headline')}
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('subhead')}
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-green-500" />
                <span>{t('badges.money_back')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span>{t('badges.stripe')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 text-purple-500" />
                <span>{t('badges.trusted')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zaza Pass Explainer */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/40 dark:via-amber-950/30 dark:to-yellow-950/40">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 border-2 border-orange-200 dark:border-orange-700/50 text-sm font-bold text-orange-800 dark:text-orange-200 shadow-lg mb-6">
            <Heart className="w-5 h-5 mr-2" />
            {t('zaza_pass.badge_annual_best_value')}
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('zaza_pass.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{t('zaza_pass.subtitle')}</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-orange-200 dark:border-orange-700">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div className="text-center">
                <div className="text-gray-800 dark:text-gray-200 font-medium">{t('zaza_pass.tiles.minutes_to_quality')}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('zaza_pass.tiles.minutes_to_quality_desc')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-orange-200 dark:border-orange-700">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div className="text-center">
                <div className="text-gray-800 dark:text-gray-200 font-medium">{t('zaza_pass.tiles.plans_ready')}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('zaza_pass.tiles.plans_ready_desc')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-orange-200 dark:border-orange-700">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div className="text-center">
                <div className="text-gray-800 dark:text-gray-200 font-medium">{t('zaza_pass.tiles.remembers_classes')}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('zaza_pass.tiles.remembers_classes_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            {/* Annual/Monthly Toggle */}
            <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-8">
              <button
                onClick={() => setCadence('annual')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  cadence === 'annual'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('annual_toggle')}
              </button>
              <button
                onClick={() => setCadence('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  cadence === 'monthly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {t('monthly_toggle')}
              </button>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
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
                    {t('plans.pro.best_value')}
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
                  <div className={`text-5xl font-black ${
                    plan.badge === 'best_value' 
                      ? 'text-orange-600 dark:text-orange-400' 
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    €{plan.price}<span className={`text-2xl font-bold ${
                      plan.badge === 'best_value' 
                        ? 'text-orange-700 dark:text-orange-300' 
                        : 'text-blue-700 dark:text-blue-300'
                    }`}>{plan.priceSuffix}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-4 text-sm">
                    {plan.bullets.map((bullet, i) => (
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
                      {plan.id === 'starter' ? t('cta.choose_starter') : t('cta.choose_pro')}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* App Store Buttons */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 border border-orange-200 dark:border-orange-700/50 text-sm font-medium text-orange-700 dark:text-orange-300 mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Use Promptly on the go
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Take Zaza with you anywhere
            </h3>
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
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Proof and Trust Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">See the Difference</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Before and after examples of parent communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-200">Before</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "Sarah has been working hard in math class. She shows good effort and participates well. 
                  She could improve her homework completion. Overall, she is a good student."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-200">After</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "Sarah demonstrates strong mathematical thinking and actively engages in problem-solving discussions. 
                  Her recent work on fractions shows significant improvement, particularly in her ability to explain her reasoning. 
                  I've noticed she's been more consistent with homework completion this month. 
                  Sarah's collaborative skills shine during group activities, where she helps peers understand challenging concepts. 
                  I'm excited to see her continued growth in our upcoming algebra unit."
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-xl max-w-md mx-auto border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">Teachers saved 2,847 minutes this week</h3>
              <p className="text-gray-600 dark:text-gray-300">
                That's over 47 hours of time back in teachers' hands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Can I pay monthly?</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes. Monthly is available. Annual is the best value for teachers.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Invoices and reimbursement</h3>
              <p className="text-gray-600 dark:text-gray-300">Yes. Download invoices. PD budgets supported.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">What happens if I cancel?</h3>
              <p className="text-gray-600 dark:text-gray-300">You keep access until the end of your period. Drafts remain in your account.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy and Export */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-green-600" />
            <Download className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Your data stays yours. One-click export to DOC and PDF.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Join Thousands of Happy Teachers</h2>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ active teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>98% satisfaction rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of educators who are saving hours every week with AI-powered parent communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              {t('cta_try_free')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
            >
              Choose Zaza Pass →
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            No credit card required • Cancel anytime • {t('badges.money_back')}
          </p>
        </div>
      </section>
    </div>
  );
}
