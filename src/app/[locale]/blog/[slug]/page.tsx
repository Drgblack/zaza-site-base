import type { Metadata } from 'next';
import Link from 'next-intl/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Zaza Promptly Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <Link 
            href={`/${locale}/blog`}
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
          >
            ← Back to Blog
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              {post.category}
            </span>
            {post.readTime && (
              <span className="text-sm text-gray-500">{post.readTime}</span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="text-sm text-gray-600">
              By <span className="font-medium text-gray-900">{post.author}</span>
            </div>
            <time className="text-sm text-gray-600" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
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
            {/* Simplified content rendering - in production would use MDX */}
            <div className="space-y-4 text-gray-700">
              {post.content.split('\n\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            About the Author
          </h3>
          <p className="text-gray-600">
            {post.author} is a passionate educator and AI advocate helping teachers 
            transform their classrooms with innovative technology.
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
            href={`/${locale}`}
            className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Try Zaza Promptly Free
          </Link>
        </div>
      </div>
    </article>
  );
}