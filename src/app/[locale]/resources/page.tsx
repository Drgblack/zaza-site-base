import { Suspense } from 'react';
import { BookOpen, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';
import { getResourcesFromManifest, formatFileSize } from '@/lib/resources.server';
import { ResourcesContent } from './resources-content';

interface ResourceManifest {
  title: string;
  slug: string;
  category: string;
  lang: string;
  version: string;
  pdf: string;
  html: string;
  size: string;
}

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations();
  const manifestResources = await getResourcesFromManifest();

  // Convert manifest data to the format expected by the UI
  const resources = manifestResources.map((resource, index) => ({
    id: resource.slug,
    title: resource.title,
    description: getResourceDescription(resource.slug),
    category: resource.category,
    tags: getResourceTags(resource.slug),
    level: 'intermediate' as const,
    type: getResourceType(resource.slug),
    path: resource.pdf, // Default to PDF for downloads
    htmlPath: resource.html, // HTML for viewing
    pdfPath: resource.pdf, // PDF for downloads
    bytes: parseFloat(resource.size.replace(' KB', '')) * 1024, // Convert back to bytes for compatibility
    sizeLabel: resource.size,
    featured: index < 3, // First 3 resources are featured
    createdAt: new Date().toISOString()
  }));

  const categories = [...new Set(resources.map(r => r.category))].sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Resource Centre
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              Teacher Resources
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Professional-grade teaching resources, templates, and guides created specifically for educators.
            </p>
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{resources.length}+</div>
                <div className="text-purple-200 text-sm">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{categories.length}</div>
                <div className="text-purple-200 text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-purple-200 text-sm">Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div>Loading resources...</div>}>
          <ResourcesContent resources={resources} />
        </Suspense>

        {/* CTA Section */}
        <section className="mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need More Resources?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join our community of educators and get access to exclusive teaching resources, webinars, and expert tips.
            </p>
            <form
              action={process.env.NEXT_PUBLIC_NEWSLETTER_ACTION}
              method="POST"
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full sm:w-80 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none"
                aria-label="Email address"
              />
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg whitespace-nowrap"
              >
                <Users className="w-5 h-5 mr-2 inline" />
                Join Our Community
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

function getResourceDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'parent-email-playbook': 'Professional email templates for parent communication with tone guidelines and real examples.',
    'assessment-rubrics-pack': 'Comprehensive rubric templates for fair and transparent assessment across all subjects.',
    'report-comment-bank': 'Evidence-based comment bank with impact statements and next steps for report writing.',
    'lesson-plan-template-primary': 'Structured lesson planning template designed specifically for primary school educators.'
  };
  return descriptions[slug] || 'Professional teaching resource with comprehensive content and practical examples.';
}

function getResourceTags(slug: string): string[] {
  const tags: Record<string, string[]> = {
    'parent-email-playbook': ['communication', 'parent-engagement', 'templates'],
    'assessment-rubrics-pack': ['assessment', 'rubrics', 'evaluation', 'standards'],
    'report-comment-bank': ['reporting', 'assessment', 'feedback', 'comments'],
    'lesson-plan-template-primary': ['planning', 'primary', 'templates', 'curriculum']
  };
  return tags[slug] || ['teaching', 'education', 'professional-development'];
}

function getResourceType(slug: string): 'template' | 'guide' | 'checklist' | 'toolkit' | 'worksheet' {
  if (slug.includes('template')) return 'template';
  if (slug.includes('pack') || slug.includes('toolkit')) return 'toolkit';
  if (slug.includes('checklist')) return 'checklist';
  if (slug.includes('bank')) return 'guide';
  return 'guide';
}