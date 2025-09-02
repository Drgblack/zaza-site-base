'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  FileText, 
  Video, 
  BookOpen, 
  Users, 
  CheckSquare, 
  Calendar,
  Search,
  Filter,
  Heart,
  Download,
  Star,
  Award,
  Eye,
  ThumbsUp,
  Share2,
  PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'sonner';

interface SharedResource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'PDF' | 'Template' | 'Video' | 'Guide' | 'Checklist' | 'Worksheet' | 'Activity';
  thumbnail?: string;
  downloadUrl?: string;
  size: string;
  downloads: number;
  likes: number;
  views: number;
  authorName: string;
  authorId: string;
  uploadedAt: Date;
  featured?: boolean;
  tags: string[];
  isApproved: boolean;
}

const mockSharedResources: SharedResource[] = [
  {
    id: 'teacher-1',
    title: 'Positive Behavior Reward Chart Template',
    description: 'Customizable reward chart that helped reduce classroom disruptions by 80%. Includes behavior tracking and parent communication templates.',
    category: 'Classroom Management',
    type: 'Template',
    size: '1.2 MB',
    downloads: 234,
    likes: 67,
    views: 892,
    authorName: 'Sarah Mitchell',
    authorId: 'teacher-sarah-123',
    uploadedAt: new Date('2024-01-15'),
    featured: true,
    tags: ['behavior', 'rewards', 'tracking', 'parents'],
    isApproved: true
  },
  {
    id: 'teacher-2', 
    title: 'Parent-Teacher Conference Planning Guide',
    description: 'Step-by-step checklist for productive parent conferences. Shared by a 15-year teaching veteran.',
    category: 'Parent Communication',
    type: 'Guide',
    size: '890 KB',
    downloads: 156,
    likes: 43,
    views: 567,
    authorName: 'Maria Rodriguez',
    authorId: 'teacher-maria-456',
    uploadedAt: new Date('2024-01-10'),
    tags: ['conferences', 'planning', 'communication'],
    isApproved: true
  },
  {
    id: 'teacher-3',
    title: 'Math Word Problem Starter Kit',
    description: 'Collection of 30 engaging word problems with visual aids. Perfect for grades 3-5.',
    category: 'Lesson Tools',
    type: 'Worksheet',
    size: '2.1 MB', 
    downloads: 89,
    likes: 29,
    views: 234,
    authorName: 'Anonymous Teacher',
    authorId: 'anon-teacher-789',
    uploadedAt: new Date('2024-01-08'),
    tags: ['math', 'word-problems', 'elementary'],
    isApproved: true
  },
  {
    id: 'teacher-4',
    title: 'Reading Comprehension Exit Tickets',
    description: '15 creative exit ticket templates to assess reading understanding quickly.',
    category: 'Assessment',
    type: 'Template',
    size: '750 KB',
    downloads: 178,
    likes: 52,
    views: 445,
    authorName: 'Jennifer Park',
    authorId: 'teacher-jen-321',
    uploadedAt: new Date('2024-01-05'),
    featured: true,
    tags: ['reading', 'assessment', 'exit-tickets'],
    isApproved: true
  }
];

