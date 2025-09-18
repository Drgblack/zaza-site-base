import { getAllPosts } from '@/lib/blog2.server';
import { siteConfig } from '@/lib/site';

export async function GET() {
  const posts = await getAllPosts(false);
  const publishedPosts = posts.filter(post => !post.draft).slice(0, 20);

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <description>Practical tips, AI tools, and educational insights for modern educators</description>
    <link>${siteConfig.url}/blog</link>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <managingEditor>${siteConfig.author.name}</managingEditor>
    <webMaster>${siteConfig.author.name}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    
    ${publishedPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || post.summary || ''}]]></description>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
      <author>${siteConfig.author.name}</author>
      ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}