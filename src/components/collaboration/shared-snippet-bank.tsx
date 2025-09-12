/* eslint-disable no-redeclare */
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  BookOpen, 
  Users, 
  Plus,
  Search,
  Copy,
  Star,
  Share2,
  Lock,
  Globe,
  Edit,
  Trash2,
  Filter,
  Tag
} from 'lucide-react';

interface SharedSnippetBank {
  id: string;
  name: string;
  description: string;
  snippets: string[];
  createdBy: string;
  createdAt: unknown;
  permissions: {
    canView: string[];
    canEdit: string[];
    canShare: string[];
  };
}

interface OrganizationSnippet {
  id: string;
  content: string;
  tone: string;
  category: string;
  context: string;
  createdBy: string;
  createdByName: string;
  createdAt: unknown;
  tags: string[];
  bankId: string;
  isApproved: boolean;
  usageCount: number;
  rating: number;
}

interface SharedSnippetBankProps {
  organizationId: string;
  userRole: 'super_admin' | 'admin' | 'teacher' | 'viewer';
}

export function SharedSnippetBank({ organizationId, userRole }: SharedSnippetBankProps) {
  const { user } = useAuth();
  const [banks, setBanks] = useState<SharedSnippetBank[]>([]);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [snippets, setSnippets] = useState<OrganizationSnippet[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Create bank form
  const [showCreateBank, setShowCreateBank] = useState(false);
  const [newBankName, setNewBankName] = useState('');
  const [newBankDescription, setNewBankDescription] = useState('');

  // Create snippet form
  const [showCreateSnippet, setShowCreateSnippet] = useState(false);
  const [newSnippetContent, setNewSnippetContent] = useState('');
  const [newSnippetTone, setNewSnippetTone] = useState('professional');
  const [newSnippetCategory, setNewSnippetCategory] = useState('parent-communication');
  const [newSnippetContext, setNewSnippetContext] = useState('');
  const [newSnippetTags, setNewSnippetTags] = useState('');

  useEffect(() => {
    loadSnippetBanks();
  }, [organizationId]);

  useEffect(() => {
    if (selectedBank) {
      loadBankSnippets(selectedBank);
    }
  }, [selectedBank]);

  const loadSnippetBanks = async () => {
    try {
      const response = await fetch(`/api/admin?action=snippet_banks&orgId=${organizationId}`);
      if (response.ok) {
        const banksData = await response.json();
        setBanks(banksData);
        if (banksData.length > 0 && !selectedBank) {
          setSelectedBank(banksData[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading snippet banks:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBankSnippets = async (bankId: string) => {
    // Mock snippets for demonstration
    const mockSnippets: OrganizationSnippet[] = [
      {
        id: '1',
        content: 'Thank you for your email regarding [Student Name]\'s progress. I wanted to update you on the improvements we\'ve seen in class this week.',
        tone: 'professional',
        category: 'parent-communication',
        context: 'Progress update email to parents',
        createdBy: 'teacher1',
        createdByName: 'Ms. Johnson',
        createdAt: new Date(),
        tags: ['progress', 'positive', 'weekly-update'],
        bankId,
        isApproved: true,
        usageCount: 45,
        rating: 4.8
      },
      {
        id: '2',
        content: 'I hope this message finds you well. I wanted to discuss [Student Name]\'s recent classroom behavior and collaborate on strategies to support their success.',
        tone: 'caring',
        category: 'parent-communication',
        context: 'Behavior discussion with parents',
        createdBy: 'teacher2',
        createdByName: 'Mr. Smith',
        createdAt: new Date(),
        tags: ['behavior', 'collaboration', 'support'],
        bankId,
        isApproved: true,
        usageCount: 32,
        rating: 4.6
      },
      {
        id: '3',
        content: 'Great work on today\'s assignment! Your attention to detail and creative approach really impressed me.',
        tone: 'encouraging',
        category: 'student-feedback',
        context: 'Positive feedback for student work',
        createdBy: 'teacher3',
        createdByName: 'Dr. Williams',
        createdAt: new Date(),
        tags: ['positive', 'creative', 'detailed'],
        bankId,
        isApproved: true,
        usageCount: 78,
        rating: 4.9
      }
    ];
    
    setSnippets(mockSnippets);
  };

  const handleCreateBank = async () => {
    if (!newBankName.trim()) return;

    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_snippet_bank',
          organizationId,
          bankData: {
            name: newBankName,
            description: newBankDescription,
            snippets: [],
            permissions: {
              canView: ['teacher', 'admin', 'super_admin'],
              canEdit: userRole === 'teacher' ? ['admin', 'super_admin'] : ['teacher', 'admin', 'super_admin'],
              canShare: ['teacher', 'admin', 'super_admin']
            }
          },
          createdBy: user?.uid
        })
      });

      if (response.ok) {
        setNewBankName('');
        setNewBankDescription('');
        setShowCreateBank(false);
        loadSnippetBanks();
      }
    } catch (error) {
      console.error('Error creating snippet bank:', error);
    }
  };

  const handleCopySnippet = async (content: string) => {
    await navigator.clipboard.writeText(content);
  };

  const canEdit = userRole === 'admin' || userRole === 'super_admin';
  const canCreate = userRole !== 'viewer';

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = 
      snippet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      snippet.createdByName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || snippet.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'parent-communication', label: 'Parent Communication' },
    { value: 'student-feedback', label: 'Student Feedback' },
    { value: 'colleague-communication', label: 'Colleague Communication' },
    { value: 'administrative', label: 'Administrative' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            Shared Snippet Banks
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Collaborative repositories of approved communication templates
          </p>
        </div>
        {canEdit && (
          <Dialog open={showCreateBank} onOpenChange={setShowCreateBank}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Bank
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Snippet Bank</DialogTitle>
                <DialogDescription>
                  Create a new shared repository for your organization's communication templates.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Bank Name</label>
                  <Input
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    placeholder="e.g., Parent Communication Templates"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={newBankDescription}
                    onChange={(e) => setNewBankDescription(e.target.value)}
                    placeholder="Describe the purpose and contents of this snippet bank..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateBank(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateBank} disabled={!newBankName.trim()}>
                  Create Bank
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Bank Selection Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Banks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-l-4 ${
                      selectedBank === bank.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-transparent'
                    }`}
                  >
                    <h4 className="font-medium text-sm">{bank.name}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {bank.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {bank.snippets.length} snippets
                      </Badge>
                    </div>
                  </button>
                ))}
                {banks.length === 0 && !loading && (
                  <div className="p-4 text-center text-gray-500">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No snippet banks yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedBank ? (
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search snippets, tags, or creators..."
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-400" />
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Snippets Grid */}
              <div className="grid grid-cols-1 gap-4">
                {filteredSnippets.map((snippet) => (
                  <Card key={snippet.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {snippet.tone}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {snippet.category.replace('-', ' ')}
                          </Badge>
                          {snippet.isApproved && (
                            <Badge className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              Approved
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopySnippet(snippet.content)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          >
                            <Copy className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <Star className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                          {snippet.content}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {snippet.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {snippet.createdByName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            Used {snippet.usageCount} times
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{snippet.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredSnippets.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2">No snippets found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchQuery || filterCategory !== 'all'
                        ? 'Try adjusting your search or filter criteria.'
                        : 'This snippet bank is empty. Start adding some templates!'}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Select a Snippet Bank</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a snippet bank from the sidebar to view its contents.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

