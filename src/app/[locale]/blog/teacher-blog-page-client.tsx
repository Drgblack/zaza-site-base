'use client';

import React, { useState, useEffect } from 'react';
import { BlogFilter } from '@/lib/blog/teacher-blog-types';
import { getAllTeacherBlogPosts, getFilterOptions } from '@/lib/blog/teacher-blog-service';
import TeacherBlogCard from '@/components/blog/teacher-blog-card';
import TeacherBlogFilters from '@/components/blog/teacher-blog-filters';
import { Star, TrendingUp, BookOpen, Clock } from 'lucide-react';

interface TeacherBlogPageClientProps {
  locale: string;
}

export default function TeacherBlogPageClient({ locale }: TeacherBlogPageClientProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [availableFilters, setAvailableFilters] = useState<any>({
    subjects: [],
    gradeBands: [],
    contentTypes: []
  });
  const [currentFilter, setCurrentFilter] = useState<BlogFilter>({
    subjects: [],
    gradeBands: [],
    contentTypes: [],
    readingTime: []
  });
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [allPosts, filterOptions] = await Promise.all([
          getAllTeacherBlogPosts(),
          getFilterOptions()
        ]);
        
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        setAvailableFilters(filterOptions);
      } catch (err) {
        console.error('Error loading blog data:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Load saved posts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedTeacherBlogPosts');
    if (saved) {
      setSavedPosts(JSON.parse(saved));
    }
  }, []);

  // Apply filters
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filtered = await getAllTeacherBlogPosts(currentFilter);
        setFilteredPosts(filtered);
      } catch (err) {
        console.error('Error applying filters:', err);
      }
    };

    applyFilters();
  }, [currentFilter]);

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
                <div className="text-2xl font-bold">{availableFilters.subjects.length}</div>
                <div className="text-sm opacity-75">Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{availableFilters.gradeBands.length}</div>
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