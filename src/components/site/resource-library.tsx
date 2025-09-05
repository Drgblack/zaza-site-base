'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Video, 
  BookOpen, 
  Users, 
  CheckSquare, 
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'PDF' | 'Template' | 'Video' | 'Guide' | 'Checklist';
  thumbnail: string;
  downloadUrl: string;
  size: string;
  downloads: number;
  featured?: boolean;
}

const resources: Resource[] = [
  // Featured Resources - The 4 main ones with rich HTML content
  {
    id: '1',
    title: '50 Ready-to-Use Parent Comments',
    description: 'A comprehensive collection of professional comment starters for every situation, organized by category with usage guidelines.',
    category: 'Parent Communication',
    type: 'Guide',
    thumbnail: '/resources/parent-comment-bank.html',
    downloadUrl: '/resources/parent-comment-bank.html',
    size: '1.2 MB',
    downloads: 2847,
    featured: true
  },
  {
    id: '2',
    title: 'The Stress-Free Report Card Template',
    description: 'Structured templates and frameworks teachers can adapt and customize for professional report writing.',
    category: 'Report Writing',
    type: 'Template',
    thumbnail: '/resources/report-writing-framework.html',
    downloadUrl: '/resources/report-writing-framework.html',
    size: '890 KB',
    downloads: 1934,
    featured: true
  },
  {
    id: '3',
    title: 'Teacher Wellbeing in 10 Minutes a Day',
    description: 'Research-backed strategies to reduce burnout and reclaim your joy in teaching with daily 10-minute practices.',
    category: 'Wellbeing',
    type: 'Guide',
    thumbnail: '/resources/classroom-wellbeing-guide.html',
    downloadUrl: '/resources/classroom-wellbeing-guide.html',
    size: '2.1 MB',
    downloads: 1567,
    featured: true
  },
  {
    id: '4',
    title: 'Never Send a Stressful Parent Email Again',
    description: 'Complete checklist and templates for professional, empathetic parent communication with tone guidelines.',
    category: 'Parent Communication',
    type: 'Checklist',
    thumbnail: '/resources/parent-email-checklist.html',
    downloadUrl: '/resources/parent-email-checklist.html',
    size: '745 KB',
    downloads: 3021,
    featured: true
  },

  // Additional Resources
  {
    id: '5',
    title: 'AI Grading & Feedback Prompts',
    description: 'Complete collection of prompts for generating personalized student feedback using AI tools.',
    category: 'Lesson Tools',
    type: 'PDF',
    thumbnail: '/resources/ai-grading-prompts.pdf',
    downloadUrl: '/resources/ai-grading-prompts.pdf',
    size: '2.4 MB',
    downloads: 1247
  },
  {
    id: '6',
    title: 'AI Quiz Generator Guide',
    description: 'Step-by-step guide to creating engaging quizzes and assessments with AI.',
    category: 'Lesson Tools',
    type: 'Guide',
    thumbnail: '/resources/ai-quiz-generator-guide.pdf',
    downloadUrl: '/resources/ai-quiz-generator-guide.pdf',
    size: '3.2 MB',
    downloads: 673
  },
  {
    id: '7',
    title: 'Teacher Time-Saving Checklist',
    description: 'Daily and weekly checklist to maximize your efficiency with AI tools.',
    category: 'Wellbeing',
    type: 'Checklist',
    thumbnail: '/resources/ai-time-saving-guide.pdf',
    downloadUrl: '/resources/ai-time-saving-guide.pdf',
    size: '1.2 MB',
    downloads: 1089
  },
  {
    id: '8',
    title: 'Assessment Rubric Builder',
    description: 'Customizable templates for creating comprehensive assessment rubrics.',
    category: 'Lesson Tools',
    type: 'Template',
    thumbnail: '/resources/assessment-rubric-template.pdf',
    downloadUrl: '/resources/assessment-rubric-template.pdf',
    size: '2.1 MB',
    downloads: 756
  },
  {
    id: '9',
    title: 'Classroom Behavior Management',
    description: 'Proven strategies for managing classroom behavior with positive reinforcement.',
    category: 'Lesson Tools',
    type: 'Guide',
    thumbnail: '/resources/behavior-strategies.pdf',
    downloadUrl: '/resources/behavior-strategies.pdf',
    size: '2.8 MB',
    downloads: 534
  }
];

const categories = ['All', 'Lesson Tools', 'Report Writing', 'Parent Communication', 'Wellbeing'];

const typeIcons = {
  PDF: FileText,
  Template: CheckSquare,
  Video: Video,
  Guide: BookOpen,
  Checklist: CheckSquare
};

export function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resource: Resource) => {
    try {
      // Create a link element
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // For HTML resources, open in new tab to display content
      if (resource.downloadUrl.endsWith('.html')) {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // For PDF files, try to trigger download
      else if (resource.type === 'PDF' || resource.downloadUrl.endsWith('.pdf')) {
        const filename = resource.title.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '_').toLowerCase() + '.pdf';
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // Default: open in new tab
      else {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Track access
      console.log(`Accessed resource: ${resource.title}`);
    } catch (error) {
      console.error('Resource access failed:', error);
      // Fallback: open in new tab
      window.open(resource.downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Category Filters */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Featured Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.filter(r => r.featured).map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:-translate-y-1">
                    <div className="md:flex">
                      <div className="md:w-48 h-32 md:h-auto relative bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                        <div className="relative">
                          <FileText className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                          <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded text-[10px] font-bold">HTML</span>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                          Featured
                        </Badge>
                      </div>
                      <CardContent className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {resource.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{resource.category}</Badge>
                              <span>•</span>
                              <span>{resource.size}</span>
                              <span>•</span>
                              <span>{resource.downloads.toLocaleString()} downloads</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {resource.description}
                        </p>
                        <Button onClick={() => handleDownload(resource)} className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                          {resource.downloadUrl.endsWith('.html') ? (
                            <>
                              <FileText className="h-4 w-4 mr-2" />
                              View Resource
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Resources Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {selectedCategory === 'All' ? 'All Resources' : selectedCategory}
          </h2>
          
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = typeIcons[resource.type];
                
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:-translate-y-1">
                      {/* Thumbnail */}
                      <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 relative flex items-center justify-center">
                        <div className="relative">
                          <IconComponent className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                          {resource.downloadUrl.endsWith('.html') ? (
                            <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded text-[10px] font-bold">HTML</span>
                          ) : (resource.type === 'PDF' || resource.downloadUrl.endsWith('.pdf')) && (
                            <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded text-[10px] font-bold">PDF</span>
                          )}
                        </div>
                        {resource.featured && (
                          <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                            {resource.title}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {resource.category}
                            </Badge>
                            <span>•</span>
                            <span>{resource.size}</span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                            {resource.description}
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {resource.downloads.toLocaleString()} downloads
                            </span>
                            <span className="flex items-center gap-1">
                              <IconComponent className="h-3 w-3" />
                              {resource.type}
                            </span>
                          </div>
                          
                          <Button 
                            onClick={() => handleDownload(resource)} 
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            size="sm"
                          >
                            {resource.downloadUrl.endsWith('.html') ? (
                              <>
                                <FileText className="h-4 w-4 mr-2" />
                                View Resource
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}