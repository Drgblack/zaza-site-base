import { setRequestLocale } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, MessageCircle, Clock, Users, ArrowRight, Zap } from 'lucide-react';
import { EnhancedSnippetToolV2 } from '@/components/site/enhanced-snippet-tool-v2';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Demo - See Zaza Promptly in Action',
  description: 'Try our AI-powered parent communication tool for teachers. See how you can write professional messages in seconds instead of hours.',
  keywords: ['teacher demo', 'AI writing tool', 'parent communication', 'live demo'],
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function DemoPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
              <Play className="w-4 h-4 mr-2" />
              Live Interactive Demo
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6lg text-gray-900 dark:text-white mb-6">
              See Zaza Promptly in Action
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Watch how teachers write professional parent messages in 30 seconds instead of 15 minutes. 
              Try it yourself with our live demo below.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                <a href="#live-demo">
                  <Play className="w-5 h-5 mr-2" />
                  Try the Demo
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/pricing">
                  See Pricing →
                </a>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">30s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average message time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">5+h</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Saved per week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">12k+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Teachers using</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">User rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Scenarios */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Common Teaching Scenarios
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how Zaza Promptly handles real classroom situations teachers face every day.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Behavior Updates</CardTitle>
                <CardDescription>
                  "Emma had a great day but struggled with focus during math"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">→ Professional parent email in 30 seconds</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Report Card Comments</CardTitle>
                <CardDescription>
                  "Jake shows improvement in reading but needs support with homework completion"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">→ Balanced, constructive feedback</Badge>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Parent Meetings</CardTitle>
                <CardDescription>
                  "Need to discuss Maria's academic progress and social development"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">→ Meeting request with agenda</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Demo Tool */}
      <div id="live-demo">
        <EnhancedSnippetToolV2 />
      </div>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Three simple steps to better parent communication
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Describe the Situation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Just type what happened: "Emma had trouble focusing today"
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Tone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional, friendly, encouraging, or direct - it sounds like you
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Copy & Send</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Perfect message ready for email, text, or parent app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Save Hours Every Week?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 12,000+ teachers who've transformed their parent communication workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <a href="/#snippet-tool">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <a href="/pricing">
                <ArrowRight className="w-5 h-5 mr-2" />
                See Pricing
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}