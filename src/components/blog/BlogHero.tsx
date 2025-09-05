'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Calendar, TrendingUp, Users } from 'lucide-react';
import { BlogPost, BlogStats } from '@/lib/blog/types';
import { formatDate } from '@/lib/blog/utils';

interface BlogHeroProps {
  featuredPosts: BlogPost[];
  stats: BlogStats;
}

export default function BlogHero({ featuredPosts, stats }: BlogHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlay || featuredPosts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, featuredPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  if (featuredPosts.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Teaching with AI
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
              Discover practical strategies, tools, and insights from education experts
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-300" />
                <span>Join 50,000+ educators</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-300" />
                <span>Save 3-5 hours per week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPost = featuredPosts[currentSlide];

  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentPost.seo.ogImage || '/images/blog/hero-bg.jpg'}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                Featured
              </span>
              <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm font-medium">
                {currentPost.category.name}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {currentPost.title}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {currentPost.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(currentPost.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{currentPost.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentPost.author.name}</span>
              </div>
            </div>
            
            <Link
              href={`/blog/${currentPost.slug}`}
              className="inline-flex items-center px-8 py-4 bg-white text-purple-900 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Read Article
            </Link>
          </div>

          {/* Stats Panel */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Blog Stats</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stats.totalPosts}
                </div>
                <div className="text-sm text-gray-300">
                  Articles Published
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stats.averageReadingTime}
                </div>
                <div className="text-sm text-gray-300">
                  Avg Read Time
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {stats.totalCategories}
                </div>
                <div className="text-sm text-gray-300">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  50K+
                </div>
                <div className="text-sm text-gray-300">
                  Educators Helped
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        {featuredPosts.length > 1 && (
          <>
            {/* Navigation Buttons */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <button
                onClick={prevSlide}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Previous post"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button
                onClick={nextSlide}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                aria-label="Next post"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {featuredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide 
                      ? 'bg-white' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}