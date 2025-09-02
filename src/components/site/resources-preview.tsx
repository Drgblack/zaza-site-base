'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { Download } from 'lucide-react';

const resources = [
  // AI Prompt Toolkits
  {
    title: "Essential AI Prompt Toolkit for Teachers",
    description: "Complete collection of AI prompts for lesson planning, grading, and classroom management",
    type: "PDF Download",
    icon: Download,
    href: "/resources/teacher-ai-toolkit.pdf"
  },
  {
    title: "10 AI Prompts for Parent Communication",
    description: "Ready-to-use prompts for professional, empathetic parent communication",
    type: "PDF Download",
    icon: Download,
    href: "/resources/ai-parent-comms.pdf"
  },
  {
    title: "AI Prompts to Speed Up Grading & Feedback",
    description: "Time-saving prompts for efficient grading and meaningful student feedback",
    type: "PDF Download",
    icon: Download,
    href: "/resources/ai-grading-prompts.pdf"
  },
  {
    title: "AI for Differentiated Student Support",
    description: "Strategies and prompts for using AI to support diverse learning needs",
    type: "PDF Download",
    icon: Download,
    href: "/resources/ai-student-support.pdf"
  },
  
  // Lesson Planning & Templates
  {
    title: "Primary School Lesson Plan Template",
    description: "Customizable lesson plan template designed for elementary educators",
    type: "PDF Download",
    icon: Download,
    href: "/resources/lesson-plan-template-primary.pdf"
  },
  {
    title: "Secondary Lesson Plan Template",
    description: "Professional lesson planning template for middle and high school teachers",
    type: "PDF Download",
    icon: Download,
    href: "/resources/lesson-plan-template-secondary.pdf"
  },
  {
    title: "Weekly Lesson Planner Template",
    description: "Organize your week with this comprehensive planning template",
    type: "PDF Download",
    icon: Download,
    href: "/resources/weekly-lesson-planner.pdf"
  },
  {
    title: "Project-Based Learning Planning Toolkit",
    description: "Complete toolkit for designing and managing PBL experiences",
    type: "PDF Download",
    icon: Download,
    href: "/resources/project-based-learning-planner.pdf"
  },
  
  // Assessment & Feedback
  {
    title: "Customizable Assessment Rubric Template",
    description: "Flexible rubric templates for various subjects and assignment types",
    type: "PDF Download",
    icon: Download,
    href: "/resources/assessment-rubric-template.pdf"
  },
  {
    title: "Formative Assessment Strategies Checklist",
    description: "Practical checklist of formative assessment techniques for daily use",
    type: "PDF Download",
    icon: Download,
    href: "/resources/formative-assessment-checklist.pdf"
  },
  {
    title: "100 Feedback Comments for Student Work",
    description: "Bank of constructive feedback comments to save time and improve quality",
    type: "PDF Download",
    icon: Download,
    href: "/resources/student-feedback-bank.pdf"
  },
  {
    title: "Quick Guide to Using AI for Quiz Creation",
    description: "Step-by-step guide for creating effective quizzes with AI tools",
    type: "PDF Download",
    icon: Download,
    href: "/resources/ai-quiz-generator-guide.pdf"
  },
  
  // Classroom Management
  {
    title: "10 Classroom Routines That Save Time",
    description: "Proven routines to streamline your classroom management",
    type: "PDF Download",
    icon: Download,
    href: "/resources/classroom-routines.pdf"
  },
  {
    title: "Positive Behavior Strategies Guide",
    description: "Evidence-based strategies for building positive classroom culture",
    type: "PDF Download",
    icon: Download,
    href: "/resources/behavior-strategies.pdf"
  },
  {
    title: "Templates for Group Work & Collaboration",
    description: "Ready-to-use templates for managing effective group activities",
    type: "PDF Download",
    icon: Download,
    href: "/resources/group-work-tools.pdf"
  },
  {
    title: "Checklist for Productive Parent Meetings",
    description: "Comprehensive checklist to ensure effective parent conferences",
    type: "PDF Download",
    icon: Download,
    href: "/resources/parent-meeting-checklist.pdf"
  },
  
  // Teacher Wellbeing & Growth
  {
    title: "Teacher Self-Care Guide: Quick Wins",
    description: "Practical self-care strategies that fit into a teacher's busy schedule",
    type: "PDF Download",
    icon: Download,
    href: "/resources/teacher-self-care-guide.pdf"
  },
  {
    title: "How AI Saves Teachers 5+ Hours per Week",
    description: "Specific strategies for using AI to reclaim your time",
    type: "PDF Download",
    icon: Download,
    href: "/resources/ai-time-saving-guide.pdf"
  },
  {
    title: "The Future of Teaching in an AI World",
    description: "Insights and predictions for how AI will transform education",
    type: "PDF Download",
    icon: Download,
    href: "/resources/future-of-teaching.pdf"
  },
  {
    title: "Professional Growth & Reflection Planner",
    description: "Tools for planning and tracking your professional development journey",
    type: "PDF Download",
    icon: Download,
    href: "/resources/teacher-growth-planner.pdf"
  }
];

export function ResourcesPreview() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Free Resources
            </h2>
            <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
              Everything you need to get started with AI in education
            </p>
          </div>
          <Button asChild>
            <Link href="/resources">Explore All Resources</Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <Card key={resource.href} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <resource.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription className="text-sm text-purple-600 dark:text-purple-400">
                  {resource.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {resource.description}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a 
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={resource.type.includes('PDF') ? true : undefined}
                  >
                    {resource.type.includes('PDF') ? 'Download PDF' : 'Access Resource'}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
