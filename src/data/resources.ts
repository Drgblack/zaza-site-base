export const resources = [
  {
    id: 'lesson-plan-primary',
    title: 'Primary Lesson Plan Template',
    path: '/resources/lesson-plan-template-primary.pdf',
    size: '2 pages',
    category: 'Planning',
    description: 'Structured template for primary school lesson planning with AI integration tips.'
  },
  {
    id: 'lesson-plan-secondary', 
    title: 'Secondary Lesson Plan Template',
    path: '/resources/lesson-plan-template-secondary.pdf',
    size: '3 pages',
    category: 'Planning',
    description: 'Comprehensive template for secondary school lesson planning.'
  },
  {
    id: 'parent-email-checklist',
    title: 'Parent Email Checklist', 
    path: '/resources/parent-email-checklist.html',
    size: '1 page',
    category: 'Communication',
    description: 'Essential checklist for professional parent communication.'
  },
  {
    id: 'ai-parent-comms',
    title: 'AI Parent Communication Guide',
    path: '/resources/ai-parent-comms.pdf', 
    size: '8 pages',
    category: 'AI Tools',
    description: 'Complete guide to using AI for parent communication.'
  },
  {
    id: 'student-feedback-bank',
    title: 'Student Feedback Bank',
    path: '/resources/student-feedback-bank.pdf',
    size: '12 pages', 
    category: 'Assessment',
    description: 'Comprehensive bank of constructive feedback phrases.'
  },
  {
    id: 'classroom-routines',
    title: 'Classroom Routines Guide',
    path: '/resources/classroom-routines.pdf',
    size: '6 pages',
    category: 'Management',
    description: 'Evidence-based classroom routines for effective learning.'
  },
  {
    id: 'ai-grading-prompts',
    title: 'AI Grading Prompts',
    path: '/resources/ai-grading-prompts.pdf',
    size: '10 pages',
    category: 'AI Tools', 
    description: 'Ready-to-use prompts for AI-assisted grading and feedback.'
  },
  {
    id: 'teacher-self-care-guide',
    title: 'Teacher Self-Care Guide',
    path: '/resources/teacher-self-care-guide.pdf',
    size: '5 pages',
    category: 'Wellbeing',
    description: 'Practical strategies for maintaining teacher wellbeing.'
  },
  {
    id: 'formative-assessment-checklist',
    title: 'Formative Assessment Checklist',
    path: '/resources/formative-assessment-checklist.pdf', 
    size: '3 pages',
    category: 'Assessment',
    description: 'Quick reference for effective formative assessment techniques.'
  },
  {
    id: 'ai-time-saving-guide',
    title: 'AI Time-Saving Guide',
    path: '/resources/ai-time-saving-guide.pdf',
    size: '14 pages',
    category: 'AI Tools',
    description: 'Comprehensive guide to saving time with AI tools.'
  }
] as const;

export type Resource = typeof resources[number];
export type ResourceCategory = Resource['category'];