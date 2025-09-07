'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../../blog-posts-data';

interface BlogArticlePageProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
}

export default function BlogArticlePage({ post, relatedPosts, locale }: BlogArticlePageProps) {
  const [activeSection, setActiveSection] = useState('');

  // Extract headings for table of contents
  const headings = post.content ? extractHeadings(post.content) : [];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2, h3');
      let currentSection = '';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-4xl">
            {/* Back to Blog */}
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center text-white/80 hover:text-white font-medium mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-4 py-2 bg-orange-500 rounded-full text-sm font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              {post.description || post.excerpt}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>By {typeof post.author === 'string' ? post.author : post.author?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readingTime || post.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Table of Contents - Desktop */}
          {headings.length > 0 && (
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {headings.map((heading) => (
                      <button
                        key={heading.id}
                        onClick={() => scrollToSection(heading.id)}
                        className={`block text-left text-sm transition-colors w-full p-2 rounded ${
                          activeSection === heading.id
                            ? 'text-purple-600 bg-purple-50 font-medium'
                            : 'text-gray-600 hover:text-purple-600'
                        } ${heading.level === 3 ? 'pl-4' : ''}`}
                      >
                        {heading.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className={`${headings.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Hero Image */}
              {(post.image || post.featuredImage) && (
                <div className="relative h-64 md:h-96">
                  <img 
                    src={post.image || post.featuredImage || ''}
                    alt={post.imageAlt || post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              <div className="p-8 md:p-12">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {post.content ? (
                    <div 
                      className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-a:text-purple-600 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-2 prose-code:py-1 prose-code:rounded max-w-none prose-h2:scroll-mt-20 prose-h3:scroll-mt-20"
                      dangerouslySetInnerHTML={{ 
                        __html: formatContentWithIds(post.content)
                      }}
                    />
                  ) : (
                    <DefaultArticleContent post={post} />
                  )}
                </div>

                {/* Mid-article subscription */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center my-12">
                  <h3 className="text-2xl font-bold mb-4">💡 Ready to save hours and focus on teaching?</h3>
                  <p className="text-white/90 mb-6">
                    Try Zaza Promptly free today and see how AI can transform your workflow.
                  </p>
                  <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                    <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-2xl p-6 mt-12">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {(typeof post.author === 'string' ? post.author : post.author?.name)?.[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {typeof post.author === 'string' ? post.author : post.author?.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {post.authorBio || (typeof post.author === 'object' ? post.author.bio : '') || 'Educational expert and content creator focused on helping teachers thrive with AI tools.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.slice(0, 3).map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/${locale}/blog/${relatedPost.slug || relatedPost.id}`}
                      className="group"
                    >
                      <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        {(relatedPost.image || relatedPost.featuredImage) && (
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={relatedPost.image || relatedPost.featuredImage || ''}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium bg-purple-600/90 backdrop-blur">
                              {relatedPost.category}
                            </div>
                          </div>
                        )}
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {relatedPost.description || relatedPost.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{relatedPost.readingTime || relatedPost.readTime || '5 min read'}</span>
                            <span className="text-purple-600 font-medium">Read more →</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center mt-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function extractHeadings(content: string): Array<{id: string, text: string, level: number}> {
  const headings = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      const text = line.substring(3).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      headings.push({ id, text, level: 2 });
    } else if (line.startsWith('### ')) {
      const text = line.substring(4).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      headings.push({ id, text, level: 3 });
    }
  }
  
  return headings;
}

function formatContentWithIds(content: string): string {
  return content
    .split('\n')
    .map(line => {
      // Convert markdown headers with IDs
      if (line.startsWith('### ')) {
        const text = line.substring(4).trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        return `<h3 id="${id}" class="text-xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">${text}</h3>`;
      } else if (line.startsWith('## ')) {
        const text = line.substring(3).trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        return `<h2 id="${id}" class="text-2xl font-semibold text-gray-900 mt-10 mb-6 scroll-mt-20">${text}</h2>`;
      } else if (line.startsWith('# ')) {
        const text = line.substring(2).trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        return `<h1 id="${id}" class="text-3xl font-bold text-gray-900 mt-12 mb-8 scroll-mt-20">${text}</h1>`;
      }
      // Convert callout boxes
      else if (line.startsWith('📝 **') || line.startsWith('💡 **') || line.startsWith('📊 **')) {
        const emoji = line.substring(0, 2);
        const content = line.substring(2).trim();
        return `<div class="bg-blue-50 border-l-4 border-blue-400 p-6 my-6 rounded-r-lg">
          <div class="flex items-start">
            <span class="text-2xl mr-3">${emoji}</span>
            <div class="text-blue-800">${content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
          </div>
        </div>`;
      }
      // Convert bold text
      else if (line.includes('**') && line.trim() !== '') {
        const boldConverted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
        return `<p class="text-gray-700 leading-relaxed mb-4">${boldConverted}</p>`;
      }
      // Convert list items
      else if (line.startsWith('- ')) {
        return `<li class="text-gray-700 mb-2">${line.substring(2)}</li>`;
      }
      // Regular paragraphs
      else if (line.trim() !== '') {
        return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`;
      }
      // Empty lines
      else {
        return '<br />';
      }
    })
    .join('');
}

function DefaultArticleContent({ post }: { post: BlogPost }) {
  return (
    <div className="text-gray-700 leading-relaxed text-lg space-y-6">
      {/* Main content description */}
      <div className="text-xl leading-relaxed">
        {post.description || post.excerpt}
      </div>
      
      {/* Category-specific content */}
      {post.category === 'AI Tools' && (
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
          <h3 className="font-semibold text-purple-900 mb-3">What You'll Discover:</h3>
          <ul className="space-y-2 text-purple-700">
            <li>• Cutting-edge AI tools specifically designed for educators</li>
            <li>• Step-by-step implementation guides with screenshots</li>
            <li>• Time-saving automation techniques</li>
            <li>• Safety and privacy best practices for educational AI</li>
          </ul>
        </div>
      )}

      {post.category === 'Parent Communication' && (
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
          <h3 className="font-semibold text-green-900 mb-3">Communication Strategies Include:</h3>
          <ul className="space-y-2 text-green-700">
            <li>• Proven scripts for difficult conversations</li>
            <li>• Email templates that build trust and collaboration</li>
            <li>• De-escalation techniques for tense situations</li>
            <li>• Professional language that shows empathy and authority</li>
          </ul>
        </div>
      )}

      {post.category === 'Teacher Tips' && (
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
          <h3 className="font-semibold text-orange-900 mb-3">Teaching Excellence Features:</h3>
          <ul className="space-y-2 text-orange-700">
            <li>• Classroom-tested strategies from experienced educators</li>
            <li>• Time management techniques that actually work</li>
            <li>• Student engagement methods with proven results</li>
            <li>• Work-life balance tips for sustainable teaching</li>
          </ul>
        </div>
      )}
    </div>
  );
}