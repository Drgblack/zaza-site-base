// Template management for snippet tool

export interface MessageTemplate {
  id: string;
  name: string;
  description: string;
  starter: string;
  format: 'email' | 'sms';
  tone: string;
  category: 'positive' | 'concern' | 'update' | 'homework' | 'behavior' | 'custom';
  content: string;
  student: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  author?: string;
  useCount: number;
}

// Built-in template library
export const BUILT_IN_TEMPLATES: MessageTemplate[] = [
  {
    id: 'positive-behavior-email',
    name: 'Positive Behavior Recognition',
    description: 'Celebrate excellent classroom behavior',
    starter: 'behaviour',
    format: 'email',
    tone: 'supportive',
    category: 'positive',
    content: `Hi there!

I wanted to reach out and share some wonderful news about {{student}}. Today they demonstrated exceptional classroom behavior that really stood out.

{{student}} showed great respect for classmates, followed directions thoughtfully, and contributed positively to our learning environment. This kind of maturity and consideration makes such a difference in our classroom community.

Please let {{student}} know how proud I am of their excellent choices today. Your support at home clearly shows in their positive attitude at school.

Thanks for being such a supportive partner in {{student}}'s education!

Best regards,
[Your name]`,
    student: '{{student}}',
    tags: ['behavior', 'positive', 'classroom'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    author: 'Promptly Team',
    useCount: 0
  },
  {
    id: 'homework-concern-sms',
    name: 'Homework Check-in',
    description: 'Address missing homework supportively',
    starter: 'homework',
    format: 'sms',
    tone: 'supportive',
    category: 'concern',
    content: `Hi! I wanted to check in about {{student}}'s homework. We've missed a few assignments this week. Happy to discuss strategies that might help at home. Thanks!`,
    student: '{{student}}',
    tags: ['homework', 'support', 'partnership'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    author: 'Promptly Team',
    useCount: 0
  },
  {
    id: 'academic-progress-email',
    name: 'Academic Achievement',
    description: 'Celebrate academic improvements',
    starter: 'praise',
    format: 'email',
    tone: 'friendly',
    category: 'positive',
    content: `Hi there!

I had to reach out and share how impressed I am with {{student}}'s recent academic progress. Their effort in class has been outstanding!

{{student}} has been actively participating in discussions, asking thoughtful questions, and showing real growth in their understanding. Their test scores and project work have improved significantly, and it's clear they're putting in excellent effort.

This kind of dedication is exactly what leads to success, and {{student}} should be very proud of their hard work. Please celebrate this achievement with them at home!

Thanks so much for all you do to support learning!

Warm regards,
[Your name]`,
    student: '{{student}}',
    tags: ['academic', 'progress', 'achievement'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    author: 'Promptly Team',
    useCount: 0
  }
];

// Template storage utilities
export class TemplateStorage {
  private static STORAGE_KEY = 'promptly_templates';

  static getSavedTemplates(): MessageTemplate[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  static saveTemplate(template: MessageTemplate): void {
    if (typeof window === 'undefined') return;
    
    const templates = this.getSavedTemplates();
    const existingIndex = templates.findIndex(t => t.id === template.id);
    
    if (existingIndex >= 0) {
      templates[existingIndex] = { ...template, updatedAt: new Date() };
    } else {
      templates.push(template);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
  }

  static deleteTemplate(id: string): void {
    if (typeof window === 'undefined') return;
    
    const templates = this.getSavedTemplates();
    const filtered = templates.filter(t => t.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
  }

  static getAllTemplates(): MessageTemplate[] {
    return [...BUILT_IN_TEMPLATES, ...this.getSavedTemplates()];
  }

  static getTemplatesByCategory(category: string): MessageTemplate[] {
    return this.getAllTemplates().filter(t => t.category === category);
  }

  static searchTemplates(query: string): MessageTemplate[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllTemplates().filter(t => 
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      t.content.toLowerCase().includes(lowerQuery)
    );
  }
}

// Template application utility
export function applyTemplate(template: MessageTemplate, studentName: string): string {
  return template.content.replace(/\{\{student\}\}/g, studentName || 'your child');
}

// Generate template ID
export function generateTemplateId(): string {
  return `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}