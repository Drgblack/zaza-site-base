"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostCard from "./PostCard";

type Post = {
  title: string;
  slug: string;
  description?: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
  featured?: boolean;
  image?: string;
  content: string;
};

interface RowProps {
  title: string;
  posts: Post[];
  locale?: string;
}

export default function Row({ title, posts, locale = "en" }: RowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (!container) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };
  
  useEffect(() => {
    checkScrollPosition();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollAmount = 320; // Width of card + gap
    const currentScroll = container.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount * 3
      : currentScroll + scrollAmount * 3;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  if (!posts.length) return null;

  return (
    <section className="my-8" aria-labelledby={`row-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="mb-4 px-4">
        <h2 
          id={`row-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="text-xl font-semibold text-gray-900"
        >
          {title}
        </h2>
      </div>
      
      <div className="relative">
        {/* Gradient fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        
        {/* Navigation arrows - only show when can scroll */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur hover:bg-white hover:shadow-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-gray-200 bg-white/80 backdrop-blur hover:bg-white hover:shadow-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        )}
        
        {/* Scrolling container with peek hint */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pl-4 pr-8 [&::-webkit-scrollbar]:hidden"
          role="list"
          aria-label={`${title} articles`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scroll('left');
            } else if (e.key === 'ArrowRight') {
              e.preventDefault();
              scroll('right');
            }
          }}
        >
          {posts.map((post) => (
            <div 
              key={post.slug} 
              role="listitem" 
              className="snap-start shrink-0 w-[300px]"
            >
              <PostCard post={post} locale={locale} />
            </div>
          ))}
          {/* Spacer to show peek of next item */}
          <div className="shrink-0 w-5" />
        </div>
      </div>
    </section>
  );
}