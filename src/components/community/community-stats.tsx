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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Impact</h2>
          <p className="text-gray-600 text-lg">
            See how our global community of educators is making a difference
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group netflix-card-hover border-gradient animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <stat.icon className="h-8 w-8 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
                  </div>
                </div>
                <div className="text-3xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">
                  {stat.label}
                </div>
                <div className={`text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 ${
                  stat.changeType === 'positive' 
                    ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30' 
                    : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30'
                }`}>
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} this month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Contributors */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Top Contributors</h3>
            <p className="text-gray-600">
              Educators making the biggest impact in our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'Elementary Teacher',
                contributions: 47,
                downloads: 1247,
                rating: 4.9,
                avatar: 'SJ'
              },
              {
                name: 'Michael Chen',
                role: 'High School Teacher',
                contributions: 32,
                downloads: 892,
                rating: 4.8,
                avatar: 'MC'
              },
              {
                name: 'Emma Rodriguez',
                role: 'Special Education',
                contributions: 28,
                downloads: 567,
                rating: 4.7,
                avatar: 'ER'
              }
            ].map((contributor, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group netflix-card-hover animate-fade-in"
                style={{ animationDelay: `${(index + 6) * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg ring-4 ring-purple-50 dark:ring-purple-900/20">
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {contributor.avatar}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{contributor.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{contributor.role}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{contributor.contributions}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{contributor.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{contributor.rating}</span>
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
