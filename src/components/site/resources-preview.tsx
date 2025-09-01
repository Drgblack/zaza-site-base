import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { BookOpen, Download, Video, FileText } from 'lucide-react';

const resources = [
  {
    title: "Teacher's AI Toolkit",
    description: "Essential templates and prompts for getting started with AI in education",
    type: "Download",
    icon: Download,
    href: "/resources/ai-toolkit"
  },
  {
    title: "Video Guide Series",
    description: "Step-by-step tutorials on using AI tools effectively in your classroom",
    type: "Video",
    icon: Video,
    href: "/resources/video-guides"
  },
  {
    title: "Best Practices Guide",
    description: "Research-backed strategies for implementing AI in educational settings",
    type: "Guide",
    icon: BookOpen,
    href: "/resources/best-practices"
  },
  {
    title: "Case Studies",
    description: "Real examples of how teachers are using AI to transform their practice",
    type: "Article",
    icon: FileText,
    href: "/resources/case-studies"
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
                  <Link href={resource.href}>Access Resource</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
