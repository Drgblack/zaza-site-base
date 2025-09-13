import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    const zip = new JSZip();
    const publicPath = path.join(process.cwd(), 'public');

    switch (type) {
      case 'logos':
        // Add logo files to ZIP
        try {
          const logoSvg = await fs.readFile(path.join(publicPath, 'media-kit/logos/zaza-logo.svg'));
          zip.file('zaza-logo.svg', logoSvg);
        } catch (e) {
          console.log('SVG logo not found, skipping');
        }

        try {
          const logoPng = await fs.readFile(path.join(publicPath, 'images/zaza-logo.png'));
          zip.file('zaza-logo.png', logoPng);
        } catch (e) {
          console.log('PNG logo not found, skipping');
        }

        // Add a readme file
        zip.file('README.txt', `Zaza Promptly Logo Package

This package contains logo files for Zaza Promptly in multiple formats:
- SVG format for scalable web use
- PNG format for general use

Usage Guidelines:
- Minimum width: 120px
- Clear space: Equal to logo height
- Use on light backgrounds for best visibility

For questions about logo usage, contact: press@zazatechnologies.com`);
        break;

      case 'headshots':
        try {
          const headshot1 = await fs.readFile(path.join(publicPath, 'images/greg-founder-photo-v2.png'));
          zip.file('greg-blackburn-headshot-1.png', headshot1);
        } catch (e) {
          console.log('Headshot 1 not found');
        }

        try {
          const headshot2 = await fs.readFile(path.join(publicPath, 'images/founder-greg.jpg'));
          zip.file('greg-blackburn-headshot-2.jpg', headshot2);
        } catch (e) {
          console.log('Headshot 2 not found');
        }

        zip.file('README.txt', `Dr. Greg Blackburn - Founder Headshots

Professional photos of Dr. Greg Blackburn, Founder & CEO of Zaza Technologies.

Usage:
- High resolution photos suitable for print and web
- Copyright: Zaza Technologies
- Permission granted for media use with proper attribution

For additional photos or specific requirements, contact: press@zazatechnologies.com`);
        break;

      case 'screenshots':
        try {
          const dashboard = await fs.readFile(path.join(publicPath, 'media-kit/screenshots/app-dashboard.svg'));
          zip.file('zaza-promptly-dashboard.svg', dashboard);
        } catch (e) {
          console.log('Dashboard screenshot not found');
        }

        try {
          const composer = await fs.readFile(path.join(publicPath, 'media-kit/screenshots/message-composer.svg'));
          zip.file('zaza-promptly-composer.svg', composer);
        } catch (e) {
          console.log('Composer screenshot not found');
        }

        zip.file('README.txt', `Zaza Promptly Product Screenshots

Application interface screenshots showing key features:
- Main dashboard view
- Message composition interface

These images demonstrate the core functionality of Zaza Promptly's
parent communication tools for teachers.

For additional screenshots or specific views, contact: press@zazatechnologies.com`);
        break;

      case 'media-kit':
        // Complete media kit with all assets
        try {
          const logoSvg = await fs.readFile(path.join(publicPath, 'media-kit/logos/zaza-logo.svg'));
          zip.folder('logos')?.file('zaza-logo.svg', logoSvg);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const logoPng = await fs.readFile(path.join(publicPath, 'images/zaza-logo.png'));
          zip.folder('logos')?.file('zaza-logo.png', logoPng);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const headshot1 = await fs.readFile(path.join(publicPath, 'images/greg-founder-photo-v2.png'));
          zip.folder('headshots')?.file('greg-blackburn-headshot-1.png', headshot1);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const headshot2 = await fs.readFile(path.join(publicPath, 'images/founder-greg.jpg'));
          zip.folder('headshots')?.file('greg-blackburn-headshot-2.jpg', headshot2);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const dashboard = await fs.readFile(path.join(publicPath, 'media-kit/screenshots/app-dashboard.svg'));
          zip.folder('screenshots')?.file('zaza-promptly-dashboard.svg', dashboard);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const composer = await fs.readFile(path.join(publicPath, 'media-kit/screenshots/message-composer.svg'));
          zip.folder('screenshots')?.file('zaza-promptly-composer.svg', composer);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const brandGuide = await fs.readFile(path.join(publicPath, 'media-kit/brand-guidelines.pdf'));
          zip.file('brand-guidelines.pdf', brandGuide);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const factSheet = await fs.readFile(path.join(publicPath, 'media-kit/company-factsheet.pdf'));
          zip.file('company-factsheet.pdf', factSheet);
        } catch (e) { console.error('Error in /api/download:', e); }

        try {
          const pressTemplate = await fs.readFile(path.join(publicPath, 'media-kit/press-release-template.docx'));
          zip.file('press-release-template.docx', pressTemplate);
        } catch (e) { console.error('Error in /api/download:', e); }

        zip.file('README.txt', `Zaza Promptly Complete Media Kit

This media kit contains all brand assets and materials for Zaza Promptly:

/logos/ - Logo files in multiple formats
/headshots/ - Professional photos of founder Dr. Greg Blackburn
/screenshots/ - Product interface screenshots
brand-guidelines.pdf - Complete brand identity guide
company-factsheet.pdf - Company overview and key statistics
press-release-template.docx - Template for press releases

For media inquiries: press@zazatechnologies.com
Website: https://zazapromptly.com

Â© 2025 Zaza Technologies. All rights reserved.`);
        break;

      case 'self-care':
        try {
          const selfCareGuide = await fs.readFile(path.join(publicPath, 'resources/teacher-self-care-guide.pdf'));
          zip.file('teacher-self-care-guide.pdf', selfCareGuide);
        } catch (e) {
          console.log('Self-care guide PDF not found, creating markdown content');
          zip.file('teacher-self-care-guide.md', `# Teacher Self-Care Guide

## Maintaining Well-being as an Educator

### Introduction
Teaching is one of the most rewarding yet demanding professions. This guide provides practical strategies for maintaining your well-being while managing the daily challenges of education.

### Core Self-Care Principles
- Set boundaries between work and personal time
- Practice mindfulness and stress management
- Build a support network with fellow educators
- Prioritize physical health and exercise
- Take time for hobbies and interests outside teaching

### AI-Assisted Self-Care
Learn how AI tools like Zaza Promptly can help reduce administrative burden:
- Automate routine communications
- Generate personalized feedback efficiently
- Save time on lesson planning and grading

### Weekly Self-Care Checklist
□ Take at least one evening completely off from work
□ Connect with friends or family outside education
□ Engage in physical activity or exercise
□ Practice a mindfulness or relaxation technique
□ Do something creative or fun

### Resources
- National Education Association: Mental Health Resources
- Teacher wellness apps and tools
- Professional development in stress management

Remember: Taking care of yourself isn't selfish—it's essential for being the best educator you can be.

© 2025 Zaza Technologies. Visit https://zazapromptly.com for more resources.`);
        }
        break;

      case 'templates':
        zip.file('ai-teaching-templates.md', `# AI Teaching Templates - Ready-to-Use Templates for AI-Powered Education

### Parent Email Templates

**Progress Update Template:**
Subject: [Student Name] - Weekly Progress Update

Dear [Parent Name],

I wanted to share some positive updates about [Student Name]'s progress this week...

**Behavior Note Template:**
Subject: [Student Name] - Classroom Update

Hi [Parent Name],

I'm reaching out to discuss [Student Name]'s behavior in class today...

### Student Feedback Templates

**Assignment Feedback Template:**
Great work on [Assignment Name]! I noticed you [specific positive observation]. 

Areas for improvement:
- [Specific suggestion 1]
- [Specific suggestion 2]

### AI Prompts for Teachers

**Generate Discussion Questions:**
"Create 5 discussion questions for 8th grade students about [topic] that encourage critical thinking"

**Differentiate Content:**
"Adapt this lesson for students reading 2 grades below level: [paste lesson content]"

**Parent Communication:**
"Help me write a positive email to parents about [student achievement/behavior]"

© 2025 Zaza Technologies. More templates available at https://zazapromptly.com`);
        break;

      case 'communication':
        zip.file('parent-communication-kit.md', `# Parent Communication Kit - AI-Powered Tools for Effective Teacher-Parent Communication

### Communication Principles
1. Be clear and specific
2. Lead with positives when possible
3. Use "I" statements for concerns
4. Provide concrete examples
5. Suggest actionable next steps

### Email Templates by Situation

**Academic Concerns:**
Subject: Supporting [Student Name]'s Academic Success

Dear [Parent Name],

I'm writing to discuss [Student Name]'s recent academic performance in [subject]. While they show strength in [positive area], I've noticed challenges with [specific concern].

### Cultural Sensitivity Tips
- Learn correct pronunciation of names
- Understand different communication styles
- Be aware of cultural attitudes toward authority
- Consider language barriers and offer translation
- Respect different family structures and values

### AI Communication Tools
Use AI assistants to:
- Draft initial emails (always review before sending)
- Translate messages for non-English speaking families
- Generate multiple versions of difficult messages
- Create follow-up reminders and action items

© 2025 Zaza Technologies. Visit https://zazapromptly.com for more communication tools.`);
        break;

      default:
        return NextResponse.json({ error: 'Invalid download type' }, { status: 400 });
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    const filename = `zaza-promptly-${type}-${new Date().toISOString().split('T')[0]}.zip`;

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    });

  } catch (error) {
    console.error('Error creating download:', error);
    return NextResponse.json({ error: 'Failed to create download' }, { status: 500 });
  }
}
