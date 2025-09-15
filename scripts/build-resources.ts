#!/usr/bin/env tsx
import { readdir, stat, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const RESOURCES_DIR = 'public/resources';
const OUTPUT_FILE = 'src/data/resources.json';
const MIN_FILE_SIZE = 500; // 500 bytes minimum to include more resources

interface ResourceFile {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'template' | 'guide' | 'checklist' | 'toolkit' | 'worksheet';
  subject?: string;
  path: string;
  bytes: number;
  sizeLabel: string;
  featured?: boolean;
  createdAt: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ')    // Replace dashes/underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Title case
}

// Resource metadata mapping for teacher-focused content
function getResourceMetadata(filename: string): Partial<ResourceFile> {
  const name = filename.toLowerCase();
  
  // Enhanced metadata for each resource
  if (name.includes('lesson-plan-template-primary')) {
    return {
      description: "Complete lesson planning template designed for primary school teachers with AI-powered suggestions and structured sections.",
      category: "Planning",
      tags: ["lesson-planning", "primary-education", "templates", "curriculum"],
      level: "beginner",
      type: "template",
      subject: "General",
      featured: true
    };
  }
  
  if (name.includes('ai-parent-comms')) {
    return {
      description: "Professional communication templates and strategies for effective parent-teacher interactions using AI assistance.",
      category: "Communication",
      tags: ["parent-communication", "ai-tools", "professional-development"],
      level: "intermediate",
      type: "guide",
      featured: true
    };
  }
  
  if (name.includes('teacher-ai-toolkit')) {
    return {
      description: "Comprehensive toolkit for integrating AI tools into daily teaching practices, saving hours of preparation time.",
      category: "Technology",
      tags: ["ai-integration", "productivity", "teaching-tools", "time-saving"],
      level: "intermediate",
      type: "toolkit",
      featured: true
    };
  }
  
  if (name.includes('classroom-routines')) {
    return {
      description: "Proven classroom management routines and procedures that create a positive learning environment.",
      category: "Management",
      tags: ["classroom-management", "routines", "behavior", "organization"],
      level: "beginner",
      type: "guide"
    };
  }
  
  if (name.includes('teacher-self-care-guide')) {
    return {
      description: "Essential self-care strategies and wellness practices for educators to prevent burnout and maintain work-life balance.",
      category: "Wellness",
      tags: ["self-care", "wellness", "work-life-balance", "mental-health"],
      level: "beginner",
      type: "guide",
      featured: true
    };
  }
  
  // Enhanced metadata for additional resources
  if (name.includes('ai-grading-prompts')) {
    return {
      description: "Ready-to-use AI prompts for efficient and consistent grading that save hours while providing meaningful feedback to students.",
      category: "Assessment",
      tags: ["grading", "ai-prompts", "feedback", "assessment", "time-saving"],
      level: "intermediate",
      type: "toolkit"
    };
  }
  
  if (name.includes('ai-quiz-generator-guide')) {
    return {
      description: "Step-by-step guide to creating engaging quizzes and assessments using AI tools, with templates and best practices.",
      category: "Assessment", 
      tags: ["quiz-creation", "ai-tools", "assessment", "engagement"],
      level: "beginner",
      type: "guide"
    };
  }
  
  if (name.includes('ai-student-support')) {
    return {
      description: "AI-powered strategies for providing personalized student support, intervention planning, and academic assistance.",
      category: "Student Support",
      tags: ["student-support", "personalization", "ai-tools", "intervention"],
      level: "intermediate", 
      type: "guide"
    };
  }
  
  if (name.includes('assessment-rubric-template')) {
    return {
      description: "Professional rubric templates for various subjects and projects, designed to streamline assessment and provide clear expectations.",
      category: "Assessment",
      tags: ["rubrics", "assessment", "templates", "grading", "standards"],
      level: "beginner",
      type: "template"
    };
  }
  
  if (name.includes('behavior-strategies')) {
    return {
      description: "Evidence-based behavior management strategies and interventions for creating positive classroom environments and supporting all learners.",
      category: "Management",
      tags: ["behavior-management", "classroom-strategies", "positive-discipline", "interventions"],
      level: "intermediate",
      type: "guide"
    };
  }
  
  if (name.includes('formative-assessment-checklist')) {
    return {
      description: "Quick-reference checklist for implementing effective formative assessment strategies that inform instruction and improve learning.",
      category: "Assessment",
      tags: ["formative-assessment", "checklist", "feedback", "instruction"],
      level: "beginner", 
      type: "checklist"
    };
  }
  
  if (name.includes('group-work-tools')) {
    return {
      description: "Essential tools and strategies for organizing effective group work, promoting collaboration, and ensuring all students participate.",
      category: "Instruction",
      tags: ["group-work", "collaboration", "cooperative-learning", "engagement"],
      level: "beginner",
      type: "toolkit"
    };
  }
  
  if (name.includes('parent-meeting-checklist')) {
    return {
      description: "Comprehensive checklist for conducting productive parent meetings, conferences, and difficult conversations with preparation tips.",
      category: "Communication",
      tags: ["parent-meetings", "conferences", "checklist", "communication"],
      level: "beginner",
      type: "checklist"
    };
  }
  
  if (name.includes('student-feedback-bank')) {
    return {
      description: "Ready-to-use feedback comments and phrases for various subjects and situations, saving time while providing meaningful responses.",
      category: "Assessment", 
      tags: ["feedback", "comments", "grading", "time-saving", "templates"],
      level: "beginner",
      type: "template"
    };
  }
  
  if (name.includes('weekly-lesson-planner')) {
    return {
      description: "Comprehensive weekly planning template that helps organize lessons, track progress, and maintain work-life balance.",
      category: "Planning",
      tags: ["lesson-planning", "weekly-planning", "organization", "templates"],
      level: "beginner",
      type: "template"
    };
  }

  // Default metadata for unrecognized files
  return {
    description: "Educational resource for teachers and educators.",
    category: "General",
    tags: ["teaching", "education"],
    level: "beginner",
    type: "guide"
  };
}

async function buildResourcesManifest() {
  console.log('📚 Building resources manifest...');

  if (!existsSync(RESOURCES_DIR)) {
    console.log(`📁 Resources directory not found: ${RESOURCES_DIR}`);
    console.log('📝 Creating empty manifest');
    await writeFile(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  const files = await readdir(RESOURCES_DIR);
  const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

  if (pdfFiles.length === 0) {
    console.log('📝 No PDF files found in resources directory');
    await writeFile(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  const resources: ResourceFile[] = [];

  for (const file of pdfFiles) {
    const filePath = join(RESOURCES_DIR, file);
    const stats = await stat(filePath);
    
    console.log(`📄 Processing: ${file} (${formatBytes(stats.size)})`);
    
    if (stats.size < MIN_FILE_SIZE) {
      console.log(`  ⚠️  File too small (< 1KB), skipping`);
      continue;
    }

    const metadata = getResourceMetadata(file);
    
    resources.push({
      id: file.replace(/\.[^/.]+$/, ''), // Remove extension for ID
      title: filenameToTitle(file),
      path: `/resources/${file}`,
      bytes: stats.size,
      sizeLabel: formatBytes(stats.size),
      createdAt: new Date().toISOString(),
      ...metadata
    } as ResourceFile);
  }

  // Sort by featured first, then by category
  resources.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.category.localeCompare(b.category);
  });

  await writeFile(OUTPUT_FILE, JSON.stringify(resources, null, 2));
  
  console.log(`✅ Built manifest with ${resources.length} resources`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);

  if (resources.length === 0) {
    console.log('⚠️  No valid resources found (all files < 1KB)');
  }
}

if (require.main === module) {
  buildResourcesManifest().catch(console.error);
}

export { buildResourcesManifest };