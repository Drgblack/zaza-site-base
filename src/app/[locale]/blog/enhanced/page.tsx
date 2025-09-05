import { setRequestLocale } from 'next-intl/server';
import { getAllBlog2Posts } from "@/lib/blog2.server";
import EnhancedBlogHero from "@/components/blog/EnhancedBlogHero";
import EnhancedNetflixRail from "@/components/blog/EnhancedNetflixRail";
import BlogStats from "@/components/blog/BlogStats";
import TeacherTypeSelector from "@/components/blog/TeacherTypeSelector";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI in Education Blog - Transform Your Teaching with Zaza Promptly',
  description: 'Join thousands of educators discovering practical AI tools and strategies. Save 3-5 hours per week with teacher-tested tips, lesson plans, and parent communication guides.',
  keywords: ['AI education blog', 'teacher resources', 'parent communication', 'educational technology', 'teaching tips', 'AI tools for teachers'],
  openGraph: {
    title: 'AI in Education Blog - Transform Your Teaching with Zaza Promptly',
    description: 'Join thousands of educators discovering practical AI tools and strategies. Save 3-5 hours per week with teacher-tested tips.',
    type: 'website',
    images: ['/images/blog/enhanced-og-blog.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI in Education Blog - Transform Your Teaching',
    description: 'Join thousands of educators discovering practical AI tools and strategies. Save 3-5 hours per week with teacher-tested tips.'
  }
};

export const dynamic = "force-static";

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string; search?: string; teacher_type?: string}>;
};

