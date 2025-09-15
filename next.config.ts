import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

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
  async redirects() {
    return [
      // old hardcoded path → new canonical, locale-aware
      { source: '/about/greg', destination: '/en/meet-your-fellow-educator', permanent: true },
      { source: '/:locale/about/greg', destination: '/:locale/meet-your-fellow-educator', permanent: true },
    ];
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
};

export default withNextIntl(withMDX(nextConfig));