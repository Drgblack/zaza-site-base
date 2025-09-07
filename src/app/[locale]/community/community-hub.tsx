'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Download, 
  Upload, 
  Users, 
  BookOpen
} from 'lucide-react';
import { CommunityResourceCard } from '@/components/community/resource-card';
import { CommunityStats } from '@/components/community/community-stats';
import { ResourceUploadModal } from '@/components/community/upload-modal';
import { ZAZA_RESOURCES, ResourceMetadata } from '@/lib/resources';

// Using real resources from the resource service
const availableResources: ResourceMetadata[] = ZAZA_RESOURCES;

export function CommunityHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Escape key closes modal
      if (e.key === 'Escape' && showUploadModal) {
        setShowUploadModal(false);
      }
      
      // Ctrl/Cmd + U opens upload modal
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        setShowUploadModal(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showUploadModal]);

  const categories = [
    'all', 'communication', 'assessment', 'behavior', 'academic', 'social-emotional'
  ];

  const types = [
    'all', 'pdf', 'template', 'guide'
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'downloads', label: 'Most Downloaded' }
  ];

  const filteredResources = availableResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category.toLowerCase() === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.stats.downloads - a.stats.downloads;
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.stats.rating - a.stats.rating;
      case 'downloads':
        return b.stats.downloads - a.stats.downloads;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="block leading-tight">Zaza Community</span>
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent leading-tight">
                Hub
              </span>
            </h1>
            <p className="mt-8 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-semibold text-white">
              Discover, share, and access AI-powered teaching resources created by educators, for educators
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Users className="h-8 w-8 text-yellow-200" />
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-white font-semibold">Active Teachers</div>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <BookOpen className="h-8 w-8 text-yellow-200" />
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-white font-semibold">Resources Shared</div>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Download className="h-8 w-8 text-yellow-200" />
                <div className="text-3xl font-bold">50,000+</div>
                <div className="text-white font-semibold">Downloads</div>
              </div>
            </div>
            
            {/* Upload CTA - Enhanced */}
            <div className="mt-20">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                <Button 
                  onClick={() => setShowUploadModal(true)}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-12 py-6 text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 rounded-2xl border-2 border-white/30"
                >
                  <Upload className="h-6 w-6 mr-3" />
                  Share Your Resources Now
                </Button>
                <p className="text-sm text-white/95 mt-4 font-semibold">
                  Join <span className="font-bold text-yellow-200">10,000+</span> educators sharing knowledge • Press <kbd className="px-3 py-2 bg-white/30 rounded-lg font-bold text-white ml-2">Ctrl+U</kbd> for quick upload
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <CommunityStats />

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Resource Marketplace
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed">
                Browse thousands of AI-powered teaching resources created by educators worldwide
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-700 p-6 md:p-8 mb-12">
              {/* Section Divider */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-3xl"></div>
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                <div className="flex-1 max-w-lg">
                  <label htmlFor="search-resources" className="sr-only">Search resources</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      id="search-resources"
                      placeholder="Search templates, lessons, assessments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-base border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 flex-wrap">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 h-14 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl text-base">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl">
                      {categories.map(category => (
                        <SelectItem 
                          key={category} 
                          value={category}
                          className="text-base hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-lg transition-colors"
                        >
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-44 h-14 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl text-base">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl">
                      {types.map(type => (
                        <SelectItem 
                          key={type} 
                          value={type}
                          className="text-base hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-lg transition-colors"
                        >
                          {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 h-14 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl text-base">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-2xl rounded-xl">
                      {sortOptions.map(option => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="text-base hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-lg transition-colors"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Filter Results Summary */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-600">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    Showing <span className="font-bold text-slate-900 dark:text-white">{sortedResources.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{availableResources.length}</span> resources
                  </p>
                  {(searchQuery || selectedCategory !== 'all' || selectedType !== 'all') && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedType('all');
                      }}
                      className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-medium"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {sortedResources.map((resource, index) => (
              <div
                key={resource.id}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                className="animate-fade-slide-up"
              >
                <CommunityResourceCard resource={resource} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedResources.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-3xl flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No resources found</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-medium">
                  We couldn't find any resources matching your criteria. Try adjusting your filters or search terms, or explore our full collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedType('all');
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Clear All Filters
                  </Button>
                  <Button 
                    onClick={() => setShowUploadModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border-2 border-purple-400 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Share Your Resource
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Upload Modal */}
      <ResourceUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
}
