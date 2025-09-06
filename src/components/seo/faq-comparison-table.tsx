'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, Zap, Shield, Heart } from 'lucide-react';

const comparisonData = [
  {
    feature: "Built specifically for teachers",
    promptly: true,
    chatgpt: false,
    description: "Understanding of education context, parent communication norms, and teacher workflows"
  },
  {
    feature: "Hallucination-safe AI",
    promptly: true,
    chatgpt: "limited",
    description: "Designed to avoid made-up facts or inappropriate content in school communication"
  },
  {
    feature: "GDPR compliant",
    promptly: true,
    chatgpt: false,
    description: "Full compliance with European data protection regulations for schools"
  },
  {
    feature: "Never trains on your data",
    promptly: true,
    chatgpt: false,
    description: "Your messages and student information stay completely private"
  },
  {
    feature: "Teacher-appropriate tone",
    promptly: true,
    chatgpt: "limited",
    description: "Automatically matches professional, warm, and parent-friendly communication style"
  },
  {
    feature: "Multiple communication types",
    promptly: true,
    chatgpt: "limited",
    description: "Parent messages, report cards, student feedback, staff notes - all optimized"
  },
  {
    feature: "Time to create message",
    promptly: "30 seconds",
    chatgpt: "3-5 minutes",
    description: "Including prompting, editing, and formatting for education use"
  },
  {
    feature: "Setup complexity",
    promptly: "Just type and go",
    chatgpt: "Complex prompting",
    description: "No need to write detailed prompts or provide context each time"
  }
];

export function FAQComparisonTable() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.12),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-2 border-blue-200 dark:border-blue-700/50 text-sm font-bold text-blue-800 dark:text-blue-200 shadow-lg">
            <Zap className="w-5 h-5 mr-2" />
            ⚡ The teacher's choice
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
            Promptly vs ChatGPT for Teachers
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Both are AI tools, but only one was built by educators, for educators. 
            See why 12,000+ teachers choose Promptly for their communication needs.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
              <div className="text-lg font-semibold text-slate-900 dark:text-white">Feature</div>
            </div>
            <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
              <div className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">
                <Heart className="w-5 h-5 inline mr-2" />
                Promptly
              </div>
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Built for Teachers</Badge>
            </div>
            <div className="p-6 text-center">
              <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">ChatGPT</div>
              <Badge variant="outline" className="text-slate-600 dark:text-slate-400">General AI Tool</Badge>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Why it matters</div>
            </div>
          </div>

          {/* Feature Rows */}
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                  <div className="font-medium text-slate-900 dark:text-white">{item.feature}</div>
                </div>
                <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
                  {typeof item.promptly === 'boolean' ? (
                    item.promptly ? (
                      <div className="w-6 h-6 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 mx-auto text-red-500">
                        <X className="w-6 h-6" />
                      </div>
                    )
                  ) : (
                    <div className="text-sm text-green-600 dark:text-green-400 font-semibold">{item.promptly}</div>
                  )}
                </div>
                <div className="p-6 text-center">
                  {typeof item.chatgpt === 'boolean' ? (
                    item.chatgpt ? (
                      <div className="w-6 h-6 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 mx-auto text-red-500">
                        <X className="w-6 h-6" />
                      </div>
                    )
                  ) : item.chatgpt === 'limited' ? (
                    <div className="w-6 h-6 mx-auto text-orange-500">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="text-sm text-red-600 dark:text-red-400 font-semibold">{item.chatgpt}</div>
                  )}
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                  <div className="text-sm text-slate-600 dark:text-slate-400">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 rounded-2xl p-8 border border-purple-200 dark:border-purple-800/30">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to experience the difference?
            </h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of teachers who've discovered that purpose-built tools work better than general AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Zap className="w-5 h-5 mr-2 inline" />
                Try Promptly Free
              </button>
              <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                See Pricing →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}