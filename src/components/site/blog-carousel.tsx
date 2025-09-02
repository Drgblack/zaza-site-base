'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
  category: string;
  author?: string;
}

interface BlogCarouselProps {
  title: string;
  posts: BlogPost[];
  locale: string;
}

export function BlogCarousel({ title, posts, locale }: BlogCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const cardWidth = 320; // Approximate card width including margin
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            disabled={scrollPosition <= 0}
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-80"
          >
            <Card className="overflow-hidden h-full transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <div className="relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  width={320}
                  height={192}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 text-lg group-hover:text-purple-600 transition-colors">
                  {post.title}
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  {post.author && <span>{post.author}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-3 mb-4">
                  {post.description}
                </CardDescription>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    Read Article
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
