import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog-mdx'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'
  const locales = ['en', 'de', 'fr', 'es', 'it']
  
  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/resources', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.4, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.4, changeFrequency: 'monthly' as const },
    { path: '/cookies', priority: 0.4, changeFrequency: 'monthly' as const },
  ]

  const staticPages: MetadataRoute.Sitemap = []
  
  // Add root page
  staticPages.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  })
  
  // Add localized pages
  locales.forEach(locale => {
    routes.forEach(route => {
      staticPages.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    })
  })
  
  // Add blog posts for each locale
  const blogPages: MetadataRoute.Sitemap = []
  for (const locale of locales) {
    const posts = await getAllPosts(locale)
    posts.forEach(post => {
      blogPages.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishDate),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  }
  
  return [...staticPages, ...blogPages]
}
