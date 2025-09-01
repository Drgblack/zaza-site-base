import { Bot, MessageCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ZaraAssistant() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Meet Zara, Your AI Teaching Assistant
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            Coming soon: Your personal AI assistant for lesson planning and classroom management
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <Bot className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-2xl">Zara Assistant (Preview)</CardTitle>
              <CardDescription className="text-base">
                Experience the future of AI-powered education assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <MessageCircle className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                  <h3 className="font-semibold">Natural Conversations</h3>
                  <p className="text-sm text-gray-500">Chat naturally about your teaching needs</p>
                </div>
                <div className="text-center">
                  <Sparkles className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                  <h3 className="font-semibold">Smart Suggestions</h3>
                  <p className="text-sm text-gray-500">Get personalized teaching recommendations</p>
                </div>
                <div className="text-center">
                  <Bot className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                  <h3 className="font-semibold">24/7 Availability</h3>
                  <p className="text-sm text-gray-500">Access help whenever you need it</p>
                </div>
              </div>
              <div className="text-center">
                <Button size="lg" disabled>
                  Coming Soon - Join Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}