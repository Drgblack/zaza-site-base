import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

// Hardcoded blog data to avoid any import issues
const samplePosts = [
  {
    slug: 'how-i-won-back-sunday-afternoons',
    title: 'How I Won Back My Sunday Afternoons',
    description: 'Three months ago, I spent every Sunday afternoon hunched over my laptop, writing progress reports.',
    content: 'This is a sample blog post about reclaiming time through AI tools...',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop'
  },
  {
    slug: 'best-ai-tools-teachers-2025',
    title: 'Best AI Tools for Teachers 2025: Complete Guide',
    description: 'Discover the most effective AI tools that are transforming education.',
    content: 'This comprehensive guide explores the top AI tools for educators...',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop'
  },
  {
    slug: '5-minute-ai-wins',
    title: '5-Minute AI Wins for Busy Teachers',
    description: 'Quick, practical AI solutions that take minutes to implement.',
    content: 'Teaching is demanding enough without spending hours learning new technology...',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=400&fit=crop'
  }
];

export async function generateStaticParams() {
  return samplePosts.map(post => ({
    slug: post.slug
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Find the post
  const post = samplePosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Debug Info */}
        <div className="mb-4 p-4 bg-green-50 rounded">
          <p className="text-green-800 text-sm">✅ Blog post page loaded successfully!</p>
          <p className="text-green-800 text-sm">Slug: {slug}</p>
          <p className="text-green-800 text-sm">Post found: {post ? 'Yes' : 'No'}</p>
        </div>

        {/* Hero Image */}
        <div className="mb-6">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.description}</p>
          
          <div className="prose max-w-none">
            <p>{post.content}</p>
            
            <h2>Sample Content</h2>
            <p>This is a simplified version of the blog post to test if the page works at all.</p>
            
            <h3>Key Points:</h3>
            <ul>
              <li>AI tools save time</li>
              <li>Better work-life balance</li>
              <li>Improved teaching quality</li>
              <li>Professional growth</li>
            </ul>
            
            <p>If you can see this content, the blog post page is working correctly.</p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 pt-8 border-t">
          <a href={`/${locale}/blog`} className="text-blue-600 hover:text-blue-700">
            ← Back to Blog
          </a>
        </div>
      </div>
    </article>
  );
}