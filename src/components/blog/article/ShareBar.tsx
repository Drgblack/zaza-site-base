"use client";

import { useState } from "react";
import { Share2, Copy, Mail, MessageCircle } from "lucide-react";

interface ShareBarProps {
  title: string;
  url: string;
  className?: string;
}

export default function ShareBar({ title, url, className = "" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    url,
  };

  const handleShare = async () => {
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 mr-2">Share:</span>
      
      {/* Native share button (mobile) */}
      {navigator.share && (
        <button
          onClick={handleShare}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Share article"
        >
          <Share2 className="h-5 w-5 text-gray-600" />
        </button>
      )}

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      {/* Email */}
      <a
        href={shareLinks.email}
        className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
        aria-label="Share via email"
      >
        <Mail className="h-5 w-5" />
      </a>

      {/* Twitter */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-colors"
        aria-label="Share on X (Twitter)"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className={`p-2 rounded-lg transition-colors ${
          copied 
            ? "bg-green-50 text-green-600" 
            : "hover:bg-gray-100 text-gray-600"
        }`}
        aria-label="Copy link"
      >
        <Copy className="h-5 w-5" />
        {copied && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}