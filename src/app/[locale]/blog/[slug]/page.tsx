import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

// Hardcoded blog posts to avoid any service issues
const BLOG_POSTS = {
  "5-minute-ai-wins-busy-teachers": {
    title: "5 Minute AI Wins for Busy Teachers",
    description: "Quick AI tools that save time and boost productivity in the classroom",
    content: "Discover powerful AI tools that can be implemented in just 5 minutes to transform your teaching workflow. As teachers, we're always looking for ways to save time and improve our effectiveness.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop",
    fullContent: `# 5 Minute AI Wins for Busy Teachers

As teachers, we're always looking for ways to save time and improve our effectiveness. AI tools can be game-changers, but many educators feel overwhelmed by the learning curve. The good news? You can start seeing benefits in just 5 minutes.

## Quick AI Tools for Teachers

### 1. AI Writing Assistant
Use ChatGPT or Claude to help with:
- Writing lesson plan outlines
- Creating quiz questions
- Drafting parent communication emails
- Generating creative writing prompts

### 2. Content Creation
AI can help you:
- Create visual aids and infographics
- Design engaging presentations
- Generate examples and analogies
- Adapt content for different learning levels

### 3. Administrative Tasks
- Grading assistance for open-ended questions
- Feedback generation
- Meeting notes summarization
- Calendar and task management

## Getting Started

1. Choose one tool that addresses your biggest time sink
2. Spend 5 minutes learning the basics
3. Use it for one task this week
4. Gradually expand to other areas

Remember: AI is a teaching assistant, not a replacement. Use it to amplify your expertise and free up time for what matters most - connecting with your students.`
  },
  "ai-tools-for-teachers": {
    title: "Essential AI Tools Every Teacher Should Know",
    description: "A comprehensive guide to the most useful AI tools for educators",
    content: "AI is transforming education, offering teachers powerful new ways to create content, provide feedback, and manage their workload. Here are the essential tools every educator should have in their toolkit.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop",
    fullContent: `# Essential AI Tools Every Teacher Should Know

AI is transforming education, offering teachers powerful new ways to create content, provide feedback, and manage their workload. Here are the essential tools every educator should have in their toolkit.

## Content Creation Tools

### ChatGPT/Claude
- **Best for:** Lesson planning, quiz generation, email drafting
- **Time saved:** 2-3 hours per week
- **Getting started:** Create free account, start with simple prompts

### Canva AI
- **Best for:** Visual content, presentations, worksheets
- **Time saved:** 1-2 hours per week
- **Getting started:** Use Magic Design feature

### Grammarly
- **Best for:** Writing feedback, document editing
- **Time saved:** 30 minutes per day
- **Getting started:** Browser extension installation

## Assessment and Feedback

### Turnitin
- **Best for:** Plagiarism detection, originality checking
- **Time saved:** 1 hour per assignment
- **Getting started:** School subscription required

### Gradescope
- **Best for:** Streamlined grading, rubric creation
- **Time saved:** 2-4 hours per week
- **Getting started:** Upload assignment template

## Implementation Tips

1. **Start small** - Choose one tool per month to learn
2. **Focus on pain points** - Address your biggest time wasters first
3. **Share with colleagues** - Build a supportive AI learning community
4. **Stay ethical** - Always maintain academic integrity
5. **Keep learning** - AI tools evolve rapidly

## Next Steps

Pick one tool from this list that addresses your biggest challenge. Spend 15 minutes this week exploring it. You'll be amazed at how much time you can save!`
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
    return { title: 'Post Not Found | Zaza Blog' };
  }

  return {
    title: post.title,
    description: post.description,
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
        {/* Back Button */}
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {post.description}
          </p>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-4">
              {post.fullContent.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-gray-900">{line.substring(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 text-gray-900">{line.substring(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-xl font-medium mt-4 mb-2 text-gray-900">{line.substring(4)}</h3>;
                }
                if (line.startsWith('- ')) {
                  return <li key={index} className="ml-4 mb-1 text-gray-700">{line.substring(2)}</li>;
                }
                if (line.startsWith('**') && line.includes(':**')) {
                  const [label, ...rest] = line.split(':**');
                  return <p key={index} className="mb-2"><strong className="text-gray-900">{label.substring(2)}:</strong> {rest.join(':**')}</p>;
                }
                if (line.trim() === '') {
                  return <div key={index} className="h-4"></div>;
                }
                return <p key={index} className="mb-4 text-gray-700">{line}</p>;
              })}
            </div>
            
            <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-3">
                Ready to Transform Your Teaching?
              </h3>
              <p className="text-indigo-700">
                Start implementing these AI strategies in your classroom today. 
                Remember, the key is to start small and gradually build your confidence with these powerful tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}