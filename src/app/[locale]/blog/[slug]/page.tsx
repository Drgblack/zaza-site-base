import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog/service';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found | Zaza Blog'
      };
    }

    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    return {
      title: 'Blog Post | Zaza Blog'
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      notFound();
    }

    return (
      <article className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
          >
            ← Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span className={`px-3 py-1 text-white rounded-full text-sm font-medium ${post.category.color}`}>
              {post.category.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-6">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 pb-8 border-b">
            <div>By {post.author.name}</div>
            <div>{post.readingTime} min read</div>
            <div>{post.wordCount} words</div>
          </div>

          {/* Content - Simple rendering without MDX for now */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>Content Preview:</strong> This is a simplified view of the blog post. 
                The full MDX rendering is being debugged.
              </p>
              <details className="mt-4">
                <summary className="cursor-pointer font-medium text-gray-900 mb-2">
                  Show Raw Content (Debug)
                </summary>
                <pre className="text-xs bg-white p-4 rounded border overflow-x-auto whitespace-pre-wrap">
                  {post.content.slice(0, 1000)}...
                </pre>
              </details>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-medium text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  } catch (error) {
    console.error('Blog post error:', error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Post Error</h1>
          <p className="text-red-600">Unable to load blog post. Please try again later.</p>
          <Link href="/blog" className="mt-4 inline-block text-purple-600 hover:text-purple-700">
            ← Back to Blog
          </Link>
          <pre className="mt-4 text-xs bg-red-100 p-4 rounded text-left">
            {String(error)}
          </pre>
        </div>
      </div>
    );
  }
}