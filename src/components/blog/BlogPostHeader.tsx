import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { BlogPost } from '@/lib/blog/types';
import { formatDate } from '@/lib/blog/utils';

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={post.seo.ogImage || `/images/blog/categories/${post.category.slug}.jpg`}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`px-3 py-1 text-white rounded-full text-sm font-medium ${post.category.color}`}>
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-200 mb-6 max-w-3xl">
              {post.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar || '/images/team/default-avatar.jpg'}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium text-white">{post.author.name}</div>
                  <div className="text-sm text-gray-300">{post.author.role}</div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>

              {/* Word Count */}
              <div className="text-sm">
                {post.wordCount.toLocaleString()} words
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/30 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Teacher Level Indicators */}
            {post.teacherLevel && post.teacherLevel.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-gray-300">Recommended for:</span>
                {post.teacherLevel.map((level) => (
                  <span
                    key={level}
                    className="px-2 py-1 bg-blue-600/80 backdrop-blur-sm text-white rounded text-sm font-medium"
                  >
                    {level.replace('-', ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}