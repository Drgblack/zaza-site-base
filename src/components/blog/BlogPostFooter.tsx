'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Heart, Bookmark, Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';
import { BlogPost } from '@/lib/blog/types';
import { formatDate } from '@/lib/blog/utils';

interface BlogPostFooterProps {
  post: BlogPost;
}

export default function BlogPostFooter({ post }: BlogPostFooterProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;
  const shareText = post.description;

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(shareText);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy URL');
      }
      return;
    }

    const url = urls[platform as keyof typeof urls];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="border-t border-gray-200 pt-8 mt-12">
      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              liked 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">
              {liked ? 'Liked' : 'Like'} ({(post.likes || 0) + (liked ? 1 : 0)})
            </span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              bookmarked 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">
              {bookmarked ? 'Saved' : 'Save'}
            </span>
          </button>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 mr-2">Share:</span>
          
          <button
            onClick={() => handleShare('twitter')}
            className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => handleShare('linkedin')}
            className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => handleShare('facebook')}
            className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => handleShare('copy')}
            className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            title="Copy link"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Author Bio */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar || '/images/team/default-avatar.jpg'}
            alt={post.author.name}
            className="w-16 h-16 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">{post.author.name}</h3>
            <p className="text-gray-600 text-sm mb-3">
              {post.author.bio || `${post.author.name} is an education specialist at Zaza, dedicated to helping teachers integrate AI tools effectively in their classrooms.`}
            </p>
            <div className="text-sm text-gray-500">
              {post.author.role && (
                <span className="font-medium">{post.author.role}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Metadata */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Article Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Published:</span>
            <span className="ml-2 font-medium">{formatDate(post.publishedAt)}</span>
          </div>
          {post.updatedAt && (
            <div>
              <span className="text-gray-500">Updated:</span>
              <span className="ml-2 font-medium">{formatDate(post.updatedAt)}</span>
            </div>
          )}
          <div>
            <span className="text-gray-500">Reading Time:</span>
            <span className="ml-2 font-medium">{post.readingTime} minutes</span>
          </div>
          <div>
            <span className="text-gray-500">Word Count:</span>
            <span className="ml-2 font-medium">{post.wordCount.toLocaleString()} words</span>
          </div>
          <div>
            <span className="text-gray-500">Category:</span>
            <Link 
              href={`/blog?category=${post.category.slug}`}
              className="ml-2 font-medium text-purple-600 hover:text-purple-700"
            >
              {post.category.name}
            </Link>
          </div>
          <div>
            <span className="text-gray-500">Difficulty:</span>
            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
              post.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              post.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {post.difficulty}
            </span>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-500 text-sm block mb-2">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}