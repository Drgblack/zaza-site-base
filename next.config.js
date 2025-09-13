const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true }
    ];
  },
  // Image optimization settings for blog images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
    ],
  },
  // ESLint enabled, TypeScript temporarily allowed for existing baseline issues
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: true }
};

module.exports = withNextIntl(nextConfig);
