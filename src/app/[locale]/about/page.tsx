import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MessageSquare, Users, Heart, Lightbulb, Shield, ArrowRight, Sparkles, Target, Zap, TrendingUp, CheckCircle, Globe } from 'lucide-react';
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
      description: "Every feature is designed with real educator feedback and classroom needs in mind.",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
      borderColor: "border-pink-200 dark:border-pink-700/50"
    },
    {
      icon: Clock,
      title: "Time is Sacred",
      description: "We believe teachers' time should be spent inspiring students, not on repetitive administrative tasks.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      borderColor: "border-blue-200 dark:border-blue-700/50"
    },
    {
      icon: Shield,
      title: "Privacy & Security", 
      description: "Student data protection is paramount. We follow strict privacy guidelines and never share personal information.",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      borderColor: "border-green-200 dark:border-green-700/50"
    },
    {
      icon: Lightbulb,
      title: "Innovation for Impact",
      description: "We leverage cutting-edge AI technology to create meaningful improvements in educational outcomes.",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
      borderColor: "border-yellow-200 dark:border-yellow-700/50"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by educators, for educators. Our community of 12,000+ teachers guides our development.",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
      borderColor: "border-purple-200 dark:border-purple-700/50"
    },
    {
      icon: MessageSquare,
      title: "Meaningful Feedback",
      description: "AI-generated comments that help students grow, not just fulfill requirements.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
      borderColor: "border-indigo-200 dark:border-indigo-700/50"
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "12,000+",
      label: "Teachers Served",
      color: "from-purple-600 to-violet-600",
      bgColor: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30"
    },
    {
      icon: Clock,
      number: "5+ Hours",
      label: "Saved Per Week",
      color: "from-blue-600 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
    },
    {
      icon: MessageSquare,
      number: "500,000+",
      label: "Messages Generated",
      color: "from-green-600 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30"
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Teacher Satisfaction",
      color: "from-orange-600 to-red-600",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30"
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "The Classroom Challenge",
      description: "Greg, a PhD in Professional Education, noticed teachers spending 60% of their time on admin work instead of teaching.",
      icon: Target
    },
    {
      year: "2020",
      title: "First Prototype",
      description: "Built the first AI writing assistant specifically for parent communication during remote learning chaos.",
      icon: Lightbulb
    },
    {
      year: "2022",
      title: "Teacher Beta",
      description: "500 teachers tested our MVP and saved an average of 4.5 hours per week on communication.",
      icon: Users
    },
    {
      year: "2023",
      title: "Platform Launch",
      description: "Launched Promptly with multi-language support and advanced tone matching for diverse classrooms.",
      icon: Globe
    },
    {
      year: "2024",
      title: "AI Revolution",
      description: "12,000+ teachers now use our platform, saving over 60,000 hours weekly with Zara AI Assistant.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Animated Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/20 dark:via-slate-900 dark:to-pink-950/20 py-20 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-violet-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 animate-in fade-in slide-in-from-left-5 duration-1000">
                <Sparkles className="w-4 h-4 mr-2" />
                Empowering 12,000+ educators worldwide
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-left-5 duration-1000 delay-200">
                We help teachers{" "}
                <span className="relative">
                  thrive
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-in slide-in-from-left-full duration-1000 delay-1000"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-in fade-in slide-in-from-left-5 duration-1000 delay-400">
                At Zaza Technologies, we believe every teacher deserves tools that amplify their impact 
                and reclaim their time. Our AI-powered platform helps educators save{" "}
                <span className="font-bold text-purple-600 dark:text-purple-400">5+ hours per week</span>{" "}
                while providing better, more personalized feedback to students.
              </p>
              
              <div className="space-y-4 animate-in fade-in slide-in-from-left-5 duration-1000 delay-600">
                {[
                  "Founded by educators who understand classroom challenges",
                  "Trusted by 12,000+ teachers worldwide", 
                  "Committed to student privacy and data protection"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-5 duration-1000 delay-800">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group" asChild>
                  <a href="/about/greg">
                    Meet Our Founder
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-all duration-300" asChild>
                  <a href="#mission">Learn Our Mission</a>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right-5 duration-1000 delay-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 hover:scale-105 transition-transform">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/founder-greg.jpg"
                    alt="Greg, Founder of Zaza Technologies"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section id="mission" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
              <Target className="w-4 h-4 mr-2" />
              Our Purpose
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              To empower educators with intelligent tools that reduce administrative burden 
              and enhance the teaching and learning experience for everyone.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 dark:from-purple-950/20 dark:via-violet-950/20 dark:to-pink-950/20 rounded-3xl p-8 md:p-12 border border-purple-200/50 dark:border-purple-700/30 shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <blockquote className="text-center">
              <div className="text-6xl text-purple-300 dark:text-purple-600 mb-6">&ldquo;</div>
              <p className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-200 mb-6 italic">
                Every hour we save teachers on grading and feedback is another hour they can spend 
                inspiring, mentoring, and connecting with their students.
              </p>
              <footer className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div className="text-left">
                  <cite className="text-gray-800 dark:text-gray-200 font-semibold not-italic">Greg Johnson</cite>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Founder & CEO</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Animated Values Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.05),transparent_60%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border border-blue-200 dark:border-blue-700/50 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
              <Heart className="w-4 h-4 mr-2" />
              What Drives Us
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Values
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

      {/* Journey Timeline Section */}
      <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
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
              How We Got Here
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-400">
              From classroom challenges to AI-powered solutions
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
                    <div className="relative w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg group-hover:scale-150 transition-transform duration-300">
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

      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              Measuring Success
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real results from real educators
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
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
              <p className="text-lg mb-6 text-white/90">
                Join thousands of teachers who have already transformed their workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 group" asChild>
                  <a href="/#snippet-tool">
                    Try Free Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-all duration-300" asChild>
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