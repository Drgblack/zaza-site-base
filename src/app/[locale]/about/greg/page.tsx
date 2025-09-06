import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GraduationCap, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meet Dr. Greg Blackburn - Founder & Creator | Zaza Promptly',
  description: 'Learn about Dr. Greg Blackburn, PhD, the educator and researcher behind Zaza Promptly. From Tasmania classrooms to London research labs, discover the journey that led to creating AI tools specifically for teachers.',
  keywords: ['Dr. Greg Blackburn', 'founder story', 'education PhD', 'teacher background', 'Zaza Promptly creator'],
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
                  Dr. Greg Blackburn – My Journey
                </h1>
                <p className="text-2xl text-purple-600 font-semibold">
                  From painter to PhD to tech entrepreneur
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 text-purple-700">Founder & CEO</Badge>
                  <Badge variant="outline">PhD in Professional Education</Badge>
                  <Badge variant="outline">Former CLO</Badge>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                "Every chapter of my journey — from apprenticing as a painter to leading corporate learning — shaped the skillset needed to build Zaza. I learned that across industries, admin steals time from human connection. Zaza gives that time back."
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
                The Early Years
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I didn't start out in technology or education. My working life began with a paintbrush in hand, apprenticing as a painter and decorator in Hobart, Tasmania, while my father ran a small paint factory. After finishing a pre-vocational course at TAFE, I found myself working at Cascade Brewery, doing a four-year apprenticeship I quickly realized wasn't for me. The work was tough, the environment tougher. But those years taught me resilience — and the conviction that I wanted something different.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Travel opened my eyes to that possibility. I lived abroad, studied German, and eventually returned to Tasmania to pursue university studies in Administration, Information Systems, and German at UTas. I graduated with First Class Honours, proving to myself that I could excel academically despite early doubts and family tensions that had often left me questioning my path.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 my-8">
                <p className="text-blue-800 dark:text-blue-200 italic">
                  "My career then took me to Brisbane, where I worked at Telstra for six years, and along the way I completed an MBA at the University of Queensland. Those years were transformative not only professionally but personally."
                </p>
              </div>
            </div>

            {/* The Journey Continues */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <Heart className="h-8 w-8 text-purple-600" />
                The Transformation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                It was in Brisbane that my two daughters, Viola and Solara, were born. Becoming a father reframed everything for me — success was no longer just about building a career, it was about creating a future where work left more time for people, for families, and for life. That desire to build something lasting, something I could one day hand to my daughters, began to crystallize.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At the same time, I was moving deeper into learning and development. My curiosity about how people learn and grow led me to publish research and teach thousands of organisational staff. Eventually, I pursued a PhD by publication at City, University of London, where my thesis focused on critical thinking and problem-solving in student-centred eLearning. With my PhD in Professional Education, I built a reputation as a researcher and thought leader in learning and development.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                By the time I became Chief Learning Officer at Communardo, I had spent more than 20 years in corporate L&D. But something else was happening in parallel: I was listening closely to the struggles of the people closest to me — family members who were teachers. Their stories echoed what I had seen in companies. Endless hours lost to admin. Creativity drained by repetitive communication. Whether in classrooms or boardrooms, the pattern was the same: admin was swallowing human connection.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-6">
                <p className="text-green-800 dark:text-green-200 font-medium text-lg">
                  That realisation gave birth to Zaza Technologies.
                </p>
              </div>
            </div>
            
            {/* Zaza Technologies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Zaza Technologies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Zaza Technologies builds AI-powered tools that free professionals from admin so they can focus on what matters most — whether that's teaching students or closing deals.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We operate on two pillars:
              </p>
              <div className="grid md:grid-cols-1 gap-6 mb-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                  <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-3">
                    For Educators: The Zaza Teach suite empowers teachers to reclaim their time, reduce stress, and connect more deeply with students.
                  </h4>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">
                    For Professionals: The Close Suite helps real estate agents, lawyers, consultants, and other client-facing experts close more deals, respond faster, and scale relationships with ease.
                  </h4>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Across industries, the problem is the same: repetitive communication steals time from high-value human work. Zaza gives that time back — whether the result is teachers gaining 5+ hours per week and reducing burnout, or professionals turning faster responses into higher revenue.
              </p>
            </div>
            
            {/* The Blend */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                The Blend
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Looking back, every chapter of my journey — from my apprenticeship in a factory, to corporate strategy at Telstra, to publishing research, teaching thousands of staff, and leading L&D at Communardo — has shaped the skillset needed to build Zaza. I learned resilience, technology, management, research, pedagogy, and the realities of work across industries.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                That unique blend allowed me to see the universal problem and design a universal solution: an ecosystem of AI assistants built to help humans thrive.
              </p>
            </div>

            {/* Personal Message */}
            <div className="mb-12">
              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
                  The Heart of It All
                </h3>
                <p className="text-lg text-purple-800 dark:text-purple-200 leading-relaxed mb-6">
                  And at the heart of it all are my daughters. Zaza isn't just about helping millions of people thrive in their work today — it's about building a legacy I can one day pass on to Viola and Solara, showing them that persistence, vision, and courage can change lives.
                </p>
                <div className="mt-6 text-right">
                  <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                    — Dr. Greg Blackburn
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Ready to reclaim your time?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Whether you're an educator or professional, discover how Zaza's AI tools can free you from admin and help you focus on what truly matters.
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