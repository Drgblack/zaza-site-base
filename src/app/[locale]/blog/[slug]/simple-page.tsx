import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

// Hardcoded blog posts to avoid any service issues
const BLOG_POSTS = {
  "5-minute-ai-wins-busy-teachers": {
    title: "5 Minute AI Wins for Busy Teachers",
    description: "Quick AI tools that save time and boost productivity in the classroom",
    content: "Discover powerful AI tools that can be implemented in just 5 minutes to transform your teaching workflow. As teachers, we're always looking for ways to save time and improve our effectiveness.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop"
  },
  "ai-tools-for-teachers": {
    title: "Essential AI Tools Every Teacher Should Know",
    description: "A comprehensive guide to the most useful AI tools for educators",
    content: "AI is transforming education, offering teachers powerful new ways to create content, provide feedback, and manage their workload. Here are the essential tools every educator should have in their toolkit.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop"
  }
};

export async function generateStaticParams() {
  return [
    { slug: "5-minute-ai-wins-busy-teachers" },
    { slug: "ai-tools-for-teachers" }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  
  if (!post) {
    return { title: 'Post Not Found | Zaza Blog' };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function SimpleBlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {post.description}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {post.content}
            </p>
            
            <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-3">
                Ready to get started?
              </h3>
              <p className="text-indigo-700">
                This is a simplified blog post to test the system. The full blog functionality 
                will be restored once we resolve the technical issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}