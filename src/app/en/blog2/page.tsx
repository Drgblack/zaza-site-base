import { getAllBlog2Posts } from "@/lib/blog2.server";
import PostCard2 from "@/components/blog2/PostCard2";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Blog2IndexPage() {
  const posts = getAllBlog2Posts();
  
  // Group posts for rails
  const featuredPosts = posts.filter(p => p.featured).slice(0, 8);
  const recentPosts = posts.slice(0, 12);
  const categories = [...new Set(posts.map(p => p.category))];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
            AI Teaching Blog v2
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover practical AI strategies, tools, and insights designed specifically for educators.
          </p>
          <div className="mt-6 text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full inline-block">
            🧪 New Clean Implementation - Testing Phase
          </div>
        </div>
      </div>

      {/* Featured Posts Rail */}
      {featuredPosts.length > 0 && (
        <section className="relative mx-auto max-w-6xl px-4 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full border hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div 
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              } as any}
            >
              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              
              {featuredPosts.map((post) => (
                <PostCard2 key={post.slug} post={post} />
              ))}
              
              {/* Right fade with peek */}
              <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Rail */}
      <section className="relative mx-auto max-w-6xl px-4 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Latest Posts</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full border hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div 
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitScrollbar: { display: 'none' }
            } as any}
          >
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            
            {recentPosts.map((post) => (
              <PostCard2 key={post.slug} post={post} />
            ))}
            
            {/* Right fade with peek */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Category Rails */}
      {categories.slice(0, 3).map(category => {
        const categoryPosts = posts.filter(p => p.category === category).slice(0, 8);
        if (categoryPosts.length < 2) return null;
        
        return (
          <section key={category} className="relative mx-auto max-w-6xl px-4 mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
              <div className="flex gap-2">
                <button className="p-2 rounded-full border hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full border hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div 
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitScrollbar: { display: 'none' }
                } as any}
              >
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                
                {categoryPosts.map((post) => (
                  <PostCard2 key={post.slug} post={post} />
                ))}
                
                {/* Right fade with peek */}
                <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </section>
        );
      })}

      {/* Debug Info */}
      <section className="mx-auto max-w-6xl px-4 py-8 mt-16 border-t">
        <div className="text-center text-sm text-gray-500">
          <p>Blog2 System: {posts.length} posts loaded</p>
          <p>Build: {process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local'}</p>
        </div>
      </section>
    </div>
  );
}