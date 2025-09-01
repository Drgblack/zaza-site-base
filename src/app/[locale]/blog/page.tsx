import {setRequestLocale} from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import NextLink from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - AI in Education Insights',
  description: 'Discover the latest insights, tips, and strategies for using AI in education. Learn from educators who are transforming their classrooms with artificial intelligence.',
  keywords: ['AI education blog', 'teaching with AI', 'education technology', 'AI tools for teachers', 'classroom innovation'],
};

type Props = {
  params: Promise<{locale: string}>;
};

const posts = [
  {
    title: "10 Time-Saving AI Tools for Teachers",
    description: "Discover the latest AI tools that can help you save hours every week in lesson planning and grading.",
    date: "2024-01-15",
    slug: "ai-tools-for-teachers",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop",
    category: "Tools"
  },
  {
    title: "Effective Feedback Strategies with AI",
    description: "Learn how to combine AI assistance with personal touch to provide meaningful student feedback.",
    date: "2024-01-10", 
    slug: "effective-feedback-ai",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop",
    category: "Teaching"
  },
  {
    title: "The Future of Education Technology",
    description: "Exploring how AI and technology will reshape the classroom experience in the coming years.",
    date: "2024-01-05",
    slug: "future-education-technology", 
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop",
    category: "Future"
  }
];

export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="container py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI in Education Blog
        </h1>
        <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400 max-w-2xl mx-auto">
          Insights, tips, and updates from the world of AI-powered education
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
              width={400}
              height={192}
            />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-3 mb-4">
                {post.description}
              </CardDescription>
              <Button asChild variant="outline" size="sm">
                <NextLink href={`/blog/${post.slug}`}>Read Article</NextLink>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}