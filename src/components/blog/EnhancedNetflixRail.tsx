"use client";
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock } from 'lucide-react';
import EnhancedPostCard from './EnhancedPostCard';
import type { Blog2Post } from "@/lib/blog2.server";

interface EnhancedNetflixRailProps {
  title: string;
  subtitle?: string;
  posts: Blog2Post[];
  railId: string;
  variant?: 'standard' | 'hero' | 'highlighted';
  locale?: string;
}

export default function EnhancedNetflixRail({ 
  title, 
  subtitle,
  posts, 
  railId, 
  variant = 'standard',
  locale = 'en'
}: EnhancedNetflixRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollButtons);
      return () => el.removeEventListener('scroll', checkScrollButtons);
    }
  }, [posts]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = scrollRef.current;
    if (currentRef) {
      observer.observe(currentRef.parentElement as Element);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef.parentElement as Element);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = variant === 'hero' ? 400 * 2 : 340 * 3;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (posts.length === 0) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: 'relative mx-auto max-w-7xl px-4 mb-20',
          header: 'bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-8',
          title: 'text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent',
          subtitle: 'text-purple-600/70 mt-2',
          cardSize: 'w-[400px]'
        };
      case 'highlighted':
        return {
          container: 'relative mx-auto max-w-7xl px-4 mb-16 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6',
          header: 'mb-6',
          title: 'text-2xl font-bold text-gray-900',
          subtitle: 'text-gray-600 mt-2',
          cardSize: 'w-[340px]'
        };
      default:
        return {
          container: 'relative mx-auto max-w-7xl px-4 mb-16',
          header: 'mb-6',
          title: 'text-2xl font-bold text-gray-900',
          subtitle: 'text-gray-600 mt-2',
          cardSize: 'w-[320px]'
        };
    }
  };

  const styles = getVariantStyles();

  const getIcon = () => {
    if (title.includes('🌟') || title.includes('Featured')) return Sparkles;
    if (title.includes('🔥') || title.includes('Popular')) return TrendingUp;
    if (title.includes('⚡') || title.includes('Quick')) return Clock;
    return null;
  };

  const Icon = getIcon();

  return (
    <section className={`${styles.container} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className={`${styles.header} flex items-center justify-between`}>
        <div>
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-6 h-6 text-purple-500" />}
            <h2 className={styles.title}>{title}</h2>
          </div>
          {subtitle && (
            <p className={`${styles.subtitle} text-lg`}>
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="h-12 w-12 rounded-full border bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="h-12 w-12 rounded-full border bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory ${
            variant === 'hero' ? 'gap-8' : 'gap-6'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {posts.map((post, index) => (
            <EnhancedPostCard 
              key={post.slug} 
              post={post} 
              locale={locale} 
              variant={variant}
              index={index}
              className={styles.cardSize}
            />
          ))}
        </div>

        {/* Enhanced edge fades with variant-specific styling */}
        <div className={`absolute inset-y-0 left-0 w-16 bg-gradient-to-r pointer-events-none ${
          variant === 'highlighted' 
            ? 'from-yellow-50 to-transparent' 
            : variant === 'hero'
            ? 'from-blue-50 to-transparent'
            : 'from-white to-transparent'
        }`} />
        <div className={`absolute inset-y-0 right-0 w-16 bg-gradient-to-l pointer-events-none ${
          variant === 'highlighted' 
            ? 'from-yellow-50 to-transparent' 
            : variant === 'hero'
            ? 'from-blue-50 to-transparent'
            : 'from-white to-transparent'
        }`} />
      </div>

      {/* Rail progress indicator */}
      {posts.length > 3 && (
        <div className="flex justify-center mt-4">
          <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
              style={{
                width: canScrollLeft 
                  ? canScrollRight 
                    ? '50%' 
                    : '100%'
                  : '25%'
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}