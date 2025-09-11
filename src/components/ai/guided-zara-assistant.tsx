'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, Mail, MessageSquare, Target, Copy, RotateCcw, CheckCircle } from 'lucide-react';

type TaskType = 'parent-email' | 'student-feedback' | 'lesson-objective' | null;

interface TaskOutput {
  title: string;
  content: string;
}

const taskDefinitions = {
  'parent-email': {
    title: 'Parent Email Draft',
    icon: Mail,
    fields: [
      { id: 'situation', label: 'Situation/Topic', placeholder: 'e.g., Math quiz results, behavior concern, achievement...' },
      { id: 'tone', label: 'Tone', placeholder: 'e.g., positive, concerned, informative...' },
      { id: 'studentName', label: 'Student Name', placeholder: 'e.g., Emma, Marcus...' }
    ]
  },
  'student-feedback': {
    title: 'Student Feedback Snippet', 
    icon: MessageSquare,
    fields: [
      { id: 'assignment', label: 'Assignment/Task', placeholder: 'e.g., Math homework, Science project...' },
      { id: 'performance', label: 'Performance Notes', placeholder: 'e.g., showed understanding, needs help with...' },
      { id: 'studentName', label: 'Student Name', placeholder: 'e.g., Sofia, Alex...' }
    ]
  },
  'lesson-objective': {
    title: 'Lesson Objective',
    icon: Target,
    fields: [
      { id: 'subject', label: 'Subject/Topic', placeholder: 'e.g., Fractions, Solar System, Character Development...' },
      { id: 'gradeLevel', label: 'Grade Level', placeholder: 'e.g., 5th grade, Middle School...' },
      { id: 'duration', label: 'Lesson Duration', placeholder: 'e.g., 45 minutes, 1 hour...' }
    ]
  }
};

