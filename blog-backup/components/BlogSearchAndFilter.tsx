"use client";
import { useState, useMemo } from 'react';
import { Search, Filter, X, Clock, TrendingUp, BookOpen, Users } from 'lucide-react';
import type { Blog2Post } from "@/lib/blog2.server";

interface BlogSearchAndFilterProps {
  posts: Blog2Post[];
  onFilteredPosts: (posts: Blog2Post[]) => void;
}

const categories = [
  'All',
  'AI Tools',
  'Teacher Tips',
  'Productivity',
  'Parent Communication',
  'Classroom Management',
  'Assessment',
  'Professional Development'
];

const readingTimes = [
  { label: 'All', value: 'all' },
  { label: '5 min or less', value: '5', icon: Clock },
  { label: '5-10 min', value: '10', icon: BookOpen },
  { label: '10+ min', value: '15', icon: TrendingUp }
];

export default function BlogSearchAndFilter({ posts, onFilteredPosts }: BlogSearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReadingTime, setSelectedReadingTime] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.description?.toLowerCase().includes(term) ||
        post.category?.toLowerCase().includes(term) ||
        post.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => 
        post.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by reading time
    if (selectedReadingTime !== 'all') {
      const maxTime = parseInt(selectedReadingTime);
      filtered = filtered.filter(post => {
        const readTime = parseInt(post.readingTime || '5');
        return readTime <= maxTime;
      });
    }

    return filtered;
  }, [posts, searchTerm, selectedCategory, selectedReadingTime]);

  // Update parent component when filters change
  useMemo(() => {
    onFilteredPosts(filteredPosts);
  }, [filteredPosts, onFilteredPosts]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedReadingTime('all');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedReadingTime !== 'all';

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles, tips, and strategies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        <div className="text-sm text-gray-600">
          {filteredPosts.length} of {posts.length} articles
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-6 p-4 bg-gray-50 rounded-xl">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Topics</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Reading Time */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Reading Time</h4>
            <div className="flex flex-wrap gap-2">
              {readingTimes.map((time) => {
                const Icon = time.icon;
                return (
                  <button
                    key={time.value}
                    onClick={() => setSelectedReadingTime(time.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedReadingTime === time.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {time.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          {searchTerm && (
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              <Search className="w-3 h-3" />
              <span>"{searchTerm}"</span>
              <button onClick={() => setSearchTerm('')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {selectedCategory !== 'All' && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              <BookOpen className="w-3 h-3" />
              <span>{selectedCategory}</span>
              <button onClick={() => setSelectedCategory('All')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          
          {selectedReadingTime !== 'all' && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              <Clock className="w-3 h-3" />
              <span>≤{selectedReadingTime} min</span>
              <button onClick={() => setSelectedReadingTime('all')}>
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && hasActiveFilters && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No articles match your filters
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or removing some filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}