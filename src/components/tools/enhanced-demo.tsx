'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Copy, RefreshCw, RotateCcw, CheckCircle } from 'lucide-react';

// Deterministic example inputs
const exampleInputs = [
  {
    topic: "Math homework on fractions",
    details: "Emma showed good understanding but struggled with word problems",
    student: "Emma"
  },
  {
    topic: "Science project on solar system", 
    details: "Marcus created detailed model with accurate planet sizes",
    student: "Marcus"
  },
  {
    topic: "Reading comprehension assignment",
    details: "Sofia improved significantly in connecting character motivations", 
    student: "Sofia"
  }
];

// Deterministic outputs mapped to inputs
const deterministicOutputs: Record<string, string> = {
  "Math homework on fractions Emma showed good understanding but struggled with word problems": 
    "Emma demonstrates solid understanding of fraction concepts! Her work shows she's grasping the fundamentals well. To continue growing, let's focus on breaking down word problems step-by-step. I'd love to see her explain her thinking process more when solving these challenges. Great progress this week!",
    
  "Science project on solar system Marcus created detailed model with accurate planet sizes":
    "Marcus, your solar system model shows exceptional attention to detail! The accurate planet sizes and distances demonstrate you've truly understood the scale concepts we discussed. For your next project, consider adding information about each planet's unique characteristics to make your presentation even more comprehensive. Outstanding work!",
    
  "Reading comprehension assignment Sofia improved significantly in connecting character motivations":
    "Sofia, I'm impressed by your growth in reading comprehension! Your ability to connect character motivations shows deeper thinking about the text. Keep practicing reading aloud to build confidence with expression. Your written responses demonstrate real insight into the stories we're exploring together.",
    
  // Generic fallback for other inputs
  default: "This student shows strong engagement with the material! I appreciate their effort and attention to the assignment. To continue developing, I'd encourage them to ask questions when concepts aren't clear and to review key ideas we've covered. Their positive attitude toward learning is wonderful to see!"
};

