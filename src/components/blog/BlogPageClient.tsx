'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../../blog-posts-data';

interface BlogPageClientProps {
  posts: BlogPost[];
  locale: string;
  featuredPost?: BlogPost;
}

const categories = [
  'All',
  'Teacher Tips',
  'Productivity', 
  'Parent Communication',
  'Wellbeing',
  'AI Tools',
  'Classroom Management',
  'Lesson Planning',
  'Future of Education'
];

export default function BlogPageClient({ posts, locale, featuredPost }: BlogPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post =>
        post.title?.toLowerCase().includes(searchLower) ||
        post.description?.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (typeof post.author === 'string' ? post.author : post.author?.name)?.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => 
        post.category === selectedCategory ||
        (selectedCategory === 'Teacher Tips' && (post.category === 'Teacher Tips' || post.category === 'Productivity')) ||
        (selectedCategory === 'Productivity' && (post.category === 'Time-Saving' || post.category === 'Efficiency' || post.category === 'Productivity')) ||
        (selectedCategory === 'Parent Communication' && (post.category === 'Parent Communication' || post.category === 'Communication')) ||
        (selectedCategory === 'AI Tools' && (post.tags?.includes('AI tools') || post.tags?.includes('AI') || post.title?.toLowerCase().includes('ai'))) ||
        (selectedCategory === 'Classroom Management' && (post.tags?.includes('classroom management') || post.title?.toLowerCase().includes('classroom'))) ||
        (selectedCategory === 'Lesson Planning' && (post.tags?.includes('lesson planning') || post.title?.toLowerCase().includes('lesson')))
      );
    }

    return filtered;
  }, [posts, searchTerm, selectedCategory]);

  // Organize posts by category for display
  const organizedCategories = useMemo(() => {
    if (searchTerm || selectedCategory !== 'All') {
      // Show filtered results in a single list
      return { 'Search Results': filteredPosts };
    }

    // Original category organization
    const cats = {
      'Teacher Tips': posts.filter(p => p.category === 'Teacher Tips' || p.category === 'Productivity'),
      'Productivity': posts.filter(p => p.category === 'Time-Saving' || p.category === 'Efficiency'),
      'Parent Communication': posts.filter(p => p.category === 'Parent Communication' || p.category === 'Communication'),
      'AI Tools': posts.filter(p => p.tags?.includes('AI tools') || p.tags?.includes('AI') || p.title?.toLowerCase().includes('ai')),
      'Future of Education': posts.filter(p => p.category === 'Future of Education'),
      'Wellbeing': posts.filter(p => p.category === 'Wellbeing' || p.category === 'Work-Life Balance')
    };

    // Fill categories with remaining posts if they're sparse
    const remainingPosts = posts.filter(p => !Object.values(cats).flat().includes(p));
    const categoryNames = Object.keys(cats) as (keyof typeof cats)[];
    
    remainingPosts.forEach((post, index) => {
      const categoryIndex = index % categoryNames.length;
      cats[categoryNames[categoryIndex]].push(post);
    });

    return cats;
  }, [posts, searchTerm, selectedCategory, filteredPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      {/* Search and Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles... (e.g., grading, lesson planning, AI tools)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'All' 
                ? `${filteredPosts.length} articles found${searchTerm ? ` for "${searchTerm}"` : ''}${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}`
                : `${posts.length} articles available`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mid-page subscription */}
        {!searchTerm && selectedCategory === 'All' && (
          <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">✨ Never Miss an Update</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join 10,000+ teachers using AI to save time and thrive in their classrooms.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
          </section>
        )}

        {/* Category Sections or Search Results */}
        {Object.entries(organizedCategories).map(([categoryName, categoryPosts]) => (
          categoryPosts.length > 0 && (
            <section key={categoryName} className="mb-16">
              {/* Category Header */}
              {!searchTerm && selectedCategory === 'All' ? (
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
              ) : (
                searchTerm || selectedCategory !== 'All' ? (
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">{categoryName}</h2>
                  </div>
                ) : null
              )}
              
              {/* Posts Grid/Scroll */}
              <div className={searchTerm || selectedCategory !== 'All' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              }>
                {categoryPosts.slice(0, searchTerm || selectedCategory !== 'All' ? undefined : 8).map((post) => (
                  <article 
                    key={post.id} 
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.02] ${
                      searchTerm || selectedCategory !== 'All' ? '' : 'flex-none w-80'
                    }`}
                  >
                    {/* Image */}
                    {(post.image || post.featuredImage) && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image || post.featuredImage || ''}
                          alt={post.imageAlt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium bg-purple-600/90 backdrop-blur">
                          {post.category}
                        </div>
                        {post.featured && (
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-medium">
                            ⭐ Featured
                          </div>
                        )}
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
                      
                      {/* Enhanced Metadata */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{typeof post.author === 'string' ? post.author : post.author?.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{post.readingTime || post.readTime || '5 min read'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
        ))}

        {/* No Results */}
        {(searchTerm || selectedCategory !== 'All') && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="mx-auto w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No articles match "${searchTerm}". Try a different search term.`
                : `No articles found in ${selectedCategory}. Try a different category.`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom subscription section */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join 10,000+ teachers using AI to save time and thrive in their classrooms.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Get Started Free
            </button>
          </div>
        </section>
      </div>
    </>
  );
}