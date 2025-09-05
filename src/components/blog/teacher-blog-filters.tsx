'use client';

import React, { useState } from 'react';
import { BlogFilter, SubjectType, GradeBand, ContentType, ReadingTime } from '@/lib/blog/teacher-blog-types';
import { Search, Filter, X, ChevronDown, Clock, BookOpen, Users } from 'lucide-react';

interface TeacherBlogFiltersProps {
  currentFilter: BlogFilter;
  onFilterChange: (filter: BlogFilter) => void;
  availableFilters: {
    subjects: Array<{ value: SubjectType; label: string; count: number }>;
    gradeBands: Array<{ value: GradeBand; label: string; count: number }>;
    contentTypes: Array<{ value: ContentType; label: string; count: number }>;
  };
  totalResults: number;
}

const SUBJECT_ICONS: Record<SubjectType, string> = {
  'math': '🧮',
  'ela': '📚',
  'science': '🔬',
  'social-studies': '🌍',
  'art': '🎨',
  'music': '🎵',
  'pe': '⚽',
  'technology': '💻',
  'world-languages': '🗣️',
  'special-education': '🤝'
};

const GRADE_BAND_COLORS: Record<GradeBand, string> = {
  'k-2': 'bg-green-500',
  '3-5': 'bg-blue-500',
  '6-8': 'bg-purple-500',
  '9-12': 'bg-orange-500'
};

const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  'lesson-plan': '📋',
  'how-to': '🛠️',
  'explainer': '💡',
  'case-study': '📊',
  'research-to-practice': '🔬',
  'newsletter': '📰'
};

const READING_TIME_OPTIONS: Array<{ value: ReadingTime; label: string }> = [
  { value: '2-min', label: '2 min quick read' },
  { value: '5-min', label: '5 min read' },
  { value: '10-min', label: '10 min read' },
  { value: '15-min', label: '15 min read' },
  { value: '20-min+', label: '20+ min deep dive' }
];

export default function TeacherBlogFilters({
  currentFilter,
  onFilterChange,
  availableFilters,
  totalResults
}: TeacherBlogFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentFilter.searchQuery || '');

  const updateFilter = (updates: Partial<BlogFilter>) => {
    onFilterChange({ ...currentFilter, ...updates });
  };

  const toggleSubject = (subject: SubjectType) => {
    const subjects = currentFilter.subjects.includes(subject)
      ? currentFilter.subjects.filter(s => s !== subject)
      : [...currentFilter.subjects, subject];
    updateFilter({ subjects });
  };

  const toggleGradeBand = (grade: GradeBand) => {
    const gradeBands = currentFilter.gradeBands.includes(grade)
      ? currentFilter.gradeBands.filter(g => g !== grade)
      : [...currentFilter.gradeBands, grade];
    updateFilter({ gradeBands });
  };

  const toggleContentType = (type: ContentType) => {
    const contentTypes = currentFilter.contentTypes.includes(type)
      ? currentFilter.contentTypes.filter(t => t !== type)
      : [...currentFilter.contentTypes, type];
    updateFilter({ contentTypes });
  };

  const toggleReadingTime = (time: ReadingTime) => {
    const readingTime = currentFilter.readingTime.includes(time)
      ? currentFilter.readingTime.filter(t => t !== time)
      : [...currentFilter.readingTime, time];
    updateFilter({ readingTime });
  };

  const clearFilters = () => {
    onFilterChange({
      subjects: [],
      gradeBands: [],
      contentTypes: [],
      readingTime: [],
      searchQuery: ''
    });
    setSearchQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter({ searchQuery });
  };

  const activeFilterCount = 
    currentFilter.subjects.length +
    currentFilter.gradeBands.length +
    currentFilter.contentTypes.length +
    currentFilter.readingTime.length +
    (currentFilter.hasDownloads ? 1 : 0) +
    (currentFilter.searchQuery ? 1 : 0);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Find an idea fast for tomorrow's lesson..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  updateFilter({ searchQuery: '' });
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Quick Filters (Chips) */}
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Subject Chips */}
          {availableFilters.subjects.map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => toggleSubject(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                currentFilter.subjects.includes(value)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{SUBJECT_ICONS[value]}</span>
              {label}
              <span className="text-xs opacity-75">({count})</span>
            </button>
          ))}
        </div>

        {/* Grade Band Chips */}
        <div className="flex flex-wrap gap-3 mb-4">
          {availableFilters.gradeBands.map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => toggleGradeBand(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                currentFilter.gradeBands.includes(value)
                  ? `${GRADE_BAND_COLORS[value]} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4" />
              {label}
              <span className="text-xs opacity-75">({count})</span>
            </button>
          ))}
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            <Filter className="w-4 h-4" />
            More filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {totalResults} {totalResults === 1 ? 'result' : 'results'}
              {activeFilterCount > 0 && ` with ${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'}`}
            </span>
            
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
            {/* Content Type Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Content Type</h3>
              <div className="flex flex-wrap gap-2">
                {availableFilters.contentTypes.map(({ value, label, count }) => (
                  <button
                    key={value}
                    onClick={() => toggleContentType(value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentFilter.contentTypes.includes(value)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>{CONTENT_TYPE_ICONS[value]}</span>
                    {label}
                    <span className="text-xs opacity-75">({count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Time Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Reading Time</h3>
              <div className="flex flex-wrap gap-2">
                {READING_TIME_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => toggleReadingTime(value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentFilter.readingTime.includes(value)
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Special Features</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateFilter({ hasDownloads: !currentFilter.hasDownloads })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentFilter.hasDownloads
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Has Downloads
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}