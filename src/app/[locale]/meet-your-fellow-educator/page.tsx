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
              <div className="prose prose-lg prose-purple max-w-none space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I began my working life as a painter and decorator in Hobart, Tasmania. My father owned a paint factory, and I entered TAFE by default, completing a four-year apprenticeship at Cascade Brewery. But I knew I wanted more.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  After traveling overseas, I realized education was my path forward. I studied German in Germany, then returned to Australia to complete a degree in Administration, Information Systems, and German at the University of Tasmania.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I went on to earn First Class Honours in Information Systems, an MBA at the University of Queensland, and later a PhD in Professional Education in London, focusing on critical thinking and problem-solving in student-centred eLearning.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Along the way, I worked in tech, higher education, and leadership roles - but always came back to one mission: help teachers thrive.
                </p>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl border-l-4 border-purple-500">
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    That's why I built Zaza Promptly. To give back the time, energy, and confidence that teachers deserve.
                  </p>
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