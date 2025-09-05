const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const BLOG_BACKUP_PATH = path.join(process.cwd(), 'blog-backup');
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'lib', 'blog', 'blog-data.json');

// Category mapping with teacher-friendly colors and icons
const categoryMap = {
  'ai-tools': { 
    name: 'AI Tools', 
    slug: 'ai-tools', 
    color: 'bg-purple-500',
    icon: '🤖',
    description: 'Leverage AI to enhance your teaching'
  },
  'teacher-tips': { 
    name: 'Teacher Tips', 
    slug: 'teacher-tips', 
    color: 'bg-blue-500',
    icon: '💡',
    description: 'Practical advice for everyday teaching'
  },
  'lesson-planning': { 
    name: 'Lesson Planning', 
    slug: 'lesson-planning', 
    color: 'bg-green-500',
    icon: '📝',
    description: 'Design engaging and effective lessons'
  },
  'parent-communication': { 
    name: 'Parent Communication', 
    slug: 'parent-communication', 
    color: 'bg-pink-500',
    icon: '💬',
    description: 'Build strong parent partnerships'
  },
  'productivity': { 
    name: 'Productivity', 
    slug: 'productivity', 
    color: 'bg-orange-500',
    icon: '⚡',
    description: 'Save time and work smarter'
  },
  'classroom-management': { 
    name: 'Classroom Management', 
    slug: 'classroom-management', 
    color: 'bg-red-500',
    icon: '🎯',
    description: 'Create a positive learning environment'
  },
  'wellbeing': { 
    name: 'Teacher Wellbeing', 
    slug: 'wellbeing', 
    color: 'bg-teal-500',
    icon: '🌱',
    description: 'Take care of yourself to teach better'
  },
  'future-of-teaching': { 
    name: 'Future of Teaching', 
    slug: 'future-of-teaching', 
    color: 'bg-indigo-500',
    icon: '🚀',
    description: 'Prepare for tomorrow\'s classroom'
  }
};

// Helper to normalize category
function normalizeCategory(category) {
  if (!category) return categoryMap['teacher-tips'];
  
  const normalized = category.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Map variations to standard categories
  const mappings = {
    'teaching-strategies': 'teacher-tips',
    'teacher tips': 'teacher-tips',
    'ai tools': 'ai-tools',
    'ai in education': 'ai-tools',
    'parent communication': 'parent-communication',
    'future of teaching & ai': 'future-of-teaching',
    'phd insights': 'future-of-teaching',
    'future of teaching and ai': 'future-of-teaching'
  };
  
  const mapped = mappings[normalized] || normalized;
  return categoryMap[mapped] || categoryMap['teacher-tips'];
}

// Create slug from title or filename
function createSlug(title, filename) {
  const baseSlug = title ? 
    title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') :
    filename.replace(/\.(md|mdx)$/, '');
  
  return baseSlug;
}

// Parse blog post
function parseBlogPost(filePath, fileName) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Skip drafts unless explicitly published
    if (frontmatter.isDraft && !frontmatter.isPublished) {
      return null;
    }
    
    // Extract and normalize data
    const slug = frontmatter.slug || createSlug(frontmatter.title, fileName);
    const category = normalizeCategory(frontmatter.category);
    
    // Calculate reading time (250 words per minute for educational content)
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 250));
    
    // Parse author information
    let author = {
      name: 'Zaza Team',
      bio: 'Educational AI experts helping teachers save time',
      avatar: '/images/team/zaza-team.jpg',
      role: 'Education Specialist'
    };
    
    if (typeof frontmatter.author === 'string') {
      author.name = frontmatter.author;
    } else if (frontmatter.author && typeof frontmatter.author === 'object') {
      author = { ...author, ...frontmatter.author };
    }
    
    // Parse tags
    let tags = [];
    if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags;
    } else if (typeof frontmatter.tags === 'string') {
      tags = frontmatter.tags.split(',').map(t => t.trim());
    }
    
    // Parse grade levels
    let gradeLevels = [];
    if (frontmatter.grade_level || frontmatter.teacherLevel) {
      const levels = frontmatter.grade_level || frontmatter.teacherLevel;
      if (Array.isArray(levels)) {
        gradeLevels = levels;
      } else if (typeof levels === 'string') {
        gradeLevels = [levels];
      }
    }
    
    // Build blog post object
    const post = {
      id: slug,
      slug,
      title: frontmatter.title || 'Untitled Post',
      description: frontmatter.description || frontmatter.excerpt || '',
      content: content.substring(0, 500) + '...', // Preview only
      fullContent: content, // Full content for individual pages
      publishedAt: frontmatter.date || frontmatter.publishDate || new Date().toISOString(),
      author,
      readingTime: frontmatter.readingTime || readingTime,
      category,
      tags,
      gradeLevels,
      featured: frontmatter.featured || false,
      image: frontmatter.featuredImage || frontmatter.image || null,
      seo: frontmatter.seo || {
        metaTitle: frontmatter.title,
        metaDescription: frontmatter.description,
        keywords: frontmatter.seoKeywords || tags
      },
      difficulty: frontmatter.difficulty || 'intermediate',
      isVideo: frontmatter.isVideo || false,
      videoUrl: frontmatter.videoUrl || null
    };
    
    return post;
    
  } catch (error) {
    console.error(`Error parsing ${fileName}:`, error.message);
    return null;
  }
}

// Main function
function generateBlogData() {
  console.log('🚀 Starting blog data generation...');
  
  try {
    // Check if blog backup exists
    if (!fs.existsSync(BLOG_BACKUP_PATH)) {
      console.error('❌ Blog backup directory not found at:', BLOG_BACKUP_PATH);
      process.exit(1);
    }
    
    // Read all files
    const files = fs.readdirSync(BLOG_BACKUP_PATH);
    const blogFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
    
    console.log(`📁 Found ${blogFiles.length} blog files`);
    
    // Parse all posts
    const posts = [];
    for (const fileName of blogFiles) {
      const filePath = path.join(BLOG_BACKUP_PATH, fileName);
      const post = parseBlogPost(filePath, fileName);
      if (post) {
        posts.push(post);
        console.log(`✅ Processed: ${post.title}`);
      } else {
        console.log(`⏭️  Skipped: ${fileName}`);
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to JSON file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
    
    console.log(`\n✨ Successfully generated blog data!`);
    console.log(`📝 Total posts: ${posts.length}`);
    console.log(`📍 Output: ${OUTPUT_PATH}`);
    
    // Show category breakdown
    const categoryCount = {};
    posts.forEach(post => {
      const catName = post.category.name;
      categoryCount[catName] = (categoryCount[catName] || 0) + 1;
    });
    
    console.log('\n📊 Posts by category:');
    Object.entries(categoryCount).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} posts`);
    });
    
  } catch (error) {
    console.error('❌ Error generating blog data:', error);
    process.exit(1);
  }
}

// Run the script
generateBlogData();