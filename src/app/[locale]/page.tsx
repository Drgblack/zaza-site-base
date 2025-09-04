import {setRequestLocale} from 'next-intl/server';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Clock, Shield, GraduationCap, Heart, Zap, Users } from 'lucide-react';
import { EnhancedSnippetToolV2 } from '@/components/site/enhanced-snippet-tool-v2';
import { CrossAppCTA } from '@/components/site/cross-app-cta';
import { StructuredData } from '@/components/seo/structured-data';
import { RotatingHeroImage } from '@/components/site/rotating-hero-image';
import ZaraClient from '@/components/zara/ZaraClient';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

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
                  AI Communication Assistant for Teachers
                </div>
                
                {/* Outcome-focused headline */}
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white leading-tight">
                  Get back{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">5+ hours every week</span>{" "}
                  writing parent messages, report cards, student feedback, and staff notes
                </h1>
                
                {/* Clear outcome promise */}
                <p className="max-w-[600px] text-slate-600 md:text-xl dark:text-slate-300 mx-auto lg:mx-0 leading-relaxed">
                  Write professional parent emails, report cards, student feedback, and staff notes in seconds — not hours.
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
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-purple-600/20 hover:ring-purple-600/40" asChild>
                  <a href="#snippet-tool">
                    <Zap className="w-5 h-5 mr-2" />
                    Try Promptly Free
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold rounded-xl border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
                  asChild
                >
                  <a href="/pricing">
                    See Pricing →
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

      {/* 2. Problem / Pain - Modern design */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-sm font-medium text-red-700 dark:text-red-300">
              <MessageCircle className="w-4 h-4 mr-2" />
              The hidden cost of communication
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
              Teachers spend <span className="text-red-600 dark:text-red-400">8+ hours weekly</span> writing messages
            </h2>
            
            <div className="max-w-lg mx-auto">
              <ul className="text-left text-lg text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Parent emails: 15+ minutes each</li>
                <li>• Report card comments: 10+ minutes per student</li>
                <li>• Student feedback notes: 5+ minutes each</li>
                <li>• Staff updates: 12+ minutes each</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution / How It Works - Vibrant design with Anthony Pierri framework */}
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
              
            </div>
            
            {/* Use cases */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-center text-slate-900 dark:text-white mb-8">Quick cards for every situation:</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/50 text-center">
                  <div className="text-3xl mb-3">📧</div>
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-100">Parent Messages</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mt-2">Behavior updates, progress reports, meeting requests</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-700/50 text-center">
                  <div className="text-3xl mb-3">📝</div>
                  <div className="text-lg font-bold text-emerald-900 dark:text-emerald-100">Report Cards</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300 mt-2">Term comments, progress summaries, achievement notes</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 dark:border-purple-700/50 text-center">
                  <div className="text-3xl mb-3">💬</div>
                  <div className="text-lg font-bold text-purple-900 dark:text-purple-100">Student Feedback</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300 mt-2">Assignment comments, behavior notes, encouragement</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 dark:border-orange-700/50 text-center">
                  <div className="text-3xl mb-3">👥</div>
                  <div className="text-lg font-bold text-orange-900 dark:text-orange-100">Staff Notes</div>
                  <div className="text-sm text-orange-700 dark:text-orange-300 mt-2">Updates to coordinators, IEP notes, meeting summaries</div>
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
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">📝 Just type what happened</h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  "Emma had a great day in reading" or "Jake needs to work on listening" — that's it!
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
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">✨ AI makes it perfect</h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  Professional tone, perfect grammar, respectful language — automatically crafted in seconds
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/40 text-sm font-bold text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-700/50">
                    🤖 Instant magic
                  </div>
                </div>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/50 dark:to-green-950/50 backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-700/50 hover:border-emerald-300 dark:hover:border-emerald-600/70 transition-all duration-500 hover:shadow-xl hover:-translate-y-3 hover:rotate-1">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-200 via-green-200 to-emerald-300 dark:from-emerald-800/70 dark:via-green-800/70 dark:to-emerald-700/70 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-4xl font-black text-emerald-700 dark:text-emerald-200">3</span>
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">🎉 Copy, send, done!</h3>
                <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  Perfect message ready to copy-paste into email, text, or parent app — get your life back!
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-sm font-bold text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700/50">
                    ⏰ Hours saved weekly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Interactive Demo - Snippet Tool */}
      <EnhancedSnippetToolV2 />

      {/* 4. Social Proof - Improved readability */}
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

      {/* 4.5. Founder Story Section - Improved readability */}
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
            <p className="text-slate-700 dark:text-slate-300 font-semibold">
              – Greg Blackburn, PhD
            </p>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 mb-2">From painter to PhD in Professional Education, Greg built Promptly after 20+ years in education.</p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">He's seen how admin work drains teachers' energy from what matters most: teaching and relationships.</p>
          
          <Button variant="outline" className="bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300" asChild>
            <a href="/about/greg">Read Full Story →</a>
          </Button>
        </div>
      </section>

      {/* 5. Pricing CTA - Vibrant design with Anthony Pierri framework */}
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
                Start free, stay affordable
              </h2>
              <p className="text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto font-medium">
                <strong>What:</strong> Teacher-friendly pricing that actually makes sense<br />
                <strong>Who:</strong> Budget-conscious educators (that's everyone!)<br />  
                <strong>Why:</strong> Because teachers shouldn't have to choose between great tools and groceries
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-2 border-green-200 dark:border-green-700/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 hover:rotate-1 transition-all duration-300">
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
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 shadow-lg">🚀 Start Free Now</Button>
                </CardContent>
              </Card>
              
              <Card className="border-3 border-orange-300 dark:border-orange-500/70 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/60 dark:via-amber-950/60 dark:to-yellow-950/60 relative shadow-2xl scale-105 hover:shadow-2xl hover:-translate-y-3 hover:-rotate-1 transition-all duration-500">
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
                      href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_PROMPTLY_MONTHLY}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🎯 Get Pro Power!
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-3 border-purple-300 dark:border-purple-500/70 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950/60 dark:via-violet-950/60 dark:to-indigo-950/60 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-3 hover:-rotate-1 transition-all duration-500">
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
                  <Button className="w-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-600 hover:from-purple-600 hover:via-violet-600 hover:to-indigo-700 text-white font-bold py-3 shadow-lg">👑 Go Elite!</Button>
                </CardContent>
              </Card>
            </div>
            
            {/* App Store Buttons */}
            <div className="mt-16 text-center space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 border border-orange-200 dark:border-orange-700/50 text-sm font-medium text-orange-700 dark:text-orange-300 mb-4">
                <MessageCircle className="w-4 h-4 mr-2" />
                Download the mobile app
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Write messages on the go
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://apps.apple.com/app/promptly-teacher-assistant/id6738104361" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-16 w-48 object-contain hover:scale-105 transition-transform duration-200"
                  />
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.promptly.teacher" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Google Play" 
                    className="h-16 w-48 object-contain hover:scale-105 transition-transform duration-200"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Differentiation - Why Promptly vs alternatives */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-6xl">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 text-sm font-medium text-blue-700 dark:text-blue-300">
                <Zap className="w-4 h-4 mr-2" />
                Why teachers choose Promptly
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
                Promptly vs. Other Solutions
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Unlike generic AI tools, Promptly was built specifically for all types of teacher communication - from parent emails to report cards
              </p>
            </div>
            
            {/* Comparison table */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Solution</div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Generic AI (ChatGPT, etc.)</div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Writing from scratch</div>
                </div>
                <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                  <div className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">Promptly</div>
                </div>
              </div>
              
              {/* Feature rows */}
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="font-medium text-slate-900 dark:text-white">Understands education context</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-red-500">✗</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-orange-500">~</div>
                  </div>
                  <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                    <div className="w-5 h-5 mx-auto text-green-500">✓</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="font-medium text-slate-900 dark:text-white">Time to create message</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-sm text-slate-600 dark:text-slate-400">5-8 minutes</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-sm text-slate-600 dark:text-slate-400">15+ minutes</div>
                  </div>
                  <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                    <div className="text-sm text-green-600 dark:text-green-400 font-semibold">30 seconds</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="font-medium text-slate-900 dark:text-white">Built by educators</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-red-500">✗</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-orange-500">~</div>
                  </div>
                  <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                    <div className="w-5 h-5 mx-auto text-green-500">✓</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="font-medium text-slate-900 dark:text-white">Professional tone guaranteed</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-orange-500">~</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-orange-500">~</div>
                  </div>
                  <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                    <div className="w-5 h-5 mx-auto text-green-500">✓</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="font-medium text-slate-900 dark:text-white">Privacy & security for schools</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-red-500">✗</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-green-500">✓</div>
                  </div>
                  <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                    <div className="w-5 h-5 mx-auto text-green-500">✓</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <div className="font-medium text-slate-900 dark:text-white">Handles all communication types</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-red-500">✗</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="w-5 h-5 mx-auto text-orange-500">~</div>
                  </div>
                  <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                    <div className="text-sm text-green-600 dark:text-green-400 font-semibold">Parent emails, reports, feedback, staff notes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 6.6. Cross-App CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4">
          <CrossAppCTA 
            from="promptly"
            variant="banner"
          />
        </div>
      </section>

      {/* 7. Emotional Closing Section */}
      <section className="py-32 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="container px-4 md:px-6 relative">
          <div className="mx-auto max-w-5xl text-center space-y-12">
            {/* Emotional storytelling headline */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight">
                Imagine Sunday afternoons <span className="italic">free</span>
              </h2>
              <p className="text-xl md:text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
                Because every report, email, and note is done in minutes.
              </p>
            </div>
            
            {/* Supporting imagery suggestion */}
            <div className="py-8">
              <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-white/20 hover:ring-white/40" asChild>
                <a href="#snippet-tool">
                  <Zap className="w-5 h-5 mr-2" />
                  Try Promptly Free
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 backdrop-blur px-8 py-4 text-lg font-semibold rounded-xl hover:border-white/80 transition-all duration-300" asChild>
                <a href="/pricing">
                  See Pricing →
                </a>
              </Button>
            </div>
            
            {/* Social proof tagline */}
            <p className="text-lg opacity-75 italic">
              Join 12,000+ teachers who&apos;ve transformed their communication workflow
            </p>
          </div>
        </div>
      </section>
      
      {/* Structured Data for SEO */}
      <StructuredData type="website" data={{}} />
      <StructuredData type="organization" data={{}} />
      
      {/* Zara Assistant Launcher */}
      <ZaraClient />
    </div>
  );
}