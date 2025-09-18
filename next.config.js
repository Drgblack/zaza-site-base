const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Root redirect to default locale
      { source: "/", destination: "/en", permanent: true },
      
      // Host redirects for SEO canonicalization
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.zazapromptly.com" }],
        destination: "https://zazapromptly.com/:path*",
        permanent: true
      },
      {
        source: "/:path*", 
        has: [{ type: "host", value: "zaza-site-base.vercel.app" }],
        destination: "https://zazapromptly.com/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "zaza-site-base-git-main.vercel.app" }],
        destination: "https://zazapromptly.com/:path*",
        permanent: true
      }
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
