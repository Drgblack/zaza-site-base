'use client'

import { useState } from 'react'

const steps = [
  {
    number: "1",
    title: "Type in Your Student Context",
    description: "Enter basic info about your student and what you need to communicate - behavior, achievement, progress, or support.",
    example: "Student: Sarah, Year 7. Needs improvement in homework completion and class participation.",
    color: "from-purple-600 to-pink-600",
    bgAccent: "bg-purple-100"
  },
  {
    number: "2",
    title: "Choose Your Message Type",
    description: "Select from parent emails, student comments, report cards, or quick feedback - each designed specifically for teachers.",
    example: "Selected: Parent Email - Supportive tone with action steps",
    color: "from-blue-600 to-cyan-600",
    bgAccent: "bg-blue-100"
  },
  {
    number: "3",
    title: "AI Generates Professional Draft",
    description: "Receive pedagogically-sound content that sounds like you - no ChatGPT jargon, no made-up facts, just authentic teacher voice.",
    example: "Dear Mrs. Johnson, I wanted to reach out about Sarah's recent progress in class...",
    color: "from-emerald-600 to-teal-600",
    bgAccent: "bg-emerald-100"
  },
  {
    number: "4",
    title: "Review, Edit & Send",
    description: "Make quick edits if needed, then copy or send directly. Save hours while maintaining your professional standards.",
    example: "Edited, personalized, and sent in under 2 minutes!",
    color: "from-amber-600 to-orange-600",
    bgAccent: "bg-amber-100"
  }
]

export function HowPromptlyWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Promptly Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From blank page to professional communication in under 2 minutes. 
            Built by teachers, for teachers - no AI expertise needed.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => setActiveStep(index)}
              className={`group cursor-pointer transition-all duration-300 ${
                activeStep === index ? 'scale-105' : 'hover:scale-102'
              }`}
            >
              <div className="relative h-full">
                {/* Card */}
                <div className={`relative h-full rounded-2xl p-6 transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-white shadow-2xl ring-2 ring-offset-2 ring-offset-white' 
                    : 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
                } ${activeStep === index ? `ring-${step.color.split(' ')[0].replace('from-', '')}` : ''}`}>
                  
                  {/* Step Number with Gradient */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-lg mb-4`}>
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {step.description}
                  </p>

                  {/* Example Preview */}
                  <div className={`${step.bgAccent} rounded-lg p-3 text-xs text-gray-700 font-mono`}>
                    {step.example}
                  </div>

                  {/* Active Indicator */}
                  {activeStep === index && (
                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${step.color} rounded-full`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Join 12,000+ teachers who've transformed their communication workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/pricing" 
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a 
              href="#demo" 
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              See Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}