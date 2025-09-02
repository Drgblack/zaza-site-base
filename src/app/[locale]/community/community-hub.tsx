'use client';

import { useState } from 'react';
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

interface CommunityResource {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  price: number | null; // null for free, number for paid
  isPremium: boolean;
  createdAt: string;
  type: 'snippet' | 'template' | 'lesson' | 'assessment';
}

const mockResources: CommunityResource[] = [
  {
    id: '1',
    title: 'Parent-Teacher Conference Scripts',
    description: 'Professional scripts for various conference scenarios including academic concerns, behavioral issues, and positive feedback.',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/avatars/sarah.jpg',
      rating: 4.8
    },
    category: 'Communication',
    tags: ['parent-teacher', 'conferences', 'professional'],
    downloads: 1247,
    rating: 4.9,
    price: null,
    isPremium: false,
    createdAt: '2024-01-15',
    type: 'template'
  },
  {
    id: '2',
    title: 'AI-Powered Progress Report Generator',
    description: 'Advanced template that uses AI to generate personalized progress reports based on student data.',
    author: {
      name: 'Dr. Michael Chen',
      avatar: '/images/avatars/michael.jpg',
      rating: 4.9
    },
    category: 'Assessment',
    tags: ['progress-reports', 'ai', 'personalized'],
    downloads: 892,
    rating: 4.7,
    price: 9.99,
    isPremium: true,
    createdAt: '2024-01-10',
    type: 'template'
  },
  {
    id: '3',
    title: 'Behavioral Intervention Strategies',
    description: 'Comprehensive collection of communication strategies for addressing challenging behaviors.',
    author: {
      name: 'Emma Rodriguez',
      avatar: '/images/avatars/emma.jpg',
      rating: 4.6
    },
    category: 'Behavior',
    tags: ['behavior', 'intervention', 'strategies'],
    downloads: 567,
    rating: 4.8,
    price: null,
    isPremium: false,
    createdAt: '2024-01-08',
    type: 'snippet'
  }
];

export function CommunityHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const categories = [
    'all', 'communication', 'assessment', 'behavior', 'academic', 'social-emotional'
  ];

  const types = [
    'all', 'snippet', 'template', 'lesson', 'assessment'
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'downloads', label: 'Most Downloaded' }
  ];

  const filteredResources = mockResources.filter(resource => {
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
        return b.downloads - a.downloads;
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Zaza Community Hub
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto opacity-90">
              Discover, share, and trade AI-powered teaching resources with educators worldwide
            </p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>10,000+ Teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>5,000+ Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <span>50,000+ Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <CommunityStats />

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Upload CTA */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Share Your Resources</h3>
                    <p className="opacity-90">
                      Help fellow educators by sharing your AI-powered teaching materials
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowUploadModal(true)}
                    variant="secondary"
                    className="bg-white text-purple-600 hover:bg-gray-100"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map(resource => (
              <CommunityResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {/* Empty State */}
          {sortedResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or browse all resources
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}>
                Clear Filters
              </Button>
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
