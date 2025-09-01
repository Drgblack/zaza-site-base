import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  return {
    title: `${post.title} | Zaza Technologies Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    const allPosts = getAllPosts();
    const currentIndex = allPosts.findIndex(p => p.slug === slug);
    const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm">
                <Link href={`/${locale}/blog`} className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
            </div>

            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <Badge variant="secondary">{post.category}</Badge>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 max-w-3xl mb-8">
              {post.description}
            </p>

            {/* Featured Image */}
            {post.image && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="object-cover"
                  width={1200}
                  height={600}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-purple max-w-none">
              {/* Basic markdown-style rendering until full MDX bundling is added */}
              <div 
                className="leading-relaxed text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split('\n\n')
                    .map(paragraph => {
                      // Handle headings
                      if (paragraph.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${paragraph.slice(2)}</h1>`;
                      }
                      if (paragraph.startsWith('## ')) {
                        return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${paragraph.slice(3)}</h2>`;
                      }
                      if (paragraph.startsWith('### ')) {
                        return `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">${paragraph.slice(4)}</h3>`;
                      }
                      // Handle bullet points
                      if (paragraph.includes('- ')) {
                        const items = paragraph.split('\n').map(line => {
                          if (line.startsWith('- ')) {
                            return `<li class="mb-2">${line.slice(2)}</li>`;
                          }
                          return line;
                        }).join('\n');
                        return `<ul class="list-disc list-inside space-y-2 my-4">${items}</ul>`;
                      }
                      // Handle bold text
                      const withBold = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      // Regular paragraphs
                      return `<p class="mb-4">${withBold}</p>`;
                    })
                    .join('')
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Post Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Previous Post */}
              {previousPost && (
                <div className="text-left">
                  <p className="text-sm text-gray-500 mb-2">Previous Article</p>
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link href={`/${locale}/blog/${previousPost.slug}`}>
                      <div>
                        <div className="font-semibold text-left line-clamp-2">
                          {previousPost.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(previousPost.date).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              )}

              {/* Next Post */}
              {nextPost && (
                <div className={`text-right ${!previousPost ? 'md:col-start-2' : ''}`}>
                  <p className="text-sm text-gray-500 mb-2">Next Article</p>
                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link href={`/${locale}/blog/${nextPost.slug}`}>
                      <div>
                        <div className="font-semibold text-left line-clamp-2">
                          {nextPost.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {new Date(nextPost.date).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Try AI-Powered Teaching Tools?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of educators who are already saving time with Zaza Promptly.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            asChild
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <a href="https://teach.zazatechnologies.com">
              Start Free Trial
            </a>
          </Button>
        </div>
      </section>
    </article>
  );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    notFound();
  }
}