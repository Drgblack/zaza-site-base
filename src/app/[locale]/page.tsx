// src/app/[locale]/page.tsx
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, MessageCircle, Clock, Shield, GraduationCap, Heart, Zap, Calculator } from 'lucide-react';
import SmartSnippetWriterV3 from '@/components/site/snippet/SmartSnippetWriterV3';
import { CrossAppCTA } from '@/components/site/cross-app-cta';
import { RotatingHeroImage } from '@/components/site/rotating-hero-image';
import ZaraClient from '@/components/zara/ZaraClient';
import { ROICalculator } from '@/components/site/roi-calculator';
import { StickyCTA } from '@/components/site/sticky-cta';
import { SecurityBadges } from '@/components/site/security-badges';
import { SocialProofCounter } from '@/components/cro/social-proof-counter';
import { UrgencyBanner } from '@/components/cro/urgency-banner';
import { ExitIntentModal } from '@/components/cro/exit-intent-modal';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema, softwareApplicationSchema, faqSchema } from '@/components/seo/structured-data-schemas';
import { FAQComparisonTable } from '@/components/seo/faq-comparison-table';
import type { Metadata } from 'next';

type Props = {
  params: { locale: 'en' | 'de' | 'fr' | 'es' | 'it' };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  return generatePageMetadata('home', locale, {
    alternates: {
      canonical: `https://zazapromptly.com/${locale === 'en' ? '' : locale}`,
      // If only EN is enabled in your UI right now, keep languages restricted to 'en'
      languages: {
        en: 'https://zazapromptly.com',
        // Re-enable other locales once their message bundles are live:
        // de: 'https://zazapromptly.com/de',
        // fr: 'https://zazapromptly.com/fr',
        // es: 'https://zazapromptly.com/es',
        // it: 'https://zazapromptly.com/it',
      },
    },
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = params;
  setRequestLocale(locale);

  const hero = await getTranslations('hero'); // Force rebuild: Get your Sundays back

  return (
    <div className="flex flex-col">
      {/* 1. Hero / Headline */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/30 relative overflow-hidden">
        {/* Subtle modern gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.06),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                {/* Category Definition - What is this? */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-4">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {hero('tagline')}
                </div>

                {/* Anthony Pierri Framework Headline - Updated copy */}
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white leading-tight">
                  {hero('headline')}{' '}
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {hero('headline_highlight')}
                  </span>
                </h1>

                {/* Social proof - Above the fold */}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-600 dark:text-slate-300 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">T</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">M</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center text-white text-xs font-bold">+</div>
                    </div>
                    <span className="font-medium">Trusted by teachers who save hours every week - and finally reclaim their evenings</span>
                  </div>
                  <div className="hidden sm:block text-slate-400">•</div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                      ))}
                    </div>
                    <span className="font-medium">4.9/5 rating</span>
                  </div>
                </div>

                {/* Anthony Pierri Subheadline */}
                <p className="max-w-[600px] text-slate-600 md:text-xl dark:text-slate-300 mx-auto lg:mx-0 leading-relaxed">
                  {hero('subtitle')}
                </p>

                {/* Specific value proposition */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/30">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm font-semibold">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">Parent emails</div>
                      <div className="text-slate-600 dark:text-slate-400">15 min → 30 sec</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">Report comments</div>
                      <div className="text-slate-600 dark:text-slate-400">10 min → 20 sec</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">Student feedback</div>
                      <div className="text-slate-600 dark:text-slate-400">8 min → 15 sec</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">Staff notes</div>
                      <div className="text-slate-600 dark:text-slate-400">12 min → 25 sec</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-purple-600/20 hover:ring-purple-600/40"
                  asChild
                >
                  <a href="#snippet-tool">
                    <Zap className="w-5 h-5 mr-2" />
                    {hero('cta_primary')}
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold rounded-xl border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
                  asChild
                >
                  <a href="#snippet-tool">
                    {hero('cta_secondary')}
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Setup in 2 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>Built by teachers</span>
                </div>
              </div>
            </div>

            {/* Right side - Hero image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-20" />

                  {/* Main image container with rotating images */}
                  <RotatingHeroImage />

                  {/* Floating stats cards */}
                  <div className="absolute -top-4 -left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">2,847</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Messages saved</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">892h</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Time saved</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAQ Section - Q&A Structure as per Master Prompt */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_70%)]" />

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-sm font-medium text-purple-700 dark:text-purple-300">
              <MessageCircle className="w-4 h-4 mr-2" />
              Common Teacher Questions
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
              How can Promptly actually help?
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Save hours every week</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Stop spending evenings and weekends drafting parent emails and reports. Get clear, professional drafts in minutes.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Stress less about tone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Promptly suggests warm, professional wording that builds trust with parents - no more overthinking.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Support for every teacher</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    Instant translations, rewrites, and closing lines make communication easier no matter the context.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution / How It Works */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.12),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-green-300/30 to-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 border-2 border-emerald-200 dark:border-emerald-700/50 text-sm font-bold text-emerald-800 dark:text-emerald-200 shadow-lg">
                <Zap className="w-5 h-5 mr-2" />
                ✨ The teacher's time-saving secret
              </div>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
                Turn every message into <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">minutes saved</span>
              </h2>

              <p className="text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto font-medium">
                Every message you write with Promptly means more time back for you. Teachers save up to 5 hours per week.
              </p>
            </div>

            {/* Time savings examples */}
            <div className="mb-16">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50 text-center">
                  <div className="text-3xl mb-3">📧</div>
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-100">Parent update email</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mt-2">12 minutes saved</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 text-center">
                  <div className="text-3xl mb-3">📝</div>
                  <div className="text-lg font-bold text-emerald-900 dark:text-emerald-100">Weekly report comment</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300 mt-2">18 minutes saved</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 dark:border-purple-700/50 text-center">
                  <div className="text-3xl mb-3">💬</div>
                  <div className="text-lg font-bold text-purple-900 dark:text-purple-100">Sensitive parent message</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300 mt-2">15 minutes saved</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 dark:border-orange-700/50 text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <div className="text-lg font-bold text-orange-900 dark:text-orange-100">End-of-term reports</div>
                  <div className="text-sm text-orange-700 dark:text-orange-300 mt-2">2+ hours saved</div>
                </div>
              </div>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-950/50 dark:to-rose-950/50 backdrop-blur-sm border-2 border-pink-200 dark:border-pink-700/50 hover:border-pink-300 dark:hover:border-pink-600/70 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 hover:rotate-1">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 dark:from-pink-800/70 dark:via-rose-800/70 dark:to-pink-700/70 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl font-black text-pink-700 dark:text-pink-200">1</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Your Smart Message Writer</h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  Built for teachers, not generic AI. Promptly makes writing faster, easier, and safer.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 text-sm font-bold text-pink-800 dark:text-pink-200 border border-pink-200 dark:border-pink-700/50">
                    ⚡ 10 seconds max
                  </div>
                </div>
              </div>

              <div className="group text-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-950/50 dark:to-blue-950/50 backdrop-blur-sm border-2 border-sky-200 dark:border-sky-700/50 hover:border-sky-300 dark:hover:border-sky-600/70 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 hover:-rotate-1">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-sky-200 via-blue-200 to-sky-300 dark:from-sky-800/70 dark:via-blue-800/70 dark:to-sky-700/70 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl font-black text-sky-700 dark:text-sky-200">2</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rewrite with the right tone</h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  Make your messages sound warm, professional, and parent-friendly.
                </p>
                <div className="pt-4 space-y-2">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 text-sm font-bold text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-700/50">
                    🎯 Perfect tone every time
                  </div>
                </div>
              </div>

              <div className="group text-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-950/50 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700/50 hover:border-emerald-300 dark:hover:border-emerald-600/70 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 hover:rotate-1">
                <div className="relative">
                  <div className="W-24 h-24 bg-gradient-to-br from-emerald-200 via-green-200 to-emerald-300 dark:from-emerald-800/70 dark:via-green-800/70 dark:to-emerald-700/70 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl font-black text-emerald-700 dark:text-emerald-200">3</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Translate instantly</h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  Communicate clearly in over 20 languages, without mistakes. Finish with polished closings that save time and build rapport.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-sm font-bold text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700/50">
                    ⏰ Hours saved weekly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Interactive Demo - Snippet Tool */}
      <SmartSnippetWriterV3 />

      {/* 3.6. ROI Calculator */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200 dark:border-green-700/50 text-sm font-medium text-green-700 dark:text-green-300 mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Your Savings
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-6">
              See your exact time & money savings
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              Every minute matters. Here's how much you save using Promptly instead of writing from scratch.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* 4. Social Proof */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.04),transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 text-sm font-medium text-green-700 dark:text-green-300">
                <Heart className="w-4 h-4 mr-2" />
                Teacher testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
                Trusted by teachers who value their time
              </h2>
              <p className="text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto">
                From new teachers to seasoned educators, Promptly helps reclaim hours and reduce stress.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face"
                      alt="Sarah M."
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-800"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Sarah M.</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Year 6 Teacher, UK</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;Promptly handles all my communication - parent emails, report cards, student feedback. Cut my Sunday admin from 4 hours to 1!&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-green-600 dark:text-green-400 font-semibold">All communication types</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                      alt="Marcus"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-800"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Marcus J.</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">High School Math, CA</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;From report card comments to staff updates - Promptly gets the tone right every time. No more staring at blank screens.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Uses for everything</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face"
                      alt="Jennifer"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-800"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Jennifer K.</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Elementary, TX</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;Whether it's parent messages, student feedback, or staff notes - the responses are always professional and caring.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Perfect every time</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                      alt="David"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-800"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">David R.</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Middle School, NY</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;From term reports to quick behavior notes - it understands every type of teacher communication. Saves me hours weekly.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold">5+ hours saved weekly</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Founder Story Section */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.04),transparent_60%)]" />

        <div className="max-w-4xl mx-auto px-4 relative text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 mb-8">
            <GraduationCap className="w-4 h-4 mr-2" />
            Built by a Teacher for Teachers
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800/30 mb-6">
            <p className="text-xl text-slate-800 dark:text-slate-200 font-medium italic mb-4">
              "This isn't about AI replacing teachers. It's about helping teachers thrive."
            </p>
            <p className="text-slate-700 dark:text-slate-300 font-semibold">– Dr. Greg Blackburn</p>
          </div>

          <p className="text-slate-600 dark:text-slate-300 mb-2">
            From painter to PhD in Professional Education, Dr. Greg Blackburn built Promptly after 20+ years in education.
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            He's seen how admin work drains teachers' energy from what matters most: teaching and relationships.
          </p>

          <Button
            variant="outline"
            className="bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300"
            asChild
          >
            <a href="/about/greg">Read Full Story →</a>
          </Button>
        </div>
      </section>

      {/* 5. Pricing CTA - Now showing annual plans */}

      {/* 6. FAQ Comparison Table */}
      <FAQComparisonTable />

      {/* 6.6. Cross-App CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4">
          <CrossAppCTA from="promptly" variant="banner" />
        </div>
      </section>

      {/* 7. Emotional Closing Section */}
      <section className="py-32 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />

        <div className="container px-4 md:px-6 relative">
          <div className="mx-auto max-w-5xl text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
                Imagine Sunday afternoons <span className="italic">free</span>
              </h2>
              <p className="text-xl md:text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
                Release every hour, email, and parent update back to yourself. Promptly makes it possible.
              </p>
            </div>

            <div className="py-8">
              <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-white/20 hover:ring-white/40"
                asChild
              >
                <a href="#snippet-tool">
                  <Zap className="w-5 h-5 mr-2" />
                  Try Promptly Free
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 backdrop-blur px-8 py-4 text-lg font-semibold rounded-xl hover:border-white/80 transition-all duration-300"
                asChild
              >
                <a href="/pricing">See Pricing →</a>
              </Button>
            </div>

            <p className="text-lg opacity-75 italic">
              Trusted by teachers who save hours every week - and finally reclaim their evenings.
            </p>
          </div>
        </div>
      </section>

      {/* Security Badges */}
      <SecurityBadges />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Sticky CTA */}
      <StickyCTA />

      {/* Zara Assistant Launcher */}
      <ZaraClient />

      {/* CRO Elements */}
      <SocialProofCounter />
      <UrgencyBanner />
      <ExitIntentModal />
    </div>
  );
}
