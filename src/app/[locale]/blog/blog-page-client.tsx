'use client';

import { useState, useEffect } from 'react';
import { type BlogPost } from '../../../../blog-posts-data';
import Link from 'next/link';
import { Search, Clock, Filter, Bookmark, TrendingUp } from 'lucide-react';

interface Category {
  name: string;
  slug: string;
  color: string;
  icon: string;
}

interface BlogPageClientProps {
  posts: BlogPost[];
  categories: Array<{ category: Category, count: number }>;
  locale: string;
}

export default function BlogPageClient({ posts, categories, locale }: BlogPageClientProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  useEffect(() => {
    // Load saved posts from localStorage
    const saved = localStorage.getItem('savedBlogPosts');
    if (saved) {
      setSavedPosts(JSON.parse(saved));
    }
  }, []);

  // Filter posts based on category and search
  useEffect(() => {
    let filtered = posts;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => {
        const category = typeof post.category === 'string' ? post.category : post.category?.slug || post.category?.name;
        return category === selectedCategory;
      });
    }
    
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery]);

  const toggleSavePost = (postId: string) => {
    const updated = savedPosts.includes(postId)
      ? savedPosts.filter(id => id !== postId)
      : [...savedPosts, postId];
    
    setSavedPosts(updated);
    localStorage.setItem('savedBlogPosts', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">
            Teacher Resources & AI Insights
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Save time, teach better, and stay ahead with practical guides and AI-powered strategies for modern educators.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for topics, tools, or strategies..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Posts ({posts.length})
            </button>
            
            {categories.map(({ category, count }) => (
              <button
                key={category.slug || category.name}
                onClick={() => setSelectedCategory(category.slug || category.name)}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedCategory === (category.slug || category.name)
                    ? `${category.color || 'bg-purple-600'} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon || '📚'}</span>
                {category.name} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Summary */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(c => (c.category.slug || c.category.name) === selectedCategory)?.category.name || selectedCategory}`}
          </p>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select className="border rounded-lg px-3 py-1 text-sm">
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Quick Reads</option>
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Hero Image */}
              {post.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium bg-purple-600">
                    <span className="mr-1">📚</span>
                    {typeof post.category === 'string' ? post.category : post.category?.name || 'Blog'}
                  </div>
                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ Featured
                    </div>
                  )}
                </div>
              )}
              
              {/* Category Header (fallback if no image) */}
              {!post.image && <div className="h-3 bg-purple-600"></div>}
              
              <div className="p-6">
                {/* Category & Save Button */}
                <div className="flex items-center justify-between mb-4">
                  {!post.image && (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📚</span>
                      <span className="text-sm font-medium text-gray-600">
                        {typeof post.category === 'string' ? post.category : post.category?.name || 'Blog'}
                      </span>
                    </div>
                  )}
                  {post.image && <div></div>} {/* Spacer when image is present */}
                  
                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      savedPosts.includes(post.id)
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" fill={savedPosts.includes(post.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime} min
                    </span>
                    {post.featured && (
                      <span className="flex items-center gap-1 text-orange-500">
                        <TrendingUp className="w-4 h-4" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Saved Posts Summary */}
        {savedPosts.length > 0 && (
          <div className="mt-12 p-6 bg-purple-50 rounded-xl">
            <h3 className="font-semibold text-purple-900 mb-2">
              Your Reading List
            </h3>
            <p className="text-purple-700">
              You have {savedPosts.length} saved {savedPosts.length === 1 ? 'post' : 'posts'} to read later.
              <Link href={`/${locale}/blog/saved`} className="ml-2 underline">
                View saved posts →
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}