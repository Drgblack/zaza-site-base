"use client";

import { useState, useMemo } from 'react';
import type { Post } from '@/lib/blog';
import HeroSection from './HeroSection';
import Row from './Row';
import SearchAndFilter from './SearchAndFilter';
import PostCard from './PostCard';

const CATEGORIES = [
  "All Articles", 
  "Teacher Tips", 
  "Productivity", 
  "Parent Communication", 
  "Wellbeing",
  "AI Tools"
];

// Helper function to get posts by category (client-side)
function getPostsByCategory(posts: Post[], category: string): Post[] {
  if (category === "All Articles") return posts;
  return posts.filter(p => p.category === category);
}

interface BlogPageClientProps {
  locale: string;
  initialCategory?: string;
  initialSearch?: string;
  allPosts: Post[];
  featuredPost: Post | null;
  rows: { title: string; posts: Post[] }[];
}

export default function BlogPageClient({ 
  locale, 
  initialCategory, 
  initialSearch,
  allPosts,
  featuredPost,
  rows
}: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "All Articles");
  
  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = getPostsByCategory(allPosts, selectedCategory);
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.author?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query)
      );
    }
    
    return posts;
  }, [allPosts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI in Education Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Insights, strategies, and real-world examples from educators transforming their classrooms with AI.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8">
        {/* Featured Hero */}
        {featuredPost && (
          <div className="px-4 mb-12">
            <HeroSection post={featuredPost} locale={locale} />
          </div>
        )}

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={setSearchQuery}
          onCategoryFilter={setSelectedCategory}
          selectedCategory={selectedCategory}
          categories={CATEGORIES}
        />

        {/* Show filtered results if searching */}
        {(searchQuery.trim() || selectedCategory !== "All Articles") && (
          <div className="px-4 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchQuery.trim() 
                  ? `Search results for "${searchQuery}"` 
                  : selectedCategory
                }
              </h2>
              <p className="text-gray-600">{filteredPosts.length} articles found</p>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPosts.map((post) => (
                  <div key={post.slug} className="w-full">
                    <PostCard post={post} locale={locale} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No articles found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Articles");
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Netflix-style Rows (show when not filtering) */}
        {!searchQuery.trim() && selectedCategory === "All Articles" && (
          <div>
            {rows.map((row) => (
              <Row key={row.title} title={row.title} posts={row.posts} locale={locale} />
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-4 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Never Miss an Update</h2>
            <p className="text-xl text-purple-100 mb-8">
              Get the latest AI education insights, teaching tips, and strategies delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
              />
              <button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "AI in Education Blog",
            "description": "Insights, strategies, and real-world examples from educators transforming their classrooms with AI.",
            "url": `https://zazapromptly.com/${locale}/blog`,
            "publisher": {
              "@type": "Organization",
              "name": "Zaza Technologies",
              "logo": "https://zazapromptly.com/images/zaza-logo.png"
            },
            "blogPost": allPosts.slice(0, 10).map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "author": {
                "@type": "Person", 
                "name": post.author
              },
              "datePublished": post.date,
              "url": `https://zazapromptly.com/${locale}/blog/${post.slug}`
            }))
          })
        }}
      />
    </div>
  );
}