'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Download, BookOpen, Clock, Star, Tag, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'template' | 'guide' | 'checklist' | 'toolkit' | 'worksheet';
  path: string;
  htmlPath: string;
  pdfPath: string;
  bytes: number;
  sizeLabel: string;
  featured?: boolean;
  createdAt: string;
}

interface ResourcesContentProps {
  resources: Resource[];
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-blue-100 text-blue-800 border-blue-200', 
  advanced: 'bg-purple-100 text-purple-800 border-purple-200'
};

const typeIcons = {
  template: BookOpen,
  guide: Users,
  checklist: Filter,
  toolkit: Star,
  worksheet: Clock
};

export function ResourcesContent({ resources }: ResourcesContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Get unique categories, levels, and types
  const categories = useMemo(() => 
    [...new Set(resources.map(r => r.category))].sort()
  , [resources]);
  
  const levels = useMemo(() => 
    [...new Set(resources.map(r => r.level))].sort()
  , [resources]);
  
  const types = useMemo(() => 
    [...new Set(resources.map(r => r.type))].sort()
  , [resources]);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesType;
    });
  }, [resources, searchQuery, selectedCategory, selectedLevel, selectedType]);

  const featuredResources = resources.filter(r => r.featured);

  return (
    <>
      {/* Search and Filters */}
      <section className="mb-12">
        <div className="bg-white rounded-2xl shadow-lg border p-8">
          <div className="grid gap-6 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Resources
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type Filter */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Resource Type
            </label>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedType('all')}
                className="rounded-full"
              >
                All Types
              </Button>
              {types.map((type) => {
                const TypeIcon = typeIcons[type];
                return (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    onClick={() => setSelectedType(type)}
                    className="rounded-full"
                  >
                    <TypeIcon className="w-4 h-4 mr-2" />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredResources.length}</span> of{' '}
              <span className="font-semibold">{resources.length}</span> resources
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">Featured Resources</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredResources.slice(0, 3).map((resource) => {
              const TypeIcon = typeIcons[resource.type];
              return (
                <Card key={resource.id} className="group hover:shadow-xl transition-all duration-300 rounded-xl bg-amber-50 border border-amber-200 shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-amber-700" />
                        </div>
                        <div>
                          <Badge className="mb-2 bg-amber-600 text-white border-amber-700">
                            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                          </Badge>
                          <Badge variant="outline" className={levelColors[resource.level]}>
                            {resource.level}
                          </Badge>
                        </div>
                      </div>
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </div>
                    <CardTitle className="text-xl leading-tight text-slate-900 font-semibold">{resource.title}</CardTitle>
                    <CardDescription className="text-slate-700 line-clamp-4">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                          +{resource.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm text-slate-600">
                        {resource.sizeLabel}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={resource.htmlPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 flex-1"
                          data-resource-card="view"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          View online
                        </a>
                        <a
                          href={resource.pdfPath}
                          download
                          className="inline-flex items-center justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-700 flex-1"
                          data-resource-card="download"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* All Resources */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">All Resources</h2>
        </div>
      </section>

      {/* Resource Grid */}
      <section>
        {filteredResources.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSelectedType('all');
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {filteredResources.map((resource) => {
              const TypeIcon = typeIcons[resource.type];
              return (
                <Card key={resource.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <TypeIcon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <Badge className="mb-2 bg-white/20 text-white border-white/30 hover:bg-white/30">
                            {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
                          </Badge>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                              {resource.level}
                            </Badge>
                            <Badge variant="outline" className="bg-white/10 text-white border-white/30 capitalize">
                              {resource.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {resource.featured && (
                        <div className="bg-yellow-400 rounded-full p-2">
                          <Star className="w-5 h-5 text-yellow-800 fill-yellow-800" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-2xl leading-tight text-white mb-3">{resource.title}</CardTitle>
                  </div>
                  
                  <CardContent className="p-6">
                    <CardDescription className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-4">
                      {resource.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {resource.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 4 && (
                        <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
                          +{resource.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="border-t pt-4 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {resource.sizeLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          PDF Format
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50" data-resource-card="view">
                          <a href={resource.htmlPath} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View online
                          </a>
                        </Button>
                        <Button asChild className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg" data-resource-card="download">
                          <a href={resource.pdfPath} download>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}