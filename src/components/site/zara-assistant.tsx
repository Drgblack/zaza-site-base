'use client';

import { useState, useEffect } from 'react';
import { Bot, MessageCircle, Sparkles, Send, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockConversation = [
  {
    id: 1,
    type: 'user' as const,
    message: "I need help writing parent emails about a classroom incident",
    timestamp: "2:34 PM"
  },
  {
    id: 2,
    type: 'assistant' as const,
    message: "I understand you need help with a sensitive parent communication. Let me help you craft a professional, empathetic email. Can you tell me what kind of incident occurred?",
    timestamp: "2:35 PM"
  },
  {
    id: 3,
    type: 'user' as const,
    message: "Two students had a disagreement during group work",
    timestamp: "2:36 PM"
  },
  {
    id: 4,
    type: 'assistant' as const,
    message: "Here's a draft email template:\n\n\"Dear [Parent name],\n\nI wanted to reach out regarding a small incident that occurred during today's group work activity. [Student name] and a classmate had a disagreement about their project approach.\n\nI intervened immediately and helped both students work through the situation. They were able to resolve their differences and completed the activity successfully together.\n\n[Student name] handled the resolution well and showed maturity in listening to their classmate's perspective.\n\nPlease let me know if you have any questions.\n\nBest regards,\n[Your name]\"",
    timestamp: "2:37 PM"
  }
];

export function ZaraAssistant() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<typeof mockConversation>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentMessageIndex < mockConversation.length) {
        setDisplayedMessages(prev => [...prev, mockConversation[currentMessageIndex]]);
        setCurrentMessageIndex(prev => prev + 1);
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [currentMessageIndex]);

  const resetDemo = () => {
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Interactive Preview
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Meet Zara, Your AI Teaching Assistant
          </h2>
          <p className="mt-4 text-gray-600 md:text-xl dark:text-gray-300 max-w-2xl mx-auto">
            Watch how Zara helps teachers craft professional parent communications with empathy and precision
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Chat Interface Mockup */}
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
            
            {/* Chat Header */}
            <CardHeader className="border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-white"></div>
                </div>
                <div>
                  <CardTitle className="text-lg text-white">Zara Assistant</CardTitle>
                  <CardDescription className="text-purple-100 text-sm">
                    AI Teaching Assistant • Online
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="p-0 max-h-96 min-h-[300px]">
              <div className="space-y-4 p-6">
                {displayedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 animate-fade-in ${
                      msg.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.type === 'assistant' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.type === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                    {msg.type === 'user' && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0 mt-1">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                
                {currentMessageIndex >= mockConversation.length && (
                  <div className="text-center py-4">
                    <Button 
                      onClick={resetDemo} 
                      variant="outline" 
                      size="sm"
                      className="text-purple-600 border-purple-600 hover:bg-purple-50"
                    >
                      Replay Demo
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Chat Input (Disabled/Mock) */}
            <div className="border-t p-4 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex gap-2 items-center">
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-full px-4 py-2 border text-gray-400">
                  Coming soon - Type your message here...
                </div>
                <Button size="sm" className="rounded-full h-10 w-10 p-0" disabled>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
              <CardContent className="p-6 text-center relative">
                <MessageCircle className="mx-auto mb-4 h-12 w-12 text-purple-600" />
                <h3 className="font-semibold text-lg mb-2">Natural Conversations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Chat naturally about your teaching challenges and get instant, contextual help
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent" />
              <CardContent className="p-6 text-center relative">
                <Sparkles className="mx-auto mb-4 h-12 w-12 text-pink-600" />
                <h3 className="font-semibold text-lg mb-2">Smart Suggestions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get personalized templates and suggestions based on your specific situation
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
              <CardContent className="p-6 text-center relative">
                <Bot className="mx-auto mb-4 h-12 w-12 text-blue-600" />
                <h3 className="font-semibold text-lg mb-2">Always Available</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  24/7 access to professional teaching support, whenever inspiration strikes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Join the Waitlist for Early Access
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Be the first to experience Zara when it launches
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}