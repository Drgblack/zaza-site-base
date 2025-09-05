'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { BlogPost, BlogFilter } from '@/lib/blog/types';
import { filterPosts, sortPosts } from '@/lib/blog/utils';
import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';

interface BlogGridProps {
  posts: BlogPost[];
  filters?: BlogFilter;
}

export default function BlogGrid({ posts, filters: initialFilters = {} }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
  const [activeFilters, setActiveFilters] = useState<BlogFilter>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readingTime'>('date');

  // Apply filters and sorting
  const filteredPosts = useMemo(() => {
    const filtered = filterPosts(posts, {
      ...activeFilters,
      search: searchQuery
    });
    return sortPosts(filtered, sortBy, 'desc');
  }, [posts, activeFilters, searchQuery, sortBy]);

  const handleFilterChange = (newFilters: BlogFilter) => {
    setActiveFilters(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  const hasActiveFilters = searchQuery || 
    activeFilters.category || 
    (activeFilters.tags && activeFilters.tags.length > 0) ||
    activeFilters.teacherLevel ||
    activeFilters.difficulty ||
    activeFilters.readingTime;

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters</span>
              {hasActiveFilters && (
                <span className="bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="readingTime">Sort by Reading Time</option>
            </select>

            {/* Results Count */}
            <span className="text-sm text-gray-600">
              {filteredPosts.length} of {posts.length} articles
            </span>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <BlogFilters
              filters={activeFilters}
              onChange={handleFilterChange}
              posts={posts}
            />
          </div>
        )}
      </div>

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Load More (if needed for pagination) */}
      {filteredPosts.length >= 12 && (
        <div className="text-center py-8">
          <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}