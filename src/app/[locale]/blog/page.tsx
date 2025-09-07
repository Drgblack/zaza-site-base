import { setRequestLocale } from 'next-intl/server';
import { blogPosts } from '../../../../blog-posts-data';
import Link from 'next/link';
import { BlogPost } from '../../../../blog-posts-data';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = blogPosts || [];
  
  // Get featured post for hero section
  const featuredPost = posts.find(post => post.featured) || posts[0];
  
  // Organize posts by category
  const categories = {
    'Teacher Tips': posts.filter(p => p.category === 'Teacher Tips' || p.category === 'Productivity'),
    'Productivity': posts.filter(p => p.category === 'Time-Saving' || p.category === 'Efficiency'),
    'Parent Communication': posts.filter(p => p.category === 'Parent Communication' || p.category === 'Communication'),
    'Wellbeing': posts.filter(p => p.category === 'Wellbeing' || p.category === 'Work-Life Balance')
  };
  
  // Fill categories with remaining posts if they're sparse
  const remainingPosts = posts.filter(p => !Object.values(categories).flat().includes(p));
  const categoryNames = Object.keys(categories) as (keyof typeof categories)[];
  
  remainingPosts.forEach((post, index) => {
    const categoryIndex = index % categoryNames.length;
    categories[categoryNames[categoryIndex]].push(post);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Post */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Transform Your Teaching with AI
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Join thousands of educators saving 10+ hours weekly with practical AI strategies, proven classroom techniques, and expert insights.
              </p>
              <div className="flex gap-4">
                <Link href={`/${locale}/blog/${featuredPost?.slug || featuredPost?.id}`} 
                      className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Read Latest Post →
                </Link>
                <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Subscribe Free
                </button>
              </div>
            </div>
            
            {/* Right: Featured Post Card */}
            {featuredPost && (
              <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Featured
                  </span>
                  <span className="text-purple-600 font-medium">{featuredPost.readingTime || '5 min read'}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    By {typeof featuredPost.author === 'string' ? featuredPost.author : featuredPost.author.name}
                  </span>
                  <Link href={`/${locale}/blog/${featuredPost.slug || featuredPost.id}`} 
                        className="text-purple-600 font-semibold hover:text-purple-700">
                    Read More →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Category Sections */}
        {Object.entries(categories).map(([categoryName, categoryPosts]) => (
          categoryPosts.length > 0 && (
            <section key={categoryName} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{categoryName}</h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Horizontal Scrollable Tiles */}
              <div className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {categoryPosts.slice(0, 8).map((post) => (
                  <article key={post.id} className="flex-none w-80 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Image */}
                    {(post.image || post.featuredImage) && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image || post.featuredImage || ''}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium bg-purple-600/80 backdrop-blur">
                          {post.category}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        <Link href={`/${locale}/blog/${post.slug || post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.description || post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <span>{typeof post.author === 'string' ? post.author : post.author.name}</span>
                          <span>•</span>
                          <span>{post.readingTime || post.readTime || '5 min read'}</span>
                        </div>
                        {post.featured && <span className="text-orange-500 font-medium">⭐ Featured</span>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        ))}
        
        {/* Email Subscribe Section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-white text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">✨ Never Miss an Update</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join 10,000+ teachers using AI to reclaim their time. Get the latest insights straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
        
        {/* Looking for Something Specific Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Looking for Something Specific?</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['AI Tools', 'Lesson Planning', 'Parent Communication', 'Time Saving', 'Productivity', 'ChatGPT', 'Assessment', 'Classroom Management'].map((topic) => (
              <Link
                key={topic}
                href={`/${locale}/blog?filter=${topic.toLowerCase()}`}
                className="px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-purple-50 hover:border-purple-200 transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}