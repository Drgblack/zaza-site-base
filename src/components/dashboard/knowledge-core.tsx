'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { createCustomSnippet, getUserCustomSnippets, CustomSnippet } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  BookOpen, 
  Plus, 
  Tag, 
  Copy, 
  Trash2, 
  Edit,
  Search,
  Filter,
  Star,
  Clock,
  Users
} from 'lucide-react';

const categories = [
  'Parent Communication',
  'Student Feedback',
  'Classroom Management',
  'Lesson Planning',
  'Assessment',
  'Professional Development',
  'Administrative',
  'Other'
];

export function KnowledgeCore() {
  const { user, isAuthenticated } = useAuth();
  const [customSnippets, setCustomSnippets] = useState<CustomSnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    isPublic: false
  });

  useEffect(() => {
    const loadCustomSnippets = async () => {
      if (!user || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const snippets = await getUserCustomSnippets(user.uid);
        setCustomSnippets(snippets);
      } catch (error) {
        console.error('Error loading custom snippets:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomSnippets();
  }, [user, isAuthenticated]);

  const handleCreateSnippet = async () => {
    if (!user || !formData.title.trim() || !formData.content.trim() || !formData.category) {
      return;
    }

    setIsCreating(true);
    try {
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await createCustomSnippet(user.uid, {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        tags,
        isPublic: formData.isPublic
      });

      // Reload snippets
      const snippets = await getUserCustomSnippets(user.uid);
      setCustomSnippets(snippets);

      // Reset form
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: '',
        isPublic: false
      });

      alert('Custom snippet created successfully!');
    } catch (error) {
      console.error('Error creating custom snippet:', error);
      alert('Error creating snippet. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopySnippet = async (content: string) => {
    await navigator.clipboard.writeText(content);
    alert('Snippet copied to clipboard!');
  };

  const filteredSnippets = customSnippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Teacher KnowledgeCore
          </CardTitle>
          <CardDescription>
            Upload and manage your custom teaching snippets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sign in to access your personal snippet library
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Sign In Required
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Teacher KnowledgeCore
        </CardTitle>
        <CardDescription>
          Upload and manage your custom teaching snippets for reuse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="library">My Library</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search snippets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Snippets List */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading snippets...</p>
              </div>
            ) : filteredSnippets.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {customSnippets.length === 0 
                    ? "No custom snippets yet. Upload your first snippet!"
                    : "No snippets match your search criteria."
                  }
                </p>
                {customSnippets.length === 0 && (
                  <Button onClick={() => document.querySelector('[value="upload"]')?.click()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload First Snippet
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSnippets.map((snippet) => (
                  <div key={snippet.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {snippet.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{snippet.category}</Badge>
                          {snippet.isPublic && (
                            <Badge className="bg-blue-100 text-blue-700">Public</Badge>
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Used {snippet.usageCount} times
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleCopySnippet(snippet.content)}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                      {snippet.content}
                    </p>
                    
                    {snippet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {snippet.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Snippet Title *
                </label>
                <Input
                  placeholder="e.g., Parent Meeting Follow-up Template"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Category *
                </label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Content *
                </label>
                <Textarea
                  placeholder="Enter your custom snippet content here..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[200px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Tags (comma-separated)
                </label>
                <Input
                  placeholder="e.g., template, follow-up, professional"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-900 dark:text-gray-100">
                  Make this snippet public (shareable with other teachers)
                </label>
              </div>

              <Button
                onClick={handleCreateSnippet}
                disabled={isCreating || !formData.title.trim() || !formData.content.trim() || !formData.category}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Create Snippet
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
