/* eslint-disable no-useless-escape */
'use client'

import { useState } from 'react'

const examples = [
  {
    id: 'report',
    label: 'Report Card',
    studentContext: 'Emma, Year 5, showing strong progress in mathematics',
    generatedComment: 'Emma has demonstrated exceptional growth in mathematics this term. Her problem-solving skills have developed significantly, and she consistently approaches challenging concepts with confidence and curiosity. Emma actively participates in group work and often supports her peers\' learning. I recommend continuing to provide extension opportunities to further develop her mathematical thinking.',
    tone: 'Celebratory'
  },
  {
    id: 'feedback',
    label: 'Student Feedback',
    studentContext: 'Sarah, essay needs improvement in structure and evidence',
    generatedComment: 'Sarah, you\'ve chosen a fascinating topic and your passion for the subject really comes through in your writing. To strengthen your essay, focus on creating clearer topic sentences for each paragraph and adding specific examples to support your main points. Your conclusion shows deep thinking - let\'s work on connecting it more clearly to your introduction. Great effort!',
    tone: 'Constructive'
  },
  {
    id: 'parent',
    label: 'Parent Message',
    studentContext: 'Jake, Year 9, needs to discuss classroom behavior with parents',
    generatedComment: 'Dear Mr. and Mrs. Thompson,\n\nI wanted to update you on Jake\'s participation in our English class. While Jake demonstrates strong comprehension of our literature units, he\'s been having some difficulty with our discussion protocols.\n\nI\'d love to chat about some strategies we can use both at school and home to help Jake channel his enthusiasm more effectively. Would you be available for a brief call this week?\n\nBest regards,',
    tone: 'Professional'
  },
  {
    id: 'staff',
    label: 'Staff Note',
    studentContext: 'Update coordinator about student requiring additional learning support',
    generatedComment: 'Hi Lisa,\n\nFollowing our discussion about additional learning support, I\'ve observed that Alex would benefit from extended time on assessments and simplified instructions for multi-step tasks. They\'re making good progress with the current interventions but may need some adjustments to fully access the curriculum.\n\nI\'d appreciate your thoughts on next steps when you have a chance.\n\nThanks,',
    tone: 'Professional'
  }
]

const toneOptions = ['Warm', 'Professional', 'Constructive', 'Celebratory', 'Supportive']

export default function SnippetToolV2Enhanced() {
  const [activeExample, setActiveExample] = useState(examples[0])
  const [customContext, setCustomContext] = useState('')
  const [selectedTone, setSelectedTone] = useState('Professional')
  const [isGenerating, setIsGenerating] = useState(false)
  const [customResult, setCustomResult] = useState('')

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setCustomResult(`Based on your input about "${customContext}" with a ${selectedTone.toLowerCase()} tone, here\'s a professional comment that maintains your authentic teacher voice while saving you time...`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="relative">
      {/* Background gradient - more subtle since parent already has gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 rounded-3xl" />
      
      <div className="relative z-10 p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full mb-4">
            LIVE DEMO
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Try AI Comment Generation Right Now
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            See how Promptly transforms your thoughts into professional, pedagogically-sound communication in seconds
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Powered by Zara - adapts tone and structure for any teacher message
          </div>
        </div>

        {/* Example Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {examples.map((example) => (
            <button
              key={example.id}
              onClick={() => setActiveExample(example)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeExample.id === example.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              {example.label}
            </button>
          ))}
        </div>

        {/* Demo Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Input Section */}
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Student Context</h4>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700">{activeExample.studentContext}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Tone:</span>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium">
                  {activeExample.tone}
                </span>
              </div>
            </div>

            {/* Output Section */}
            <div className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Comment</h4>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <p className="text-gray-700 whitespace-pre-line">{activeExample.generatedComment}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Generated in 1.2 seconds</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>

          {/* Try Your Own Section */}
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">Try With Your Own Context</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter Student Context</label>
                <textarea
                  value={customContext}
                  onChange={(e) => setCustomContext(e.target.value)}
                  placeholder="e.g., Sarah, Year 8, struggling with essay writing..."
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Select Tone</label>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTone === tone
                          ? 'bg-white text-purple-600'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!customContext || isGenerating}
                className="w-full md:w-auto px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isGenerating ? 'Generating...' : 'Generate Comment'}
              </button>
              {customResult && (
                <div className="mt-4 p-4 bg-white/10 rounded-lg">
                  <p className="text-white/90">{customResult}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Time Saved', value: '10+ hours/week' },
            { label: 'Comments Generated', value: '2M+' },
            { label: 'Teacher Approved', value: '98%' },
            { label: 'Active Teachers', value: '12,000+' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
