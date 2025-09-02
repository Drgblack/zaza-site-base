'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Shield, 
  Eye, 
  Brain, 
  Lock, 
  CheckCircle,
  Info,
  Sparkles,
  Users,
  Clock
} from 'lucide-react';

interface AITrustModalProps {
  isOpen: boolean;
  onClose: () => void;
  snippetContent?: string;
  tone?: string;
  context?: string;
}

export function AITrustModal({ isOpen, onClose, snippetContent, tone, context }: AITrustModalProps) {
  if (!isOpen) return null;

  const getPromptExplanation = () => {
    const basePrompt = "You are Zara, an AI assistant specialized in helping teachers write professional, empathetic parent communication messages.";
    
    const toneInstructions = {
      professional: "Use a formal, respectful tone appropriate for official school communications. Maintain authority while being approachable.",
      friendly: "Use a warm, approachable tone that builds rapport with parents while maintaining professionalism.",
      encouraging: "Focus on positive reinforcement and motivation. Highlight student strengths and growth opportunities.",
      direct: "Be clear and straightforward. Get to the point quickly while remaining respectful.",
      caring: "Show empathy and understanding. Acknowledge parent concerns and demonstrate genuine care for the student.",
      celebratory: "Express genuine enthusiasm and pride. Use positive, uplifting language to share good news."
    };

    const contextInstruction = context 
      ? `The teacher wants to communicate about: "${context}". Focus on this specific situation while maintaining the appropriate tone.`
      : "Address the general topic the teacher has specified, ensuring the message is relevant and helpful.";

    return {
      basePrompt,
      toneInstruction: toneInstructions[tone as keyof typeof toneInstructions] || toneInstructions.professional,
      contextInstruction,
      safetyGuidelines: [
        "Never include personal information about students or families",
        "Always maintain professional boundaries and appropriate language",
        "Focus on student learning and development, not personal issues",
        "Ensure messages are constructive and solution-oriented",
        "Respect privacy and confidentiality at all times"
      ]
    };
  };

  const explanation = getPromptExplanation();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl">How Zara Wrote This</CardTitle>
                <CardDescription>
                  Transparent AI process and safety measures
                </CardDescription>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* AI Process Overview */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Generation Process
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-purple-700 dark:text-purple-300">Analyzed your input</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-purple-700 dark:text-purple-300">Applied tone guidelines</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-purple-700 dark:text-purple-300">Generated safe content</span>
              </div>
            </div>
          </div>

          {/* Prompt Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Prompt Instructions Used
            </h3>
            
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Base AI Role</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "{explanation.basePrompt}"
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Tone Instructions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "{explanation.toneInstruction}"
                </p>
                {tone && (
                  <Badge variant="outline" className="mt-2">
                    {tone.charAt(0).toUpperCase() + tone.slice(1)} Tone
                  </Badge>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Context Instructions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "{explanation.contextInstruction}"
                </p>
              </div>
            </div>
          </div>

          {/* Safety Guidelines */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Safety Guidelines Applied
            </h3>
            <div className="grid gap-2">
              {explanation.safetyGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-800 dark:text-green-200">{guideline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Content Preview */}
          {snippetContent && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generated Content
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {snippetContent}
                </p>
              </div>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h4 className="font-medium text-blue-900 dark:text-blue-100">Teacher-Trained</h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Trained on thousands of teacher communications
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <h4 className="font-medium text-green-900 dark:text-green-100">Privacy-First</h4>
              <p className="text-xs text-green-700 dark:text-green-300">
                No personal data stored or shared
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <h4 className="font-medium text-purple-900 dark:text-purple-100">Always Improving</h4>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Continuously updated with best practices
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                  Important Note
                </h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  This message was generated by AI and should be reviewed and personalized before sending. 
                  Always ensure the content aligns with your school's policies and your personal communication style.
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
              Got it, thanks!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
