'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-mdx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';

interface BlogGridProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
}

export function BlogGrid({ posts, showLoadMore = false }: BlogGridProps) {
  const [displayCount, setDisplayCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  const displayedPosts = posts.slice(0, displayCount);
  const hasMore = posts.length > displayCount;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't find any articles matching your current filters. Try adjusting your search criteria.
          </p>
          <Button asChild variant="outline">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <article 
            key={post.slug}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {post.featured && (
                  <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                  <span className="text-sm font-medium">Read Article</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center mt-12">
          <Button 
            onClick={handleLoadMore}
            disabled={isLoading}
            size="lg"
            variant="outline"
            className="px-8"
          >
            {isLoading ? 'Loading...' : 'Load More Articles'}
          </Button>
        </div>
      )}

      {displayedPosts.length > 6 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Showing {displayedPosts.length} of {posts.length} articles
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/blog">View All Categories</Link>
              </Button>
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}