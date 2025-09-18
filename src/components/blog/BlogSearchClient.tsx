'use client'
import { useMemo, useState } from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { Search, Filter, X } from 'lucide-react'

// Enhanced search and filter implementation
function searchAndFilter(posts: any[], query: string, selectedCategory: string, selectedTags: string[]) {
  let filtered = posts
  
  // Filter by category
  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter(post => post.category === selectedCategory)
  }
  
  // Filter by tags
  if (selectedTags.length > 0) {
    filtered = filtered.filter(post => 
      post.tags?.some((tag: string) => selectedTags.includes(tag))
    )
  }
  
  // Search within filtered results
  if (query) {
    const lowerQuery = query.toLowerCase()
    filtered = filtered.filter(post => 
      post.title?.toLowerCase().includes(lowerQuery) ||
      post.excerpt?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery)) ||
      post.category?.toLowerCase().includes(lowerQuery)
    )
  }
  
  return filtered
}

// Extract unique categories and tags from posts
function extractFilters(posts: any[]) {
  const categories = new Set<string>()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    if (post.category) categories.add(post.category)
    if (post.tags) post.tags.forEach((tag: string) => tags.add(tag))
  })
  
  return {
    categories: Array.from(categories).sort(),
    tags: Array.from(tags).sort()
  }
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
        
        {/* Tags and Category */}
        <div className="mb-4">
          {post.category && (
            <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full mr-2 mb-2">
              {post.category}
            </span>
          )}
          {post.tags?.slice(0, 3).map((tag: string, index: number) => (
            <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-1 mb-1">
              {tag}
            </span>
          ))}
          {post.tags?.length > 3 && (
            <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
          )}
        </div>
        
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
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  
  const { categories, tags } = useMemo(() => extractFilters(posts), [posts])
  const results = useMemo(() => 
    searchAndFilter(posts, query, selectedCategory, selectedTags), 
    [posts, query, selectedCategory, selectedTags]
  )

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedTags([])
    setQuery('')
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const hasActiveFilters = selectedCategory !== 'all' || selectedTags.length > 0 || query

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="mx-auto max-w-6xl mb-8">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={query} 
            onChange={e=>setQuery(e.target.value)}
            placeholder="Search articles (e.g., 'lesson planning', 'parent reports', 'AI tools')"
            className="w-full rounded-xl border bg-white px-12 py-4 text-sm outline-none ring-0
                       focus:border-purple-400 focus:ring-2 focus:ring-purple-100 shadow-sm
                       transition-all duration-200"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors
                       ${showFilters ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                >
                  <X className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Filter */}
            {tags.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {results.length} article{results.length !== 1 ? 's' : ''} found
            {hasActiveFilters && <span className="text-purple-600"> (filtered)</span>}
          </p>
          
          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm">
              {selectedCategory !== 'all' && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {selectedCategory}
                </span>
              )}
              {selectedTags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="mx-auto max-w-6xl">
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </>
  )
}