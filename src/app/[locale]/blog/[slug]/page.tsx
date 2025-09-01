import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getAllPostSlugs } from '@/lib/blog-content';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
  try {
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return { title: 'Blog Post' };
  }
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

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = post.content.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
      <article className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section with Featured Image */}
        {post.image && (
          <section className="relative h-[60vh] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Back Button Overlay */}
            <div className="absolute top-8 left-8 z-10">
              <Button asChild variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                <Link href={`/${locale}/blog`} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* Article Header */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-6">
              {/* Category and Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {post.description}
              </p>

              {/* Share Button */}
              <div className="pt-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Article
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4">
            <div className="prose prose-lg prose-purple max-w-none dark:prose-invert">
              <div 
                className="leading-relaxed text-gray-700 dark:text-gray-300 space-y-6"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split('\n\n')
                    .map(paragraph => {
                      // Handle headings
                      if (paragraph.startsWith('# ')) {
                        return `<h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">${paragraph.slice(2)}</h2>`;
                      }
                      if (paragraph.startsWith('## ')) {
                        return `<h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4">${paragraph.slice(3)}</h3>`;
                      }
                      if (paragraph.startsWith('### ')) {
                        return `<h4 class="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-3">${paragraph.slice(4)}</h4>`;
                      }
                      // Handle bullet points
                      if (paragraph.includes('- ')) {
                        const items = paragraph.split('\n').map(line => {
                          if (line.startsWith('- ')) {
                            return `<li class="mb-2 text-gray-700 dark:text-gray-300">${line.slice(2)}</li>`;
                          }
                          return line;
                        }).join('\n');
                        return `<ul class="list-disc list-inside space-y-2 my-6 pl-4 border-l-4 border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-r-lg">${items}</ul>`;
                      }
                      // Handle bold text
                      const withBold = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-purple-700 dark:text-purple-300">$1</strong>');
                      // Regular paragraphs
                      return `<p class="mb-6 text-lg leading-relaxed">${withBold}</p>`;
                    })
                    .join('')
                }}
              />
            </div>
          </div>
        </section>

        {/* Author Bio Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {post.author?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">About {post.author}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.author === 'Zaza Team' 
                        ? 'The Zaza Team consists of educators, technologists, and AI specialists working together to create tools that truly serve teachers. With backgrounds spanning from classroom instruction to educational research, we understand the daily challenges educators face.'
                        : `${post.author} is an educator and contributor to the Zaza Promptly blog, sharing insights from the classroom and practical strategies for using AI in education.`
                      }
                    </p>
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      View All Posts by {post.author}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Navigation to Previous/Next Posts */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Previous Post */}
              {previousPost && (
                <Card className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Link href={`/${locale}/blog/${previousPost.slug}`} className="block">
                      <div className="p-6">
                        <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 flex items-center gap-2">
                          <ArrowLeft className="w-4 h-4" />
                          Previous Article
                        </p>
                        <h3 className="font-semibold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {previousPost.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {new Date(previousPost.date).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Next Post */}
              {nextPost && (
                <Card className={`group hover:shadow-lg transition-shadow ${!previousPost ? 'md:col-start-2' : ''}`}>
                  <CardContent className="p-0">
                    <Link href={`/${locale}/blog/${nextPost.slug}`} className="block">
                      <div className="p-6 text-right">
                        <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 flex items-center justify-end gap-2">
                          Next Article
                          <ArrowLeft className="w-4 h-4 rotate-180" />
                        </p>
                        <h3 className="font-semibold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                          {nextPost.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {new Date(nextPost.date).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Related Articles CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">
              Explore More AI in Education Insights
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Discover more strategies, tips, and tools to transform your teaching with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
                <Link href={`/${locale}/blog`}>
                  Browse All Articles
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/">
                  Try Zaza Promptly →
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    notFound();
  }
}