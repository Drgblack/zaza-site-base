'use client';

import React, { useState, useEffect } from 'react';
import { BlogFilter, TeacherBlogPost } from '@/lib/blog/teacher-blog-types';
import TeacherBlogCard from '@/components/blog/teacher-blog-card';
import TeacherBlogFilters from '@/components/blog/teacher-blog-filters';
import { Star, TrendingUp, BookOpen, Clock } from 'lucide-react';

interface TeacherBlogPageClientProps {
  locale: string;
  initialPosts: TeacherBlogPost[];
  availableFilters: {
    subjects: Array<{ value: any; label: string; count: number }>;
    gradeBands: Array<{ value: any; label: string; count: number }>;
    contentTypes: Array<{ value: any; label: string; count: number }>;
  };
}

export default function TeacherBlogPageClient({ 
  locale, 
  initialPosts, 
  availableFilters 
}: TeacherBlogPageClientProps) {
  const [posts] = useState<TeacherBlogPost[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<TeacherBlogPost[]>(initialPosts);
  const [currentFilter, setCurrentFilter] = useState<BlogFilter>({
    subjects: [],
    gradeBands: [],
    contentTypes: [],
    readingTime: []
  });
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // Load saved posts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedTeacherBlogPosts');
    if (saved) {
      setSavedPosts(JSON.parse(saved));
    }
  }, []);

  // Apply filters client-side
  useEffect(() => {
    let filtered = posts;
    
    if (currentFilter.subjects.length > 0) {
      filtered = filtered.filter(post => 
        post.subjects.some(subject => currentFilter.subjects.includes(subject))
      );
    }
    
    if (currentFilter.gradeBands.length > 0) {
      filtered = filtered.filter(post => 
        post.gradeBands.some(grade => currentFilter.gradeBands.includes(grade))
      );
    }
    
    if (currentFilter.contentTypes.length > 0) {
      filtered = filtered.filter(post => 
        currentFilter.contentTypes.includes(post.contentType)
      );
    }
    
    if (currentFilter.readingTime.length > 0) {
      filtered = filtered.filter(post => 
        currentFilter.readingTime.includes(post.readingTimeCategory)
      );
    }
    
    if (currentFilter.hasDownloads) {
      filtered = filtered.filter(post => post.downloads.length > 0);
    }
    
    if (currentFilter.searchQuery) {
      const query = currentFilter.searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.keyTakeaways.some(takeaway => takeaway.toLowerCase().includes(query))
      );
    }

    // Sort by featured first, then by date (newest first)
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    setFilteredPosts(filtered);
  }, [currentFilter, posts]);

  const handleFilterChange = (filter: BlogFilter) => {
    setCurrentFilter(filter);
  };

  const handleSavePost = (postId: string) => {
    const updated = savedPosts.includes(postId)
      ? savedPosts.filter(id => id !== postId)
      : [...savedPosts, postId];
    
    setSavedPosts(updated);
    localStorage.setItem('savedTeacherBlogPosts', JSON.stringify(updated));
  };

  const handleAddToClassroom = (post: any) => {
    // This would integrate with Google Classroom API
    console.log('Adding to classroom:', post);
    // Show success toast
    alert(`"${post.title}" added to Google Classroom!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading educational resources...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-red-600 mb-4">⚠️ Error</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const featuredPosts = filteredPosts.filter(post => post.featured).slice(0, 3);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Teacher Resources & AI Insights
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Save time, teach better, and stay ahead with practical guides and AI-powered strategies for modern educators.
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{posts.length}+</div>
                <div className="text-sm opacity-75">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{availableFilters?.subjects?.length || 0}</div>
                <div className="text-sm opacity-75">Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{availableFilters?.gradeBands?.length || 0}</div>
                <div className="text-sm opacity-75">Grade Bands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0 sec</div>
                <div className="text-sm opacity-75">Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <TeacherBlogFilters
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        availableFilters={availableFilters}
        totalResults={filteredPosts.length}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-orange-500 fill-current" />
              <h2 className="text-2xl font-bold text-gray-900">Featured for This Week</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredPosts.map((post) => (
                <TeacherBlogCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  onSave={handleSavePost}
                  onAddToClassroom={handleAddToClassroom}
                  savedPosts={savedPosts}
                />
              ))}
            </div>
          </section>
        )}

        {/* Main Results */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {currentFilter.subjects.length > 0 || currentFilter.gradeBands.length > 0 || currentFilter.searchQuery
                  ? 'Filtered Results'
                  : 'Latest Resources'}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                <option>Most Recent</option>
                <option>Most Useful</option>
                <option>Most Saved</option>
                <option>Quick Reads First</option>
              </select>
            </div>
          </div>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <TeacherBlogCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  onSave={handleSavePost}
                  onAddToClassroom={handleAddToClassroom}
                  savedPosts={savedPosts}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <button
                onClick={() => setCurrentFilter({
                  subjects: [],
                  gradeBands: [],
                  contentTypes: [],
                  readingTime: []
                })}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Saved Posts Summary */}
        {savedPosts.length > 0 && (
          <section className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-indigo-900 mb-1">
                  Your Teaching Toolkit
                </h3>
                <p className="text-indigo-700">
                  You have {savedPosts.length} saved {savedPosts.length === 1 ? 'resource' : 'resources'} ready to implement.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors">
                  View Saved
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Export to Drive
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}