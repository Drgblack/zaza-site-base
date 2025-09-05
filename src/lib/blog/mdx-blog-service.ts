// Blog service that reads actual MDX files from content directory
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  fullContent: string;
  publishedAt: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
    role: string;
  };
  readingTime: number;
  category: {
    name: string;
    slug: string;
    color: string;
    icon: string;
    description: string;
  };
  tags: string[];
  featured: boolean;
  image: string;
}

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog');

// Curated images for each post - we'll cycle through them
const teacherImages = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555949963-ff9fe496c531?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552581234-26160f608093?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573164574472-797cdf4a583a?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
];

function getCategoryInfo(categoryName: string) {
  const categories: { [key: string]: { name: string, slug: string, color: string, icon: string, description: string } } = {
    'productivity': {
      name: 'Productivity',
      slug: 'productivity',
      color: 'bg-orange-500',
      icon: '⚡',
      description: 'Save time and work smarter'
    },
    'ai tools': {
      name: 'AI Tools',
      slug: 'ai-tools',
      color: 'bg-purple-500',
      icon: '🤖',
      description: 'Leverage AI to enhance your teaching'
    },
    'teacher tips': {
      name: 'Teacher Tips',
      slug: 'teacher-tips',
      color: 'bg-blue-500',
      icon: '💡',
      description: 'Practical advice for everyday teaching'
    },
    'parent communication': {
      name: 'Parent Communication',
      slug: 'parent-communication',
      color: 'bg-pink-500',
      icon: '💬',
      description: 'Build strong parent partnerships'
    },
    'lesson planning': {
      name: 'Lesson Planning',
      slug: 'lesson-planning',
      color: 'bg-green-500',
      icon: '📝',
      description: 'Design engaging and effective lessons'
    },
    'classroom management': {
      name: 'Classroom Management',
      slug: 'classroom-management',
      color: 'bg-red-500',
      icon: '🎯',
      description: 'Create a positive learning environment'
    }
  };

  const key = categoryName?.toLowerCase() || 'teacher tips';
  return categories[key] || categories['teacher tips'];
}

function createSlugFromFilename(filename: string): string {
  return filename.replace(/\.(md|mdx)$/, '').toLowerCase();
}

function parseBlogPost(filePath: string, fileName: string, index: number): BlogPost | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    // Skip if no title
    if (!frontmatter.title) {
      return null;
    }

    const slug = frontmatter.slug || createSlugFromFilename(fileName);
    const category = getCategoryInfo(frontmatter.category);

    // Calculate reading time
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 250));

    const post: BlogPost = {
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description || 'Educational insights for teachers',
      content: content.substring(0, 300) + '...',
      fullContent: content,
      publishedAt: frontmatter.date || frontmatter.publishDate || new Date().toISOString(),
      author: {
        name: frontmatter.author || 'Zaza Education Team',
        bio: frontmatter.authorBio || 'Dedicated to empowering teachers with AI',
        avatar: '/images/team/zaza-team.jpg',
        role: frontmatter.authorRole || 'Education Specialist'
      },
      readingTime: parseInt(frontmatter.readingTime) || readingTime,
      category,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      featured: frontmatter.featured || false,
      image: teacherImages[index % teacherImages.length] // Unique image per post
    };

    return post;
  } catch (error) {
    console.error(`Error parsing ${fileName}:`, error);
    return null;
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(BLOG_CONTENT_PATH)) {
      console.warn('Blog content directory does not exist');
      return [];
    }

    const files = fs.readdirSync(BLOG_CONTENT_PATH);
    const blogFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    const posts: BlogPost[] = [];

    blogFiles.forEach((fileName, index) => {
      const filePath = path.join(BLOG_CONTENT_PATH, fileName);
      const post = parseBlogPost(filePath, fileName, index);
      if (post) {
        posts.push(post);
      }
    });

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return posts;
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get all categories
export async function getAllCategories(): Promise<Array<{ category: BlogPost['category'], count: number }>> {
  const posts = await getAllBlogPosts();
  const categoryCounts = new Map<string, { category: BlogPost['category'], count: number }>();
  
  posts.forEach(post => {
    const key = post.category.slug;
    if (categoryCounts.has(key)) {
      categoryCounts.get(key)!.count++;
    } else {
      categoryCounts.set(key, { category: post.category, count: 1 });
    }
  });
  
  return Array.from(categoryCounts.values()).sort((a, b) => b.count - a.count);
}