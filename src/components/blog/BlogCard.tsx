'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Star } from 'lucide-react';
import { BlogPost } from '@/lib/blog/types';
import { formatDate, formatRelativeDate } from '@/lib/blog/utils';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showExcerpt?: boolean;
}

export default function BlogCard({ 
  post, 
  variant = 'default',
  showExcerpt = true 
}: BlogCardProps) {
  const cardClasses = {
    default: "bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group",
    featured: "bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg border-2 border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden group",
    compact: "bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden group"
  };

  const imageHeight = {
    default: "h-48",
    featured: "h-56",
    compact: "h-32"
  };

  return (
    <article className={cardClasses[variant]}>
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Featured Badge */}
        {post.featured && variant === 'featured' && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Image */}
        <div className={`relative ${imageHeight[variant]} overflow-hidden`}>
          <Image
            src={post.seo.ogImage || `/images/blog/categories/${post.category.slug}.jpg`}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span 
              className={`px-3 py-1 text-white rounded-full text-sm font-medium ${post.category.color}`}
            >
              {post.category.name}
            </span>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className={variant === 'compact' ? 'p-4' : 'p-6'}>
          {/* Title */}
          <h3 className={`font-bold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 ${
            variant === 'featured' ? 'text-xl' : variant === 'compact' ? 'text-base' : 'text-lg'
          }`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && variant !== 'compact' && (
            <p className="text-gray-600 mt-2 line-clamp-2 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && variant !== 'compact' && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Meta Information */}
          <div className={`flex items-center justify-between text-sm text-gray-500 ${
            variant === 'compact' ? 'mt-2' : 'mt-4'
          }`}>
            <div className="flex items-center gap-4">
              {/* Author */}
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span className="truncate max-w-24">{post.author.name}</span>
              </div>
              
              {/* Date */}
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span title={formatDate(post.publishedAt)}>
                  {formatRelativeDate(post.publishedAt)}
                </span>
              </div>
            </div>

            {/* Reading Time */}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readingTime} min</span>
            </div>
          </div>

          {/* Teacher Level Indicators */}
          {post.teacherLevel && post.teacherLevel.length > 0 && variant !== 'compact' && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.teacherLevel.slice(0, 2).map((level) => (
                <span
                  key={level}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                >
                  {level.replace('-', ' ')}
                </span>
              ))}
              {post.teacherLevel.length > 2 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  +{post.teacherLevel.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Read More Arrow */}
          <div className="flex items-center justify-end mt-4">
            <ArrowRight className="h-4 w-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </article>
  );
}