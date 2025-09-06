import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getTeacherBlogPostBySlug, getAllTeacherBlogPosts } from '@/lib/blog/fallback-blog-service';
import TeacherBlogPostPage from './teacher-blog-post-page';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = await getTeacherBlogPostBySlug(slug);
    
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
    const posts = await getAllTeacherBlogPosts();
    
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
    console.log(`Attempting to get blog post with slug: ${slug}`);
    const post = await getTeacherBlogPostBySlug(slug);
    console.log(`Blog post found:`, post ? 'Yes' : 'No');

    if (!post) {
      console.log(`No post found for slug: ${slug}`);
      notFound();
    }

    return <TeacherBlogPostPage post={post} locale={locale} />;
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