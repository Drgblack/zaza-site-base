import {setRequestLocale} from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Download, Video, FileText, Lightbulb, Users } from 'lucide-react';

type Props = {
  params: Promise<{locale: string}>;
};

const resourceCategories = [
  {
    title: "Getting Started",
    description: "Essential resources for teachers new to AI",
    icon: Lightbulb,
    resources: [
      {
        title: "AI in Education: Complete Beginner's Guide",
        description: "Everything you need to know to get started with AI in your classroom",
        type: "PDF Guide",
        icon: FileText
      },
      {
        title: "First Steps Video Series",
        description: "5-part video series covering AI basics for educators",
        type: "Video Course", 
        icon: Video
      }
    ]
  },
  {
    title: "Templates & Tools",
    description: "Ready-to-use templates and prompt libraries",
    icon: Download,
    resources: [
      {
        title: "Teacher's AI Prompt Library",
        description: "200+ proven prompts for lesson planning, grading, and more",
        type: "Download",
        icon: Download
      },
      {
        title: "Rubric Generation Templates",
        description: "Customizable templates for creating assessment rubrics",
        type: "Template Pack",
        icon: FileText
      }
    ]
  },
  {
    title: "Best Practices",
    description: "Research-backed strategies and methodologies",
    icon: BookOpen,
    resources: [
      {
        title: "AI Ethics in Education Handbook",
        description: "Guidelines for responsible AI use in educational settings",
        type: "Handbook",
        icon: BookOpen
      },
      {
        title: "Case Studies Collection",
        description: "Real examples from teachers using AI successfully",
        type: "Case Studies",
        icon: Users
      }
    ]
  }
];

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="container py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Free Resources
        </h1>
        <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to successfully integrate AI into your teaching practice
        </p>
      </div>

      <div className="space-y-16">
        {resourceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
                <category.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{category.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {category.resources.map((resource, resourceIndex) => (
                <Card key={resourceIndex} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <resource.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <span className="text-sm text-purple-600 dark:text-purple-400">
                            {resource.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {resource.description}
                    </CardDescription>
                    <div className="flex gap-2">
                      <Button size="sm">
                        Download Free
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-16 p-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">
          Want More Resources?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Join our community of educators and get access to exclusive resources, webinars, and updates.
        </p>
        <Button size="lg">
          Join Our Newsletter
        </Button>
      </div>
    </div>
  );
}