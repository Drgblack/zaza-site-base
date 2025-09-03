"use client";

import { useState } from 'react';

type Post = {
  title: string;
  slug: string;
  description?: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
  featured?: boolean;
  image?: string;
  content: string;
};

interface DebugInfoProps {
  posts: Post[];
}

export function DebugInfo({ posts }: DebugInfoProps) {
  const [showDebug, setShowDebug] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const imageStats = posts.reduce((acc, post) => {
    if (post.image?.includes('default.svg')) {
      acc.defaults++;
    } else if (post.image?.includes('http')) {
      acc.external++;
    } else {
      acc.internal++;
    }
    return acc;
  }, { defaults: 0, external: 0, internal: 0 });

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="bg-purple-600 text-white px-3 py-2 rounded text-xs"
      >
        Debug
      </button>
      
      {showDebug && (
        <div className="absolute bottom-12 right-0 bg-white border rounded p-4 shadow-lg text-xs max-w-sm">
          <h4 className="font-bold mb-2">Blog Debug Info</h4>
          <div className="space-y-1">
            <div>Total Posts: {posts.length}</div>
            <div>Default Images: {imageStats.defaults}</div>
            <div>External Images: {imageStats.external}</div>
            <div>Internal Images: {imageStats.internal}</div>
          </div>
          
          <div className="mt-4">
            <h5 className="font-semibold">Sample Images:</h5>
            <div className="max-h-32 overflow-y-auto">
              {posts.slice(0, 5).map(post => (
                <div key={post.slug} className="text-[10px] truncate">
                  {post.slug}: {post.image}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}