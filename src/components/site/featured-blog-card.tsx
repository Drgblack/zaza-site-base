'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
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
  readTime?: string;
}

interface FeaturedBlogCardProps {
  post: BlogPost;
  locale: string;
}

export function FeaturedBlogCard({ post, locale }: FeaturedBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <Card className="overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative">
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-64 lg:h-full object-cover"
              width={600}
              height={400}
              priority
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-purple-600 text-white">
                Featured
              </Badge>
            </div>
          </div>
          
          {/* Content Section */}
          <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime || '5 min read'}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {post.title}
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.description}
              </p>
              
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    Read Featured Article →
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
