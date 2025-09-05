'use client';

import Link from 'next/link';
import { TrendingUp, Star, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/blog/types';
import { BLOG_CATEGORIES } from '@/lib/blog/categories';
import BlogCard from './BlogCard';

interface BlogSidebarProps {
  posts: BlogPost[];
  currentFilters: {
    category?: string;
    search?: string;
    tag?: string;
    level?: string;
  };
}

export default function BlogSidebar({ posts, currentFilters }: BlogSidebarProps) {
  // Get featured posts
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  
  // Get recent posts
  const recentPosts = posts.slice(0, 5);
  
  // Get popular categories (by post count)
  const categoryStats = BLOG_CATEGORIES.map(category => ({
    ...category,
    count: posts.filter(post => post.category.slug === category.slug).length
  }))
  .filter(cat => cat.count > 0)
  .sort((a, b) => b.count - a.count)
  .slice(0, 6);

  // Get trending tags
  const allTags = posts.flatMap(post => post.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const trendingTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-yellow-500" />
            <h3 className="font-bold text-gray-900">Featured Articles</h3>
          </div>
          <div className="space-y-4">
            {featuredPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                variant="compact"
                showExcerpt={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-purple-500" />
          <h3 className="font-bold text-gray-900">Popular Categories</h3>
        </div>
        <div className="space-y-3">
          {categoryStats.map((category) => (
            <Link
              key={category.slug}
              href={`/blog?category=${category.slug}`}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                currentFilters.category === category.slug
                  ? 'bg-purple-50 border border-purple-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded ${category.color}`} />
                <span className="font-medium text-gray-900">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-blue-500" />
          <h3 className="font-bold text-gray-900">Recent Articles</h3>
        </div>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900 line-clamp-2 mb-2">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{post.readingTime} min read</span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded text-xs text-white ${post.category.color}`}>
                  {post.category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Tags */}
      {trendingTags.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="font-bold text-gray-900 mb-4">Trending Tags</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map(([tag, count]) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  currentFilters.tag === tag
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag} ({count})
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
        <h3 className="font-bold text-gray-900 mb-2">Stay Updated</h3>
        <p className="text-gray-600 text-sm mb-4">
          Get the latest teaching tips and AI insights delivered to your inbox.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          />
          <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}