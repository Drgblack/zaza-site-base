'use client';

import { useState, useEffect } from 'react';
import { getAnalyticsData, AnalyticsData } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Clock, 
  TrendingUp,
  Award,
  Calendar,
  Download,
  MessageCircle,
  Star
} from 'lucide-react';

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await getAnalyticsData();
        setAnalytics(data);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load analytics data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Platform usage and performance metrics
          </p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
          <TrendingUp className="h-3 w-3 mr-1" />
          Live Data
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(analytics.totalUsers)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Snippets Generated</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(analytics.totalSnippets)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Saved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatTime(analytics.totalTimeSaved)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Time/Snippet</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {analytics.totalSnippets > 0 
                    ? formatTime(Math.round(analytics.totalTimeSaved / analytics.totalSnippets))
                    : '0m'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Tones and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Popular Tones
            </CardTitle>
            <CardDescription>
              Most frequently used communication tones
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.popularTones.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No tone data available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {analytics.popularTones.map((tone, index) => (
                  <div key={tone.tone} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {tone.tone}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      {tone.count} uses
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Popular Categories
            </CardTitle>
            <CardDescription>
              Most frequently used snippet categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.popularCategories.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No category data available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {analytics.popularCategories.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {category.category}
                      </span>
                    </div>
                    <Badge variant="secondary">
                      {category.count} uses
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Stats Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Trends
          </CardTitle>
          <CardDescription>
            Usage patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Monthly analytics coming soon
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Track usage trends, growth patterns, and seasonal variations
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Snippets Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Performing Snippets
          </CardTitle>
          <CardDescription>
            Most used and highest-rated snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Top snippets analytics coming soon
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Discover the most popular and effective communication templates
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
