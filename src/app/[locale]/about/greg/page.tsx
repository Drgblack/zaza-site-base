import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GraduationCap, Heart } from 'lucide-react';
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
                  Meet Greg Blackburn, founder of Zaza and lifelong learning professional.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 text-purple-700">Founder & Creator</Badge>
                  <Badge variant="outline">PhD in Professional Education</Badge>
                  <Badge variant="outline">20+ Years in L&D</Badge>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                "I built Zaza because I believe teachers deserve intelligent, supportive tools that truly understand their needs. My goal is to help educators reclaim their time, reduce stress, and focus on what matters most — inspiring and supporting their students."
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
                The Learning Professional
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Greg Blackburn has spent over 20 years in corporate learning and development, teaching thousands of organisational staff and publishing widely on how people learn best. His PhD in Professional Education focused on how educators can foster critical thinking and problem-solving in complex environments.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                While Greg's own career was in corporate learning rather than schools, education runs in the family. With close relatives working as teachers, he saw firsthand the stress and endless hours lost to planning, marking, and paperwork. The same problem he saw in companies — skilled educators drowning in admin instead of focusing on people — was happening in classrooms everywhere.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 my-8">
                <p className="text-blue-800 dark:text-blue-200 italic">
                  "As AI tools became more powerful, I recognised an opportunity: to combine decades of L&D expertise, research, and empathy for teachers into practical tools that give educators their time back. This was the beginning of Zaza."
                </p>
              </div>
            </div>

            {/* The Realisation */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <Heart className="h-8 w-8 text-purple-600" />
                The Realisation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                As AI tools became more powerful, Greg recognised an opportunity: to combine decades of L&D expertise, research, and empathy for teachers into practical tools that give educators their time back. This was the beginning of Zaza.
              </p>
            </div>

            {/* Personal Message */}
            <div className="mb-12">
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                  A Personal Message
                </h3>
                <p className="text-lg text-purple-800 dark:text-purple-200 leading-relaxed mb-6">
                  I built Zaza because I believe teachers deserve intelligent, supportive tools that truly understand their needs. My goal is to help educators reclaim their time, reduce stress, and focus on what matters most — inspiring and supporting their students. Thank you for being part of this journey.
                </p>
                <div className="mt-6 text-right">
                  <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                    — Greg
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Ready to transform your teaching workflow?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Join thousands of teachers who are already saving time and reducing stress with AI tools built specifically for education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
                  <a href="/#snippet-tool">Try Zaza Free</a>
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