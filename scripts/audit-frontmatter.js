// Quick frontmatter audit for blog2
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const files = fs.readdirSync(BLOG_DIR).filter(f => /\.mdx?$/.test(f));

console.log(`Auditing ${files.length} blog posts...`);

const issues = [];
files.forEach(file => {
  const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data } = matter(content);
  
  const problems = [];
  if (!data.title) problems.push('missing title');
  if (!data.description && !data.excerpt) problems.push('missing description/excerpt');
  if (!data.date) problems.push('missing date');
  if (!data.author && !data.author?.name) problems.push('missing author');
  if (!data.category) problems.push('missing category');
  if (!data.image && !data.featuredImage) problems.push('missing image');
  
  if (problems.length) {
    issues.push({ file, problems });
  }
});

if (issues.length) {
  console.log('\n⚠️  Issues found:');
  issues.forEach(({ file, problems }) => {
    console.log(`  ${file}: ${problems.join(', ')}`);
  });
} else {
  console.log('✅ All posts have required frontmatter');
}

console.log(`\n📊 Summary: ${files.length} posts, ${issues.length} with issues`);