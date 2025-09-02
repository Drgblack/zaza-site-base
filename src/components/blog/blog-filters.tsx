'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory?: string;
  selectedTag?: string;
}

export function BlogFilters({ categories, selectedCategory, selectedTag }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category === 'all' || category === selectedCategory) {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    // Clear tag when changing category
    params.delete('tag');
    
    const query = params.toString();
    router.push(`/blog${query ? `?${query}` : ''}`);
  };

  const handleTagClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('tag');
    
    const query = params.toString();
    router.push(`/blog${query ? `?${query}` : ''}`);
  };

  const clearAllFilters = () => {
    router.push('/blog');
  };

  const hasFilters = selectedCategory || selectedTag;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="text-lg font-semibold">Filter by Category:</span>
        </div>
        {hasFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-gray-600 dark:text-gray-400"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Badge
          variant={!selectedCategory ? "default" : "outline"}
          className={`px-4 py-2 cursor-pointer transition-all ${
            !selectedCategory 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
          }`}
          onClick={() => handleCategoryChange('all')}
        >
          All Categories
        </Badge>
        
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`px-4 py-2 cursor-pointer transition-all ${
              selectedCategory === category 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {selectedTag && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtering by tag:</span>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/20"
              onClick={handleTagClear}
            >
              {selectedTag}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}