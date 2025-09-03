"use client";
import { Twitter, Facebook, Link2, Mail } from "lucide-react";
import { useState } from "react";

interface ShareBarProps {
  title: string;
  slug: string;
  mobile?: boolean;
}

export default function ShareBar({ title, slug, mobile = false }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/en/blog/${slug}`
    : `https://zazapromptly.com/en/blog/${slug}`;
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  const buttonClass = mobile
    ? "p-2 rounded-lg hover:bg-gray-100 transition-colors"
    : "p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow";
  
  if (mobile) {
    return (
      <div className="flex items-center gap-4">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          <Twitter className="w-5 h-5" />
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          <Facebook className="w-5 h-5" />
        </a>
        <a href={shareLinks.email} className={buttonClass}>
          <Mail className="w-5 h-5" />
        </a>
        <button onClick={copyToClipboard} className={buttonClass}>
          <Link2 className="w-5 h-5" />
        </button>
        {copied && <span className="text-sm text-green-600">Copied!</span>}
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="text-sm font-medium text-gray-600">Share</span>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        <Twitter className="w-5 h-5 text-gray-700" />
      </a>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        <Facebook className="w-5 h-5 text-gray-700" />
      </a>
      <a href={shareLinks.email} className={buttonClass}>
        <Mail className="w-5 h-5 text-gray-700" />
      </a>
      <button onClick={copyToClipboard} className={buttonClass}>
        <Link2 className="w-5 h-5 text-gray-700" />
      </button>
      {copied && <span className="text-xs text-green-600 -mt-2">Copied!</span>}
    </div>
  );
}