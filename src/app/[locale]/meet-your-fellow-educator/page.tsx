import { setRequestLocale } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LinkedinIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function MeetYourFellowEducatorPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Meet Your Fellow Educator
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From paint brushes to PhD - a journey shaped by education.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/images/founder-greg.jpg"
                      alt="Greg - Founder & Fellow Educator"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Greg</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Founder & CEO, PhD Professional Education
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href="https://linkedin.com/in/gregzahra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <LinkedinIcon className="h-4 w-4" />
                        Follow on LinkedIn
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg prose-purple max-w-none space-y-8">
                {/* Early Years */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    I didn't begin in technology or education. My working life started with a paintbrush in hand, apprenticing as a painter and decorator in Hobart, Tasmania, while my father ran a small paint factory. After completing a pre-vocational course at TAFE, I found myself at Cascade Brewery, working through a four-year apprenticeship I quickly realised wasn't for me.
                  </p>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl border-l-4 border-orange-500">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 italic">
                      "The work was tough, the environment tougher - but those years taught me resilience."
                    </p>
                  </div>
                </div>

                {/* Discovery and Growth */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Travel opened my eyes to what might be possible. I lived abroad, studied German, and eventually returned to Tasmania to pursue university studies in Administration, Information Systems, and German at UTas. Graduating with First Class Honours proved to me that I could excel academically despite early doubts and the family tensions that had left me questioning my path.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    My career then took me to Brisbane, where I spent six years at Telstra and completed an MBA at the University of Queensland. That MBA opened doors into management roles at UQ itself, where I became a Business Manager. At the same time, I began publishing research - exploring how people learn, solve problems, and think critically in their work.
                  </p>
                </div>

                {/* Turning Point */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    It was also in Brisbane that my two daughters, Viola and Solara, were born. Fatherhood reframed everything. Success no longer meant climbing the next rung of the career ladder - it meant building a future where work left more time for people, for families, and for life. That desire to create something lasting, something I could one day hand to my daughters, began to crystallise.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-l-4 border-blue-500">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 italic">
                      "Fatherhood reframed everything: success became about creating time for families and life."
                    </p>
                  </div>
                </div>

                {/* Academic Journey */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Driven by curiosity, I pursued a PhD by publication at City, University of London. My thesis focused on critical thinking and problem-solving in student-centred eLearning - themes that would quietly shape much of what came next. With my PhD in Professional Education, I built a reputation as a researcher and thought leader in learning and development. Over the years, I published widely, taught thousands of organisational staff, and grew into leadership as Chief Learning Officer at Communardo.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Yet alongside this professional journey, I was listening closely to the struggles of those around me - especially family members who were teachers. Their stories mirrored what I had seen in companies: endless hours consumed by admin, creativity drained by paperwork, and a profession meant to be about people reduced to process.
                  </p>
                </div>

                {/* The Vision */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    That realisation planted a seed. As AI tools became more accessible, I began to imagine how they could be harnessed not as gimmicks, but as genuine supports - freeing professionals to focus on what they do best. By 2024, that seed had grown into Zaza Technologies.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Zaza was created to turn decades of insight into human-friendly, AI-powered tools. I drew on everything - my corporate career, my academic research, my family's lived experience in classrooms, and my own determination to build something meaningful.
                  </p>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border-l-4 border-purple-500">
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Zaza Technologies builds AI-powered tools that give people their time back.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Our mission is to free professionals from repetitive admin and communication so they can focus on what matters most - whether that's teaching students, closing deals, or making an impact in their field.
                    </p>
                  </div>
                </div>

                {/* The Mission */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We operate on two pillars:
                  </p>
                  
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="font-semibold text-purple-600 dark:text-purple-400 mr-2">For Educators:</span>
                      The Zaza Teach suite empowers teachers to reclaim their time, reduce stress, and connect more deeply with students.
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-purple-600 dark:text-purple-400 mr-2">For Professionals:</span>
                      The Close Suite helps real estate agents, lawyers, consultants, and other client-facing experts close more deals, respond faster, and scale relationships with ease.
                    </li>
                  </ul>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Across industries, the problem is the same: repetitive communication steals time from high-value human work. Zaza gives that time back - whether the result is teachers gaining 5+ hours per week and reducing burnout, or professionals turning faster responses into higher revenue.
                  </p>
                </div>

                {/* Legacy and Vision */}
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    What began as a personal journey - from an unhappy apprentice in a paint factory to the founder of a company building AI-powered assistants - has become something much bigger. Zaza Technologies is my way of proving the value of my hard-won experience, creating a legacy for my daughters, and showing the world that technology can be built with empathy, trust, and a deep understanding of how people learn and work.
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-500">
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 italic mb-4">
                      "If there is one lesson I hope to pass on - it is the value of betting on yourself."
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      With perseverance, vision, and education, anything is possible.
                    </p>
                  </div>
                  
                  <div className="pt-6">
                    <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                      <a
                        href="https://linkedin.com/in/gregzahra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <LinkedinIcon className="h-5 w-5" />
                        Follow my journey on LinkedIn →
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background & Credentials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Background & Credentials</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li>• PhD in Professional Education, University of London</li>
                    <li>• MBA, University of Queensland</li>
                    <li>• First Class Honours, Information Systems</li>
                    <li>• Bachelor's Degree: Administration, Information Systems, German</li>
                    <li>• TAFE Apprenticeship (4 years), Tasmania</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Experience</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li>• Technology Leadership</li>
                    <li>• Higher Education Administration</li>
                    <li>• Student-Centred eLearning Design</li>
                    <li>• Critical Thinking & Problem-Solving Research</li>
                    <li>• International Education (Germany)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Built by Educators, For Educators
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the difference when AI tools are designed with deep understanding of teaching realities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Try Promptly Free
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More About Our Mission →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}