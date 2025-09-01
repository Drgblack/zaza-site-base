import {setRequestLocale} from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Clock, Shield, GraduationCap, Heart, Zap } from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* 1. Hero / Headline */}
      <section className="py-24 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Write parent messages in minutes,{" "}
                <span className="text-purple-600">not hours.</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Zaza Promptly is your AI-powered teaching assistant — built to help teachers save time, reduce stress, and communicate with confidence.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Try Free — 5 Messages / Month
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
        </div>
      </section>

      {/* 2. Problem / Pain */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why writing parent messages feels overwhelming
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Teachers already spend evenings lesson planning and grading — and then there's the endless stream of parent messages.
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
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
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

      {/* 4. Social Proof */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6">
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
                    "Promptly cut my Sunday admin in half."
                  </p>
                  <p className="font-semibold">— Sarah, Year 6 Teacher</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "I used to agonize over parent emails. Now I feel confident in minutes."
                  </p>
                  <p className="font-semibold">— Jamal, High School Teacher</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "Finally, an AI tool that understands teachers."
                  </p>
                  <p className="font-semibold">— Emily, Primary Teacher</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing CTA */}
      <section className="py-24 bg-purple-50 dark:bg-purple-900/20">
        <div className="container px-4 md:px-6">
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
        <div className="container px-4 md:px-6">
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

      {/* 7. Final CTA */}
      <section className="py-24 bg-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Spend less time worrying about words — and more time teaching.
            </h2>
            <div className="space-x-4">
              <Button size="lg" variant="secondary">
                Try Promptly Free
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                See Pricing →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}