export function EnhancedDemo() {
  const [topic, setTopic] = useState('');
  const [details, setDetails] = useState('');
  const [student, setStudent] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState('');

  const topicInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus management
  useEffect(() => {
    topicInputRef.current?.focus();
  }, []);

  // Telemetry logging
  const logEvent = (event: string, data?: Record<string, any>) => {
    console.log(`[Demo Telemetry] ${event}`, data || {});
  };

  const handleUseExample = () => {
    const randomExample = exampleInputs[Math.floor(Math.random() * exampleInputs.length)];
    
    setTopic(randomExample.topic);
    setDetails(randomExample.details);
    setStudent(randomExample.student);
    setValidationError('');
    
    // Auto-generate after filling example
    generateComment(randomExample.topic, randomExample.details, randomExample.student);
    
    logEvent('demo_use_example', {
      topic: randomExample.topic,
      student: randomExample.student
    });
  };

  const generateComment = (topicValue?: string, detailsValue?: string, studentValue?: string) => {
    const currentTopic = topicValue || topic;
    const currentDetails = detailsValue || details;
    const currentStudent = studentValue || student;

    // Inline validation
    if (!currentTopic.trim()) {
      setValidationError('Please enter an assignment topic');
      topicInputRef.current?.focus();
      return;
    }

    if (!currentDetails.trim()) {
      setValidationError('Please describe the student work or performance');
      return;
    }

    setValidationError('');
    setIsGenerating(true);
    setOutput('');

    // Deterministic generation
    setTimeout(() => {
      const key = `${currentTopic} ${currentDetails}`;
      const generatedOutput = deterministicOutputs[key] || deterministicOutputs.default;
      
      // Replace "This student" with actual student name if provided
      const finalOutput = currentStudent.trim() 
        ? generatedOutput.replace(/This student|this student/g, currentStudent)
        : generatedOutput;
      
      setOutput(finalOutput);
      setIsGenerating(false);
      
      logEvent('demo_generate', {
        topic: currentTopic,
        hasStudentName: !!currentStudent.trim(),
        outputLength: finalOutput.length
      });
    }, 1500);
  };

  const handleGenerate = () => {
    generateComment();
  };

  const handleCopy = async () => {
    if (!output) return;

    setCopyStatus('copying');

    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(output);
        setCopyStatus('success');
        logEvent('demo_copy', { method: 'clipboard_api', success: true });
      } else {
        // Fallback method
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.value = output;
          textarea.select();
          document.execCommand('copy');
          setCopyStatus('success');
          logEvent('demo_copy', { method: 'exec_command', success: true });
        } else {
          throw new Error('Fallback copy method failed');
        }
      }
    } catch (error) {
      setCopyStatus('error');
      logEvent('demo_copy', { success: false, error: error.message });
    }

    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleReset = () => {
    setTopic('');
    setDetails('');
    setStudent('');
    setOutput('');
    setValidationError('');
    setCopyStatus('idle');
    
    // Return focus to first input
    setTimeout(() => {
      topicInputRef.current?.focus();
    }, 100);
    
    logEvent('demo_reset');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Hidden textarea for fallback copy */}
      <textarea
        ref={textareaRef}
        className="sr-only"
        tabIndex={-1}
        readOnly
        aria-hidden="true"
      />

      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">AI Comment Generator</h3>
        </div>
        <p className="text-gray-600">
          Generate personalized student feedback by describing their work and performance
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        {/* Assignment Topic */}
        <div>
          <label htmlFor="topic-input" className="block text-sm font-medium text-gray-700 mb-2">
            Assignment Topic *
          </label>
          <input
            ref={topicInputRef}
            id="topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Math homework on fractions, Science project..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            aria-describedby="topic-help"
            aria-invalid={validationError.includes('topic')}
          />
          <div id="topic-help" className="text-xs text-gray-500 mt-1">
            What assignment or activity are you providing feedback on?
          </div>
        </div>

        {/* Student Work Details */}
        <div>
          <label htmlFor="details-input" className="block text-sm font-medium text-gray-700 mb-2">
            Student Work Description *
          </label>
          <textarea
            id="details-input"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Describe what the student did well and areas for improvement..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            aria-describedby="details-help"
            aria-invalid={validationError.includes('describe')}
          />
          <div id="details-help" className="text-xs text-gray-500 mt-1">
            Include strengths, areas for growth, and specific observations
          </div>
        </div>

        {/* Student Name (Optional) */}
        <div>
          <label htmlFor="student-input" className="block text-sm font-medium text-gray-700 mb-2">
            Student Name (Optional)
          </label>
          <input
            id="student-input"
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="e.g., Emma, Marcus, Sofia..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            aria-describedby="student-help"
          />
          <div id="student-help" className="text-xs text-gray-500 mt-1">
            Makes the feedback more personal when included
          </div>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="text-red-600 text-sm font-medium" role="alert">
            {validationError}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleUseExample}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
          >
            Use example
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
          <button
            onClick={handleReset}
            className="text-gray-600 hover:text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Generated Feedback</h4>
          {output && (
            <button
              onClick={handleCopy}
              disabled={copyStatus === 'copying'}
              className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500"
              title="Copy to clipboard"
            >
              {copyStatus === 'copying' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : copyStatus === 'success' ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="ml-1 text-sm">
                {copyStatus === 'success' ? 'Copied!' : 'Copy'}
              </span>
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

        {/* Copy Status Messages */}
        {copyStatus === 'success' && (
          <div className="mt-3 text-sm text-green-600 font-medium flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Comment copied to clipboard!
          </div>
        )}
        {copyStatus === 'error' && (
          <div className="mt-3 text-sm text-red-600 font-medium">
            Failed to copy. Please try selecting and copying the text manually.
          </div>
        )}
      </div>

      {/* Demo Disclaimer */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="text-blue-800 text-sm">
          <strong>Demo only—output may be simplified.</strong> This is a preview of our AI comment generator. 
          <a 
            href="https://teach.zazatechnologies.com" 
            className="text-blue-700 underline ml-1 hover:text-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            Sign up for the full version
          </a> with unlimited generations and advanced customization.
        </div>
      </div>
    </div>
  );
}