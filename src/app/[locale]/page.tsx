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
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/50 dark:from-purple-950/50 dark:via-pink-950/30 dark:to-blue-950/30 overflow-hidden">
        {/* Modern animated background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.15),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.1),transparent_50%)] animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)] animate-pulse" style={{animationDelay: '4s'}} />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200/30 rounded-full blur-xl animate-bounce-gentle" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200/30 rounded-full blur-xl animate-bounce-gentle" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200/30 rounded-full blur-xl animate-bounce-gentle" style={{animationDelay: '2s'}} />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Trusted by 2,000+ teachers worldwide
                </div>
                
                <h1 className="text-5xl font-display font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
                  Save hours every week on{" "}
                  <span className="gradient-text">parent messages,</span>{" "}
                  report cards, and classroom communication.
                </h1>
                
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl mx-auto lg:mx-0 leading-relaxed">
                  Your personal teaching assistant that gives you back precious time, reduces stress, and lets you focus on what you love most - your students.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl teacher-shadow hover:teacher-shadow-lg transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Try Free - 5 Messages / Month
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-accent/50 transition-all duration-300"
                  asChild
                >
                  <a 
                    href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_PROMPTLY_MONTHLY}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Upgrade to Unlimited →
                  </a>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8 text-sm text-muted-foreground">
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
            
            {/* Right side - Hero image with modern styling */}
            <div className="flex justify-center lg:justify-end animate-slide-in">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl blur-2xl opacity-20 animate-glow" />
                  
                  {/* Main image container */}
                  <div className="relative aspect-square rounded-3xl teacher-shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
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
                  <div className="absolute -top-4 -left-4 glass-card rounded-2xl p-4 teacher-shadow animate-bounce-gentle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">2,847</div>
                        <div className="text-xs text-muted-foreground">Messages saved</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl p-4 teacher-shadow animate-bounce-gentle" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">892h</div>
                        <div className="text-xs text-muted-foreground">Time saved</div>
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
      <section className="py-24 bg-muted/30 dark:bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.05),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-4xl text-center space-y-12">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-sm font-medium text-red-700 dark:text-red-300">
                <MessageCircle className="w-4 h-4 mr-2" />
                The teacher's daily struggle
              </div>
              
              <h2 className="text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl">
                Why writing parent messages feels{" "}
                <span className="text-red-600 dark:text-red-400">overwhelming</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Teachers already spend evenings lesson planning and grading - and then there&apos;s the endless stream of parent messages.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3 mt-16">
              <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800/50 transition-all duration-300 hover:teacher-shadow">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Drafting the right words takes too long.</h3>
                <p className="text-muted-foreground">Every word matters when communicating with parents about their child's progress.</p>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-orange-100 dark:border-orange-900/30 hover:border-orange-200 dark:hover:border-orange-800/50 transition-all duration-300 hover:teacher-shadow">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">The tone has to be professional and caring.</h3>
                <p className="text-muted-foreground">Balancing warmth with professionalism while maintaining clear communication.</p>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-amber-100 dark:border-amber-900/30 hover:border-amber-200 dark:hover:border-amber-800/50 transition-all duration-300 hover:teacher-shadow">
                <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Mistakes cause stress and misunderstandings.</h3>
                <p className="text-muted-foreground">One poorly worded message can create weeks of confusion and tension.</p>
              </div>
            </div>
            
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-800/30">
              <p className="text-2xl font-semibold text-foreground">
                The result? <span className="text-red-600 dark:text-red-400">Burnout, late nights,</span> and less energy for actual teaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solution / How It Works - Modern design */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/50 to-blue-50/50 dark:from-purple-950/30 dark:via-pink-950/20 dark:to-blue-950/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.08),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-6 mb-20 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 text-sm font-medium text-green-700 dark:text-green-300">
                <Sparkles className="w-4 h-4 mr-2" />
                Simple solution, powerful results
              </div>
              
              <h2 className="text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl">
                How <span className="gradient-text">Promptly</span> works for you
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to transform your communication workflow
              </p>
            </div>
            
            <div className="grid gap-12 md:grid-cols-3">
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-purple-100 dark:border-purple-900/30 hover:border-purple-200 dark:hover:border-purple-800/50 transition-all duration-500 hover:teacher-shadow-lg hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">1</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Type the basics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Add a quick note or bullet points about what you want to communicate.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-sm text-purple-700 dark:text-purple-300">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Quick input
                  </div>
                </div>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-pink-100 dark:border-pink-900/30 hover:border-pink-200 dark:hover:border-pink-800/50 transition-all duration-500 hover:teacher-shadow-lg hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/50 dark:to-pink-800/50 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-pink-600 dark:text-pink-400">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">You save precious Sunday hours</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Professional messages generated instantly, leaving you time for what matters.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-sm text-pink-700 dark:text-pink-300">
                    <Clock className="w-4 h-4 mr-1" />
                    Instant results
                  </div>
                </div>
              </div>
              
              <div className="group text-center space-y-6 p-8 rounded-3xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-blue-100 dark:border-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-500 hover:teacher-shadow-lg hover:-translate-y-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Your personal assistant, always ready</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Translate, adjust tone, or rewrite - Zara is there whenever you need her.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-sm text-blue-700 dark:text-blue-300">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    Always available
                  </div>
                </div>
              </div>
            </div>
            
            {/* Connection lines for visual flow */}
            <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 dark:from-purple-800 dark:via-pink-800 dark:to-blue-800 opacity-50" />
          </div>
        </div>
      </section>

      {/* 3.5. Interactive Demo - Snippet Tool */}
      <SnippetTool />

      {/* 4. Social Proof - Modern design */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.03),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-6 mb-20 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 text-sm font-medium text-blue-700 dark:text-blue-300">
                <Heart className="w-4 h-4 mr-2" />
                Real teachers, real results
              </div>
              
              <h2 className="text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl">
                Trusted by teachers who{" "}
                <span className="gradient-text">value their time</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of educators who've transformed their communication workflow
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-purple-100 dark:border-purple-900/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=48&h=48&fit=crop&crop=face"
                        alt="Sarah"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200 dark:ring-purple-800"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Sarah M.</p>
                      <p className="text-sm text-muted-foreground">Year 6 Teacher</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;Promptly cut my Sunday admin in half. I actually have weekends again!&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-pink-100 dark:border-pink-900/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                        alt="Marcus"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-pink-200 dark:ring-pink-800"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Marcus J.</p>
                      <p className="text-sm text-muted-foreground">High School Math</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;No more staring at blank screens. Parent messages flow naturally now.&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-blue-100 dark:border-blue-900/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face"
                        alt="Jennifer"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200 dark:ring-blue-800"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Jennifer K.</p>
                      <p className="text-sm text-muted-foreground">Elementary</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;I sleep better knowing my parent emails are professional and caring.&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-green-100 dark:border-green-900/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                        alt="David"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-green-200 dark:ring-green-800"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">David R.</p>
                      <p className="text-sm text-muted-foreground">Middle School</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;Finally - an AI that speaks teacher. It gets our world completely.&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Heart key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-muted/50 backdrop-blur-sm border border-border">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">2,000+ Active Teachers</span>
                </div>
                <div className="w-px h-6 bg-border"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-muted-foreground">50,000+ Messages Generated</span>
                </div>
                <div className="w-px h-6 bg-border"></div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium text-muted-foreground">4.9/5 Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Founder Story Section - Updated with new copy and Greg's photo */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
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
                  <div className="absolute -bottom-6 left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Active in education for 20+ years</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300 mb-4">
                Built by a Teacher for Teachers
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-gray-100">
                From Paint Brushes to PhD: <br />
                <span className="text-purple-600">A Teacher's Journey</span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I didn't start in tech. My first job was as a painter and decorator in Tasmania, working in a paint factory and on building sites. But I always believed education could open doors, so I took a leap — traveling, studying languages, and eventually earning my PhD in Professional Education.
                </p>
                <p>
                  Over the past 20 years, I've worked with teachers, schools, and learning organizations around the world. I've seen first-hand how much time and energy teachers lose to admin — and how it takes away from what really matters: teaching, relationships, and joy.
                </p>
                <p>
                  That's why I built Zaza Promptly. Not as a tech project, but as a teacher-first mission: to give educators back their time. Every hour saved on report cards or parent messages is an hour you can spend with students, colleagues, or family.
                </p>
                <p>
                  <em>"This isn't about AI replacing teachers. It's about helping teachers thrive."</em>
                  <br />
                  <strong className="text-gray-900 dark:text-gray-100">– Greg Blackburn, PhD</strong>
                </p>
              </div>

              <div className="pt-4">
                <Button size="lg" variant="outline" className="bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300" asChild>
                  <a href="/about/greg">Read My Story →</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple pricing for every teacher
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Free Plan</CardTitle>
                  <CardDescription>Perfect to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">Free</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    5 messages per month
                  </p>
                  <Button className="w-full">Start Free</Button>
                </CardContent>
              </Card>
              
              <Card className="border-purple-200 relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>For active teachers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">€99<span className="text-sm font-normal">/year</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Unlimited messages
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Tone tutor
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Translation
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Zara Assistant
                    </li>
                  </ul>
                  <Button 
                    className="w-full" 
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
              
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>Complete teaching solution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">€149<span className="text-sm font-normal">/year</span></div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Everything in Starter
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Advanced AI features
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Analytics & insights
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">Choose Pro</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Secondary Benefits - Improved readability */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
                Why Promptly is different
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm">
                <GraduationCap className="h-12 w-12 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Built by educators</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Designed by a PhD in Professional Education.
                </p>
              </div>
              <div className="text-center space-y-4 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm">
                <Shield className="h-12 w-12 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Safe & secure</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your messages never get shared or sold.
                </p>
              </div>
              <div className="text-center space-y-4 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm">
                <Heart className="h-12 w-12 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Time back for teaching</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Less admin, more energy for your students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.3. Teacher Community Showcase */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-800 dark:to-pink-800 dark:text-purple-300 mb-4">
                <Users className="h-4 w-4 mr-2" />
                Built by educators, for educators — and shared by the community
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100">
                Growing stronger together
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Every teacher who shares makes Promptly better for everyone. Real messages, proven strategies, collective wisdom.
              </p>
            </div>
            
            {/* Community Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2,847</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">shared messages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">156</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">contributing teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">12.5k</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">messages saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">892h</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">time saved this week</div>
              </div>
            </div>

            {/* Sample Community Messages */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      SM
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Sarah M.</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Year 6 Teacher</div>
                    </div>
                    <Badge className="ml-auto bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                      <Award className="h-3 w-3 mr-1" />
                      Top Contributor
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    "Positive behavior reward system that reduced classroom disruptions by 80%. Here's how I explained it to parents..."
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      67 saves
                    </span>
                    <span>Shared 2 days ago</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      MR
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Maria R.</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Math Teacher</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    "Parent-teacher conference planning guide that made my meetings 50% more productive. Copy and adapt this template..."
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      43 saves
                    </span>
                    <span>Shared 5 days ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* CTA to Community */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="bg-white dark:bg-gray-900 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300" asChild>
                <a href="/gallery">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Teacher Community →
                </a>
              </Button>
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
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Try Promptly Free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 backdrop-blur px-8 py-4 text-lg font-semibold" asChild>
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