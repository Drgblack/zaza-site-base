'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

const posts = [
  {
    title: "10 Time-Saving AI Tools for Teachers",
    description: "Discover the latest AI tools that can help you save hours every week in lesson planning and grading.",
    date: "2024-01-15",
    slug: "ai-tools-for-teachers",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
  },
  {
    title: "Effective Feedback Strategies with AI",
    description: "Learn how to combine AI assistance with personal touch to provide meaningful student feedback.",
    date: "2024-01-10",
    slug: "effective-feedback-ai",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop"
  },
  {
    title: "The Future of Education Technology",
    description: "Exploring how AI and technology will reshape the classroom experience in the coming years.",
    date: "2024-01-05",
    slug: "future-education-technology",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=200&fit=crop"
  }
];

export function BlogPreview() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Latest from Our Blog
            </h2>
            <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
              Tips, insights, and updates from the world of AI in education
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
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
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {post.description}
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/blog/${post.slug}` as any}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}