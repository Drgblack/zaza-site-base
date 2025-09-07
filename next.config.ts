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
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '(.*-DE.*)',
          },
        ],
        destination: '/de',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'accept-language', 
            value: '(.*-FR.*)',
          },
        ],
        destination: '/fr',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '(.*-ES.*)',
          },
        ],
        destination: '/es',
        permanent: false,
      },
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '(.*-IT.*)',
          },
        ],
        destination: '/it',
        permanent: false,
      },
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
      {
        source: '/blog/:slug*',
        destination: '/en/blog/:slug*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));