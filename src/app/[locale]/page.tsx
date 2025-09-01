import {setRequestLocale} from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Clock, Shield, GraduationCap, Heart, Zap } from 'lucide-react';
import { SnippetTool } from '@/components/site/snippet-tool';
import { ZaraAssistant } from '@/components/site/zara-assistant';

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
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.1),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.1),transparent_50%)] animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,193,0.05),transparent_70%)] animate-pulse" style={{animationDelay: '4s'}} />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Write parent messages in minutes,{" "}
                  <span className="text-purple-600">not hours.</span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mx-auto lg:mx-0">
                  Zaza Promptly is your AI-powered teaching assistant - built to help teachers save time, reduce stress, and communicate with confidence.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
            
            {/* Right side - Hero image placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <MessageCircle className="h-16 w-16 text-purple-600 mx-auto" />
                    <div className="space-y-2">
                      <div className="h-4 bg-purple-200 dark:bg-purple-700 rounded w-full" />
                      <div className="h-4 bg-purple-200 dark:bg-purple-700 rounded w-3/4 mx-auto" />
                      <div className="h-4 bg-purple-200 dark:bg-purple-700 rounded w-1/2 mx-auto" />
                    </div>
                  </div>
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
                <h3 className="text-xl font-semibold">AI generates your message</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Professional, clear, and tailored for parents.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold">Refine with Zara</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Translate, adjust tone, or rewrite instantly.
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
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    &ldquo;Promptly cut my Sunday admin in half.&rdquo;
                  </p>
                  <p className="font-semibold">- Sarah, Year 6 Teacher</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    &ldquo;I used to agonize over parent emails. Now I feel confident in minutes.&rdquo;
                  </p>
                  <p className="font-semibold">- Jamal, High School Teacher</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    &ldquo;Finally, an AI tool that understands teachers.&rdquo;
                  </p>
                  <p className="font-semibold">- Emily, Primary Teacher</p>
                </CardContent>
              </Card>
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

      {/* 7. Final CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="container px-4 md:px-6 relative">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Spend less time worrying about words - and more time teaching.
            </h2>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Try Promptly Free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 backdrop-blur">
                See Pricing →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}