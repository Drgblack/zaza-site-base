'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getSharedSnippets, saveSnippetToLibrary, SharedSnippet } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookmarkPlus, 
  Calendar,
  User,
  Award,
  Search,
  Filter,
  Heart,
  Share2,
  Clock,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export function SnippetGallery() {
  const { user, isAuthenticated } = useAuth();
  const [sharedSnippets, setSharedSnippets] = useState<SharedSnippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<SharedSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTone, setSelectedTone] = useState<string>('all');
  const [savingSnippets, setSavingSnippets] = useState<Set<string>>(new Set());
  const [expandedSnippets, setExpandedSnippets] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [weeklyStats, setWeeklyStats] = useState({ totalShared: 0, contributors: 0 });

  useEffect(() => {
    const loadSharedSnippets = async () => {
      try {
        const snippets = await getSharedSnippets();
        setSharedSnippets(snippets);
        setFilteredSnippets(snippets);
        calculateWeeklyStats(snippets);
      } catch (error) {
        console.error('Error loading shared snippets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSharedSnippets();
    loadFavorites();
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

  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem('snippet-favorites');
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.warn('Could not load favorites:', error);
    }
  };

  const toggleFavorite = (snippetId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(snippetId)) {
      newFavorites.delete(snippetId);
      toast.success('Removed from favorites');
    } else {
      newFavorites.add(snippetId);
      toast.success('Added to favorites ❤️');
    }
    setFavorites(newFavorites);
    localStorage.setItem('snippet-favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const toggleExpanded = (snippetId: string) => {
    const newExpanded = new Set(expandedSnippets);
    if (newExpanded.has(snippetId)) {
      newExpanded.delete(snippetId);
    } else {
      newExpanded.add(snippetId);
    }
    setExpandedSnippets(newExpanded);
  };

  const calculateWeeklyStats = (snippets: SharedSnippet[]) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentSnippets = snippets.filter(snippet => {
      const sharedDate = snippet.sharedAt?.toDate?.() || new Date(snippet.sharedAt);
      return sharedDate >= oneWeekAgo;
    });
    
    const uniqueContributors = new Set(recentSnippets.map(s => s.authorId)).size;
    
    setWeeklyStats({
      totalShared: recentSnippets.length,
      contributors: uniqueContributors
    });
  };

  const handleSaveToLibrary = async (snippet: SharedSnippet) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save snippets to your library');
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
      
      toast.success('Snippet saved to your library! 📚');
    } catch (error) {
      console.error('Error saving snippet:', error);
      toast.error('Error saving snippet. Please try again.');
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading snippets...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (sharedSnippets.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Shared by Teachers, for Teachers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore real snippets created and shared by fellow educators. Save your favorites, adapt them to your voice, and spend less time stressing about what to write.
            </p>
          </div>

          {/* Empty State */}
          <div className="max-w-md mx-auto text-center py-16">
            <div className="mb-8">
              <Share2 className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Be the first to share!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be the first to share a snippet and help your fellow teachers!
              </p>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/#snippet-tool" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share My First Snippet
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Shared by Teachers, for Teachers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore real snippets created and shared by fellow educators. Save your favorites, adapt them to your voice, and spend less time stressing about what to write.
          </p>
          
          {/* Weekly Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{weeklyStats.totalShared}</div>
              <div className="text-sm text-gray-500">snippets shared this week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">{weeklyStats.contributors}</div>
              <div className="text-sm text-gray-500">contributors</div>
            </div>
          </div>
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

            {/* Gallery Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredSnippets.map((snippet) => {
                const isExpanded = expandedSnippets.has(snippet.id);
                const isFavorited = favorites.has(snippet.id);
                const shouldTruncate = snippet.content.length > 200;
                const displayContent = isExpanded ? snippet.content : (shouldTruncate ? snippet.content.substring(0, 200) + '...' : snippet.content);
                const contributor = Object.entries(topContributors).find(([name]) => name === snippet.authorName);
                const isTopContributor = contributor?.[1] && contributor[1] >= 5;
                
                return (
                  <Card key={snippet.id} className="group hover:shadow-lg transition-all duration-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {snippet.isAnonymous ? 'Shared Anonymously' : snippet.authorName}
                            </span>
                            {isTopContributor && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1">
                                <Award className="h-3 w-3 mr-1" />
                                🔥 Top Contributor
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{snippet.tone}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(snippet.id)}
                            className="p-1 h-8 w-8"
                          >
                            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {snippet.sharedAt?.toDate?.()?.toLocaleDateString() || 
                           new Date(snippet.sharedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-3">
                      <div className="space-y-4">
                        {snippet.context && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Context:</p>
                            <p className="text-sm italic bg-gray-50 dark:bg-gray-800/50 p-3 rounded text-gray-600 dark:text-gray-300">
                              {snippet.context}
                            </p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Message:</p>
                          <div className="relative bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <p className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">
                              {displayContent}
                            </p>
                            {shouldTruncate && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpanded(snippet.id)}
                                className="mt-2 p-0 h-auto text-purple-600 hover:text-purple-700"
                              >
                                {isExpanded ? (
                                  <span className="flex items-center gap-1 text-xs">
                                    <ChevronUp className="h-3 w-3" />
                                    Show less
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-xs">
                                    <ChevronDown className="h-3 w-3" />
                                    Read more
                                  </span>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {snippet.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <BookmarkPlus className="h-4 w-4" />
                              {snippet.saveCount || 0} saves
                            </span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSaveToLibrary(snippet)}
                              disabled={savingSnippets.has(snippet.id)}
                              size="sm" 
                              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            >
                              {savingSnippets.has(snippet.id) ? (
                                'Saving...'
                              ) : (
                                <>
                                  <BookmarkPlus className="h-4 w-4 mr-1" />
                                  Save to My Library
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Why Share Explainer */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Why Share?
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    Sharing snippets helps build a stronger teaching community. Every snippet you post can save another teacher hours of time - and you'll earn recognition as a Top Contributor.
                  </p>
                  <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Link href="/#snippet-tool" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share a Snippet
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Community Impact
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Total Snippets</span>
                      <span className="font-semibold text-purple-600">{sharedSnippets.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Contributors</span>
                      <span className="font-semibold text-pink-600">{Object.keys(topContributors).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">This Week</span>
                      <span className="font-semibold text-green-600">{weeklyStats.totalShared}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Total Saves</span>
                      <span className="font-semibold text-blue-600">
                        {sharedSnippets.reduce((sum, s) => sum + (s.saveCount || 0), 0)}
                      </span>
                    </div>
                  </div>
                  
                  {Object.keys(topContributors).length > 0 && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Top Contributors</h4>
                      <div className="space-y-2">
                        {Object.entries(topContributors)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 5)
                          .map(([name, count]) => (
                            <div key={name} className="flex justify-between items-center text-xs">
                              <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                {count >= 5 && <Award className="h-3 w-3 text-yellow-500" />}
                                {name}
                              </span>
                              <span className="font-medium">{count}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}