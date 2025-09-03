import { setRequestLocale } from 'next-intl/server';
import { getAllPosts } from "@/lib/blog.server";
import BlogPageClient from "@/components/blog/BlogPageClient";
import BuildStamp from "@/components/BuildStamp";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI in Education Blog - Zaza Promptly',
  description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.',
  keywords: ['AI education blog', 'teacher resources', 'parent communication', 'educational technology', 'teaching tips'],
  openGraph: {
    title: 'AI in Education Blog - Zaza Promptly',
    description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.',
    type: 'website',
    images: ['/images/blog/og-blog.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI in Education Blog - Zaza Promptly',
    description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.'
  }
};

export const dynamic = "force-static"; // ok to SSG

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string; search?: string}>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, search } = await searchParams;
  
  setRequestLocale(locale);

  const posts = getAllPosts();
  const featured = posts.find(p => p.featured) ?? posts[0] ?? null;

  // build rails (arrays) server-side
  const by = (cat: string) => posts.filter(p => p.category === cat);
  const daysAgo = (n: number) => {
    const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString();
  };
  const newThisWeek = posts.filter(p => p.date >= daysAgo(14));
  const editors = posts.filter(p => p.featured);

  const rows = [
    { title: "Editor's Picks", posts: editors },
    { title: "New This Week", posts: newThisWeek },
    { title: "Teacher Tips", posts: by("Teacher Tips") },
    { title: "Productivity", posts: by("Productivity") },
    { title: "Parent Communication", posts: by("Parent Communication") },
    { title: "Wellbeing", posts: by("Wellbeing") },
    { title: "Most Popular", posts }, // replace with popularity later
  ].filter(row => row.posts.length > 0);

  return (
    <>
      {/* Blog2 Feature Flag Banner */}
      {process.env.NEXT_PUBLIC_BLOG2 === "1" && (
        <div className="bg-blue-600 text-white py-3 px-4 text-center">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm">
              🧪 <strong>New blog experience available!</strong> Clean implementation with better performance.
            </div>
            <a 
              href="/en/blog2" 
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
            >
              Try New Blog →
            </a>
          </div>
        </div>
      )}
      
      <BlogPageClient
        locale={locale}
        featured={featured}
        allPosts={posts}
        rows={rows}
        initialCategory={category}
        initialSearch={search}
      />
      <div className="max-w-6xl mx-auto px-4"><BuildStamp /></div>
    </>
  );
}