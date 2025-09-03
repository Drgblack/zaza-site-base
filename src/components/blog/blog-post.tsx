'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post as BlogPostType } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShareButton } from '@/components/site/share-button';
// import { StructuredData } from '@/components/seo/structured-data';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  // Track blog reading for gamification
  useEffect(() => {
    const trackReading = () => {
      if (typeof window !== 'undefined') {
        const currentReads = parseInt(localStorage.getItem('zaza-blog-reads') || '0');
        localStorage.setItem('zaza-blog-reads', String(currentReads + 1));
        
        const currentInteractions = parseInt(localStorage.getItem('zaza-interactions') || '0');
        localStorage.setItem('zaza-interactions', String(currentInteractions + 1));
      }
    };

    // Track after 30 seconds (indicates actually reading)
    const timer = setTimeout(trackReading, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article>
      {/* Hero Section with Featured Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={post.image || '/images/blog/default.jpg'}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Back Button Overlay */}
        <div className="absolute top-8 left-8 z-10">
          <Button asChild variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {/* Category and Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
                {post.category}
              </Badge>
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              {post.description}
            </p>

            {/* Tags */}
            {false && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-gray-500" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Button */}
            <div className="pt-4">
              <ShareButton 
                title={post.title}
                text={post.description}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <div 
            className="prose prose-lg prose-purple max-w-none dark:prose-invert leading-relaxed"
          >
            <pre className="whitespace-pre-wrap">{post.content}</pre>
          </div>
          <div style={{display: 'none'}}
          />
        </div>
      </section>

      {/* Author Bio Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {post.author?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">About {post.author}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {`${post.author} is an educator and contributor to the Zaza Promptly blog, sharing insights from the classroom and practical strategies for using AI in education.`}
                  </p>
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    View All Posts by {post.author}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Structured Data for SEO - temporarily disabled */}
    </article>
  );
}