import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GraduationCap, BookOpen, Heart, Star } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Greg Blackburn - Founder & Creator | Zaza Promptly',
  description: 'Learn about Greg Blackburn, PhD, the educator and researcher behind Zaza Promptly. From Tasmania classrooms to London research labs, discover the journey that led to creating AI tools specifically for teachers.',
  keywords: ['Greg Blackburn', 'founder story', 'education PhD', 'teacher background', 'Zaza Promptly creator'],
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function GregStoryPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <Button variant="outline" asChild>
              <a href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </a>
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/images/greg-founder-photo-v2.png"
                alt="Dr. Greg Blackburn, Founder of Zaza Technologies"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-gray-100">
                  Meet Your Fellow Educator
                </h1>
                <p className="text-2xl text-purple-600 font-semibold">
                  Greg Blackburn, PhD
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 text-purple-700">Founder & Creator</Badge>
                  <Badge variant="outline">PhD in Professional Education</Badge>
                  <Badge variant="outline">20+ Years in EdTech</Badge>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                "I built Zaza Promptly because I've been where you are—staying up late writing parent emails, 
                worrying about getting the tone just right, and wishing there was a tool that actually understood 
                the heart of teaching."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-purple max-w-none dark:prose-invert">
            
            {/* The Beginning */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-purple-600" />
                From Paintbrushes to Pixels
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                My journey into education began in an unlikely place—art classrooms in Tasmania, Australia. 
                Fresh out of university with dreams of inspiring creativity, I quickly discovered that teaching 
                was about so much more than subject matter expertise.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Those early years taught me the most valuable lesson of my career: <strong>the relationship between 
                teacher, student, and family is the foundation of everything we do in education.</strong>
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 my-8">
                <p className="text-blue-800 dark:text-blue-200 italic">
                  "I remember spending entire weekends crafting parent emails, agonizing over every word. 
                  Was I being too formal? Not formal enough? Would this parent understand what I was trying to say?"
                </p>
              </div>
            </div>

            {/* The Academic Journey */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-purple-600" />
                The Academic Path
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                My curiosity about how people learn and how technology could help led me to pursue advanced 
                studies in educational design and research. I earned my PhD in Professional Education, 
                focusing on how digital tools can enhance rather than complicate the teaching experience.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Research Focus</h3>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                      <li>• Human-centered educational technology design</li>
                      <li>• Teacher professional development and support</li>
                      <li>• Parent-teacher communication effectiveness</li>
                      <li>• AI applications in education</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">Published Work</h3>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                      <li>• 15+ peer-reviewed research papers</li>
                      <li>• International conference presentations</li>
                      <li>• Educational technology consulting</li>
                      <li>• Teacher training program development</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                My research consistently pointed to the same conclusion: teachers needed tools designed 
                <em>for</em> educators, <em>by</em> educators—not generic solutions that missed the nuances 
                of classroom life.
              </p>
            </div>

            {/* The Problem */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <Heart className="h-8 w-8 text-purple-600" />
                Why Zaza Promptly Exists
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                During my research in London and work with teachers across three continents, I kept hearing 
                the same frustrations:
              </p>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 my-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3">The Pain Points</h4>
                    <ul className="text-red-700 dark:text-red-300 space-y-2 text-sm">
                      <li>• "I spend my whole weekend on parent emails"</li>
                      <li>• "I never know if my tone is right"</li>
                      <li>• "Generic AI doesn't understand education"</li>
                      <li>• "I need templates that actually work for real situations"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3">The Impact</h4>
                    <ul className="text-red-700 dark:text-red-300 space-y-2 text-sm">
                      <li>• Teacher burnout and stress</li>
                      <li>• Lost family time on weekends</li>
                      <li>• Inconsistent parent relationships</li>
                      <li>• Reduced job satisfaction</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                That's when I knew I had to build something different. Not another generic AI tool, 
                but something created specifically for the unique world of education.
              </p>
            </div>

            {/* The Solution */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <Star className="h-8 w-8 text-purple-600" />
                Building Zaza Promptly
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Zaza Promptly isn't just another AI writing tool. It's the culmination of 20+ years in education, 
                extensive research into teacher needs, and hundreds of conversations with educators around the world.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-6">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-4">What Makes Zaza Different</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Built for Education</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Every feature designed with classroom realities in mind, from tone presets 
                      to situation-specific templates.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Research-Based</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Grounded in communication research and best practices from successful 
                      parent-teacher relationships.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Teacher-Tested</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Developed with input from hundreds of teachers across different grade levels 
                      and teaching contexts.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Continuously Improved</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Regular updates based on user feedback and emerging research in educational 
                      communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Message */}
            <div className="mb-12">
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                  A Personal Message to Fellow Educators
                </h3>
                <p className="text-lg text-purple-800 dark:text-purple-200 leading-relaxed mb-4">
                  I know what it's like to question every email you send to parents. I know the weight 
                  of responsibility you feel when communicating about a child's progress, behavior, or needs.
                </p>
                <p className="text-lg text-purple-800 dark:text-purple-200 leading-relaxed mb-4">
                  <strong>You are not just teachers—you are communicators, counselors, advocates, and bridges 
                  between home and school.</strong> Your words matter immensely, and you deserve tools that 
                  honor that responsibility while giving you back your time.
                </p>
                <p className="text-lg text-purple-800 dark:text-purple-200 leading-relaxed">
                  Zaza Promptly exists to support you in this crucial work. It's my way of saying 
                  "thank you" to the profession that shaped who I am and continues to transform lives 
                  every single day.
                </p>
                <div className="mt-6 text-right">
                  <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                    — Greg Blackburn, PhD
                  </p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Founder, Zaza Promptly
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Ready to transform your parent communication?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of teachers who are already saving time and building stronger relationships with parents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <a href="/#snippet-tool">Try Promptly Free</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/pricing">View Pricing</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}