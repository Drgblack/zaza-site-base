import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MessageSquare, Users, Heart, Lightbulb, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Zaza Technologies',
  description: 'Learn about our mission to empower educators with AI-powered tools that save time and enhance teaching effectiveness.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const values = [
    {
      icon: Heart,
      title: "Teacher-First Design",
      description: "Every feature is designed with real educator feedback and classroom needs in mind."
    },
    {
      icon: Clock,
      title: "Time is Sacred",
      description: "We believe teachers' time should be spent inspiring students, not on repetitive administrative tasks."
    },
    {
      icon: Shield,
      title: "Privacy & Security", 
      description: "Student data protection is paramount. We follow strict privacy guidelines and never share personal information."
    },
    {
      icon: Lightbulb,
      title: "Innovation for Impact",
      description: "We leverage cutting-edge AI technology to create meaningful improvements in educational outcomes."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by educators, for educators. Our community of 12,000+ teachers guides our development."
    },
    {
      icon: MessageSquare,
      title: "Meaningful Feedback",
      description: "AI-generated comments that help students grow, not just fulfill requirements."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                We help teachers thrive
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Zaza Technologies, we believe every teacher deserves tools that amplify their impact 
                and reclaim their time. Our AI-powered platform helps educators save 5+ hours per week 
                while providing better, more personalized feedback to students.
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Founded by educators who understand classroom challenges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Trusted by 12,000+ teachers worldwide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Committed to student privacy and data protection</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/founder-greg.jpg"
                  alt="Greg, Founder of Zaza Technologies"
                  className="object-cover"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To empower educators with intelligent tools that reduce administrative burden 
              and enhance the teaching and learning experience for everyone.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12">
            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 italic">
                &ldquo;Every hour we save teachers on grading and feedback is another hour they can spend 
                inspiring, mentoring, and connecting with their students.&rdquo;
              </p>
              <footer className="text-gray-600">
                <cite>- Greg, Founder & CEO</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <value.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real educators
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">12,000+</div>
              <div className="text-gray-600">Teachers Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">5+ Hours</div>
              <div className="text-gray-600">Saved Per Week</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-gray-600">AI Comments Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Teacher Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}