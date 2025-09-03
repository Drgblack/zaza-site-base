import { setRequestLocale } from 'next-intl/server';
import { getAllPosts, Post } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, User, Calendar, ArrowRight, Search, Filter, Star, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI in Education Blog - Zaza Promptly',
  description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.',
  keywords: ['AI education blog', 'teacher resources', 'parent communication', 'educational technology', 'teaching tips'],
};

const CATEGORIES = ["All Articles","Teacher Tips","Productivity","Parent Communication","Wellbeing"];

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string; tag?: string; search?: string; page?: string}>;
};

// Featured Hero Card Component
function FeaturedHeroCard({ post }: { post: Post }) {
  return (
    <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden group cursor-pointer">
      <Link href={`/blog/${post.slug}`}>
        <Image
          src={post.image || "/images/blog/default.jpg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">
            {post.category}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-200 mb-6 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>
          <Button className="bg-white text-black hover:bg-gray-100 font-semibold">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Link>
    </div>
  );
}

// Article Card Component
function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-[16/10] relative overflow-hidden">
          <Image
            src={post.image || "/images/blog/default.jpg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-purple-600 text-white">
              {post.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min</span>
              </div>
            </div>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          
          <Button variant="outline" className="w-full group-hover:bg-purple-50 group-hover:border-purple-200">
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Link>
    </article>
  );
}

// Sidebar Component
function BlogSidebar({ grouped, selectedCategory }: { grouped: Record<string, Post[]>, selectedCategory?: string }) {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Search Articles</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search topics, authors..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Popular Categories</h3>
        </div>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <Link 
              key={category}
              href={category === "All Articles" ? "/blog" : `/blog?category=${encodeURIComponent(category)}`}
              className={`block px-3 py-2 rounded-lg transition-colors ${
                (category === "All Articles" && !selectedCategory) || selectedCategory === category 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {category} ({grouped[category]?.length || 0})
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold">Quick Filters</h3>
        </div>
        <div className="space-y-2">
          <Link href="/blog?sort=recent" className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Recent Posts
          </Link>
          <Link href="/blog?featured=true" className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Featured Articles
          </Link>
          <Link href="/blog?sort=popular" className="block px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Most Popular
          </Link>
        </div>
      </div>
    </div>
  );
}

// Newsletter Section Component
function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Never Miss an Update</h2>
        <p className="text-xl text-purple-100 mb-8">
          Get the latest AI education insights, teaching tips, and strategies delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1"
          />
          <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, search, page = '1' } = await searchParams;
  setRequestLocale(locale);

  try {
    const posts = getAllPosts(); // server-side using new loader
    const featured = posts.find(p => p.featured) ?? posts[0] ?? null;

    // server filtered groups for SSR clarity - FIX for "All Articles (0)" bug
    const grouped = Object.fromEntries(
      CATEGORIES.map(cat => [
        cat,
        cat === "All Articles" ? posts : posts.filter(p => p.category === cat),
      ])
    );

    // Filter posts based on search params - FIXED LOGIC
    let filteredPosts = posts;
    
    if (category && category !== "All Articles") {
      filteredPosts = grouped[category] || [];
    } else {
      filteredPosts = grouped["All Articles"]; // Always show all posts for "All Articles"
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        (post.description?.toLowerCase() || '').includes(searchLower) ||
        (post.author?.toLowerCase() || '').includes(searchLower)
      );
    }

    // Pagination
    const postsPerPage = 12;
    const currentPage = parseInt(page);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = filteredPosts.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
    );

    // Get featured post for hero
    const heroPost = featured;

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

        {/* Featured Hero Card */}
        {heroPost && (
          <section className="max-w-7xl mx-auto px-4 py-8">
            <FeaturedHeroCard post={heroPost} />
          </section>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-8">
                <BlogSidebar 
                  grouped={grouped}
                  selectedCategory={category}
                />
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">
                    {category ? `${category} Articles` : 'All Articles'} 
                    ({filteredPosts.length})
                  </span>
                </div>
                
                {/* Mobile Filter Button */}
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Articles Grid */}
              {paginatedPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {paginatedPosts.map((post) => (
                      <ArticleCard key={post.slug} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mb-12">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Link
                          key={i + 1}
                          href={`/blog?page=${i + 1}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === i + 1
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-purple-50 border'
                          }`}
                        >
                          {i + 1}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or browse all articles.
                  </p>
                  <Link href="/blog">
                    <Button>Browse All Articles</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    );
  } catch (error) {
    console.error('Error loading blog page:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Temporarily Unavailable</h1>
          <p className="text-gray-600 mb-6">We're working to restore the blog. Please try again shortly.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }
}