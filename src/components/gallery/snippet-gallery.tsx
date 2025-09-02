'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getSharedSnippets, saveSnippetToLibrary, SharedSnippet } from '@/lib/db';
import { signInWithGoogle } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Calendar,
  User,
  Award,
  Search,
  Filter,
  Heart,
  Share2,
  Clock
} from 'lucide-react';

export function SnippetGallery() {
  const { user, isAuthenticated } = useAuth();
  const [sharedSnippets, setSharedSnippets] = useState<SharedSnippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<SharedSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [savingSnippets, setSavingSnippets] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadSharedSnippets = async () => {
      try {
        const snippets = await getSharedSnippets();
        setSharedSnippets(snippets);
        setFilteredSnippets(snippets);
      } catch (error) {
        console.error('Error loading shared snippets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSharedSnippets();
  }, []);

  useEffect(() => {
    let filtered = sharedSnippets;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(snippet => 
        snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.context.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.authorName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tone filter
    if (selectedTone !== 'all') {
      filtered = filtered.filter(snippet => snippet.tone === selectedTone);
    }

    setFilteredSnippets(filtered);
  }, [searchTerm, selectedTone, sharedSnippets]);

  const handleSaveToLibrary = async (snippet: SharedSnippet) => {
    if (!isAuthenticated) {
      alert('Please sign in to save snippets to your library.');
      return;
    }

    if (!user) return;

    setSavingSnippets(prev => new Set(prev).add(snippet.id));
    
    try {
      await saveSnippetToLibrary(user.uid, {
        content: snippet.content,
        tone: snippet.tone,
        category: snippet.category,
        context: snippet.context
      });
      
      alert('Snippet saved to your library!');
    } catch (error) {
      console.error('Error saving snippet:', error);
      alert('Error saving snippet. Please try again.');
    } finally {
      setSavingSnippets(prev => {
        const newSet = new Set(prev);
        newSet.delete(snippet.id);
        return newSet;
      });
    }
  };

  const uniqueTones = Array.from(new Set(sharedSnippets.map(s => s.tone)));
  const topContributors = sharedSnippets
    .reduce((acc, snippet) => {
      if (!snippet.isAnonymous) {
        acc[snippet.authorName] = (acc[snippet.authorName] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading teacher snippets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Teacher Snippet Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover parent communication messages shared by fellow teachers. Save the ones you love to your personal library.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search snippets, contexts, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800"
              >
                <option value="all">All Tones</option>
                {uniqueTones.map(tone => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredSnippets.length} of {sharedSnippets.length} shared snippets
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredSnippets.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Share2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No snippets found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchTerm || selectedTone !== 'all' 
                      ? 'Try adjusting your search or filters.'
                      : 'Be the first to share a snippet with the teacher community!'
                    }
                  </p>
                  <Button asChild>
                    <a href="/#snippet-tool">Create & Share a Snippet</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredSnippets.map((snippet) => (
                  <Card key={snippet.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {snippet.authorName}
                            </span>
                            {Object.entries(topContributors).find(([name]) => name === snippet.authorName)?.[1] >= 5 && (
                              <Badge className="bg-yellow-100 text-yellow-700">
                                <Award className="h-3 w-3 mr-1" />
                                Top Contributor
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline">{snippet.tone}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          {new Date(snippet.sharedAt.toDate()).toLocaleDateString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Context:</p>
                        <p className="text-sm italic bg-gray-50 dark:bg-gray-800 p-3 rounded">
                          {snippet.context}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Message:</p>
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <p className="text-gray-900 dark:text-gray-100">{snippet.content}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{snippet.saveCount} saves</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            <span>{snippet.shareCount} shares</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleSaveToLibrary(snippet)}
                          disabled={savingSnippets.has(snippet.id)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          {savingSnippets.has(snippet.id) ? (
                            'Saving...'
                          ) : isAuthenticated ? (
                            <>
                              <BookOpen className="h-4 w-4 mr-2" />
                              Save to Library
                            </>
                          ) : (
                            'Sign In to Save'
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(topContributors)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([name, count], index) => (
                      <div key={name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium">{name}</span>
                        </div>
                        <span className="text-sm text-gray-500">{count}</span>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{sharedSnippets.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Snippets Shared</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {sharedSnippets.reduce((sum, s) => sum + s.saveCount, 0)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Saves</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {Object.keys(topContributors).length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Teachers</p>
                </div>
              </CardContent>
            </Card>

            {/* Share CTA */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6 text-center">
                <Share2 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Share Your Messages
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                  Help other teachers by sharing your successful parent communications.
                </p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <a href="/#snippet-tool">Create & Share</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}