export function CommunityResourceHub() {
  const { user, isAuthenticated } = useAuth();
  const [resources, setResources] = useState<SharedResource[]>(mockSharedResources);
  const [filteredResources, setFilteredResources] = useState<SharedResource[]>(mockSharedResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedResources, setLikedResources] = useState<Set<string>>(new Set());
  const [savedResources, setSavedResources] = useState<Set<string>>(new Set());
  
  // Load user preferences
  useEffect(() => {
    try {
      const liked = localStorage.getItem('liked-resources');
      const saved = localStorage.getItem('saved-resources');
      if (liked) setLikedResources(new Set(JSON.parse(liked)));
      if (saved) setSavedResources(new Set(JSON.parse(saved)));
    } catch (error) {
      console.warn('Could not load preferences:', error);
    }
  }, []);

  // Filter resources
  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory, resources]);

  const toggleLike = (resourceId: string) => {
    const newLiked = new Set(likedResources);
    if (newLiked.has(resourceId)) {
      newLiked.delete(resourceId);
      toast.success('Removed from liked resources');
    } else {
      newLiked.add(resourceId);
      toast.success('Added to liked resources ❤️');
    }
    setLikedResources(newLiked);
    localStorage.setItem('liked-resources', JSON.stringify(Array.from(newLiked)));
  };

  const toggleSave = (resourceId: string) => {
    const newSaved = new Set(savedResources);
    if (newSaved.has(resourceId)) {
      newSaved.delete(resourceId);
      toast.success('Removed from saved resources');
    } else {
      newSaved.add(resourceId);
      toast.success('Saved to your library 📚');
    }
    setSavedResources(newSaved);
    localStorage.setItem('saved-resources', JSON.stringify(Array.from(newSaved)));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-4 w-4" />;
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Guide': return <BookOpen className="h-4 w-4" />;
      case 'Checklist': return <CheckSquare className="h-4 w-4" />;
      case 'Template': return <Calendar className="h-4 w-4" />;
      case 'Worksheet': return <FileText className="h-4 w-4" />;
      case 'Activity': return <Users className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const categories = Array.from(new Set(resources.map(r => r.category)));
  const topContributors = resources.reduce((acc, resource) => {
    if (resource.authorName !== 'Anonymous Teacher') {
      acc[resource.authorName] = (acc[resource.authorName] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Teacher Shared Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Discover and share practical teaching resources created by educators, for educators. From lesson plans to classroom management tools — all tested in real classrooms.
          </p>
          
          {/* Community Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{resources.length}</div>
              <div className="text-sm text-gray-500">shared resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{Object.keys(topContributors).length + 1}</div>
              <div className="text-sm text-gray-500">contributing teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {resources.reduce((sum, r) => sum + r.downloads, 0)}
              </div>
              <div className="text-sm text-gray-500">total downloads</div>
            </div>
          </div>

          {/* Upload CTA */}
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Share Your Resource
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search resources, authors, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredResources.length} of {resources.length} shared resources
              </div>
            </div>

            {/* Featured Resources */}
            {filteredResources.filter(r => r.featured).length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500 fill-current" />
                  Featured Resources
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredResources.filter(r => r.featured).map((resource) => (
                    <ResourceCard 
                      key={resource.id} 
                      resource={resource} 
                      isLiked={likedResources.has(resource.id)}
                      isSaved={savedResources.has(resource.id)}
                      onToggleLike={toggleLike}
                      onToggleSave={toggleSave}
                      getTypeIcon={getTypeIcon}
                      featured={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Resources */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                All Shared Resources
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {filteredResources.filter(r => !r.featured).map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    isLiked={likedResources.has(resource.id)}
                    isSaved={savedResources.has(resource.id)}
                    onToggleLike={toggleLike}
                    onToggleSave={toggleSave}
                    getTypeIcon={getTypeIcon}
                    featured={false}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Share Resource CTA */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-purple-600" />
                    Share Your Resource
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Have a lesson plan, worksheet, or teaching tool that works? Share it with fellow educators and build your teaching reputation.
                  </p>
                  <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Button>
                </CardContent>
              </Card>

              {/* Top Contributors */}
              {Object.keys(topContributors).length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Top Contributors
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(topContributors)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([name, count]) => (
                        <div key={name} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                            {count >= 3 && <Award className="h-3 w-3 text-yellow-500" />}
                            {name}
                          </span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}

              {/* Categories */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Categories</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map(category => {
                    const count = resources.filter(r => r.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category 
                            ? 'bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category}</span>
                          <Badge variant="secondary" className="text-xs">{count}</Badge>
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResourceCardProps {
  resource: SharedResource;
  isLiked: boolean;
  isSaved: boolean;
  onToggleLike: (id: string) => void;
  onToggleSave: (id: string) => void;
  getTypeIcon: (type: string) => JSX.Element;
  featured: boolean;
}

function ResourceCard({ resource, isLiked, isSaved, onToggleLike, onToggleSave, getTypeIcon, featured }: ResourceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group hover:shadow-lg transition-all duration-200 ${
        featured 
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800' 
          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border shadow-md'
      } rounded-lg`}
    >
      <Card className="border-0 bg-transparent">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getTypeIcon(resource.type)}
                <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                {featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleLike(resource.id)}
                className="p-1 h-8 w-8"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </Button>
              <span className="text-xs text-gray-500">{resource.likes}</span>
            </div>
          </div>
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="h-3 w-3" />
            <span>By {resource.authorName}</span>
            <span>•</span>
            <span>{resource.uploadedAt.toLocaleDateString()}</span>
          </div>
        </CardHeader>

        <CardContent className="pt-3">
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {resource.description}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {resource.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  {resource.downloads}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {resource.views}
                </span>
                <span className="text-xs">{resource.size}</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => onToggleSave(resource.id)}
                  size="sm" 
                  variant="outline"
                  className={isSaved ? 'bg-purple-100 border-purple-300 text-purple-700' : ''}
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button
                  size="sm" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
