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
          // Return the actual PDF file directly
          const pdfPath = path.join(publicPath, 'resources/teacher-self-care-guide.pdf');
          const pdfBuffer = await fs.readFile(pdfPath);
          
          return new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename="teacher-self-care-guide.pdf"'
            }
          });
        } catch (e) {
          console.error('Self-care guide PDF not found:', e);
          return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

      case 'templates':
        try {
          // Return the actual templates PDF file
          const pdfPath = path.join(publicPath, 'resources/lesson-plan-template-primary.pdf');
          const pdfBuffer = await fs.readFile(pdfPath);
          
          return new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename="ai-teaching-templates.pdf"'
            }
          });
        } catch (e) {
          console.error('Templates PDF not found:', e);
          return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

      case 'communication':
        try {
          // Return the actual communication PDF file
          const pdfPath = path.join(publicPath, 'resources/ai-parent-comms.pdf');
          const pdfBuffer = await fs.readFile(pdfPath);
          
          return new NextResponse(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename="parent-communication-kit.pdf"'
            }
          });
        } catch (e) {
          console.error('Communication PDF not found:', e);
          return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

      default:
        return NextResponse.json({ error: 'Invalid download type' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error creating download:', error);
    return NextResponse.json({ error: 'Failed to create download' }, { status: 500 });
  }
}
