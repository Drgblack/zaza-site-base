import fs from 'fs';
import path from 'path';

// Simple debug function to test file system access
export async function debugBlogContent(): Promise<any> {
  const result: any = {
    timestamp: new Date().toISOString(),
    errors: [],
    warnings: [],
    info: []
  };

  try {
    // Test 1: Check if content directory exists
    const contentPath = path.join(process.cwd(), 'content');
    const blogPath = path.join(contentPath, 'blog');
    
    result.info.push(`Current working directory: ${process.cwd()}`);
    result.info.push(`Content path: ${contentPath}`);
    result.info.push(`Blog path: ${blogPath}`);

    // Test 2: Check directory existence
    if (!fs.existsSync(contentPath)) {
      result.errors.push('Content directory does not exist');
      return result;
    } else {
      result.info.push('✓ Content directory exists');
    }

    if (!fs.existsSync(blogPath)) {
      result.errors.push('Blog directory does not exist');
      return result;
    } else {
      result.info.push('✓ Blog directory exists');
    }

    // Test 3: List files in blog directory
    const files = fs.readdirSync(blogPath);
    result.info.push(`Found ${files.length} files in blog directory`);
    
    // Test 4: Filter MDX/MD files
    const blogFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
    result.info.push(`Found ${blogFiles.length} blog files (.md/.mdx)`);
    
    // Test 5: Try to read first file
    if (blogFiles.length > 0) {
      const firstFile = blogFiles[0];
      const firstFilePath = path.join(blogPath, firstFile);
      
      try {
        const content = fs.readFileSync(firstFilePath, 'utf-8');
        result.info.push(`✓ Successfully read first file: ${firstFile}`);
        result.info.push(`File size: ${content.length} characters`);
        
        // Show first few lines
        const lines = content.split('\n').slice(0, 10);
        result.sampleContent = {
          filename: firstFile,
          firstLines: lines,
          hasYamlFrontmatter: content.startsWith('---')
        };
        
      } catch (fileError) {
        result.errors.push(`Failed to read file ${firstFile}: ${fileError}`);
      }
    }

    // Test 6: Check if gray-matter is available
    try {
      const matter = await import('gray-matter');
      result.info.push('✓ gray-matter dependency is available');
    } catch (matterError) {
      result.errors.push(`gray-matter dependency issue: ${matterError}`);
    }

    result.summary = {
      contentDirExists: fs.existsSync(contentPath),
      blogDirExists: fs.existsSync(blogPath),
      totalFiles: files.length,
      blogFiles: blogFiles.length,
      firstFile: blogFiles[0] || null
    };

  } catch (error) {
    result.errors.push(`Debug service error: ${error}`);
  }

  return result;
}