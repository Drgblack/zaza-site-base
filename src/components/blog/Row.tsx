"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostCard from "./PostCard";
import type { Post } from "@/lib/blog";

interface RowProps {
  title: string;
  posts: Post[];
  locale?: string;
}

export default function Row({ title, posts, locale = "en" }: RowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
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
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 
          id={`row-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="text-xl font-semibold text-gray-900"
        >
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
            className="p-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
            className="p-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 px-4"
        role="list"
        aria-label={`${title} articles`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
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
      </div>
    </section>
  );
}