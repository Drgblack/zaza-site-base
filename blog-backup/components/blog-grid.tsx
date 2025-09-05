'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-mdx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Calendar, ArrowRight, Play, BookmarkPlus, Share2, TrendingUp } from 'lucide-react';

interface BlogGridProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
}

export function BlogGrid({ posts, showLoadMore = false }: BlogGridProps) {
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const displayedPosts = posts.slice(0, displayCount);
  const hasMore = posts.length > displayCount;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 8);
      setIsLoading(false);
    }, 800);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Create sophisticated grid layout with varying card sizes
  const getCardClasses = (index: number, isLarge: boolean = false) => {
    const baseClasses = "group relative overflow-hidden bg-gray-900 rounded-lg netflix-card-hover netflix-focus netflix-smooth cursor-pointer";
    const staggerClass = `netflix-stagger-${Math.min(index % 6 + 1, 6)}`;
    
    if (isLarge) {
      return `${baseClasses} ${staggerClass} netflix-fade-in md:col-span-2 md:row-span-2 h-80 md:h-96`;
    }
    
    // Create variety in heights
    const heights = ['h-64', 'h-72', 'h-64', 'h-80', 'h-64', 'h-72'];
    const height = heights[index % heights.length];
    
    return `${baseClasses} ${staggerClass} netflix-fade-in ${height}`;
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-24 bg-black">
        <div className="max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-800 rounded-full flex items-center justify-center">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">No Stories Found</h3>
          <p className="text-gray-400 mb-8 text-lg">
            We couldn't find any stories matching your filters. Explore our latest content instead.
          </p>
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
            <Link href="/blog">Browse All Stories</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Featured Row - Netflix-style horizontal scroll */}
      {posts.some(post => post.featured) && (
        <section className="mb-16">
          <div className="px-4 sm:px-6 lg:px-8 mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold text-white">Featured Stories</h2>
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4">
              {posts.filter(post => post.featured).slice(0, 6).map((post, index) => (
                <Link
                  key={`featured-${post.slug}`}
                  href={`/blog/${post.slug}`}
                  className={`flex-shrink-0 group relative overflow-hidden rounded-lg w-80 h-48 bg-gray-900 netflix-card-hover netflix-focus netflix-smooth netflix-fade-in netflix-stagger-${index + 1}`}
                  onMouseEnter={() => setHoveredPost(`featured-${post.slug}`)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 netflix-image-load netflix-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  {hoveredPost === `featured-${post.slug}` && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-3">
                        <Button size="sm" className="bg-white text-black hover:bg-gray-200 netflix-button-hover netflix-smooth">
                          <Play className="h-4 w-4 mr-2 fill-current" />
                          Read
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 netflix-button-hover netflix-smooth">
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 netflix-button-hover netflix-smooth">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="bg-red-600 text-white mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-white font-bold text-lg line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Grid - Netflix-style masonry layout */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Latest Stories</h2>
          <p className="text-gray-400">Discover insights, tips, and stories from our community</p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min"
        >
          {displayedPosts.map((post, index) => {
            const isLargeCard = index === 0 || (index + 1) % 8 === 0;
            
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={getCardClasses(index, isLargeCard)}
                onMouseEnter={() => setHoveredPost(post.slug)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="absolute inset-0">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 netflix-image-load netflix-smooth transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Hover overlay */}
                  {hoveredPost === post.slug && (
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-300" />
                  )}
                </div>

                {/* Content overlay */}
                <div className="relative h-full flex flex-col justify-end p-6 z-10">
                  {/* Category badge */}
                  <Badge className="bg-red-600 text-white mb-3 w-fit text-xs">
                    {post.category}
                  </Badge>

                  {/* Title */}
                  <h3 className={`text-white font-bold mb-2 line-clamp-3 ${isLargeCard ? 'text-2xl md:text-3xl' : 'text-lg'}`}>
                    {post.title}
                  </h3>

                  {/* Description - only for larger cards */}
                  {isLargeCard && (
                    <p className="text-white/80 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  )}

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-white/60 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime}</span>
                    </div>
                    <span>{formatDate(post.publishDate)}</span>
                  </div>

                  {/* Hover actions */}
                  {hoveredPost === post.slug && (
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 netflix-text-reveal">
                      <Button 
                        size="sm" 
                        className="bg-white text-black hover:bg-gray-200 text-xs px-4 netflix-button-hover netflix-smooth"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Play className="h-3 w-3 mr-1 fill-current" />
                        Read Story
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/30 text-white hover:bg-white/10 text-xs p-2 netflix-button-hover netflix-smooth"
                        onClick={(e) => e.preventDefault()}
                      >
                        <BookmarkPlus className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/30 text-white hover:bg-white/10 text-xs p-2 netflix-button-hover netflix-smooth"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  {/* Featured badge */}
                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                      ⭐ Featured
                    </div>
                  )}
                </div>

                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-lg transition-colors duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Load More Section */}
        {showLoadMore && hasMore && (
          <div className="text-center mt-16">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-white text-xl font-bold mb-4">Want to see more?</h3>
              <p className="text-gray-400 mb-6">
                Discover more stories and insights from our community
              </p>
              <Button 
                onClick={handleLoadMore}
                disabled={isLoading}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 w-full netflix-button-hover netflix-smooth"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin netflix-pulse" />
                    Loading More Stories...
                  </div>
                ) : (
                  <>Load More Stories</>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Footer section */}
        {displayedPosts.length > 8 && (
          <div className="mt-20 pt-12 border-t border-gray-800">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-white text-2xl font-bold mb-4">
                Stay Updated with Our Latest Stories
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Get insights, tips, and stories delivered to your inbox. Join our community of educators.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 netflix-button-hover netflix-smooth">
                  <Link href="/">Subscribe to Newsletter</Link>
                </Button>
                <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8 netflix-button-hover netflix-smooth">
                  <Link href="/blog">Browse All Categories</Link>
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-500">
                  Showing {displayedPosts.length} of {posts.length} stories
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}