export default function BlogPage() {
  const mockPosts = [
    {
      slug: "getting-started-with-teaching",
      title: "Getting Started with Teaching",
      date: "2025-09-08",
      readTime: "5 min read",
      category: "Teaching Tips",
    },
    {
      slug: "classroom-management-strategies",
      title: "Effective Classroom Management Strategies",
      date: "2025-09-05",
      readTime: "8 min read",
      category: "Best Practices",
    },
    {
      slug: "technology-in-education",
      title: "Integrating Technology in Education",
      date: "2025-09-01",
      readTime: "6 min read",
      category: "EdTech",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
        <p className="text-lg text-gray-600 mb-12">
          Discover {mockPosts.length} articles about teaching and education
        </p>
        
        <div className="grid gap-8">
          {mockPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span className="px-2 py-1 bg-gray-100 rounded-md">
                  {post.category}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                <a
                  href={`/en/blog/${post.slug}`}
                  className="hover:text-purple-600 transition-colors"
                >
                  {post.title}
                </a>
              </h2>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}