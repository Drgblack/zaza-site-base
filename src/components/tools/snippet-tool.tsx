'use client';

import { useState } from 'react';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';

const sampleComments = [
  {
    topic: "Math Assignment - Fractions",
    student: "Emma",
    comment: "Emma shows excellent understanding of fraction concepts! Her work on comparing fractions was particularly strong. To continue growing, I'd love to see her explain her thinking process more when solving word problems. Great job this week!"
  },
  {
    topic: "Science Project - Solar System",
    student: "Marcus",
    comment: "Marcus demonstrated remarkable creativity in his solar system model! His attention to detail with planet sizes and distances shows he's truly grasped the concepts. For next time, including more information about each planet's unique characteristics would make his presentation even stronger."
  },
  {
    topic: "Reading Comprehension - Charlotte's Web",
    student: "Sofia",
    comment: "Sofia's reading comprehension has improved tremendously! She's making great connections between characters and their motivations. I'd encourage her to continue practicing reading aloud to build confidence with expression. Her written responses show deep thinking!"
  }
];

export function SnippetTool() {
  const [input, setInput] = useState('');
  const [currentComment, setCurrentComment] = useState(sampleComments[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const generateComment = () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with random sample
    setTimeout(() => {
      const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
      setCurrentComment({
        ...randomComment,
        topic: input,
        comment: randomComment.comment.replace(randomComment.student, "this student")
      });
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentComment.comment);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const regenerateComment = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
      setCurrentComment({
        ...currentComment,
        comment: randomComment.comment.replace(randomComment.student, "this student")
      });
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">AI Comment Generator</h3>
        </div>
        <p className="text-gray-600">
          Enter an assignment topic or student work sample to generate personalized feedback
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label htmlFor="assignment-input" className="block text-sm font-medium text-gray-700 mb-2">
          Assignment Topic or Student Work Sample
        </label>
        <div className="flex gap-3">
          <input
            id="assignment-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Math homework on fractions, Science project on the solar system..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && generateComment()}
          />
          <button
            onClick={generateComment}
            disabled={!input.trim() || isGenerating}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Generated Comment</h4>
          <div className="flex gap-2">
            <button
              onClick={regenerateComment}
              disabled={isGenerating}
              className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition-colors"
              title="Regenerate comment"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={copyToClipboard}
              className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-2">
            Topic: <span className="font-medium">{currentComment.topic}</span>
          </div>
          <p className="text-gray-900 leading-relaxed">
            {isGenerating ? (
              <span className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating personalized feedback...
              </span>
            ) : (
              currentComment.comment
            )}
          </p>
        </div>

        {hasCopied && (
          <div className="mt-3 text-sm text-green-600 font-medium">
            ✓ Comment copied to clipboard!
          </div>
        )}
      </div>

      {/* Demo Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="text-blue-600 text-sm">
            <strong>Demo Mode:</strong> This is a preview of our AI comment generator. 
            <a href="https://teach.zazatechnologies.com" className="text-blue-700 underline ml-1">
              Sign up for the full version
            </a> with unlimited generations and advanced customization.
          </div>
        </div>
      </div>
    </div>
  );
}