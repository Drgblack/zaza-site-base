import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

const BLOG_POSTS = {
  "5-minute-ai-wins-busy-teachers": {
    title: "5 Minute AI Wins for Busy Teachers",
    description: "Quick AI tools that save time and boost productivity in the classroom",
    content: `# Quick AI Tools That Transform Your Teaching Day

As educators, we're always looking for ways to work smarter, not harder. These 5-minute AI implementations can dramatically improve your daily workflow:

## 1. Instant Lesson Plan Generation
Use AI to create structured lesson plans by simply providing your topic and grade level. Get complete outlines with objectives, activities, and assessments in minutes.

## 2. Automated Feedback on Student Work  
Generate personalized, constructive feedback on student essays and assignments. AI can identify strengths and areas for improvement while maintaining an encouraging tone.

## 3. Quick Quiz Creation
Transform any text or lesson content into engaging quizzes with multiple question types. Perfect for formative assessment and review sessions.

## 4. Email Response Templates
Create professional email templates for common parent communications, meeting requests, and administrative responses.

## 5. Differentiation Made Easy
Quickly adapt content for different learning levels and styles. Generate alternative explanations, simplified vocabulary, or extension activities.

**The Bottom Line:** These tools aren't replacing your teaching expertise—they're amplifying it. Start with one tool, master it in a week, then add another. Your future self will thank you!`,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop",
    readingTime: "4 min read",
    publishDate: "December 15, 2024"
  },
  "ai-tools-for-teachers": {
    title: "Essential AI Tools Every Teacher Should Know",
    description: "A comprehensive guide to the most useful AI tools for educators",
    content: `# The Teacher's AI Toolkit: Essential Tools for Modern Educators

The landscape of education technology is evolving rapidly, and AI tools are at the forefront of this transformation. Here's your guide to the most impactful AI tools that can revolutionize your teaching practice.

## Content Creation Powerhouses

### ChatGPT for Education
Perfect for generating discussion questions, creating rubrics, and brainstorming creative project ideas. The key is learning effective prompting techniques.

### Canva AI
Create stunning visual materials with AI-powered design suggestions. From infographics to presentation slides, Canva's AI makes design accessible to every teacher.

## Assessment & Feedback Tools

### Grammarly for Educators
Provide detailed writing feedback instantly. The education version offers advanced suggestions for academic writing improvement.

### Socrative AI
Generate quiz questions automatically from your content. Great for creating formative assessments that truly measure understanding.

## Classroom Management Solutions

### ClassDojo AI Insights
Analyze classroom behavior patterns and get personalized suggestions for improving student engagement and participation.

### Remind AI Translate
Communicate with multilingual families effortlessly. Break down language barriers with real-time translation features.

## Getting Started: A Practical Approach

1. **Start Small:** Choose one tool and use it consistently for two weeks
2. **Learn the Basics:** Watch official tutorials and join educator communities
3. **Experiment Safely:** Test tools with low-stakes activities first
4. **Share & Learn:** Connect with other teachers using these tools

Remember: AI tools are meant to enhance, not replace, your professional judgment and creativity. Use them to handle routine tasks so you can focus on what matters most—inspiring and educating your students.`,
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop",
    readingTime: "6 min read", 
    publishDate: "December 10, 2024"
  }
};

export async function generateStaticParams() {
  return [
    { slug: "5-minute-ai-wins-busy-teachers" },
    { slug: "ai-tools-for-teachers" }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];
  
  if (!post) {
    return { title: 'Post Not Found | Promptly Blog' };
  }

  return {
    title: `${post.title} | Promptly Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{post.publishDate}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.description}
          </p>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ 
              __html: post.content.split('\n').map(line => {
                if (line.startsWith('# ')) {
                  return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.substring(2)}</h1>`;
                } else if (line.startsWith('## ')) {
                  return `<h2 class="text-2xl font-semibold mt-6 mb-3">${line.substring(3)}</h2>`;
                } else if (line.startsWith('### ')) {
                  return `<h3 class="text-xl font-semibold mt-4 mb-2">${line.substring(4)}</h3>`;
                } else if (line.trim() === '') {
                  return '<br />';
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return `<p class="font-semibold text-lg mt-4 mb-2">${line.slice(2, -2)}</p>`;
                } else {
                  return `<p class="mb-4">${line}</p>`;
                }
              }).join('')
            }}
          />
          
          <div className="mt-12 p-6 bg-indigo-50 rounded-lg border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-3 text-lg">
              Ready to Transform Your Teaching?
            </h3>
            <p className="text-indigo-700 mb-4">
              Join thousands of educators already using AI to save time and enhance their impact in the classroom.
            </p>
            <Link 
              href={`/${locale}/signup`}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Get Started Today →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}