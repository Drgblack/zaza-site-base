'use client';

import React from 'react';
import Link from 'next/link';
import { TeacherBlogPost } from '@/lib/blog/teacher-blog-types';
import { 
  Clock, 
  Bookmark, 
  Download, 
  ExternalLink,
  Users,
  BookOpen,
  Star,
  CheckCircle
} from 'lucide-react';

interface TeacherBlogCardProps {
  post: TeacherBlogPost;
  locale: string;
  showQuickActions?: boolean;
  onSave?: (postId: string) => void;
  onAddToClassroom?: (post: TeacherBlogPost) => void;
  savedPosts?: string[];
}

export default function TeacherBlogCard({
  post,
  locale,
  showQuickActions = true,
  onSave,
  onAddToClassroom,
  savedPosts = []
}: TeacherBlogCardProps) {
  const isSaved = savedPosts.includes(post.id);
  
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.(post.id);
  };
  
  const handleAddToClassroom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToClassroom?.(post);
  };

  // Get primary subject and grade band for display
  const primarySubject = post.subjects[0];
  const primaryGrade = post.gradeBands[0];
  
  // Content type styling
  const contentTypeStyles = {
    'lesson-plan': { color: 'bg-blue-500', icon: '📋' },
    'how-to': { color: 'bg-green-500', icon: '🛠️' },
    'explainer': { color: 'bg-purple-500', icon: '💡' },
    'case-study': { color: 'bg-orange-500', icon: '📊' },
    'research-to-practice': { color: 'bg-red-500', icon: '🔬' },
    'newsletter': { color: 'bg-pink-500', icon: '📰' }
  };
  
  const contentStyle = contentTypeStyles[post.contentType] || contentTypeStyles['explainer'];

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Hero Image with Overlays */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {/* Subject Badge */}
          <span className="px-3 py-1 bg-white/90 text-gray-800 rounded-full text-xs font-medium backdrop-blur-sm">
            {primarySubject?.toUpperCase().replace('-', ' ')}
          </span>
          
          {/* Grade Band Badge */}
          <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-medium">
            {primaryGrade?.toUpperCase()}
          </span>
        </div>
        
        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          </div>
        )}
        
        {/* Content Type Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`flex items-center gap-1 px-3 py-1 ${contentStyle.color} text-white rounded-full text-xs font-medium`}>
            <span>{contentStyle.icon}</span>
            {post.contentType.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        
        {/* Quick Actions (on hover) */}
        {showQuickActions && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
                  isSaved 
                    ? 'bg-indigo-500 text-white' 
                    : 'bg-white/90 text-gray-700 hover:bg-white'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save for later'}
              >
                <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              
              {post.downloads.length > 0 && (
                <button
                  onClick={handleAddToClassroom}
                  className="p-2 bg-green-500 text-white rounded-lg backdrop-blur-sm hover:bg-green-600 transition-colors"
                  title="Add to Google Classroom"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          <Link href={`/${locale}/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        
        {/* Key Takeaways Preview */}
        {post.keyTakeaways.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Key Takeaways:
            </div>
            <ul className="text-sm text-gray-600 space-y-1">
              {post.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="line-clamp-1">{takeaway}</span>
                </li>
              ))}
              {post.keyTakeaways.length > 2 && (
                <li className="text-indigo-600 text-xs font-medium">
                  +{post.keyTakeaways.length - 2} more insights
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {post.description}
        </p>
        
        {/* Teacher Metadata */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm">
            <div className="text-gray-500 mb-1">Prep Time</div>
            <div className="font-medium text-gray-900">{post.prepTime}</div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500 mb-1">Class Time</div>
            <div className="font-medium text-gray-900">{post.classTime}</div>
          </div>
        </div>
        
        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
            
            {post.materials.length > 0 && (
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {post.materials.length} materials
              </span>
            )}
            
            {post.downloads.length > 0 && (
              <span className="flex items-center gap-1 text-green-600">
                <Download className="w-4 h-4" />
                Downloads
              </span>
            )}
          </div>
          
          <div className="text-xs text-gray-400">
            {new Date(post.lastUpdated).toLocaleDateString()}
          </div>
        </div>
        
        {/* Standards Tags */}
        {post.standards.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-medium text-gray-600 mb-2">Standards:</div>
            <div className="flex flex-wrap gap-1">
              {post.standards.slice(0, 3).map((standard) => (
                <span
                  key={standard}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-mono"
                >
                  {standard}
                </span>
              ))}
              {post.standards.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{post.standards.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{post.tags.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}