// Deterministic outputs for each task type
const taskOutputs = {
  'parent-email': (data: Record<string, string>): TaskOutput => ({
    title: 'Parent Email Draft',
    content: `Dear ${data.studentName ? `${data.studentName}'s` : ''} Parent/Guardian,

I hope this message finds you well. I wanted to reach out regarding ${data.situation || 'your child\'s recent progress'}.

${data.studentName || 'Your child'} has been ${data.tone === 'positive' ? 'doing excellent work' : data.tone === 'concerned' ? 'facing some challenges that I\'d like to discuss' : 'making steady progress'} in our classroom. I believe it would be beneficial for us to connect and discuss how we can best support ${data.studentName || 'your child'} moving forward.

Would you be available for a brief conversation this week? I'm available ${data.tone === 'concerned' ? 'at your earliest convenience' : 'most afternoons after 3:30 PM'}.

Thank you for your continued support of ${data.studentName || 'your child'}'s education.

Best regards,
[Your Name]`
  }),
  
  'student-feedback': (data: Record<string, string>): TaskOutput => ({
    title: 'Student Feedback Snippet',
    content: `${data.studentName || 'This student'} ${data.performance?.includes('showed understanding') || data.performance?.includes('excellent') ? 'demonstrates strong understanding' : data.performance?.includes('needs help') || data.performance?.includes('struggled') ? 'is working hard to master' : 'is making good progress with'} ${data.assignment || 'this assignment'}. ${
      data.performance?.includes('excellent') || data.performance?.includes('great') ? 
        `${data.studentName ? 'Their' : 'The'} work shows excellent attention to detail and clear thinking.` :
      data.performance?.includes('needs help') || data.performance?.includes('struggled') ?
        `I'd encourage ${data.studentName ? 'them' : 'this student'} to ask questions when concepts aren't clear and to review the key steps we practiced.` :
        `${data.studentName ? 'They show' : 'This work shows'} good effort and engagement with the material.`
    } Keep up the positive attitude toward learning!`
  }),
  
  'lesson-objective': (data: Record<string, string>): TaskOutput => ({
    title: 'Lesson Objective',
    content: `**Learning Objective:** Students will be able to understand and apply key concepts related to ${data.subject || 'the lesson topic'} through hands-on activities and collaborative discussion.

**Grade Level:** ${data.gradeLevel || 'Elementary/Middle School'}
**Duration:** ${data.duration || '45-60 minutes'}

**Success Criteria:**
• Students can explain the main concepts in their own words
• Students demonstrate understanding through practical application
• Students engage actively in discussions and ask thoughtful questions

**Assessment:** Students will show mastery through ${data.subject?.toLowerCase().includes('math') ? 'problem-solving exercises' : data.subject?.toLowerCase().includes('science') ? 'hands-on experiments and observations' : 'interactive activities and reflection'}.

**Differentiation:** Multiple entry points provided for various learning styles and abilities.`
  })
};

export function GuidedZaraAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<TaskOutput | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const lastButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Telemetry logging
  const logEvent = (event: string, data?: Record<string, any>) => {
    console.log(`[Zara Telemetry] ${event}`, data || {});
  };

  // Focus management (non-blocking)
  useEffect(() => {
    if (isOpen) {
      // Don't automatically focus - let user choose to interact
      logEvent('zara_open');
    }
  }, [isOpen]);

  // Keyboard handling (non-blocking)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      // Only handle Escape key - no focus trap for non-blocking UX
      if (event.key === 'Escape') {
        handleClose();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedTask(null);
    setFormData({});
    setOutput(null);
    setCopyStatus('idle');
    
    logEvent('zara_close');
    
    // Return focus to open button
    setTimeout(() => {
      openButtonRef.current?.focus();
    }, 100);
  };

  const handleTaskSelect = (task: TaskType) => {
    setSelectedTask(task);
    setFormData({});
    setOutput(null);
    setCopyStatus('idle');
    logEvent('zara_task_select', { task });
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleGenerate = () => {
    if (!selectedTask) return;

    const outputGenerator = taskOutputs[selectedTask];
    const result = outputGenerator(formData);
    setOutput(result);
    
    logEvent('zara_generate', {
      task: selectedTask,
      fieldsFilled: Object.keys(formData).filter(key => formData[key].trim()).length
    });
  };

  const handleCopy = async () => {
    if (!output) return;

    setCopyStatus('copying');

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(output.content);
        setCopyStatus('success');
        logEvent('zara_copy', { method: 'clipboard_api', success: true, task: selectedTask });
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = output.content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopyStatus('success');
        logEvent('zara_copy', { method: 'exec_command', success: true, task: selectedTask });
      }
    } catch (error) {
      setCopyStatus('error');
      logEvent('zara_copy', { success: false, error: error.message, task: selectedTask });
    }

    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleStartOver = () => {
    setSelectedTask(null);
    setFormData({});
    setOutput(null);
    setCopyStatus('idle');
    logEvent('zara_start_over');
  };

  const currentTask = selectedTask ? taskDefinitions[selectedTask] : null;

  return (
    <>
      {/* Chat Button */}
      <button
        ref={openButtonRef}
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ zIndex: 40 }} // Below header (z-50)
        aria-label="Open Zara Teaching Assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed bottom-6 right-6 w-full max-w-md h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
          style={{ 
            zIndex: 60,
            // Ensure it doesn't cover hero CTAs on mobile
            bottom: window.innerWidth < 768 ? '100px' : '24px'
          }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="zara-title"
          aria-describedby="zara-description"
        >
            {/* Header */}
            <div className="bg-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="zara-title" className="font-semibold">Zara — Teaching Assistant</h3>
                  <p className="text-xs text-purple-200">(Demo)</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-purple-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {!selectedTask ? (
                /* Task Selection */
                <div>
                  <p id="zara-description" className="text-gray-600 mb-6">
                    Choose a teaching task I can help you with:
                  </p>
                  <div className="space-y-3">
                    {Object.entries(taskDefinitions).map(([key, task]) => {
                      const IconComponent = task.icon;
                      return (
                        <button
                          key={key}
                          ref={key === 'parent-email' ? firstButtonRef : undefined}
                          onClick={() => handleTaskSelect(key as TaskType)}
                          className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <div className="flex items-center">
                            <IconComponent className="w-5 h-5 text-purple-600 mr-3" />
                            <span className="font-medium text-gray-900">{task.title}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : !output ? (
                /* Form for Selected Task */
                <div>
                  <div className="flex items-center mb-4">
                    <button
                      onClick={handleStartOver}
                      className="text-purple-600 hover:text-purple-700 text-sm mr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                    >
                      ← Back
                    </button>
                    <h4 className="font-semibold text-gray-900">{currentTask?.title}</h4>
                  </div>
                  
                  <div className="space-y-4">
                    {currentTask?.fields.map((field, index) => (
                      <div key={field.id}>
                        <label htmlFor={`zara-${field.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <input
                          id={`zara-${field.id}`}
                          type="text"
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                          ref={index === 0 ? firstButtonRef : undefined}
                        />
                      </div>
                    ))}
                    
                    <button
                      onClick={handleGenerate}
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      ref={lastButtonRef}
                    >
                      Generate {currentTask?.title}
                    </button>
                  </div>
                </div>
              ) : (
                /* Generated Output */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{output.title}</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        disabled={copyStatus === 'copying'}
                        className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                        ref={firstButtonRef}
                      >
                        {copyStatus === 'copying' ? (
                          <div className="w-4 h-4 animate-spin border-2 border-purple-600 border-t-transparent rounded-full" />
                        ) : copyStatus === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={handleStartOver}
                        className="text-gray-600 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                        ref={lastButtonRef}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                    <pre className="text-sm text-gray-900 whitespace-pre-wrap font-sans leading-relaxed">
                      {output.content}
                    </pre>
                  </div>
                  
                  {copyStatus === 'success' && (
                    <div className="mt-3 text-sm text-green-600 font-medium flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Copied to clipboard!
                    </div>
                  )}
                  {copyStatus === 'error' && (
                    <div className="mt-3 text-sm text-red-600 font-medium">
                      Failed to copy. Please try selecting and copying manually.
                    </div>
                  )}
                  
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-blue-800 text-xs">
                      <strong>Demo only</strong> - This is a preview. 
                      <a href="https://teach.zazatechnologies.com" className="underline ml-1">
                        Sign up for full features
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>
      )}
    </>
  );
}