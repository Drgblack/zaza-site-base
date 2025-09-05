import { setRequestLocale } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Users, Clock, Shield, Zap, Heart, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Start Saving Time with Zaza Promptly',
  description: 'Join 12,000+ teachers using AI-powered tools to write better parent messages in seconds. Free trial, no credit card required.',
  keywords: ['teacher signup', 'AI writing tool', 'free trial', 'parent communication'],
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function SignupPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-pink-900/20">
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 text-sm font-medium text-green-700 dark:text-green-300 mb-6">
              <Users className="w-4 h-4 mr-2" />
              Join 12,000+ Happy Teachers
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white mb-6">
              Start Your Free Trial Today
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              No credit card required. Start writing better parent messages in minutes, 
              not hours. Cancel anytime.
            </p>
            
            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">4.9/5 rating</span>
              </div>
              <div className="hidden sm:block text-gray-400">•</div>
              <div className="font-medium text-gray-700 dark:text-gray-300">
                12,000+ teachers trust us
              </div>
              <div className="hidden sm:block text-gray-400">•</div>
              <div className="font-medium text-gray-700 dark:text-gray-300">
                5+ hours saved weekly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Free Plan */}
            <Card className="border-2 border-green-200 dark:border-green-700/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-green-800 dark:text-green-200 flex items-center gap-2">
                  🌱 Free Forever
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300 font-medium">Perfect for trying it out</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-5xl font-black text-green-600 dark:text-green-400">€0</div>
                <div className="space-y-3">
                  <p className="text-sm text-green-700 dark:text-green-300 font-bold bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-full text-center">
                    5 perfect messages/month
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">✨ AI magic included</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">📧 Email & text ready</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 font-medium">👥 Community support</span>
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 shadow-lg" asChild>
                  <a href="/#snippet-tool">🚀 Start Free Now</a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan - Featured */}
            <Card className="border-3 border-orange-300 dark:border-orange-500/70 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/60 dark:via-amber-950/60 dark:to-yellow-950/60 relative shadow-2xl scale-105 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
              <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white px-6 py-2 text-sm font-black shadow-lg animate-pulse">
                🔥 TEACHER FAVORITE! 
              </Badge>
              <CardHeader className="pb-6 pt-8">
                <CardTitle className="text-2xl text-orange-800 dark:text-orange-200 flex items-center gap-2">
                  💪 Pro Teacher
                </CardTitle>
                <CardDescription className="text-orange-700 dark:text-orange-300 font-medium">For busy educators who want it all</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="text-5xl font-black text-orange-600 dark:text-orange-400">€99<span className="text-2xl font-bold text-orange-700 dark:text-orange-300">/year</span></div>
                  <div className="bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 px-3 py-2 rounded-full">
                    <p className="text-sm font-bold text-orange-800 dark:text-orange-200 text-center">Only €8.25/month! ☕</p>
                  </div>
                </div>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">🚀 UNLIMITED messages</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">🎯 Perfect tone every time</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">🌍 Multi-language support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">🤖 Zara AI Assistant</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 text-white font-bold py-4 shadow-xl text-lg transform hover:scale-105 transition-all duration-300" 
                  asChild
                >
                  <a 
                    href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_MONTHLY}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎯 Start Pro Trial!
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            {/* Elite Plan */}
            <Card className="border-3 border-purple-300 dark:border-purple-500/70 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950/60 dark:via-violet-950/60 dark:to-indigo-950/60 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-purple-800 dark:text-purple-200 flex items-center gap-2">
                  👑 Teacher Elite
                </CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-300 font-medium">For education leaders & master teachers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="text-5xl font-black text-purple-600 dark:text-purple-400">€149<span className="text-2xl font-bold text-purple-700 dark:text-purple-300">/year</span></div>
                  <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 px-3 py-2 rounded-full">
                    <p className="text-sm font-bold text-purple-800 dark:text-purple-200 text-center">Only €12.42/month! 👑</p>
                  </div>
                </div>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">🎯 Everything in Pro Teacher</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">📊 Advanced analytics & insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">⚡ Priority support & training</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white font-bold" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">🏫 School-wide collaboration tools</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-600 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-700 text-white font-bold py-3 shadow-lg">
                  👑 Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Teachers Love Us */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Teachers Choose Zaza Promptly
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built by educators, for educators
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save 5+ Hours Weekly</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Write parent emails in 30 seconds instead of 15 minutes. Get your evenings back.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Built for Education</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Designed specifically for teachers by someone with a PhD in Professional Education.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Perfect Tone Every Time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional, friendly, encouraging, or direct - it always sounds like you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Teaching Life?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of teachers who've already saved hundreds of hours and built stronger parent relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold" asChild>
              <a href="/#snippet-tool">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-4 text-lg font-semibold" asChild>
              <a href="/demo">
                <ArrowRight className="w-5 h-5 mr-2" />
                Watch Demo
              </a>
            </Button>
          </div>
          
          <p className="text-sm opacity-75">
            No credit card required • Cancel anytime • 100% teacher-approved
          </p>
        </div>
      </section>
    </div>
  );
}