'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Tag, Calendar, User } from 'lucide-react';
import { BlogPost } from '../../../blog-posts-data';

interface BlogSearchAndFilterProps {
  posts: BlogPost[];
  onFilteredPosts: (posts: BlogPost[]) => void;
  categories: string[];
  tags: string[];
  authors: string[];
}

interface Filters {
  search: string;
  category: string;
  tag: string;
  author: string;
  dateRange: string;
}

export default function BlogSearchAndFilter({
  posts,
  onFilteredPosts,
  categories,
  tags,
  authors
}: BlogSearchAndFilterProps) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    tag: '',
    author: '',
    dateRange: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.description?.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(post => 
        post.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Tag filter
    if (filters.tag) {
      filtered = filtered.filter(post => 
        post.tags?.some(tag => tag.toLowerCase() === filters.tag.toLowerCase())
      );
    }

    // Author filter
    if (filters.author) {
      filtered = filtered.filter(post => {
        const authorName = typeof post.author === 'string' 
          ? post.author 
          : post.author?.name || '';
        return authorName.toLowerCase() === filters.author.toLowerCase();
      });
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== '') {
        filtered = filtered.filter(post => {
          const postDate = new Date(post.date || post.publishDate || '2024-01-01');
          return postDate >= filterDate;
        });
      }
    }

    return filtered;
  }, [posts, filters]);

  // Update parent component with filtered posts
  React.useEffect(() => {
    onFilteredPosts(filteredPosts);
  }, [filteredPosts, onFilteredPosts]);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      tag: '',
      author: '',
      dateRange: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles, topics, or keywords..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          {/* Category Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4" />
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4" />
              Topic
            </label>
            <select
              value={filters.tag}
              onChange={(e) => updateFilter('tag', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
            >
              <option value="">All Topics</option>
              {tags.slice(0, 20).map(tag => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Author Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Author
            </label>
            <select
              value={filters.author}
              onChange={(e) => updateFilter('author', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              Published
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => updateFilter('dateRange', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900"
            >
              <option value="">Any time</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
              <option value="3months">Past 3 months</option>
              <option value="year">Past year</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {filteredPosts.length} of {posts.length} articles
          {hasActiveFilters && (
            <span className="ml-2 text-indigo-600 font-medium">
              (filtered)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}