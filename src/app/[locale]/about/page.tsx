import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MessageSquare, Users, Heart, Lightbulb, Shield, ArrowRight, Target, Zap, TrendingUp, BookOpen, Briefcase, CheckCircle, Award } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema } from '@/components/seo/structured-data-schemas';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMetadata('about', locale as 'en' | 'de' | 'fr' | 'es' | 'it');
}

export default async function AboutPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const values = [
    {
      icon: Heart,
      title: "Teacher-first design",
      description: "Built with educators and real classroom needs in mind.",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
      borderColor: "border-pink-200 dark:border-pink-700/50"
    },
    {
      icon: Clock,
      title: "Time is sacred",
      description: "Time should be spent inspiring students or serving clients - not on repetitive admin.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      borderColor: "border-blue-200 dark:border-blue-700/50"
    },
    {
      icon: Shield,
      title: "Privacy and security",
      description: "We follow strict privacy guidelines and never share personal information.",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      borderColor: "border-green-200 dark:border-green-700/50"
    },
    {
      icon: Lightbulb,
      title: "Innovation for impact",
      description: "Cutting-edge AI that delivers meaningful outcomes.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
      borderColor: "border-yellow-200 dark:border-yellow-700/50"
    },
    {
      icon: Users,
      title: "Community-driven",
      description: "Built with and for our users. Feedback guides our roadmap.",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
      borderColor: "border-purple-200 dark:border-purple-700/50"
    },
    {
      icon: MessageSquare,
      title: "Meaningful feedback",
      description: "AI-generated suggestions that help people grow, not just tick boxes.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
      borderColor: "border-indigo-200 dark:border-indigo-700/50"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "12,000+",
      label: "Teachers and professionals served",
      color: "from-purple-600 to-violet-600",
      bgColor: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
    },
    {
      icon: Clock,
      number: "5+ hours",
      label: "Saved per week",
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
    },
    {
      icon: MessageSquare,
      number: "500,000+",
      label: "Messages generated",
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "User satisfaction",
      color: "from-orange-600 to-red-600",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30"
    }
  ];

  const milestones = [
    {
      year: "2019–2021",
      title: "The realisation",
      description: "Greg, a PhD in Professional Education with 20+ years in learning and development, saw a familiar pattern: whether in classrooms or companies, teachers and trainers were spending more time on admin than on people. Family members who were teachers brought home the same story - endless hours lost to planning, marking, and paperwork.",
      icon: Target
    },
    {
      year: "2022–2023",
      title: "Research and thought leadership",
      description: "Years of publishing and teaching thousands of organisational staff made one thing clear: learning flourishes when educators can focus on their craft. As AI became more accessible, the idea of building something purpose-built for teachers started to take shape.",
      icon: Lightbulb
    },
    {
      year: "2024",
      title: "Founding Zaza",
      description: "Zaza Technologies was created to turn decades of insight into practical tools. Our focus: build AI that saves time without cutting corners, grounded in pedagogy, empathy, and real classroom needs.",
      icon: Users
    },
    {
      year: "2025",
      title: "Launch year",
      description: "We launched Zaza Teach and Zaza Promptly - giving teachers AI-powered lesson planning and parent communication support. The same core technology expanded to the Close Suite to help professionals turn communication into revenue.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-100 via-gray-50 to-pink-100 dark:from-purple-950/20 dark:via-slate-900 dark:to-pink-950/20 py-20 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-violet-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 animate-in fade-in slide-in-from-left-5 duration-1000">
              <Award className="w-4 h-4 mr-2" />
              Founded by a PhD in Professional Education with 20+ years in learning and development
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-left-5 duration-1000 delay-200">
              AI tools that give you time back
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-left-5 duration-1000 delay-400">
              Zaza Technologies builds AI-powered tools for teachers and client-facing professionals. Whether you are in the classroom, boardroom, or anywhere in between, thoughtful communication takes time. Our solutions help you save 5+ hours per week on administrative tasks while maintaining the personal touch that matters.
            </p>
            
            <div className="space-y-4 animate-in fade-in slide-in-from-left-5 duration-1000 delay-600">
              {[
                "Trusted by 12,000+ educators and professionals",
                "Committed to privacy and data protection"
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 group">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-left-5 duration-1000 delay-800">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
                <a href="#products">
                  Meet Our Products
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-800 dark:hover:text-purple-200 transition-all duration-300" asChild>
                <a href="#mission">Learn Our Mission</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* One Company - Two Suites */}
      <section id="products" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              One company - two suites
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Zaza Technologies builds two complementary suites that solve the same core problem: repetitive communication steals time from high-value human work.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* Zaza Teach Suite Card */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-200/50 dark:border-blue-700/30">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Zaza Teach Suite
                </CardTitle>
                <CardDescription className="text-base text-blue-600 dark:text-blue-400 font-medium">
                  For educators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>What it is:</strong> Teacher-first tools that reduce admin so teachers can focus on students.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Includes:</strong> Zaza Promptly (parent communication), Zaza Teach (planning and grading), AutoPlanner (agent-native lesson planning).
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Outcomes:</strong> Save 5+ hours per week, reduce stress, improve feedback quality.
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white group-hover:shadow-lg transition-all duration-300" asChild>
                  <a href="/pricing">
                    Explore Zaza Teach
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>

            {/* Close Suite Card */}
            <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-200/50 dark:border-emerald-700/30">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  The Close Suite
                </CardTitle>
                <CardDescription className="text-base text-emerald-600 dark:text-emerald-400 font-medium">
                  For professionals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>What it is:</strong> A family of AI-powered communication assistants designed for industries where revenue depends on closing deals, managing clients, and maintaining strong relationships.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong>Outcomes:</strong> Close more deals, respond faster, follow up on time, scale your client communication without adding headcount.
                </p>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white group-hover:shadow-lg transition-all duration-300" asChild>
                  <a href="/contact">
                    Explore the Close Suite
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* The Throughline */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              The throughline
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Across industries we see the same pattern: skilled people are buried under repetitive messages, status updates, and coordination. Zaza gives that time back. Teachers use Zaza to reclaim hours and connect more deeply with students. Professionals use the Close Suite to turn communication into revenue. In both worlds, the result is the same - more impact, less admin.
            </p>
          </div>
        </div>
      </section>

      {/* Why the Close Suite matters */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Why the Close Suite matters
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              For revenue-focused work, better communication directly improves the bottom line.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {[
              {
                title: "More deals closed",
                description: "Faster, polished responses convert leads into clients and keep momentum.",
                icon: TrendingUp,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Time back",
                description: "Automates routine emails, updates, and check-ins so you can focus on revenue-producing work.",
                icon: Clock,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Professional edge",
                description: "Consistent tone, trust-building language, and translation tools make every message feel like your best day.",
                icon: Award,
                color: "from-purple-500 to-violet-500"
              },
              {
                title: "Scalable leverage",
                description: "Solo professionals gain the power of a team. Teams and firms achieve consistency and client satisfaction at scale.",
                icon: Users,
                color: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <Card key={index} className="group text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-gray-200/50 dark:border-gray-700/30">
                <CardHeader>
                  <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl p-8 border border-emerald-200 dark:border-emerald-700/50">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Why pay for it</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                In fields like real estate, law, HR, healthcare, and consulting, a single closed deal, retained client, or prevented churn event can be worth thousands. If the Close Suite saves time and increases conversion, it pays for itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-gray-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
              <Target className="w-4 h-4 mr-2" />
              Our Purpose
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Our mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To empower people with intelligent tools that reduce administrative burden and elevate the quality of human work. We build AI that helps teachers teach and professionals close - without losing the personal touch.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border border-blue-200 dark:border-blue-700/50 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
              <Heart className="w-4 h-4 mr-2" />
              What Drives Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 bg-gradient-to-br ${value.bgColor} border-2 ${value.borderColor} backdrop-blur-sm`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <CardHeader className="relative">
                  <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 animate-pulse`}></div>
                    <value.icon className={`h-8 w-8 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {value.description}
                  </CardDescription>
                </CardContent>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How we got here Timeline Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200 dark:border-green-700/50 text-sm font-medium text-green-700 dark:text-green-300 mb-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <TrendingUp className="w-4 h-4 mr-2" />
              Our Journey
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              How we got here
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-400">
              From lifelong research to teacher-first AI - and now client communication at scale
            </p>
          </div>
          
          <div className="relative">
            {/* Animated Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full overflow-hidden">
              <div className="h-full bg-gradient-to-b from-green-400 to-emerald-600 animate-in slide-in-from-top-full duration-2000 delay-600"></div>
            </div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} group animate-in fade-in ${index % 2 === 0 ? 'slide-in-from-left-10' : 'slide-in-from-right-10'} duration-1000`}
                  style={{
                    animationDelay: `${800 + index * 200}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-green-200/50 dark:border-green-700/30 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-105 overflow-hidden">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-emerald-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="relative flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                            <milestone.icon className="w-6 h-6 text-white" />
                            <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300 origin-left">{milestone.year}</div>
                            <CardTitle className="text-lg text-gray-800 dark:text-gray-200">{milestone.title}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Enhanced Timeline dot */}
                  <div className="relative flex-shrink-0">
                    <div className="relative w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg group-hover:scale-150 transition-transform duration-300">
                      {/* Pulsing ring */}
                      <div className="absolute inset-[-8px] rounded-full border-2 border-green-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    </div>
                    {/* Connection lines */}
                    <div className={`absolute top-1/2 ${index % 2 === 0 ? 'left-full' : 'right-full'} w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Measuring Success
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real results from educators and professionals
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className={`group relative overflow-hidden text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:rotate-2 bg-gradient-to-br ${stat.bgColor} border-2 border-white dark:border-slate-700 backdrop-blur-sm`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <CardContent className="p-8 relative">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                    </div>
                  </div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Impact metrics are based on user-reported data and ongoing internal analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Who we serve
            </h2>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-200/50 dark:border-blue-700/30">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">Educators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                  K-12 teachers, school leaders, and support staff who want to reduce admin and improve communication.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-2 border-emerald-200/50 dark:border-emerald-700/30">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                  Real estate agents, legal, HR, healthcare, and consulting teams where timely, high-quality communication drives revenue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Looking ahead */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Looking ahead
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Zaza is building an ecosystem of AI assistants that help humans thrive at work. We will keep expanding our Teach and Close product lines, deepen integrations, and invest in safety and transparency so users can trust every step.
            </p>
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-500 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Workflow?</h3>
              <p className="text-lg mb-6 text-white/90">
                Join thousands of educators and professionals who have already transformed their workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 group" asChild>
                  <a href="/#snippet-tool">
                    Try a Free Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300" asChild>
                  <a href="/contact">Talk to Sales</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </div>
  );
}