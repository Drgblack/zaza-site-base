"use client";
import { getAllBlog2Posts } from "@/lib/blog2.server";
import PostCard2 from "@/components/blog2/PostCard2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface RailProps {
  title: string;
  posts: any[];
  railId: string;
}

function NetflixRail({ title, posts, railId }: RailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320 * 3; // 3 cards worth
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (posts.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-4 mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-full border bg-background/80 backdrop-blur-sm shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-full border bg-background/80 backdrop-blur-sm shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden pr-6">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          } as any}
        >
          {posts.map((post) => (
            <PostCard2 key={post.slug} post={post} />
          ))}
        </div>
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

export default function Blog2IndexPage() {
  const posts = getAllBlog2Posts();
  
  // Group posts for rails
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.filter(p => new Date(p.date) > new Date(Date.now() - 14*24*60*60*1000));
  
  return (
    <div className="min-h-screen bg-white" data-route="blog-index">
      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
            AI in Education Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Insights, strategies, and real-world examples from educators transforming their classrooms with AI.
          </p>
          <div className="mt-6 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full inline-block">
            ✨ Powered by Blog2 System
          </div>
        </div>
      </div>

      {/* Rails */}
      <NetflixRail title="Editor's Picks" posts={featuredPosts.length ? featuredPosts : posts.slice(0, 8)} railId="featured" />
      <NetflixRail title="New This Week" posts={recentPosts.length ? recentPosts : posts.slice(0, 8)} railId="recent" />
      <NetflixRail title="Teacher Tips" posts={posts.filter(p => p.category === 'Teacher Tips').slice(0, 8)} railId="teacher-tips" />
      <NetflixRail title="Productivity" posts={posts.filter(p => p.category === 'Productivity').slice(0, 8)} railId="productivity" />
      <NetflixRail title="Parent Communication" posts={posts.filter(p => p.category === 'Parent Communication').slice(0, 8)} railId="parent-comm" />
      <NetflixRail title="Most Popular" posts={posts.slice(0, 8)} railId="popular" />

      {/* Debug Info */}
      <section className="mx-auto max-w-6xl px-4 py-8 mt-16 border-t">
        <div className="text-center text-sm text-gray-500">
          <p>Main Blog System: {posts.length} posts loaded</p>
          <p>Build: {process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'}</p>
        </div>
      </section>
    </div>
  );
}