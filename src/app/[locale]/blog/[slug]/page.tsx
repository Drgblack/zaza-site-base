import type { Metadata } from 'next';
import {Link} from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, getAdjacentPosts } from '@/lib/blog2.server';
import { MDXContent } from '@/components/blog/MDXContent';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { PostNavigation } from '@/components/blog/PostNavigation';
import { BlogImage } from '@/components/blog/BlogImage';

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
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com';
  const imageUrl = post.image?.startsWith('/') 
    ? `${baseUrl}${post.image}` 
    : post.image || `${baseUrl}/images/blog/default.jpg`;

  return {
    title: `${post.title} | Zaza Promptly Blog`,
    description: post.excerpt,
    canonical: `${baseUrl}/${locale}/blog/${slug}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.mtime?.toISOString(),
      authors: [post.author || 'Zaza Team'],
      images: [imageUrl],
      url: `${baseUrl}/${locale}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: { params: { locale: string; slug: string } }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug).catch(() => null);
  if (!post) return notFound();

  const { prevPost, nextPost } = await getAdjacentPosts(resolvedParams.slug);

  // Format dates
  const publishedDate = post.date ? new Date(post.date) : null;
  const updatedDate = post.mtime ? new Date(post.mtime) : null;

  // Generate JSON-LD structured data for BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image?.startsWith('/') 
      ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'}${post.image}`
      : post.image || `${process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'}/images/blog/default.jpg`,
    "datePublished": publishedDate?.toISOString(),
    "dateModified": updatedDate?.toISOString() || publishedDate?.toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "Zaza Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Promptly",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'}/images/zaza-logo.png`
      }
    },
    "url": `${process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'}/${resolvedParams.locale}/blog/${resolvedParams.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'}/${resolvedParams.locale}/blog/${resolvedParams.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8">
            <Link 
              href="/blog"
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
            >
              ← Back to Blog
            </Link>
          </nav>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Article Header */}
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {post.category || 'Education'}
                  </span>
                  <span className="text-sm text-gray-500">{post.readingTime}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
                  <div className="text-sm text-gray-600">
                    By <span className="font-medium text-gray-900">{post.author}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-x-4">
                    {publishedDate && (
                      <time dateTime={post.date}>
                        Published {publishedDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                    {updatedDate && updatedDate.getTime() !== publishedDate?.getTime() && (
                      <time dateTime={updatedDate.toISOString()}>
                        Updated {updatedDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    )}
                  </div>
                </div>
              </header>

              {/* Cover Image */}
              {post.image && (
                <div className="mb-12 relative h-64 md:h-80 lg:h-96">
                  <BlogImage
                    src={post.image}
                    alt={`Cover image for ${post.title}`}
                    title={post.title}
                    className="w-full h-full shadow-lg"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {post.content && <MDXContent content={post.content} />}
              </div>

              {/* Post Navigation */}
              <PostNavigation prevPost={prevPost} nextPost={nextPost} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Table of Contents */}
                {post.content && <TableOfContents content={post.content} />}

                {/* Author Bio */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    About the Author
                  </h3>
                  <p className="text-gray-600">
                    {post.author === 'Zaza Team' 
                      ? 'The Zaza Team consists of passionate educators and AI advocates helping teachers transform their classrooms with innovative technology.'
                      : `${post.author} is a passionate educator focused on AI-powered teaching solutions.`
                    }
                  </p>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Get More Teaching Tips
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join thousands of educators receiving weekly AI teaching insights.
                  </p>
                  <Link 
                    href="/"
                    className="inline-block bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Try Zaza Promptly Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}