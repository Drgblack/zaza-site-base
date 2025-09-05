"use client";
import { TrendingUp, BookOpen, Clock, Users, Award, Target } from 'lucide-react';

interface BlogStatsProps {
  totalPosts: number;
  categories: number;
  avgReadTime: number;
}

export default function BlogStats({ totalPosts, categories, avgReadTime }: BlogStatsProps) {
  const stats = [
    {
      icon: BookOpen,
      value: totalPosts.toLocaleString(),
      label: 'Expert Articles',
      description: 'Teacher-tested strategies',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Target,
      value: categories.toString(),
      label: 'Topic Areas',
      description: 'From AI tools to parent communication',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Clock,
      value: `${avgReadTime}m`,
      label: 'Avg Read Time',
      description: 'Quick, actionable insights',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Users,
      value: '10K+',
      label: 'Educators',
      description: 'Trust our content',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: TrendingUp,
      value: '3-5h',
      label: 'Time Saved',
      description: 'Per week with our tips',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Success Rate',
      description: 'Teachers see improvements',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Trusted by Educators Worldwide
        </h2>
        <p className="text-sm text-gray-600">
          Real results from real classrooms
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            
            <div className="mb-2">
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-900">
                {stat.label}
              </div>
            </div>
            
            <div className="text-xs text-gray-600 leading-tight">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          Statistics based on user feedback and engagement data from the past 12 months
        </p>
      </div>
    </div>
  );
}