import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PostMeta } from '@/lib/blog2.server';

interface PostNavigationProps {
  prevPost?: PostMeta | null;
  nextPost?: PostMeta | null;
}

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
      <div className="flex-1">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="group flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm text-gray-500 mb-1">Previous</p>
              <p className="font-medium text-gray-900 group-hover:text-purple-700 line-clamp-2">
                {prevPost.title}
              </p>
            </div>
          </Link>
        )}
      </div>
      
      <div className="flex-1 flex justify-end">
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-right"
          >
            <div className="min-w-0">
              <p className="text-sm text-gray-500 mb-1">Next</p>
              <p className="font-medium text-gray-900 group-hover:text-purple-700 line-clamp-2">
                {nextPost.title}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 mt-0.5 flex-shrink-0" />
          </Link>
        )}
      </div>
    </nav>
  );
}