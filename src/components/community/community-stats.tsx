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
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30'
    },
    {
      icon: BookOpen,
      label: 'Resources Shared',
      value: 5892,
      displayValue: '5,892',
      change: '+8%',
      changeType: 'positive' as const,
      caption: 'templates, lessons & tools',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: 52341,
      displayValue: '52,341',
      change: '+15%',
      changeType: 'positive' as const,
      caption: 'resources helping educators',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: 4.8,
      displayValue: '4.8',
      change: '+0.2',
      changeType: 'positive' as const,
      caption: 'quality you can trust',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30',
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
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30'
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: 2847,
      displayValue: '2,847h',
      change: '+23%',
      changeType: 'positive' as const,
      caption: 'freed up for teaching',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30'
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
        className="text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 group relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-slate-200/60 dark:border-slate-700/60 hover:border-transparent shadow-lg"
        style={{ 
          animationDelay: `${index * 0.1}s`,
          transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
          opacity: isInView ? 1 : 0,
          transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
        }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
        
        {/* Animated border gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-500`} />
        
        <CardContent className="p-8 relative">
          <div className="flex justify-center mb-6">
            <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-xl group-hover:shadow-2xl`}>
              <stat.icon className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
          </div>
          
          <div className="text-4xl font-black text-slate-900 dark:text-white mb-2 group-hover:scale-105 transition-transform duration-300">
            {stat.isDecimal ? animatedValue : animatedValue}{stat.displayValue.includes('h') ? 'h' : ''}
          </div>
          
          <div className="text-base font-bold text-slate-600 dark:text-slate-300 mb-3">
            {stat.label}
          </div>
          
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 italic">
            {stat.caption}
          </div>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-md ${
            stat.changeType === 'positive' 
              ? 'text-emerald-700 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/40 border-2 border-emerald-200 dark:border-emerald-700/50' 
              : 'text-red-700 dark:text-red-200 bg-red-100 dark:bg-red-900/40 border-2 border-red-200 dark:border-red-700/50'
          } group-hover:scale-105 transition-transform duration-300`}>
            <TrendingUp className="h-3 w-3" />
            {stat.change} this month
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-purple-950/20 dark:to-blue-950/20 relative overflow-hidden border-t-4 border-purple-200 dark:border-purple-800">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.04),transparent_60%)]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative" ref={elementRef}>
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border-2 border-purple-200 dark:border-purple-700/50 text-base font-bold text-purple-700 dark:text-purple-300 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <TrendingUp className="w-5 h-5 mr-2" />
            Global Community Impact
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Making a Difference
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed">
            See how our global community of educators is transforming classrooms and saving precious time
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
        
        {/* Featured Contributors */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 border-2 border-amber-200 dark:border-amber-700/50 text-base font-bold text-amber-700 dark:text-amber-300 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Award className="w-5 h-5 mr-2" />
              Community Spotlight
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Top Contributors
              </span>
            </h3>
            <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Meet the incredible educators who are leading our community and inspiring thousands of teachers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Elementary Teacher',
                speciality: 'Literacy & Reading Comprehension',
                bio: 'Passionate about making reading accessible and fun for all learners',
                contributions: 47,
                downloads: 1247,
                rating: 4.9,
                avatar: '/images/avatars/sarah-j.jpg',
                avatarFallback: 'SJ',
                gradient: 'from-purple-500 to-pink-500',
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
                avatar: '/images/avatars/michael-c.jpg',
                avatarFallback: 'MC',
                gradient: 'from-blue-500 to-cyan-500',
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
                avatar: '/images/avatars/emma-r.jpg',
                avatarFallback: 'ER',
                gradient: 'from-emerald-500 to-teal-500',
                testimonial: '"These tools have been game-changing for creating individualized communication plans that truly serve my diverse learners."',
                achievements: ['Accessibility Champion', 'Rising Star Educator'],
                joinDate: 'April 2024'
              }
            ].map((contributor, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-2xl hover:-translate-y-6 transition-all duration-700 group relative overflow-hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-2 border-slate-200/60 dark:border-slate-700/60 hover:border-transparent shadow-xl rounded-3xl"
                style={{ 
                  transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                  opacity: isInView ? 1 : 0,
                  transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${(index + 3) * 0.2}s`
                }}
              >
                {/* Enhanced gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${contributor.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-3xl`} />
                
                <CardContent className="p-10 relative">
                  {/* Profile Image/Avatar */}
                  <div className="relative mb-8">
                    <div className={`w-28 h-28 bg-gradient-to-br ${contributor.gradient} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-2xl ring-4 ring-white dark:ring-slate-800 group-hover:shadow-3xl relative overflow-hidden`}>
                      {contributor.avatar ? (
                        <img 
                          src={contributor.avatar} 
                          alt={contributor.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-white drop-shadow-lg">
                          {contributor.avatarFallback}
                        </span>
                      )}
                    </div>
                    {/* Achievement badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-white dark:group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                        {contributor.name}
                      </h4>
                      <p className="text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
                        {contributor.role}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 font-semibold">
                        {contributor.speciality}
                      </p>
                    </div>
                    
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic font-medium">
                      {contributor.bio}
                    </p>
                    
                    {/* Testimonial */}
                    <div className="bg-slate-50 dark:bg-slate-700/40 rounded-2xl p-4 border-l-4 border-purple-400 dark:border-purple-500">
                      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                        {contributor.testimonial}
                      </p>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 py-4">
                      <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors group/stat">
                        <BookOpen className="h-6 w-6 mx-auto text-slate-600 dark:text-slate-400 mb-2 group-hover/stat:text-purple-600 dark:group-hover/stat:text-purple-400 transition-colors" />
                        <div className="text-xl font-bold text-slate-900 dark:text-white">
                          {useAnimatedCounter(contributor.contributions, isInView, { duration: 1500 + (index * 300) })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Resources</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors group/stat">
                        <Download className="h-6 w-6 mx-auto text-slate-600 dark:text-slate-400 mb-2 group-hover/stat:text-green-600 dark:group-hover/stat:text-green-400 transition-colors" />
                        <div className="text-xl font-bold text-slate-900 dark:text-white">
                          {useAnimatedCounter(contributor.downloads, isInView, { duration: 1500 + (index * 300) })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Downloads</div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-colors group/stat">
                        <Star className="h-6 w-6 mx-auto fill-yellow-400 text-yellow-400 mb-2 group-hover/stat:scale-110 transition-transform" />
                        <div className="text-xl font-bold text-slate-900 dark:text-white">
                          {useAnimatedCounter(contributor.rating, isInView, { duration: 1500 + (index * 300), decimals: 1 })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 font-semibold">Rating</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-md">
                        View Profile
                      </button>
                      <button className={`flex-1 bg-gradient-to-r ${contributor.gradient} hover:shadow-lg hover:scale-105 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300`}>
                        See Resources
                      </button>
                    </div>
                    
                    {/* Join date */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700 font-medium">
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
