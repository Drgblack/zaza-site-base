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
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className={`text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="h-3 w-3 inline mr-1" />
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
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-purple-600">
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
