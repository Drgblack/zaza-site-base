'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  Download, 
  TrendingUp,
  Star,
  Award,
  Globe,
  Clock
} from 'lucide-react';

export function CommunityStats() {
  const stats = [
    {
      icon: Users,
      label: 'Active Teachers',
      value: '10,247',
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: BookOpen,
      label: 'Resources Shared',
      value: '5,892',
      change: '+8%',
      changeType: 'positive'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: '52,341',
      change: '+15%',
      changeType: 'positive'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive'
    },
    {
      icon: Globe,
      label: 'Countries',
      value: '47',
      change: '+3',
      changeType: 'positive'
    },
    {
      icon: Clock,
      label: 'Time Saved',
      value: '2,847h',
      change: '+23%',
      changeType: 'positive'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-purple-950/20 dark:to-blue-950/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.04),transparent_60%)]" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border border-purple-200 dark:border-purple-700/50 text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Global Community Stats
          </div>
          <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Community Impact
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xl max-w-3xl mx-auto font-medium">
            See how our global community of educators is making a difference
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 animate-fade-in hover:border-purple-300 dark:hover:border-purple-600"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-6 relative">
                <div className="flex justify-center mb-4">
                  <div className="w-18 h-18 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg ring-4 ring-slate-50 dark:ring-slate-900/20 group-hover:shadow-xl">
                    <stat.icon className="h-9 w-9 text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-3 font-semibold">
                  {stat.label}
                </div>
                <div className={`text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1 shadow-sm ${
                  stat.changeType === 'positive' 
                    ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50' 
                    : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50'
                }`}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} this month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Contributors */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 border border-amber-200 dark:border-amber-700/50 text-sm font-medium text-amber-700 dark:text-amber-300 mb-6">
              <Award className="w-4 h-4 mr-2" />
              Community Leaders
            </div>
            <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Top Contributors</h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Educators making the biggest impact in our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Elementary Teacher',
                contributions: 47,
                downloads: 1247,
                rating: 4.9,
                avatar: 'SJ',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                name: 'Michael Chen',
                role: 'High School Teacher',
                contributions: 32,
                downloads: 892,
                rating: 4.8,
                avatar: 'MC',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                name: 'Emma Rodriguez',
                role: 'Special Education',
                contributions: 28,
                downloads: 567,
                rating: 4.7,
                avatar: 'ER',
                gradient: 'from-emerald-500 to-teal-500'
              }
            ].map((contributor, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 group relative overflow-hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 animate-fade-in hover:border-slate-300 dark:hover:border-slate-600"
                style={{ animationDelay: `${(index + 6) * 0.15}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${contributor.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardContent className="p-8 relative">
                  <div className={`w-20 h-20 bg-gradient-to-br ${contributor.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl ring-4 ring-white dark:ring-slate-800 group-hover:shadow-2xl`}>
                    <span className="text-2xl font-bold text-white">
                      {contributor.avatar}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-100 transition-colors">{contributor.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 font-medium">{contributor.role}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <BookOpen className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      <span className="font-bold text-slate-900 dark:text-white">{contributor.contributions}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Resources</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <Download className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      <span className="font-bold text-slate-900 dark:text-white">{contributor.downloads}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Downloads</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-slate-900 dark:text-white">{contributor.rating}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Rating</span>
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
