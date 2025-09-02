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
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10 relative overflow-hidden">
        {/* Enhanced animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.15),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.15),transparent_50%)] animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,193,0.1),transparent_70%)] animate-pulse" style={{animationDelay: '4s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(219,39,119,0.08),transparent_60%)] animate-pulse" style={{animationDelay: '6s'}} />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Save hours every week on parent messages,{" "}
                  <span className="text-purple-600">report cards, and classroom communication.</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mx-auto">
                  Your personal teaching assistant that gives you back precious time, reduces stress, and lets you focus on what you love most - your students.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Try Free - 5 Messages / Month
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
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
            </div>
            
            {/* Right side - Hero image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="aspect-square rounded-3xl shadow-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1581726690015-c9861fa5057f?w=600&h=600&fit=crop&crop=faces"
                    alt="Teachers collaborating happily"
                    width={600}
                    height={600}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem / Pain */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why writing parent messages feels overwhelming
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Teachers already spend evenings lesson planning and grading - and then there&apos;s the endless stream of parent messages.
            </p>
            <div className="grid gap-8 md:grid-cols-3 mt-12">
              <div className="text-center space-y-4">
                <Clock className="h-12 w-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-semibold">Drafting the right words takes too long.</h3>
              </div>
              <div className="text-center space-y-4">
                <MessageCircle className="h-12 w-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-semibold">The tone has to be professional and caring.</h3>
              </div>
              <div className="text-center space-y-4">
                <Zap className="h-12 w-12 text-red-500 mx-auto" />
                <h3 className="text-lg font-semibold">Mistakes cause stress and misunderstandings.</h3>
              </div>
            </div>
            <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
              The result? Burnout, late nights, and less energy for actual teaching.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Solution / How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50/50 dark:from-gray-800 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How Promptly works for you
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold">Type the basics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Add a quick note or bullet points.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold">You save precious Sunday hours</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Professional messages generated instantly, leaving you time for what matters.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold">Your personal assistant, always ready</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Translate, adjust tone, or rewrite - Zara is there whenever you need her.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Interactive Demo - Snippet Tool */}
      <SnippetTool />

      {/* 4. Social Proof */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by teachers who value their time
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=48&h=48&fit=crop&crop=face"
                      alt="Sarah"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Sarah M.</p>
                      <p className="text-sm text-gray-500">Year 6 Teacher</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &ldquo;Promptly cut my Sunday admin in half. I actually have weekends again!&rdquo;
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                      alt="Marcus"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Marcus J.</p>
                      <p className="text-sm text-gray-500">High School Math</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &ldquo;No more staring at blank screens. Parent messages flow naturally now.&rdquo;
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face"
                      alt="Jennifer"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">Jennifer K.</p>
                      <p className="text-sm text-gray-500">Elementary</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &ldquo;I sleep better knowing my parent emails are professional and caring.&rdquo;
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                      alt="David"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">David R.</p>
                      <p className="text-sm text-gray-500">Middle School</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &ldquo;Finally - an AI that speaks teacher. It gets our world completely.&rdquo;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Built by a Teacher Trust Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Photo and credentials */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Placeholder for Greg's photo */}
                <div className="w-full max-w-sm mx-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
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
                From Classroom to Code: <br />
                <span className="text-purple-600">A Teacher's Journey</span>
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Zaza Promptly was created by <strong className="text-gray-900 dark:text-gray-100">Greg Blackburn, PhD in Professional Education</strong>, 
                  with 20+ years' experience in learning design and educational technology.
                </p>
                <p>
                  From paintbrushes in Tasmania to publishing research in London, Greg's journey is proof that 
                  education transforms lives — and Zaza exists to help teachers thrive, not burn out.
                </p>
                <p>
                  <em>"I built Promptly because I know what it's like to spend Sunday afternoons writing parent emails. 
                  Teachers deserve tools that understand our world, not generic AI that misses the heart of education."</em>
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">PhD in Professional Education</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">20+ years in learning design and EdTech</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Published researcher in educational innovation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Former classroom teacher who understands your challenges</span>
                </div>
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
                  <CardTitle>Promptly Pro</CardTitle>
                  <CardDescription>For active teachers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">€14.99<span className="text-sm font-normal">/month</span></div>
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
                      Upgrade Anytime
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bundle with Zaza Teach</CardTitle>
                  <CardDescription>Complete teaching solution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold">€24.99<span className="text-sm font-normal">/month</span></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Lesson planning + parent communication
                  </p>
                  <Button variant="outline" className="w-full">Coming Soon</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Secondary Benefits */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Why Promptly is different
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <GraduationCap className="h-12 w-12 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold">Built by educators</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Designed by a PhD in Professional Education.
                </p>
              </div>
              <div className="text-center space-y-4">
                <Shield className="h-12 w-12 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold">Safe & secure</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your messages never get shared or sold.
                </p>
              </div>
              <div className="text-center space-y-4">
                <Heart className="h-12 w-12 text-purple-600 mx-auto" />
                <h3 className="text-xl font-semibold">Time back for teaching</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Less admin, more energy for your students.
                </p>
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