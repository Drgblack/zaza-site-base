'use client'
import { useMemo, useState } from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

// Simple search implementation without external dependencies
function simpleSearch(posts: any[], query: string) {
  if (!query) return posts
  
  const lowerQuery = query.toLowerCase()
  return posts.filter(post => 
    post.title?.toLowerCase().includes(lowerQuery) ||
    post.excerpt?.toLowerCase().includes(lowerQuery) ||
    post.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
  )
}

function PostCard({ post }: { post: any }) {
  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      {/* Post Image */}
      <div className="relative h-48 bg-gradient-to-r from-purple-100 to-blue-100">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl">📚</div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {post.title}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {post.excerpt || 'Transform your teaching with AI-powered tools and strategies...'}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <span>Dr. Greg Blackburn</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            {post.date ? new Date(post.date).toLocaleDateString() : 'Recent'}
          </div>
        </div>
        
        {/* Read More Link */}
        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
  )
}

export default function BlogSearchClient({ posts }:{ posts: Array<any> }) {
  const [q, setQ] = useState('')
  
  const results = useMemo(() => simpleSearch(posts, q), [posts, q])

  return (
    <>
      <div className="mx-auto max-w-4xl mb-6">
        <input
          value={q} 
          onChange={e=>setQ(e.target.value)}
          placeholder="Search articles (e.g., 'lesson planning', 'parent reports')"
          className="w-full rounded-xl border bg-white/70 px-4 py-3 text-sm outline-none ring-0
                     focus:border-brand-400 focus:bg-white shadow-sm"
        />
        <p className="mt-2 text-xs text-zinc-500">{results.length} result{results.length!==1?'s':''}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  )
}