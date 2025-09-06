// Script to generate static blog data from MDX files
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog');
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'lib', 'blog', 'generated-blog-data.json');

// 44 unique teacher-focused images
const TEACHER_IMAGES = [
  // Teaching & Classroom (1-10)
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
  
  // Education & Learning (11-20)
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1555949963-ff9fe496c531?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  
  // Technology & AI (21-30)
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop',
  
  // Students & Collaboration (31-40)
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=630&fit=crop',
  
  // Professional & Modern (41-44)
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1573164574472-797cdf4a583a?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop'
];

function generateBlogData() {
  console.log('Generating teacher blog data...');
  
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    console.error('Blog content directory not found');
    return;
  }

  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  const blogFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx')).sort();
  
  const posts = [];
  
  blogFiles.forEach((fileName, index) => {
    const filePath = path.join(BLOG_CONTENT_PATH, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    if (!frontmatter.title && !fileName.includes('sample')) {
      console.warn(`No title found in ${fileName}, skipping`);
      return;
    }
    
    const title = frontmatter.title || fileName.replace(/\.(md|mdx)$/, '').replace(/-/g, ' ');
    const slug = frontmatter.slug || fileName.replace(/\.(md|mdx)$/, '').toLowerCase();
    
    // Calculate reading time
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 250));
    
    const post = {
      id: slug,
      slug,
      title,
      description: frontmatter.description || `Educational insights about ${title.toLowerCase()}`,
      content: content.substring(0, 300) + (content.length > 300 ? '...' : ''),
      fullContent: content,
      publishedAt: frontmatter.date || frontmatter.publishDate || new Date().toISOString(),
      lastUpdated: frontmatter.lastUpdated || frontmatter.date || new Date().toISOString(),
      readingTime,
      readingTimeCategory: readingTime <= 2 ? '2-min' : readingTime <= 5 ? '5-min' : readingTime <= 10 ? '10-min' : readingTime <= 15 ? '15-min' : '20-min+',
      author: {
        name: frontmatter.author || 'Zaza Education Team',
        bio: frontmatter.authorBio || 'Dedicated to empowering teachers with AI',
        avatar: '/images/team/zaza-team.jpg',
        classroomCredentials: frontmatter.authorCredentials || 'Education Specialist',
        expertise: Array.isArray(frontmatter.authorExpertise) ? frontmatter.authorExpertise : []
      },
      subjects: ['ela'], // Default, would need proper parsing
      gradeBands: ['k-2'], // Default, would need proper parsing  
      contentType: 'explainer', // Default
      standards: Array.isArray(frontmatter.standards) ? frontmatter.standards : [],
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      materials: [],
      prepTime: frontmatter.prepTime || '10 minutes',
      classTime: frontmatter.classTime || '45 minutes',
      keyTakeaways: Array.isArray(frontmatter.keyTakeaways) ? frontmatter.keyTakeaways : [],
      teacherBlocks: [],
      downloads: [],
      featured: frontmatter.featured || false,
      image: TEACHER_IMAGES[index % TEACHER_IMAGES.length],
      imageAlt: `${title} - Educational resource for teachers`,
      helpfulVotes: { positive: 0, negative: 0 },
      saveCount: 0,
      downloadCount: 0
    };
    
    posts.push(post);
  });
  
  // Write to JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
  console.log(`Generated ${posts.length} blog posts to ${OUTPUT_PATH}`);
}

generateBlogData();