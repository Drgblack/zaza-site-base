import fs from 'node:fs';
import path from 'node:path';
import { resources } from '@/data/resources';

export function getResources() {
  return resources.map(resource => {
    const filePath = path.join(process.cwd(), 'public', resource.path);
    const exists = fs.existsSync(filePath);
    
    let fileSize = null;
    if (exists) {
      try {
        const stats = fs.statSync(filePath);
        // Convert bytes to human readable format
        if (stats.size < 1024) {
          fileSize = `${stats.size} B`;
        } else if (stats.size < 1024 * 1024) {
          fileSize = `${Math.round(stats.size / 1024)} KB`;
        } else {
          fileSize = `${Math.round(stats.size / (1024 * 1024))} MB`;
        }
      } catch (error) {
        console.warn(`Could not get file stats for ${resource.path}`);
      }
    }
    
    return {
      ...resource,
      exists,
      fileSize: fileSize || resource.size // fallback to declared size
    };
  });
}

export function getResourcesByCategory() {
  const resourcesWithStats = getResources();
  const categories = Array.from(new Set(resourcesWithStats.map(r => r.category)));
  
  return categories.map(category => ({
    name: category,
    resources: resourcesWithStats.filter(r => r.category === category && r.exists)
  })).filter(category => category.resources.length > 0);
}