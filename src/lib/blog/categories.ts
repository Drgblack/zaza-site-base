import { BlogCategory } from './types';

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'ai-tools',
    name: 'AI Tools & Tips',
    slug: 'ai-tools',
    description: 'Practical AI tools and strategies for modern educators',
    color: 'bg-purple-500',
    icon: 'Bot',
    order: 1
  },
  {
    id: 'teaching-strategies',
    name: 'Teaching Strategies',
    slug: 'teaching-strategies', 
    description: 'Effective methods and approaches for better learning outcomes',
    color: 'bg-blue-500',
    icon: 'GraduationCap',
    order: 2
  },
  {
    id: 'classroom-management',
    name: 'Classroom Management',
    slug: 'classroom-management',
    description: 'Create positive and productive learning environments',
    color: 'bg-green-500',
    icon: 'Users',
    order: 3
  },
  {
    id: 'parent-communication',
    name: 'Parent Communication',
    slug: 'parent-communication',
    description: 'Build strong relationships with families and guardians',
    color: 'bg-orange-500', 
    icon: 'MessageCircle',
    order: 4
  },
  {
    id: 'assessment',
    name: 'Assessment & Feedback',
    slug: 'assessment',
    description: 'Modern approaches to student evaluation and feedback',
    color: 'bg-pink-500',
    icon: 'CheckSquare',
    order: 5
  },
  {
    id: 'productivity',
    name: 'Teacher Productivity',
    slug: 'productivity',
    description: 'Save time and work smarter, not harder',
    color: 'bg-indigo-500',
    icon: 'Zap',
    order: 6
  },
  {
    id: 'professional-development',
    name: 'Professional Development',
    slug: 'professional-development',
    description: 'Grow your skills and advance your teaching career',
    color: 'bg-teal-500',
    icon: 'TrendingUp',
    order: 7
  },
  {
    id: 'technology',
    name: 'EdTech & Innovation',
    slug: 'technology',
    description: 'Educational technology trends and classroom innovation',
    color: 'bg-cyan-500',
    icon: 'Smartphone',
    order: 8
  }
];

export const getCategoryById = (id: string): BlogCategory | undefined => {
  return BLOG_CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return BLOG_CATEGORIES.find(cat => cat.slug === slug);
};