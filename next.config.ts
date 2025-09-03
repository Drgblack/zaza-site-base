import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone' as const,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.pexels.com' },
      { protocol: 'https', hostname: '**.imgix.net' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // TEMPORARY: Redirect broken article URLs to blog index until fixed
      { source: '/:locale(en|de|fr)/blog/:slug*', destination: '/:locale/blog', permanent: false },
      {
        source: '/blog/:slug*',
        destination: '/en/blog/:slug*',
        permanent: true,
      },
      {
        source: '/blog/critical-thinking',
        destination: '/en/blog/critical-thinking-in-ai-classroom',
        permanent: true,
      },
      {
        source: '/blog/phd-insights',
        destination: '/en/blog/phd-insights-ai-pedagogy',
        permanent: true,
      },
      {
        source: '/blog/future-classroom',
        destination: '/en/blog/future-classroom-ai-tools',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));