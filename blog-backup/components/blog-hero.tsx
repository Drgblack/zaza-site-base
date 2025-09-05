'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-mdx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Play, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface BlogHeroProps {
  featuredPosts: BlogPost[];
}

export function BlogHero({ featuredPosts }: BlogHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || featuredPosts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, featuredPosts.length]);

  if (!featuredPosts.length) return null;

  const currentPost = featuredPosts[currentIndex];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentPost.featuredImage}
          alt={currentPost.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-red-600 text-white px-4 py-1.5 text-sm font-semibold rounded-sm">
                {currentPost.category}
              </Badge>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{currentPost.readingTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{currentPost.author}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              {currentPost.title}
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl">
              {currentPost.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-black hover:bg-white/90 text-lg font-semibold px-8 py-4 rounded-sm netflix-button-hover netflix-smooth"
              >
                <Link href={`/blog/${currentPost.slug}`}>
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Read Article
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 text-lg font-semibold px-8 py-4 rounded-sm netflix-button-hover netflix-smooth"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                More Info
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {featuredPosts.length > 1 && (
          <>
            {/* Previous/Next Buttons */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 netflix-smooth"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 netflix-smooth"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredPosts.length)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-20 left-4 sm:left-8 flex gap-2">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white w-12' 
                      : 'bg-white/30 w-6 hover:bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            {/* Auto-play Control */}
            <div className="absolute bottom-20 right-4 sm:right-8">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white text-sm netflix-smooth"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? 'Pause' : 'Play'} Auto-advance
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Featured Posts Row */}
      {featuredPosts.length > 3 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white text-xl font-semibold mb-4">Featured Articles</h3>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {featuredPosts.slice(0, 6).map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`flex-shrink-0 group relative overflow-hidden rounded-lg netflix-smooth transition-all duration-300 ${
                    index === currentIndex ? 'ring-2 ring-white' : ''
                  }`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="w-40 h-24 relative">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 netflix-image-load netflix-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium line-clamp-2">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}