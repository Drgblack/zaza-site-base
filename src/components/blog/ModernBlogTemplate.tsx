'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../../blog-posts-data';

interface ModernBlogTemplateProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
}

export default function ModernBlogTemplate({ post, relatedPosts, locale }: ModernBlogTemplateProps) {
  const [activeSection, setActiveSection] = useState('');
  const [showCommentPrompt, setShowCommentPrompt] = useState(false);

  // Extract enhanced content sections
  const processedContent = processContentForModernTemplate(post.content || '');
  const teacherTakeaways = extractTeacherTakeaways(post);
  const tryInClassroom = extractTryInClassroom(post);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            {/* Back to Blog */}
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center text-white/90 hover:text-white font-medium mb-8 transition-all duration-200 hover:translate-x-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 4).map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur text-white text-sm font-medium rounded-full border border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Category & Featured Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-white/25 backdrop-blur rounded-full text-white font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-4 py-2 bg-orange-500 rounded-full text-white font-medium animate-pulse">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              {post.description || post.excerpt}
            </p>

            {/* Metadata with Icons */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span className="font-medium">{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👨‍🏫</span>
                <span className="font-medium">By {typeof post.author === 'string' ? post.author : post.author?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <span className="font-medium">{post.readingTime || post.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sticky Table of Contents */}
          {processedContent.headings.length > 0 && (
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-8">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-xl mr-2">📚</span>
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {processedContent.headings.map((heading) => (
                      <button
                        key={heading.id}
                        onClick={() => scrollToSection(heading.id)}
                        className={`block text-left text-sm transition-all duration-200 w-full p-3 rounded-xl ${
                          activeSection === heading.id
                            ? 'text-purple-600 bg-purple-50 font-semibold border-l-4 border-purple-500'
                            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-25'
                        } ${heading.level === 3 ? 'pl-6 text-xs' : ''}`}
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
          <div className={`${processedContent.headings.length > 0 ? 'lg:col-span-4' : 'lg:col-span-5'}`}>
            <article className="space-y-8">
              {/* Hero Image */}
              {(post.image || post.featuredImage) && (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={post.image || post.featuredImage || ''}
                    alt={post.imageAlt || post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              )}

              {/* Teacher Takeaways Box */}
              {teacherTakeaways.length > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-8 border-l-8 border-orange-400 shadow-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">🎯</span>
                    <h3 className="text-2xl font-bold text-orange-900">Teacher Takeaways</h3>
                  </div>
                  <ul className="space-y-3">
                    {teacherTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-600 font-bold mr-3 mt-1">•</span>
                        <span className="text-orange-800 font-medium text-lg">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Content */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="prose prose-xl max-w-none">
                  <div 
                    className="space-y-8"
                    dangerouslySetInnerHTML={{ 
                      __html: processedContent.html
                    }}
                  />
                </div>

                {/* Mid-article Engagement */}
                <div className="my-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl mr-3">💡</span>
                    <h3 className="text-2xl font-bold">Ready to save hours and focus on teaching?</h3>
                  </div>
                  <p className="text-white/90 mb-6 text-lg">
                    Try Zaza Promptly free today and see how AI can transform your workflow.
                  </p>
                  <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
                    />
                    <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                      Get Started Free
                    </button>
                  </div>
                </div>

                {/* Try This in Your Classroom */}
                {tryInClassroom.length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-8 border-l-8 border-green-500 shadow-lg">
                    <div className="flex items-center mb-6">
                      <span className="text-3xl mr-3">🚀</span>
                      <h3 className="text-2xl font-bold text-green-900">Try This in Your Classroom</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {tryInClassroom.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                          <h4 className="font-bold text-green-800 mb-3 flex items-center">
                            <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                              {index + 1}
                            </span>
                            Step {index + 1}
                          </h4>
                          <p className="text-green-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Bio */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl p-8 mt-12 shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {(typeof post.author === 'string' ? post.author : post.author?.name)?.[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        {typeof post.author === 'string' ? post.author : post.author?.name}
                      </h4>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {post.authorBio || (typeof post.author === 'object' ? post.author.bio : '') || 'Educational expert and content creator focused on helping teachers thrive with AI tools.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discussion Prompt */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-4xl mr-3">💬</span>
                    <h3 className="text-2xl font-bold text-gray-900">Join the Discussion</h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Have you tried similar strategies in your classroom? We'd love to hear about your experiences!
                  </p>
                </div>
                
                <button
                  onClick={() => setShowCommentPrompt(!showCommentPrompt)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {showCommentPrompt ? 'Hide Comment Box' : 'Share Your Experience'}
                </button>

                {showCommentPrompt && (
                  <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                    <textarea
                      placeholder="Tell us about your experience with this topic..."
                      className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="flex justify-end mt-3">
                      <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors">
                        Share Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center mb-8">
                    <span className="text-3xl mr-3">📖</span>
                    <h2 className="text-3xl font-bold text-gray-900">Related Articles</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.slice(0, 3).map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/${locale}/blog/${relatedPost.slug || relatedPost.id}`}
                        className="group"
                      >
                        <article className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-full">
                          {(relatedPost.image || relatedPost.featuredImage) && (
                            <div className="relative h-32 overflow-hidden rounded-xl mb-4">
                              <img
                                src={relatedPost.image || relatedPost.featuredImage || ''}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                          
                          <div className="space-y-3">
                            <span className="inline-block px-3 py-1 bg-purple-200 text-purple-800 text-sm font-medium rounded-full">
                              {relatedPost.category}
                            </span>
                            
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                              {relatedPost.title}
                            </h3>
                            
                            <p className="text-gray-600 line-clamp-2 text-sm">
                              {relatedPost.description || relatedPost.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span className="flex items-center">
                                <span className="mr-1">⏱️</span>
                                {relatedPost.readingTime || relatedPost.readTime || '5 min read'}
                              </span>
                              <span className="text-purple-600 font-medium group-hover:translate-x-1 transition-transform">
                                Read more →
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Final CTA */}
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-5xl mr-4">🚀</span>
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to Transform Your Teaching?</h2>
                  </div>
                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                    Join 10,000+ teachers using AI to save time and thrive in their classrooms.
                  </p>
                  <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
                    />
                    <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg">
                      Get Started Free
                    </button>
                  </div>
                  <p className="text-white/80 text-sm mt-4">
                    ✨ No credit card required • 14-day free trial • Cancel anytime
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced content processing functions
function processContentForModernTemplate(content: string) {
  const headings: Array<{id: string, text: string, level: number}> = [];
  
  const html = content
    .split('\n')
    .map(line => {
      // Convert headers with IDs and icons
      if (line.startsWith('### ')) {
        const text = line.substring(4).trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        headings.push({ id, text, level: 3 });
        return `<h3 id="${id}" class="text-2xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20 flex items-center">
          <span class="text-purple-600 mr-3">📌</span>${text}
        </h3>`;
      } else if (line.startsWith('## ')) {
        const text = line.substring(3).trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        headings.push({ id, text, level: 2 });
        return `<h2 id="${id}" class="text-3xl font-bold text-gray-900 mt-16 mb-8 scroll-mt-20 flex items-center">
          <span class="text-indigo-600 mr-4">🎯</span>${text}
        </h2>`;
      }
      // Enhanced callout boxes
      else if (line.startsWith('📝 **') || line.includes('**Tips & Tricks**')) {
        const content = line.replace(/📝 \*\*|\*\*/g, '').trim();
        return `<div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-8 border-blue-400 rounded-2xl p-8 my-8 shadow-lg">
          <div class="flex items-start">
            <span class="text-4xl mr-4 mt-1">📝</span>
            <div>
              <h4 class="text-xl font-bold text-blue-900 mb-3">Tips & Tricks</h4>
              <p class="text-blue-800 text-lg leading-relaxed">${content}</p>
            </div>
          </div>
        </div>`;
      }
      else if (line.startsWith('💡 **') || line.includes('**Pro Insights**')) {
        const content = line.replace(/💡 \*\*|\*\*/g, '').trim();
        return `<div class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-8 border-amber-400 rounded-2xl p-8 my-8 shadow-lg">
          <div class="flex items-start">
            <span class="text-4xl mr-4 mt-1">💡</span>
            <div>
              <h4 class="text-xl font-bold text-amber-900 mb-3">Pro Insights</h4>
              <p class="text-amber-800 text-lg leading-relaxed">${content}</p>
            </div>
          </div>
        </div>`;
      }
      else if (line.startsWith('📊 **') || line.includes('**Did You Know?**')) {
        const content = line.replace(/📊 \*\*|\*\*/g, '').trim();
        return `<div class="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-8 border-emerald-400 rounded-2xl p-8 my-8 shadow-lg">
          <div class="flex items-start">
            <span class="text-4xl mr-4 mt-1">📊</span>
            <div>
              <h4 class="text-xl font-bold text-emerald-900 mb-3">Did You Know?</h4>
              <p class="text-emerald-800 text-lg leading-relaxed">${content}</p>
            </div>
          </div>
        </div>`;
      }
      // Pull quotes
      else if (line.startsWith('> ')) {
        const quote = line.substring(2).trim();
        return `<blockquote class="border-l-8 border-purple-500 bg-purple-50 rounded-r-2xl p-8 my-8 shadow-lg">
          <p class="text-2xl font-semibold text-purple-900 italic leading-relaxed">"${quote}"</p>
        </blockquote>`;
      }
      // Enhanced lists
      else if (line.startsWith('- ')) {
        const content = line.substring(2).trim();
        return `<li class="flex items-start py-2">
          <span class="text-purple-500 font-bold text-xl mr-3 mt-1">•</span>
          <span class="text-gray-700 text-lg leading-relaxed">${content}</span>
        </li>`;
      }
      // Enhanced paragraphs
      else if (line.trim() !== '' && !line.startsWith('<')) {
        const boldConverted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');
        return `<p class="text-gray-700 leading-relaxed mb-6 text-lg">${boldConverted}</p>`;
      }
      else if (line.trim() === '') {
        return '<div class="h-4"></div>';
      }
      return line;
    })
    .join('');

  return { html, headings };
}

function extractTeacherTakeaways(post: BlogPost): string[] {
  // Extract key points from the content for teacher takeaways
  const takeaways = [];
  
  if (post.category === 'AI Tools') {
    takeaways.push('AI tools can save 5-10 hours per week when used strategically');
    takeaways.push('Start with one tool and master it before adding more');
    takeaways.push('Always maintain your professional judgment and personal touch');
  } else if (post.category === 'Teacher Tips') {
    takeaways.push('Small changes in routine can lead to significant time savings');
    takeaways.push('Focus on systems that work for your teaching style');
    takeaways.push('Student engagement increases when teachers are less stressed');
  } else if (post.category === 'Parent Communication') {
    takeaways.push('Clear, empathetic communication prevents most conflicts');
    takeaways.push('Templates save time while maintaining personalization');
    takeaways.push('Proactive communication builds stronger relationships');
  } else {
    takeaways.push('Evidence-based strategies lead to better outcomes');
    takeaways.push('Implementation requires patience and consistency');
    takeaways.push('Small steps create sustainable change');
  }
  
  return takeaways;
}

function extractTryInClassroom(post: BlogPost): string[] {
  // Extract actionable steps for classroom implementation
  const steps = [];
  
  if (post.category === 'AI Tools') {
    steps.push('Choose one AI tool that addresses your biggest challenge');
    steps.push('Test it with a small task to understand its capabilities');
    steps.push('Create templates or prompts for common use cases');
    steps.push('Track time saved and quality improvements');
  } else if (post.category === 'Teacher Tips') {
    steps.push('Identify your biggest time drain or stress point');
    steps.push('Implement the suggested strategy for one week');
    steps.push('Adjust the approach to fit your specific context');
    steps.push('Share your results with a colleague for accountability');
  } else {
    steps.push('Start with one small change this week');
    steps.push('Document what works and what doesn\'t');
    steps.push('Involve students in the process when appropriate');
    steps.push('Build on successes gradually over time');
  }
  
  return steps;
}