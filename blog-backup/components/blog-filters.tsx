'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, X, Search, TrendingUp, Clock, Star, Hash } from 'lucide-react';

interface BlogFiltersProps {
  categories: string[];
  tags?: string[];
  selectedCategory?: string;
  selectedTag?: string;
  totalPosts?: number;
}

export function BlogFilters({ 
  categories, 
  tags = [], 
  selectedCategory, 
  selectedTag, 
  totalPosts = 0 
}: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Popular categories based on usage (simulated)
  const popularCategories = ['Communication', 'AI in Education', 'AI Tools'];
  
  useEffect(() => {
    const query = searchParams?.get('search') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (category === 'all' || category === selectedCategory) {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    params.delete('tag');
    
    const query = params.toString();
    router.push(`/blog${query ? `?${query}` : ''}`, { scroll: false });
  };

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (tag === selectedTag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    
    const query = params.toString();
    router.push(`/blog${query ? `?${query}` : ''}`, { scroll: false });
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    
    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search');
    }
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    router.push('/blog', { scroll: false });
  };

  const hasFilters = selectedCategory || selectedTag || searchQuery;
  const filteredCategoryCount = selectedCategory ? categories.length : 0;

  return (
    <div className="bg-black py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold text-white">Browse Stories</h2>
            <span className="text-gray-400">({totalPosts} total)</span>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full lg:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search stories, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-500 netflix-smooth"
            />
            {searchQuery && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-white netflix-smooth"
                onClick={() => {
                  setSearchQuery('');
                  handleSearch('');
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="border-gray-600 text-white hover:bg-gray-800 w-fit netflix-smooth lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters {hasFilters && `(${[selectedCategory, selectedTag, searchQuery].filter(Boolean).length})`}
          </Button>

          {hasFilters && (
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <Badge 
                    className="bg-red-600 text-white hover:bg-red-700 cursor-pointer netflix-smooth"
                    onClick={() => handleCategoryChange('all')}
                  >
                    {selectedCategory}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {selectedTag && (
                  <Badge 
                    className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer netflix-smooth"
                    onClick={() => handleTagChange(selectedTag)}
                  >
                    #{selectedTag}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge 
                    className="bg-green-600 text-white hover:bg-green-700 cursor-pointer netflix-smooth"
                    onClick={() => {
                      setSearchQuery('');
                      handleSearch('');
                    }}
                  >
                    "{searchQuery}"
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-gray-400 hover:text-white text-xs netflix-smooth"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Filter Sections */}
        <div className={`grid gap-8 ${isFilterOpen || 'lg:block hidden'}`}>
          {/* Popular Categories */}
          {popularCategories.length > 0 && (
            <div className="netflix-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-white">Popular Categories</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {popularCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className={`px-4 py-2 cursor-pointer border transition-all duration-300 netflix-smooth ${
                      selectedCategory === category 
                        ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                        : 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-white hover:bg-red-500/10'
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* All Categories */}
          <div className="netflix-fade-in netflix-stagger-2">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-white">All Categories</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="outline"
                className={`px-4 py-2 cursor-pointer border transition-all duration-300 netflix-smooth ${
                  !selectedCategory 
                    ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                    : 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-white hover:bg-red-500/10'
                }`}
                onClick={() => handleCategoryChange('all')}
              >
                All Stories
                <span className="ml-1 text-xs opacity-70">({totalPosts})</span>
              </Badge>
              
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`px-4 py-2 cursor-pointer border transition-all duration-300 netflix-smooth ${
                    selectedCategory === category 
                      ? 'bg-red-600 text-white border-red-600 hover:bg-red-700' 
                      : 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-white hover:bg-red-500/10'
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          {tags.length > 0 && (
            <div className="netflix-fade-in netflix-stagger-3">
              <div className="flex items-center gap-2 mb-4">
                <Hash className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Popular Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 12).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`px-3 py-1 cursor-pointer text-xs border transition-all duration-300 netflix-smooth ${
                      selectedTag === tag 
                        ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                        : 'border-gray-600 text-gray-400 hover:border-blue-500 hover:text-white hover:bg-blue-500/10'
                    }`}
                    onClick={() => handleTagChange(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="netflix-fade-in netflix-stagger-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Quick Filters</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="outline"
                className="px-4 py-2 cursor-pointer border-gray-600 text-gray-300 hover:border-green-500 hover:text-white hover:bg-green-500/10 netflix-smooth"
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('sort', 'recent');
                  router.push(`/blog?${params.toString()}`, { scroll: false });
                }}
              >
                Recent Posts
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 cursor-pointer border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-white hover:bg-yellow-500/10 netflix-smooth"
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('featured', 'true');
                  router.push(`/blog?${params.toString()}`, { scroll: false });
                }}
              >
                Featured Only
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 cursor-pointer border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white hover:bg-purple-500/10 netflix-smooth"
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('sort', 'popular');
                  router.push(`/blog?${params.toString()}`, { scroll: false });
                }}
              >
                Most Popular
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}