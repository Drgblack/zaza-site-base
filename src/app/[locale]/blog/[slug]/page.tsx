import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog/mdx-blog-service';
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
            href={`/${locale}/blog`}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8"
          >
            ← Back to Blog
          </Link>

          {/* Hero Image */}
          <div className="relative mb-8 rounded-xl overflow-hidden">
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <span className={`px-3 py-1 text-white rounded-full text-sm font-medium ${post.category.color} mr-3`}>
                <span className="mr-1">{post.category.icon}</span>
                {post.category.name}
              </span>
              {post.featured && (
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <span>By {post.author.name}</span>
            </div>
            <div>⏱️ {post.readingTime} min read</div>
            <div>📅 {new Date(post.publishedAt).toLocaleDateString()}</div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-purple-600 prose-strong:text-gray-900">
            {post.fullContent ? (
              <div className="leading-relaxed">
                {post.fullContent.split('\n').map((line, index) => {
                  // Skip YAML frontmatter
                  if (line.trim() === '---') return null;
                  if (index < 20 && (line.startsWith('title:') || line.startsWith('description:') || line.startsWith('date:') || line.startsWith('category:') || line.startsWith('tags:') || line.startsWith('author:') || line.startsWith('featured:') || line.startsWith('readingTime:'))) {
                    return null;
                  }
                  
                  // Simple markdown-like rendering
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-gray-900">{line.substring(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-gray-900">{line.substring(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-medium mt-4 mb-2 text-gray-900">{line.substring(4)}</h3>;
                  }
                  if (line.trim() === '') {
                    return <div key={index} className="h-4"></div>;
                  }
                  if (line.startsWith('- ') || line.startsWith('* ')) {
                    return <li key={index} className="ml-4 mb-1 text-gray-700">{line.substring(2)}</li>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-bold text-gray-900 mt-4 mb-2">{line.slice(2, -2)}</p>;
                  }
                  if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
                    return <p key={index} className="italic text-gray-600 mt-2 mb-2">{line.slice(1, -1)}</p>;
                  }
                  return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{line}</p>;
                })}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-800">
                  Content is being processed. Please check back soon!
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-medium text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
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
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Post Error</h1>
          <p className="text-red-600 mb-4">Unable to load blog post content.</p>
          <Link href={`/${locale}/blog`} className="mt-4 inline-block text-purple-600 hover:text-purple-700">
            ← Back to Blog
          </Link>
          <div className="mt-6 text-left">
            <details className="bg-red-100 p-4 rounded">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <pre className="mt-2 text-xs overflow-x-auto">
                {String(error)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    );
  }
}