'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-mdx';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';

interface BlogHeroProps {
  featuredPosts: BlogPost[];
}

export function BlogHero({ featuredPosts }: BlogHeroProps) {
  const mainPost = featuredPosts[0];
  const sidePosts = featuredPosts.slice(1, 3);

  if (!mainPost) return null;

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI in Education Blog
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Expert insights on using AI tools effectively in education, improving parent communication, and saving time with smart teaching strategies.
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Main Featured Post */}
          <Link 
            href={`/blog/${mainPost.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-[16/9] relative overflow-hidden">
              <Image
                src={mainPost.featuredImage}
                alt={mainPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                Featured
              </Badge>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
                  {mainPost.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{mainPost.readingTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{mainPost.author}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {mainPost.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {mainPost.description}
              </p>
            </div>
          </Link>

          {/* Side Featured Posts */}
          <div className="space-y-6">
            {sidePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="font-semibold text-sm leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
