import { getAllBlog2Posts } from "@/lib/blog2.server";
import NetflixRailClient from "@/components/blog2/NetflixRailClient";

export default function Blog2IndexPage() {
  const posts = getAllBlog2Posts();
  
  // Group posts for rails
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.filter(p => new Date(p.date) > new Date(Date.now() - 14*24*60*60*1000));
  
  return (
    <div className="min-h-screen bg-white" data-route="blog2-index">
      {/* Header */}
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
            AI in Education Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Insights, strategies, and real-world examples from educators transforming their classrooms with AI.
          </p>
          <div className="mt-6 text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full inline-block">
            🧪 New Clean Implementation - Testing Phase
          </div>
        </div>
      </div>

      {/* Rails */}
      <NetflixRailClient title="Editor's Picks" posts={featuredPosts.length ? featuredPosts : posts.slice(0, 8)} railId="featured" basePath="blog2" />
      <NetflixRailClient title="New This Week" posts={recentPosts.length ? recentPosts : posts.slice(0, 8)} railId="recent" basePath="blog2" />
      <NetflixRailClient title="Teacher Tips" posts={posts.filter(p => p.category === 'Teacher Tips').slice(0, 8)} railId="teacher-tips" basePath="blog2" />
      <NetflixRailClient title="Productivity" posts={posts.filter(p => p.category === 'Productivity').slice(0, 8)} railId="productivity" basePath="blog2" />
      <NetflixRailClient title="Parent Communication" posts={posts.filter(p => p.category === 'Parent Communication').slice(0, 8)} railId="parent-comm" basePath="blog2" />
      <NetflixRailClient title="Most Popular" posts={posts.slice(0, 8)} railId="popular" basePath="blog2" />

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