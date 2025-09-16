/**
 * Server-side Resources v1.1 Service
 * Handles manifest-based resource loading for the /resources page
 */

import fs from 'fs/promises';
import path from 'path';

interface ResourceManifestItem {
  title: string;
  slug: string;
  category: string;
  lang: string;
  version: string;
  pdf: string;
  html: string;
  size: string;
}

const MANIFEST_PATH = path.join(process.cwd(), 'public/resources/resources.manifest.json');
const RESOURCES_DIR = path.join(process.cwd(), 'public/resources');

/**
 * Load resources from the generated manifest file
 */
export async function getResourcesFromManifest(): Promise<ResourceManifestItem[]> {
  try {
    const manifestData = await fs.readFile(MANIFEST_PATH, 'utf8');
    return JSON.parse(manifestData) as ResourceManifestItem[];
  } catch (error) {
    console.error('Could not load resources manifest:', error);
    return [];
  }
}

/**
 * Fallback: scan filesystem for PDF files if manifest is not available
 */
async function scanResourcesFilesystem(): Promise<ResourceManifestItem[]> {
  const resources: ResourceManifestItem[] = [];
  
  try {
    await fs.access(RESOURCES_DIR);
  } catch {
    return []; // Resources directory doesn't exist
  }
  
  const scanDirectory = async (dirPath: string, category: string = ''): Promise<void> => {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Recursive scan for subdirectories
        await scanDirectory(fullPath, entry.name);
      } else if (entry.name.endsWith('.pdf')) {
        // Extract metadata from filename
        const stats = await fs.stat(fullPath);
        const relativePath = path.relative(RESOURCES_DIR, fullPath);
        const href = `/${path.join('resources', relativePath).replace(/\\/g, '/')}`;
        
        // Parse filename for metadata (e.g., resource-name-v1.1-en.pdf)
        const fileBasename = path.basename(entry.name, '.pdf');
        const versionMatch = fileBasename.match(/-v(\d+\.\d+)-/);
        const langMatch = fileBasename.match(/-([a-z]{2})$/);
        
        const slug = fileBasename.replace(/-v\d+\.\d+-[a-z]{2}$/, '');
        const title = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        resources.push({
          title,
          slug,
          category: category || 'general',
          lang: langMatch?.[1] || 'en',
          version: versionMatch?.[1] || '1.0',
          size: stats.size,
          href
        });
      }
    }
  };
  
  await scanDirectory(RESOURCES_DIR);
  return resources;
}

/**
 * Get resources by category
 */
export async function getResourcesByCategory(category?: string): Promise<ResourceManifestItem[]> {
  const resources = await getResourcesFromManifest();
  
  if (!category || category === 'all') {
    return resources;
  }
  
  return resources.filter(resource => 
    resource.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get a specific resource by slug
 */
export async function getResourceBySlug(slug: string): Promise<ResourceManifestItem | null> {
  const resources = await getResourcesFromManifest();
  return resources.find(resource => resource.slug === slug) || null;
}

/**
 * Get available categories
 */
export async function getResourceCategories(): Promise<string[]> {
  const resources = await getResourcesFromManifest();
  const categories = [...new Set(resources.map(r => r.category))];
  return categories.sort();
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get resource statistics
 */
export async function getResourceStats(): Promise<{
  total: number;
  categories: Record<string, number>;
  totalSize: number;
  averageSize: number;
}> {
  const resources = await getResourcesFromManifest();
  
  const categories: Record<string, number> = {};
  let totalSize = 0;
  
  for (const resource of resources) {
    categories[resource.category] = (categories[resource.category] || 0) + 1;
    totalSize += resource.size;
  }
  
  return {
    total: resources.length,
    categories,
    totalSize,
    averageSize: resources.length > 0 ? totalSize / resources.length : 0
  };
}