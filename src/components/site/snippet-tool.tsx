'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export function SnippetTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('snippet_tool');

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOutput(`Great work on "${input}"! Here are some personalized comments:\n\nâ€¢ Excellent understanding of the key concepts\nâ€¢ Clear presentation of ideas\nâ€¢ Areas for improvement: Consider adding more examples\nâ€¢ Keep up the outstanding work!`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            {t('description')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>AI Comment Generator</CardTitle>
              <CardDescription>
                Enter assignment details to generate personalized feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="input" className="text-sm font-medium">
                    Assignment Input
                  </label>
                  <Textarea
                    id="input"
                    placeholder={t('placeholder')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <Button 
                    onClick={handleGenerate} 
                    disabled={!input.trim() || isLoading}
                    className="w-full"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('generate')}
                  </Button>
                </div>
                <div className="space-y-2">
                  <label htmlFor="output" className="text-sm font-medium">
                    Generated Comments
                  </label>
                  <Textarea
                    id="output"
                    value={output}
                    readOnly
                    placeholder="Generated comments will appear here..."
                    className="min-h-[120px] bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
