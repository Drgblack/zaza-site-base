import Image from "next/image";
import ShareBar from "./ShareBar";
import EmailCTA from "./EmailCTA";
import RelatedPosts from "./RelatedPosts";
import type { Blog2Post } from "@/lib/blog2.server";

interface ArticleLayoutProps {
  post: Blog2Post;
  children: React.ReactNode;
}

export default function ArticleLayout({ post, children }: ArticleLayoutProps) {
  return (
    <main data-article-layout="v2">
      {/* Hero Section 21:9 */}
      <section className="relative w-full">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-gray-100">
          <Image
            src={post.image || "/images/blog/default.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto px-4 pb-8 w-full">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl">
                {post.title}
              </h1>
              <p className="text-lg text-white/90 max-w-3xl mb-4">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span>{post.author}</span>
                <span>•</span>
                <time>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</time>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_720px_1fr] gap-8">
            {/* Sticky Share Bar - Desktop Only */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <ShareBar title={post.title} slug={post.slug} />
              </div>
            </div>
            
            {/* Main Content */}
            <article className="prose prose-lg max-w-none">
              {children}
              
              {/* Mid-article Email CTA */}
              <div className="my-12 -mx-4 sm:mx-0">
                <EmailCTA variant="newsletter" />
              </div>
            </article>
            
            {/* Empty right column for balance */}
            <div className="hidden lg:block" />
          </div>

          {/* Mobile Share Row */}
          <div className="lg:hidden mt-8 mb-12">
            <div className="flex items-center justify-center gap-4 py-4 border-y">
              <span className="text-sm font-medium text-gray-600">Share:</span>
              <ShareBar title={post.title} slug={post.slug} mobile />
            </div>
          </div>

          {/* Bottom Product CTA */}
          <div className="max-w-3xl mx-auto mt-16">
            <EmailCTA variant="product" />
          </div>

          {/* Related Posts */}
          <div className="mt-20">
            <RelatedPosts currentSlug={post.slug} category={post.category} />
          </div>
        </div>
      </section>
    </main>
  );
}