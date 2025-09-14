import fs from 'node:fs/promises';
import path from 'node:path';

export interface Resource {
  id: string;
  title: string;
  description: string;
  icon: string;
  downloadType: string;
  category: 'planning' | 'communication' | 'assessment' | 'wellbeing' | 'ai-tools';
  fileExists: boolean;
  filePath?: string;
  fileSize?: string;
  lastUpdated?: Date;
}

const RESOURCES_DIR = path.join(process.cwd(), 'public', 'resources');

// Resource definitions
const resourceDefinitions: Omit<Resource, 'fileExists' | 'fileSize' | 'lastUpdated'>[] = [
  {
    id: 'self-care',
    title: 'Teacher Self-Care Guide',
    description: 'A comprehensive guide to maintaining well-being while teaching with AI assistance.',
    icon: '🧘‍♀️',
    downloadType: 'self-care',
    category: 'wellbeing',
    filePath: 'teacher-self-care-guide.pdf'
  },
  {
    id: 'ai-parent-comms',
    title: 'AI Parent Communication Kit',
    description: 'Tools and scripts for effective AI-powered parent-teacher communication.',
    icon: '💬',
    downloadType: 'communication',
    category: 'communication',
    filePath: 'ai-parent-comms.pdf'
  },
  {
    id: 'lesson-templates-primary',
    title: 'AI Lesson Plan Templates (Primary)',
    description: 'Ready-to-use lesson planning templates for primary school teachers.',
    icon: '📝',
    downloadType: 'templates',
    category: 'planning',
    filePath: 'lesson-plan-template-primary.pdf'
  },
  {
    id: 'lesson-templates-secondary',
    title: 'AI Lesson Plan Templates (Secondary)',
    description: 'Ready-to-use lesson planning templates for secondary school teachers.',
    icon: '📋',
    downloadType: 'templates-secondary',
    category: 'planning',
    filePath: 'lesson-plan-template-secondary.pdf'
  },
  {
    id: 'assessment-rubric',
    title: 'Assessment Rubric Template',
    description: 'Customizable rubric templates for fair and consistent assessment.',
    icon: '📊',
    downloadType: 'assessment-rubric',
    category: 'assessment',
    filePath: 'assessment-rubric-template.pdf'
  },
  {
    id: 'ai-grading-prompts',
    title: 'AI Grading Prompts Collection',
    description: 'Pre-written prompts for AI-assisted grading and feedback.',
    icon: '✅',
    downloadType: 'ai-grading',
    category: 'ai-tools',
    filePath: 'ai-grading-prompts.pdf'
  }
];

// Function to get file stats
async function getFileStats(filePath: string): Promise<{
  exists: boolean;
  size?: string;
  modified?: Date;
}> {
  try {
    const fullPath = path.join(RESOURCES_DIR, filePath);
    const stats = await fs.stat(fullPath);
    
    // Format file size
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(1);
    
    return {
      exists: true,
      size: `${sizeInMB} MB`,
      modified: stats.mtime
    };
  } catch {
    return { exists: false };
  }
}

// Get all resources with file existence check
export async function getAllResources(): Promise<Resource[]> {
  const resources = await Promise.all(
    resourceDefinitions.map(async (resource) => {
      const fileStats = resource.filePath ? await getFileStats(resource.filePath) : { exists: false };
      
      return {
        ...resource,
        fileExists: fileStats.exists,
        fileSize: fileStats.size,
        lastUpdated: fileStats.modified
      };
    })
  );

  return resources;
}

// Category colors for UI
export const categoryColors = {
  'planning': 'bg-blue-100 text-blue-800',
  'communication': 'bg-green-100 text-green-800',
  'assessment': 'bg-purple-100 text-purple-800',
  'wellbeing': 'bg-pink-100 text-pink-800',
  'ai-tools': 'bg-orange-100 text-orange-800'
};
