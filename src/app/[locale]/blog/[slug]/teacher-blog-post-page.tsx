'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TeacherBlogPost } from '@/lib/blog/teacher-blog-types';
import { 
  ArrowLeft, 
  Clock, 
  Calendar,
  User,
  BookOpen,
  Download,
  ExternalLink,
  Share2,
  Bookmark,
  CheckCircle,
  Users,
  Timer,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Printer
} from 'lucide-react';

interface TeacherBlogPostPageProps {
  post: TeacherBlogPost;
  locale: string;
}

export default function TeacherBlogPostPage({ post, locale }: TeacherBlogPostPageProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [helpfulVote, setHelpfulVote] = useState<'positive' | 'negative' | null>(null);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Save to localStorage or API
  };

  const handleHelpfulVote = (vote: 'positive' | 'negative') => {
    setHelpfulVote(vote);
    // Send to analytics
  };

  const handleAddToClassroom = () => {
    // Google Classroom integration
    alert('Added to Google Classroom!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Get subject and grade styling
  const primarySubject = post.subjects?.[0] || 'general';
  const primaryGrade = post.gradeBands?.[0] || 'k-2';
  
  const subjectColors: Record<string, string> = {
    'math': 'bg-blue-500',
    'ela': 'bg-green-500',
    'science': 'bg-purple-500',
    'social-studies': 'bg-orange-500',
    'art': 'bg-pink-500',
    'technology': 'bg-indigo-500'
  };

  return (
    <article className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/${locale}/blog`}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className={`p-2 rounded-lg transition-colors ${
                  isSaved 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save for later'}
              >
                <Bookmark className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={handlePrint}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                title="Print"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img 
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-8 w-full">
            <div className="flex flex-wrap gap-3 mb-4">
              {/* Subject Badge */}
              <span className={`px-3 py-1 ${subjectColors[primarySubject] || 'bg-gray-500'} text-white rounded-full text-sm font-medium`}>
                {primarySubject?.toUpperCase().replace('-', ' ')}
              </span>
              
              {/* Grade Badge */}
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                {primaryGrade?.toUpperCase()}
              </span>
              
              {/* Content Type */}
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                {post.contentType.replace('-', ' ').toUpperCase()}
              </span>
              
              {post.featured && (
                <span className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium">
                  <Star className="w-3 h-3 fill-current" />
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl">
              {post.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Lesson at a Glance */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Lesson at a Glance</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Timer className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="text-sm text-gray-600">Prep Time</div>
                    <div className="font-medium">{post.prepTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Class Time</div>
                    <div className="font-medium">{post.classTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-600">Reading Time</div>
                    <div className="font-medium">{post.readingTime} min</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Grade Bands</div>
                    <div className="font-medium">{post.gradeBands?.join(', ').toUpperCase() || 'K-2'}</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {post.downloads && post.downloads.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={handleAddToClassroom}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Add to Classroom
                    </button>
                    
                    {post.downloads.map((download, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        {download.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Meta Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  {post.lastUpdated !== post.publishedAt && (
                    <div className="text-xs text-gray-500">
                      Updated: {new Date(post.lastUpdated).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-900">Key Takeaways</h3>
                </div>
                <ul className="space-y-2">
                  {post.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-green-800">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Materials Needed */}
            {post.materials && post.materials.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">📋 Materials Needed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <span className={material.optional ? 'text-gray-600 italic' : 'text-gray-900'}>
                        {material.item}
                        {material.quantity && ` (${material.quantity})`}
                        {material.optional && ' (optional)'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Standards */}
            {post.standards && post.standards.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">📚 Standards Alignment</h3>
                <div className="flex flex-wrap gap-2">
                  {post.standards.map((standard, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg text-sm font-mono"
                    >
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 prose prose-lg max-w-none">
              <div className="leading-relaxed">
                {post.fullContent.split('\n').map((line, index) => {
                  // Skip YAML frontmatter
                  if (line.trim() === '---') return null;
                  if (index < 20 && (line.includes(':') && !line.includes(' '))) {
                    return null;
                  }
                  
                  // Enhanced markdown rendering
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-gray-900">{line.substring(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-gray-900">{line.substring(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-medium mt-4 mb-2 text-gray-900">{line.substring(4)}</h3>;
                  }
                  if (line.trim() === '') {
                    return <div key={index} className="h-4"></div>;
                  }
                  if (line.startsWith('- ') || line.startsWith('* ')) {
                    return <li key={index} className="ml-4 mb-2 text-gray-700">{line.substring(2)}</li>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-bold text-gray-900 mt-4 mb-2">{line.slice(2, -2)}</p>;
                  }
                  return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{line}</p>;
                })}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">🏷️ Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Was this helpful?</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleHelpfulVote('positive')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    helpfulVote === 'positive'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Yes, helpful
                </button>
                
                <button
                  onClick={() => handleHelpfulVote('negative')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    helpfulVote === 'negative'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Needs improvement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}