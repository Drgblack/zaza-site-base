import type { Metadata } from 'next';
import {Link} from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog2.server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const dynamic = "error";
export const dynamicParams = false;
export const revalidate = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  // Return params WITHOUT locale — Next will handle for each [locale] segment
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Zaza Promptly Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Dr. Greg Blackburn'],
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function Page({ params }: { params: { locale: string; slug: string } }) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) return notFound();

  return (
    <article className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <Link 
            href="/blog"
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
          >
            ← Back to Blog
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              Education
            </span>
            <span className="text-sm text-gray-500">5 min read</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="text-sm text-gray-600">
              By <span className="font-medium text-gray-900">Dr. Greg Blackburn</span>
            </div>
            <time className="text-sm text-gray-600" dateTime={post.date}>
              {post.date ? new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : 'Recent'}
            </time>
          </div>
        </header>

        {/* Cover Image */}
        {post.image && (
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={`Cover image for ${post.title}`}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Full MDX content rendering */}
            {post.content ? (
              <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
                <MDXRemote 
                  source={post.content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                    },
                  }}
                />
              </div>
            ) : (
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  {post.excerpt || 'This comprehensive guide explores the latest AI tools and techniques for modern educators. Learn how to transform your teaching practice with cutting-edge artificial intelligence solutions designed specifically for classroom use.'}
                </p>
                <p className="leading-relaxed">
                  Transform your lesson planning, student engagement, and administrative tasks with AI-powered tools that understand the unique challenges of education. This guide covers practical strategies you can implement immediately.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            About the Author
          </h3>
          <p className="text-gray-600">
            Dr. Greg Blackburn is a PhD-qualified educator and founder of Zaza Technologies. 
            With over 20 years in learning & development, he helps teachers integrate AI 
            technology into their classrooms effectively and safely.
          </p>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-purple-50 rounded-2xl p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get More Teaching Tips
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of educators receiving weekly AI teaching insights.
          </p>
          <Link 
            href="/"
            className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Try Zaza Promptly Free
          </Link>
        </div>
      </div>
    </article>
  );
}