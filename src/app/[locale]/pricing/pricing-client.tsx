'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Download
} from 'lucide-react';
import { TrustBadges } from '@/components/site/trust-badges';
import { AnnualToggle } from '@/components/ui/annual-toggle';
import { ZazaTierCard } from '@/components/pricing/zaza-tier-card';
import { PricingFAQ } from '@/components/pricing/pricing-faq';
import { pricingConfig, closeSuiteUrl, PricingTier } from '@/lib/pricingConfig';

export function PricingPageClient() {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleTierSelect = (tier: PricingTier) => {
    // Handle tier selection - integrate with Stripe checkout
    console.log('Selected tier:', tier, 'Annual:', isAnnual);
  };

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
              Choose the plan that saves you{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">time every week</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Annual plans give teachers the best value. Monthly is available if you prefer.
            </p>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-200 font-medium">
              Save hours every week on parent comments and reports
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-green-500" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span>Secure payments by Stripe</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 text-purple-500" />
                <span>Trusted by 10,000+ teachers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {pricingConfig.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group space-y-4 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 bg-white dark:bg-gray-800"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors duration-300">
                    {index === 0 && <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />}
                    {index === 1 && <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />}
                    {index === 2 && <Database className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {benefit}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zaza Pass Pricing */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Zaza Pass</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              Annual is the best value for teachers
            </p>
            
            {/* Annual Toggle */}
            <AnnualToggle 
              isAnnual={isAnnual} 
              onToggle={setIsAnnual}
              className="mb-8"
            />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingConfig.tiers.map((tier, index) => (
              <ZazaTierCard
                key={index}
                tier={tier}
                isAnnual={isAnnual}
                onSelect={handleTierSelect}
              />
            ))}
          </div>
          
          {/* Footnotes */}
          <div className="text-center mt-8 space-y-1">
            {pricingConfig.footnotes.map((footnote, index) => (
              <p key={index} className="text-sm text-gray-500 dark:text-gray-400">
                {footnote}
              </p>
            ))}
          </div>
          
          {/* Close Suite Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Teams in real estate or legal{' '}
              <a 
                href={closeSuiteUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 underline"
              >
                See Close Suite
              </a>
            </p>
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
          <PricingFAQ faqItems={pricingConfig.faq} />
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
              Start Free Trial
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
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
