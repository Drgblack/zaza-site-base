import {setRequestLocale} from 'next-intl/server';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Clock, Shield, GraduationCap, Heart, Zap } from 'lucide-react';
import { SnippetTool } from '@/components/site/snippet-tool';
import { ZaraAssistant } from '@/components/site/zara-assistant';
import { CrossAppCTA } from '@/components/site/cross-app-cta';
import { StructuredData } from '@/components/seo/structured-data';

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
                  writing parent messages and reports
                </h1>
                
                {/* Clear outcome promise */}
                <p className="max-w-[600px] text-slate-600 md:text-xl dark:text-slate-300 mx-auto lg:mx-0 leading-relaxed">
                  Promptly writes professional parent messages in seconds, not hours. Created by a PhD educator who understands what teachers actually need.
                </p>
                
                {/* Specific value proposition */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/30">
                  <div className="flex items-center justify-center lg:justify-start gap-8 text-sm font-semibold">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">15 min</div>
                      <div className="text-slate-600 dark:text-slate-400">to 30 seconds</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5+ hrs</div>
                      <div className="text-slate-600 dark:text-slate-400">saved weekly</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2,000+</div>
                      <div className="text-slate-600 dark:text-slate-400">teachers</div>
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
                  
                  {/* Main image container */}
                  <div className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&crop=faces"
                      alt="Smiling teacher in classroom with happy students and blackboard visible"
                      width={600}
                      height={600}
                      priority
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
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

      {/* 2. Problem / Pain - Modern design */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-4xl text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-sm font-medium text-red-700 dark:text-red-300">
                <MessageCircle className="w-4 h-4 mr-2" />
                The hidden cost of communication
              </div>
              
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
                Writing one parent email takes{" "}
                <span className="text-red-600 dark:text-red-400">15+ minutes.</span>{" "}
                You send 20+ per week.
              </h2>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                That's 5+ hours weekly on messages alone - time stolen from lesson planning, grading, and your personal life.
              </p>
              
              {/* Specific problem metrics */}
              <div className="bg-red-50/50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-200/30 dark:border-red-800/30 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">5.3 hrs</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Average weekly time on parent communication</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">73%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Of teachers work evenings/weekends on admin</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">#1</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Cause of teacher burnout: administrative tasks</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 mt-16">
              <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800/50 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Drafting the right words takes too long.</h3>
                <p className="text-slate-600 dark:text-slate-300">Every word matters when communicating with parents about their child's progress.</p>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-orange-100 dark:border-orange-900/30 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">The tone has to be professional and caring.</h3>
                <p className="text-slate-600 dark:text-slate-300">Balancing warmth with professionalism while maintaining clear communication.</p>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-amber-100 dark:border-amber-900/30 hover:border-amber-200 dark:hover:border-amber-800/50 transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Mistakes cause stress and misunderstandings.</h3>
                <p className="text-slate-600 dark:text-slate-300">One poorly worded message can create weeks of confusion and tension.</p>
              </div>
            </div>
            
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-800/30">
              <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                The result? <span className="text-red-600 dark:text-red-400">Burnout, late nights,</span> and less energy for actual teaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution / How It Works - Modern design */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50/50 to-slate-50 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.06),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 text-sm font-medium text-green-700 dark:text-green-300">
                <Zap className="w-4 h-4 mr-2" />
                Simple solution, powerful results
              </div>
              
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
                From 15 minutes to 30 seconds:<br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">How Promptly works</span>
              </h2>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Perfect for behavior updates, progress reports, assignment concerns, celebration messages, and parent conferences
              </p>
            </div>
            
            {/* Use cases before steps */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-center text-slate-900 dark:text-white mb-8">Works for every situation teachers face:</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">📚 Academic Progress</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">"Sarah showed great improvement in math this week..."</div>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">⚠️ Behavior Concerns</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">"I wanted to discuss Jake's classroom participation..."</div>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">🎉 Celebrations</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">"I'm excited to share Emma's leadership in group work..."</div>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">📝 Assignment Issues</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">"I noticed the homework wasn't submitted..."</div>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">👥 Parent Conferences</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">"I'd love to schedule a meeting to discuss..."</div>
                </div>
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">🔄 Follow-ups</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">"Following up on our previous conversation about..."</div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-12 md:grid-cols-3">
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">1</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Type the basics</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Add a quick note or bullet points about what you want to communicate.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-sm text-purple-700 dark:text-purple-300">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Quick input
                  </div>
                </div>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-blue-100 dark:border-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">AI crafts your message</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Professional messages generated instantly, with the perfect tone and structure.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-sm text-blue-700 dark:text-blue-300">
                    <Clock className="w-4 h-4 mr-1" />
                    Instant results
                  </div>
                </div>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-green-100 dark:border-green-900/30 hover:border-green-200 dark:hover:border-green-800/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">You save precious hours</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Copy, customize, and send. Your Sunday evenings are finally free.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-sm text-green-700 dark:text-green-300">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Time freedom
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Interactive Demo - Snippet Tool */}
      <SnippetTool />

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
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=48&h=48&fit=crop&crop=face"
                      alt="Sarah"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-800"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">Sarah M.</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Year 6 Teacher, UK</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                    &ldquo;Promptly cut my Sunday admin from 4 hours to 2. I actually have weekends with my family again!&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-green-600 dark:text-green-400 font-semibold">Saves 6 hrs/week</div>
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
                    &ldquo;No more writer's block with difficult parent conversations. Perfect tone every time.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">120+ messages sent</div>
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
                    &ldquo;Parents love the clear, caring messages. I feel confident hitting 'send' every time.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Zero complaints</div>
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
                    &ldquo;Finally - an AI that understands education. It knows exactly what teachers need to say.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-orange-600 dark:text-orange-400 font-semibold">Daily user since launch</div>
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
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Photo and credentials */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-full max-w-sm mx-auto">
                  <Image
                    src="/images/greg-founder-photo-v2.png"
                    alt="Greg Blackburn, PhD - Founder of Zaza Promptly"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 left-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Active in education for 20+ years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-300">
                <GraduationCap className="w-4 h-4 mr-2" />
                Built by a Teacher for Teachers
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
                From Paint Brushes to PhD: <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">A Teacher's Journey</span>
              </h2>
              
              <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  I didn't start in tech. My first job was as a painter and decorator in Tasmania, working in a paint factory and on building sites. But I always believed education could open doors, so I took a leap — traveling, studying languages, and eventually earning my PhD in Professional Education.
                </p>
                <p>
                  Over the past 20 years, I've worked with teachers, schools, and learning organizations around the world. I've seen first-hand how much time and energy teachers lose to admin — and how it takes away from what really matters: teaching, relationships, and joy.
                </p>
                <p>
                  That's why I built Zaza Promptly. Not as a tech project, but as a teacher-first mission: to give educators back their time. Every hour saved on report cards or parent messages is an hour you can spend with students, colleagues, or family.
                </p>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800/30">
                  <p className="text-slate-800 dark:text-slate-200 font-medium italic">
                    "This isn't about AI replacing teachers. It's about helping teachers thrive."
                  </p>
                  <p className="mt-2 text-slate-700 dark:text-slate-300 font-semibold">
                    – Greg Blackburn, PhD
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Button size="lg" variant="outline" className="bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 transition-all duration-300" asChild>
                  <a href="/about/greg">Read My Story →</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing CTA - Enhanced design */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50/50 to-slate-50 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.06),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-5xl">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-sm font-medium text-purple-700 dark:text-purple-300">
                <Heart className="w-4 h-4 mr-2" />
                Affordable for every teacher
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900 dark:text-white">
                Simple pricing for every teacher
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Start free, upgrade when you're ready. No hidden costs, no surprises.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-6">
                  <CardTitle className="text-slate-900 dark:text-white">Free Plan</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Perfect to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-4xl font-bold text-slate-900 dark:text-white">Free</div>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      5 messages per month
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-slate-700 dark:text-slate-300">Basic tone options</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-slate-700 dark:text-slate-300">Email & text format</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-slate-700 dark:text-slate-300">Community support</span>
                      </li>
                    </ul>
                  </div>
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">Start Free</Button>
                </CardContent>
              </Card>
              
              <Card className="border-purple-300 dark:border-purple-600 bg-white dark:bg-slate-800 relative shadow-lg scale-105 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1.5 text-sm font-semibold">
                  Most Popular
                </Badge>
                <CardHeader className="pb-6 pt-8">
                  <CardTitle className="text-slate-900 dark:text-white">Starter</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">For active teachers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white">€99<span className="text-lg font-normal text-slate-600 dark:text-slate-400">/year</span></div>
                    <p className="text-sm text-slate-500 dark:text-slate-500">Only €8.25/month</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Unlimited messages</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Advanced tone tutor</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Multi-language support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Zara Assistant access</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg" 
                    asChild
                  >
                    <a 
                      href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_PROMPTLY_MONTHLY}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Choose Starter
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-6">
                  <CardTitle className="text-slate-900 dark:text-white">Pro</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">Complete teaching solution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white">€149<span className="text-lg font-normal text-slate-600 dark:text-slate-400">/year</span></div>
                    <p className="text-sm text-slate-500 dark:text-slate-500">Only €12.42/month</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Everything in Starter</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Advanced AI features</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Priority support</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium">Analytics & insights</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Choose Pro</Button>
                </CardContent>
              </Card>
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
                Unlike generic AI tools, Promptly was built specifically for educational communication
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. Zara Assistant Preview */}
      <ZaraAssistant />

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
                Imagine Sunday afternoons <span className="italic">free.</span>
              </h2>
              <p className="text-xl md:text-2xl opacity-95 leading-relaxed max-w-4xl mx-auto">
                Evenings with family, not admin. More energy for your students, and more joy in your teaching. 
                <br className="hidden md:block" />
                That&apos;s what Promptly gives back.
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
              Join thousands of teachers who&apos;ve reclaimed their evenings
            </p>
          </div>
        </div>
      </section>
      
      {/* Structured Data for SEO */}
      <StructuredData type="website" data={{}} />
      <StructuredData type="organization" data={{}} />
    </div>
  );
}