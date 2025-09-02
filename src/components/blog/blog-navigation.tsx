'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/blog-mdx';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogNavigationProps {
  previousPost?: BlogPost | null;
  nextPost?: BlogPost | null;
}

export function BlogNavigation({ previousPost, nextPost }: BlogNavigationProps) {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Previous Post */}
          {previousPost && (
            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Link href={`/blog/${previousPost.slug}`} className="block">
                  <div className="p-6">
                    <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Previous Article
                    </p>
                    <h3 className="font-semibold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {previousPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(previousPost.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Next Post */}
          {nextPost && (
            <Card className={`group hover:shadow-lg transition-shadow ${!previousPost ? 'md:col-start-2' : ''}`}>
              <CardContent className="p-0">
                <Link href={`/blog/${nextPost.slug}`} className="block">
                  <div className="p-6 text-right">
                    <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 flex items-center justify-end gap-2">
                      Next Article
                      <ArrowRight className="w-4 h-4" />
                    </p>
                    <h3 className="font-semibold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(nextPost.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}