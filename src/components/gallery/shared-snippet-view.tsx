'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { saveSnippetToLibrary, SharedSnippet } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShareButton } from '@/components/site/share-button';
import { 
  BookOpen, 
  User,
  Award,
  Calendar,
  ArrowLeft,
  Heart,
  Share2
} from 'lucide-react';

interface SharedSnippetViewProps {
  snippet: SharedSnippet;
}

export function SharedSnippetView({ snippet }: SharedSnippetViewProps) {
  const { user, isAuthenticated } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToLibrary = async () => {
    if (!isAuthenticated || !user) {
      alert('Please sign in to save snippets to your library.');
      return;
    }

    setIsSaving(true);
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
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <a href="/gallery" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Gallery
            </a>
          </Button>
        </div>

        {/* Main Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-white dark:bg-gray-800 border-b">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-3 mb-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span>{snippet.authorName}</span>
                  {snippet.shareCount >= 5 && (
                    <Badge className="bg-yellow-100 text-yellow-700">
                      <Award className="h-3 w-3 mr-1" />
                      Top Contributor
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{snippet.tone}</Badge>
                  <Badge variant="secondary">{snippet.category}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                {new Date(snippet.sharedAt.toDate()).toLocaleDateString()}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Context */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Situation Context
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{snippet.context}"
                </p>
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Teacher's Message
              </h3>
              <div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <p className="text-gray-900 dark:text-gray-100 leading-relaxed text-lg">
                  {snippet.content}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{snippet.saveCount} teachers saved this</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4 text-blue-500" />
                  <span>{snippet.shareCount} shares</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleSaveToLibrary}
                disabled={isSaving}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                {isSaving ? (
                  'Saving...'
                ) : isAuthenticated ? (
                  <>
                    <BookOpen className="h-5 w-5 mr-2" />
                    Save to My Library
                  </>
                ) : (
                  'Sign In to Save'
                )}
              </Button>
              
              <ShareButton 
                title={`Parent Communication by ${snippet.authorName}`}
                text={`Check out this helpful parent communication message shared by ${snippet.authorName} on Zaza Promptly`}
                className="flex-1"
              />
            </div>

            {!isAuthenticated && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
                <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                  <strong>Want to save this snippet?</strong>
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
                  Sign in to save this message to your personal library and access it anytime.
                </p>
                <Button className="bg-yellow-600 hover:bg-yellow-700">
                  Sign In with Google
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Community Context */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This message was shared by a fellow teacher to help our community communicate better with parents.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="/gallery">Browse More Snippets</a>
            </Button>
            <Button asChild>
              <a href="/#snippet-tool">Create Your Own</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}