'use client';

import { BlogPost, BlogFilter, TeacherLevel } from '@/lib/blog/types';
import { BLOG_CATEGORIES } from '@/lib/blog/categories';

interface BlogFiltersProps {
  filters: BlogFilter;
  onChange: (filters: BlogFilter) => void;
  posts: BlogPost[];
}

export default function BlogFilters({ filters, onChange, posts }: BlogFiltersProps) {
  const updateFilter = (key: keyof BlogFilter, value: any) => {
    onChange({
      ...filters,
      [key]: value
    });
  };

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag];
    
    updateFilter('tags', newTags.length > 0 ? newTags : undefined);
  };

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();

  // Get tag counts
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = posts.filter(post => post.tags.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={!filters.category}
              onChange={() => updateFilter('category', undefined)}
              className="mr-3"
            />
            <span className="text-sm">All Categories</span>
          </label>
          {BLOG_CATEGORIES.map((category) => {
            const count = posts.filter(post => post.category.slug === category.slug).length;
            return (
              <label key={category.id} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category.slug}
                  onChange={() => updateFilter('category', category.slug)}
                  className="mr-3"
                />
                <span className={`w-3 h-3 rounded mr-2 ${category.color}`} />
                <span className="text-sm flex-1">{category.name}</span>
                <span className="text-xs text-gray-500">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Teacher Levels */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Teacher Level</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="teacherLevel"
              checked={!filters.teacherLevel}
              onChange={() => updateFilter('teacherLevel', undefined)}
              className="mr-3"
            />
            <span className="text-sm">All Levels</span>
          </label>
          {[
            'early-childhood',
            'elementary', 
            'middle-school',
            'high-school',
            'higher-education',
            'admin',
            'new-teacher',
            'veteran'
          ].map((level) => {
            const count = posts.filter(post => 
              post.teacherLevel?.includes(level as TeacherLevel)
            ).length;
            
            if (count === 0) return null;
            
            return (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="teacherLevel"
                  checked={filters.teacherLevel === level}
                  onChange={() => updateFilter('teacherLevel', level as TeacherLevel)}
                  className="mr-3"
                />
                <span className="text-sm flex-1 capitalize">
                  {level.replace('-', ' ')}
                </span>
                <span className="text-xs text-gray-500">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Difficulty</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="difficulty"
              checked={!filters.difficulty}
              onChange={() => updateFilter('difficulty', undefined)}
              className="mr-3"
            />
            <span className="text-sm">All Levels</span>
          </label>
          {['beginner', 'intermediate', 'advanced'].map((difficulty) => {
            const count = posts.filter(post => post.difficulty === difficulty).length;
            return (
              <label key={difficulty} className="flex items-center">
                <input
                  type="radio"
                  name="difficulty"
                  checked={filters.difficulty === difficulty}
                  onChange={() => updateFilter('difficulty', difficulty as any)}
                  className="mr-3"
                />
                <span className="text-sm flex-1 capitalize">{difficulty}</span>
                <span className="text-xs text-gray-500">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Reading Time */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Reading Time</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="readingTime"
              checked={!filters.readingTime}
              onChange={() => updateFilter('readingTime', undefined)}
              className="mr-3"
            />
            <span className="text-sm">Any Length</span>
          </label>
          {[
            { key: 'quick', label: 'Quick Read (< 5 min)', filter: (p: BlogPost) => p.readingTime < 5 },
            { key: 'medium', label: 'Medium (5-15 min)', filter: (p: BlogPost) => p.readingTime >= 5 && p.readingTime <= 15 },
            { key: 'long', label: 'In-depth (> 15 min)', filter: (p: BlogPost) => p.readingTime > 15 }
          ].map(({ key, label, filter }) => {
            const count = posts.filter(filter).length;
            return (
              <label key={key} className="flex items-center">
                <input
                  type="radio"
                  name="readingTime"
                  checked={filters.readingTime === key}
                  onChange={() => updateFilter('readingTime', key as any)}
                  className="mr-3"
                />
                <span className="text-sm flex-1">{label}</span>
                <span className="text-xs text-gray-500">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 15).map((tag) => {
            const isSelected = filters.tags?.includes(tag) || false;
            const count = tagCounts[tag];
            
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}