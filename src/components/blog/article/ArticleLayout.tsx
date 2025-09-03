"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { clientImage } from "@/lib/image-url-client";
import ShareBar from "./ShareBar";
import EmailCTA from "./EmailCTA";

interface Post {
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
}

interface ArticleLayoutProps {
  post: Post;
  locale: string;
  children: React.ReactNode;
  relatedPosts?: React.ReactNode;
}

export default function ArticleLayout({ post, locale, children, relatedPosts }: ArticleLayoutProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const articleUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://zazapromptly.com/${locale}/blog/${post.slug}`;

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Fire analytics event
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'article_view', {
        event_category: 'engagement',
        event_label: post.slug,
      });
    }
  }, [post.slug]);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
        <div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Back to blog link */}
      <div className="max-w-[72ch] mx-auto px-4 pt-8 pb-4">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      <main className="mx-auto max-w-[72ch] px-4 pb-24">
        {/* Hero image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
          <Image
            src={clientImage(post.image)}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 72ch"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/0" />
        </div>

        {/* Article header */}
        <header className="mb-8">
          {post.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime || 4} min read</span>
            </div>
          </div>

          {/* Mobile share */}
          <div className="md:hidden mb-8">
            <ShareBar title={post.title} url={articleUrl} />
          </div>
        </header>

        {/* Desktop sticky share bar */}
        <div className="hidden md:block fixed left-8 top-1/2 transform -translate-y-1/2 z-20">
          <div className="flex flex-col gap-2">
            <ShareBar 
              title={post.title} 
              url={articleUrl} 
              className="flex-col bg-white rounded-xl p-3 shadow-lg border"
            />
          </div>
        </div>

        {/* Article content */}
        <article className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg">
          {children}
          
          {/* Mid-article CTA */}
          <div className="not-prose my-12">
            <EmailCTA variant="newsletter" />
          </div>
        </article>

        {/* Bottom CTA */}
        <div className="mt-12">
          <EmailCTA variant="product" />
        </div>

        {/* Mobile share footer */}
        <div className="md:hidden mt-8 pt-8 border-t border-gray-200">
          <ShareBar title={post.title} url={articleUrl} className="justify-center" />
        </div>

        {/* Related posts */}
        {relatedPosts}
      </main>
    </>
  );
}