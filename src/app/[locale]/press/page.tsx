import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, Mail, Calendar, Users, Award, Newspaper, ImageIcon, FileText, Palette } from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PressPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const pressReleases = [
    {
      title: "About Dr. Greg Blackburn, Founder of Zaza Technologies",
      date: "September 6, 2025",
      summary: "Dr. Greg Blackburn is the founder of Zaza Technologies, a company building AI-powered tools that free professionals from admin so they can focus on what matters most - whether that's teaching students or closing deals. Dr. Greg Blackburn's journey spans more than two decades in corporate learning and development, research, and leadership. After beginning his career at Telstra and completing an MBA at the University of Queensland, Dr. Greg Blackburn earned a PhD in Professional Education from City, University of London, with a thesis on critical thinking and problem-solving in eLearning. He went on to publish widely, teach thousands of organisational staff, and serve as Chief Learning Officer at Communardo.",
      category: "Media Bio",
      link: "/about/greg",
      featured: true,
      image: "/images/greg-founder-photo-v2.png",
      imageAlt: "Dr. Greg Blackburn, Founder of Zaza Technologies"
    },
    {
      title: "Australian Entrepreneur Builds Global AI Company from Saarbrücken Base",
      date: "September 6, 2025",
      summary: "An Australian by birth, Dr. Greg Blackburn has called Saarland home for more than a decade. From his base in Saarbrücken, he founded Zaza Technologies, a company now building AI-powered tools used by teachers and professionals around the world. Dr. Greg Blackburn's journey has been anything but ordinary. He began his working life as a painter and decorator in Tasmania before moving into corporate learning and development, completing an MBA at the University of Queensland and later earning a PhD in Professional Education from City, University of London. Over the years, he published research, taught thousands of organisational staff, and became Chief Learning Officer at Communardo. In Saarland, Dr. Greg Blackburn saw the chance to build something new — blending his research expertise, corporate experience, and personal motivation as a father. His company, Zaza Technologies, operates on two pillars: Zaza Teach, which helps educators reclaim their time and reduce stress, and the Close Suite, which enables professionals such as real estate agents and consultants to close deals faster and scale client relationships with ease. For Dr. Greg Blackburn, Saarbrücken isn't just where he lives — it's the launchpad for a global vision. \"I'm building Zaza here in Saarland not only to help millions of people thrive in their work,\" he says, \"but also as a legacy I can one day hand to my daughters, Viola and Solara.\"",
      category: "Local Story",
      link: "/about/greg",
      featured: true,
      image: "/images/greg-founder-photo-v2.png",
      imageAlt: "Dr. Greg Blackburn in Saarbrücken, Germany"
    },
    {
      title: "Zaza Promptly Launches AI-Powered Parent Communication Tool for Teachers",
      date: "September 8, 2025",
      summary: "FOR IMMEDIATE RELEASE - Saarbrücken, Germany – September 08, 2025 - Zaza Technologies has officially launched Zaza Promptly, an AI-powered tool designed to take the stress out of parent–teacher communication. The app helps teachers craft professional, empathetic, and time-saving messages to parents - reducing hours of after-school admin. Teachers often report that parent communication is one of the most emotionally draining and time-consuming aspects of their role. Zaza Promptly changes this by offering instant, personalized message suggestions that respect both the teacher's voice and the parent's perspective. \"Promptly is about giving teachers their evenings back,\" said Dr. Greg Blackburn, founder of Zaza Technologies. \"Instead of staring at a blank screen or agonizing over wording, teachers can generate clear, supportive, and professional messages in minutes.\" Early pilot users report saving 3–5 hours per week and experiencing lower stress when handling sensitive conversations. The tool includes tone adjustment, translation, and quick-reply features to ensure communication is culturally responsive and professional. Educator Sarah Martinez, one of the first beta testers, noted: \"I used to dread opening my inbox at night. With Promptly, I can respond to parents faster without feeling emotionally drained. It's a genuine game-changer.\" Zaza Promptly is available now for teachers worldwide, with free and premium plans. Learn more at zazapromptly.com",
      category: "Press Release",
      link: "/blog/promptly-launch-announcement",
      featured: true,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
      imageAlt: "Teachers using technology in classroom"
    },
    {
      title: "Zaza Promptly Surpasses 12,000 Teacher Users Worldwide",
      date: "September 5, 2025",
      summary: "FOR IMMEDIATE RELEASE - Saarbrücken, Germany – September 05, 2025 - Zaza Technologies announced today that Zaza Promptly has surpassed 12,000 teacher users worldwide, just weeks after launch. The milestone highlights the urgent demand for AI tools that support teacher wellbeing and efficiency. Built by educators for educators, Zaza Promptly helps teachers save time and reduce stress by generating thoughtful, professional parent messages in minutes. The app is particularly popular among teachers balancing large class sizes and heavy workloads. \"This milestone confirms what we've known all along - teachers are desperate for tools that respect their time and their craft,\" said Dr. Greg Blackburn, founder of Zaza Technologies. \"We're proud to see Promptly making a difference for thousands of educators, from Berlin to Brisbane.\" Teachers from over 15 countries are now using Promptly, with strong uptake in Germany, the United States, Australia, and the UK. The app's translation feature has also driven adoption in multilingual classrooms. Educator Mark Thompson from the UK explained: \"I've been teaching for 18 years and nothing has lifted the burden of admin like this. Promptly feels like a colleague who has my back.\" Try Promptly at zazapromptly.com",
      category: "Milestone",
      link: "/press/12k-teachers-milestone",
      featured: false,
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop",
      imageAlt: "Global network of teachers and students"
    },
    {
      title: "Why Teachers Choose Promptly Over ChatGPT for Classroom Communication",
      date: "August 20, 2025",
      summary: "FOR IMMEDIATE RELEASE - Saarbrücken, Germany – August 20, 2025 - While ChatGPT has exploded in popularity, teachers are increasingly turning to Zaza Promptly as their trusted AI communication tool. Designed specifically for education, Promptly goes beyond generic AI writing by providing safe, empathetic, and context-aware support for teachers writing to parents. Unlike open-ended AI tools, Zaza Promptly is purpose-built for classrooms, with safeguards to prevent inappropriate outputs, memory features that respect teacher context, and tone adjustments that balance professionalism with empathy. \"Generic AI tools weren't designed for the emotional and professional demands of parent communication,\" said Dr. Greg Blackburn, founder of Zaza Technologies. \"Promptly ensures teachers get safe, relevant, and supportive suggestions - not just generic text.\" Educator Linda Chen from the United States shared her experience: \"I tried ChatGPT before, but it often gave me vague or inappropriate responses. With Promptly, I know the suggestions are teacher-safe and parent-appropriate.\" Key reasons teachers choose Promptly over ChatGPT include education-specific safeguards (no hallucinations, safe responses), time savings (generate messages in minutes, not hours), professional tone controls for sensitive situations, and integration with Zaza's broader teacher tools (lesson planning, grading support). Learn more at zazapromptly.com",
      category: "Industry Analysis",
      link: "/blog/promptly-vs-chatgpt-teachers",
      featured: false,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      imageAlt: "AI technology comparison analysis"
    }
  ];

  const mediaKit = [
    { 
      name: "Zaza Promptly Logo Package", 
      type: "ZIP", 
      size: "2.4 MB",
      description: "High-res logos in multiple formats (PNG, SVG, EPS)",
      icon: Palette
    },
    { 
      name: "Founder Headshots", 
      type: "ZIP", 
      size: "8.1 MB",
      description: "Professional photos of Dr. Greg Blackburn",
      icon: ImageIcon
    },
    { 
      name: "Product Screenshots", 
      type: "ZIP", 
      size: "5.7 MB",
      description: "App interface and feature demonstrations",
      icon: ImageIcon
    },
    { 
      name: "Brand Guidelines", 
      type: "PDF", 
      size: "1.2 MB",
      description: "Complete brand identity and usage guidelines",
      icon: FileText
    },
    { 
      name: "Company Fact Sheet", 
      type: "PDF", 
      size: "0.8 MB",
      description: "Key statistics, timeline, and company overview",
      icon: FileText
    },
    { 
      name: "Press Release Templates", 
      type: "DOCX", 
      size: "0.5 MB",
      description: "Ready-to-use press release formats",
      icon: Newspaper
    }
  ];

  const companyStats = [
    { label: "Founded", value: "2023", icon: Calendar },
    { label: "Teachers Helped", value: "12,000+", icon: Users },
    { label: "Hours Saved Weekly", value: "5+", icon: Award },
    { label: "Languages Supported", value: "20+", icon: FileText },
    { label: "Messages Generated", value: "250K+", icon: Mail },
    { label: "Countries", value: "15+", icon: Award }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.06),transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 text-sm font-medium text-purple-700 dark:text-purple-300">
              <Newspaper className="w-4 h-4 mr-2" />
              Press & Media Center
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white leading-tight">
              Telling the Story of{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Teacher Empowerment</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Resources, news, and stories about Zaza Promptly's mission to give teachers their time back through purpose-built AI.
            </p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm font-semibold">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Users className="w-4 h-4 text-purple-600" />
                <span>12,000+ Teachers</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Founded by PhD Educator</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <FileText className="w-4 h-4 text-green-600" />
                <span>250K+ Messages Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-3xl p-8 md:p-12 text-center border border-purple-100 dark:border-purple-800/30">
              <Mail className="w-12 h-12 mx-auto mb-6 text-purple-600 dark:text-purple-400" />
              
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Media Inquiries
              </h2>
              
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                For press inquiries, founder interviews, product demonstrations, or partnership opportunities, our press team is ready to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  <a href="mailto:press@zazatechnologies.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Press Team
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#media-kit">
                    <Download className="w-4 h-4 mr-2" />
                    Download Media Kit
                  </a>
                </Button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-purple-200 dark:border-purple-700/50">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong>Response time:</strong> Typically within 24 hours • <strong>Available for:</strong> Interviews, demos, quotes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
                <Newspaper className="w-4 h-4 mr-2" />
                Latest News & Announcements
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Recent Press Coverage
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Stay updated with our latest product launches, milestones, and company news.
              </p>
            </div>
            
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className={`hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm ${release.featured ? 'ring-2 ring-purple-200 dark:ring-purple-800/50' : ''}`}>
                  <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-48 md:flex-shrink-0">
                      <div className="relative h-48 md:h-full">
                        <Image
                          src={release.image}
                          alt={release.imageAlt}
                          fill
                          className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant={release.featured ? 'default' : 'outline'} className={release.featured ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200' : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'}>
                                {release.category}
                              </Badge>
                              {release.featured && (
                                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-200">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl mb-3 text-slate-900 dark:text-white leading-tight">
                              {release.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                              <Calendar className="w-4 h-4" />
                              <span>{release.date}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild className="hover:bg-purple-50 dark:hover:bg-purple-950/20 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                            <a href={release.link}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Read Article
                            </a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{release.summary}</p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                <Newspaper className="w-4 h-4 mr-2" />
                View All Press Releases
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section id="media-kit" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 text-sm font-medium text-green-700 dark:text-green-300 mb-6">
                <Download className="w-4 h-4 mr-2" />
                Download Resources
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Media Kit & Brand Assets
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                High-quality logos, photos, and brand materials for media coverage and partnerships.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaKit.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 dark:text-white mb-2 leading-tight">{item.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                              {item.type} • {item.size}
                            </span>
                            <Button variant="outline" size="sm" className="hover:bg-purple-50 dark:hover:bg-purple-950/20 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Need something specific?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Can't find what you're looking for? Contact our press team for custom materials.
                </p>
                <Button variant="outline" className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                  <Mail className="w-4 h-4 mr-2" />
                  Request Custom Assets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 text-sm font-medium text-orange-700 dark:text-orange-300 mb-6">
                <Award className="w-4 h-4 mr-2" />
                Key Statistics
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Company at a Glance
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Key facts and figures about Zaza Promptly's impact on education.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {companyStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 leading-tight">{stat.label}</div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-3xl p-8 md:p-12 text-center border border-purple-100 dark:border-purple-800/30">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Founded by Professionals, for Professionals
              </h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Dr. Greg Blackburn founded Zaza Technologies after recognizing that professionals across all industries face the same challenge: too much time on administrative tasks, not enough time for meaningful work. With 20+ years of experience in corporate learning and development, he built AI tools that understand the nuances of professional communication across different contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl leading-tight">
              Ready to Tell Our Story?
            </h2>
            <p className="text-xl md:text-2xl opacity-95 leading-relaxed max-w-3xl mx-auto">
              We're passionate about sharing insights on AI in education, teacher empowerment, and the future of classroom technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <a href="mailto:press@zazatechnologies.com" className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Press Team
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 backdrop-blur font-semibold transition-all duration-300">
                <a href="#media-kit" className="flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Download Media Kit
                </a>
              </Button>
            </div>
            
            <div className="pt-8">
              <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mb-6"></div>
              <p className="text-lg opacity-75">
                <strong>Available for:</strong> Interviews • Product Demos • Expert Commentary • Partnership Discussions
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}