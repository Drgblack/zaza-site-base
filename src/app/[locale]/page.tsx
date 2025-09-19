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
// Removed ImageCarousel and heroImages imports
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

  const hero = await getTranslations('hero');
  const home = await getTranslations('home');

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

                {/* Enhanced social proof - Above the fold */}
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold border-2 border-white">T</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold border-2 border-white">M</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold border-2 border-white">S</div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center text-white text-sm font-bold border-2 border-white">+</div>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 dark:text-white text-lg">2,800+ teachers</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">save 5+ hours/week</div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-slate-400 text-2xl">•</div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-5 h-5 text-yellow-400 fill-current">★</div>
                        ))}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-slate-900 dark:text-white">4.9/5</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">rating</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Usage stats */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-700/50 text-sm font-medium text-green-700 dark:text-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    47 messages written in the last hour
                  </div>
                </div>

                {/* Anthony Pierri Subheadline */}
                <p className="max-w-[600px] text-slate-600 md:text-xl dark:text-slate-300 mx-auto lg:mx-0 leading-relaxed">
                  {hero('subtitle')}
                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-5 text-xl font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ring-4 ring-purple-600/20 hover:ring-purple-600/40 hover:scale-105"
                  asChild
                >
                  <a href="#snippet-tool">
                    <Zap className="w-6 h-6 mr-3" />
                    {hero('cta_primary')}
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-5 text-xl font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="/pricing">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {hero('cta_secondary')}
                  </a>
                </Button>
              </div>

              {/* Value props under CTAs */}
              <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                <div>✓ No credit card required</div>
                <div>✓ 5 free messages to start</div>
                <div>✓ Setup in under 2 minutes</div>
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

                  {/* Main image container */}
                  <div className="rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                      alt="AI-powered teaching tools for modern educators"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>

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

      {/* 2. Problem Section - Lightened */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white mb-8">
            {home('problem_heading')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {home('problem_body')}
          </p>
        </div>
      </section>

      {/* 3. Solution Section - Updated copy */}
      <section className="py-24 bg-white dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_70%)]" />

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
              {home('solution_heading')}
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">{home('solution_card1_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    {home('solution_card1_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">{home('solution_card2_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    {home('solution_card2_desc')}
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">{home('solution_card3_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300">
                    {home('solution_card3_desc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Outcomes Section - Improved spacing */}
      <section className="py-20 bg-gradient-to-br from-purple-50/60 to-blue-50/60 dark:from-purple-950/10 dark:to-blue-950/10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white mb-12 text-center">
            {home('outcomes_heading')}
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm">
              <div className="text-4xl">⏳</div>
              <p className="text-xl text-slate-700 dark:text-slate-300 font-medium">{home('outcomes_item1')}</p>
            </div>
            <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm">
              <div className="text-4xl">😌</div>
              <p className="text-xl text-slate-700 dark:text-slate-300 font-medium">{home('outcomes_item2')}</p>
            </div>
            <div className="flex items-start gap-6 p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm">
              <div className="text-4xl">💡</div>
              <p className="text-xl text-slate-700 dark:text-slate-300 font-medium">{home('outcomes_item3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Simple How It Works - Condensed */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white mb-12">
            How it works
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Type your message</h3>
              <p className="text-slate-600 dark:text-slate-300">Write naturally or paste your draft</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">AI perfects it</h3>
              <p className="text-slate-600 dark:text-slate-300">Professional, parent-friendly tone</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Send & save time</h3>
              <p className="text-slate-600 dark:text-slate-300">Copy, translate, or email directly</p>
            </div>
          </div>

          {/* Simple time savings */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Teachers save on average:</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-4">
                <div className="text-3xl">⏱️</div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">5+ hours</div>
                  <div className="text-slate-600 dark:text-slate-300">per week</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl">💬</div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">15 minutes</div>
                  <div className="text-slate-600 dark:text-slate-300">per message</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Interactive Demo - Snippet Tool */}
      <section id="snippet-tool">
        <SmartSnippetWriterV3 />
      </section>

      {/* Secondary CTA after demo */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to reclaim your evenings?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Join thousands of teachers who save 5+ hours every week with Promptly.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="/pricing">
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
            </a>
          </Button>
        </div>
      </section>

      {/* 4. Social Proof - Moved up */}
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
                {home('testimonials_heading')}
              </h2>
              <p className="text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto">
                From new teachers to seasoned educators, Promptly helps reclaim hours and reduce stress.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
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
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{home('testimonials_1_name')}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{home('testimonials_1_role')}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;{home('testimonials_1_quote')}&rdquo;
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
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{home('testimonials_2_name')}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{home('testimonials_2_role')}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;{home('testimonials_2_quote')}&rdquo;
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
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{home('testimonials_3_name')}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{home('testimonials_3_role')}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;{home('testimonials_3_quote')}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Perfect every time</div>
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

      {/* 5. Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-6">
              {home('pricing_banner_title')}
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto">
              {home('pricing_banner_copy')}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Starter (Free)</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  5 free replies per month. Great for trying it out.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-purple-500 relative transform scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-xl">Pro</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Unlimited messages + tone + translation tools.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Enterprise (For Schools)</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Bulk licensing, admin dashboards, onboarding.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              asChild
            >
              <a href="/pricing">Compare Plans</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Competitive Section - Promptly vs ChatGPT */}
      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-6">
            {home('compare_heading')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
            {home('compare_subhead')}
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="text-left space-y-4 p-6 rounded-xl bg-slate-50 dark:bg-slate-900">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">ChatGPT</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Generic responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>No education guardrails</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Requires prompt engineering</span>
                </li>
              </ul>
            </div>
            
            <div className="text-left space-y-4 p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-700">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Promptly</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Built for teachers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Education-safe language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Works instantly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Comparison Table */}
      <FAQComparisonTable />

      {/* 6.6. Cross-App CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4">
          <CrossAppCTA from="promptly" variant="banner" />
        </div>
      </section>

      {/* 7. Enhanced Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />

        <div className="container px-4 md:px-6 relative">
          <div className="mx-auto max-w-5xl text-center space-y-12">
            {/* Enhanced heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur text-white/90 font-semibold mb-6">
                <Heart className="w-5 h-5 mr-2" />
                Join 2,800+ teachers who save 5+ hours every week
              </div>
              
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
                {home('closing_heading')}
              </h2>
              <p className="text-xl md:text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
                {home('closing_body')}
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 ring-4 ring-white/30 hover:ring-white/50 hover:scale-105"
                asChild
              >
                <a href="#snippet-tool">
                  <Zap className="w-6 h-6 mr-3" />
                  {home('closing_cta_primary')}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-2 border-white/80 hover:bg-white/20 backdrop-blur px-12 py-6 text-xl font-semibold rounded-2xl hover:border-white transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="/pricing">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {home('closing_cta_secondary')}
                </a>
              </Button>
            </div>

            {/* Trust signals */}
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Setup in 2 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Built by teachers</span>
                </div>
              </div>
              
              <p className="text-lg opacity-75">
                No credit card required • 5 free messages to start
              </p>
            </div>
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
