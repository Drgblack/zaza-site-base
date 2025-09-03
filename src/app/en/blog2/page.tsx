import { getAllBlog2Posts } from "@/lib/blog2.server";
import NetflixRailClient from "@/components/blog2/NetflixRailClient";
import Link from "next/link";

export default function Blog2Page() {
  const posts = getAllBlog2Posts();
  
  // Group posts for rails
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.filter(p => new Date(p.date) > new Date(Date.now() - 14*24*60*60*1000));
  const teacherTips = posts.filter(p => p.category === 'Teacher Tips');
  const productivity = posts.filter(p => p.category === 'Productivity');
  const parentComm = posts.filter(p => p.category === 'Parent Communication');
  
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
        </div>
      </div>

      {/* Netflix-style Rails */}
      <NetflixRailClient 
        title="Editor's Picks" 
        posts={featuredPosts.length ? featuredPosts : posts.slice(0, 8)} 
        railId="featured" 
        basePath="blog2" 
      />
      
      {recentPosts.length > 0 && (
        <NetflixRailClient 
          title="New This Week" 
          posts={recentPosts} 
          railId="recent" 
          basePath="blog2" 
        />
      )}
      
      {teacherTips.length > 0 && (
        <NetflixRailClient 
          title="Teacher Tips" 
          posts={teacherTips.slice(0, 8)} 
          railId="teacher-tips" 
          basePath="blog2" 
        />
      )}
      
      {productivity.length > 0 && (
        <NetflixRailClient 
          title="Productivity" 
          posts={productivity.slice(0, 8)} 
          railId="productivity" 
          basePath="blog2" 
        />
      )}
      
      {parentComm.length > 0 && (
        <NetflixRailClient 
          title="Parent Communication" 
          posts={parentComm.slice(0, 8)} 
          railId="parent-comm" 
          basePath="blog2" 
        />
      )}
      
      <NetflixRailClient 
        title="Most Popular" 
        posts={posts.slice(0, 8)} 
        railId="popular" 
        basePath="blog2" 
      />
    </div>
  );
}