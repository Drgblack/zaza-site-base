import Link from 'next/link';

const BLOG_POSTS: Record<string, any> = {
  "5-minute-ai-wins-busy-teachers": {
    title: "5 Minute AI Wins for Busy Teachers",
    description: "Quick AI tools that save time and boost productivity in the classroom",
    content: "As educators, we're always looking for ways to work smarter, not harder. These AI tools can save you hours of work each week.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop",
    readingTime: "4 min read",
    publishDate: "December 15, 2024"
  },
  "ai-tools-for-teachers": {
    title: "Essential AI Tools Every Teacher Should Know",
    description: "A comprehensive guide to the most useful AI tools for educators",
    content: "The landscape of education technology is evolving rapidly, and AI tools are at the forefront of this transformation.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop",
    readingTime: "6 min read",
    publishDate: "December 10, 2024"
  }
};

export default function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href={`/${locale}/blog`} className="text-indigo-600 hover:text-indigo-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8"
        >
          ← Back to Blog
        </Link>

        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{post.publishDate}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {post.description}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {post.content}
            </p>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              This is a simplified version of our blog system. We're working to restore full functionality while ensuring reliable performance.
            </p>
          </div>
          
          <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-3 text-lg">
              Ready to Transform Your Teaching?
            </h3>
            <p className="text-indigo-700 mb-4">
              Join thousands of educators already using AI to enhance their classroom impact.
            </p>
            <Link 
              href={`/${locale}/signup`}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
            >
              Get Started Today →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}