'use client';

import { useState } from 'react';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';

const exampleInputs = [
  "Math homework on fractions - Emma showed good understanding but struggled with word problems",
  "Science project on solar system - Marcus created detailed model with accurate planet sizes",
  "Reading comprehension - Sofia improved significantly in connecting character motivations"
];

const demoOutputs: Record<string, string> = {
  [exampleInputs[0]]: "Emma demonstrates solid understanding of fraction concepts! Her work shows she's grasping the fundamentals well. To continue growing, let's focus on breaking down word problems step-by-step. I'd love to see her explain her thinking process more when solving these challenges. Great progress this week!",
  [exampleInputs[1]]: "Marcus, your solar system model shows exceptional attention to detail! The accurate planet sizes and distances demonstrate you've truly understood the scale concepts we discussed. For your next project, consider adding information about each planet's unique characteristics to make your presentation even more comprehensive. Outstanding work!",
  [exampleInputs[2]]: "Sofia, I'm impressed by your growth in reading comprehension! Your ability to connect character motivations shows deeper thinking about the text. Keep practicing reading aloud to build confidence with expression. Your written responses demonstrate real insight into the stories we're exploring together."
};

export function HomeDemo() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleUseExample = () => {
    const randomExample = exampleInputs[Math.floor(Math.random() * exampleInputs.length)];
    setInput(randomExample);
    setOutput('');
  };

  const handleGenerate = () => {
    if (!input.trim()) return;

    setIsGenerating(true);
    setOutput('');
    
    // Simulate processing time
    setTimeout(() => {
      // Use deterministic output based on input
      const matchedOutput = demoOutputs[input] || 
        "This student shows good effort in their work! I appreciate their engagement with the material. To continue growing, I'd encourage them to ask questions when they're unsure and to review concepts we've covered. Keep up the positive attitude toward learning!";
      
      setOutput(matchedOutput);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = () => {
    if (!output) return;
    
    navigator.clipboard.writeText(output).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Try Our AI Comment Generator
          </h2>
          <p className="text-xl text-gray-600">
            See how AI can help you write personalized student feedback in seconds
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">AI Comment Generator</h3>
            </div>
            <p className="text-gray-600">
              Enter details about student work to generate personalized feedback
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <label htmlFor="student-work-input" className="block text-sm font-medium text-gray-700 mb-2">
              Student Work Description
            </label>
            <div className="space-y-3">
              <textarea
                id="student-work-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the student's work, assignment, or performance..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                aria-describedby="input-help"
              />
              <div id="input-help" className="text-sm text-gray-500">
                Describe what the student did well and areas for improvement
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleUseExample}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium underline underline-offset-4"
                >
                  Use example
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={!input.trim() || isGenerating}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Generated Feedback</h4>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
              )}
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200 min-h-[120px] flex items-center">
              {isGenerating ? (
                <div className="flex items-center text-gray-600">
                  <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                  <span>Generating personalized feedback...</span>
                </div>
              ) : output ? (
                <p className="text-gray-900 leading-relaxed">{output}</p>
              ) : (
                <p className="text-gray-500 italic">
                  Generated feedback will appear here. Try the example above to get started.
                </p>
              )}
            </div>

            {hasCopied && (
              <div className="mt-3 text-sm text-green-600 font-medium flex items-center">
                <span className="mr-1">✓</span>
                Comment copied to clipboard!
              </div>
            )}
          </div>

          {/* Demo Disclaimer */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-blue-800 text-sm">
              <strong>Demo only—output may be simplified.</strong> This is a preview of our AI comment generator. 
              <a 
                href="https://teach.zazatechnologies.com" 
                className="text-blue-700 underline ml-1 hover:text-blue-900 transition-colors"
              >
                Sign up for the full version
              </a> with unlimited generations and advanced customization.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}