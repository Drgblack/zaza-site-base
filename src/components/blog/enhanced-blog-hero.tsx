"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {Link} from '@/i18n/routing';
import { ChevronLeft, ChevronRight, Clock, TrendingUp, Users, Sparkles } from 'lucide-react';
import type { Blog2Post } from "@/lib/blog2.server";

interface EnhancedBlogHeroProps {
  featuredPosts: Blog2Post[];
  totalPosts: number;
  recentCount: number;
}

export default function EnhancedBlogHero({ 
  featuredPosts, 
  totalPosts, 
  recentCount 
}: EnhancedBlogHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || featuredPosts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredPosts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
    setIsAutoPlaying(false);
  };

  const currentPost = featuredPosts[currentSlide];
  
  if (!currentPost) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white/90 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Education Blog</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Teaching with{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of educators discovering practical AI tools and strategies. 
            Save 3-5 hours per week with teacher-tested tips, lesson plans, and communication guides.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-white/90">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="font-semibold">{totalPosts}</span>
              <span className="text-sm">Expert Articles</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">10,000+</span>
              <span className="text-sm">Educators Served</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="font-semibold">{recentCount}</span>
              <span className="text-sm">New This Month</span>
            </div>
          </div>
        </div>

        {/* Featured Content Carousel */}
        {featuredPosts.length > 0 && (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredPosts.map((post, index) => (
                  <div key={post.slug} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                      {/* Content */}
                      <div className="flex flex-col justify-center order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                          <Sparkles className="w-3 h-3" />
                          {post.category || 'Featured'}
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                          {post.title}
                        </h2>
                        
                        <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                          {post.description}
                        </p>
                        
                        <div className="flex items-center gap-6 mb-8 text-white/80">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{post.readingTime || '5 min read'}</span>
                          </div>
                          <div className="text-sm">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        
                        <Link 
                          href={`/en/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-full font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 w-fit group"
                        >
                          Read Full Article
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      
                      {/* Image */}
                      <div className="relative order-1 lg:order-2">
                        <div className="aspect-[4/3] relative rounded-xl overflow-hidden shadow-xl">
                          <Image
                            src={post.image || '/images/blog/default-hero.jpg'}
                            alt={post.imageAlt || post.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            {featuredPosts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {featuredPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Quick 5-Min Reads', href: '/blog?filter=quick', icon: Clock },
            { label: 'AI Tools Guide', href: '/blog?category=ai-tools', icon: Sparkles },
            { label: 'Parent Communication', href: '/blog?category=parent-communication', icon: Users },
            { label: 'Time Savers', href: '/blog?category=productivity', icon: TrendingUp },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors group"
            >
              <link.icon className="w-5 h-5 text-blue-300 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}