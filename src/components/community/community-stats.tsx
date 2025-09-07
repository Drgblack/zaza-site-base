'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { 
  Users, 
  BookOpen, 
  Download, 
  TrendingUp,
  Star,
  Award,
  Globe,
  Clock,
  Heart,
  MessageCircle
} from 'lucide-react';

export function CommunityStats() {
  const { elementRef, isInView } = useIntersectionObserver({ threshold: 0.2 });

  const stats = [
    {
      icon: Users,
      label: 'Active Teachers',
      value: 10247,
      displayValue: '10,247',
      change: '+12%',
      changeType: 'positive' as const,
      caption: 'supporting classrooms worldwide',
      iconColor: 'from-purple-400 to-pink-400',
      bgColor: 'from-purple-50/40 via-pink-50/30 to-slate-50/60 dark:from-purple-950/15 dark:via-pink-950/10 dark:to-slate-950/20'
    },
    {
      icon: BookOpen,
      label: 'Resources Shared',
      value: 5892,
      displayValue: '5,892',
      change: '+8%',
      changeType: 'positive' as const,
      caption: 'templates, lessons & tools',
      iconColor: 'from-pink-400 to-rose-400',
      bgColor: 'from-pink-50/40 via-rose-50/30 to-slate-50/60 dark:from-pink-950/15 dark:via-rose-950/10 dark:to-slate-950/20'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: 52341,
      displayValue: '52,341',
      change: '+15%',
      changeType: 'positive' as const,
      caption: 'resources helping educators',
      iconColor: 'from-purple-400 to-indigo-400',
      bgColor: 'from-purple-50/40 via-indigo-50/30 to-slate-50/60 dark:from-purple-950/15 dark:via-indigo-950/10 dark:to-slate-950/20'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: 4.8,
      displayValue: '4.8',
      change: '+0.2',
      changeType: 'positive' as const,
      caption: 'quality you can trust',
      iconColor: 'from-pink-400 to-purple-400',
      bgColor: 'from-pink-50/40 via-purple-50/30 to-slate-50/60 dark:from-pink-950/15 dark:via-purple-950/10 dark:to-slate-950/20',
      isDecimal: true
    },
    {
      icon: Globe,
      label: 'Countries',
      value: 47,
      displayValue: '47',
      change: '+3',
      changeType: 'positive' as const,
      caption: 'global teaching community',
      iconColor: 'from-indigo-400 to-purple-400',
      bgColor: 'from-indigo-50/40 via-purple-50/30 to-slate-50/60 dark:from-indigo-950/15 dark:via-purple-950/10 dark:to-slate-950/20'
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: 2847,
      displayValue: '2,847h',
      change: '+23%',
      changeType: 'positive' as const,
      caption: 'freed up for teaching',
      iconColor: 'from-purple-400 to-pink-400',
      bgColor: 'from-purple-50/40 via-pink-50/30 to-slate-50/60 dark:from-purple-950/15 dark:via-pink-950/10 dark:to-slate-950/20'
    }
  ];

  const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
    const animatedValue = useAnimatedCounter(
      stat.isDecimal ? stat.value : Math.floor(stat.value), 
      isInView, 
      { 
        duration: 2000 + (index * 200),
        decimals: stat.isDecimal ? 1 : 0
      }
    );

    return (
      <Card 
        className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-purple-200/30 dark:border-purple-700/30 hover:border-purple-300/50 dark:hover:border-purple-600/50 shadow-sm"
        style={{ 
          animationDelay: `${index * 0.1}s`,
          transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          opacity: isInView ? 1 : 0,
          transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
        }}
      >
        {/* Subtle gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-60 group-hover:opacity-80 transition-all duration-500`} />
        
        {/* Soft border highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-pink-200/20 to-purple-200/20 dark:from-purple-700/10 dark:via-pink-700/10 dark:to-purple-700/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500" />
        
        <CardContent className="p-6 md:p-8 relative">
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 md:w-18 md:h-18 bg-gradient-to-br ${stat.iconColor} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-lg ring-1 ring-white/20 dark:ring-slate-700/30`}>
              <stat.icon className="h-8 w-8 md:h-9 md:w-9 text-white drop-shadow-sm" />
            </div>
          </div>
          
          <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 group-hover:scale-102 transition-transform duration-300">
            {stat.isDecimal ? animatedValue : animatedValue}{stat.displayValue.includes('h') ? 'h' : ''}
          </div>
          
          <div className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 mb-3">
            {stat.label}
          </div>
          
          <div className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-4 italic font-medium">
            {stat.caption}
          </div>
          
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
            stat.changeType === 'positive' 
              ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/30 border border-emerald-200/60 dark:border-emerald-700/40' 
              : 'text-red-700 dark:text-red-300 bg-red-100/70 dark:bg-red-900/30 border border-red-200/60 dark:border-red-700/40'
          } group-hover:scale-105 transition-transform duration-300`}>
            <TrendingUp className="h-3 w-3" />
            {stat.change} this month
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50/40 via-pink-50/30 to-slate-50/50 dark:from-purple-950/20 dark:via-pink-950/15 dark:to-slate-900/80 relative overflow-hidden border-t border-purple-200/40 dark:border-purple-800/40">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.04),transparent_60%)]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative" ref={elementRef}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100/70 to-pink-100/70 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200/50 dark:border-purple-700/40 text-base font-bold text-purple-700 dark:text-purple-300 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm">
            <TrendingUp className="w-5 h-5 mr-2" />
            Global Community Impact
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
              Making a Difference
            </span>
          </h2>
          <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-4xl mx-auto font-medium leading-relaxed">
            See how our global community of educators is transforming classrooms and saving precious time
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
        
        {/* Featured Contributors */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-100/70 to-purple-100/70 dark:from-pink-900/30 dark:to-purple-900/30 border border-pink-200/50 dark:border-pink-700/40 text-base font-bold text-pink-700 dark:text-pink-300 mb-8 shadow-sm hover:shadow-md transition-shadow duration-300 backdrop-blur-sm">
              <Award className="w-5 h-5 mr-2" />
              Community Spotlight
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-slate-900 dark:text-white">
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                Top Contributors
              </span>
            </h3>
            <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Meet the incredible educators who are leading our community and inspiring thousands of teachers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Elementary Teacher',
                speciality: 'Literacy & Reading Comprehension',
                bio: 'Passionate about making reading accessible and fun for all learners',
                contributions: 47,
                downloads: 1247,
                rating: 4.9,
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
                avatarFallback: 'SJ',
                gradient: 'from-purple-400 to-pink-400',
                testimonial: '"Zaza Promptly has revolutionized how I communicate with parents. What used to take me hours now takes minutes, and the quality has never been better."',
                achievements: ['Most Downloaded Resource 2024', 'Community Choice Award'],
                joinDate: 'March 2024'
              },
              {
                name: 'Michael Chen',
                role: 'High School Math Teacher',
                speciality: 'STEM & Problem-Based Learning',
                bio: 'Building mathematical confidence through innovative teaching methods',
                contributions: 32,
                downloads: 892,
                rating: 4.8,
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
                avatarFallback: 'MC',
                gradient: 'from-purple-400 to-indigo-400',
                testimonial: '"The AI tools help me create personalized feedback for each student, making math feel more approachable and less intimidating."',
                achievements: ['Innovation in Teaching Award', 'Top Educator 2024'],
                joinDate: 'January 2024'
              },
              {
                name: 'Emma Rodriguez',
                role: 'Special Education Coordinator',
                speciality: 'Inclusive Learning & Accessibility',
                bio: 'Advocating for every student\'s right to quality education',
                contributions: 28,
                downloads: 567,
                rating: 4.7,
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                avatarFallback: 'ER',
                gradient: 'from-pink-400 to-purple-400',
                testimonial: '"These tools have been game-changing for creating individualized communication plans that truly serve my diverse learners."',
                achievements: ['Accessibility Champion', 'Rising Star Educator'],
                joinDate: 'April 2024'
              }
            ].map((contributor, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-lg hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-purple-200/40 dark:border-purple-700/40 hover:border-purple-300/60 dark:hover:border-purple-600/60 shadow-sm rounded-2xl"
                style={{ 
                  transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                  opacity: isInView ? 1 : 0,
                  transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${(index + 3) * 0.2}s`
                }}
              >
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pink-50/40 to-slate-50/60 dark:from-purple-950/20 dark:via-pink-950/15 dark:to-slate-950/30 opacity-70 group-hover:opacity-90 transition-all duration-500 rounded-2xl`} />
                
                <CardContent className="p-8 md:p-10 relative">
                  {/* Profile Image/Avatar */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 md:w-28 md:h-28 mx-auto group-hover:scale-105 transition-all duration-500 relative">
                      <div className="w-full h-full rounded-full ring-3 ring-white/60 dark:ring-slate-700/60 shadow-lg overflow-hidden">
                        <img 
                          src={contributor.avatar} 
                          alt={`${contributor.name} - ${contributor.role}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {/* Subtle achievement indicator */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-800">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-700 group-hover:to-pink-700 dark:group-hover:from-purple-300 dark:group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                        {contributor.name}
                      </h4>
                      <p className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-200 mb-1">
                        {contributor.role}
                      </p>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 font-semibold">
                        {contributor.speciality}
                      </p>
                    </div>
                    
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic font-medium">
                      {contributor.bio}
                    </p>
                    
                    {/* Testimonial */}
                    <div className="bg-white/60 dark:bg-slate-700/30 rounded-xl p-4 border-l-3 border-purple-300/60 dark:border-purple-600/60 backdrop-blur-sm">
                      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {contributor.testimonial}
                      </p>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3 py-4">
                      <div className="text-center p-2 md:p-3 bg-white/50 dark:bg-slate-700/30 rounded-lg hover:bg-white/70 dark:hover:bg-slate-700/40 transition-colors group/stat backdrop-blur-sm">
                        <BookOpen className="h-5 w-5 md:h-6 md:w-6 mx-auto text-purple-500 dark:text-purple-400 mb-2 group-hover/stat:text-pink-500 dark:group-hover/stat:text-pink-400 transition-colors" />
                        <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                          {useAnimatedCounter(contributor.contributions, isInView, { duration: 1500 + (index * 300) })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Resources</div>
                      </div>
                      <div className="text-center p-2 md:p-3 bg-white/50 dark:bg-slate-700/30 rounded-lg hover:bg-white/70 dark:hover:bg-slate-700/40 transition-colors group/stat backdrop-blur-sm">
                        <Download className="h-5 w-5 md:h-6 md:w-6 mx-auto text-purple-500 dark:text-purple-400 mb-2 group-hover/stat:text-pink-500 dark:group-hover/stat:text-pink-400 transition-colors" />
                        <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                          {useAnimatedCounter(contributor.downloads, isInView, { duration: 1500 + (index * 300) })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Downloads</div>
                      </div>
                      <div className="text-center p-2 md:p-3 bg-white/50 dark:bg-slate-700/30 rounded-lg hover:bg-white/70 dark:hover:bg-slate-700/40 transition-colors group/stat backdrop-blur-sm">
                        <Star className="h-5 w-5 md:h-6 md:w-6 mx-auto fill-yellow-400 text-yellow-400 mb-2 group-hover/stat:scale-110 transition-transform" />
                        <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                          {useAnimatedCounter(contributor.rating, isInView, { duration: 1500 + (index * 300), decimals: 1 })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Rating</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 md:gap-3 pt-4">
                      <button className="flex-1 bg-gradient-to-r from-white/70 to-slate-50/70 dark:from-slate-700/60 dark:to-slate-600/60 hover:from-white/90 hover:to-slate-50/90 dark:hover:from-slate-600/70 dark:hover:to-slate-500/70 text-slate-700 dark:text-slate-200 px-3 md:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-sm backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30">
                        View Profile
                      </button>
                      <button className={`flex-1 bg-gradient-to-r ${contributor.gradient} hover:shadow-md hover:scale-102 text-white px-3 md:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300`}>
                        See Resources
                      </button>
                    </div>
                    
                    {/* Join date */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-purple-200/40 dark:border-purple-700/40 font-medium">
                      Community member since {contributor.joinDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