export default async function EnhancedBlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, search, teacher_type } = await searchParams;
  
  setRequestLocale(locale);
  const posts = getAllBlog2Posts();
  
  // Enhanced categorization
  const featuredPosts = posts.filter(p => p.featured).slice(0, 6);
  const recentPosts = posts
    .filter(p => new Date(p.date) > new Date(Date.now() - 21*24*60*60*1000))
    .slice(0, 8);
  
  // Teacher-type specific recommendations
  const getTeacherSpecificPosts = (type: string) => {
    const typeMap: Record<string, string[]> = {
      'elementary': ['classroom-management', 'parent-communication', 'ai-tools'],
      'middle': ['productivity', 'differentiation', 'assessment'],
      'high-school': ['ai-tools', 'critical-thinking', 'college-prep'],
      'admin': ['leadership', 'data-analysis', 'school-management'],
      'new-teacher': ['classroom-basics', 'time-management', 'parent-communication']
    };
    
    const keywords = typeMap[type] || [];
    return posts.filter(p => 
      keywords.some(keyword => 
        p.category?.toLowerCase().includes(keyword) ||
        p.tags?.some(tag => tag.toLowerCase().includes(keyword)) ||
        p.title.toLowerCase().includes(keyword)
      )
    ).slice(0, 8);
  };

  // Category-based rails with enhanced titles and descriptions
  const railsConfig = [
    {
      id: 'hero-featured',
      title: '🌟 Editor\'s Picks',
      subtitle: 'Hand-selected content that transforms teaching',
      posts: featuredPosts,
      variant: 'hero' as const
    },
    {
      id: 'quick-wins',
      title: '⚡ Quick Wins',
      subtitle: 'Implement these strategies in your next class',
      posts: posts.filter(p => 
        p.readingTime && parseInt(p.readingTime) <= 5 ||
        p.title.toLowerCase().includes('quick') ||
        p.title.toLowerCase().includes('5 min')
      ).slice(0, 8),
      variant: 'standard' as const
    },
    {
      id: 'recent',
      title: '🆕 Fresh Content',
      subtitle: 'Latest insights from the education community',
      posts: recentPosts,
      variant: 'standard' as const
    }
  ];

  // Add teacher-type specific rail if selected
  if (teacher_type) {
    const teacherTypeTitles: Record<string, {title: string; subtitle: string}> = {
      'elementary': {
        title: '🎨 Elementary Focus',
        subtitle: 'Creative solutions for K-5 classrooms'
      },
      'middle': {
        title: '🎯 Middle School Mastery', 
        subtitle: 'Navigate the unique challenges of grades 6-8'
      },
      'high-school': {
        title: '🎓 High School Success',
        subtitle: 'Advanced strategies for grades 9-12'
      },
      'admin': {
        title: '👑 Leadership Insights',
        subtitle: 'Strategic guidance for education leaders'
      },
      'new-teacher': {
        title: '🌱 New Teacher Essentials',
        subtitle: 'Build confidence in your first years'
      }
    };

    const typeConfig = teacherTypeTitles[teacher_type];
    if (typeConfig) {
      railsConfig.splice(2, 0, {
        id: `teacher-${teacher_type}`,
        title: typeConfig.title,
        subtitle: typeConfig.subtitle,
        posts: getTeacherSpecificPosts(teacher_type),
        variant: 'highlighted' as const
      });
    }
  }

  // Additional category rails
  const additionalRails = [
    {
      id: 'save-time',
      title: '⏰ Time Savers',
      subtitle: 'Reclaim 3-5 hours per week with these strategies',
      posts: posts.filter(p => 
        p.title.toLowerCase().includes('time') ||
        p.title.toLowerCase().includes('save') ||
        p.title.toLowerCase().includes('quick') ||
        p.category === 'Productivity'
      ).slice(0, 8),
      variant: 'standard' as const
    },
    {
      id: 'parent-comm',
      title: '👨‍👩‍👧‍👦 Parent Communication',
      subtitle: 'Build stronger relationships with families',
      posts: posts.filter(p => p.category === 'Parent Communication').slice(0, 8),
      variant: 'standard' as const
    },
    {
      id: 'ai-tools',
      title: '🤖 AI Tools & Tips',
      subtitle: 'Safe, practical AI integration for educators',
      posts: posts.filter(p => 
        p.category === 'ai-tools' ||
        p.title.toLowerCase().includes('ai') ||
        p.title.toLowerCase().includes('chatgpt')
      ).slice(0, 8),
      variant: 'standard' as const
    },
    {
      id: 'classroom-management',
      title: '🎯 Classroom Management',
      subtitle: 'Create positive learning environments',
      posts: posts.filter(p => 
        p.title.toLowerCase().includes('classroom') ||
        p.title.toLowerCase().includes('management') ||
        p.title.toLowerCase().includes('behavior')
      ).slice(0, 8),
      variant: 'standard' as const
    },
    {
      id: 'most-popular',
      title: '🔥 Most Popular',
      subtitle: 'What educators are reading right now',
      posts: posts.slice(0, 8),
      variant: 'standard' as const
    }
  ];

  const allRails = [...railsConfig, ...additionalRails].filter(rail => rail.posts.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Hero Section */}
      <EnhancedBlogHero 
        featuredPosts={featuredPosts}
        totalPosts={posts.length}
        recentCount={recentPosts.length}
      />

      {/* Teacher Type Selector */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <TeacherTypeSelector currentType={teacher_type} />
      </div>

      {/* Blog Stats */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <BlogStats 
          totalPosts={posts.length}
          categories={[...new Set(posts.map(p => p.category).filter(Boolean))].length}
          avgReadTime={Math.round(posts.reduce((acc, p) => acc + (parseInt(p.readingTime || '5') || 5), 0) / posts.length)}
        />
      </div>

      {/* Enhanced Rails */}
      <div className="max-w-7xl mx-auto px-4 space-y-12 pb-16">
        {allRails.map((rail) => (
          <EnhancedNetflixRail
            key={rail.id}
            title={rail.title}
            subtitle={rail.subtitle}
            posts={rail.posts}
            railId={rail.id}
            variant={rail.variant}
            locale={locale}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of educators using AI to save time and improve student outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup" 
              className="inline-flex items-center px-8 py-3 rounded-full bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
            >
              Start Your Free Trial
            </a>
            <a 
              href="/demo" 
              className="inline-flex items-center px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Watch Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}